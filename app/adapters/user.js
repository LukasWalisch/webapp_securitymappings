import DS from 'ember-data';
import { storageFor } from 'ember-local-storage';
import config from '../config/environment';

export default DS.RESTAdapter.extend({

  // Retrieves current User from local store
  currentUser: storageFor('currentUser'),

  // All calls go to /user urls.
  namespace: 'user',
  host: 'https://' + config.backend + ':8443',
  headers: Ember.computed(function _headers() {
    const user = this.get('currentUser').get('username');
    const token = this.get('currentUser').get('token');
    return {
      'Content-Type': 'application/json',
      'x-key': user,
      'x-access-token': token,
    };
  }),

});
