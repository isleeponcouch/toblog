__NUXT_JSONP__("/2022-05-18-nuxtjs-content-tailwind-blog", (function(a,b,c,d,e,f){return {data:[{article:{slug:"2022-05-18-nuxtjs-content-tailwind-blog",title:"New blog stack with NuxtJS, Content and Tailwind",bg:"bg-green-600",decoration:"decoration-green-600",createdAt:"2022-05-18T00:00:00.000Z",updatedAt:"2022-07-26T00:00:00.000Z",toc:[],body:{type:"root",children:[{type:b,tag:c,props:{},children:[{type:a,value:"The only thing I enjoy more than inevitably deleting my blog, is rebuilding it again at later point with a new stack. The current incarnation is NuxtJS with the "},{type:b,tag:d,props:{},children:[{type:a,value:"@nuxt\u002Fcontent"}]},{type:a,value:" module, Tailwind CSS and Github pages."}]},{type:a,value:e},{type:b,tag:c,props:{},children:[{type:b,tag:f,props:{},children:[{type:a,value:"I have a private Github repo for the NuxtJS codebase and a public repo for the Github pages content which is linked into the NuxtJS "},{type:b,tag:d,props:{},children:[{type:a,value:"dist"}]},{type:a,value:" repo as a submodule."}]}]},{type:a,value:e},{type:b,tag:c,props:{},children:[{type:b,tag:f,props:{},children:[{type:a,value:"The git submodules workflow isn't my favourite, but for this kind of non-standard use case it works reasonably well and I can live with it."}]},{type:a,value:" Shortly after I realised Github Pages allows the configuring of a directory other than the root of the repo to be used for serving content, so this was rendered moot and I simply get Nuxt to generate my content into a "},{type:b,tag:d,props:{},children:[{type:a,value:"docs"}]},{type:a,value:" directory now and deploy all as one."}]},{type:a,value:e},{type:b,tag:c,props:{},children:[{type:a,value:"When I generate the static site with NuxtJS the dist repo is updated and publishing is done with a push back upstream to Github."}]},{type:a,value:e},{type:b,tag:c,props:{},children:[{type:a,value:"Nuxt Content has a handful of features which makes it great for this kind of Github pages powered blogging workflow, like being able to put the Github Page's "},{type:b,tag:d,props:{},children:[{type:a,value:"CNAME"}]},{type:a,value:" file in the "},{type:b,tag:d,props:{},children:[{type:a,value:"static"}]},{type:a,value:" directory and having it copied over to your served content directory on generation."}]}]},dir:"\u002Farticles",path:"\u002Farticles\u002F2022-05-18-nuxtjs-content-tailwind-blog",extension:".md"}}],fetch:{},mutations:void 0}}("text","element","p","code","\n","del")));