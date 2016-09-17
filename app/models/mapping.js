import DS from 'ember-data';

export default DS.Model.extend({

  patternId: DS.belongsTo('pattern', { async: true }),
  tacticId: DS.belongsTo('tactic', { async: true }),
  info: DS.attr('string'),

});
