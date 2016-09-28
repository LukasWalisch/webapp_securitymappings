import Ember from 'ember';

export default Ember.Controller.extend({


  // ========= Very messy controller. Can only be accessed by admin ======== //
  // =========  Confusing by default to fuck with possible Attackes ======== //

  patternList: null,

  authManager: Ember.inject.service('authManager'),


  init() {
    this._super(...arguments);

    const patterns = this.get('store').peekAll('pattern');
    this.set('patternList', patterns);
    this.get('authManager').checkAdmin((err) => {
        if (err) {
          this.toast.error(err, '', { closeButton: false, progressBar: false });
          this.transitionToRoute('mappings');
        }
    });
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
      }).catch(() => {
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
