import Ember from 'ember';

export default Ember.Controller.extend({


  patternList: null,


  init() {
    this._super(...arguments);

    const patterns = this.get('store').peekAll('pattern');
    this.set('patternList', patterns);
  },


  actions: {
    create() {
      const patternName = this.get('patternName');
      const patternInfo = this.get('patternInfo');

      if (!patternName || !patternInfo) return 0;

      const newPattern = this.get('store').createRecord('pattern', {
        info: patternInfo,
        name: patternName,
      });

      newPattern.save().then(() => {
        this.transitionToRoute('mappings');
      }).catch((err) => {
        this.transitionToRoute('mappings');
      });
    },

    delete(pattern) {
      pattern.destroyRecord().then(() => {
        this.transitionToRoute('mappings');
      }).catch((err) => {
        console.log(err);
        this.transitionToRoute('mappings');
      });
    },
  },
});
