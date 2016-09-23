import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({

  currentUser: storageFor('currentUser'),

  navbar: Ember.inject.controller('navbar'),

  isLogged: Ember.computed(function isLogged() {
    return this.get('currentUser').get('logged');
  }),

  mappings: "",

  init() {
    const rawMappings = this.get('store').peekAll('mapping');
    const userId = this.get('currentUser').get('id');
    let mappingArray = new Array();
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
    logoff() {
      this.get('currentUser').reset();
      this.get('navbar').updateBar();
      this.transitionToRoute('login');
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
