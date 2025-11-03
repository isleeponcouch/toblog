---
title: Refactoring my Symfony application to use EventSubscriber
bg: bg-green-600
decoration: decoration-green-600
createdAt: 2025-04-23
updatedAt: 2025-04-23
---

One of my side projects is a Symfony 7 application with a large notification subsystem. Notifications can be sent by push and/or email depending on the event, to users or admins or both, which requires slightly different logic and notification templates. Each notification must respect the user's settings in a preference system for which notifications a user or admin would like to receive. Additionally, each notification that is sent is added to a seperate user searchable audit log.

Over time, this notification system has become quite large and arguably one of the most important aspects of the system. Up until now, I've been calling into this service directly from controllers and services. Which has been more or less ok, except now the notification and audit calls have become larger and more prevalent throughout the codebase. Meaning a big part of any service that should notify gets gunked up by calls into the notification and audit services.

Naturally, notifications are sent after certain domain events occur, such as a booking being made.

My system now has an event object for each of these domain events that is fired from a service. For example, `BookingEvent`:

```php
class BookingEvent extends Event
{
    public function __construct(private readonly Booking $booking) {}

    public function getBooking(): Booking {
        return $this->booking;
    }
}
```

I have a single `EventSubscriber`, `NotificationSubscriber` that subscribes to all events that require a notification:

```php
class NotificationSubscriber implements EventSubscriberInterface
{
    public function __construct(private readonly NotificationHandlerRegistry $registry) {}

    public static function getSubscribedEvents(): array
    {
        return [
            BookingEvent::class => 'onNotifiableEvent',
            Etc::class => 'onNotifiableEvent',
        ];
    }

    public function onNotifiableEvent(object $event): void
    {
        foreach ($this->registry->getHandlersFor($event) as $handler) {
            $handler->handle($event);
        }
    }
}
```

In the above, you can see there is a `NotificationHandlerRegistry`, this is just a good encapsulation for finding all the handlers for each notification and is incredibly succinct thanks to the magic of Symfony's [Autowiring](https://symfony.com/doc/current/service_container/autowiring.html):

```php
class NotificationHandlerRegistry
{
    /**
     * @param NotificationHandlerInterface[] $handlers
     */
    public function __construct(
        /** @var iterable<NotificationHandlerInterface> */
        #[AutowireIterator(NotificationHandlerInterface::class)] private readonly iterable $handlers
    ) {}

    public function getHandlersFor(object $event): iterable
    {
        foreach ($this->handlers as $handler) {
            if ($handler->supports($event)) {
                yield $handler;
            }
        }
    }
}
```

Symfony will find any class implementing the below `NotificationHandlerInterface` and stick it in the `$handlers` iterable 

```php
#[AutoconfigureTag]
interface NotificationHandlerInterface {
    public function supports(object $event): bool;

    public function handle(object $event): void;
}
```

Each of which will be asked if it supports the given event and will have it's `handle` method called if it says yes.

```php
class BookingHandler implements NotificationHandlerInterface
{
    public function __construct(
        private readonly ClientNotifier $clientNotifier,
        private readonly StaffNotifier  $staffNotifier,
        private readonly AuditLog       $auditLog,
    ) {}

    public function supports(object $event): bool
    {
        return $event instanceof BookingEvent;
    }

    public function handle(/** @var $event BookingEvent */ object $event): void
    {
        if (!$this->supports($event)) return;

        // masses of notification code
    }
}
```

Now all of my notification code is lifted out of my services code and replaced with a single call to `$dispatcher->dispatch(new BookingEvent())`.

It's also much easier to test notifications and as a bonus, I can now see at a glance all the notifications that the system handles in one place.

Further down the road when I'm ready to move to a messaging queue or event bus type system, it will be a piece of cake to adapt this subsystem to that architecture.

Pretty happy with it overall.
