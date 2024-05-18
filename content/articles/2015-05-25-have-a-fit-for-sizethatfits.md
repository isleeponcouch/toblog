---
title: Have a fit for sizeThatFits
bg: bg-gray-600
decoration: decoration-gray-600
archived: true
createdAt: 2015-05-25
updatedAt: 2015-05-25
---

Ever laid in bed at night wondering about the possibilities of sizing a view in relation to its subviews?

Well wonder no more!

sizeThatFits: is here.

Let's make an ordinary red UIView like this one:

<img src="/images/posts/sizeThatFits-1.png" alt="Plain old red UIView" class="mx-auto" />

Like this:

```objc
UIView *somethingSmall =
	[[UIView alloc] initWithFrame:CGRectMake(CGRectGetMidX(self.view.frame)-100.0,
                                         	 CGRectGetMidY(self.view.frame)-100.0,
                                         	 200.0,
                                         	 200.0)];

somethingSmall.backgroundColor = [UIColor redColor];
```

Then create a great big green UIView and add it right inside of it.

```objc
UIView *somethingBigger =
	[[UIView alloc] initWithFrame:CGRectMake(CGRectGetMidX(somethingSmall.frame),
                                  CGRectGetMaxY(somethingSmall.frame),
                                  400.0,
                                  400.0)];

somethingSmall.backgroundColor = [UIColor greenColor];

[somethingSmall addSubview:somethingBigger];
```

Oh no! This happens:

<img src="/images/posts/sizeThatFits-2.png" alt="Plain old red UIView" class="mx-auto" />

I know! I'll call sizeToFit on my parent view:

```objc
[somethingSmall sizeToFit];
```

<img src="/images/posts/sizeThatFits-2.png" alt="Plain old red UIView" class="mx-auto" />

...nothing happened.

From the docs: "- (void)sizeToFit Call this method when you want to resize the current view so that it uses the most appropriate amount of space".

So you'd expect this would do the trick, right? WRONG.

sizeToFit first calls sizeThatFits: to get the size to which it should fit.

But when we read the docs for sizeThatFits:

"The default implementation of this method returns the existing size of the view."

So sizeToFit won't scratch your back until its is scratched by sizeThatFits:

To use sizeThatFits: we subclass a UIView along the lines of this:

```objc
@interface StretchyView : UIView

@end

@implementation StretchyView

- (CGSize)sizeThatFits:(CGSize)size
{
	if([self.subviews count]==0)
		return size;
  
	float width;
	float height;
  
	for(UIView *subView in self.subviews)
	{
		width += subView.frame.size.width;
		height += subView.frame.size.height;
	}
  
	return CGSizeMake(width, height);
}

@end
```

Your sizing algorithm will need to be adjusted for what you're trying to accomplish.

Then bring together all our UIView code from before using our subclass for the red view:

```objc
- (void)viewDidLoad {
	[super viewDidLoad];
  
	StretchyView *somethingSmall =
		[[StretchyView alloc] initWithFrame:CGRectMake(CGRectGetMidX(self.view.frame)-100.0,
                                            CGRectGetMidY(self.view.frame)-100.0,
                                            200.0,
                                            200.0)];
  
	somethingSmall.backgroundColor = [UIColor redColor];
  
	UIView *somethingBigger =
 		[[UIView alloc] initWithFrame:CGRectMake(CGRectGetMidX(somethingSmall.frame),
                                      CGRectGetMaxY(somethingSmall.frame),
                                      400.0,
                                      400.0)];
  
	somethingSmall.backgroundColor = [UIColor greenColor];
  
	[somethingSmall addSubview:somethingBigger];
  
	[somethingSmall sizeToFit];
  
	[self.view addSubview:somethingSmall];
}
```

To get this:

<img src="/images/posts/sizeThatFits-3.png" alt="Plain old red UIView" class="mx-auto" />

Our small thing is now big enough to fully house our big thing.



