import Ember from 'ember';

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
    const nodes = [
      { id: 1, label: 'a' },
      { id: 2, label: 'b' },
      { id: 3, label: 'c' },
    ];
    const edges = [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
    ];

    const container = document.getElementById('visual-container');
    const data = {
      nodes,
      edges,
    };

    const options = {
      height: '400px',
      width: '100%',
      nodes: {
        color: '#ff4000',
      },
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

    const network = new vis.Network(container, data, options);

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

    // new vis.Network(container, data, options);

  },


});
