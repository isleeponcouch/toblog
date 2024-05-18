---
title: My Blog's Performance Before and After CloudFlare
bg: bg-gray-600
decoration: decoration-gray-600
archived: true
createdAt: 2012-11-22
updatedAt: 2012-11-22
---
CloudFlare is a service that offers the benefits of a CDN with some automatic optimisation and security features chucked in. In this post I'm going to show the difference in load times of my blog before and after using <a title="CloudFlare" href="http://www.cloudflare.com/">CloudFlare</a>. I'll do this using a few popular tools for measuring web performance, <a title="Google PageSpeed Insights" href="https://developers.google.com/speed/pagespeed/insights">Google PageSpeed Insights</a>, <a title="Pingdom Tools" href="http://tools.pingdom.com/fpt/">Pingdom Tools</a> and <a title="YSlow" href="http://yslow.org/">YSlow</a>.

<p>It's important to note that I didn't do any optimisation prior to CloudFlare, no code minimisation, compression, sprites or minimising of requests. Nothing what-so-ever. If I had, we can probably safely assume my before scores may be higher. But it's also possible this optimisation could lead to higher 'after' scores, as well.</p>
<h2>Before CloudFlare</h2>
<h3>Google PageSpeed Insights</h3>
<p><a href="/images/posts/Screen-Shot-2012-11-15-at-2.29.42-PM.png"><img class="size-full wp-image-399 aligncenter" title="Google PageSpeed Insights for tobygundry.com" src="/images/posts/Screen-Shot-2012-11-15-at-2.29.42-PM.png" alt="Google PageSpeed Insights for tobygundry.com" /></a></p>
<h3>Pingdom Tools</h3>
<p><a href="/images/posts/Screen-Shot-2012-11-15-at-3.23.07-PM.png"><img class="mx-auto" title="Pingdom.com results for tobygundry.com" src="/images/posts/Screen-Shot-2012-11-15-at-3.23.07-PM.png" alt="Pingdom.com results for tobygundry.com" /></a></p>
<h3>YSlow</h3>
<p><a href="/images/posts/Screen-Shot-2012-11-15-at-3.05.50-PM.png"><img class="mx-auto" title="YSlow results for tobygundry.com" src="/images/posts/Screen-Shot-2012-11-15-at-3.05.50-PM.png" alt="YSlow results for tobygundry.com" /></a></p>
<h2>After CloudFlare</h2>
<h3>Google PageSpeed Insights</h3>
<p><a href="/images/posts/Screen-Shot-2012-11-22-at-2.15.57-PM.png"><img class="mx-auto" title="tobygundry.com Google PageSpeed after CloudFlare" src="/images/posts/Screen-Shot-2012-11-22-at-2.15.57-PM.png" /></a></p>
<h3>Pingdom Tools</h3>
<p><a href="/images/posts/Screen-Shot-2012-11-22-at-2.18.29-PM.png"><img class="mx-auto" title="Screen Shot 2012-11-22 at 2.18.29 PM" src="/images/posts/Screen-Shot-2012-11-22-at-2.18.29-PM.png" /></a></p>
<h3>YSlow</h3>
<p><a href="/images/posts/Screen-Shot-2012-11-22-at-2.21.07-PM.png"><img class="mx-auto" title="Screen Shot 2012-11-22 at 2.21.07 PM" src="/images/posts/Screen-Shot-2012-11-22-at-2.21.07-PM.png" /></a></p>

So as expected there's a notable increase in my performance scores across all the performance measurement tools I used. An averaged 10.6 point increase across the 3 tools (13 point jump for Google PageSpeed Insights, 7 points for Pingdom Tools and 12 points for YSlow.)

Google has a similar service in beta called <a title="Google PageSpeed Service" href="https://developers.google.com/speed/pagespeed/service">Google PageSpeed Service</a>, which seems to have a very similar offering to CloudFlare. When I have access to PageSpeed Service I'll re-test both services and post my results.

I see this kind of service becoming common place on the web. Ignoring all the other benefits for a moment, the code minimisation features alone make for a much smoother deployment process (providing you're willing to trust the service to do this for you), now instead of making changes, then running your code through a minimiser, you can just deploy.

If you want to try CloudFlare out on your own site, you can get a free account at <a title="CloudFlare" href="http://www.cloudflare.com"><a href="http://www.cloudflare.com">http://www.cloudflare.com</a>