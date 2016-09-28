import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
/*
  globals:
    Bootstrap
*/

export default Ember.Controller.extend({

  // ========== Properties ========== //

  authManager: Ember.inject.service('auth-manager'),

  currentUser: storageFor('currentUser'),

  navbar: Ember.inject.controller('navbar'),

  isLogged: false,

  host: null,

  loginMsg: '',

  // ========== Methods/Actions ========== //

  // Calls super init() from Ember.Controller Class
  init() {

    this._super(...arguments);

    this.set('host', this.store.adapterFor('application').get('host'));

    // Checks if user is logged in and sets properties according to the answer.   
    this.get('authManager').checkLogged(this.get('host'), (err) => {
      if (!err) this.set('isLogged', true);
      else this.set('isLogged', false);
    });

  },

  // Gets called from Navbar to set the isLogged property. 
  logoff() {
    this.set('isLogged', false);
  },

  actions: {

    // Authenticates the User on the host.
    authenticate() {

      // Retrieve Information from the Login Form.
      const login = this.get('login');
      this.set('login', '');
      const password = this.get('loginPassword');
      this.set('loginPassword', '');

      // Calls authManager and waits for response via promise.
      this.get('authManager').authenticate(login, password, this.host, (err) => {
        if (err) {
          this.toast.error(err, '', { closeButton: false, progressBar: false });
        } else {
          this.transitionToRoute('mappings');

          // Updates the Information shown on the Navbar.
          this.get('navbar').updateBar(true);
        }
      });
    },

    // Registers a new User on the host.
    register() {

      // Retrieves Information from register from via Controller Properties. (set implicit).
      const register = this.get('register');
      this.set('register', '');
      const password = this.get('registerPassword');
      this.set('registerPassword', '');

      // Calls the authManager and waits for a promise to fullfill.
      this.get('authManager').register(register, password, this.host, (err) => {
        if (err) {
          this.toast.error(err, '', { closeButton: false, progressBar: false });
        } else {
          this.toast.success('Anmeldung erfolgreich, bitte einloggen', '', { closeButton: false, progressBar: false });
        }
      });
    },

    // Method to display the Register From or hide it
    // Not in an Ember way... it was late.
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
