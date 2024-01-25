---
title: Mapping out Doctrine Association Mapping
bg: bg-green-300
createdAt: 2023-11-09
updatedAt: 2023-11-09
---

Association mapping in Doctrine is one of those topics that at its core is quite a simple concept, but in practice can be confusing and off-putting.

This likely stems from table relations and related concepts of foreign keys and joins being a somewhat difficult thing to reason about already without then adding in the additional workload of working in the space of an entity object graph while simultaneously mentally mapping back to those relational concepts. 

Throw in some new terminology in the form of unidirectional and bidirectional associations, owning side, inversed by and mapped by, and it all seems scarier than it is.

## Understanding Doctrine Associations

Let's start by working backwards, suppose we have the following schema that we want to hydrate into entity objects. 

<!-- <div style="font-size:16px; border-left:3px solid #efefef; padding-left:30px; margin-left:30px; font-style: italic;">
Hydration by the way is just a way of saying reading things out of the database and into an instance of an entity object. As in if we were to have an array of rows from an author table retrieved from a database, looping over each and creating a new instance of Author. Getting data from the database to create our Author with is hydrating Author. This at its simplest is what an ORM does for us, Object Relational Mapping, mapping relational data to objects.
</div> -->

```
author(id, name)
book(id, author_id, title)
```

In Doctrine, we describe the relationship in the direction from the Entity we're talking about toward the entity it's related to, so if we're talking about an Author, this is a `OneToMany` association, because one Author has many Books as we can tell from the foreign key on book. If we were talking about Books, we would say it has a `ManyToOne` because we can have many Books that each point back to only one Author.

So let's now create actual Doctrine entities to bring our simple relational schema into the object world.

```
#[ORM\Entity(repositoryClass: AuthorRepository::class)]
class Author
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    // We read from left to right from the entity we're looking at, so OneToMany here means One Author to Many Books.
    // Also note that on the Entity we have a reference back to our Books, where as in our table Author doesn't know about Books.
    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Book::class)]
    private Collection $books;
}
```

```
#[ORM\Entity(repositoryClass: BookRepository::class)]
class Book
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    // Again, we're looking at Book, so Many Books have one Author.
    #[ORM\ManyToOne(inversedBy: 'books')]
    private ?Author $author = null;
}
```

Hopefully the above is more or less what you were expecting to see for our entities given the small schema we designed above. If we weren't working with an ORM we'd have likely created similar looking classes at some point to represent the data in each of our author and book tables.

## Bidirectional and Unidirectional Associations

The one thing that might stick out as strange to you at this point, is that in our Author entity we have a reference back to Books. But our Author table doesn't have any kind of way of knowing about Books.

In Doctrine, this is called a bidirectional association, meaning simply that we can get the associated objects from either side of the association. 

This is an optional step that we could have left off, but by adding this column to our Author we can now easily access all our Author's Books given any instance of Author. 

If we were to remove this property from Author, we would have then created a unidirectional association, meaning we could only get a related Author from a Book, and no Books from an Author. 

This concept of a bidirectional association is a convenience given to us by the fact we're working in the object graph space now and not the relational space, so when doctrine retrieves our related data from the database it can setup references for us so we can later have the ease of making calls like `$author->getBooks()`.

So let's look at the actual DDL/SQL that Doctrine gives us for creating a concrete schema from the above.

```
CREATE TABLE `author` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
)
```

```
CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_CBE5A331F675F31B` (`author_id`),
  CONSTRAINT `FK_CBE5A331F675F31B` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`)
)
```

These were created with `symfony console doctrine:schema:update --dump-sql`

So we've gone from our human readable schema definition, to entities we can use to interact with those data in the object world, back to actual DDL/SQL.

## Ownership, inversedBy and mappedBy

So why is it optional to have a reference back from Author to Books and not the other way around? Because our Book is the _owning_ side. This might seem counter intuitive and is likely another reason the Doctrine learning curve is a little steep. 

Our domain logic and logic generally says that an Author owns their Books, but in Doctrine our associations have nothing to do with our domain logic. The owning side is the entity that contains the `ManyToOne` relation and/or that has the foreign key.

