import Ember from 'ember';
import dataConverter from '../utils/dataConverter';

export default Ember.Component.extend({

  /* properties */

  store: Ember.inject.service(),
  network: {},
  showOverview: false,
  nodeInfo: null,
  mappingsInfo: null,

  /* ḿethods */

  init() {
    this._super(...arguments);
    Ember.run.schedule('afterRender', this, function afterRender() {
      this.renderNetwork();
    });

  },

  /**
   * renders the Network of tactics and patterns with options
   * and registers on click listeners for nodes
   */
  renderNetwork() {

    const container = document.getElementById('visual-container');

    const tactics = this.convertToArray(this.get('store').peekAll('tactic'));
    const patterns = this.convertToArray(this.get('store').peekAll('pattern'));
    const mappings = this.convertToArray(this.get('store').peekAll('mapping'));

    const dataSet = dataConverter.dataToDataset(tactics, patterns, mappings);

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
          nodeSpacing: 250,
        },
      },
      interaction: {
        dragNodes: false,
        zoomView: false,
        dragView: false,
      },

    };

    // initialize network
    this.set('network', new vis.Network(container, dataSet, options));
    const network = this.get('network');

    // set listeners
    network.on('click', (event) => {

      // when node is clicked, the node is moving in center of window
      if (event.nodes.length > 0) {
        this.focusNode(event);

      // otherwise the overview of the network is shown
      } else {
        this.unFocusNode();
      }

    });
  },

  focusNode(event) {
    const network = this.get('network');
    if (event.nodes.length > 0) {
      const nodeId = event.nodes[0];
      let node = this.get('store').peekRecord('tactic', nodeId);

      // if node exists --> its a tactic
      if (!node) {

        // its a pattern
        node = this.get('store').peekRecord('pattern', nodeId);
      }
      network.focus(event.nodes[0], {
        scale: 1.0,
        offset: { x: 0, y: 0 },
        animation: true,
      });
      this.toggleTooltip(network);

      this.set('nodeInfo', node.get('info'));
      this.set('mappingsInfo', node.get('mappingIds'));
      this.set('showOverview', true);

      this.showContent();

    }
  },

  unFocusNode() {
    const network = this.get('network');
    network.fit({ animation: true });
    network.unselectAll();
    this.toggleTooltip(network);

    this.set('nodeInfo', null);
    this.set('mappingInfo', null);
    this.set('showOverview', false);
  },


  /**
   * when the network is zoomed to a node, the tooltips are switched off, otherwise turned on
   * @param  {vis network} network to get Information about the current scale
   * @return {void}         [description]
   */
  toggleTooltip(network) {

    // timeout to wait until the zooming of nodes is finished to check the scale
    window.setTimeout(() => {
      if (network.getScale() >= 1) {
        const tooltip = document.getElementsByClassName('vis-network-tooltip')[0];
        if (tooltip.className.indexOf(' hide') === -1) {
          tooltip.className += ' hide';
        }
      } else {
        document.getElementsByClassName('vis-network-tooltip')[0].className = 'vis-network-tooltip';
      }
    }, 1100);
  },


  /**
   * converts Array from Ember Store to JS Array
   * @param  {EmberArray} emberArray
   * @return {Array}
   */
  convertToArray(emberArray) {
    return emberArray.map((entry) => {
      const helper = entry.toJSON();
      helper.id = entry.id;
      return helper;
    });
  },

  /**
   * enables the view to mappings and info when a node is clicked
   * @return {void}
   */
  showContent() {
    document.getElementById('mapping').setAttribute('style', 'visibility:visible;');
    document.getElementById('pattern-info').setAttribute('style', 'visibility:visible;');
  },

  actions: {
    zoomOverview() {
      this.unFocusNode();
    },

  },


});
