import DS from 'ember-data';

export default DS.RESTAdapter.extend({

  host: 'https://10.0.0.8:8443',
  headers: {
    'Content-Type': 'application/json',
  },

});
