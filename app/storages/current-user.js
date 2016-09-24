import StorageObject from 'ember-local-storage/local/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    const initial = { id: null, username: 'Not logged in', token: null };
    return initial;
  },
});

export default Storage;
