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
const googleMap = document.getElementById('map');
const neighborhoodsSelect = document.getElementById('neighborhoods-select');
const cuisinesSelect = document.getElementById('cuisines-select');
const restaurantsList = document.getElementById('restaurants-list');

/**
 * Fetch neighborhoods and cuisines when the initial HTML document has been
 * completely loaded and parsed, without waiting for stylesheets, images,
 * and subframes to finish loading.
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 * https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', (event) => {
  fetchNeighborhoods();
  fetchCuisines();
});

/**
 * Fetch all neighborhoods and update UI.
 */
fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      updateNeighborhoodsUI();
    }
  });
}

/**
 * Update the neighborhoods select.
 */
updateNeighborhoodsUI = (neighborhoods = self.neighborhoods) => {
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    neighborhoodsSelect.appendChild(option);
  });
}

/**
 * Fetch all cuisines and update UI.
 */
fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      updateCuisinesUI();
    }
  });
}

/**
 * Update the cuisines select.
 */
updateCuisinesUI = (cuisines = self.cuisines) => {
  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    cuisinesSelect.appendChild(option);
  });
}

/**
 * Update ul restaurants-list and markers on map for current restaurants.
 */
refreshRestaurants = () => {
  const neighborhoodIndex = neighborhoodsSelect.selectedIndex;
  const cuisineIndex = cuisinesSelect.selectedIndex;
  const neighborhood = neighborhoodsSelect[neighborhoodIndex].value;
  const cuisine = cuisinesSelect[cuisineIndex].value;

  // TODO: rewrite fetchRestaurantByCuisineAndNeighborhood to correct order
  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurantsUI(restaurants);
      updateRestaurantsUI();
    }
  })
}

/**
 * Clear ul restaurants-list and markers on map for current restaurants.
 */
resetRestaurantsUI = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  restaurantsList.innerHTML = '';
  // Remove all map markers
  markers.forEach(m => m.setMap(null));
  markers = [];
  self.restaurants = restaurants;
}

/**
 * Create ul restaurants-list and add markers on map for current restaurants.
 */
updateRestaurantsUI = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    restaurantsList.appendChild(addRestaurantCardUI(restaurant));
  });
  addMarkersToMapUI();
}

/**
 * Create a restaurant card in a li element.
 */
addRestaurantCardUI = (restaurant) => {
  const li = document.createElement('li');
  li.className = 'restaurant-card';

  const image = document.createElement('img');
  image.className = 'restaurant-img';
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  // Add alternative text.
  image.setAttribute('alt', restaurant.alternative_text);
  li.appendChild(image);

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
 * Initialize Google map, called from HTML.
 * https://developers.google.com/maps/documentation/javascript/tutorial
 */
window.initMap = () => {
  let loc = {lat: 40.722216, lng: -73.987501};
  // Not using scrollwheel: False anymore, using default gestureHandling: auto
  // https://developers.google.com/maps/documentation/javascript/interaction
  self.map = new google.maps.Map(googleMap, {
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
  self.map.addListener('tilesloaded', setTitle);
  // Refresh all restaurants.
  refreshRestaurants();
}

/**
 * Add markers for current restaurants to the map.
 */
addMarkersToMapUI = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    markers.push(marker);
  });
}
