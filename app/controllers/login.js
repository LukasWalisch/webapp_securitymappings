import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
/*
  globals:
    Bootstrap
*/

export default Ember.Controller.extend({

  authManager: Ember.inject.service('auth-manager'),

  currentUser: storageFor('currentUser'),

  navbar: Ember.inject.controller('navbar'),

  isLogged: Ember.computed(function islogged() {
    return this.get('currentUser').get('logged');
  }),

  registerMsg: '',

  loginMsg: '',

  actions: {
    authenticate() {
      const login = this.get('login');
      this.set('login', '');
      const password = this.get('loginPassword');
      this.set('loginPassword', '');
      this.get('authManager').authenticate(login, password, (err) => {
        if (err) {
          this.set('loginMsg', err);
        } else {
          this.transitionToRoute('loggedIn');
          this.get('navbar').updateBar();
        }
      });
    },

    register() {
      const register = this.get('register');
      this.set('register', '');
      const password = this.get('registerPassword');
      this.set('registerPassword', '');
      this.get('authManager').register(register, password, (err) => {
        if (err) {
          this.set('registerMsg', err);
        } else {
          this.set('registerMsg', 'Anmeldung erfolgreich, bitte einloggen');
        }
      });
    },
  },
});
