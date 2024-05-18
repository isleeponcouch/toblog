---
title: First Look at RedBeanPHP 
bg: bg-gray-600
decoration: decoration-gray-600
archived: true
createdAt: 2012-07-10
updatedAt: 2012-07-10
---
RedBeanPHP is an ORM system that allows you to write your PHP apps really, really quickly. Essentially RBPHP development boils down to asking for a new object from the RB API, adding member variables to that object as you wish and then telling RB to persist that object. If there's a table for that kind of object already, it gets added to that. Otherwise the table is created for you on the fly and data types are inferred from the data you have given.

I'll start off by showing you a rudimentary but complete PC Parts Database app I built extremely quickly using RedBeanPHP and then go through each block of code explaining what it does and what's happening to the database behind the scenes.

~~My basic RedBean app can be downloaded here. To run it all you need to do is unzip it to a directory on your webhost, and setup a MySQL schema called 'rbparts' and updat the username and password, no other setup is required.~~

```php
<?php
require('rb.php'); // include redbean

// connect to your database, you'll need to have made the rbparts schema
R::setup('mysql:host=localhost;dbname=rbparts', 'user', 'pass');

if(isset($_POST['addpart']))
{
	// Get a 'bean', the name of your bean will be the name of your table
	$part = R::dispense('part');

	// You can add properties/member variables at will and they will be mapped
	// to columns of the same name in your 'part' table and crearted if need be
	$part->type = $_POST['type']; 
	$part->manufacturer = $_POST['manufacturer']; 
	$part->model = $_POST['model']; 
	$part->price = $_POST['price'];

	// store the bean in the database, store() returns the id of the insert,
	// similar to mysql_insert_id()
	$id = R::store($part);
}

if(isset($_POST['deletepart']))
{
	// load the bean with the bean type (part) and the id
	$partToDelete = R::load('part', $_POST['partid']);

	// delete the bean from the database
	R::trash($partToDelete);
}
?>
<html>
<head>
<title>Really quick PC parts inventory built with RedBeanPHP</title>
</head>
<body>

<!-- Add a part -->
<form method="post" action="<?php print $_SERVER['PHP_SELF']; ?>" enctype="multipart/form-data">
<label for="type">Part Type</label>
<select id="type" name="type">
<option value="Motherboards">Motherboards</option>
<option value="CPU">CPU</option>
<option value="Memory">Memory</option>
<option value="Storage">Storage</option>
</select>
<label for="manufacturer">Manufacturer</label>
<select id="manufacturer" name="manufacturer">
<option value="ASUS">ASUS</option>
<option value="AMD">AMD</option>
<option value="Intel">Intel</option>
</select>
<label for="model">Model</label>
<input id="model" name="model" type="textfield" />
<label for="price">Price</label>
<input id="price" name="price" type="price" />
<input type="submit" name="addpart" value="Add Part" />
</form>

<!-- Simple search to search all string feilds for a keyword -->
<form method="post" action="<?php print $_SERVER['PHP_SELF']; ?>" enctype="multipart/form-data">
<fieldset>
<legend>Search Parts</legend>
<label for="q">Keywords</label>
<input id="textfield" type="textfield" name="q" />
<input type="submit" name="search" value="Search" />
</fieldset>
</form>

<!-- Display the parts with an option to delete -->
<form method="post" action="<?php print $_SERVER['PHP_SELF']; ?>" enctype="multipart/form-data">
<table>
<thead><td>&amp;nbsp;</td><td>Part Type</td><td>Manufacturer</td><td>Model</td><td>Price</td></thead>
<?php
if(isset($_POST['q']))
{
	// extremely simple search query
	$results = R::find('part', 'manufacturer OR model LIKE ?', array('%'.$_POST['q'].'%'));
}
else // display everything
{
	$results = R::find('part');
}

foreach($results as $resultBean)
{
	print '<tr><td><input type="radio" name="partid" value="'.$resultBean->id.'" /></td><td>' . $resultBean->type . '</td><td>' . $resultBean->manufacturer . '</td>'
. '<td>' . $resultBean->model . '</td><td>' . $resultBean->price . '</td></tr>';
}
?>
</table>
<input type="submit" name="deletepart" value="Delete Part" />
</form>
</body>
</html>
```

As you can see there's really not much code there. In fact the bulk of it is just HTML. 

Now to step through what's happening...

```php
require('rb.php'); // include redbean
```

This of course just brings the RedBeanPHP API into your code. The single file rb.php is available on redbeanphp.com

```php
// connect to your database
R::setup('mysql:host=localhost;dbname=rbparts', 'user', 'pass');
```

RedBean uses a Facade pattern to expose its API to the user. The above code sets up the Facade by calling setup() with a DSN string, username, and password.

