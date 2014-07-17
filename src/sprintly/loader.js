/**
 * @fileOverview Sprintly service loader.
 *
 * Service loader handle persisting user profile, managing sprintly product and network aware connection to backend
 * services. Service loader dispatch important events such as `sprintly-ready`, `sprintly-login` and `sprintly-logout`
 * events to `window`.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


/**
 * @type {sprintly.Service} main service.
 * @final
 */
sprintly.service = new sprintly.Service();


/**
 * Events dispatch to window.
 * @enum {string}
 */
sprintly.EventType = {
  /** Login event */
  LOGIN: 'sprintly-login',
  /** Login fail event */
  LOGIN_FAIL: 'sprintly-login-fail',
  /** Logout event */
  LOGOUT: 'sprintly-logout',
  /** Service ready event */
  READY: 'sprintly-ready'
};


/**
 * @type {Object.<sprintly.Product>} products belong to login user.
 * @export
 */
sprintly.products = {};


/**
 * @param {Array.<Sprintly.Product>} products list of product resources.
 * @return {Promise} Resolve with list of products.
 * @private
 */
sprintly.prepareProducts = function(products) {
  for (var id in sprintly.products) {
    if (!products.some(function(p) {
      return p.id == id;
    })) {
      this.products[id].dispose();
      delete this.products[id];
    }
  }
  for (var i = 0; i < products.length; i++) {
    var prod = products[i];
    if (!sprintly.products[prod.id]) {
      sprintly.products[prod.id] = new sprintly.Product(sprintly.service, prod);
    }
  }
  var db_ready = [];
  for (var name in sprintly.products) {
    db_ready.push(sprintly.products[name].onReady);
  }
  return Promise.all(db_ready).then(function() {
    return sprintly.products;
  });
};


/**
 *
 * @param {string} username user id.
 * @param {string} password sprint.ly API key
 * @param {boolean=} remember keep username and password.
 * @return {Promise}
 * @export
 */
sprintly.login = function(username, password, remember) {
  if (remember === false) {
    localStorage.removeItem('user-profile');
  }
  return sprintly.service.login(username, password).then(function(products) {
    var profile = sprintly.service.getProfile();
    if (remember) {
      localStorage.setItem('user-profile', JSON.stringify(profile));
    } else {
      sessionStorage.setItem('user-profile', JSON.stringify(profile));
    }
    window.dispatchEvent(new CustomEvent(sprintly.EventType.LOGIN));
    return sprintly.prepareProducts(products).then(function() {
      window.dispatchEvent(new CustomEvent(sprintly.EventType.READY));
    })
  }, function(e) {
    localStorage.removeItem('user-profile');
    sessionStorage.removeItem('user-profile');
    for (var id in sprintly.products) {
      sprintly.products[id].dispose();
      delete sprintly.products[id];
    }
    window.dispatchEvent(new CustomEvent('sprintly-login-fail'));
  });
};


/**
 * Run sprintly loader.
 * This will dispatch `ready` event if user already login on previous session.
 * @return {Promise} If user has valid session, resolve user profile, otherwise reject with `false`.
 * @export
 */
sprintly.run = function() {
  var profile = localStorage.getItem('user-profile') || sessionStorage.getItem('user-profile');
  if (profile) {
    profile = JSON.parse(profile);
    sprintly.service.setProfile(profile);
    return sprintly.prepareProducts(profile.products).then(function() {
      var event = new CustomEvent(sprintly.EventType.READY, {
        detail: {
          profile: profile
        }
      });
      window.dispatchEvent(event);
    });
  } else {
    return Promise.reject(false);
  }
};


