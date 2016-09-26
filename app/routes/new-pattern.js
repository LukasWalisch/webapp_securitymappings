import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({

  currentUser: storageFor('currentUser'),

  actions: {
    didTransition() {
      if (!(this.get('currentUser').get('username') === 'admin')) this.transitionTo('mappings');
      return true;
    },
  },

  model() {
    return Ember.RSVP.hash({
      patterns: this.get('store').findAll('pattern'),
    });
  },


});
