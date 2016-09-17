import Ember from 'ember';

export default Ember.Service.extend({

  init() {
    this._super(...arguments);
    this.set('accessToken', null);
    this.set('username', 'Not logged in');
  },

  accessToken: null,
  username: "No Username",


  getUsername() {
    return this.username;
  },

  authenticate(login, password) {
    return Ember.$.ajax({
      method: "POST",
      url: "http://10.0.0.33:3000/login",
      data: {username: login, password: password}
    }).then((result)=>{
      this.set('accessToken', result.user.token.token);
      this.set('username',result.user.username);
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
