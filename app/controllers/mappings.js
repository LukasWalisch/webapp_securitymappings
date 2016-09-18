import Ember from 'ember';
import dataConverter from '../utils/dataConverter';

export default Ember.Controller.extend({

  /*
    globals:
      document
      vis
  */

  /*
  properties
   */

  nodeInfo: null,
  currentMappings: null,
  hasMapping: false,

  /*
  methods
   */

  /**
   * fetches data from db and triggers renderNetwork
   */
  init() {
    this._super();
    Ember.run.schedule('afterRender', this, function afterRender() {
      // fetch data from db
      const promiseArray = [];
      promiseArray.push(this.get('store').findAll('tactic'));
      promiseArray.push(this.get('store').findAll('pattern'));
      promiseArray.push(this.get('store').findAll('mapping'));

      Ember.RSVP.all(promiseArray).then(() => {

        // when db fetches finished, render Network and enable tooltips
        this.renderNetwork();
      });
    });

  },

  /**
   * renders the Network of tactics and patterns with options
   * and registers on click listeners for nodes
   */
  renderNetwork() {

    const tactics = this.convertToArray(this.store.peekAll('tactic'));
    const patterns = this.convertToArray(this.store.peekAll('pattern'));
    const mappings = this.convertToArray(this.store.peekAll('mapping'));

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
      let node = this.store.peekRecord('tactic', nodeId);

      // if node exists --> its a tactic
      if (!node) {

        // its a pattern
        node = this.store.peekRecord('pattern', nodeId);
      }
      this.set('nodeInfo', node.toJSON().info);
      this.set('currentMappings', node.get('mappingIds'));
      this.showContent();

    } else {
      this.set('nodeInfo', null);
      this.set('currentMappings', null);
    }
  },

  toggleTooltip(network) {
    window.setTimeout(() => {
      if (network.getScale() === 1) {
        this.disableTooltip();
      } else {
        this.enableTooltip();
      }
    }, 2000);
  },


  /**
   * converts Array from Ember Store to Array
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
    * remove "display: none" to the tooltip css class
    * @return {void}
    */
  enableTooltip() {

    document.getElementsByClassName('vis-network-tooltip')[0].className = 'vis-network-tooltip';

  },

  /**
   * set "display: none" to the tooltip css class
   * @return {void}
   */
  disableTooltip() {

    document.getElementsByClassName('vis-network-tooltip')[0].className += ' hide';
  },

  showContent() {
    document.getElementById('mapping').setAttribute('style', 'visibility:visible;');
    document.getElementById('pattern-info').setAttribute('style', 'visibility:visible;');
  },

});
