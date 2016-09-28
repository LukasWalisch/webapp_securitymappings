import Ember from 'ember';

export default Ember.Controller.extend({

  authManager: Ember.inject.service('authManager'),

  host: null,

  init() {

    //Check if user is logged in
    this.set('host', this.store.adapterFor('application').get('host'));
    this.get('authManager').checkLogged(this.get('host'), (err) => {
      if (err) this.transitionToRoute('mappings');
    });
  },
});
