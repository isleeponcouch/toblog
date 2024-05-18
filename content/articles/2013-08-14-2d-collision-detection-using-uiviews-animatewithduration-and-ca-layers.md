---
title: 2D Collision Detection Using UIView's animateWithDuration and CA Layers
bg: bg-gray-600
decoration: decoration-gray-600
archived: true
createdAt: 2013-08-14
updatedAt: 2013-08-14
---
Sometimes, especially times when you're trying to create a basic iOS game using standard UIKit and no real engine, detecting collisions between UIViews animated using animateWithDuration is very handy.

~~I've just uploaded a very basic (and somewhat unrealistic) example of how to do this to my Github: https://github.com/tobygundry/UIView2DCollisionDetection~~

There's a lot of boilerplate in there, so I won't turn this post into a complete tutorial style one. The important parts are:

```objc
#import <QuartzCore/CoreAnimation.h>
```

Make sure you've included Quartz in your frameworks for above.

And:

```objc
- (void)detectCollisions:(NSTimer*)theTimer
{
    NSDictionary *projectiles = [theTimer userInfo];
    UIView *topProjectile = [projectiles objectForKey:@"topProjectile"];
    UIView *bottomProjectile = [projectiles objectForKey:@"bottomProjectile"];
    CGRect topProjectilePL = [[topProjectile.layer presentationLayer] frame];
    CGRect bottomProjectilePL = [[bottomProjectile.layer presentationLayer] frame];

    // some very basic collision detection
    if(topProjectilePL.origin.y > bottomProjectilePL.origin.y-5 &&
        topProjectilePL.origin.y < bottomProjectilePL.origin.y+5)
    {
        [self.view setBackgroundColor:[UIColor redColor]];
        [theTimer invalidate];
    }
}
```

Everything rests on the [presentationLayer]("https://developer.apple.com/library/mac/documentation/GraphicsImaging/Reference/CALayer_class/Introduction/Introduction.html#//apple_ref/occ/instm/CALayer/presentationLayer") exposed by CoreAnimation, specifically CALayers. The presentationLayer will give an approximation of the current location of the layer to which your UIView is being drawn when it is called.

Using presentationLayer with UIView's animateWithDuration: you can accomplish a surprisingly large amount for game or complex UI development, without having to use an external engine.