import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({
  currentUser: storageFor('currentUser'),

  model() {
    if (!this.get('currentUser.logged')) {
      this.transitionTo('login');
    }
  },
});
