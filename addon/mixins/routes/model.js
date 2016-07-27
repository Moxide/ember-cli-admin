import Ember from 'ember';
import DS from 'ember-data';
const { getOwner } = Ember;
var modelMixin;

modelMixin = Ember.Mixin.create({
  model: function(options, transition) {
    this.action = undefined;
    this.page = undefined;
    this.perPage = undefined;
    this.modelName = this._modelName(transition.targetName);

    this.page = (options != null ? options.page : void 0) || 1;
    this.perPage = (options != null ? options.perPage : void 0) || 25;
    this.q = (options != null ? options.q : void 0);
    this.sort = (options != null ? options.sort : void 0);
    this.orderAscending = (options != null ? options.orderAscending : void 0);
    this._checkAction(options, transition.targetName);
    if (options.action) {
      this._setAction(options.action);
    }
    if (!getOwner(this).resolveRegistration('model:' + this.modelName)) {
      if (this.modelName.match(/dashboard/) || this.modelName.match(/index/) || this.modelName.match(/application/)) {
        return;
      }
      return Ember.RSVP.reject('No model was found');
    }
    if (this.store.modelFor(this.modelName)) {
      return this._find_model(this.modelName, options);
    }
  },
  _find_model: function(modelName, options) {
    if (options.action === "new") {
      return this.store.createRecord(modelName, {});
    }
    if (!options.id) {
      var findOptions = {
        page: this.page,
        perPage: this.perPage,
        orderAscending: this.orderAscending
      };
      if(!Ember.isEmpty(this.q)){
        findOptions.q = this.q;
      }
      if(!Ember.isEmpty(this.sort)){
        findOptions.sort = this.sort;
      }
      return this.pagination(modelName, findOptions);
    }
    return this.store.find(modelName, options.id);
  },
  _setModel: function(controller, model) {
    if (!model) {
      return;
    }
    //avoid of using internal api
    if (model instanceof DS.RecordArray) {
      return controller.set('model', Ember.Object.create({
        items: model,
        __list: true,
        total: model.meta.total
      }));
    }
    return controller.set('model', model);
  },
  _modelName: function(name) {
    if (/\./.test(name)) {
      name = name.split(".")[0];
    }
    return Ember.String.singularize(name);
  }
});

export default modelMixin;
