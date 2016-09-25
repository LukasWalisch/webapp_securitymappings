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

  isLogged: false,

  host: null,

  loginMsg: '',

  init() {
    this.set('host', this.store.adapterFor('application').get('host'));
    
    this.get('authManager').checkLogged(this.get('host'), (err) => {
      if (!err) this.set('isLogged', true);
      else this.set('isLogged', false);
    });

  },

  logoff() {
    this.set('isLogged', false);
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
          this.transitionToRoute('mappings');
          this.get('navbar').updateBar(true);
        }
      });
    },

    register() {
      const register = this.get('register');
      this.set('register', '');
      const password = this.get('registerPassword');
      this.set('registerPassword', '');
      this.get('authManager').register(register, password, this.host, (err) => {
        if (err) {
          this.toast.error(err, '', { closeButton: false, progressBar: false });
        } else {
          this.toast.success('Anmeldung erfolgreich, bitte einloggen', '', { closeButton: false, progressBar: false });
        }
      });
    },

    toggleRegister() {
      const element = document.getElementsByClassName('registerForm');
      if (element[0].style.display === '') element[0].style.display = 'none';
      if (element[0].style.display === 'none') {
        element[0].style.display = 'block';
      } else {
        element[0].style.display = 'none';
      }
    },
  },
});
