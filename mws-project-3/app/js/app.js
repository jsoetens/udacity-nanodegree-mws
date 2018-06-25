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
const endpointRestaurants = `http://localhost:1337/restaurants`;

// Declare the id elements.
const elementMapsContainer = document.getElementById('maps-container');
const elementGoogleMaps = document.getElementById('google-maps');
const elementGoogleStaticMaps = document.getElementById('google-static-maps');
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
  createMapsStatic();
  loadMainNetworkFirst();
});

/**
 * Embed a Google Maps image on your web page using the Maps Static API.
 * https://developers.google.com/maps/documentation/maps-static/intro
 */
const createMapsStatic = () => {
  // Create the Maps Static API Url
  // https://developers.google.com/maps/documentation/maps-static/dev-guide
  let mapsStaticUrl 
    = `https://maps.googleapis.com/maps/api/staticmap?parameters`;
  const mapsCenter = `40.722216,-73.987501`;
  const mapsZoom = 12;
  // const mapsImageSizes = '640x640';
  let mapsImageWidth = 640;
  let mapsImageHeight = 640;
  let mapsScale = 1;
  const mapsImageFormat = 'jpg';
  // TODO: move the API Key to either environmental variables or config.js
  const mapsApiKey = `AIzaSyDm9CBeGB2XpSOVQXsuyo-kJtdHSNGiF4k`;
  // const imageMapsStatic = document.createElement('img');
  const imageMapsStatic = new Image();
  imageMapsStatic.id = 'static-map';
  imageMapsStatic.className = 'google-maps-static-img';
  // Adding an event needs to be a function.
  imageMapsStatic.setAttribute('onclick', 'showGoogleMaps()');
  imageMapsStatic.alt 
    = 'Static map showing high level view of New York, Manhattan and Brooklyn';
  // Determine image sizes, free plan allows max 640x640 on scale 1 and
  // 640x640 on scale 2 returns 1280x1280 pixels.
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight
  const intElemClientWidth = elementMapsContainer.clientWidth;
  if (intElemClientWidth <= 640) {
    mapsImageWidth = intElemClientWidth;
  } else {
    mapsScale = 2;
    mapsImageWidth = 640
  }
  const intElementClientHeight = elementMapsContainer.clientHeight;
  if (intElementClientHeight <= 640) {
    mapsImageHeight = intElementClientHeight;
  } else {
    mapsScale = 2;
    mapsImageHeight = 640
  }
  let mapsImageSizes = `${mapsImageWidth}x${mapsImageHeight}`;
  mapsStaticUrl = 
    `${mapsStaticUrl}&center=${mapsCenter}&zoom=${mapsZoom}&size=${mapsImageSizes}&scale=${mapsScale}&format=${mapsImageFormat}&key=${mapsApiKey}`;
  imageMapsStatic.src = mapsStaticUrl;
  imageMapsStatic.width = mapsImageWidth;
  imageMapsStatic.height = mapsImageHeight;
  elementGoogleStaticMaps.appendChild(imageMapsStatic);
}

const showGoogleMaps = () => {
  if (elementGoogleMaps.style.display === 'none') {
    elementGoogleMaps.style.display = 'block';
    elementGoogleStaticMaps.style.display = 'none';
  }
}

/**
 * Fetch all neighborhoods and cuisines from network and fallback to IndexedDB,
 * update UI.
 * In loadMainNetworkFirst, once the server data is received, IndexedDB and
 * the page are updated. Then, when the data is successfully saved, a timestamp
 * is stored and the user is notified that the data is available for
 * offline use. If there is no network availability when this function is
 * called, then the getServerData function rejects and the catch method takes
 * over. In the catch call, the getLocalRestaurantsData function retrieves
 * local data from IndexedDB. If there isn't any local data saved, then
 * the user is alerted by messageNoData. Otherwise the local data is displayed
 * and a message informs the user that the data might be outdated.
 */
