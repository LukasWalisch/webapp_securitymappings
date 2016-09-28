import DS from 'ember-data';
import { storageFor } from 'ember-local-storage';


//Adapter for network Requests for the mapping Model
export default DS.RESTAdapter.extend({

  // Current User from local Storage. 
  currentUser: storageFor('currentUser'),

  // All calls go to root url of host
  namespace: '',
  host: 'https://10.0.0.4:8443',

  // Headers for the validation on the restserver. retrieved from the local storage 
  // x-key is the username and x-access-token the generated token from the server
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

  // Should not be neccasary to just call the super. Kept for testing.
  find(store, type, id) {
    return this._super(store, type, id);
  },

  // Switches Namespace from Adapter because only user can create Mappings
  // Switches back to standard Namespace after the promise is created on super
  // Sends a network request on /user/maping/:id (PUT)
  createRecord (store, type, snapshot) {
    this.set('namespace', 'user');
    const promise = this._super(store, type, snapshot);
    this.set('namespace', '');
    return promise;
  },

  // See createRecord
  // Sends a network request on /user/mapping/:id (DELETE)
  deleteRecord (store, type, snapshot) {
    this.set('namespace', 'user');
    const promise = this._super(store, type, snapshot);
    this.set('namespace', '');
    return promise;
  },

});
