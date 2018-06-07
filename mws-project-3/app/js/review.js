// Declare global variables.
let restaurant;

// Declare the id elements.
const elementBreadcrumb = document.getElementById('breadcrumb');
const elementReviewForm = document.getElementById('review-form');
const elementInputRestaurantId = document.getElementById('inputRestaurantId');
const elementInputName = document.getElementById('inputName');
const elementInputRestaurantRating = 
  document.getElementById('inputRestaurantRating');
const elementInputComments = document.getElementById('inputComments');

// POST the review.
elementReviewForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
  let reviewFormData = new FormData();
  reviewFormData.append('restaurant_id', elementInputRestaurantId.value);
  reviewFormData.append('name', elementInputName.value);
  reviewFormData.append('rating', elementInputRestaurantRating.value);
  reviewFormData.append('comments', elementInputComments.value);
  createReviewNetworkFirst(reviewFormData);
  // alert('Success!');
});

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
  // Prepopulate restaurant ID in the form.
  // elementInputRestaurantId.setAttribute('placeholder', id);
  elementInputRestaurantId.setAttribute('value', id);
  // Get restaurant details to create the breadcrumb.
  getRestaurantInfoNetworkFirst(id);
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
      DBHelper.messageOffline();
      self.restaurant = offlineData;
      createBreadcrumb();
    }).catch(err => {
      DBHelper.messageNoData();
      console.warn(err);
    });
  });
}

/**
 * Add a review for a restaurant by its ID, save data locally to IndexedDB,
 * send to API server, update UI.
 * POST: http://localhost:1337/reviews/
 * Parameters: "restaurant_id", "name", "rating", "comments"
 * 
 * TODO: all logic needs to be reviewed when we implement Background Sync.
 * When we now go offline / online again, data will be duplicated in IDB.
 */
const createReviewNetworkFirst = (review) => {
  const endpointPostReview =
    `http://localhost:1337/reviews/`;
  // FormData cannot be cloned so we create our object for IndexedDB.
  const data = {
    // review is a FormData object.
    restaurant_id: parseInt(review.get('restaurant_id')),
    name: review.get('name'),
    rating: review.get('rating'),
    comments: review.get('comments')
  };
  // POST the review to the API server.
  DBHelper.postRequest(endpointPostReview, review)
  .then(dataFromNetwork => {
    // console.log(dataFromNetwork)
  }).catch(err => {
    console.log('[DEBUG] Network requests have failed, this is expected if offline');
  });
  // Alternative POST.
  // const headers = new Headers({'Content-Type': 'application/json'});
  // const body = JSON.stringify(data);
  // return fetch(endpointPostReview, {
  //   method: 'POST',
  //   headers: headers,
  //   body: body
  // });
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

