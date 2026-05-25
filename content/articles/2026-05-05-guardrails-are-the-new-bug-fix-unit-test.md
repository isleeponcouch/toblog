---
title: Agent skill guardrails are the new bug fix unit test.
bg: bg-rose-600
decoration: decoration-rose-600
archived: false
createdAt: 2026-05-05
updatedAt: 2026-05-05
---

This is a blog that's probably going to be short enough to be a small series of Tweets. But I don't have Twitter. Nor is this important enough to broadcast in a Twitter kind of way. But somehow it seems most people aren't doing this yet.

If you follow Test Driven Develoment (TDD) even loosely in your project, your workflow for bug fixes might be to write a failing test that proves the bug exists, fix the bug, observe the test pass, then commiting the test so it's covered going forward.

Your `AGENTS.md` or whichever agent guardrails you're using should follow a similar pattern. Your guardrails are project based. They belong to that project as much as a test suite belongs to its project. Every time you notice an output from your agent that went off the rails, your next prompt should be to fix the issue and update the agent skills to never do that thing again. If you do this over time, your project builds up a nice little immunity to agent missteps.

It's impossible to figure out what mistakes agents will make on your code from the outset, so this small habit added to your workflow is a low effort high impact change that you'll eventually notice you're rarely having to do all.

## Take it easy there buster

There is one issue with this approach. Context windows are finite and precious. Take action on every weird agent output, but ask if that action can actually be a unit test instead. If not, can it be scoped down to a skill or `ARCHITECURE.md` or topic document or somewhere else where it won't get read into context unnecessarily. Review the guardrails somewhat regularly and prune out what's not relevant anymore. For example if early on in the project you added to not use a certain design patter, but have since used another pattern extensively and documented its use, you may be able to experiment with removing that guardrail now. Whatever the guardrail, if you end up having to add it back in, then you know its necessary. 

