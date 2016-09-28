import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({

  // ========= Properties ========= //

  login: Ember.inject.controller(),

  currentUser: storageFor('currentUser'),

  authManager: Ember.inject.service('authManager'),

  username: 'Nicht eingeloggt',

  isLogged: false,

  // ========== Methods/Actions ======== //

  actions: {

    // Resets all logged in relevant Data.
    logoff() {
      this.get('currentUser').reset();
      this.set('isLogged', false);
      this.updateBar();
      this.transitionToRoute('login');
      this.get('login').logoff();
    },

  },

  init() {
    this._super();

    //See if user is logged in
    this.set('host', this.store.adapterFor('application').get('host'));
    this.get('authManager').checkLogged(this.get('host'), (err) => {
      if (!err) {
        this.set('isLogged', true);
        this.set('username', this.get('currentUser').get('username'));
      }
    });
  },

  // Called if someone logged in or logged out.
  // triggerLogged can be true (if loggedIn) or false (if not logged in).
  updateBar(triggerLogged) {
    this.set('username', this.get('currentUser').get('username'));
    this.set('isLogged', triggerLogged);
  },

});

