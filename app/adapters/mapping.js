import DS from 'ember-data';
import { storageFor } from 'ember-local-storage';

export default DS.RESTAdapter.extend({

  currentUser: storageFor('currentUser'),

  namespace: '',
  host: 'https://10.0.0.8:8443',
  headers: Ember.computed(function _headers() {
    const user = this.get('currentUser').get('username');
    const token = this.get('currentUser').get('token');
    return {
      'Content-Type': 'application/json',
      'x-key': user,
      'x-access-token': token,
    };
  }),

  // Override Method updateRecord
  // Set the namespace befor promise
  // Generate promise with the general implementation auf RESTAdapter.updateRecord()
  // Resett the Namespace
  // Return Promise
  updateRecord(store, type, snapshot) {
    this.set('namespace', 'user');
    const promise = this._super(store, type, snapshot);
    this.set('namespace', '');
    return promise;
  },

  find(store, type, id) {
    return this._super(store, type, id);
  },

  createRecord (store, type, snapshot) {
    this.set('namespace', 'user');
    const promise = this._super(store, type, snapshot);
    this.set('namespace', '');
    return promise;
  },

});
