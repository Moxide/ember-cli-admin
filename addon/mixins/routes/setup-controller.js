import Ember from 'ember';
import DS from 'ember-data';
import Attributes from 'ember-cli-admin/dsl/attributes';

export default Ember.Mixin.create({
  setupController: function(controller, model) {
    var type;
    this._setSiteTitle(controller, model);
    if (model) {
      this._setModel(controller, model);
      type = this.store.modelFor(this.modelName) || model.type || model.constructor;
      controller.set('modelAttributes', Attributes.detect(type));
      controller.set('modelType', type);
      return controller.set('batches', Ember.A());
    }
  }
});
