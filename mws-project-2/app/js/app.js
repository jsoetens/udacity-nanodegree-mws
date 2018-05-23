/**
 * TODO: Add to Home Screen (aka Web App Install Banners)
 * trigger the Add to Home Screen prompt by using the beforeinstallprompt event.
 * https://developers.google.com/web/fundamentals/app-install-banners/
 */

// Declare global variables.
let map;
let neighborhoods;
let cuisines;
let restaurants;
let markers = [];

// Declare the id elements.
const elementGoogleMap = document.getElementById('map');
const elementNeighborhoodsSelect = document.getElementById('neighborhoods-select');
const elementCuisinesSelect = document.getElementById('cuisines-select');
const elementRestaurantsList = document.getElementById('restaurants-list');


/**
 * Start the following when the initial HTML document has been
 * completely loaded and parsed, without waiting for stylesheets, images,
 * and subframes to finish loading.
 * Fetch neighborhoods and cuisines.
 * https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', (event) => {
  fetchNeighborhoods();
  fetchCuisines();
});


/**
 * Fetch all neighborhoods and update UI.
 */
const fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods()
  .then(neighborhoods => {
    self.neighborhoods = neighborhoods;
    updateNeighborhoodsUI();
  })
  // Error handling is done in DBHelper.fetchNeighborhoods
}

/**
 * Update the neighborhoods select.
 */
const updateNeighborhoodsUI = (neighborhoods = self.neighborhoods) => {
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    elementNeighborhoodsSelect.appendChild(option);
  });
}

/**
 * Fetch all cuisines and update UI.
 */
const fetchCuisines = () => {
  DBHelper.fetchCuisines()
  .then(cuisines => {
    self.cuisines = cuisines;
    updateCuisinesUI();
  })
  // Error handling is done in DBHelper.fetchNeighborhoods
}

/**
 * Update the cuisines select.
 */
const updateCuisinesUI = (cuisines = self.cuisines) => {
  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    elementCuisinesSelect.appendChild(option);
  });
}

/**
 * Update ul restaurants-list and markers on map for current restaurants.
 */
const refreshRestaurants = () => {
  const neighborhoodIndex = elementNeighborhoodsSelect.selectedIndex;
  const cuisineIndex = elementCuisinesSelect.selectedIndex;
  const neighborhood = elementNeighborhoodsSelect[neighborhoodIndex].value;
  const cuisine = elementCuisinesSelect[cuisineIndex].value;
  DBHelper.fetchRestaurantByNeighborhoodAndCuisine(neighborhood, cuisine)
  .then(restaurants => {
    resetRestaurantsUI(restaurants);
    updateRestaurantsUI();
  });
}

/**
 * Clear ul restaurants-list and markers on map for current restaurants.
 */
const resetRestaurantsUI = (restaurants) => {
  self.restaurants = [];
  elementRestaurantsList.innerHTML = '';
  markers.forEach(m => m.setMap(null));
  markers = [];
  self.restaurants = restaurants;
}

/**
 * Create ul restaurants-list and add markers on map for current restaurants.
 */
const updateRestaurantsUI = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    elementRestaurantsList.appendChild(addRestaurantCardUI(restaurant));
  });
  addMarkersToMapUI();
}

/**
 * Create a restaurant card in a li element.
 */
