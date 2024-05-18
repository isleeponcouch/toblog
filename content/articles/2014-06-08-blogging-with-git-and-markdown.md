---
title: Blogging With Git and Markdown
bg: bg-gray-600
decoration: decoration-gray-600
archived: true
createdAt: 2014-06-08
updatedAt: 2014-06-08
---

**_Update 29/06/2015 I thought I should make a quick update to say that a little while after I wrote this post, I learnt about static generators and jekyll. Long story short this blog is actually now a Github pages powered jekyll generated blog._**

This is my first blog post in nearly 6 months. I haven't blogged in a while because it got increasingly difficult to do with my Wordpress setup; I won't go too far into why, it just wasn't working for me and I found myself hacking my theme and writing Plugin API code far more often than I should have.

So yesterday when I decided I wanted to get back into it and start blogging again, I took a kind of radical step. I trashed my Wordpress blog. In fact I trashed the entire shared hosting account it was on. I wrote a quick PHP script to pull all my posts out of the Wordpress database and spit them out as Markdown files, I setup Route53 and pointed my nameservers there, fired up an Ubuntu EC2 instance, installed Apache2, a bare Git repository with a post-receive hook that checks commits out into the document root of Apache2 and wrote a quick and dirty index.php that scans for and displays the Markdown files.

For me, this is a far easier far more flexible way of publishing blog content than any blog / CMS package I've used.  Instead of firing up the WP dashboard and mucking around in Tiny MCE to get my content ready to publish, I just fire up whatever editor I feel like, write my post in Markdown, add and commit the new file and push to my EC2 remote. And seeing as HTML is valid Markdown, if there's ever anything that needs to be marked up, it's extremely easy to just write it right in with the rest of the post. It's not for everybody, it's not even for every developer, but for me this is the best.

To recap, this is my blog:
--------------------------
- Route53 DNS
- Ubuntu on EC2 instance
- Apache2 and PHP
- Bare remote Git repo on EC2 instance
- post-receive hook on remote repo
- index.php with some basic file system and string manipulation code (total 34 lines of PHP)
- Parsedown.php
- style.css
- bunch of Markdown files

Make It Better
--------------

I'm happy with this for now, but by its nature it's a quick and dirty solution. There's some things I don't like, one being that the Markdown is parsed on the fly at the moment instead of being Parsed in the post receieve hook. Another is that the index.php mentioned above reads the file system and performs a bunch of string manipulation on what it finds to display a list of posts.

If I were to re-do this as a somewhat stable solution that I would be happy to pass on to others who might want to publish content in this way, at a minimum I would:
- Parse the Markdown in the post-receive hook
- Create an index of the parsed files into a posts.json and read that instead of the file system and the string manipulation that comes with it
- Possibly maintain 2 separate repos for the posts and the actual code

Now to publish this (that is, git commit -a -m "I blog with Git and Markdown now" && git push ec2)

