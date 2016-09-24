import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({

  currentUser: storageFor('currentUser'),

  authManager: Ember.inject.service('authManager'),

  username: 'Not logged in',

  isLogged: false,

  actions: {
    logoff() {
      this.get('currentUser').reset();
      this.set('isLogged', false);
      this.updateBar();
      this.transitionToRoute('login');
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

    Ember.run.schedule('afterRender', this, function afterRender() {
      //this.set('username', this.get('currentUser').get('username'));
    });
  },

  updateBar(triggerLogged) {
    this.set('username', this.get('currentUser').get('username'));
    this.set('isLogged', triggerLogged);
  },

});

