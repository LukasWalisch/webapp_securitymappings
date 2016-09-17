import DS from 'ember-data';

export default DS.Model.extend({

  name: DS.attr('string'),
  info: DS.attr('string'),
  relatedPatternIds: DS.hasMany('pattern', { async: true }),
  mappingIds: DS.hasMany('mapping', { async: true }),

});
