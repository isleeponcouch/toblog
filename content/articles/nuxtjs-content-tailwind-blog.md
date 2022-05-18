---
title: NuxtJS and Content
bg: bg-green-300
---

The only thing I enjoy more than inevitably deleting my blog, is rebuilding it again at later point with a new stack. The current incarnation is NuxtJS with the `@nuxt/content` module, Tailwind CSS and Github pages.

I have a private Github repo for the NuxtJS codebase and a public repo for the Github pages content which is linked into the NuxtJS `dist` repo as a submodule.

The git submodules workflow isn't my favourite, but for this kind of non-standard use case it works reasonably well and I can live with it.

When I generate the static site with NuxtJS the dist repo is updated and publishing is done with a push back upstream to Github.