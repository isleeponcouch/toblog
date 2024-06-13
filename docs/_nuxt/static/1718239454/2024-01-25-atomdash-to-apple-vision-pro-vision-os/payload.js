__NUXT_JSONP__("/2024-01-25-atomdash-to-apple-vision-pro-vision-os", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$,aa,ab,ac,ad,ae){return {data:[{article:{slug:"2024-01-25-atomdash-to-apple-vision-pro-vision-os",title:"Releasing my chemistry tutor app Atomdash natively for visionOS",bg:"bg-blue-600",decoration:"decoration-blue-600",createdAt:z,updatedAt:z,toc:[{id:A,depth:s,text:B},{id:C,depth:s,text:D},{id:E,depth:q,text:F},{id:G,depth:q,text:H},{id:I,depth:q,text:"A note on .defaultSize(width:height:depth:in:)"},{id:h,depth:q,text:J},{id:K,depth:q,text:L},{id:M,depth:s,text:N}],body:{type:"root",children:[{type:b,tag:f,props:{},children:[{type:a,value:"In just over a week from now the Apple Vision Pro will launch and along with it version 1.0 of visionOS. This is my account of the process of getting my chemistry tutor app Atomdash ready for this new platform."}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"From the outset, let me just say, this post will be short. Like a lot of developers, my app ran on the Vision Pro simulator pretty well out of the box in its 'Designed for iPad' state."}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"If I were happy to accept a bit of ugly UI and a clunky user experience, I more or less could've just let it go out like that."}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"But with a relatively small amount of effort, I can have Atomdash native to visionOS from day one."}]},{type:a,value:c},{type:b,tag:n,props:{src:"\u002Fimages\u002Fposts\u002Fatomdash-visionos-1.png",alt:o,className:[p]},children:[]},{type:a,value:c},{type:b,tag:v,props:{id:A},children:[{type:b,tag:j,props:{href:"#design-for-ipadiphone-vs-apple-vision",ariaHidden:k,tabIndex:l},children:[{type:b,tag:d,props:{className:[h,m]},children:[]}]},{type:a,value:B}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"When you open Xcode 15.2, Support Destinations now shows Apple Vision (Designed for iPad) or Apple Vision (Designed for iPad) as a supported destination for your target straight out of the box. If you don't do any specific work to support Apple Vision, your app will run this way on visionOS. If you choose to go with this option, your app will show as designed for iPhone\u002FiPad and retain the normal round square app icon. visionOS natives will have a layered circle icon."}]},{type:a,value:c},{type:b,tag:n,props:{src:"\u002Fimages\u002Fposts\u002Fatomdash-visionos-2.png",alt:o,className:[p]},children:[]},{type:a,value:c},{type:b,tag:v,props:{id:C},children:[{type:b,tag:j,props:{href:"#the-process",ariaHidden:k,tabIndex:l},children:[{type:b,tag:d,props:{className:[h,m]},children:[]}]},{type:a,value:D}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"To support visionOS natively, we just add the 'Apple Vision' destination, which will replace the 'Apple Vision (Designed for iPad)' destination. From there it's a matter of going through each screen of your app adjusting the UI to work with visionOS and rearranging your app structure to feel more like a visionOS native."}]},{type:a,value:c},{type:b,tag:n,props:{src:"\u002Fimages\u002Fposts\u002Fatomdash-visionos-3.png",alt:o,className:[p]},children:[]},{type:a,value:c},{type:b,tag:r,props:{id:E},children:[{type:b,tag:j,props:{href:"#hoisting-state",ariaHidden:k,tabIndex:l},children:[{type:b,tag:d,props:{className:[h,m]},children:[]}]},{type:a,value:F}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"In my experience, and I imagine the experience will be similar for most developers, the process of supporting visionOS natively could mostly be described as hoisting state to the "},{type:b,tag:g,props:{},children:[{type:a,value:O}]},{type:a,value:" level where the main "},{type:b,tag:g,props:{},children:[{type:a,value:"OurApp: App"}]},{type:a,value:" struct is and adding "},{type:b,tag:g,props:{},children:[{type:a,value:P}]},{type:a,value:"s to house UI that was either a "},{type:b,tag:g,props:{},children:[{type:a,value:Q}]},{type:a,value:" or "},{type:b,tag:g,props:{},children:[{type:a,value:"sheet"}]},{type:a,value:" in the iOS and iPadOS versions."}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"This will mean refactoring your codebase so those UI elements can stand alone if they don't already. Then adding them to a "},{type:b,tag:g,props:{},children:[{type:a,value:P}]},{type:a,value:" with an "},{type:b,tag:g,props:{},children:[{type:a,value:"id"}]},{type:a,value:", hoisting any state i.e. "},{type:b,tag:g,props:{},children:[{type:a,value:"ObservableObject"}]},{type:a,value:"s associated with those UI up to the "},{type:b,tag:g,props:{},children:[{type:a,value:O}]},{type:a,value:" level and then replacing any calls to "},{type:b,tag:g,props:{},children:[{type:a,value:Q}]},{type:a,value:" etc. to "},{type:b,tag:g,props:{},children:[{type:a,value:"openWindow(id: \"id\")"}]},{type:a,value:w}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"To get access to openWindow and dismissWindow, bring them in from the environment:"}]},{type:a,value:c},{type:b,tag:R,props:{className:[S]},children:[{type:b,tag:T,props:{className:[U,V]},children:[{type:b,tag:g,props:{},children:[{type:b,tag:d,props:{className:[e,W,X]},children:[{type:a,value:Y}]},{type:b,tag:d,props:{className:[e,i]},children:[{type:a,value:x}]},{type:b,tag:d,props:{className:[e,i]},children:[{type:a,value:Z}]},{type:b,tag:d,props:{className:[e,i]},children:[{type:a,value:w}]},{type:a,value:"openWindow"},{type:b,tag:d,props:{className:[e,i]},children:[{type:a,value:y}]},{type:a,value:t},{type:b,tag:d,props:{className:[e,u]},children:[{type:a,value:_}]},{type:a,value:t},{type:b,tag:d,props:{className:[e,u]},children:[{type:a,value:$}]},{type:a,value:" openWindow\n"},{type:b,tag:d,props:{className:[e,W,X]},children:[{type:a,value:Y}]},{type:b,tag:d,props:{className:[e,i]},children:[{type:a,value:x}]},{type:b,tag:d,props:{className:[e,i]},children:[{type:a,value:Z}]},{type:b,tag:d,props:{className:[e,i]},children:[{type:a,value:w}]},{type:a,value:"dismissWindow"},{type:b,tag:d,props:{className:[e,i]},children:[{type:a,value:y}]},{type:a,value:t},{type:b,tag:d,props:{className:[e,u]},children:[{type:a,value:_}]},{type:a,value:t},{type:b,tag:d,props:{className:[e,u]},children:[{type:a,value:$}]},{type:a,value:" dismissWindow\n"}]}]}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"If you target less than iOS 17 in your current iOS target, you can wrap those in the "},{type:b,tag:g,props:{},children:[{type:a,value:"#if os()"}]},{type:a,value:" macro:"}]},{type:a,value:c},{type:b,tag:R,props:{className:[S]},children:[{type:b,tag:T,props:{className:[U,V]},children:[{type:b,tag:g,props:{},children:[{type:b,tag:d,props:{className:[e,aa,ab]},children:[{type:b,tag:d,props:{className:[e,ac]},children:[{type:a,value:"#if"}]},{type:a,value:" os"},{type:b,tag:d,props:{className:[e,i]},children:[{type:a,value:x}]},{type:a,value:"visionOS"},{type:b,tag:d,props:{className:[e,i]},children:[{type:a,value:y}]}]},{type:a,value:c},{type:b,tag:d,props:{className:[e,"comment"]},children:[{type:a,value:"\u002F\u002F do a visionOS thing 🤘🏻"}]},{type:a,value:c},{type:b,tag:d,props:{className:[e,aa,ab]},children:[{type:b,tag:d,props:{className:[e,ac]},children:[{type:a,value:"#endif"}]}]},{type:a,value:c}]}]}]},{type:a,value:c},{type:b,tag:n,props:{src:"\u002Fimages\u002Fposts\u002Fatomdash-visionos-4.png",alt:o,className:[p]},children:[]},{type:a,value:c},{type:b,tag:r,props:{id:G},children:[{type:b,tag:j,props:{href:"#ui",ariaHidden:k,tabIndex:l},children:[{type:b,tag:d,props:{className:[h,m]},children:[]}]},{type:a,value:H}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"In the case of Atomdash, getting the UI ready for visionOS was a combination of removing background modifiers so that UI elements would sit on the translucent material backgrounds of the visionOS surface windows, specifically adding "},{type:b,tag:g,props:{},children:[{type:a,value:".regularMaterial"}]},{type:a,value:" background modifiers to other components, removing coloured texts, and resizing things."}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"I used preprocessor macros because I only had a small handful of UI changes to make. If I had to make more significant changes, or if you do, I would go down the path of creating a separate target for visionOS. Atomdash is reasonably well setup for this kind of architecture with most things already existing in their own frameworks. But in my case, it would have been overkill to create a new target."}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"Support for tvOS and macOS are on the roadmap for Atomdash, when I get to this work it might make sense to swap out the preprocessor macros for checking for "},{type:b,tag:j,props:{href:"https:\u002F\u002Fdeveloper.apple.com\u002Fdocumentation\u002Fvisionos\u002Fpresenting-windows-and-spaces",rel:["nofollow","noopener","noreferrer"],target:"_blank"},children:[{type:a,value:"multiple scene support"}]},{type:a,value:" instead."}]},{type:a,value:c},{type:b,tag:n,props:{src:"\u002Fimages\u002Fposts\u002Fatomdash-visionos-5.png",alt:o,className:[p]},children:[]},{type:a,value:c},{type:b,tag:r,props:{id:I},children:[{type:b,tag:j,props:{href:"#a-note-on-defaultsizewidthheightdepthin",ariaHidden:k,tabIndex:l},children:[{type:b,tag:d,props:{className:[h,m]},children:[]}]},{type:a,value:"A note on "},{type:b,tag:g,props:{},children:[{type:a,value:".defaultSize(width:height:depth:in:)"}]}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"Currently the official documentation says this modifier is only available on volumetric windows "},{type:b,tag:g,props:{},children:[{type:a,value:".windowStyle(.volumetric)"}]},{type:a,value:" but this modifier does work on plain windows as well. Which seems absolutely necessary."}]},{type:a,value:c},{type:b,tag:r,props:{id:h},children:[{type:b,tag:j,props:{href:"#icon",ariaHidden:k,tabIndex:l},children:[{type:b,tag:d,props:{className:[h,m]},children:[]}]},{type:a,value:J}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"visionOS like tvOS requires a layered icon. For visionOS there are 3 layers. Unfortunately the Atomdash logo isn't easily split into layers, but I got a build error trying to use only a single layer. I tried with 3 layers all of the flattened logo image and that worked and got through approval. Not an ideal solution, but it will do for now."}]},{type:a,value:c},{type:b,tag:r,props:{id:K},children:[{type:b,tag:j,props:{href:"#app-store-submission",ariaHidden:k,tabIndex:l},children:[{type:b,tag:d,props:{className:[h,m]},children:[]}]},{type:a,value:L}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"This really isn't any different to deploying to any other platform. There are 2 minor gotchas"}]},{type:a,value:c},{type:b,tag:ad,props:{},children:[{type:a,value:c},{type:b,tag:ae,props:{},children:[{type:a,value:"Binary not showing up in the builds for visionOS"}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"Even though we've added the visionOS supported destination, the binary defaults to the iOS base SDK. Change this in the build settings under "},{type:b,tag:g,props:{},children:[{type:a,value:"Architectures -\u003E Base SDK"}]},{type:a,value:" to visionOS."}]},{type:a,value:c},{type:b,tag:ad,props:{start:s},children:[{type:a,value:c},{type:b,tag:ae,props:{},children:[{type:a,value:"Screenshots"}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"The App Store requires visionOS screenshots at "},{type:b,tag:g,props:{},children:[{type:a,value:"3840 . 2160"}]},{type:a,value:" but the visionOS simulator takes screenshots at "},{type:b,tag:g,props:{},children:[{type:a,value:"2732 . 2048"}]},{type:a,value:". I just brought my screenshots into Photoshop and enlarged them without messing up the aspect ratio. My app was approved so this seems to be acceptable."}]},{type:a,value:c},{type:b,tag:n,props:{src:"\u002Fimages\u002Fposts\u002Fatomdash-visionos-6.png",alt:o,className:[p]},children:[]},{type:a,value:c},{type:b,tag:v,props:{id:M},children:[{type:b,tag:j,props:{href:"#thats-it",ariaHidden:k,tabIndex:l},children:[{type:b,tag:d,props:{className:[h,m]},children:[]}]},{type:a,value:N}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"Shortly after starting to write this post, Atomdash for visionOS was approved for the App Store. The first Apple Vision Pros and visionOS 1.0 will be in the hands of real users in just over a week on Feb 2nd and Atomdash will be available as a native app in the new App Store on day one, which I'm thrilled about."}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"I'll continue to improve my support for the platform in the coming months."}]}]},dir:"\u002Farticles",path:"\u002Farticles\u002F2024-01-25-atomdash-to-apple-vision-pro-vision-os",extension:".md"}}],fetch:{},mutations:void 0}}("text","element","\n","span","token","p","code","icon","punctuation","a","true",-1,"icon-link","img","Atomdash chemistry tutor running in the Apple Vision Pro simulator","mx-auto",3,"h3",2," ","keyword","h2",".","(",")","2024-01-25T00:00:00.000Z","design-for-ipadiphone-vs-apple-vision","Design for iPad\u002FiPhone vs. Apple Vision","the-process","The process","hoisting-state","Hoisting State","ui","UI","a-note-on-defaultsizewidthheightdepthin","Icon","app-store-submission","App Store submission","thats-it","That's it","@main","WindowGroup","popover","div","nuxt-content-highlight","pre","language-swift","line-numbers","attribute","atrule","@Environment","\\","private","var","directive","property","directive-name","ol","li")));