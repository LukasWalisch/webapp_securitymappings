import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({

  currentUser: storageFor('currentUser'),


  model() {
    return Ember.RSVP.hash({
      patterns: this.get('store').findAll('pattern'),
    });
  },
});
