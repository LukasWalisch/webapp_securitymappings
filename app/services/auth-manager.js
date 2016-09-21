import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Service.extend({

  currentUser: storageFor('currentUser'),

  authenticate(login, password, callback) {
    return Ember.$.ajax({
      method: "POST",
      url: "http://10.0.0.4:3000/login",
      data: {username: login, password: password}
    }).then((result)=>{
      debugger;
      if (result.errors){
        const err = result.errors.msg;
        return callback(err);
      }
      this.get('currentUser').set('username', result.user.username);
      this.get('currentUser').set('token', result.user.token.token);
      this.get('currentUser').set('logged', true);
      return callback();
    });
  },

  register(login, password, callback) {
    return Ember.$.ajax({
      method: 'POST',
      url: 'http://10.0.0.4.3000/users',
      data: {username: login, password: password, info: 'likeAcharm'}
    }).then((result)=>{
      if (result.errors){
        const err = result.errors.msg;
        return callback(err);
      }
      return callback();
    });
  },
});
