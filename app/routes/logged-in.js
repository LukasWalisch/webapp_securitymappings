import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({

  currentUser: storageFor('currentUser'),

  actions: {
    didTransition() {
      this.controllerFor('logged-in').send('refreshMappingListAction');
      this.replaceWith('loggedIn');
      return true;
    },
  },

  beforeModel() {
    if (!this.get('currentUser').get('token')) {
      this.transitionTo('mappings');
    }
  },

  model() {
    const userId = this.get('currentUser').get('id');
    return Ember.RSVP.hash({
      tactics: this.get('store').findAll('tactic'),
      patterns: this.get('store').findAll('pattern'),
      mappings: this.get('store').findAll('mapping'),
      user: this.get('store').findRecord('user', userId),
    });
  },
});
