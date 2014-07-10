/**
 * @fileoverview Externs for sprintly API.
 * @externs
 */


/**
 * @const
 * @type {Object}
 */
var Sprintly = {};

/**
 * https://sprintly.uservoice.com/knowledgebase/articles/98355-products
 * @interface
 */
Sprintly.Product = function() {};

/**
 * @type {boolean}
 */
Sprintly.Product.prototype.admin;

/**
 * @type {boolean}
 */
Sprintly.Product.prototype.archived;

/**
 * @type {number}
 */
Sprintly.Product.prototype.id;

/**
 * @type {string}
 */
Sprintly.Product.prototype.name;



/**
 * @enum {string} Item type.
 */
Sprintly.ItemType = {
  defect: 'defect',
  story: 'story',
  task: 'task',
  test: 'test'
};


/**
 * @interface
 */
Sprintly.Progress = function() {};

/**
 * @type {string}
 */
Sprintly.Progress.prototype.accepted_at;

/**
 * @type {string}
 */
Sprintly.Progress.prototype.closed_at;

/**
 * @type {string}
 */
Sprintly.Progress.prototype.closed_at;



/**
 * https://sprintly.uservoice.com/knowledgebase/articles/98410-people
 * @interface
 */
Sprintly.People = function() {};

/**
 * @type {boolean}
 */
Sprintly.People.prototype.admin;

/**
 * @type {string}
 */
Sprintly.People.prototype.first_name;

/**
 * @type {string}
 */
Sprintly.People.prototype.last_name;

/**
 * @type {number}
 */
Sprintly.People.prototype.id;

/**
 * @type {string}
 */
Sprintly.People.prototype.email;



/**
 * https://sprintly.uservoice.com/knowledgebase/articles/98412-items
 * @interface
 */
Sprintly.Item = function() {};

/**
 * @type {Sprintly.ItemType}
 */
Sprintly.Item.prototype.type;

/**
 * @type {string}
 */
Sprintly.Item.prototype.status;

/**
 * @type {Sprintly.Product}
 */
Sprintly.Item.prototype.product;

/**
 * @type {Sprintly.Progress}
 */
Sprintly.Item.prototype.progress;

/**
 * @type {string}
 */
Sprintly.Item.prototype.description;

/**
 * @type {Array.<string>}
 */
Sprintly.Item.prototype.tags;

/**
 * @type {number}
 */
Sprintly.Item.prototype.number;

/**
 * @type {boolean}
 */
Sprintly.Item.prototype.archived;

/**
 * @type {string}
 */
Sprintly.Item.prototype.title;

/**
 * @type {Sprintly.People}
 */
Sprintly.Item.prototype.created_by;

/**
 * @type {string}
 */
Sprintly.Item.prototype.score;

/**
 * @type {Sprintly.People}
 */
Sprintly.Item.prototype.assigned_to;

/**
 * @type {string}
 */
Sprintly.Item.prototype.description;




