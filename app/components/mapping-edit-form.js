import Ember from 'ember';

export default Ember.Component.extend({


  // currentUser and callback is handed over from parent component
  currentUser: null,
  callback: null,

  store: Ember.inject.service(),
  tactics: null,
  patterns: null,
  mappingInfo: null,
  selectedTactic: null,
  selectedPattern: null,
  headline: Ember.computed('selectedTactic', 'selectedPattern', function _headline() {
    const selectedTactic = this.get('selectedTactic');
    const selectedPattern = this.get('selectedPattern');
    if (selectedTactic && selectedPattern) {
      return selectedTactic.get('name') + ' - ' + selectedPattern.get('name');
    }
    return 'Neues Mapping';
  }),

  init() {
    this._super(...arguments);

    this.set('tactics', this.get('store').peekAll('tactic'));
    this.set('patterns', this.get('store').peekAll('pattern'));
  },

  actions: {

    clickOnTactic(tacticName) {
      if (tacticName === 'Auswählen...') {
        this.set('selectedTactic', null);
      } else {
        const selectedTactic = this.get('tactics').find((tactic) => {
          if (tactic.get('name') === tacticName) {
            return true;
          }
          return false;
        });
        this.set('selectedTactic', selectedTactic);
      }
    },

    clickOnPattern(patternName) {
      if (patternName === 'Auswählen...') {
        this.set('selectedPattern', null);
      } else {
        const selectedPattern = this.get('patterns').find((pattern) => {
          if (pattern.get('name') === patternName) {
            return true;
          }
          return false;
        });
        this.set('selectedPattern', selectedPattern);
      }
    },

    clickButtonSave() {
      debugger;
      if (!this.get('mappingInfo') || !this.get('selectedTactic') || !this.get('selectedPattern')) {
        return this.toast.error('Ungültige Eingaben\nSpeichern nicht möglich!', '', { closeButton: false, progressBar: false });
      }
      const newPattern = this.get('store').createRecord('mapping', {
        patternId: this.get('selectedPattern'),
        tacticId: this.get('selectedTactic'),
        owner: this.get('currentUser'),
        info: this.get('mappingInfo'),
        rating: 0,
        ratingNumb: 0,
      });
      return newPattern.save().then(() => {
        this.toast.success('Das Mapping wurde gespeichert!', '', { closeButton: false, progressBar: false });
        if (this.get('callback')) return this.get('callback')();
        return 0;
      }).catch(() => {
        this.toast.error('Speichern fehlgeschlagen\nBitte versuchen Sie es erneut', '', { closeButton: false, progressBar: false });
        if (this.get('callback')) return this.get('callback')();
        return 0;
      });
    },

  },

});
