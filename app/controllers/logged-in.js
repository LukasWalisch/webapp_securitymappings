import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({

  currentUser: storageFor('currentUser'),

  navbar: Ember.inject.controller('navbar'),

  isLogged: Ember.computed(function isLogged() {
    return this.get('currentUser').get('logged');
  }),

  actions: {
    logoff() {
      this.get('currentUser').reset();
      this.get('navbar').updateBar();
      this.transitionToRoute('login');
    },
  },
});
