// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileOverview Entity model.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */



/**
 * Entity model.
 * @param {ydn.db.sync.Entity} entity data source for this entity.
 * @constructor
 */
app.model.Entity = function(entity) {

  /**
   * Source entity.
   * @type {ydn.db.sync.Entity}
   * @final
   */
  this.entity = entity;

  /**
   * @type {string} entity name.
   * @final
   */
  this.name = entity.getName();

  /**
   * sprint.ly entity identifier.
   * @type {?number}
   */
  this.number = null;

  /**
   * @type {Sprintly.Entity}
   */
  this.data = null;
};


/**
 * Set model identifier.
 * @param {number} number model id.
 */
app.model.Entity.prototype.setNumber = function(number) {
  if (this.number != number) {
    this.number = number;
    if (number) {
      var req = this.entity.get(this.number);
      req.progress(function(obj) {
        this.data = obj;
        this.onChanged();
      }, this);
      req.done(function(obj) {
        if (this.data !== obj) {
          this.data = obj;
          this.onChanged();
        }
      }, this);
    } else {
      this.data = null;
      this.onChanged();
    }
  }
};


/**
 * Handle on change event.
 */
app.model.Entity.prototype.onChanged = function() {};