const addRestaurantCardUI = (restaurant) => {
  const li = document.createElement('li');
  li.className = 'restaurant-card';

  li.appendChild(createResponsivePicture(restaurant));

  // Create a div with class card-primary that contains h2, h3.
  const divCardPrimary = document.createElement('div');
  divCardPrimary.className = 'card-primary';
  const name = document.createElement('h2');
  name.className = 'card-title';
  name.innerHTML = restaurant.name;
  divCardPrimary.appendChild(name);
  const neighborhood = document.createElement('h3');
  neighborhood.className = 'card-subtitle';
  neighborhood.innerHTML = restaurant.neighborhood;
  divCardPrimary.appendChild(neighborhood);
  li.appendChild(divCardPrimary);

  // Create a div with class card-secondary that contains further content.
  const divCardSecondary = document.createElement('div');
  divCardSecondary.className = 'card-secondary';
  // Use contact address element.
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address
  const address = document.createElement('address');
  address.className = 'card-secondary-content';
  address.innerHTML = restaurant.address;
  divCardSecondary.appendChild(address);
  li.appendChild(divCardSecondary);

  // Create a div with class card-actions.
  const divCardActions = document.createElement('div');
  divCardActions.className = 'card-actions';
  const more = document.createElement('a');
  more.className = 'card-actions-link';
  more.innerHTML = 'View Details';
  more.href = DBHelper.getRestaurantURL(restaurant);
  divCardActions.appendChild(more);
  li.appendChild(divCardActions);

  return li;
}

/**
 * Create a responsive image.
 *
 * Main page
 * 0 to 479px: card has width 100%, so 1 img 100% (455 x 321).
 * 480 to 599px: card has width 100%, so 1 img fullwidth (567 x 425).
 * 600 to 839px: card has width 45%, so 2 img 45% (378 x 283).
 * 840 to 959px: card has width 45%, so 2 img 45% (432 x 324).
 * 960 to 1279px: card has width 30%, so 3 img 30% (384 x 289).
 * 1280px to x: card has width 22.5%, so 4 img 22.5% (minimum 288 x 216).
 *
 * Restaurant Info
 * 0 to 479px: card has width 100%, so 1 img 100% (479 x 359).
 * 480 to 599px: card has width 100%, so 1 img fullwidth (599 x 449).
 * 600 to 839px: card has width 50%, so 1 img 50% (419.5 x 315).
 * 840 to 959px: card has width 50%, so 1 img 50% (479.5 x 360).
 * 960 to 1279px: card has width 50%, so 1 img 50% (639.5 x 480).
 * 1280px to x: card has width 50%, so 1 img 50% (minimum 640 x 480).
 *
 * Image breakpoints have been determined using the Cloudinary generator.
 * http://www.responsivebreakpoints.com/
 * Image widths are 300, 433, 552, 653, 752, 800
 *
 * The srcset attribute gives the browser the option to choose which file
 * to use. However, the browser has no way of determining the file sizes before
 * it loads them, so it always chooses the first image in the list.
 *
 * To load the correct image size based on the viewport width we need to tell
 * the browser how big each file is before it fetches them.
 * By adding a width descriptor to each file in the srcset, we are telling
 * the browser the width of each image in pixels before it fetches the image.
 * The browser can then use these widths to decide which image to fetch based
 * on its window size. It fetches the image with the smallest width that is
 * still larger than the viewport width.
 *
 * Because the CSS is parsed after the HTML at runtime, the browser has no way
 * to know what the final display size of the image will be when it fetches it.
 * Unless we tell it otherwise, the browser assumes the images will be displayed
 * at 100% of the viewport width and fetches the images based on this.
 *
 * The sizes value matches the image's max-width value in the CSS. The browser
 * now has everything it needs to choose the correct image version. The browser
 * knows its own viewport width and the pixel density of the user's device,
 * and we have given it the source files' dimensions (using width descriptor)
 * and the image sizes relative to the viewport (the sizes attribute).
 *
 * The media query tests the viewport width of the screen, and applies the CSS.
 * We can tell the browser about the media query in the sizes attribute so that
 * it fetches the correct image when the image changes size.
 *
 * We can use the <picture> element and the <source> element, in combination
 * with media queries, to change the image source as the window is resized.
 *
 * The <picture> element lets us define multiple source files using the
 * <source> tag. This is different than simply using an <img> tag with the
 * srcset attribute because the source tag lets us add things like media queries
 * to each set of sources. Instead of giving the browser the image sizes and
 * letting it decide which files to use, we can define the images to use at
 * each window size.
 *
 * If the user's browser doesn't support the <picture> element, it fetches
 * whatever is in the <img> element. The <picture> element is just used to
 * specify multiple sources for the <img> element contained in it. The <img>
 * element is what displays the image.
 *
 * Display density descriptors are great for fixed width images, but are
 * insufficient for flexible images.
 */
