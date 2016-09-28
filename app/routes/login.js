import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({

  currentUser: storageFor('currentUser'),

  // Checks if token is set. If set, you are redirected to mappings.
  beforeModel() {
    if (this.get('currentUser').get('token')) {
      this.transitionTo('mappings');
    }
  },
});
