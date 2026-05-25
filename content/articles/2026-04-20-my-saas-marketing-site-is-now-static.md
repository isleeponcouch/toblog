---
title: I converted my WordPress SaaS marketing website to static for AI 
bg: bg-blue-600
decoration: decoration-blue-600
archived: false
createdAt: 2026-04-20
updatedAt: 2026-04-20
---

I'm begrudgingly responsible for the marketing website of a product I built. The site sits seperately from everything else, completely different hosting providers not just separate instances, no connection back into the real product. It runs on an opensource CMS, has a lot of mostly clunky plugins for SEO, caching, backups. It does the job, I guess.

Recently I used Claude Cowork/Dispatch to make some updates to it. It did a pretty good job. I logged the browser in to the backend, it used the Chrome plugin to control it in a non-headless kind of way which seemed a bit wasteful but worked, created some content and inserted it into the CMS in the right places in the right style, no mistakes. I can't stand the workflow for CMS backends, it's slow and boring and the disconnect between working in an editor and the code that is ultimately produced is frustrating for any developer because we'd just be faster and better straight in the code. I'm a big fan of static generators, or even just collections of HTML files. So it was great to actually be able to delegate something I can't stand to an agent. 

But wait a second. If I'm just getting an agent to update the CMS now, do I even need that anymore or is it just a bottleneck to the agent who is going to be doing this work from now on?

You've guessed by now – but my marketing website is now a static website. I exported the whole lot to a big old collection of html and css files, structured in directories to maintain existing URL paths, with each page or article becoming an `index.html` in its directory.

I took this export and added Nuxt Content, which makes the content heavy parts of the webite like articles, case studies and support documents easy to work with as markdown files and gives the whole thing some sembelence of a build process.

Now my workflow for this site is to prompt whichever agent is going to do the work, review the changes in git, or by running `npm run dev` if I actually want to preview it in place in a browser. Then I deploy with a `git push`, the upstream runs the static generation job and then publishes.

## The benefits of this have been huge.

- I don't have to follow the clunky CMS backend workflow. 
- Neither does an agent. 
- Because there's no computer use, the agent works quicker and cheaper. 
- I can write articles in markdown and easily get an agent to expand on it if needed.
- The site is noticeably faster, even with caching content management systems are always going to be slower.
- The site is ranking much better in Google, because:
  - The site is faster.
  - It was super easy to do a pass on the entire site for on-page SEO. CMS SEO relies on hooks, hooks rely on themes placing hooks in the right place, and even in the best case, there's always going to be content the plugins can't reach. It is super easy quick and easy for an agent to access every single element of a static site.
  - I can generate a complete sitemap and breadcrumb structure 
  - I have a much better open graph 
  - Implementing any standard is trivial, so is changing keyword strategy.
- The site is more accessible. Doing a WCAG 2.0 AA pass on a static website and fixing every last compliance issue is trivial.
- The site is more secure. It's just a bunch of html files in a bucket.
- I can host it anywhere, S3, Github Pages, Cloudflare Pages, whereever.
- Moving the site around is trivial.
- Backups happen as part of the deployment and roll backs are just a `git reset` away. Compared to CMS backups which require collecting a series of files in the correct structure and a database dump.
- I changed the site's design on a whim in no time at all because it's just a prompt.
- I can add Vue Compontents or even just vanilla javascript components by prompting them directly into the project. This is actually a uge benefit for a marketing website where you can make explainers, calculators, and whatever other marketing doodads you might need for the moment.
- There's no more updating the CMS and its plugins and waiting for the day something in that chain breaks.
 
This isn't going to work for sites that have multiple human beings of varying technical capabilty editing the same content. You're stuck with your CMS if that's the case.

But if you're a single person company, indie dev, or you're just the only person at your company who touches the website. I can't recommend this highly enough. The speedup is huge, the cost savings will likely cover your agent expenses, which are low in any case, and you'll likely enjoy the process more because even with the agent involvement this way of working is less abstracted than the standard CMS workflow is.
