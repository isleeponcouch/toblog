---
title: Zombies, Helping you not Send Messages to Deallocated Objects
bg: bg-gray-600
decoration: decoration-gray-600
archived: true
createdAt: 2013-01-19
updatedAt: 2013-01-19
---

I've just discovered that Zombies have an amazing innate ability to tell when you're messaging deallocated objects.

To see for yourself, enable Zombie Objects in XCode:

[Product] -&gt; [Edit Scheme] -&gt; [Run] -&gt; [Diagnostics] -&gt; [Objective-C] -&gt; [Enable Zombie Objects]

From then on an NSZombie Object will be put in place of deallocated (reference count = 0) objects, so if you send a message to something that doesn't exist anymore, you can find it really easily when the time comes.

So if you do something like this...

```objc
NSString* zombieString =
	[[NSString alloc] initWithUTF8String:"Grr, brains! Argh"];

[zombieString dealloc];
[zombieString substringFromIndex:1];
```

You'll get a nice console message like this:

```
2013-01-18 23:22:32.780 Zombie Test[9544:c07] *** -[__NSCFString substringFromIndex:]: message sent to deallocated instance 0x745dbf0
```

BRAINS!