import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      tactics: this.get('store').findAll('tactic'),
      patterns: this.get('store').findAll('pattern'),
      mappings: this.get('store').findAll('mapping'),
    });
  },

});
