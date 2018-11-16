# [TTRSS on RoundCube](https://github.com/gloony/roundcube_ttrss)

Embed your [TTRSS](https://tt-rss.org) account into your [RoundCube](https://roundcube.net) (used the [TTRSS API](https://git.tt-rss.org/fox/tt-rss/wiki/ApiReference))

**This plugin work only with RoundCube 1.4+ and with elastic skin**

# Installation

```
You need a fully functional TTRSS server
Install these content into your_roundcube_root/plugins/ttrss/
Configure your config.inc.php to add this plugin
Go to your settings into your RoundCube instance and add a server
```

# ToDo

```
Let the possibility to subscribe or unsubscribe to feeds
Sort menu
Search menu
Find a way to count all article by feed (and activate button last page)
Localization to improve and some texts was never changed from the Mail template
Optimization
```

# Limitations

```
Due to API limitation, you : 
> Cannot create, rename or delete label
> Cannot create, rename or delete category
> Cannot move Feed to another category
> Cannot change order id of feed (for this reason, I choose to sort by alphabetic order)

So for all these actions, your need to log in into your TTRSS instance and while the API doesn't change, I cannot change that

Because I use localStorage for store current feeds selection and more, the use of multiple instance of roundcude_ttrss can be hazardous
But it take the advantage to let you your session when the browser is closed at the same place than before
```

# Screenshots

![roundcube_ttrss Main](screenshots/Main.png)
![roundcube_ttrss Settings](screenshots/Settings.png)

# OpenSource used

[tt-rss-api-php-class by tofika](https://github.com/tofika/tt-rss-api-php-class)

[favico.js by ejci](https://github.com/ejci/favico.js)

[elastic by roundcube](https://github.com/roundcube/elastic)