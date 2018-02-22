# Responsive Images

## Table of Contents
* [Links](#links)
* [Getting Up and Running](#getting-up-and-running)
* [Units, Formats, Environments](#units,-formats,-environments)

## Links
* [Udacity Course - Responsive Images](https://www.udacity.com/course/responsive-images--ud882)
* [Web Fundamentals - Image Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)
* [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/)
* [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
* [MDN - calc()](https://developer.mozilla.org/en-US/docs/Web/CSS/calc)
* [MDN - figure](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)
* [Article - WebP](https://developers.google.com/speed/webp/?csw=1)
* [Article - Support of WebP](https://caniuse.com/#feat=webp)

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
