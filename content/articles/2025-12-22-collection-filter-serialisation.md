---
title: Be careful returning serialized responses from arrays and Collections directly
bg: bg-blue-600
decoration: decoration-rose-600
archived: false
createdAt: 2025-12-22
updatedAt: 2025-12-22
---

I hit a weird error in a private api I expose for some client apps recently. I added some domain logic to filter a collection of a Doctrine relation from an Entity that is exposed to the api and therefore serialised before being returned in a response.

```php
/**
 * @return Collection<int, Thinglet>
 */
 public function getThinglets(): Collection
 {
 	return $this->thinglets->filter(function(Thinglet $thinglet) {
    	return $thinglet->isGood();
    });
 }
```

Essentially my response went from:

```json
[
	{
		"id": 123,
		"value": "one two three"
	}
]
```

To:

```json
[
	{
		"0": {
			"id": 123,
			"value": "one two three"
		}
	}
]
```

Which just isn't what the downstream client was expecting at all. Of course, it only happened some of the time. Which is whemn the above `getThinglets()` method had filtered out results, and those results were from anywhere but the very end of the collection.

Long story short, it came down to a kind of esoteric functioning of `json_encode` with matching behaviour in the Symfony Serializer component:

```
When encoding an array, if the keys are not a continuous numeric sequence starting from 0, all keys are encoded as strings, and specified explicitly for each key-value pair.
```

So once a Thinglet got filtered out of the array, it was no longer sequential, and they keys get added back in as strings, which gives the above unexpected data structure with the string encoded key mapping to the object we want.

The below is some code I knocked together to reproduce the issue.

```php
<?php
require __DIR__ . '/vendor/autoload.php';

use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

$encoders = [new JsonEncoder()];
$normalizers = [new ObjectNormalizer()];
$serializer = new Serializer($normalizers, $encoders);

class Thinglet {
	public $thinglet;
}

$collection = new ArrayCollection();
$collection->add(new Thinglet());
$collection->add(new Thinglet());
$collection->add(new Thinglet());
$collection->add(new Thinglet());

$differentThinglet = new Thinglet();
$differentThinglet->thinglet = "anything";

$collection->add($differentThinglet); // this can't come last, if it does, the array will still be sequential
$collection->add(new Thinglet());

print_r($collection);
print(json_encode($collection->toArray()));
print($serializer->serialize($collection->toArray(), 'json'));
$anotherCollection = $collection->filter(function(Thinglet $thinglet) { return $thinglet->thinglet === null; });

print_r($anotherCollection);
print(json_encode($anotherCollection->toArray()));
print($serializer->serialize($collection->filter(function(Thinglet $thinglet) { return $thinglet->thinglet === null; }), 'json'));
```

The fix in short is to use `array_values` to strip the string encoded keys back out from the response. The longer fix, or one of them, is to create DTOs for API endpoints and map all data onto that DTO to respond.