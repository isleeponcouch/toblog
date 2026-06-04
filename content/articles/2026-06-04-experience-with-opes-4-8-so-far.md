---
title: First impressions of Opus 4.8 
bg: bg-fuschia-600
decoration: decoration-fuschia-600
createdAt: 2026-06-04
updatedAt: 2026-06-04
---

It's early days but I want to get down some of my thoughts about how Opus 4.8 has been performing in my workflow so far. While going through this period of adopting agentic workflows and evaluating models as they perform in my codebase, I try not to read the opinions of others until I've solidified my own thoughts. Because most of how we evaluate these things at the moment beside benchmark scores is just how they 'feel' to us; so I try hard to not let others feelings sway my experience in the early days of a new model.

Since its release I've been using Codex GPT-5.5 as my daily driver for everything but frontend and design work which I've found Opus 4.7 handles really well. Better than Codex. But because GPT-5.5 is expensive and I blast through my rate limit, I've been tending to save my harder tasks for GPT and put the rest through Claude as well as well as the design and front-end work that I specifically reach for it on merit not cost savings.

But I've been using Opus 4.8 most of this week for most tasks just for getting a feel of it. For the most part I haven't really felt the need to reach for 5.5 in this time. I have however been sorely missing the OpenAI harnesses just purely from the UI/DX experience they provide. I also find the skill system in Codex a bit easier to work with.

If you're working from the Claude macOS desktop app Opus 4.8 out of the box is going to behave more or less the same as 4.7 before it. I've found both models are very sensitive to the Max setting; if you set it for a task that doesn't require it, it will go off for an hour and blast through a ton of tokens to produce something you'll probably just `git reset --hard` at the end. But with the reasoning set to something...reasonable, I've been finding the output from 4.8 maybe just slightly better than 4.7 and probably mostly close to GPT-5.5; which is likely why I haven't felt the need to switch back to my usual daily driver much this week.

That is also very much driven by cost, though. I haven't hit my rate limit with Opus 4.8 yet on my Max subscription and I've been hitting it hard all week. If I were in GPT-5.5, I'd have been hitting it non-stop for the same work. What I miss from GPT-5.5, and why I'd go back instantly if the costs were the same, is the harness as I've mentioned, but also the speed. GPT-5.5 runs laps around Opus 4.8. GPT-5.5 on fast mode is just, amazing. It's actually a little hard to stomach coming away from 5.5 just for that reason.

Of course the big features of Opus 4.8 is dynamic workflows. In the macOS Claude app, if you want them, you just ask for them in your prompt. I've had mixed results.

This week I had a large fundamental change to make to a product. It touched a lot of services and was reasonably complex. I actually gave the job to GPT-5.5 to start with and what I got back was the usual GPT-5.5 in-depth output, but I didn't end up using it because I felt the way GPT-5.5 approached the problem touched too many places and was a bit hard to reason about. This was a fairly high stakes change and the fix I envisioned was a simpler one.

I ended up passing the job to 4.8 with a similar but not identical prompt and although it was far from a one-shot session, the end result was a good a mix of in-depth enough to address the change reliably but simple enough it could be understood quickly and deployed to production with a degree of confidence. Though honestly, I'm not sure this result was notably different to 4.7. I did not specifically ask for subagents or dynamic workflows though and as far as I can tell they weren't used.

One area where I did invoke the dynamic workflows incantation though was on a design change in a SwiftUI View. The prompt was essentially to take the information that was already in the `View` and update it to match other areas of the app that are more on-brand. Opus 4.8 with no dynamic workflows did a reasonable job at this, about what I expected from my experience with 4.7. But there were a handful of changes I still wanted, so I `get reset --hard` the lot and prompted again, this time with dynamic workflows; The session ran for over 30 minutes, used 9 subagents including 4 specialised design agents, 1 implementation agent, 3 adversarial review agents and 1 fix agent, used over 600k tokens and produced goose egg. A design that was vaguely on brand but not close enough to say it had accomplished it, repeated elements, spaced things awkwardly, placed things awkwardly – unusable.

So all this to say, don't use dynamic workflows in your Opus 4.8 prompts when doing user interface work.

