import Ember from 'ember';

export default Ember.Service.extend({

  accessToken: null,
  username: "No Username",


  getUsername() {
    return this.username;
  },

  authenticate(login, password, callback) {
    return Ember.$.ajax({
      method: "POST",
      url: "http://10.0.0.18:3000/login",
      data: {username: login, password: password}
    }).then((result)=>{
      if (result.errors){
        const err = result.errors.msg;
        return callback(err);
      }
      this.set('accessToken', result.user.token.token);
      this.set('username', result.user.username);
      let user = this.store.createRecord('user',{
        name: result.user.username,
        token: result.user.token.token,
        expires: result.user.token.expires,
      });
      user.save();
      return callback();
    });
  },

  invalidate(){
    this.set('accessToken', null);
    this.set('username', null);
  },

  test(){
    return Ember.$.ajax({
      method: "GET",
      headers: {"X-Access-Token" : "xaccesstoken"},
      url: "http://10.0.0.33:3000/patterns",
    }).then(()=>{
      console.log("Success")
    });
  },

  isAuthenticated: Ember.computed.bool('accessToken')
});
