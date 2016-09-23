import Ember from 'ember';

export function stringConcat(params) {
  const tactic = params[0];
  const pattern = params[1];

  return `${tactic} - ${pattern}`;
}

export default Ember.Helper.helper(stringConcat);
