# Nodecrumbs
Easy and compact breadcrumbs library for node

#### To install:
```npm install nodecrumbs --save```

<br>

The way it works is it parses the request URI, ie. /home/about/company into an an iterable array of breadcrumb objects
so that you can render something like: "Home | About | Company" in your markup with all the necessary links without you
having to worry about the formatting, names or links.

## Examples

In your router create a breadcrumbs array like the following:

```javascript
var nodecrumbs = require('nodecrumbs').Nodecrumbs;

app.get('/', (req, res) => {
    var crumbs = new Nodecrumbs(req);
});
```

This will return you an instance of the Nodecrumbs object of which you can:

```javascript
var crumbsArray = crumbs.parse();
```

This will give you an iterable object which you pass into and loop in your templates, 
though a premade render function using the initial nodecrumbs object (not the parsed array) is available to the lazier ones (example used uses EJS template library):

```javascript
<%- nodecrumbs.render(); %>
```

Will render the default breadcrumbs markup

To manually render the breadcrumbs, you would iterate the crumbs array and use the <strong>getUri()</strong> and <strong>getName()</strong> methods respectively:

```html
<ul>
<% for(var crumb in crumbs) {%>
    <li><a href="<%= crumbs[crumb].getUri(); %>"><%= crumbs[crumb].getName(); %></a></li>
<% } %>
</ul>
```

## Documentaion

The Nodecrumbs constructor takes the following arguments:
```javascript
Nodecrumbs(req, format = 'standard', home='home')
```

#### Request
The request object captured by your request listener (e.g express.js)

#### Format: 
'upper', 'lower', ''standard' - (string) how the breadcrumbs should be formatted

#### Home: 
defaults to ''home' - (string) alias for the first breadcrumb linking to home

# Testing
Test cases can be checked with npm test

<br />

Feel free to contribute!
