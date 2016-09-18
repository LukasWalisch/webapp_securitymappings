import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Service.extend({

  currentUser: storageFor('currentUser'),

  authenticate(login, password, callback) {
    return Ember.$.ajax({
      method: "POST",
      url: "http://10.0.0.8:3000/login",
      data: {username: login, password: password}
    }).then((result)=>{
      if (result.errors){
        const err = result.errors.msg;
        return callback(err);
      }
      this.set('username', result.user.username);
      this.get('currentUser').set('username', result.user.username);
      this.get('currentUser').set('token', result.user.token.token);
      this.get('currentUser').set('logged', true);
      return callback();
    });
  },
});
