import DS from 'ember-data';

export default DS.Model.extend({

  username: DS.attr('string'),
  token: DS.attr(),
  ratedMappings: DS.hasMany('mapping', { async: true }),
  ownedMappings: DS.hasMany('mapping', { async: true }),
  ownedPatterns: DS.hasMany('pattern', { async: true }),
});
