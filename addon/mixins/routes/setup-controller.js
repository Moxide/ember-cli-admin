import Ember from 'ember';
import Attributes from 'ember-cli-admin/dsl/attributes';

export default Ember.Mixin.create({
  setupController: function(controller, model) {
    var type;
    this._setSiteTitle(controller, model);
    if (model) {
      this._setModel(controller, model);
      //check single record then array then construct
      type = this.store.modelFor(model.modelName) || model.type || model.constructor;
      controller.set('modelAttributes', Attributes.detect(type));
      controller.set('modelType', type);
      return controller.set('batches', Ember.A());
    }
  }
});
