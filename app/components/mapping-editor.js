import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  authManager: Ember.inject.service(),
  currentUser: null,
  currentMapping: null,
  isLogged: false,
  mappingList: null,


  init() {
    this._super(...arguments);

    // check if currently logged in
    const host = this.get('store').adapterFor('application').get('host');
    this.get('authManager').checkLogged(host, (err, currentUser) => {
      if (!err) {
        this.set('isLogged', true);
        this.set('currentUser', currentUser);

        // when user is loaded, render the mappings list
        this.set('mappingList', this.get('currentUser.ownedMappings'));
      } else {
        this.set('isLogged', false);
        this.set('currentUser', null);

      }
    });
  },

  actions: {

    triggerNewMapping() {
      debugger;
    },

    triggerEditMapping() {
      this.set('currentMapping',"test");
    },

  },

});
