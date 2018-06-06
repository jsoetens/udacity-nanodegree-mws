# Building High Conversion Web Forms

## Table of Contents

* [Links](#links)
* [Forms](#forms)

## Links

* [Udacity Course - Building High Conversion Web Forms](https://www.udacity.com/course/building-high-conversion-web-forms--ud890)
* [Google Developers - Create Amazing Forms](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/)
* [Google Developers - Add Touch to Your Site](https://developers.google.com/web/fundamentals/design-and-ux/input/touch/)
* [Google Developers - Help users checkout faster with Autofill](https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill?hl=en)
* [Client-Side Form Validation with HTML5](https://www.sitepoint.com/client-side-form-validation-html5/)
* [Web Forms The Right Way](https://www.slideshare.net/greenido/web-forms-the-right-way)
* [MDN - HTML forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms)
* [MDN - Constraint validation](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation)
* [MDN - Form data validation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation)
* [MDN - HTML \<label\> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
* [MDN - HTML \<input\> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
* [MDN - Form \<input\> types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)
* [MDN - input attribute required](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-required)
* [MDN - input attribute placeholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-placeholder)
* [MDN - input attribute autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete)
* [MDN - input attribute autofocus](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autofocus)
* [MDN - HTMLSelectElement.setCustomValidity() method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/setCustomValidity)
* [MDN - Using geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)
* [MDN - EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
* [MDN - Touch events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
* [MDN - Using FormData Objects](https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects)

## Forms

Filling out online forms, especially on mobile devices, can be difficult. To improve the user experience you can use basic HTML5, JavaScript, and the HTML5 Constraint Validation API, to design efficient and secure HTML web forms with:

* Appropriate ​label ​tags associated with inputs.
* Inputs with appropriate ​type​, ​name​ and a​utocomplete​ attributes.
* Inputs with large touch targets for mobile forms.
* Suggestions for user input using the ​datalist​ element.
* Front-end validation of inputs (e.g., ​pattern, maxlength, required​) and DOM elements, including:
    * Checking validation errors in real-time with pseudo-classes on inputs.
    * Form validation prior to submission (Constraint Validation API).
  
```HTML
<form action="#">
    <label for="event-name">
        <span>Enter the name of your event:</span>
        <input type="text" id="event-name" placeholder="Event Name">
    </label>
</form>
```

Some mobile browsers will select text if the user long presses on the screen. This is super useful for copying and pasting, but can be frustrating if a user didn’t intend to select any text.

You can prevent this from happening using this user-select CSS property:
```CSS
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none;
user-select: none;
```