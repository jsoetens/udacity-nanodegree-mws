# Web Accessibility

## Table of Contents
* [Links](#links)
* [Accessibility Overview](#accessibility-overview)
* [Focus](#focus)

## Links
* [Udacity Course - Web Accessibility](https://www.udacity.com/course/web-accessibility--ud891)
* [Udacity GitHub Repository - Web Accessibility](https://github.com/udacity/ud891)
* [ChromeVox](http://www.chromevox.com/)
* [Chrome Extension - Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en)
* [Chrome Extension - Accessibility Developer Tools](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb?hl=en)
* [Web Content Accessibility Guidelines 2.0 (WCAG)](https://www.w3.org/TR/WCAG20/)
* [WebAIM's WCAG 2.0 Checklist](https://webaim.org/standards/wcag/checklist)
* [WebAIMs Checklist 2.1.1 - Keyboard](https://webaim.org/standards/wcag/checklist#sc2.1.1)
* [WebAIMs Checklist 1.3.2 - Meaningful Sequence](https://webaim.org/standards/wcag/checklist#sc1.3.2)
* [WebAIMs Checklist 2.1.2 - No Keyboard Trap](https://webaim.org/standards/wcag/checklist#sc2.1.2)
* [WebAIM - "Skip Navigiation" Links](https://webaim.org/techniques/skipnav/)
* [W3C Recommendation - User interaction](https://www.w3.org/TR/html5/editing.html#focus-management)
* [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/)
* [WAI-ARIA Authoring Best Practices 1.1 - Radio Group](https://www.w3.org/TR/wai-aria-practices-1.1/#radiobutton)
* [WAI-ARIA Authoring Best Practices 1.1 - Design Patterns and Widges](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
* [MDN - DocumentOrShadowRoot.activeElement](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/activeElement)
* [MDN - tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
* [MDN - The HTML <dialog> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
* [Article -
Removing Headaches from Focus Management](https://developers.google.com/web/updates/2016/03/focus-start-point?hl=en)

## Accessibility Overview
Good accessibility or "a11y" is crucial to making sure all users can access the content in your sites and applications. We often shorten the word "**accessibility**" to "**a11y**" because there's 11 letters between the "A" and "Y" in the word "Accessibility". Making sure you consider accessibility at the start of your process will ensure that your final product is more polished and works for more people.
When we say a site to be accessible, we're saying that the site's content to be available to everyone  and functionality can be operated by anyone. This includes users who are experiencing some type of impairment or disability and it makes absolutely no difference whether that impairment is situational, temporary or permanent. Accessibility is really about making sure that the content and the websites we create is usable to people with various impairments or abilities. Addressing accessibility issues very often improves the user experience for everyone.

Some statistics on disability for the US:
* Around 2% of the population has some kind of vision disability.
* Around 50% of the population has some kind of clinically significant refractive error.
* Around 8% of males and 0.5% of females have some form of color vision deficiency.
* Around 2% of adults have a hearing disability.
* Over 4% have a cognitive disability.

Modern web technologies make it very easy for a developer to create a website that's difficult for someone who is blind to use. If a user has no vision, it's quite likely they would be using a **screen reader**, which is a software that allows them to hear the information displayed on the screen via a text to speech synthesizer. They may also be using **Braille** which allows them to feel the on-screen text with their fingers when using braille display.
Many websites are visual in their nature and lack **keyboard navigation** which is essential for blind people to be able to navigate through the content. In general, it is safe to assume that there are more people with visual impairments, that is people who have some sight, as opposed to people who are completely blind. There are also people with low visual acuity. And they may be using **large print text or magnification** when using the computer. Other people might have poor color vision who may have difficulty distinguishing red and green or blue and yellow account for 9% of male and 1% of female.

We may also find ourselves with **temporary challenges**, such as when trying to use a computer in the sun or looking at a dodgy projector.
Whenever accessibility comes up in a conversation, people tend to picture someone who is blind but there are actually more impairments to think about and consider. There is a huge number of people with **motor or dexterity impairments**. Such users may be using only the keyboard, head or eye tracking software, switches, voice dictation etc. By catering to users with permanent dexterity impairments, we ensure a great experience for everyone.

There are also users with **hearing impairments**. For example, some may be completely deaf, yet others have some hearing. The content that uses sound should provide some kind of visual alternative. For example, a messenger app could be using a flashing alert as well as sound notifications.

There are also users with **cognitive impairments**, for example ADD, dyslexia or autism. These users may require diverse accommodations, such as zooming the screen to make it easier to read the content, or minimal design to minimize distraction and cognitive load.

Experienced screen reader users have it speaking really fast. As a beginning user you tend to listen at much lower speeds. But as you gain efficiency with the screen reader, you will find that making it speak faster improves efficiency when browsing content on websites. ChromeVox Lite, is a minimal version of ChromeVox but functioning screen reader written in JavaScript.

The **WCAG or Web Content Accessibility Guidelines 2.0** is a set of guidelines and best practices which have been put together by accessibility experts to try and answer the question of what accessibility means in a methodical way. Several countries actually mandate the use of these guidelines in their web accessibility legal requirements. WCAG is organized around **four core principles**, together it forms **POUR**.
* Make the content **perceivable** for all users. Just because something is perceivable with one sense such as sight, that doesn't mean that all users can perceive it.
* Make the content **operable** so all users can use UI components and navigate the content. For example, something which requires a hover interaction cannot be operated by someone who can't use a mouse or is using a touchscreen.
* Is the content **understandable**? Can all users understand the interface and is it consistent enough to avoid confusion?
* Is it **robust** enough for the content to be consumed by a wide variety of user agents? Does it work with assistive technology?

While WCAG provides an extremely comprehensive set of guidelines to help us keep many facets of accessibility in mind, it can also be a bit overwhelming. To help mitigate this, the WebAIM Group has distilled the WCAG guidelines down into an easy to follow checklist, targeted specifically for web content. The **WebAIM checklist** can give you a short high level summary of what you need to implement while also linking to the underlying or tag specifications if you need an expanded definition.
Both WCAG and the checklist cover a lot of the accessibility space. The guidelines can only ever be a limited proxy for actual accessibility, what actually matters is the user experience. So while these guidelines give us a framework for thinking about accessibility, there may be places where they're incomplete or even give advice which is a little out of date. However, they're still an excellent resource for helping us integrate accessibility into our process. With these tools in hand we can chart a direction for our accessibility work, be confident that so long as our project is meeting the outlined criteria, our users should have a positive experience.

## Focus
Focus refers to the control on the computer screen that receives input from the keyboard and from the clipboard when you paste. Most are probably familiar with focus for text fields. In order to type in a text field you first have to go over with your mouse and **click** on it. That act of clicking on the text field, that's actually what focuses it. Some users drive the computer entirely with the keyboard or some other type of discrete input device. For those users, focus is absolutely critical. It's their primary means of reaching everything on the screen. And so for that reason the Web AIM checklist states in section 2.1.1, that all page functionality should be available using the keyboard, unless it's something you couldn't normally do with a keyboard like free hand drawing. The work that we do today on focus is actually an important primer for supporting assistive technology users.

Focus determines where keyboard events go in the page. The currently focused item is often indicated by a **focus ring**, where the actual styling of that ring depends on the browser and any additional styling that the page author may have applied. As a user, you can control which element is currently focused using your keyboard. Move focus around the page using your keyboard:

* **TAB** move focus forward.
* **SHIFT - TAB** move focus backwards.
* **Arrow keys** move focus within a component.

On macOS, this works a little differently. While Chrome will always let you navigate with Tab, you'll need to press Option+Tab in order to change focus in other browsers like Safari. If you like, you can change this. When pressing the Tab key, the browser is going to navigate through all of the focusable elements on the page. This ordering is called the **tab order**. Built-in interactive HTML elements like input, button, and select are all **implicitly focusable**. Meaning that they're automatically inserted in the tab order and that they also have built-in keyboard event handling. Not all elements are focusable. There's generally no need to focus something if a user can't interact with it or provide it some sort of input.

Working with native elements is great for focus behavior, because they're automatically inserted into the tab order based on their position in the DOM. The tab order corresponds to the **DOM order**. Now it's important to note that using something like CSS, it's possible to have things appear in one order on screen, but actually exist in a different order over in the DOM. So even though the visual order can change, the DOM order remains the same. Be careful when you're using something like CSS to visually change the position of your elements on screen. This can cause the tab order to jump around seemingly at random and for users relying on a keyboard this can be extremely confusing. For this reason the WebAIM checklist specifically states in section 1.3.2 that the reading and navigation order as determined by code order should be logical and intuitive in your application.

Because newly added elements are automatically inserted in the tab order, they can be very convenient to use. But there are instances when you'll want to modify the tab order. Like if you're building a component without a native analog, or if you need to have something off screen that should only be focusable when it appears, like perhaps a modal window. For these cases, you can use the **tabindex** attribute. Tabindex can be applied to any HTML element, and it takes a range of numeric values.

A tabindex of -1 means that the element will not be in the tab order, but it can be programmatically focused via JavaScript, by calling the element's **focus()** method. This can be especially useful for off screen content which appears on screen in response to a user event. When the new content is displayed, you may wish to call its focus() method which will then direct future keyboard events to it.

A tabindex of 0 will add the element to the natural tab order, plus that element will also be focusable  by calling its focus() method.

A tabindex of greater than zero, for instance something like tab index of 5 will jump the element to the front of the tab order regardless of where it is in the DOM. If there are multiple elements with a tabindex greater than zero, the order will start from the lowest value that is greater than zero and then work its way up. In general, using a tabindex greater than zero is discouraged and considered a bit of an anti-pattern. If you get in the habit of using it, you can quickly end up with a very jumbled tab order, and it can make things especially confusing for screen reader users who navigate the DOM in a linear fashion.

Ideally, if you need to put something earlier in the tab order, it's best to move it up in the DOM.

When you're starting to look at screen reader accessibility, it's tempting to add tab index to seemingly important elements like headers, in order to help out the user. That's actually counterproductive.
Normally, you only want to add focus behavior to **interactive controls** like buttons, tabs, drop downs, header links or anything that the user might provide input to.
If you're worried about visually impaired users missing out on your content, don't be.
So when you're adding a tab index attribute, stop and ask yourself, is this something the user is going to interact with? If the answer is no, you almost certainly want to leave it alone with a few exceptions.

You shouldn't add tab index to site content as a general rule but there is one exception to this and that's when you're manipulating the page, in response to a **user action**.
A scenario might be that a user goes and clicks on one of the menu items. The page then does an animated scroll down to that particular section. Or, if you are building a single page web app, clicking on one of the navigation links changes the content of the page without doing a full page refresh.
In either of these situations, you'll want to pick an appropriate header, give a tab index of negative one so it doesn't appear in the natural tab order and call its focus() method after the user has taken their action.
This process is known as **Managing Focus** and it's an extremely important technique that keeps the user's interactive context in sync with the visual representation of the site.
You should never remove the focus indicator from an interactive element unless you're going to replace it with something else. Otherwise a keyboard user might have no idea which element is currently focused!

On most websites the main content is usually not the first thing in the DOM. Instead we often begin with navigation, sublists, side bars, hamburger menus, and other bits of page scaffolding.
This means that keyboard and screen reader users must first navigate through all of this content before they can get at the actual heart of the page.
For users with motor impairments this is especially frustrating. Thankfully, there's an easy to implement solution.
Create a hidden link that allows keyboard and switch device users the ability to jump straight to our page content.
These links are often referred to as **skip links** and implementing them is actually really easy.

Managing focus when you navigate on the page is really important but sometimes you'll need to manage focus at the **component level** as well, especially if you're building a complex custom widget.
Knowing which keyboard behaviors to implement can be a bit of a guessing game but, thankfully there's a really helpful guide which you can refer to.
The **ARIA Authoring Practices doc (or "ARIA Design Patterns doc")** is a great resource for figuring out what kind of keyboard support your complex components should implement. It lists various kinds of components as well as the sorts of keyboard interactions that they support.

Check the Aria Design Patterns guide to determine what kind of keyboard support a component (for example radio group) needs.
Find the section which lists  all of the various components and their patterns. Look for a component that sort of matches the one you're building.
Based on the recommendations there are a number of keyboard handlers that needs to be implemented.

For building complex components **roving focus** is a really invaluable technique.

What do you do when you have content which isn't on screen yet, but still needs to be in the DOM?
A good example of this isa responsive drawer panel.
Now this is a really common UI pattern and it can present an interesting challenge for accessibility.
When you're building an application you might occasionally find that as you're tabbing around focus seems to suddenly just disappear.
Go into your console and log the documents activeElement, it gives you a reference to the currently focused item.
But another great option is to use the **Chrome Accessibility Developer Tools extension**.
This extension adds a number of useful features, including an inspector which will show you the accessibility properties of an element, as well as a set of accessibility audits.
You can find these by opening the Developer Tools and going to the Audits section.

Sometimes when you're working on managing focus, it can be possible to get a little carried away.
A **keyboard trap** is when keyboard focus is locked or trapped at one particular page element. This can be very frustrating for users.
In fact, Section 2.1.2 of the WebAIM checklist specifically calls this out. Stating, the keyboard focus should never be locked or trapped at any one particular page element.
The user should be able to navigate to and from all page elements using just their keyboard.
But strange as it may seem, there are times when this behavior is actually desirable.
Take for instance, the modal window, when it is displaying on screen, we don't want the user to be able to access any of the content behind it.
Oftentimes developers will add an overlay to cover the page, but that doesn't stop keyboard focus from accidentally traveling outside of the model.
In such instances we want to use a **temporary keyboard trap** to ensure that we track focus within the modal wall it's displaying.
And then that we can restore it to the previously focused item once the model is closed.
The **accessible model window** can be tricky element to implement.
