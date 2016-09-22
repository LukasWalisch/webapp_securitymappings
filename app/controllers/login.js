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

  host: null,

  registerMsg: '',

  loginMsg: '',

  init() {
    this.set('host', this.store.adapterFor('application').get('host'));
  },

  actions: {
    authenticate() {
      const login = this.get('login');
      this.set('login', '');
      const password = this.get('loginPassword');
      this.set('loginPassword', '');
      this.get('authManager').authenticate(login, password, this.host, (err) => {
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
      console.log(encoded);
      this.set('register', '');
      const password = this.get('registerPassword');
      this.set('registerPassword', '');
      this.get('authManager').register(register, password, this.host, (err) => {
        if (err) {
          this.set('registerMsg', err);
        } else {
          this.set('registerMsg', 'Anmeldung erfolgreich, bitte einloggen');
        }
      });
    },
  },
});
