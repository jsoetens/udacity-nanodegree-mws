# Web Accessibility

## Table of Contents
* [Links](#links)
* [Accessibility Overview](#accessibility-overview)
* [Focus](#focus)
* [Semantics Basics](#semantics-basics)
* [Navigating Content](#navigating-content)

## Links
* [Udacity Course - Web Accessibility](https://www.udacity.com/course/web-accessibility--ud891)
* [Udacity GitHub Repository - Web Accessibility](https://github.com/udacity/ud891)
* [ChromeVox](http://www.chromevox.com/)
* [Chrome Extension - Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en)
* [Chrome Extension - Accessibility Developer Tools](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb?hl=en)
* [Web Content Accessibility Guidelines 2.0 (WCAG)](https://www.w3.org/TR/WCAG20/)
* [WebAIM's WCAG 2.0 Checklist](https://webaim.org/standards/wcag/checklist)
* [WebAIMs Checklist 1.3.1 - Info and Relationships](https://webaim.org/standards/wcag/checklist#sc1.3.1)
* [WebAIMs Checklist 1.3.2 - Meaningful Sequence](https://webaim.org/standards/wcag/checklist#sc1.3.2)
* [WebAIMs Checklist 2.1.1 - Keyboard](https://webaim.org/standards/wcag/checklist#sc2.1.1)
* [WebAIMs Checklist 2.1.2 - No Keyboard Trap](https://webaim.org/standards/wcag/checklist#sc2.1.2)
* [WebAIMs Checklist 2.4.1 - Bypass Blocks](https://webaim.org/standards/wcag/checklist#sc2.4.1)
* [WebAIMs Checklist 2.4.6 - Headings and Labels](https://webaim.org/standards/wcag/checklist#sc2.4.6)
* [WebAIMs Checklist 2.4.9 - Link Purpose](https://webaim.org/standards/wcag/checklist#sc2.4.9)
* [WebAIMs Checklist 2.4.10 - Section Headings](https://webaim.org/standards/wcag/checklist#sc2.4.10)
* [WebAIM's WCAG 2.0 Guideline 1.1 - Text Alternatives](https://webaim.org/standards/wcag/checklist#g1.1)
* [WebAIM - "Skip Navigiation" Links](https://webaim.org/techniques/skipnav/)
* [WebAIM - Alternative Text](https://webaim.org/techniques/alttext/)
* [WebAIM - Keyboard Accessibility](https://webaim.org/techniques/keyboard/accesskey)
* [WebAIM - Using VoiceOver to Evaluate Web Accessibility](https://webaim.org/articles/voiceover/)
* [WebAIM - Using NVDA to Evaluate Web Accessibility](https://webaim.org/articles/nvda/)
* [NVDA - NonVisual Desktop Access](https://www.nvaccess.org/)
* [Orca Screen Reader](https://help.gnome.org/users/orca/stable/)
* [W3C Recommendation - User interaction](https://www.w3.org/TR/html5/editing.html#focus-management)
* [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/)
* [WAI-ARIA Authoring Best Practices 1.1 - Radio Group](https://www.w3.org/TR/wai-aria-practices-1.1/#radiobutton)
* [WAI-ARIA Authoring Best Practices 1.1 - Design Patterns and Widges](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
* [MDN - DocumentOrShadowRoot.activeElement](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/activeElement)
* [MDN - tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
* [MDN - The HTML dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
* [MDN - The HTML label element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
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

## Semantics Basics
How do we build our websites to support users who can't see the screen at all?
**Assistive technology** are tools that are designed to help users whose impairments can prevent them from accessing information technology at all.
Assistive technology is an umbrella term for a broad range of devices, software and tools that help any person with a disability complete a task.
And assistive technology in particular is pretty blurry.
After all, all technologies are being built to assist people with some task or another, and things often move in and out of the assistive technology category.
On the other hand, technology which is general purpose often finds an assistive use.
In the context of web development we're still talking about a diverse range of technologies that we want to support.
People may interact with your website using a screen reader or braille display with a screen magnifier, via voice control, using a switch device, or some other form of assistive technology which adapts the page to create a more specific interface that they can use.
For all of these technologies, ensuring that our website support assistive technology uses is going to come down to **programmatically expressed semantics**.

When we use any manmade tool or device, we typically look to its form and design to give us an idea of what it does and how it works.
The fact that we've seen many similar things before gives us a visual clue.
When it comes to graphical user interfaces, **affordances** still represent the actions we can take.
But now they're more metaphorical since there's no physical object to interact with.
Some classic examples of technology affordances are buttons, you will be hard pressed to find any software UI without at least one button on it.
Think about how real world objects get translated into purely visual metaphors to create those affordance cues for graphical user interfaces.
For example, you can clearly see a button on a keyboard reflected in a button element and a checkbox on a ballot paper in a checkbox element.
While some graphical UI influences may not be immediately obvious to new users, people generally learn the visual cues quickly with little or no training.
Well designed affordances enable people to do something with as little training as possible.

Information needs to be expressed in a way which is flexible enough to be accessed programmatically by assistive technology. Which can then create an alternative user interface to suit its users needs.
We refer to this as expressing the **semantics of an element**.
The Web AIM WCAG 2.0 checklist explicitly calls this out in guideline 4.1.2, saying name, role, value, markup is used in a way that facilitates accessibility.
The Web Content Accessibility Guidelines go into a bit more detail. For all user interface components, the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set.
A lot of the work we do to support screen readers also benefits users who use other assistive technologies.
Things like voice control and switch control use the same programmatically expressed semantics.

A screen reader actually largely creates the user interface for the user, based on the programatically expressed semantics.
Instead of a visual UI, a screen reader provides an auditory interface.
Roughly speaking, we can expect some subset of the following information to be expressed. What type of element it is? We call this an **elements role**.
Sometimes a screen reader might simply state the element's role. Other times it might play an easily recognizable sound to avoid constant repetition. Sometimes it might do both. The screen reader will announce an elements name, if it has one. It will announce what its value is, if it has one. And it will also announce any information it has about an element's state.
If we've done things right, we can expect to hear information about **an element's role, name, state, and value**.

If you're building a user interface for screen reading users only, you don't need to create
any visual UI at all. Just provide enough information for the screen reader to use.
For a screen reader user, the screen reader provides the affordances based on the role alone without caring about the visual style. This is more or less what the browser actually presents to the screen reader. The browser takes the DOM tree and modifies it to turn it into a form which is useful to assistive technology.
We refer to this modified tree as the **accessibility tree**. It conceptually looks a bit like an HTML page from the 90s.

The browser can transform the DOM tree into the a11y tree because much of the DOM has **implicit semantic meaning**. The DOM is using standard native HTML elements that are automatically recognized by browsers and work predictably on a variety of platforms.
A11y for native HTML elements such as the standard link or button, is handled automatically as well.
We can take advantage of that built in a11y by writing HTML which expresses the semantics of our page directly.

Screen readers will announce an element's role, name, state and value but not necessarily in that order. By using the right semantic element, we've got role, state and value covered, but we also need to make sure that we're making the elements name discoverable.
This is actually the very first item on WebAIMSs checklist, provide **text alternatives** for any non-text content.
There are two types of labels. **Visible labels**, which are used by all users to associate meaning with an element, and **text alternatives** which are only used when there's no need for visual labels. By its very nature a text alternative is usually not visible on the page.
The checklist provides a list of recommendations for how to create visible and non-visible labels.
The easiest is that form buttons have a descriptive value. A button typically has some text content and that acts as the button's text alternative.
Next is that form inputs have associated text labels. When we create a form input like a check box and just put some text next to it, we get a visual label, but we don't actually create a programmatically accessible label for the element we're trying to label. Also, we don't get the nice behavior where we can click on the label to total the check box.
We can fix this by using a **label element**. We can either wrap the input element or we can use the for attribute on the label. If we do that we need to make sure to give the input element an id and use the same id as the value of the for attribute. That creates an association between the label element and the input element.
Whichever of these two methods we use, we will get an accessible label for the check box, and we'll be able to total the check box by clicking the label.

We can use the alt attribute to provide a **text alternative for images**. However, we need to think about what role an image plays in the page to work out what type of text alternative it should have.
The **alt attribute** allows you to specify a simple string to be used whenever an image is not available, whether the image fails to load or you're a web crawling bot or a screen reader user. alt differs from any other type of caption, including a title, in that it will only be used if the image isn’t available. Caption or title typically provides extra contexts for the image, rather than an alternative to the image.
Writing useful alt text is a bit of an art. In order for a string to be a usable text alternative it needs to convey the same thing as the image in the given context.
An easy way to check whether your alt text is sensible is to imagine all your
images are broken. Can you still understand the page content?
Empty alt text actually removes images from the accessibility tree so they'll be skipped by the screen reader.
All images should have an alt attribute. Important images should have descriptive alt text that just describes what the image is. Decorative images should have blank alt text. The screen reader will skip that element completely. You want to include blank text because if you don't the screen reader may try to read the filename.

## Navigating Content
Writing semantic HTML already gives a lot of a11y out of the box.
Many people, when they start learning about screen readers, assume that it's so difficult and tedious to use. To compensate for their assumption, they tend to do things like making every element on the web page focusable so that a screen reader user has an easier time getting to them.
**VoiceOver** is a speech software that allows people who are blind or vision impaired to read information on the screen. It is built into Apple's macOS.
Screen readers provide a lot of shortcut keys, and one of those shortcut keys is a way to spell a specific word or even a sentence, letter by letter.

It's important to remember, that once you made the functionality of your web page accessible and usable for users of assistive technology, headings are probably one of the most important features you can build into your web pages, to make them more usable for screen reader users.

DOM order matters, which is also item 1.3.2 on the WebAIMs checklist. **Meaningful Sequence** states that the reading and navigation order (determined by code order) is logical and intuitive.
It matters for focus order, but it also matters for the order read by the screen reader.
Since the screen reader, like any assistive technology, is interacting with the accessibility tree, which is based directly on the DOM tree, the order a screen reader is going to perceive will be directly based on the DOM order.
Think of the page as perceived by desktop screen reader users at almost losing its second dimension. It's all serialized into a single stream of content. You can use a JavaScript snippet to list out the headings in the console.

Using headings to lay out page structures is mentioned in several WebAIMs checklist items.
**Section Headings** states that beyond providing an overall document structure, individual sections of content are designated using headings, where appropriate.
**Info and Relationships** states that semantic markup is used to designate headings, lists, emphasized or special text, etc.
**Bypass Blocks** states that if a page has a proper heading structure, this may be considered a sufficient technique instead of a "Skip to main content" link.

You can use techniques where some headings are placed off screen to make them visible only to screen reader users and other assistive technology.
For complex applications, this can be a good way to accommodate headings when the visual design doesn't require or even have room for a visible heading.
However, it's important not to go overboard with this technique.
Remember that assistive technology users may well be able to see the screen.
So going too far down the path of creating screen reader only content can actually create a worse user experience for some users.
It can also create a maintenance headache when it comes to things like internationalization.

It's also important that you don't fall into the trap of using heading tags just to achieve a particular look on the page.
Headings are used to improve the experience for screen reader users but there are other things you can use to navigate web pages.
VoiceOver and other screen readers, for example, allow to navigate by links, by form controls and landmarks.

VoiceOver can get you a list of links on a page, and even search through them.
This feature is obviously most useful if, firstly, the screen reader can find the links. Secondly, if the actual text of the links is meaningful.
There are three common link anti-patterns which can cause the screen reader to miss links in the page.
One is using a span with some link styling or an anchor tag without an href attribute.
For anything which behaves like a link, including within a single page application, you should absolutely use an anchor tag with an href attribute, no exceptions.
Not only will this make the link show up in the links list, but it will mean it automatically works with the keyboard and that you can do things like copy or bookmark the link location.
The second pattern is the opposite problem,
something which is implemented using a link but is really more like a button.
You can often recognize this by the href attribute being something nonsensical.
The third example is where we have an image used as link content. We can fix that by using our usual alt text technique to make sure the link is experienced directly to the assistive technology layout.
We also need to make sure that once the link makes it into the links list, that it's also useful. We do that by making sure its text is descriptive.
The checklist has a stronger and weaker version of this point. The stronger one, item 2.4.9 states that the purpose of each link should be determined from the link text alone.
In general, link text should give any user enough information to decide whether they want to click it. One common example of uninformative link text we see a lot these days is "learn more".
We can make it more useful by rewriting the text to say it something like "learn more about responsive layouts" or even making the paragraph heading as the link.

HTML5 introduced some new **semantic elements** which helps assistive technology understand how elements relate to one another.  
* *main* represents the main content of a page, typically there should only be one main element.
* *header* is either a page banner or else a grouping element for any introductory content at the start of any type of section. Using semantic elements allows us to express the same information while also potentially providing more information for screening ready users.
* *footer* may be either a page footer and contain information about the page or site. Or maybe a footer to a particular section of a page with extra information about that section.
* *nav* represents a section of a page that links to other pages like the top nav bar or to parts within the page like a table of contents.
* *article* is for self-contained sections of content like a blog entry, news article or forum post. A handy test for an article is whether its content would make sense in another context such as cross-posting a blog post to several different blogs.
* *section* is a completely generic section of a document or application. Since it doesn't really give much of a clue as to what its content might be, we typically include a heading inside as well.
* *aside* can be used for groups of nav elements and for other content that is considered separate from the main content of the page. It will often be rendered as a sidebar.

Make sure to use meaningful headings and link text as well as good page structure.
Secondly, as a general rule, you shouldn't try to control the experience a screen reader user will have.
They will use the information available to them plus the tool they're using to find that information on the web page.
Things such as trying to control or fine-tune exactly what a screen reader says, or make an element focusable which shouldn't be, generally lead to more confusion and worse experience for users.