const loadMainNetworkFirst = () => {
  DBHelper.getServerData(endpointRestaurants)
  .then(dataFromNetwork => {
    updateNeighborhoodsUI(dataFromNetwork);
    updateCuisinesUI(dataFromNetwork);
    saveRestaurantsDataLocally(dataFromNetwork)
    .then(() => {
      DBHelper.setLastUpdated(new Date());
      // DBHelper.messageDataSaved();
    }).catch(err => {
      // DBHelper.messageSaveError();
      console.warn(err);
    });
  }).catch(err => {
    console.log('[DEBUG] Network requests have failed, this is expected if offline');
    getLocalRestaurantsData()
    .then(offlineData => {
      if (!offlineData.length) {
        // DBHelper.messageNoData();
      } else {
        // DBHelper.messageOffline();
        updateNeighborhoodsUI(offlineData);
        updateCuisinesUI(offlineData);
        refreshRestaurantsNetworkFirst();
      }
    });
  });
}

/**
 * Update UI of Neighborhoods select element.
 */
const updateNeighborhoodsUI = (result) => {
  // Get all neighborhoods from all restaurants.
  let allNeighborhoods = result.map((v, i) => result[i].neighborhood);
  // Remove duplicates from neighborhoods and assign to global variable.
  self.neighborhoods = allNeighborhoods.filter((v, i) => allNeighborhoods.indexOf(v) == i);
  // Update the neighborhoods select.
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    elementNeighborhoodsSelect.appendChild(option);
  });
}

/**
 * Update UI of Cuisines select element.
 */
const updateCuisinesUI = (result) => {
  // Get all cuisines from all restaurants.
  let allCuisines = result.map((v, i) => result[i].cuisine_type);
  // Remove duplicates from cuisines and assign to global variable.
  self.cuisines = allCuisines.filter((v, i) => allCuisines.indexOf(v) == i);
  // Update the cuisines select.
  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    elementCuisinesSelect.appendChild(option);
  });
}

/**
 * Fetch all restaurants from network and fallback to IndexedDB, update UI.
 */
const refreshRestaurantsNetworkFirst = () => {
  DBHelper.getServerData(endpointRestaurants)
  .then(dataFromNetwork => {
    refreshRestaurantsUI(false, dataFromNetwork);
    saveRestaurantsDataLocally(dataFromNetwork)
    .then(() => {
      DBHelper.setLastUpdated(new Date());
      // DBHelper.messageDataSaved();
    }).catch(err => {
      // DBHelper.messageSaveError();
      console.warn(err);
    });
  }).catch(err => {
    console.log('[DEBUG] Network requests have failed, this is expected if offline');
    getLocalRestaurantsData()
    .then(offlineData => {
      if (!offlineData.length) {
        // DBHelper.messageNoData();
      } else {
        // DBHelper.messageOffline();
        refreshRestaurantsUI(true, offlineData);
      }
    });
  });
}

/**
 * Update ul restaurants-list and markers on map for current restaurants.
 */
const refreshRestaurantsUI = (offline, result) => {
  // Retrieve the selected neighborhood and cuisine.
  const neighborhoodIndex = elementNeighborhoodsSelect.selectedIndex;
  const cuisineIndex = elementCuisinesSelect.selectedIndex;
  const neighborhood = elementNeighborhoodsSelect[neighborhoodIndex].value;
  const cuisine = elementCuisinesSelect[cuisineIndex].value;

  // Clear ul restaurants-list and markers on map for current restaurants.
  self.restaurants = [];
  elementRestaurantsList.innerHTML = '';
  markers.forEach(m => m.setMap(null));
  markers = [];

  // Filter the data by neighborhood and cuisine.
  self.restaurants = result;
  if (neighborhood != 'all') {
    self.restaurants = self.restaurants.filter(r => r.neighborhood == neighborhood);
  }
  if (cuisine != 'all') {
    self.restaurants = self.restaurants.filter(r => r.cuisine_type == cuisine);
  }

  // Create ul restaurants-list and add markers on map for current restaurants.
  self.restaurants.forEach(restaurant => {
    elementRestaurantsList.appendChild(addRestaurantCardUI(restaurant));
  });
  if (!offline) {
    addMarkersToMapUI();
  }
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
  map = new google.maps.Map(elementGoogleMaps, {
    center: loc,
    zoom: 12
  });
  // a11y - Frames must have non-empty title attribute
  // https://dequeuniversity.com/rules/axe/2.2/frame-title
  // https://developers.google.com/maps/documentation/javascript/events
  let setTitle = () => {
    const iFrameGoogleMaps = document.querySelector('#google-maps iframe');
    iFrameGoogleMaps.setAttribute('title', 'Google Maps overview of restaurants');
  }
  map.addListener('tilesloaded', setTitle);
  // Refresh all restaurants.
  refreshRestaurantsNetworkFirst();
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