```php
// Get a bean,
$part = R::dispense('part');
```

This is simply getting a 'Bean' object which you can add properties to before saving. You can dispense a bean at any time and when you save the bean a table will be created matching the data structure of your bean. If a table has already been created for this kind of bean then it's simply added to that table. Note at this point we have not saved the bean and no changes will have been made to the database.

Every bean you request is the same as a row in the table, you only need a new bean when you want to store a whole new element. So, 1 bean = 1 row in the table.


```php
// You can add properties at will and they will be mapped to columns of the same name in your part table
$part->type = $_POST['type']; 
$part->manufacturer = $_POST['manufacturer']; 
$part->model = $_POST['model']; 
$part->price = $_POST['price'];
```

Here we have just added the names of the values from our forms as properties on the Bean Object `$part`. We could add as many as we wanted, for example if you decided you wanted to store the date the part was added all you would have to do is add a property to the bean with `$part->dateCreated`

```php
// store the bean in the database, store() returns the id of
// the insert, similar to mysql_insert_id()
$id = R::store($part);
```

Calling `R::store($part)` persists our Bean to the database. If there wasn't already a table to store our bean, one will be created, and it will be named after the value we gave in the `R::dispense(name)` method - in this case, part.

If we run the query `"SELECT * FROM parts"` on the rbparts database before calling the `R::store()` method, we'll get an error saying the table doesn't exist - after the above code has run we would get...

```sql
mysql> select * from part;
+----+--------------+--------------+-------+-------+
| id | type         | manufacturer | model | price |
+----+--------------+--------------+-------+-------+
| 1  | Motherboards | ASUS         | 123   | 150   |
+----+--------------+--------------+-------+-------+
1 row in set (0.00 sec)
```

As you can see, the underlying data structure has been created for you on the fly in the form of a table named after your bean.

If you run a `DESCRIBE` on the table, you can see RedBean has selected fairly appropriate data types for your data

```sql
mysql> describe part;
+--------------+---------------------+------+-----+---------+----------------+
| Field        | Type                | Null | Key | Default | Extra          |
+--------------+---------------------+------+-----+---------+----------------+
| id           | int(11) unsigned    | NO   | PRI | NULL    | auto_increment |
| type         | varchar(255)        | YES  |     | NULL    |                |
| manufacturer | varchar(255)        | YES  |     | NULL    |                |
| model        | tinyint(3) unsigned | YES  |     | NULL    |                |
| price        | tinyint(3) unsigned | YES  |     | NULL    |                |
+--------------+---------------------+------+-----+---------+----------------+
5 rows in set (0.01 sec)
```

The above table structure is subject to change - RedBeanPHP has two modes of operation, fluid and frozen. There is an example of this later in this post.

```php
// load the bean with the bean type (part) and the id
$partToDelete = R::load('part', $_POST['partid']);
```

If we know the type and id of a Bean, we can use `R::load(type, id)` to pull the Bean from the database.

```php
// delete the bean from the database
R::trash($partToDelete);
```
`R::trash(bean)` does what you'd expect, the bean is deleted from the database.

```php
// extremely simple search query
$results = R::find('part', 'manufacturer OR model LIKE ?', array('%'.$_POST['q'].'%'));
```

RedBeanPHP just uses SQL for finding beans. To search for beans you just use `R::find(beanType, query, values)`, where query is your SQL and values are your `?` replacements.

Note: The find method is overloaded so if you only specify a bean type find will return all beans of that type

```php
$results = R::find('part');

foreach($results as $resultBean)
{
print '<tr><td><input type="radio" name="partid" value="'.$resultBean->id.'" /></td><td>' . $resultBean->type . '</td><td>' . $resultBean->manufacturer . '</td>'
. '<td>' . $resultBean->model . '</td><td>' . $resultBean->price . '</td></tr>';
}
?>
```

`R::find` returns an array of whatever bean type you specified. In the code above we're just looping through the results and printing out the various properties including 'id' which is a primary key automatically generated by RedBean when I stored the bean.

Overall RedBeanPHP offers a very rapid approach to building a standard PHP application. The above app, though rudimentary, took me next to no time to build and was significantly quicker to do than coding the same app by hand.

There are however a few gaps in the software as it stands, for example there is no obvious way of doing table joins that I've been able to find. And as with any ORM be it in PHP, Java or whatever there's likely going to be a performance sacrifice even if you run RedBean in <a title="RedBeanPHP Frozen Mode" href="http://www.redbeanphp.com/manual/freeze">Frozen Mode</a>.

Personally I'll be using RedBeanPHP for rapid prototyping of webapps. Whether or not I'd use it in production or not would rely heavily on the project, though things like the lack of table joins would likely make that decision for me.