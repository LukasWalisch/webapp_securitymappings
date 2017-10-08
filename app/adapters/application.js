import DS from 'ember-data';
import config from '../../config/environment';

export default DS.RESTAdapter.extend({


  // Default Adapter for all Request with no explicit Adapter
  host: 'https://' + config.backend + ':8443',
  headers: {
    'Content-Type': 'application/json',
  },

});
