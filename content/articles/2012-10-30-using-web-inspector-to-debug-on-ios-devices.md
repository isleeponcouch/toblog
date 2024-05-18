---
title: Using Web Inspector to Debug on iOS Devices
bg: bg-gray-600
decoration: decoration-gray-600
archived: true
createdAt: 2012-10-30
updatedAt: 2012-10-30
---
iOS 6 included many updates for Safari, one of which was the Web Inspector which allows you to debug mobile websites in the same way you're used to for normal websites using Firebug or Inspect Element or the equivalent in other browsers.

Web Inspector takes a small amount of setup to get going, but once it is you can browse the code being delivered to your device on your desktop, debug and hot swap code and see the result on the actual device in real time.

## Setup Web Inspector<

### 1. Enable Web Inspector on your iOS Device

[Settings] -&gt; [Safari] -&gt; [Advanced] -&gt; [Web Inspector] switch to on

<a href="/images/posts/Screen-Shot-2012-10-30-at-10.55.03-AM.png"><img class="mx-auto" title="Enabling Web Inspector on iOS Safari" src="/images/posts/Screen-Shot-2012-10-30-at-10.55.03-AM.png" alt="Enabling Web Inspector on iOS Safari" /></a>

### 2. Enable 'Develop' menu in Safari on your desktop

From Safari [Safari] -&gt; [Preferences] -&gt; [Advanced Tab] -&gt; Tick 'Show Develop menu in menu bar'

<a href="/images/posts/Screen-Shot-2012-10-11-at-2.23.15-PM.png"><img class="mx-auto" title="Show Develop menu in Safari" src="/images/posts/Screen-Shot-2012-10-11-at-2.23.15-PM.png" alt="Show Develop menu in Safari" /></a>

### 3. Connect your iOS device

Connect your iOS device to the desktop using the data cable.

## Using Web Inspector

### 1. Open the site in Safari on the device

Open the site you want to debug with Web Inspector in Safari on your device and leave it open.
<a href="/images/posts/Screen-Shot-2012-10-30-at-11.07.57-AM.png"><img class="mx-auto" title="Screenshot of tobygundry.com on iOS Safari" src="/images/posts/Screen-Shot-2012-10-30-at-11.07.57-AM.png" alt="Screenshot of tobygundry.com on iOS Safari" /></a>

### 2. Open the Web Inspector on the Desktop

From Safari [Develop] -&gt; [iPhone] -&gt; Choose the site you just opened

<a href="/images/posts/Screen-Shot-2012-10-11-at-2.29.34-PM.png"><img class="mx-auto" title="Accessing website on iOS device via desktop Safari 'Develop' menu" src="/images/posts/Screen-Shot-2012-10-11-at-2.29.34-PM.png" alt="Accessing website on iOS device via desktop Safari 'Develop' menu" /></a>

### 3. Debug

Now you can see the source for the site loaded on the device on your desktop and hover over markup and see the rendered content highlighted on the device screen...

<a href="/images/posts/Screen-Shot-2012-10-30-at-11.45.14-AM1.png"><img class="mx-auto" title="Safari Web Inspector" src="/images/posts/Screen-Shot-2012-10-30-at-11.45.14-AM1.png" alt="Safari Web Inspector" /></a>

<a href="/images/posts/photo-2.png"><img class="mx-auto" title="Web Inspector on iOS Safari" src="/images/posts/photo-2.png" alt="Web Inspector on iOS Safari" /></a>

Now you can debug your web code on your iOS device as you're used to for the desktop - seeing changes you make on the actual device in real time.