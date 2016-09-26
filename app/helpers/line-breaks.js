import Ember from 'ember';

export function lineBreaks(text) {
  return new Ember.Handlebars.SafeString(text.replace(/\n/g, '<br>'));
}

export default Ember.Helper.helper(lineBreaks);
