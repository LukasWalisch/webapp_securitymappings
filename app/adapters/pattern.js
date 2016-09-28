import DS from 'ember-data';
import { storageFor } from 'ember-local-storage';

export default DS.RESTAdapter.extend({

  // Retrieves current User from local store
  currentUser: storageFor('currentUser'),


  // Default Namespace for GET Requests on host.
  namespace: '',
  host: 'https://10.0.0.8:8443',
  headers: Ember.computed(function() {
    const user = this.get('currentUser').get('username');
    const token = this.get('currentUser').get('token');
    return {
      'Content-Type': 'application/json',
      'x-key': user,
      'x-access-token': token,
    };
  }),

  // Switches Namespace to /user for registered calls.
  createRecord (store, type, snapshot) {
    this.set('namespace', 'user/admin');
    const promise = this._super(store, type, snapshot);
    this.set('namespace', '');
    return promise;
  },

  // For testing. if deleted, Ember calls application adapter for Method.
  find (store, type, id) {
    return this._super(store, type, id);
  },

  // Switches Namespace and sends an delete to host.
  deleteRecord (store, type, snapshot) {
    this.set('namespace', 'user/admin');
    const promise = this._super(store, type, snapshot);
    this.set('namespace', '');
    return promise;
  },

});
