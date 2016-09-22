import DS from 'ember-data';

export default DS.Model.extend({

  patternId: DS.belongsTo('pattern', { async: true }),
  tacticId: DS.belongsTo('tactic', { async: true }),
  info: DS.attr('string'),
  rating: DS.attr(),
  ratingNumb: DS.attr(),
  avgRating: Ember.computed('rating', 'ratingNumb', function avgRating() {
    if (this.get('ratingNumb') === 0) {
      return 0;
    }
    return this.get('rating') / this.get('ratingNumb');
  }),

});
