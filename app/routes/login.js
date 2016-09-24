import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({

  currentUser: storageFor('currentUser'),

  beforeModel() {
    if (this.get('currentUser').get('token')) {
      this.transitionTo('mappings');
    }
  },

  actions: {
    didTransition() {
      this.controller.set('loginMsg', '');
      this.controller.set('registerMsg', '');
    },
  },
});
