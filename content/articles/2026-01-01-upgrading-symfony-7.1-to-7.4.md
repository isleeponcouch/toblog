---
title: Upgrading Symfony 7.1 to 7.4
bg: bg-fuchsia-600
decoration: decoration-fuchsia-600
archived: false
createdAt: 2026-01-01
updatedAt: 2026-01-01
---

I've been taking a bit of a break over the Christmas and New Year break, purposely giving myself some time off the tools following a fairly intense run of feature and stability releases for one of my products.

But even so I couldn't stay completely away, so I spent this time slowly chipping away at upgrading my backend from Symfony 7.1 to 7.4, while resolving some phpstans along the way.

# Starting with composer.json

I've switched to the `extra.symfony.require` syntax to make moving around version easier.

```
"extra": {
	"symfony": {
   	"allow-contrib": false,
      "require": "7.4.*"
	}
},
```

Then updating all requirements to match this format `"symfony/framework-bundle": "*",`. The extra field in `composer.json` can just be any arbitrary 'extra' data and its the Symfony Flex Composer Plugin that jumps in to use that `symfony.require` field underneith it and set the required version to `7.4.*`.

I'm jumping through a few minor releases here to get to the 7.4 LTS on my path to Symfony 8, so my project has picked up a handful of new features from over the past year of the Symfony release cycle.

# csrf.yaml + Stateless CSRF from 7.2

I didn't hace a `csrf.yaml` at all previously

[How Does Stateless CSRF Work?](https://symfony.com/blog/new-in-symfony-7-2-stateless-csrf#how-does-stateless-csrf-work)

# Upgraded PHPUnit

From 9.5 to 11.5 – very noticeable speed improvement on my test suite.

```
There was 1 PHPUnit test runner warning:

1) Bootstrapping of extension DAMA\DoctrineTestBundle\PHPUnit\PHPUnitExtension failed: Subscriber "PHPUnit\Event\Test\BeforeTestMethodErroredSubscriber@anonymous/Users/tobigundry/dev/clovadash/vendor/dama/doctrine-test-bundle/src/PHPUnit/PHPUnitExtension.php:75$28f" does not implement any known interface - did you forget to register it?
#0 phar:///Users/tobigundry/dev/clovadash/bin/phpunit/phpunit/Event/Dispatcher/DeferringDispatcher.php(35): PHPUnit\Event\DirectDispatcher->registerSubscriber(Object(PHPUnit\Event\Test\BeforeTestMethodErroredSubscriber@anonymous))
#1 phar:///Users/tobigundry/dev/clovadash/bin/phpunit/phpunit/Event/Facade.php(67): PHPUnit\Event\DeferringDispatcher->registerSubscriber(Object(PHPUnit\Event\Test\BeforeTestMethodErroredSubscriber@anonymous))
#2 phar:///Users/tobigundry/dev/clovadash/bin/phpunit/phpunit/Runner/Extension/Facade.php(42): PHPUnit\Event\Facade->registerSubscriber(Object(PHPUnit\Event\Test\BeforeTestMethodErroredSubscriber@anonymous))
#3 /Users/tobigundry/dev/clovadash/vendor/dama/doctrine-test-bundle/src/PHPUnit/PHPUnitExtension.php(75): PHPUnit\Runner\Extension\Facade->registerSubscriber(Object(PHPUnit\Event\Test\BeforeTestMethodErroredSubscriber@anonymous))
#4 phar:///Users/tobigundry/dev/clovadash/bin/phpunit/phpunit/Runner/Extension/ExtensionBootstrapper.php(55): DAMA\DoctrineTestBundle\PHPUnit\PHPUnitExtension->bootstrap(Object(PHPUnit\TextUI\Configuration\Configuration), Object(PHPUnit\Runner\Extension\Facade), Object(PHPUnit\Runner\Extension\ParameterCollection))
#5 phar:///Users/tobigundry/dev/clovadash/bin/phpunit/phpunit/TextUI/Application.php(281): PHPUnit\Runner\Extension\ExtensionBootstrapper->bootstrap('DAMA\\DoctrineTe...', Array)
#6 phar:///Users/tobigundry/dev/clovadash/bin/phpunit/phpunit/TextUI/Application.php(125): PHPUnit\TextUI\Application->bootstrapExtensions(Object(PHPUnit\TextUI\Configuration\Configuration))
#7 /Users/tobigundry/dev/clovadash/bin/phpunit(3062): PHPUnit\TextUI\Application->run(Array)
#8 {main}
```

This started showing up when I upgraded the DAMA bundle from 8.2 to 8.4. It turned out my phpunit configuration had gotten a bit messy, with a phpunit downloaded to my root project directory, a global phpunit, a vendors phpunit, and my phpstorm settings pointing to the bundled phpunit.phar. I deleted the bundled phpunit and pointed my phpstorm settings to the vendors/autoload.

# Annotations to Attributes

```
- use Symfony\Component\Routing\Annotation\Route;
+ use Symfony\Component\Routing\Attribute\Route;
```

# config/reference.php for PHP config array shapes

Symfony 7.4 axes XML and the fluent PHP config builder syntax for configuration and introduces an array-based PHP configuration format. The new format shifts validation onto the tooling by generating a `reference.php` file that contains array shapes for the bundles installed in the specific application, which is why this file needs to be generated.

I've added my `config/reference.php` to the excludePaths in my `phpstan.dist.neon` because otherwise it will always return errors for a file I have no control over.

```
parameters:
    excludePaths:
        - config/reference.php
```

The YAML configuration format is still the recommended format by the Symfony team for now despite having released the PHP array format. I'm going to follow that recommendation and stick with YAML until there's a change to that advice. I don't see any great benefit to switching at this point in any case.

Various xml config files automatically updated to PHP:

```
resource: '@FrameworkBundle/Resources/config/routing/errors.xml'
resource: '@FrameworkBundle/Resources/config/routing/errors.php'

resource: '@WebProfilerBundle/Resources/config/routing/wdt.xml'
resource: '@WebProfilerBundle/Resources/config/routing/wdt.php'

resource: '@WebProfilerBundle/Resources/config/routing/profiler.xml'
resource: '@WebProfilerBundle/Resources/config/routing/profiler.php'
```

# config/packages/property_info.yaml

Predumably introduced to set the `with_constructor_extractor: true` by default in Symfony 7.3. I think this is noop for mine and likely most codebases.

# phpstan/phpstan-deprecation-rules

I installed the `phpstan/phpstan-deprecation-rules` which seems to be a much more reliable way of finding deprecations than phpunit.

# Additional things from 7.3

[Mailer Security Improvements](https://symfony.com/blog/new-in-symfony-7-3-mailer-security-improvements) this gives the ability to require TLS in SMTP and is an important one for me.

[Markdown Tables in Console Output](https://symfony.com/blog/new-in-symfony-7-3-new-and-improved-console-helpers) this is going to be very cool!

[Static Error Pages](https://symfony.com/blog/new-in-symfony-7-3-static-error-pages) love this, just `error:dump` your error pages then update `nginx` to point to them for the various error response codes.

[Configurable Compound Rate Limiter](https://symfony.com/blog/new-in-symfony-7-3-configurable-compound-rate-limiter)

# Upgrade Path

This is just the first step in my upgrade path for this app.

1. ~~Upgrade to Symfony 7.4~~
2. Upgrade to PHP 8.4 (from 8.3.4)
3. Upgrade to Doctrine ORM 3.6
4. Upgrade to Symfony 8
5. Upgrade to DBAL 4


