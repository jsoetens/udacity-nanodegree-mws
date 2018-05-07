# Asynchronous JavaScript Requests

## Table of Contents
* [Links](#links)
* [Introduction](#introduction)
* [Ajax with XHR](#ajax-with-xhr)
* [Ajax with jQuery](#ajax-with-jquery)
* [Ajax with Fetch](#ajax-with-fetch)

## Links
* [Udacity Course - Asynchronous JavaScript Requests](https://www.udacity.com/course/asynchronous-javascript-requests--ud109)
* [Eloquent JavaScript - Asynchronous Programming](http://eloquentjavascript.net/11_async.html)
* [JavaScript Promises: an Introduction](https://developers.google.com/web/fundamentals/primers/promises)
* [Progressive Web Apps Training - Working with the Fetch API](https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api)
* [Introduction to fetch()](https://developers.google.com/web/updates/2015/03/introduction-to-fetch)
* [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [David Walsh's blog on fetch](https://davidwalsh.name/fetch)
* [Jake Archibald's blog on fetch](https://jakearchibald.com/2015/thats-so-fetch/)
* [JavaScript Promises: an Introduction](https://developers.google.com/web/fundamentals/primers/promises)
* [HTTP Access Control (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
* [Google APIs Explorer](https://developers.google.com/apis-explorer)
* [API Directory](https://www.programmableweb.com/apis/directory)
* [MDN - Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
* [Pause Your Code With Breakpoints](https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints)
* [JavaScript Debugging Reference](https://developers.google.com/web/tools/chrome-devtools/javascript/reference)
* [window.fetch polyfill](https://github.com/github/fetch)

## Introduction
There are a few different ways to make AJAX requests.
* make requests using the tried and true but somewhat cumbersome XHR way.
* use the jQuery library to smooth out making async requests using its API.
* use the Fetch API which is the new and massively improved way to make promise-based asynchronous requests.

An **API** is used to interact with various data sources. The acronym API stands for **Application Programming Interface**.
Most of the data-rich applications you use get their data from 3rd party websites. They actually fetch this data using APIs.

## Ajax with XHR
The main concept of **Ajax** is simple. You make a request for some data and then without pausing for everything to wait for the request of return, you just move on and do something else. Once the requests finally does get returned you deal with it.
Ajax used to be an acronym for **Asynchronous JavaScript And XML**, now Ajax is the **concept of asynchronously requesting data**. You just request the data asynchronously and then deal with it when it comes back.

A **GET Request** is an internet request for data and it's sent from a client to a server.

A **Response** is a server's response to a request and it's sent from a server to a client. A response to a GET request will usually include data that the client needs to load the page's content.

In order for a website to open, it performs many requests for data. Most of the time, the response is critical for the page to load.
When your browser makes a request synchronously, or without AJAX, it has to wait for responses before proceeding with the load.
AJAX is special because it allows these types of requests asynchronously, which means that they can happen in the background without blocking the rest of the page load.

When we send off a GET request, we have plans for what to do when the response gets back. These instructions will be set aside for ourselves and patiently wait until the response eventually gets back. We'll then take a look at the instructions and do something with them. These instructions that we set aside are called a **callback**, we call them when I get a response back.

Ajax requests allow for content retrieval and display without reloading the web page.
Asynchronous in Ajax refers to the fact that the request doesn't block other events from happening.
Instead, the page keeps on doing its thing and then only acts on the data when it gets returned by the server.
Ajax requests occur in a number of different ways and with varying levels of difficulty.
Most Ajax request nowadays are actually AJAJ request standing for Asynchronous JavaScript And JSON requests, but still just call them Ajax.

Just like how the document is provided by the JavaScript engine, the JavaScript engine also provides a way for us to make asynchronous HTTP requests. We do that with an **XMLHttpRequest** object.

For security reasons, you can only make requests for assets and data on the same domain as the site that will end up loading the data. For example, to asynchronously request data from google.com your browser needs to be on google.com. This is known as the **same-origin policy**.
The way to circumvent the same-origin policy is with **Cross-Origin Resource Sharing (CORS)**. Services that provide APIs use CORS to allow developers to circumvent the same-origin policy and access their information.

When making a request from an API that returns JSON, all we need to do is convert that JSON response into a JavaScript object. We can do that with JSON.parse();.

Using the XHR object to create and send asynchronous requests requires a lot of steps: create an XHR object, handle a successful request, and deal with errors.
We don't always have to use the XHR object to make async requests, we could use some third party library like jQuery to make the request for us.

## Ajax with jQuery
**jQuery** is an incredibly popular JavaScript library that provides a lot of functionality right out of the box. It was created a number of years ago back when browsers hadn't joined together to standardize on functionality. jQuery made life easier for developers that were building websites that had to function in all of the major browsers by providing a unified interface. Now that browsers have pretty much aligned, jQuery's usage is not as necessary as it was several years ago. The **.ajax()** method is at the heart of all asynchronous requests for the entire jQuery library.
So when you use a JavaScript library like jQuery to make async requests, you just request the data and then jQuery does all of the hands-on work under the hood.

One helpful piece of info that DevTools provides is the JavaScript Call Stack. This displays the order of function calls that are in progress. The function at the bottom of the stack is the first one to run. A function stays on the stack until the one above it returns.

jQuery's ajax method does a lot of things under the hood. It creates a new XHR object each time it's called, it then sets all of the XHR properties and methods. Finally it sends the XHR request.

jQuery also has a number of "convenience methods" but it's often considered good practice to use the $.ajax() method.

## Ajax with Fetch
**Fetch** is a new API that was built to make requesting resources (primarily across a network) a whole lot easier.
Since a Fetch request returns a Promise we can use to listen for the response, all we have to do is call .then() on that Promise.
If your browser is not supported, just add a polyfill to your project.

Fetch requests still need to obey the cross-origin protocol of how resources are shared.
GET is the default HTTP method is for a Fetch request. Fetch's specification does not limit what HTTP methods can be used, although it does recommend that all methods are written in uppercase for consistency with the HTTP Verbs specification.

```JavaScript
fetch('examples/example.json')
.then(function(response) {
  // Do stuff with the response
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
});
```

The response that's returned is of the Response type. This Response object is new with the Fetch API and is what's returned when a Fetch request resolves. It also only has information about the response itself, it doesn't have any of the data we search for. To get the data, we need to get the body of the response.

We just need to call .json() on the response variable. The .json() method on a Response object returns a Promise, so we need to chain on another .then() to actually get and start using the returned data.

Please note that you can shrink the amount of code by using ES6 arrow functions.
