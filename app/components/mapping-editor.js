import Ember from 'ember';

export default Ember.Component.extend({

  // ========== Properties ========== //

  store: Ember.inject.service(),
  authManager: Ember.inject.service(),
  currentUser: null,
  currentMapping: null,
  isLogged: false,
  mappingList: null,
  formIsShown: 'display: none;',

  // ========== Methods/Actions ========== //

  // Calls super init() to instantiate component.
  init() {
    this._super(...arguments);

    // check if currently logged in
    // Calls the authManager and gets the current User if user is logged in.
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

    // Gets called if the New Mapping Button in the Component is clicked.
    // Changes the form to new Mapping.
    triggerNewMapping() {
      this.set('formIsShown', 'display: block;');
      this.set('currentMapping', null);
    },

    // Gets called if a Mapping from the Component is clicked.
    // Changes the form to edit Mapping.
    triggerEditMapping(mapping) {
      this.set('formIsShown', 'display: block;');
      this.set('currentMapping', mapping);
    },

    // Hides the form to a blank page.
    hideEditForm() {
      this.set('formIsShown', 'display: none;');
    },

  },

});
