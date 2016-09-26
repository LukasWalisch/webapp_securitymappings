import DS from 'ember-data';
import { storageFor } from 'ember-local-storage';

export default DS.RESTAdapter.extend({

  currentUser: storageFor('currentUser'),

  namespace: '',
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

  createRecord (store, type, snapshot) {
    this.set('namespace', 'user/admin');
    const promise = this._super(store, type, snapshot);
    this.set('namespace', '');
    return promise;
  },

  find: function(store, type, id) {
    return this._super(store, type, id);
  },

  deleteRecord (store, type, snapshot) {
    this.set('namespace', 'user/admin');
    const promise = this._super(store, type, snapshot);
    this.set('namespace', '');
    return promise;
  },

});
