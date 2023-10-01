---
title: Unpacking WWDC2023
bg: bg-gray-300
draft: true
createdAt: 2023-07-20
updatedAt: 2023-07-20
---

# Unpacking WWDC2023

## Structured Logging

For a minute this one felt like deja vu because what I got from the announcement and subsequent chatter in the iOS community seemed more about how we can replace print statements with OSLog now. But of course, OSLog has been around a while; since iOS 14/WWDC 2020 in its current Apple unified logging Swift APIs flavour.

What has really been announced is an Xcode feature that takes all that unified logging goodness and uses it as the basis for a really solid debugging tool integrated right into Xcode 15.

**stdio is for command line UI. OSLog is for debugging**

I think Apple may have taken the opportunity of releasing this new Xcode debugging tool that's going to get a lot of attention from the community to really double down and drive home the message – use `OSLog`, not `print()` – and that's where the kind of confusing narrative that we have some new way of logging has come from.

At this point users of CocoaLumberjack like me might be wondering if it is time to move to OSLog and for many the answer might be yes. But I found this great (discussion on a Github issue)[https://github.com/CocoaLumberjack/CocoaLumberjack/issues/1289] from CocoaLumberjack's repo that highlights some really good reasons why for some the answer might still be and may remain no.

Use cases where you want to collect logs from users or allow users to do something with logs or generally do something more than debug with your logs seems to be something OSLog doesn't lend itself to well but CocoaLumberjack does do this really well.

That being said though, I think the reasons OSLog doesn't do this is by design. Apple's unified logging system has _a lot_ of privacy preserving features built in. And we all know logs are a huge source of data leaks that can leave to privacy and security breaches. If in 2023 you're still saving logs to a text file on the user's device and possibly also sending that somewhere else from there, you might want to evaluate if the risk reward benefit is falling the way you want.

### Other things from Structured Debugging

`dwim-print` or 'do what I mean print' that LLDB `p` is now aliased to `dwim-print`

Some best practice:

create separate log handles for different components of application 



Tracing with OSLog

- Tracing with OSLog -> Instruments

Logging Profiling template, OSLog and Sign Posts

## Swift Macros

Code generation. Freestanding and attached. Attached macros is what is powering the new Observable macro that's replacing ObservableObject. And also @Model in Swift data.

## SwiftData

The next phase of Core Data? At first glance, SwiftData feels really similar to ORMs in backend web frameworks like Doctrine and Hibernate. Use Macros to define entities (or models now I guess?) and their attributes by writing it directly above the class or member declaration.

Compatible with Core Data with some form of migration available for existing Core Data codebases.

This one is really exciting in terms of the simplicity it seems to offer and the better mental mapping to existing ORM type data layers.

Apple says that SwiftData uses the proven storage architecture of Core Data. I think this goes further than just using the underlying SQLite database and my first thought is that the macros are generating code similar to what generating the category/extension based Entities from the Model does in CoreData. 

Core Data even with its improvements over the years has always been a steep learning curve, I think having an easier to grok native persistence layer even if it's only a better API into CoreData is going to be a really big thing for the ecosystem overall. At least, if avoiding Core Data is the reason for why so many projects end up shoehorning in a 3rd party database.

That being said 

## Observable

Like SwiftData this is another feature bootstapped by Swift Macros. I think this will help to flatten the learning curve for new SwiftUI developers but for existing SwiftUI developers who already know their way around `@ObservedObject`, `@StateObject` etc. there is a bit of mental re-mapping to do which I'll summarise.

## visionOS, Spatial Computing, RealityKit, Reality Composer Pro, ARKit

The obvious star of the show and I've saved the best for last. 

Fomeated Rendering: not rendering the perpipheral vision at as high of a resolution

### Immersiveness

There are 3 levels of immersion, an easy way to think of each is by the amount of Passthrough each offers. Passthrough is the live feed of the user's environment, delivered through the device's outward facing cameras and controlled by the user through the digital crown.

- Mixed: Partial Passthrough. Allows placing objects in the user's environment, basically a standard AR experience.

- Full: No Passthrough. Full 'VR' – though we don't use that word ;) There is no Passthrough so presumably the user cannot control the amount of Passthrough using the digital crown.

- Progressive: Like full only the user can see their surroundings still. I think this is the example where a user is watching a movie but can still look down to their popcorn.

The Immersive Spaces types are listed [here](https://developer.apple.com/documentation/swiftui/immersive-spaces/) and there's more about them in the [HIG](https://developer.apple.com/design/human-interface-guidelines/immersive-experiences#Immersion-and-passthrough).

### USDZ

[UZDZ details](https://www.marxentlabs.com/usdz-files/)

### Models for testing

- SketchFab
- Blender
