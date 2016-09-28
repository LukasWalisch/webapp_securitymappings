import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({

  currentUser: storageFor('currentUser'),

  // Checks if username is admin to enable the route.
  // If someone changed the name in local storage and enters the page, he is logged of.
  actions: {
    didTransition() {
      if (!(this.get('currentUser').get('username') === 'lukas')) this.transitionTo('mappings');
      return true;
    },
  },

  model() {
    return Ember.RSVP.hash({
      patterns: this.get('store').findAll('pattern'),
    });
  },


});
