import StorageObject from 'ember-local-storage/local/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    const initial = { username: 'Not logged in', token: 'default', logged: false };
    return initial;
  },
});

export default Storage;
