import DS from 'ember-data';

export default DS.Model.extend({

  name: DS.attr('string'),
  info: DS.attr('string'),
  parentTacticId: DS.belongsTo('tactic', { async: true, inverse: 'parentTacticId' }),
  childTacticIds: DS.hasMany('tactic', { async: true, inverse: 'childTacticIds' }),
  mappingIds: DS.hasMany('mapping', { async: true }),

});
