/**
 * DBHelper provides functions to interact with the local development API server
 * provided by Udacity for project 2.
 * https://github.com/udacity/mws-restaurant-stage-2
 * curl "http://localhost:1337/restaurants"
 * curl "http://localhost:1337/restaurants/{3}"
 */

class DBHelper {

  /**
   * Alternative Text as the API server doesn't provide it.
   */
  static getAlternativeText(id) {
    const altTexts = {
      1: "Interior of Mission Chinese Food",
      2: "Pizza Quattro Formaggi",
      3: "Interior of Kang Ho Dong Baekjeong",
      4: "Outside view of Katz's Delicatessen at night",
      5: "Open kitchen of Roberta's Pizza",
      6: "People queueing at Hometown BBQ",
      7: "Outside view of Superiority Burger",
      8: "Outside view of The Dutch",
      9: "People eating at Mu Ramen",
      10: "Interior of Casa Enrique"
    };
    return altTexts[id];
  }

  /**
   * Get the database URL.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
   */
  static get DATABASE_URL() {
    const port = 1337;
    return `http://localhost:${port}`;
  }

  /*
   * logResult is available for debugging puprposes, it does some logging
   * of the JSON data.
   */
  static logResult(result) {
    console.log(result);
  }

  /*
   * The fetch call returns a promise that resolves to a response object.
   * If the request does not complete, .catch takes over and is passed the
   * corresponding error.
   */
  static logError(error) {
    console.log('[ERROR] Looks like there was a problem: \n', error);
  }

  /*
   * validateResponse checks if the response is valid (is it a 200-299?).
   * If it isn't, an error is thrown, skipping the rest of the then blocks and
   * triggering the catch block. Without this check bad responses are passed
   * down the chain and could break later code that may rely on receiving
   * a valid response. If the response is valid, it is passed to
   * readResponseAsJSON.
   * TODO: respond with custom pages for different errors or handle other
   * responses that are not ok (i.e., not 200-299), but still usable
   * (e.g., status codes in the 300 range)
   */
  static validateResponse(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  /*
   * readResponseAsJSON reads the body of the response using the Response.json()
   * method. This method returns a promise that resolves to JSON. Once this
   * promise resolves, the JSON data is passed to logResult.
   */
  static readResponseAsJSON(response) {
    return response.json();
  }

  /**
   * FetchJSON
   */
  static fetchJSON(pathToResource) {
    // Fetch is called on a resource and Fetch returns a promise that will
    // resolve to a response object. When the promise resolves, the response
    // object is passed to validateResponse.
    return fetch(pathToResource) // 1
    .then(DBHelper.validateResponse) // 2
    .then(DBHelper.readResponseAsJSON) // 3
    // Once the promise resolves, the JSON data is passed to logResult.
    // .then(DBHelper.logResult) // 4
    .catch(DBHelper.logError);
  }

  /**
   * Fetch all neighborhoods.
   */
  static fetchNeighborhoods() {
    // return fetch(`${DBHelper.DATABASE_URL}/restaurants`)
    // .then(DBHelper.validateResponse)
    // .then(DBHelper.readResponseAsJSON)
    return DBHelper.fetchJSON(`${DBHelper.DATABASE_URL}/restaurants`)
    .then(result => {
      // Get all neighborhoods from all restaurants.
      const neighborhoods = result.map((v, i) => result[i].neighborhood);
      // Remove duplicates from neighborhoods.
      const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i);
      return uniqueNeighborhoods;
    })
    .catch(DBHelper.logError);
  }

  /**
   * Fetch all cuisines.
   */
  static fetchCuisines() {
    // return fetch(`${DBHelper.DATABASE_URL}/restaurants`)
    // .then(DBHelper.validateResponse)
    // .then(DBHelper.readResponseAsJSON)
    return DBHelper.fetchJSON(`${DBHelper.DATABASE_URL}/restaurants`)
    .then(result => {
      // Get all cuisines from all restaurants.
      const cuisines = result.map((v, i) => result[i].cuisine_type);
      // Remove duplicates from cuisines.
      const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i);
      return uniqueCuisines;
    })
    .catch(DBHelper.logError);
  }

  /**
   * Fetch restaurants by cuisine and neighborhood.
   */
  static fetchRestaurantByNeighborhoodAndCuisine(neighborhood, cuisine) {
    // return fetch(`${DBHelper.DATABASE_URL}/restaurants`)
    // .then(DBHelper.validateResponse)
    // .then(DBHelper.readResponseAsJSON)
    return DBHelper.fetchJSON(`${DBHelper.DATABASE_URL}/restaurants`)
    .then(result => {
      let restaurants = result;
      if (cuisine != 'all') {
        restaurants = restaurants.filter(r => r.cuisine_type == cuisine);
      }
      if (neighborhood != 'all') {
        restaurants = restaurants.filter(r => r.neighborhood == neighborhood);
      }
      return restaurants;
    })
    .catch(DBHelper.logError);
  }

  /**
  * Fetch a restaurant by its ID.
  * http://localhost:1337/restaurants/{3}
  */
  static fetchRestaurantById(id) {
    // return fetch(`${DBHelper.DATABASE_URL}/restaurants/${id}`)
    // .then(DBHelper.validateResponse)
    // .then(DBHelper.readResponseAsJSON)
    return DBHelper.fetchJSON(`${DBHelper.DATABASE_URL}/restaurants/${id}`)
    .then(result => {
      let restaurant = result;
      return restaurant;
    })
    .catch(DBHelper.logError);
  }

  /**
   * Returns the relative url for a restaurant.
   */
  static getRestaurantURL(restaurant) {
    // return `./restaurant.html?id=${restaurant.id}`
    return `restaurant.html?id=${restaurant.id}`
  }

  /**
   * Returns the restaurant image URL.
   * Using id to construct urls as the local development API server doesn't
   * always have a photograph field.
   * jpg is default image type.
   * 800 is default width.
   */
  static getImageUrlForRestaurant(restaurant, imageType, width) {
    // Default image type is jpeg.
    let fileExtension = 'jpg';
    switch (imageType) {
      case 'jpeg':
        break;
      case 'webp':
        fileExtension = 'webp';
        break;
      default:
        console.log(`[DEBUG] unhandled imageType: ${imageType}`);
    }
    if (typeof width !== 'undefined') {
      return `img/${restaurant.id}_w_${width}.${fileExtension}`;
    } else {
      return `img/${restaurant.id}_w_800.${fileExtension}`;
    }
  }

  /**
   * Add a Google Maps marker for a restaurant.
   */
  static addMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.getRestaurantURL(restaurant),
      map: map,
      animation: google.maps.Animation.DROP}
    );
    return marker;
  }

}
