import Ember from 'ember';
import dataConverter from '../utils/dataConverter';

export default Ember.Component.extend({

  store: Ember.inject.service(),

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

    const tactics = this.convertToArray(this.get('store').peekAll('tactic'));
    const patterns = this.convertToArray(this.get('store').peekAll('pattern'));
    const mappings = this.convertToArray(this.get('store').peekAll('mapping'));

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
          nodeSpacing: 200,
        },
      },
      interaction: {
        dragNodes: false,
        zoomView: false,
        dragView: false,
      },

    };

    const container = document.getElementById('visual-container');
    const network = new vis.Network(container, dynamicData, options);
    this.set('initialScale', network.getScale);

    network.on('click', (event) => {

      this.toggleTooltip(network);

      // displays the info of the current selection in the info section
      this.displayNodeData(event);

      if (event.nodes.length > 0) {
        // when node is clicked, the node is moving in center of window
        network.focus(event.nodes[0], {
          scale: 1.0,
          offset: { x: 0, y: 0 },
          animation: true,
        });
      } else {
        network.fit({ animation: true });
      }

    });
  },

  /**
   * changes the state of the property nodeInfo and currentMappings
   * to the info of a clicked node
   * @param  {vis event} event
   */
  displayNodeData(event) {
    if (event.nodes.length > 0) {
      const nodeId = event.nodes[0];
      let node = this.get('store').peekRecord('tactic', nodeId);

      // if node exists --> its a tactic
      if (!node) {

        // its a pattern
        node = this.get('store').peekRecord('pattern', nodeId);
      }
      this.set('nodeInfo', node.toJSON().info);
      this.set('currentMappings', node.get('mappingIds'));
      this.showContent();

    } else {
      this.set('nodeInfo', null);
      this.set('currentMappings', null);
    }
  },

  /**
   * when the network is zoomed to a node, the tooltips are switched off, otherwise turned on
   * @param  {vis network} network to get Information about the current scale
   * @return {void}         [description]
   */
  toggleTooltip(network) {

    // timeout to wait until the zooming of nodes is finished to check the scale
    window.setTimeout(() => {
      if (network.getScale() === 1) {
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
});
