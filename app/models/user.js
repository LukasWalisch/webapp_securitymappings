import DS from 'ember-data';

export default DS.Model.extend({

  username: DS.attr('string'),
  ratedMappings: DS.hasMany('mapping', { async: true }),
  ownedMappings: DS.hasMany('mapping', { async: true, inverse: 'owner' }),
  ownedPatterns: DS.hasMany('pattern', { async: true }),
});
