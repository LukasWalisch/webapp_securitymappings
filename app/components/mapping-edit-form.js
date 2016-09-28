import Ember from 'ember';

export default Ember.Component.extend({

  // ========== Properties ========== //


  // currentUser and callback is handed over from parent component
  currentUser: null,
  callback: null,


  // True if a new Mapping is created, false if someone edits a Mapping;
  isNewMappingMode: true,

  // Mapping that needs to be displayed, can be changed from the parent component
  currentMapping: null,


  tactics: null,
  patterns: null,


  // This Property observes changes on the current Mapping.
  // If current Mapping changes, it updates the mapping-edit-form from new Mapping to edit Mapping and visa versa
  // Uses the jquery this.$ to access the html elements inside the component
  observeMappingChange: function changeMapping() {

    const currentMapping = this.get('currentMapping');
    if (currentMapping) {
      this.$('#tacticSelector').attr('disabled', true);
      this.$('#tacticSelector').val(currentMapping.get('tacticId.name'));

      this.$('#patternSelector').attr('disabled', true);
      this.$('#patternSelector').val(currentMapping.get('patternId.name'));

      this.set('isNewMappingMode', false);

    } else {
      this.$('#tacticSelector').attr('disabled', false);
      this.$('#tacticSelector').val('Auswählen...');

      this.$('#patternSelector').attr('disabled', false);
      this.$('#patternSelector').val('Auswählen...');

      this.set('isNewMappingMode', true);

    }
  }.observes('currentMapping'),

  store: Ember.inject.service(),


  // ========== Computed Fields ========= //

  // All following properties changes when currentMapping changes.
  // If currentMapping is null, all properties are set to null also.
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

  // Computed Headline from selected Tactic Name and selected pattern name
  headline: Ember.computed('selectedTactic', 'selectedPattern', function _headline() {
    const selectedTactic = this.get('selectedTactic');
    const selectedPattern = this.get('selectedPattern');
    if (selectedTactic && selectedPattern) {
      return selectedTactic.get('name') + ' - ' + selectedPattern.get('name');
    }
    return 'Neues Mapping';
  }),


  // ========== Actions and Methods ========== //

  // Calls super init() and retrieves tactics and patterns from the store.
  init() {
    this._super(...arguments);



    this.set('tactics', this.get('store').query('tactic', { filter: 'on' }));
    this.set('patterns', this.get('store').peekAll('pattern'));
  },

  // ========== Choose Tactic/Pattern from Component ========== //

  actions: {
    // If a tactic is clicked on the select dropdown in the component, the tactic propertys change.
    // If the default 'Auswählen...' is choosen, the properties go back to null.
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

    // If a pattern is clicked on the select dropdown in the component, the pattern properties change.
    // If the default 'Auswählen...' is choosen, the properties go back to null.
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

    // ========== Add/Put/Delete Mapping ========= //

    // Checks if all dields are set corretly.
    // Creates a new Mapping in the Store with the infos from the component and saves it to the host.
    // Returns a callback that is called from the parent Component to wait for the network to finish.
    // Shows Toast with info to let the user know if the saving was successfull or not
    clickButtonSave() {
      if (!this.get('mappingInfo') || !this.get('selectedTactic') || !this.get('selectedPattern')) {
        return this.toast.error('Ungültige Eingaben\nSpeichern nicht möglich!', '', { closeButton: false, progressBar: false });
      }
      // Create new Mappign with infos from Component.
      const newMapping = this.get('store').createRecord('mapping', {
        patternId: this.get('selectedPattern'),
        tacticId: this.get('selectedTactic'),
        owner: this.get('currentUser'),
        info: this.get('mappingInfo'),
        rating: 0,
        ratingNumb: 0,
      });
      this.set('currentMapping', null);
      // Saves the Mapping and returns the callback.
      return newMapping.save().then(() => {
        this.toast.success('Das Mapping wurde gespeichert!', '', { closeButton: false, progressBar: false });
        if (this.get('callback')) return this.get('callback')();
        return 0;
      }).catch((err) => {
        this.toast.error('Speichern fehlgeschlagen. Grund: \n' + err.errors.msg, '', { closeButton: false, progressBar: false });

        // Rollbacks the set attribute to previous state to keep it clean.
        newMapping.rollbackAttributes();
        if (this.get('callback')) return this.get('callback')();
        return 0;
      });
    },

    // Does the same as clickButtonSave but uses the updateRecord method.
    clickButtonEditSave() {
      if (!this.get('mappingInfo') || !this.get('currentMapping')) {
        return this.toast.error('Keine Info vorhanden\nEditieren nicht möglich!', '', { closeButton: false, progressBar: false });
      }
      // .save() on an existing model calls the updateRecord() and not the createRecord()
      return this.get('currentMapping').save().then(() => {
        this.toast.success('Das Mapping wurde gespeichert!', '', { closeButton: false, progressBar: false });
        if (this.get('callback')) return this.get('callback')();
        return 0;
      }).catch((err) => {
        this.toast.error('Speichern fehlgeschlagen.\n' + err.errors.msg, '', { closeButton: false, progressBar: false });
        if (this.get('callback')) return this.get('callback')();
        return 0;
      });
    },

    // Deletes a choosen Mapping from store and calls a network request to delete it on the backand
    clickButtonDelete() {
      return this.get('currentMapping').destroyRecord().then(() => {
        this.toast.success('Das Mapping wurde gelöscht', '', { closeButton: false, progressBar: false });
        if (this.get('callback')) return this.get('callback')();
        return 0;
      }).catch((err) => {
        this.toast.error('Löschen fehlgeschlagen. Grund: \n' + err, { closeButton: false, progressBar: false });
        if (this.get('callback')) return this.get('callback')();
        return 0;
      });
    },
  },
});
