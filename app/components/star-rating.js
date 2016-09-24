import Ember from 'ember';

export default Ember.Component.extend({

  /* component attributes*/

  mayRate: true,
  maxRating: 5,
  mappingId: null,
  initialRating: null,
  numbRating: null,
  onClick: null,

  enabled: Ember.computed('onClick', function _enabled() {
    if (this.get('onClick')) {
      return true;
    }
    return false;
  }),

  avgRating: Ember.computed('numbRating', 'initialRating', function _avgRating() {
    return this.get('initialRating') / this.get('numbRating');
  }),

  stars: Ember.computed('initialRating', function _stars() {
    const maxRating = this.get('maxRating');
    const roundRating = Math.round(this.get('avgRating'));
    const starArray = [];
    for (let i = 0; i < maxRating; ++i) {
      if (i < roundRating) {
        starArray.push({ isFull: true, starRating: (i + 1) });
      } else {
        starArray.push({ isFull: false, starRating: (i + 1) });
      }
    }
    return starArray;
  }),

  actions: {
    starClicked(rating) {
      // send back id and rating to parent component
      if (this.get('onClick')) {
        this.get('onClick')(this.get('mappingId'), rating, this.get('mayRate'));
      }

      // if enabled, state is recalculated
      if (this.get('mayRate')) {
        this.set('numbRating', this.get('numbRating') + 1);
        this.set('initialRating', this.get('initialRating') + rating);
        this.set('mayRate', false);
      }
    },
  },


});
