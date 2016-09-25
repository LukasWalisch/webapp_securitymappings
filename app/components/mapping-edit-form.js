import Ember from 'ember';

export default Ember.Component.extend({


  // currentUser and callback is handed over from parent component
  currentUser: null,
  callback: null,

  // Mapping that needs to be displayed, can be changed from the parent component
  currentMapping: null,

  observeMappingChange: function changeMapping() {

    Ember.run.schedule('afterRender', this, function afterRender() {

      const currentMapping = this.get('currentMapping');
      if (currentMapping) {
        this.$('#tacticSelector').attr('disabled', true);
        this.$('#tacticSelector').val(currentMapping.get('tacticId.name'));

      this.$('#patternSelector').attr('disabled', false);
      this.$('#patternSelector').val('Auswählen...');
    }
        this.$('#patternSelector').attr('disabled', true);
        this.$('#patternSelector').val(currentMapping.get('patternId.name'));

        this.$('#deleteMapping').attr('disabled', false);

      } else {
        this.$('#tacticSelector').attr('disabled', false);
        this.$('#tacticSelector').val('Auswählen...');

        this.$('#patternSelector').attr('disabled', false);
        this.$('#patternSelector').val('Auswählen...');

        this.$('#deleteMapping').attr('disabled', true);

      }
    });

  }.observes('currentMapping'),

  store: Ember.inject.service(),

  tactics: null,
  patterns: null,

  mappingInfo: Ember.computed('currentMapping', function _info() {
    if (!this.get('currentMapping')) return null;
    return this.get('currentMapping').get('info');
  }),

  selectedTactic: Ember.computed('currentMapping', function _seleTactics() {
    if (!this.get('currentMapping')) return null;
    return this.get('currentMapping').get('tacticId');
  }),

  selectedPattern: Ember.computed('currentMapping', function _selePatterns() {
    if (!this.get('currentMapping')) return null;
    return this.get('currentMapping').get('patternId');
  }),

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
      }).catch((err) => {
        this.toast.error('Speichern fehlgeschlagen. Grund: \n' + err.errors.msg, '', { closeButton: false, progressBar: false });
        newPattern.rollbackAttributes();
        if (this.get('callback')) return this.get('callback')();
        return 0;
      });
    },

    clickButtonDelete() {
      if (!this.get('mappingInfo')) {
        return this.toast.error('Keine Info vorhanden\nLöschen nicht möglich!', '', { closeButton: false, progressBar: false });
      }
      this.get('currentMapping').destroyRecord();
    },

  },

});
