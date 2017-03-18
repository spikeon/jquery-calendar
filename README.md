jQuery Calendar
===============

This is a simple calendar with the ability to tie callbacks to dates.
It includes a header, Month YYYY and previous and next navigation.

Running Example:

http://flynndev.us/projects/jquery-calendar/

Usage
-----
```
    // Initialize Calendar

    $('.calendar').calendar();

    // Tie Click event to calendar day

    $('.calendar').calendar("addEvent", "March-19-2017", function(){ alert("test"); } );

```

TODO
----
* document options
* re-write js in ES2016 and compile & minify with babel


Dependencies
------------
- jQuery 3.2
- jQuery UI 1.12.1
- Bootstrap 3