const createResponsivePicture = (restaurant) => {
  const picture = document.createElement('picture');

  // sizes: the browser ignores everything after the first matching condition.
  const sizes = '(min-width: 80rem) 22.5vw, (min-width: 60rem) 30vw, (min-width: 37.5rem) 45vw, 100vw';

  // srcset
  const srcsetWebP =
    `${DBHelper.getImageUrlForRestaurant(restaurant, 'webp', 300)} 300w,
    ${DBHelper.getImageUrlForRestaurant(restaurant, 'webp', 433)} 433w,
    ${DBHelper.getImageUrlForRestaurant(restaurant, 'webp', 552)} 552w,
    ${DBHelper.getImageUrlForRestaurant(restaurant, 'webp', 653)} 653w,
    ${DBHelper.getImageUrlForRestaurant(restaurant, 'webp', 752)} 752w,
    ${DBHelper.getImageUrlForRestaurant(restaurant, 'webp', 800)} 800w`;

  const srcsetJPEG =
    `${DBHelper.getImageUrlForRestaurant(restaurant, 'jpeg', 300)} 300w,
    ${DBHelper.getImageUrlForRestaurant(restaurant, 'jpeg', 433)} 433w,
    ${DBHelper.getImageUrlForRestaurant(restaurant, 'jpeg', 552)} 552w,
    ${DBHelper.getImageUrlForRestaurant(restaurant, 'jpeg', 653)} 653w,
    ${DBHelper.getImageUrlForRestaurant(restaurant, 'jpeg', 752)} 752w,
    ${DBHelper.getImageUrlForRestaurant(restaurant, 'jpeg', 800)} 800w`;

  const sourceWebP = document.createElement('source');
  sourceWebP.srcset = srcsetWebP;
  sourceWebP.sizes = sizes;
  sourceWebP.type = 'image/webp';
  picture.appendChild(sourceWebP);

  const sourceDefault = document.createElement('source');
  sourceDefault.srcset = srcsetJPEG;
  sourceDefault.sizes = sizes;
  sourceDefault.type = 'image/jpeg';
  picture.appendChild(sourceDefault);

  const defaultImg = document.createElement('img');
  // Get default image which should be width 800.
  const imageSrc = DBHelper.getImageUrlForRestaurant(restaurant, 'jpeg', 800);
  defaultImg.src = imageSrc;

  let altText = DBHelper.getAlternativeText(restaurant.id);
  if (!altText) {
    altText = `Restaurant ${restaurant.name}`;
  }
  defaultImg.alt = altText;
  picture.appendChild(defaultImg);

  return picture;
}

/**
 * Initialize Google map, called from HTML.
 * https://developers.google.com/maps/documentation/javascript/tutorial
 * https://developers.google.com/maps/documentation/javascript/tutorial#Loading_the_Maps_API
 */
window.initMap = () => {
  let loc = {lat: 40.722216, lng: -73.987501};
  // Not using scrollwheel: False anymore, using default gestureHandling: auto
  // https://developers.google.com/maps/documentation/javascript/interaction
  // self.map = new google.maps.Map(elementGoogleMap, {
  map = new google.maps.Map(elementGoogleMap, {
    center: loc,
    zoom: 12
  });
  // a11y - Frames must have non-empty title attribute
  // https://dequeuniversity.com/rules/axe/2.2/frame-title
  // https://developers.google.com/maps/documentation/javascript/events
  let setTitle = () => {
    const iFrameGoogleMaps = document.querySelector('#map iframe');
    iFrameGoogleMaps.setAttribute('title', 'Google Maps overview of restaurants');
  }
  // self.map.addListener('tilesloaded', setTitle);
  map.addListener('tilesloaded', setTitle);
  // Refresh all restaurants.
  refreshRestaurants();
}

/**
 * Add markers for current restaurants to the map.
 */
const addMarkersToMapUI = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    const marker = DBHelper.addMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    markers.push(marker);
  });
}
