jQuery Callback Calendar
========================

This is a simple calendar with the ability to tie callbacks to dates.
It includes a header, Month YYYY and previous and next navigation.

You add events ( days ) to it using either a string "Month-dd-yyyy" or a
Date object, and then pass it a callback funciton.  When a user clicks on
that day it runs the callback.

Running Example:

http://flynndev.us/projects/jquery-calendar/

Usage
-----
```
    // Initialize Calendar

    $('.calendar').calendar({ ...options });

    // Tie Click event to calendar day

    $('.calendar').addEvent( "March-19-2017", function(){ alert("test"); } );
    $('.calendar').addEvent( new Date(2017, 2, 25), function(){ alert("test of date object"); } );

```

Options
-------

| Option | Description | Default Value |
| --- | --- | --- |
| month | Month Shown on Calendar; a number between 0 and 11 | `new Date().getMonth() // Dynamic Current Month` |
| year | Year Shown on Calendar (YYYY) | `new Date().getFullYear() // Dynamic Current Year` |
| square | Boolean.  Enable or disable js that makes grid items square  dynamically | `true` |
| button_style | CSS Class on next and previous buttons | `btn btn-primary btn-xs` |
| previous_html | HTML in previous button | Font Awesome Chevron Left |
| next_html | HTML in next button | Font Awesome Chevron Right |
| title_element | HTML element for title | `h1` |
| title_class | CSS Class for title | `ttl` |
| days | Array of day names, starting with Sunday | ` ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']` |
| months | Array of month names | `['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']` |


Dependencies
------------
- jQuery 3.2
- jQuery UI 1.12.1
- Bootstrap 3
- Font Awesome 4.7.0