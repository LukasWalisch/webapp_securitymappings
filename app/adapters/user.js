import DS from 'ember-data';
import { storageFor } from 'ember-local-storage';

 default DS.RESTAdapter.extend({

  // Retrieves current User from local store
  currentUser: storageFor('currentUser'),

  // All calls go to /user urls.
  namespace: 'user',
  host: 'https://10.0.0.4:8443',
  headers: Ember.computed(function() {
    const user = this.get('currentUser').get('username');
    const token = this.get('currentUser').get('token');
    return {
      'Content-Type': 'application/json',
      'x-key': user,
      'x-access-token': token,
    };
  }),

  updateRecord(store, type, snapshot) {
    return this._super(store, type, snapshot);
  },

  find: function(store, type, id) {
    return this._super(store, type, id);
  },

});
