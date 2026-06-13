---
title: I had a Fable session in flight when the suspension directive hit  
bg: bg-blue-600
decoration: decoration-blue-600
createdAt: 2026-06-13
updatedAt: 2026-06-13
---

Well this was supposed to be a "first impressions of Fable 5" post but instead it's this. Today I was in the backyard with my dog when I got a message from a friend. Something about Fable and at least I had gotten a chance to use it with a link to an [Anthropic article](https://www.anthropic.com/news/fable-mythos-access). It took a minute to understand the message, but when it suddenly became clear that Fable had been shutdown by government directive I thought "but I'm using it right now".

But no, I wasn't. When I came back inside, this was what was waiting for me in my terminal:

<img src="/images/posts/farewell-fable.png" alt="Screenshot of Fable model missing error message" class="mx-auto" />
<img src="/images/posts/farewell-fable2.png" alt="Screenshot of Fable 5 is temporarily unavailable error" class="mx-auto" />

And that was that. As an Australian user outside the US, Anthropic had pulled the model.

I have a lot of thoughts about this, but my initial feeling is a sense of relief. Relief that I had never built anything directly on top of a technology that can be shutdown without warning within an hour on the whim of a foreign government. That sense of relief won't be shared by many in tech throughout the world though, especially those who are responsible for making decisions about the tech their companies are built around. I can only imagine the meetings people will be having on Monday about projects they have in flight that either build directly on top of, or strongly embed, foreign owned models into their product or organisation.

I think this moment is going to change the direction, or at the very least the pace, of AI projects globally. Because even if you hadn't had time to build on Fable, we've now got a case study on how swiftly and arbitrarily the foundation you're building on can be pulled.

## First impressions of Fable 5

It's moot now and I didn't get long with the model before it was 86'd. But I had enough sessions to get a good feel of Fable 5.

Fable essentially felt like a small step up from 4.8, the step up came from I think slightly more detailed and direct analysis of problems. It also spawned more related session jobs than 4.8 and 4.7 before it, finding genuinely valuable changes that fit within the boundary of what it had just been working on. Though I spent so little time with 4.8 before switching to Fable 5 on release day I wonder if I can really make any fair comparison.

What was clear thought were the things Fable sucked at.

1. Fable would constantly create auto-memories for things that really didn't need to be remembered. It was enough of a problem that I added this to my `zshrc` to wipe them `alias amnesia="rm -f ~/.claude/projects/*/memory/*"` 
2. Fabes would also stubbornly lock in on a direction and it would be difficult to steer it any other way, requiring at least a new session, but likely also the deletion of other artefacts.

Goodbye Fabes mate, we hardly knew ye.
