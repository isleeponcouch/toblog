---
title: Kotlin 2 Migration
bg: bg-blue-600
decoration: decoration-blue-600
archived: false
createdAt: 2025-11-03
updatedAt: 2025-11-03
---
I haven't written here for a solid minute and so to break the spell I'm coming in hot with what I'm working on right now. Right this minute. Which is updating the Android client app for my fitness booking and payments MSaaS to use K2.

It's been a mostly straight forward process with really the only trouble coming from some technical debt in my code surrounding recomposition scope inference. Essentially in K2 with the updated Compose compiler to match, one of my UI components wasn't triggering a recomposition anymore, which I believe has to do with K2 being stricter about these recompositions to gain some performance.

One big annoyance which isn't so much to do with K2 but the general update I'm doing across the board is the Material Icons library is gone `androidx.compose.material.icons` or at least deprecated and removed from the material 3 library. Annoyingly the only real information I could find about this was in a [LinkedIn post](https://www.linkedin.com/posts/rebeccafranks_icons-jetpack-compose-android-developers-activity-7377248968201879552-fQDS/) of all places by a Google development relations person.

Generally this is one thing I've noticed in the small amount of Android development I've done, things can change, sometimes fairly significantly, across seemingly innocuous updates. Especially in Google's case where they just seem to remove things on a whim like they do with their customer facing services (I miss you Google Wave).

In any case I ended up replacing it with [Compose Icons](https://composeicons.com) and included their [library](https://composeicons.com/icon-libraries/lucide) to get a very similar behaviour to what the old Material Icons library was. 

The actual K2 upgrade is very smooth, just the addition of the Kotlin Composer Gradle Plugin; which is needed because the Composer compiler is now shipped with the K2 compiler so this gives a way of configuring it from gradle now we can't use the `composeOptions {}` block anymore.

Then just the usual updating dependencies, working through very minor issues that popup as part of that, until everything is up and working again.

