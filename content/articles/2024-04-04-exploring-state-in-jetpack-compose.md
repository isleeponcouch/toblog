---
title: Exploring State in Jetpack Compose
bg: bg-indigo-300
createdAt: 2024-04-04
updatedAt: 2024-04-04
---

I'm new to Jetpack Compose development and while I've been working reasonably productively on a Compose project I've found myself trusting in the magic of Compose in some places more than what I'm comfortable with in terms of my own knowledge.

So in this post I'm exploring more of how state works in Jetpack Compose.

Declarative UI shifts the UI development workflow from precedural step-by-step instructions on how to build and manipuilate what the user sees to modelling a state that when mutated will update the UI to reflect the change.

In Jetpack Compose, this is done with composable functions and in most cases `MutableState<T>`. We can however observe other types of state, as long as when we bind that state to our composable we do so as a `State<T>`. So although we may have other types we can use to model our state, such as LiveData and MutableStateFlows, at the point at which these types trigger a recomposition in Compose they're a `State<T>`; so for the purposes of this post, we can limit our scope to MutableState.

State is generally added to our composables using code similar to this:

```kotlin
@Composable
fun HelloWorld() {
    var greeting by remember { mutableStateOf("Hello")}

    Text(
        text = "$greeting, World!"
    )
}
```

Any change to `greeting` in the code above will trigger a recomposition of our `HelloWorld()` composable.

This post is really about exploring what happens in the single line of code `var greeting by remember { mutableStateOf("Hello")}` which we sometimes might see written with an `=` instead of `by`.

## The difference between `=` and `by` remember mutableStateOf

The practical difference between `= remember` and `by remember` is that when you use `by` you no longer need to access the .value property of your variable explicitly. So `if (foo.value) { }` becomes simply `if (foo) {}` and our code becomes prettier and more concise.

For example:

```kotlin
@Composable
fun FooBar() {
    val text = remember { mutableStateOf("Foo")}

    Text(
        text = "Hello, would you like some ${text.value}?",
        modifier = Modifier.clickable {
            text.value = "Bar"
        }
    )
}
```

Becomes:

```kotlin
@Composable
fun FooBar() {
    var text by remember { mutableStateOf("Foo")}

    Text(
        text = "Hello, would you like some $text?",
        modifier = Modifier.clickable {
            text = "Bar"
        }
    )
}
```

Going past the visible code outcome and looking more into what's going on behind the scenes

When we move from:

`val foo = remember { mutableStateOf("bar") }`

To:

`var foo by remember { mutableStateOf("bar") }`

Changing `=` to `by` moves from an assignment to a property delegation. Property delegation is a Kotlin feature that delegates the getting and setting of a property to an intermediate object.

This is a cool feature of Kotlin and it's worth taking a moment to think about what's going on here. Above, we have to change `var` to `val`. At a first take this seems kind of unnecessary, if our delegate is a reference type why do we need to use a `var`?

It's because we're not actually assigning anything here. When we use `by` we're not assigning a delegate to `foo`, we're telling Kotlin there's a delegate somewhere we want to be __responsible__ for `foo`. 

It's easily understood when seeing what the Kotlin compiler does when we use `by`. If we write something like:

```kotlin
class FooBar {
    var text: String by FooBarTextDelegate()
}
```

The compiler will generate something like:

```kotlin
class FooBar {
    private val text$delegate = FooBarTextDelegate()
    var text: String
        get() = text$delegate.getValue(this, this::text)
        set(value: String) = text$delegate.setValue(this, this::text, value)
}
```

So our delegate gets stored in a private property `text$delegate` and our getters and setters call its `getValue` and `setValue` methods.

Our `MutableState` (returned by `mutableStateOf()`) delegate just redirects to the `value` property:

```kotlin
inline operator fun <T> MutableState<T>.setValue(thisObj: Any?, property: KProperty<*>, value: T) {
    this.value = value
}

inline operator fun <T> State<T>.getValue(thisObj: Any?, property: KProperty<*>): T = value
```

## Remembering `remember`

Let's remember that `remember` is needed so our values will survive recomposition. If we rewrote our `FooBar` composable above and removed the `remember` whenever we tapped 'Foo' it would never change to 'Bar' because the update of our MutableState would cause a recomposition which would then ironically cause our value to be lost and set right back to 'Foo' on every tap.

Below is the source code for `remember`:

```swift
inline fun <T> remember(crossinline calculation: @DisallowComposableCalls () -> T): T =
    currentComposer.cache(false, calculation)
```

So we can see when we call remember we lift the lambda out of the composable and onto the `cache` property on currentComposer. 

For this to make sense we need to know that when you add the `@Composable` annotation to your composable function it rewrites it to accept a `Composer` parameter:

So 

`@Composable fun FooBar() {` 

becomes 

`fun FooBar($composer: Composer) {`

The compiler also does the same for any call to a composable function within that function, which includes `remember`.

When recomposition happens, if we've used remember, the current Composer is passed back into our composable function and its remember function and we have access to our same value that was stored during initial composition again.

## Wrapping up

Reading backwards through the line:

`var foo by remember { mutableStateOf("Foo") }`

from:

```kotlin
@Composable
fun FooBar() {
    var text by remember { mutableStateOf("Foo")}

    Text(
        text = "Hello, would you like some $text?",
        modifier = Modifier.clickable {
            text = "Bar"
        }
    )
}
```

On initial composition, we get a MutableState for our string "Foo" by calling `mutableStateOf`

We store that in a lambda which `remember` adds to a cache on the Composer object that will be passed into it from its containing composable.

We create a delegate with `by` that makes our MutableState less verbose to work with.

When we change the value of our MutableState from "Foo" to "Bar" we trigger recomposition, when our Composable is recompositioned the composer containing our lambda which contains our MutableState which now holds "Bar" instead of "Foo" is passed back into it and our Text() now shows "Bar" instead of "Foo" too, because our triggering MutableState was remembered instead of being recreated.

And while this semi-detailed account still skips over a lot of detail, that's essentially how our state is being handled in Compose. 

Breaking it down this way has helped me understand the code I'm writing in Compose a lot better. If you've stumbled upon this post, I hope it's done the same for you – if not, soz mate.







