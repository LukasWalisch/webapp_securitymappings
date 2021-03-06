// ========== Was replaced by edit route. Keept for testing ========== //

import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({

  currentUser: storageFor('currentUser'),

  authManager: Ember.inject.service('authManager'),

  navbar: Ember.inject.controller('navbar'),

  isLogged: false,

  host: '',

  mappings: '',

  init() {

    //Check if user is logged in
    this.set('host', this.store.adapterFor('application').get('host'));
    this.get('authManager').checkLogged(this.get('host'), (err) => {
      if (!err) this.set('isLogged', true);
      else this.set('isLogged', false);
    });

    this.refreshMappingList();
  },

  refreshMappingList() {
    const rawMappings = this.get('store').peekAll('mapping');
    const userId = this.get('currentUser').get('id');
    const mappingArray = [];
    rawMappings.forEach((mapping) => {
      if (mapping.toJSON().owner === userId) {
        const name = mapping.get('tacticId').get('name') + ' - ' + mapping.get('patternId').get('name');
        mappingArray.push(name);
      }
    });
    this.set('mappings', mappingArray);
  },

  convertToArray(emberArray) {
    return emberArray.map((entry) => {
      const helper = entry.toJSON();
      helper.id = entry.id;
      return helper;
    });
  },

  actions: {

    refreshMappingListAction() {
      this.refreshMappingList();
    },

    updateMappingTest() {
      this.get('store').findRecord('mapping', '57e543e4c1d2693a501a7176').then(function(mapping) {
        mapping.set('rating', 13);
        mapping.set('ratingNumb', 37);
        mapping.save();
      });
    },

    triggerNewMapping() {
      debugger;
    },

    triggerEditMapping() {
      debugger;
    }
  },
});
