# Responsive Web Design Fundamentals

## Table of Contents
* [Links](#links)
* [Why Responsive](#why-responsive?)
* [Start Small](#start-small)

## Links
* [Google Developers - Web Fundamentals](https://developers.google.com/web/fundamentals/)
* [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/)
* [MDN - meta viewport tag](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag)

## Why Responsive?
RWD is an art, not a science!
Make your content work across any device.

## Start Small
The **viewport** defines the area of the screen that the browser can render content to.
A pixel isn't always a pixel, tech specs will refer to the number of physical or **hardware pixels**.  
The browser reports the width in the number of **DIPs or Device Independent Pixels**. A DIP is a unit of measurement that actually relates pixels to real distance. The idea being that a DIP will take up the same amount of space on a display regardless of the pixel density of the display. As an example, when a browser has a viewport width of 1280 dip, these get scaled up to 2560 hardware (physical) pixels when the page is rendered on the display.  

`<meta name="viewport" content="width=device-width, initial-scale=1">`

If you don't tell the browser (no meta viewport) that your site is designed to work on a small screen, it assumes it's not and renders the page as if it were on a screen that is 980 dips wide. Scaled content on a phone with only 360 dips wide will get scaled to less than half! It then tries to make the content look better by using font boosting, the browser tries to pick the primary content on the page and scale it up.  
The **Device Pixel Ratio** compares the number of pixels in just one dimension. A DPR of 2 is 1 CSS pixel for every 2 hardware pixels. The viewport width is generally calculated by dividing the number of physical pixels by the device pixel ratio.

**Relative widths** are better suited for responsive design. Use relative positions instead of absolute positions to prevent them from accidentally overflowing.
It is recommended to add a catch all in your main css and set the max width to 100% for img, embed, object and video elements (max-width overrides the width element).

```CSS
embed,
img,
object,
video {
    max-width: 100%;
}
```

**Tap targets** need to be big enough, easy to hit and spaced. Fingers are about 40 css pixels wide, so make the targets 48 pixels wide and tall. Some tap targets can be smaller but use 40 pixels between them.

```CSS
nav a,
button {
    min-width: 48px;
    min-height: 48px;
}
```

Performance matters so start with prioritising content and move from the smallest form factor to the next.
