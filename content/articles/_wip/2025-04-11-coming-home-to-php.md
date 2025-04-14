---
title: Coming home to PHP in 2025 and loving it
bg: bg-fuchsia-600
decoration: decoration-fuchsia-600
createdAt: 2025-04-11
updatedAt: 2025-04-11
---

PHP was the first programming language I used on the web and where I did the bulk of my programming learning after some initial fumblings in Visual Basic and Delphi on the family PC. It was also the first programming language I made money from, making a mostly static website in the old HTML tables style with a PHP powered form that took an order with customer details, redirected the customer to PayPal to pay, then stuffed all the details into a MySQL table and emailed the owner of the site with the purchase details. I was 16 at the time, I did the work in my bedroom where the family PC lived, and I made $600 which was a small fortune to me at the time.

This first job set me off on a freelancing career within the PHP ecosystem at the time which meant mostly WordPress themes and plugins, some Drupal, CodeIgniter, and osCommerce. Then later Magento and the earlier versions of Symfony.

Since those early days I've now written commercial code for the web in Java, C#, and NodeJS, with some brief encounters Python and Ruby.

When I first took those Java and C# roles, I remember the comments about PHP, which was the bulk of my resume going in, about its inherent insecurity and ugly syntax. The general aire was that I had ascended, graduated from the dirty slums of PHP and I was not part of the elite, writing code the right way. This was the reception across two different roles, the C# and Java roles were at different companies. But at both companies, nobody else had PHP experience. In fact, they only had experience in C# and Java respectively, and in their own narrow domains at that.

At the time, I absolutely let this affect my own thinking of PHP and took on the same attitude of those around me. After all, coming to C# from PHP did feel very sleek, there was async/await, LINQ, Visual Studio and ReSharper which made most tasks feel like they were on autopilot even before the days of AI assistants. And independant of any thoughts around php, both Java and C# (well...especially C#) are great languages.

The problem with developers is they are just as susceptable to marketing and political rhetoric as any other person, but within the realms of their work they tend to be utterly blind to their own bias and the way others opinions have swayed their views. PHP at the time was the most popular language used on the web, I believe it still is, but in those days even more so, and by a huge margin. So with that, if a website were to be hacked, it was most likely that website was going to be PHP. And it didn't help matters that PHP 3 contained a highly insecure feature 'magic variables' meant as a development productivity tool that was often left on when deployed to production. Not so much a PHP problem as a you problem. So with that the idea 'PHP is insecure' took hold and many developers still hold that view today, based entirely off something they heard, and nothing else.

I feel like I could write this as an entire post about how developers get marketed to by the developers of programming languages and frameworks and the incentives the owners of those languages and frameworks have to bring you into the ecosystem so you can buy their platform as a service and their book and their conference tickets and etc. etc. I could also speak to how insecure developers are and how we follow the trends of big techs implementing microservices and monorepos into 3 person companies with a basic SaaS that could easily survive as a monolith on a VPS.

But suffice to say, PHP wasn't so much inherently bad, as it was the victim of a bad press. And there will always be people who want to steal marketshare away from popular alternatives.

Fast forward some years and my software development career moved into native mobile and I mostly left web behind. Until I had to standup a web service. Having well and truly played the field of programming languages for the web, I chose PHP again. Partially because of nostalgia. But mostly because of just how capable the PHP ecosystem is now coupled with the simplicity of deployment and lack of bullshit that has always been a feature of PHP. And that last point is an important one when you're bootstrapping a SaaS or otherwise not looking to burn through money. PHP will run just about anywhere 



