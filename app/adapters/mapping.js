import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  
  namespace: '',
  host: 'https://10.0.0.8:8443',
  headers: {
    'Content-Type': 'application/json',
  },

  //Not final just an idea. Seems to work though.
  updateRecord(store, type, snapshot) {
    this.set('namespace', 'user');
    const promise = this._super(store, type, snapshot);
    this.set('namespace', '');
    return promise;
  },

  find: function(store, type, id) {
    console.log("find");
    return this._super(store, type, id);
  },
});
