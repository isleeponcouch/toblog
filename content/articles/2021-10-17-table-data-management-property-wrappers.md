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


<div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full text-center">
          <thead class="border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                Wrapper
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                Relation to other wrappers  
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                Related Protocols 
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                Is Private?
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                User Defined
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                Allowed Types
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                @Binding 
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @State on the parent  
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                &nbsp;
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                No
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Simple
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Yes
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                When a parent has an @State that you want to bind to from a child 
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>