---
title: Accessing State's value outside of being installed on a View. This will result in a constant Binding of the initial value and will not update.
bg: bg-blue-300
createdAt: 2023-05-30
updatedAt: 2023-05-30
---

I sometimes like to explore the weirder error messages that Xcode throws at us even once I've fixed the initial issue. This is one of those:

```
Accessing State's value outside of being installed on a View. This will result in a constant Binding of the initial value and will not update.
```

*TL;DR: In case you landed here looking for an actual fix to this error:* this happens when trying to access a binding to a property on an `ObservableObject` that's wrapped with `@State` from within the observing View. The fix is to change the `@State` to an `@Published` and update the reference from `model.$property` to `$model.property`. That's the existing well published fix and the rest of this post is about the why.

This is a confusing warning message, the phrasing of `outside of being installed on a View` could give the impression that this is a lifecycle issue and so maybe the fix is to adjust the timing of when the property is accessed, like moving it within a `.onAppear` block or similar.

What the warning is in fact saying is that you can't use `@State` on something that isn't a `View` such as an `ObservedObject` and then reference that from your `View` and expect it to behave the same way. 

The reason is more or less obvious once you've realised you meant to use an `@Published`, but none the less. An `@State` knows that it belongs to the View it was declared in. The backing store for the `@State` SwiftUI created for us then notifies the View to update when that value is mutated. If we have an `@State` in an `ObservableObject` it has no way of knowing what View it is being used in, therefore nothing can be updated when it's mutated. So instead we just get a `constant binding of the initial value`, or in other words we get the value we initialised the property to and no updated values thereafter.

So instead we can use an `@Published` (which is likely what we meant to do when we encountered this warning) instead of `@State`.

This will bring us an error similar to the following `Cannot convert value of type 'Published<Double>.Publisher' to expected argument type 'Binding<Double>'`. Which is because our `model.$property` now accesses the projected value of an `@Published` which is a Publisher, so we need to change this to `$model.property` which gives us the a binding to an `ObservableObject`, a binding being the projected value of an `ObservableObject`.

All that to say `@State` properties should be `private` and I can't think of any good reason to use them in an `ObservableObject` in any case. I just thought this was an interesting error and wanted to run through the why of it.

For me, this is just a reminder of how much is magicked for us when working with SwiftUI.
