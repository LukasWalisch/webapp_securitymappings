import Ember from 'ember';

export default Ember.Controller.extend({

  authManager: Ember.inject.service('auth-manager'),

  test: 'test',

  actions: {
    authenticate() {
      const { login, password } = this.getProperties('login', 'password');
      this.get('authManager').authenticate(login, password).then(() => {
        console.log('Logged in with ' + login);
      }, (err) => {
        console.log('Error while authenticate');
      });
    },
  },
});