Generally, the entity that defines a `ManyToOne` on itself is always the owning side, the opposite is also true that an entity that defines `OneToMany` is _not_ the owning side or is the 'inverse' side.

And that is where we get the terminology `inversedBy` as seen on the Book entity above, repeated below for clarity: 

```
#[ORM\ManyToOne(inversedBy: 'books')]
private ?Author $author = null;
```

I think of this as the inverse of being an owner is being owned. So our Book is the owner, the inverse side of the ownership relationship is Author. `books` refers to the field on Author that references our `Many` Books.

On the Author side of the association, the books field is annotated with `mappedBy`:

```
#[ORM\OneToMany(mappedBy: 'author', targetEntity: Book::class)]
private Collection $books;
```

The terminology `mappedBy` goes back to the concept of ownership. In relational terms, our Author has no way of knowing about its books on its own, so in our object graph we need a way of `mapping` back to our Books. We can read this annotation as our `books` property is mapped by the `author` property on `Book`. 

If we didn't setup a bidirectional association, then we wouldn't need to worry about `inversedBy` and `mappedBy` at all, these concepts relate _only_ to bidirectional associations.

## Join Columns

For the association above we don't need to explictly write out a `JoinColumn` annotation because Doctrine has enough information to find its foreign key that we could otherwise specify in `JoinColumn(referencedColumnName:)` and importantly because the association is nullable.

If we change the association above to not be nullable, then we add the JoinColumn `#[ORM\JoinColumn(nullable: false)]`.

## Associations

The [Doctrine documentation for association mapping](https://www.doctrine-project.org/projects/doctrine-orm/en/2.16/reference/association-mapping.html) lists out all of the following association types:

- Many-To-One, Unidirectional
- One-To-One, Unidirectional
- One-To-One, Bidirectional
- One-To-One, Self-referencing
- One-To-Many, Bidirectional
- One-To-Many, Unidirectional with Join Table
- One-To-Many, Self-referencing
- Many-To-Many, Unidirectional
- Many-To-Many, Bidirectional
- Many-To-Many, Self-referencing

Let's simplify that list a bit so we can have a manageable working knowledge of it. We already know that bidirectional and unidirectional is just giving us the convenience of referencing the inversed side of an association, so we can leave that to one side and know that it can be added to each type of association as needed.

Self-referencing just means that an entity is referencing itself rather than another type of entity. The best example is a Category entity that has subcategories that are also of type Category. So again we can put that to one side seeing as it's really just a way of saying we're referencing the same Entity from that Entity, and that leaves us with:

- Many-To-One
- One-To-One
- One-To-Many
- Many-To-Many

`OneToMany` is just the inverse of `ManyToOne` which we've seen, so it's really just the other side of a `ManyToOne`. So we don't need to let that take up valuable cognitive space, so let's work with:

- Many-To-One
- One-To-One
- Many-To-Many

When we compare the difference between `ManyToOne` and `OneToOne` which we can do by changing the relations on our existing `Author` `Book` association.

So this:

```
#[ORM\ManyToOne]
private ?Author $author = null;
```

Becomes:

```
#[ORM\OneToOne]
private ?Author $author = null;
```

With that in place, the only change that `symfony console doctrine:schema:update --dump-sql` wants to make is:

```
ALTER TABLE book DROP INDEX IDX_CBE5A331F675F31B, ADD UNIQUE INDEX UNIQ_CBE5A331F675F31B (author_id);
```

Meaning the only difference between a `ManyToOne` and a `OneToOne` is a `UNIQUE INDEX ` which is going to enforce the one to one relationship. So we can think of a `OneToOne` as a `ManyToOne` with that extra restriction.

So for simplicity's sake, we can think of the associations available to us as...

### 1. Many-To-One 
- Optional unique index to force the association to be `OneToOne`
- Unidirectional
- Bidirectional
- Self-referencing

### 2. Many-To-Many
- Unidirectional
- Bidirectional
- Self-referencing