/*
 * IndexedDB
 */

// Create the IndexedDB database.
function createIndexedDB() {
  // Checking for IndexedDB support.
  if (!('indexedDB' in window)) {
    console.log('[INFO] This browser doesn\'t support IndexedDB.');
    return null;
  }
  // Opening a database.
  return idb.open('pwa-resto-db1', 3, function(upgradeDb) {
    switch (upgradeDb.oldVersion) {
      case 0:
        // A placeholder case so that the switch block will
        // execute when the database is first created
        // (oldVersion is 0)
      case 1:
        // Creating object store for restaurants.
        // A key path is a property that always exists and contains a unique
        // value. Objects added to this store must have an id property and
        // the value must be unique.
        if (!upgradeDb.objectStoreNames.contains('restaurants')) {
          console.log('[DEBUG] Creating a new object store for restaurants.');
          const restaurantsOS =
            upgradeDb.createObjectStore('restaurants', {keyPath: 'id'});
        }
      case 2:
        // Creating object store for reviews.
        if (!upgradeDb.objectStoreNames.contains('reviews')) {
          console.log('[DEBUG] Creating a new object store for reviews.');
          const restaurantsOS =
            upgradeDb.createObjectStore('reviews', {keyPath: 'id'});
        }
    }
  });
}

// Database object.
const dbPromise = createIndexedDB();

/**
 * Write restaurants data to object store restaurants.
 * The saveRestaurantsDataLocally function takes an array of objects and adds
 * or updates each object to the IndexedDB database. The store.put operations
 * happen inside a Promise.all. This way if any of the put operations fail,
 * we can catch the error and abort the transaction. Aborting the transaction
 * rolls back all the changes that happened in the transaction so that if any
 * of the events fail to put, none of them will be added to the object store.
 */
function saveRestaurantsDataLocally(restaurants) {
  if (!('indexedDB' in window)) {return null;}
  return dbPromise.then(db => {
    const tx = db.transaction('restaurants', 'readwrite');
    const store = tx.objectStore('restaurants');
    // Don't use Promise.all when there's only one restaurant.
    if (restaurants.length > 1) {
      return Promise.all(restaurants.map(restaurant => store.put(restaurant)))
      .catch(() => {
        tx.abort();
        throw Error('[ERROR] Restaurants were not added to the store.');
      });
    } else {
      store.put(restaurants);
    }
  });
}

// Get restaurants data from object store restaurants.
function getLocalRestaurantsData() {
  if (!('indexedDB' in window)) {return null;}
  return dbPromise.then(db => {
    const tx = db.transaction('restaurants', 'readonly');
    const store = tx.objectStore('restaurants');
    return store.getAll();
  });
}

// Get restaurant by id data from object store restaurants.
function getLocalRestaurantByIdData(id) {
  if (!('indexedDB' in window)) {return null;}
  return dbPromise.then(db => {
    const tx = db.transaction('restaurants', 'readonly');
    const store = tx.objectStore('restaurants');
    // Make sure you're using a number for id.
    return store.get(parseInt(id));
  });
}
