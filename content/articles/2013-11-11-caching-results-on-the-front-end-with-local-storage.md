---
title: Caching Results on the Frontend With Local Storage
bg: bg-gray-600
decoration: decoration-gray-600
archived: true
createdAt: 2013-11-11
updatedAt: 2013-11-11
---

I'm working on a small web application as a side project at the moment, the app works with a large-ish dataset that will only change every now and then. I think this problem is a good opportunity to experiment with HTML5 local storage, so I've put together a POC to see how it can work before bringing it into the project.

To do this, I'm going to use MySQL as the data source with a quick and dirty PHP script acting as a controller and model hybrid, and I'll use jQuery to handle the AJAX. But this solution can be used across just about any web stack, whether you use a relational database, or any database at all. I'm providing an overview of the method, not a detailed guide on a rigid implementation to be followed to the T.

Firstly, I should define what I mean by cache...


* Data will be initially sent to the browser
* When the user returns to the app, it checks if the data has changed
* If the data hasn't changed, the app doesn't cycle the data
* If the data has changed, cycle it (trash the cache, download the data fresh from the server)

So we need to tell if the data has changed between the cache and the data source. We'll use a hash for that.

I'm using this very simple table in the example:

```sql
some_table(id int(11), some_data varchar(10))
```

I use the following SQL to get a hash of the current state of this table:

```sql
SELECT SHA1(CONCAT(GROUP_CONCAT('id', 'some_data'))) AS hash FROM some_table
```

SHA1 is the hash algorithm - it doesn't matter what algorithm we use here

CONCAT will flatten the values we get back into one long string ready for the hashing algorithm
CONCAT_GROUP will flatten the results to a single row

From this, we'll get a hash like this:

```
0fef95f4087ff39fab1bf51915c9a2650995de5d
```

Then when we do this:

```sql
INSERT INTO some_tables (some_data) VALUES ('this is some data')
```

And re-run the SELECT query, we get:

```
9a2accaac936a97f39822232fad6e3d7907273e9
```

And so on for any other changes to the database that result in a new instance or state of the table.
Below is the Javascript/jQuery we use when the page loads:

```js
$(document).ready(function() 
{
    $("#data-source").html("");

    $.ajax({
        type : 'GET',
        url : 'get_data.php',
        data : { 
            'ajax' : true,
            'hash' : window.localStorage.getItem('hash')
        }
    }).done(function(response) { 
        var data = '';

        if(typeof(Storage)!=="undefined")
        {
            /**
             * If we recieve back the same hash we sent, the data hasn't updated
             * and has not been sent in the response
             */
            if(response.hash != window.localStorage.getItem('hash'))
            {
                if(window.localStorage.getItem('hash')===null)
                {
                    console.log("First time data+hash received by server");
                }
                else
                {
                    console.log("Updating local storage from server");
                }

                window.localStorage.setItem('hash', response.hash);
                window.localStorage.setItem('data', response.data);
            }
            else
            {
                console.log("No updates, using local storage")
            }

            /**
             * This has either just been updated, or is the same as last time
             */
            data = window.localStorage.getItem('data');
        }
        else
        {
            console.log("Updated from server, no local storage");

            /**
             * No cache, just load the data, which will have been sent to us 
             * because the hash is null.
             */
            data = response.data;
        }

        console.log(data);
    });
});
```

The referenced get_data.php will check the hash sent back from the local storage, if it's null, it will send through a hash and the data. If the hash sent from local storage matches the current hash for the database table, it will only send back the hash (which will match what was sent from local storage). And if the hashes do not match, it will send back a new hash and the data.

Here's get_data.php:

```js
if(isset($_GET['ajax']))
{
    $responseObj = new stdClass();

    if(!empty($_GET['hash']))
    {
        $current_hash = get_current_hash();

        if($_GET['hash']==$current_hash)
        {
            /**
             * The data is the same, so just send back the current hash for the
             * front end to use for verification of no change
             */
            $responseObj->hash = get_current_hash();
        }
        else
        {
            /**
             * The data has changed, send back the new hash for the new data
             * and of course, the new data
             */
            $responseObj->hash = get_current_hash();
            $responseObj->data = get_data();
        }
    }
    else
    {
        /**
         * There's no hash, must be a first time load or reload, send everything
         */        
        $responseObj->hash = get_current_hash();
        $responseObj->data = get_data();
    }

    header('Content-type: application/json');
    print json_encode($responseObj);
}
else
{
    print get_data();
}

function get_data()
{
    return array('key' -> 'value');
}

function get_current_hash()
{
    $link = mysqli_connect('localhost', 'user', 'pass');

    mysqli_select_db($link, 'localcache');

    $get_hash_sql = get_hash_sql();

    $result = mysqli_query($link, $get_hash_sql);

    $row = mysqli_fetch_assoc($result);

    return $row['hash'];
}

function get_hash_sql()
{
    return "SELECT SHA1(CONCAT(GROUP_CONCAT('id', 'some_data'))) AS hash FROM some_table";
}
```

Here's an overview:

<a href="/images/posts/Screen-Shot-2013-11-11-at-9.09.05-PM.png"><img alt="Local cache overview" src="/images/posts/Screen-Shot-2013-11-11-at-9.09.05-PM.png" /></a>