/**
 * @fileOverview Sprintly service loader.
 *
 * Service loader handle persisting user profile, managing sprintly product and network aware connection to backend
 * services. Service loader dispatch important events such as `sprintly-ready`, `sprintly-login` and `sprintly-logout`
 * events to `window`.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

(function(global) {
  var sprintly = global.sprintly;
  sprintly.service = new sprintly.Service();


  /**
   * @type {Object.<sprintly.Product>} products belong to login user.
   */
  sprintly.products = {};


  /**
   * @param {Array.<Sprintly.Product>} products list of product resources.
   * @private
   */
  sprintly.prepareProducts = function (products) {
    for (var id in sprintly.products) {
      if (!products.some(function (p) {
            return p.id == id;
          })) {
        delete this.products[id];
      }
    }
    for (var i = 0; i < products.length; i++) {
      var prod = products[i];
      if (!sprintly.products[prod.id]) {
        sprintly.products[prod.id] = new sprintly.Product(sprintly.service, prod);
      }
    }
  };


  /**
   *
   * @param {string} username user id.
   * @param {string} password sprint.ly API key
   * @param {boolean=} remember keep username and password.
   * @return {Promise}
   */
  sprintly.login = function(username, password, remember) {
    if (remember === false) {
      localStorage.removeItem('user-profile');
    }
    return sprintly.service.login(username, password).then(function(products) {
      if (remember) {
        var profile = sprintly.service.getProfile();
        localStorage.setItem('user-profile', JSON.stringify(profile));
        sprintly.dispatchReady(profile);
        window.dispatchEvent(new CustomEvent('sprintly-login'));
      }
      sprintly.prepareProducts(products);
    }, function(e) {
      localStorage.removeItem('user-profile');
      for (var id in sprintly.products) {
        sprintly.products[id].dispose();
        delete sprintly.products[id];
      }
      window.dispatchEvent(new CustomEvent('sprintly-logout'));
    })
  };


  /**
   * Dispatch ready event to window.
   * @param profile
   * @private
   */
  sprintly.dispatchReady = function(profile) {
    var event = new CustomEvent('sprintly-ready', {
      detail: {
        profile: profile
      }
    });
    window.dispatchEvent(event);
  };


  /**
   * Run sprintly loader.
   * This will dispatch `ready` event if user already login on previous session.
   * @returns {Promise} If user has valid session, resolve user profile, otherwise reject with `false`.
   */
  sprintly.run = function() {
    var profile = localStorage.getItem('user-profile');
    if (profile) {
      profile = JSON.parse(profile);
      sprintly.service.setProfile(profile);
      sprintly.prepareProducts(profile.products);
      // dispatch event when all database in the products are ready.
      var db_ready = [];
      for (var name in sprintly.products) {
        db_ready.push(new Promise(function(resolve, reject) {
          sprintly.products[name].db.onReady(function(e) {
            if (e) {
              reject(e);
            } else {
              resolve(true);
            }
          })
        }));
      }
      return Promise.all(db_ready).then(function() {
        sprintly.dispatchReady(profile);
        return profile.products;
      });
    } else {
      return Promise.reject(false);
    }
  };

})(window);