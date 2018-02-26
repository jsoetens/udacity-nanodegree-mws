# Web Accessibility

## Table of Contents
* [Links](#links)
* [Accessibility Overview](#accessibility-overview)

## Links
* [Udacity Course - Web Accessibility](https://www.udacity.com/course/web-accessibility--ud891)
* [Web Content Accessibility Guidelines 2.0 (WCAG)](https://www.w3.org/TR/WCAG20/)
* [WebAIM's WCAG 2.0 Checklist](https://webaim.org/standards/wcag/checklist)
* [ChromeVox](http://www.chromevox.com/)

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
