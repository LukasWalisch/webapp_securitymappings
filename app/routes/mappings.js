import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      tactics: this.get('store').findAll('tactic'),

      // in the network should be only patterns with mappings
      patterns: this.get('store').query('pattern', {
        mappingIds: 'notEmpty',
      }),

      mappings: this.get('store').findAll('mapping'),
    });
  },

});
