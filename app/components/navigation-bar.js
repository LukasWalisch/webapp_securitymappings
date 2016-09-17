import Ember from 'ember';

export default Ember.Component.extend({

  init() {
    this._super(...arguments);
    this.set('test', 'Teststring');

  },

  test: 'Teststring',

  authManager: Ember.inject.service('authmanager'),

  username: this.get('authManager').getUsername(),


});
