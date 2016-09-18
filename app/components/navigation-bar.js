import Ember from 'ember';

export default Ember.Component.extend({

  authManager: Ember.inject.service('auth-manager'),

  username: 'Wrong Username',

  init() {
    this._super();
    Ember.run.schedule('afterRender', this, function afterRender() {
      this.set('username', this.get('authManager').getUsername());
    });
  },

  model() {
    return this.get('store').findAll('user');
  },

});
