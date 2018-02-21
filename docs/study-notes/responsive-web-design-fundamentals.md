# Responsive Web Design Fundamentals

## Table of Contents
* [Links](#links)
* [Why Responsive](#why-responsive?)
* [Start Small](#start-small)
* [Building Up](#building-up)
* [Common Responsive Patterns](#common-responsive-patterns)
* [Optimizations](#optimizations)

## Links
* [Udacity Course - Responsive Web Design Fundamentals](https://www.udacity.com/course/responsive-web-design-fundamentals--ud893)
* [Web Fundamentals - What Makes a Good Mobile Site?](https://developers.google.com/web/fundamentals/design-and-ux/principles/)
* [Web Fundamentals - Responsive Web Design Basics](https://developers.google.com/web/fundamentals/design-and-ux/responsive/)
* [Web Fundamentals - Responsive Web Design Patterns](https://developers.google.com/web/fundamentals/design-and-ux/responsive/patterns)
* [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/)
* [MDN - meta viewport tag](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag)
* [MDN - using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)
* [MDN - basic concepts of grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)
* [MDN - event propagation](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Examples#Example_5:_Event_Propagation)
* [Article - difference between display: none and visibility: hidden in CSS](https://www.thoughtco.com/display-none-vs-visibility-hidden-3466884)
* [Article - Responsive Data Table Roundup](https://css-tricks.com/responsive-data-table-roundup/)

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

## Building Up
Picking the right design pattern can be more of an art than a science. A responsive website changes based on the characteristics of a device. This means different styles can be applied, the easiest way to do this is with **media queries**. Don't use *@import* because performance matters!

```HTML
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" media="screen and (min-width:500px)" href="over500.css">
```

In linked CSS there are many small http requests, with *@media* there are fewer but bigger http requests.

```CSS
.yes {
    color: green;
    opacity: 0;
}
.no {
    color: red;
}

@media screen and (min-width: 500px) and (max-width: 600px) {
    .yes {
        opacity: 1;
    }
    .no {
        opacity: 0;
    }
}
```

*min-width* and *max-width* are mostly used. Don't use the device versions, min-width for example is based on the browser window where min-device-width is based on the size of the screen (possible problems with resizing).

The point at which the page changes layout is called a **breakpoint**, there can be one or several. Always look at the content to find the right breakpoints.

The most simple and probably most important pattern is the **grid fluid system**. With this pattern, columns end up wrapping to the next line as the browser width starts getting smaller. There are lots of good examples like Bootstrap.

**Flexbox** is one of the most powerful tools you can use for layout. Make sure that you're using the vendor prefixed versions. The reason Flexbox is so powerful is its ability to fill the space available. If an element has extra room around it, it will expand to fit. If it's getting crowded elements will shrink so they take up as little space as possible.
In normal block layout, each div is positioned one underneath the other one. Adding *display: flex;* to the container div will show the divs in a row (the default flex direction), by default flex items fit on a single line.
Another feature of flexbox is the ability to change the order of elements using the css order attribute.

## Common Responsive Patterns
There are 4 established **responsive patterns** that work on most devices, sometimes a combination of them.

In pattern **Column Drop** each element will stack vertically at its narrowest viewport.
As things get wider, the elements expand until the first break point is hit. As the viewport gets wider, the elements keep expanding until the next breakpoint is hit. Generally, once the viewport hits a maximum width, the columns hit a maximum size, and instead of getting wider, margins are added.

The **Mostly Fluid** pattern is very similar to column drop but it tends to be more grid like with more columns and columns fitting in different ways depending on the viewport width. When the layout hits its widest viewport, margins are added on the left and right instead of expanding things out.

The **Layout Shifter** pattern is probably the most responsive pattern with multiple breakpoints across several different screen widths. Instead of reflowing and dropping below other columns, we can use the css order attribute. It does require more planning to maintain.

Instead of stacking vertically, the **Off Canvas** pattern places less frequently used content (navigation, app menus) off screen, only showing them if the screen is large enough. On smaller screens the off canvas content is typically shown when the user taps on the hamburger icon. In other cases the off screen content may actually come in from off the screen (left or right).

## Optimizations
**Images, tables and typography** are important aspects to responsive web design. Art direction, srcset and the picture element are all important and they're discussed in great detail in the [Responsive Images](https://www.udacity.com/course/responsive-images--ud882) course.
Tables can be tricky, when there are many columns this often leads to overflowing the viewport and horizontal scrolling. There are a few options to fix this but might require some experimenting.

**Hidden Columns** essentially hides table columns based on their importance as the viewport size gets smaller. The biggest problem with this approach is that we're hiding content from the user so consider abbreviating content.

With the **No More Tables** technique, below a certain viewport width, the table is collapsed and resembles a long list as opposed to table data. The nice thing is that all of the data is visible, no matter what the size of the viewport is.

**Contained Tables** keep the table in the viewport by wrapping it in a div, set width to 100% and overflow-x to auto. Instead of breaking out of the viewport, the table will instead take up the same width but scroll in the viewport.

If a line of text is too long, readers will read parts again or skim through the text. A good **line length** is around 45 to 90 cpl, with an ideal of 65 cpl. Use measures as an important factor for picking breakpoints. Make sure **fonts** are big enough to read across any device. A recommendation is to set the base font to at least 16px, 1.2 em line height, text heavy sites can have it increased to 18px, 1.25em.

Besides **major breakpoints** where layout changes significantly, **minor breakpoints** can also be interesting for small changes as margin, padding and font size.
