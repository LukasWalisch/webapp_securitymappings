import Ember from 'ember';
import AdaptiveStore from 'ember-simple-auth/session-stores/adaptive';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({

  authManager: Ember.inject.service('auth-manager'),

  currentUser: storageFor('currentUser'),

  navbar: Ember.inject.controller('navbar'),

  isLogged: Ember.computed(function() {
    return this.get('currentUser').get('logged');
  }),

  actions: {
    authenticate() {
      const { login, password } = this.getProperties('login', 'password');
      this.get('authManager').authenticate(login, password, (err) => {
        if (err) console.log('Wrong credentials');
        else {
          this.transitionToRoute('loggedIn');
          this.get('navbar').updateBar();
        }
      });
    },
  },
});
