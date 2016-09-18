import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
  authManager: Ember.inject.service('auth-manager'),

  currentUser: storageFor('currentUser'),

  username: 'Not logged in',

  logged: false,

  actions: {
    logoff() {
      this.get('currentUser').reset();
      this.updateBar();
      this.transitionToRoute('login');
    },

  },

  init() {
    this._super();
    Ember.run.schedule('afterRender', this, function afterRender() {
      this.set('username', this.get('currentUser').get('username'));
      this.set('logged', this.get('currentUser').get('logged'));
    });
  },

  updateBar() {
    this.set('username', this.get('currentUser').get('username'));
    this.set('logged', this.get('currentUser').get('logged'));
  },

});

