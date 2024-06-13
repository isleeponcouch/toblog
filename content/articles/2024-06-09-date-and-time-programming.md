---
title: Date and Time Programming
bg: bg-fuchsia-600
decoration: decoration-fuchsia-600
createdAt: 2024-06-09
updatedAt: 2024-06-09
---
Dates, times and timezones are a thing that at first seem straight forward, before you realise they're not. Before beginning to think they're not that bad, before realising again, actually they are that bad.

Almost all developers out there 'know' that best practice for dates, or more so the best way around dates, is to store everything in the database as UTC and convert back to the timezone you want to display or otherwise make use of when you pull it back out.

But there are [plenty](https://derickrethans.nl/storing-date-time-in-database.html) [of](https://codeblog.jonskeet.uk/2019/03/27/storing-utc-is-not-a-silver-bullet/) [articles](https://www.creativedeletion.com/2015/03/19/persisting_future_datetimes.html) out there explaining why this isn't the panacea of date programming that it's made out to be. The TL;DR of that is when you store something as UTC you do so from a source timezone and for a bunch of practicle reasons that timezone might change from underneath you when you pull the date back out. 

So let's look at some timezone things. 

## How MySQL knows what time it is

MySQL grabs the timezone from the system it's running on and stores it in a `system_time_zone` [variable](https://dev.mysql.com/doc/refman/8.4/en/time-zone-support.html), it then sets the `time_zone` variable to represent the time that MySQL itself is using, which by default is `SYSTEM` which means use whatever `system_time_zone` is set to. These two values don't have to match, you can have your database running in a different timezone than your system, but typically they do. The `time_zone` variable is split into global and session variables, global meaning exactly what it sounds like and session being a per-connection timezone setting.

We can see what these are currently set to using the query: `SELECT @@GLOBAL.time_zone, @@SESSION.time_zone;`. When I do that on my local machine, we see the typical setup...

```sql
mysql> SELECT @@GLOBAL.time_zone, @@SESSION.time_zone;
+--------------------+---------------------+
| @@GLOBAL.time_zone | @@SESSION.time_zone |
+--------------------+---------------------+
| SYSTEM             | SYSTEM              |
+--------------------+---------------------+
1 row in set (0.00 sec)
```

There are a bunch of timezone related command line arguments that can be passed onto MySQL when starting it, but they're just another way of setting the variables above.

### MySQL Date & Time Column Types

MySQL has the following types for representing dates and times.

- `DATETIME`
- `TIMESTAMP`
- `DATE`
- `TIME`

There's also `YEAR` but let's just leave it out.

So let's do a quick and dirty test on these column types with some timezone monkey business and see what happens...

Let's start off by getting the timezone for the session into UTC+10:00 (Brisbane/Australia) by doing `SET SESSION time_zone = '+10:00';`

We'll work with this table for the tests:

```sql
create table tests (dt_col datetime, ts_col timestamp, date_col date, time_col time);
```

And insert some data.

```sql
insert into tests (dt_col, ts_col, date_col, time_col) VALUES (now(), now(), '2024-10-10', '10:10');
```

```sql
mysql> select * from tests;
+---------------------+---------------------+------------+----------+
| dt_col              | ts_col              | date_col   | time_col |
+---------------------+---------------------+------------+----------+
| 2024-06-08 18:37:54 | 2024-06-08 18:37:54 | 2024-10-10 | 10:10:00 |
+---------------------+---------------------+------------+----------+
1 row in set (0.00 sec)
```

Looks as expected. The datetime column and the timestamp column both got the current timestamp from `NOW()` (on a side note, the timestamp would've received the same value if we set it to null or left it out of the query altogether, it's a MySQL feature that the first `TIMESTAMP` in a table updates on inserts and updates).

Now that we have some data, let's set the timezone back to GMT (UTC+00:00) and see what happens...

```sql
SET SESSION time_zone = '+00:00';
```

```sql
mysql> select * from tests;
+---------------------+---------------------+------------+----------+
| dt_col              | ts_col              | date_col   | time_col |
+---------------------+---------------------+------------+----------+
| 2024-06-08 18:37:54 | 2024-06-08 08:37:54 | 2024-10-10 | 10:10:00 |
+---------------------+---------------------+------------+----------+
1 row in set (0.01 sec)
```

Our data stayed the same, except for the timestamp column. `TIMESTAMP` is a zone-sensitive value, from the MySQL docs *"Values for TIMESTAMP columns are converted from the session time zone to UTC for storage, and from UTC to the session time zone for retrieval."*.

So then why after the insert do we see the timestamp column set to the same value as the datetime column. The select statement is a retrieval, so although MySQL is storing the timestamp as UTC internally, we'll never 'see' that in our queries. The `NOW()` function is also zone-sensitive and will be generated in the session timezone we set.

So all that to say, with the exception of `TIMESTAMP` all of the other MYSQL date/time types are just static columns that hold data in the format of a date and or time. There's a lot of misinformation out there about this, that all date times are stored as UTC, specifically the `DATETIME` column type is often said to operate this way. Because a lot of web and database servers are going to default to UTC and because there are a lot of great datetime standard or third-party libraries out there that make it easy to work in UTC but display local timezones, it's possible to go along thinking MySQL is doing this conversion for us when really it's just the default settings.

## Daylight savings

Let's do some more tests on our table, 

```sql
mysql> truncate table tests;
Query OK, 0 rows affected (0.04 sec)
```

Re-run our inserts

```sql
insert into tests (dt_col, ts_col, date_col, time_col) VALUES (now(), now(), '2024-10-10', '10:10');
SET GLOBAL time_zone = 'Australia/Sydney';
```

```sql
mysql> SELECT @@GLOBAL.time_zone, @@SESSION.time_zone;
+--------------------+---------------------+
| @@GLOBAL.time_zone | @@SESSION.time_zone |
+--------------------+---------------------+
| Australia/Sydney   | Australia/Sydney    |
+--------------------+---------------------+
1 row in set (0.00 sec)
```

mysql> insert into tests (dt_col) values (CONVERT_TZ('2024-10-11 1:00:00', 'UTC', 'Australia/Sydney'));
Query OK, 1 row affected (0.00 sec)


mysql> insert into tests (dt_col) values (CONVERT_TZ('2024-10-11 1:00:00', 'UTC', 'Australia/Brisbane'));
Query OK, 1 row affected (0.00 sec)

```sql
mysql> select * from tests;
+---------------------+---------------------+------------+----------+
| dt_col              | ts_col              | date_col   | time_col |
+---------------------+---------------------+------------+----------+
| 2024-06-08 19:57:58 | 2024-06-08 19:57:58 | 2024-10-10 | 10:10:00 |
| 2024-10-11 12:00:00 | NULL                | NULL       | NULL     |
| 2024-10-11 11:00:00 | NULL                | NULL       | NULL     |
+---------------------+---------------------+------------+----------+
3 rows in set (0.00 sec)
```

## Timezones vs UTC offsets

In the above two sections, we've used a combination of UTC offsets such as +00:00 and named timezones such as `Australia/Sydney`. At its simplest, the difference between a named timezone and a UTC offset is that a named timezone is a series of UTC offsets based on the rules of the given timezone, i.e. `+10:00` for the given Sydney example in standard time, `+11:00` for daylight savings.

The named timezones come from the zoneinfo database on your computer, probably `/usr/share/zoneinfo` if you run a \*nix-y type OS, and it's the compiled version of the human readable timezone text files here [IANA Time Zone Database](https://www.iana.org/time-zones).

Below is part of the human readable timezone textfile for `Australia/Sydney`:

```
# New South Wales
# Rule	NAME	FROM	TO	-	IN	ON	AT	SAVE	LETTER/S
Rule	AN	2008	max	-	Apr	Sun>=1	2:00s	0	S
Rule	AN	2008	max	-	Oct	Sun>=1	2:00s	1:00	D

# Zone	NAME		STDOFF	RULES	FORMAT	[UNTIL]
Zone Australia/Sydney	10:04:52 -	LMT	1895 Feb
			10:00	Aus	AE%sT	1971
			10:00	AN	AE%sT
```

The `Rule` lines are referenced by the `Zone` line for `Australia/Sydney` which also specifies the standard offset of `10:00`. 

In New South Wales, daylight savings is observed from 2am on the first Sunday in October until 3am on the first Sunday in April.

`Rule	AN	2008	max	-	Oct	Sun>=1	2:00s	1:00	D` says from 2008 until now on the first Sunday `Sun>=1` in October `Oct` at 2am `2:00s` add `1:00` to the offset for daylight savings.

`Rule	AN	2008	max	-	Apr	Sun>=1	2:00s	0	S` says from 2008 until now on the first Sunday of April `Apr	Sun>=1` at 2am `:00s` go back to adding nothing, i.e., no more daylight savings please.

Note from the above that daylight savings ends at 3am, but the second rule for the end of daylight savings shows the same `2:00s` as the start of daylight savings in October. The s in `2:00s` is referencing standard time not the daylight time, so because we will still be operating with the +1:00 offset, it will come into effect at 3am daylight savings and take us back to 2am standard.

### The MySQL timezone table

MySQL sets up timezone tables in its system schema that need to be populated if we want to use named timezones in MySQL queries, MySQL has a tool `mysql_tzinfo_to_sql` which takes the compiled versions of the timezone files from `/usr/share/zoneinfo` that are the binary form of the human readable format above and populates those tables with that information.

If you haven't populated these tables, you can only use UTC offsets in functions like `CONVERT_TZ` and will get an error when using a named timezone.

## Where to deal with timezones, the db or the application code?

Most recommendations I've seen around the web are to keep all timezone code in the application. For the most part, I think that is the correct answer, just because of the quality of datetime libraries available to the application over the database and their ease of use. But I think if you were hellbent on doing it in the database that it should be totally possible as long as it is setup correctly with the timezone tables populated and kept up to date. In any case, as with a lot of things in software development, I think the correct choice is to make a choice and then stick with it.

## Thinking in Timezones

For all of this information one of the simplest things to do, I think, when working with timezones is to audit your own thinking of how timezones work in our code.

As developers as a collective whole, we kind of suck at date programming. Most of us will take the 'store it as UTC and it'll be all' good advice and think we've done the job. And honestly, most of the time we have. When we're storing `createdAt` or `updatedAt` fields, or or scheduling near future events that aren't appointments that cross timezones, everything will work. Even if it technically doesn't *really*, we might not notice or care because if it's not an appointment or other important date/time combination that could have somebody arrive at a location in the real world expecting some other person or event or service to be there too, it might still go unnoticed even if we do get caught in changing timezones.

## Interesting Timezone things

Daylight savings time was sometimes referred to as 'War Time' so in the zoneinfo files you can sometimes see `D` and `S` for daylight and standard time replaced with `W` and `P` for war and peace time.

```
# Rule  NAME    FROM    TO      TYPE    IN      ON      AT      SAVE    LETTER/S
Rule    US      1918    1919    -       Mar     lastSun 2:00    1:00    D
Rule    US      1918    1919    -       Oct     lastSun 2:00    0       S
Rule    US      1942    only    -       Feb     9       2:00    1:00    W # War
Rule    US      1945    only    -       Aug     14      23:00u  1:00    P # Peace
```
