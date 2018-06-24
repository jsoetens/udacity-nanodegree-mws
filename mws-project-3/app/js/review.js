/**
 * Material Design
 */
import {MDCRipple} from '@material/ripple';
import {MDCTextField} from '@material/textfield';
import {MDCSelect} from '@material/select';

// Declare global variables.
let restaurant;

// Declare the id elements.
const elementBreadcrumb = document.getElementById('breadcrumb');
const elementReviewForm = document.getElementById('review-form');
const elementRestaurantIdInput = document.getElementById('restaurant-id-input');
const elementRestaurantIdLabel = document.getElementById('restaurant-id-label');
// const elementNameInput = document.getElementById('name-input');
// const elementRestaurantRatingSelect = 
//   document.getElementById('restaurant-rating-select');
// const elementCommentsInput = document.getElementById('comments-input');

/**
 * Material Design
 */
const classRestaurantIdInput = 
  new MDCTextField(document.querySelector('.restaurant-id-input'));
const classNameInput = 
  new MDCTextField(document.querySelector('.name-input'));
const classRestaurantRatingSelect = 
  new MDCSelect(document.querySelector('.restaurant-rating-select'));
const classCommentsInput = 
  new MDCTextField(document.querySelector('.comments-input'));

new MDCRipple(document.querySelector('.cancel'));
new MDCRipple(document.querySelector('.next'));

/**
 * Start the following when the initial HTML document has been
 * completely loaded and parsed, without waiting for stylesheets, images,
 * and subframes to finish loading.
 * Fetch neighborhoods and cuisines.
 * https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', (event) => {
  // Get restaurant id by using url parameter on current page.
  const id = getParameterByName('id');
  // Pre-fill restaurant ID in the form.
  // Render mdc-text-field with the mdc-floating-label--float-above modifier
  // class. This will ensure that the label moves out of the way of the text
  // field’s value and prevents a Flash Of Un-styled Content (FOUC).
  elementRestaurantIdInput.setAttribute('value', id);
  elementRestaurantIdLabel.classList.add('mdc-floating-label--float-above');
  // Get restaurant details to create the breadcrumb.
  getRestaurantInfoNetworkFirst(id);
});

// Cancel the form and go back to restaurant info page.
const cancelReview = () => {
  // Redirect back to restaurant info page.
  window.location = `index.html`;
}
// webpack: make sure some variables, functions are exposed to global scope.
window.cancelReview = cancelReview;

// POST the review.
elementReviewForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
  let reviewFormData = new FormData(elementReviewForm);
  createReviewNetworkFirst(reviewFormData);
});

/**
 * Fetch some restaurant info by its ID from network and fallback to IndexedDB,
 * update UI.
 */
const getRestaurantInfoNetworkFirst = (id) => {
  const endpointRestaurantById = `http://localhost:1337/restaurants/${id}`;
  DBHelper.getServerData(endpointRestaurantById)
  .then(dataFromNetwork => {
    self.restaurant = dataFromNetwork;
    createBreadcrumb();
  }).catch(err => {
    console.log('[DEBUG] Network requests have failed, this is expected if offline');
    getLocalRestaurantByIdData(id)
    .then(offlineData => {
      // DBHelper.messageOffline();
      self.restaurant = offlineData;
      createBreadcrumb();
    }).catch(err => {
      // DBHelper.messageNoData();
      console.warn(err);
    });
  });
}

/**
 * Add a review for a restaurant by its ID, save data locally to IndexedDB,
 * send to API server, update UI.
 * POST: http://localhost:1337/reviews/
 * Parameters: "restaurant_id", "name", "rating", "comments"
 */
const createReviewNetworkFirst = (reviewFormData) => {
  const endpointPostReview =
    `http://localhost:1337/reviews/`;
  const data = {
    restaurant_id: parseInt(reviewFormData.get('restaurant_id')),
    name: reviewFormData.get('name'),
    // Rating is a select element which returns text and we prefer a number.
    rating: parseInt(reviewFormData.get('rating')),
    comments: reviewFormData.get('comments')
  };
  console.log(data);
  // POST the review to the API server.
  DBHelper.postRequest(endpointPostReview, data)
  .then(dataFromNetwork => {
    // TODO: replace alert with Push Notifications.
    alert('Your review has been submitted successfully!');
    // alert('Your review has been submitted.');
    // Redirect back to restaurant info page.
    window.location = `restaurant.html?id=${elementRestaurantIdInput.value}`;
  }).catch(err => {
    console.log('[DEBUG] Network requests have failed, this is expected if offline');
    // Background sync should show a notification.
    // Redirect back to restaurant info page.
    window.location = `restaurant.html?id=${elementRestaurantIdInput.value}`;
  });
}  

/**
 * Add restaurant name to the breadcrumb navigation menu.
 */
const createBreadcrumb = (restaurant=self.restaurant) => {
  const li = document.createElement('li');
  li.className = 'breadcrumb';
  li.innerHTML = restaurant.name;
  // a11y - indicate current page
  // https://www.w3.org/TR/wai-aria-practices/examples/breadcrumb/index.html -->
  li.setAttribute('aria-current', 'page');
  elementBreadcrumb.appendChild(li);
}

/**
 * Get an URL parameter by name from page URL.
 */
const getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
