import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('mappings');
  this.route('login');
  this.route('loggedIn');
  this.route('edit');
  this.route('notFound', { path: '/*wildcard' });
  this.route('newPattern');
});

export default Router;
