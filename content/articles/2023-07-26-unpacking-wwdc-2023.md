---
title: Unpacking WWDC 2023
bg: bg-orange-300
createdAt: 2023-07-26
updatedAt: 2023-10-02
---

There was something about this year's WWDC that felt like arriving at a destination we've been en route to for years now. 

The announcement of visionOS really unveiled the true importance of frameworks like ARKit, RealityKit, Reality Composer and even new additions of SwiftUI. Xcode 15 brought home the power of OSLog, SwiftData took features of Swift and SwiftUI to give us what will essentially be CoreData++, even SFSymbols in a new spatial computing world where symbols play an extremely important role made more sense as something that needed investing in to make all the pieces work and fit together. 

In short, visionOS feels like the last stop in a long journey of Apple tech announcements that were great on their own but were ultimately necessary ground work to get us to visionOS.

With that said, these are my notes on some of the new tech that came out of WWDC this year.

## Structured Logging

For a minute this one felt like deja vu because what I got from the announcement and subsequent chatter in the iOS community seemed more about how we can replace print statements with OSLog now. But of course, OSLog has been around a while; since iOS 14/WWDC 2020 in its current Apple unified logging Swift APIs flavour.

What has really been announced is an Xcode feature that takes all that unified logging goodness and uses it as the basis for a really solid debugging tool integrated right into Xcode 15.

### stdio is for command line UI. OSLog is for debugging

I think Apple may have taken the opportunity of releasing this new Xcode debugging tool that's going to get a lot of attention from the community to really double down and drive home the message to use `OSLog`, not `print()` and that's where the kind of confusing narrative that we have some new way of logging has come from.

At this point users of CocoaLumberjack like me might be wondering if it is time to move to OSLog and for many the answer might be yes. But I found this great [discussion on a Github issue](https://github.com/CocoaLumberjack/CocoaLumberjack/issues/1289) from CocoaLumberjack's repo that highlights some really good reasons why for some the answer might still be and will may remain, no.

Use cases where you want to collect logs from users or allow users to do something with logs or generally do something more than debug with your logs seems to be something OSLog doesn't lend itself to well, but CocoaLumberjack does do this really well.

That being said though, I think the reasons OSLog doesn't do this is by design. Apple's unified logging system has _a lot_ of privacy preserving features built in. And we all know logs are a huge source of data leaks that can leave to privacy and security breaches. If in 2023 you're still saving logs to a text file on the user's device and possibly also sending that somewhere else from there, you might want to evaluate if the risk reward benefit is falling the way you want.

### Other things from Structured Debugging

* `dwim-print` or 'do what I mean print' that LLDB `p` is now aliased to `dwim-print`
* Create separate log handles for different components of application 
* Tracing with OSLog in Instruments
* Logging Profiling template, OSLog and Sign Posts

## SFSymbols gets a glow up

SFSymbols 5 introduced new animations which are super high quality animations/transitions that can be applied with the `.symbolEffect()` modifer in iOS 17. I've had a chance to have a play around with these and I've made a [demo app available on my Github](https://github.com/isleeponcouch/sfsymbolthing) for exploring what's possible.

## Swift Macros

So this is kind of a big deal. Swift Macros are essentially like macros in any other language, but they're more advanced in that they go further than just replacing the macro call with the contents of the macro but actually parse code and dynamically change it before compilation. This is what's powering SwiftData, the new Observable protocol and the new SwiftUI preview syntax.

I need to dive deeper but for now I'm following [A curated list of awesome Swift Macros](https://github.com/krzysztofzablocki/Swift-Macros) to keep in the loop.

## SwiftData

The next phase of Core Data? At first glance, SwiftData feels really similar to ORMs in backend web frameworks like Doctrine and Hibernate. Use Macros to define entities (or models now I guess?) and their attributes by writing it directly above the class or member declaration.

Compatible with Core Data with some form of migration available for existing Core Data codebases.

This one is really exciting in terms of the simplicity it seems to offer and the better mental mapping to existing ORM type data layers.

Apple says that SwiftData uses the proven storage architecture of Core Data. ~~I think this goes further than just using the underlying SQLite database and my first thought is that the macros are generating code similar to what generating the category/extension based Entities from the Model does in CoreData.~~ Yeah no, it's definitely Core Data.

Core Data even with its improvements over the years has always been a steep learning curve, I think having an easier to grok native persistence layer even if it's only a better API into CoreData is going to be a really big thing for the ecosystem overall. At least, if avoiding Core Data is the reason for why so many projects end up shoehorning in a 3rd party database.

I put a [demo project on Github](https://github.com/isleeponcouch/persistphotoswiftdata) that persists photos picked from `PhotosUI` with `SwiftData`,

## Observable

Like SwiftData this is another feature bootstapped by Swift Macros. I think this will help to flatten the learning curve for new SwiftUI developers but for existing SwiftUI developers who already know their way around `@ObservedObject`, `@StateObject` etc. there is a bit of mental re-mapping to do.

## visionOS, Spatial Computing, RealityKit, Reality Composer Pro, ARKit

There's a lot to unpack here and I've started in on a demo project, so maybe I can write a stand-alone post about this soon. There's definitely enough here to warrant it.

Overall an especially exciting WWDC, with a lot more sent out into the world by Apple than what I've covered here. With visionOS and Vision Pro we're at the beginning of another generation of Apple tech and it's an exciting space to be.
