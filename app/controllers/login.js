import Ember from 'ember';
import AdaptiveStore from 'ember-simple-auth/session-stores/adaptive';
import { storageFor } from 'ember-local-storage';
/*
  globals:
    Bootstrap
*/

export default Ember.Controller.extend({

  authManager: Ember.inject.service('auth-manager'),

  currentUser: storageFor('currentUser'),

  navbar: Ember.inject.controller('navbar'),

  isLogged: Ember.computed(function() {
    return this.get('currentUser').get('logged');
  }),

  showRegisterMsg: false,

  showLoginMsg: false,

  actions: {
    authenticate() {
      const login = this.get('login');
      const password = this.get('loginPassword');
      debugger;
      this.get('authManager').authenticate(login, password, (err) => {
        if (err) console.log('Wrong credentials');
        else {
          this.transitionToRoute('loggedIn');
          this.get('navbar').updateBar();
          this.set('showRegisterMsg', false);
        }
      });
    },

    register() {
      const { register, password } = this.getProperties('register', 'registerPassword');
      //this.get('authManager').register(register, password, (err) => {
        //if (err) console.log(err);
        //else {
          this.set('showRegisterMsg',true);
    },
  },
});
