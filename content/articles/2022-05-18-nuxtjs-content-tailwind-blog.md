---
title: New blog stack with NuxtJS, Content and Tailwind
bg: bg-green-300
createdAt: 2022-05-18
updatedAt: 2022-07-26
---

The only thing I enjoy more than inevitably deleting my blog, is rebuilding it again at later point with a new stack. The current incarnation is NuxtJS with the `@nuxt/content` module, Tailwind CSS and Github pages.

~~I have a private Github repo for the NuxtJS codebase and a public repo for the Github pages content which is linked into the NuxtJS `dist` repo as a submodule.~~ 

~~The git submodules workflow isn't my favourite, but for this kind of non-standard use case it works reasonably well and I can live with it.~~ Shortly after I realised Github Pages allows the configuring of a directory other than the root of the repo to be used for serving content, so this was rendered moot and I simply get Nuxt to generate my content into a `docs` directory now and deploy all as one.

When I generate the static site with NuxtJS the dist repo is updated and publishing is done with a push back upstream to Github.

Nuxt Content has a handful of features which makes it great for this kind of Github pages powered blogging workflow, like being able to put the Github Page's `CNAME` file in the `static` directory and having it copied over to your served content directory on generation.
