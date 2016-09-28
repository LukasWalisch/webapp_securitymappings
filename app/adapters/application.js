import DS from 'ember-data';

export default DS.RESTAdapter.extend({


  // Default Adapter for all Request with no explicit Adapter
  host: 'https://10.0.0.8:8443',
  headers: {
    'Content-Type': 'application/json',
  },

});
