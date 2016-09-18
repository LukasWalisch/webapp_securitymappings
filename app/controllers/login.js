import Ember from 'ember';

export default Ember.Controller.extend({

  authManager: Ember.inject.service('auth-manager'),

  test: 'test',

  actions: {
    authenticate() {
      const { login, password } = this.getProperties('login', 'password');
      this.get('authManager').authenticate(login, password, (err) => {
        if (err) console.log("Wrong credentials");
        else {
          console.log("Logged in with " + login);
        }
      });
    },
    identifyUser() {
      console.log(this.get('authManager').getUsername());
      return;
    },
  },
});
