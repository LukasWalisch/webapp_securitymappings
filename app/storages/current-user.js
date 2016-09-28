import StorageObject from 'ember-local-storage/local/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    const initial = { id: null, username: 'Nicht eingeloggt', token: null };
    return initial;
  },
});

export default Storage;
