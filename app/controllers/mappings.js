import Ember from 'ember';
import dataConverter from '../utils/dataConverter';

export default Ember.Controller.extend({

  /*
    globals:
      document
      vis
  */

  init() {
    this._super();
    Ember.run.schedule('afterRender', this, function afterRender() {
      this.renderNetwork();
    });
  },

  renderNetwork() {

    let tactics;
    let patterns;
    let mappings;

    const promiseArray = [];

    promiseArray.push(this.get('store').findAll('tactic'));
    promiseArray.push(this.get('store').findAll('pattern'));
    promiseArray.push(this.get('store').findAll('mapping'));

    Ember.RSVP.all(promiseArray).then((results) => {

      tactics = this.convertToArray(results[0]);
      patterns = this.convertToArray(results[1]);
      mappings = this.convertToArray(results[2]);

      const dynamicData = dataConverter.dataToDataset(tactics, patterns, mappings);

      const options = {
        height: '400px',
        width: '100%',
        physics: {
          enabled: false,
        },
        manipulation: {
          enabled: false,
        },
        layout: {
          hierarchical: {
            enabled: true,
            sortMethod: 'directed',
          },
        },
        interaction: {
          dragNodes: false,
        },

      };

      const container = document.getElementById('visual-container');
      const network = new vis.Network(container, dynamicData, options);

      network.on('click', (event) => {

        // focus on a node should only be executed when a node is clicked
        if (event.nodes.length > 0) {
          network.focus(event.nodes[0], {
            scale: 1.0,
            offset: { x: 0, y: -100 },
            animation: true,
          });
        }

      });

    });

    // const nodes = [
    //   { id: 1, label: 'a' },
    //   { id: 2, label: 'b' },
    //   { id: 3, label: 'c' },
    // ];
    // const edges = [
    //   { from: 1, to: 2 },
    //   { from: 1, to: 3 },
    // ];

    // const data = {
    //   nodes,
    //   edges,
    // };

  },

  convertToArray(emberArray) {
    return emberArray.map((entry) => {
      const helper = entry.toJSON();
      helper.id = entry.id;
      return helper;
    });
  },

});
