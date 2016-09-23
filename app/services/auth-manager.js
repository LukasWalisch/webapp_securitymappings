import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Service.extend({

  currentUser: storageFor('currentUser'),

  authenticate(login, password, host, callback) {
    if (!login || !password)callback('Username or Password wrong');
    return Ember.$.ajax({
      method: 'POST',
      url: host + '/login',
      data: { username: login, password },
    }).then((result) => {
      if (result.errors) {
        const err = result.errors.msg;
        return callback(err);
      }
      this.get('currentUser').set('id', result.user.id);
      this.get('currentUser').set('username', result.user.username);
      this.get('currentUser').set('token', result.user.token.token);
      this.get('currentUser').set('logged', true);
      return callback();
    });
  },

  register(login, password, host, callback) {
    if (!login || !password) callback('Fehler in übermittelten Daten');
    return Ember.$.ajax({
      method: 'POST',
      url: host + '/users',
      data: { username: login, password, info: 'likeAcharm' },
    }).then((result) => {
      if (result.errors) {
        const err = result.errors.msg;
        return callback(err);
      }
      return callback();
    });
  },
});
