---
title: Comparison table of @EnvironmentObject, @State, @StateObject, @ObservedObject, @Environment
bg: bg-purple-300
createdAt: 2021-10-17
updatedAt: 2022-05-18
---

There are a handful of essential SwiftUI data management property wrappers we need to be familiar with when using the framework. 

| Wrapper            | Relation to other wrappers                        | Related Protocols | Is Private?     | Allowed Types   | User Defined | Notes |
| ------------------ | -----------------------------------------------   | ----------------- | --------------- | -------------   | --------     | ----- |
| @Binding           | @State on the parent                              |                   | No              | Simple          | Yes          | When a parent has an @State that you want to bind to from a child view. Play button example where a play button uses and toggles the `isPlaying` property of a parent view.       |
| @State             | @Binding on a child                               |                   | Yes             | Simple          | Yes          | -      |
| @StateObject       | @ObservedObject, @EnvironmentObject, @Published   | ObservableObject  | No              | Complex         | Yes          | Use this to instantiate an ObservableObject directly in a local view.     |
| @ObservedObject    | @StateObject, @Published                          | ObservableObject  | No              | Complex         | Yes          | A property wrapped with @ObservedObject should always have its value passed in externally, i.e. from an @StateObject in an ancestor      |
| @EnvironmentObject | @StateObject, @ObservableObject, @Published       | ObservableObject  | No              | Complex         | Yes          | Similarly to @ObservedObject an @EnvironmentObject should always haves its value passed in externally. These are just ObservableObjects stored in the environment.      |
| @Environment       | -                                                 |                   | No              | Simple, Complex | No           | [Complete list of environment values](https://developer.apple.com/documentation/swiftui/environmentvalues) |
| @Published         | @StateObject, @ObservedObject, @EnvironmentObject | ObservableObject  | No              | Simple          | Yes          | Calls `send` on the `objectWillChange` property of an `ObservedObject` |
