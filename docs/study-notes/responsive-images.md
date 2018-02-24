# Responsive Images

## Table of Contents
* [Links](#links)
* [Getting Up and Running](#getting-up-and-running)
* [Units, Formats, Environments](#units-formats-environments)
* [Images with Markup](#images-with-markup)

## Links
* [Udacity Course - Responsive Images](https://www.udacity.com/course/responsive-images--ud882)
* [Web Fundamentals - Image Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)
* [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/)
* [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
* [MDN - calc()](https://developer.mozilla.org/en-US/docs/Web/CSS/calc)
* [MDN - figure](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)
* [MDN - implementing image sprites in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images/Implementing_image_sprites_in_CSS)
* [MDN - the HTML meta element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)
* [Article - WebP](https://developers.google.com/speed/webp/?csw=1)
* [Article - How To Make Your Websites Faster on Mobile Devices](https://www.smashingmagazine.com/2013/04/build-fast-loading-mobile-website/)
* [Article - Support of WebP](https://caniuse.com/#feat=webp)
* [Article - Support of Inline SVG](https://caniuse.com/#feat=svg-html5)
* [Article - Support of Data URIs](https://caniuse.com/#feat=datauri)
* [SVG optimiser](http://petercollingridge.appspot.com/svg-optimiser)
* [Unicode Character Table](https://unicode-table.com)
* [List of Unicode Characters](https://en.wikipedia.org/wiki/List_of_Unicode_characters)

## Getting Up and Running
Images consume a lot of bandwidth. Great designers don't optimize for mobile, they think responsively to build sites that work well on all devices. We need to use the highest quality images with the fewest bytes possible.

## Units, Formats, Environments
Images can be different in resolution, compression and download size on mobile. With images like photos, the total file size depends on the number of pixels multiplied by the number of bits it takes to store each pixel.

`Total bits = pixels x bits per pixel`

Performance matters so we need to **keep images as small as possible and compression as high as possible**. The first rule for saving images to a range of devices is to save them with the lowest possible quality and the smallest size possible.

The average webpage makes 56 **requests** for images, each one has a cost in terms of page load. Studies have shown that delays in loading pages can result in significant loss of traffic and revenue.

For devices such as laptops and desktops, don't assume that the window size is the same as the screen size. Remember that the **window size may change**. Using *max-width: 100%;* can be a good way to respond gracefully to a change to a larger viewport. When you're thinking responsively, consider large displays as well as small. *calc()* allows you to do simple calculations in CSS values and is a great way to combine absolute and relative values. Also consider the *last-of-type* selector.

Phones and tablets are often used in portrait orientation whereas a fullscreen browser window on a laptop is landscape. **Orientation** can change and when it comes to landscape and portrait, you need to think about content as well as size. Remember the golden rule for responsive web design: don't assume that the viewport size will always stay the same. There's no need to send images with natural resolutions higher than their display resolutions unless you need to scale up for high DPI devices.

Some CSS units are now widely supported for **responsive sizing**. One *vh* unit or viewport height corresponds to 1% of the viewport height, so 100vh means 100% height. The same goes for *vw* or viewport width. The *vmin* unit or viewport minimum corresponds to 1% of the viewport width or height, whichever is smaller. The *vmax* unit corresponds to 1% of the viewport width or height, whichever is greater. Please note that when setting both height and width to 100vmax or 100vmin changes the image's apect ratio - images will then be compressed to squares!

Raster and vector are two ways to create and store images. **Raster images**, photographs and other images represented as a grid of individual dots of color. These raster images might come from a camera, scanner or be created with the HTML canvas element. **Vector images**, images such as logos and line art, which can be defined as a set of curves, lines, shapes, fill colors and gradients. One vector format is SVG, it makes it possible to include responsive vector graphics in a webpage. The advantage of vector file formats over raster file formats is that the browser can render a vector image at any size.

There are some good general rules for improving cross-platform image performance. Use **JPEG** for photographic images (edges can lead to artifacts), some browsers as Chrome also support other formats (WebP), which can greatly increase compression and features. **WebP** supports alpha transparency animation along with lossy and lossless compression. Use **SVG** for vector images, use **PNG** if you can't use SVG, choose PNG over GIF because it has more colors, better compression and no licensing issues.

In order to serve the smallest possible image files, images need to run through optimization tools. Use PageSpeed Insights to check your pages. Checking images using the PageSpeed Insights API can easily be incorporated into build tests when pushing code to a repository, for example using a task runner such as Grunt.

## Images with Markup
In mobile networking, we need to reduce the number of image requests, not just the size of image files. One way to reduce the number of image bytes is to compress them.
**Latency** or the delay between request and response, is a significant bottleneck. Reducing latency improves page load times, whereas the effect of increased **bandwidth** flattens out as data just can't travel any faster than the speed of light. For many modern websites, bandwidth doesn't matter as much as latency does.

To reduce the number of image downloads, you can use **CSS image sprites** (or responsive sprites). A **sprite sheet image** combines lots of images, which can be displayed individually by setting the sprite sheet as the background to an element, then adjusting background position with CSS. This technique can be particularly useful for icons and other repeated graphics. Whatever techniques you use to avoid latency, be aware of the changes that are coming with **HTTP/2**.

Saving text as a graphic has many disadvantages, such as increased page weight and latency, artefacts when scaling, text not found by search engines, bad accessibility, ... If you do need to incorporate text in graphics, overlay real text over the top! Both photo and text display and scale much better, and you can select the text. When you're designing a responsive site, every time you add a placeholder for an image, think about whether you really need it. Sometimes the best image is no image at all. Web fonts and CSS enable beautiful typography on the web without having to resort to using text as graphics.

**CSS** can also be used for other graphical **effects**, in particular using CSS for shadows is supported by all modern browsers and much better than using image hacks. Likewise for rounded corners, gradient, and animations. Do be aware that there is a **processing and rendering cost** to using CSS shadows, rounded corners, and so on, especially on mobile. So, if you really want these effects, use CSS, but use them sparingly.

CSS also supports **background images**. You can use it to add a background pattern to an element or the page itself. This can be combined with gradients and other CSS effects. It's possible to get some incredible effects with pure CSS. With the background size cover property, CSS can also be used to add a background image that resizes without squashing or stretching. This can be really handy for using images when you don't know the size of the viewport. CSS background images can be used for conditional display of images depending on the viewport size. With background images, you can also use the *CSS Image Set function* to choose a background image depending on screen resolution.

*background-size: cover* means that the image is sized so that it's as small as possible while still completely filling its container.  
*background-size: contain* means that the image is sized so that it's as large as possible while still being completely visible inside its container.

If you need to use a graphical symbol like an arrow, a star or heart, check whether it's available as a character in a font. When symbols and icons are achieved using fonts, they have all the response of advantages of text. They're infinitely scalable, amenable to texts, CSS effects, and don't incur extra download. The **Unicode** standard defines the universal character set. Over 110,000 characters have been defined so far. Some fonts support many thousands of these. Unfortunately, not all browsers include the fonts needed to see all unicode characters by default.

**Icon fonts** provide a fantastic option for the little images and icons that often decorate websites. Icon fonts have a number of advantages over plain old images. They're vector graphics that can be infinitely scaled and an entire set of images can be downloaded in one font. This makes them a great potential solution for responsive designs where you require minimum downloads and maximum scalability. The characters in icon fonts behave just like letters in other fonts. So you can resize and color them and use other CSS effects, just like you would with text. There are lots of lots of pre-built icon fonts and tools for creating icon fonts.

If you really want to **reduce the number of file requests** your page makes, you can inline images using code. Two ways to do that, SVG and DataURIs. **Inline SVG** has great support on mobile and desktop browsers, and optimization tools can significantly reduce SVG size. SVG is incredibly powerful. **Data URIs** provide a way to include a file such as an image inline as a base64 encoded string. Just like SVG, Data URIs are well supported on mobile and desktop browsers. You can inline images in your HTML but Data URIs and SVGs can also be inlined in CSS. This works on both desktop and mobile.

How to include a page almost completely depends on the images place in your app, as a whole. Reducing the number of requests is very important on mobile. When reusing images it can make sense to use src to an external file so the browser can **cache** them.
