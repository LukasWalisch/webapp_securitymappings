import StorageObject from 'ember-local-storage/local/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    const initial = { id: null, username: 'Not logged in', token: null, logged: false };
    return initial;
  },
});

export default Storage;
