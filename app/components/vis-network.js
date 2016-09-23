import { storageFor } from 'ember-local-storage';
import Ember from 'ember';
import dataConverter from '../utils/dataConverter';

export default Ember.Component.extend({

  /* properties */

  store: Ember.inject.service(),
  network: {},
  showOverview: false,
  nodeInfo: null,
  mappingsInfo: null,
  openModal: false,
  currentUser: storageFor('currentUser'),
  ratingComponent: null,
  currentMapping: null,

  /* ḿethods */

  init() {
    this._super(...arguments);
    Ember.run.schedule('afterRender', this, function afterRender() {
      this.renderNetwork();


      this.toast.error('testToast!', '', { closeButton: false, progressBar: false });
    });

  },

  renderRatings() {
    if (!this.get('mappingsInfo')) return;
    const mappings = this.get('mappingsInfo');
    let container;
    // let mappingRating;
    mappings.forEach((mapping) => {
      container = document.querySelector(`#rating-${mapping.get('id')}`);
      //  = Math.round(mapping.get('avgRating'));
      rating(container, 0, 5, false);
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
        animation: { duration: 500 },
      });

      setTimeout(() => {
        this.set('nodeInfo', node.get('info'));
        this.set('mappingsInfo', node.get('mappingIds'));
        this.set('showOverview', true);
        this.renderRatings();
        this.showContent();
        this.toggleTooltip(network);
      }, 550);


    }
  },

  unFocusNode() {
    const network = this.get('network');

    network.fit({
      animation: { duration: 500 },
    });

    network.unselectAll();
    this.toggleTooltip(network);

    this.set('nodeInfo', null);
    this.set('mappingsInfo', null);
    this.set('showOverview', false);
  },


  /**
   * when the network is zoomed to a node, the tooltips are switched off, otherwise turned on
   * @param  {vis network} network to get Information about the current scale
   * @return {void}         [description]
   */
  toggleTooltip(network) {

    if (network.getScale() >= 1) {
      const tooltip = document.getElementsByClassName('vis-network-tooltip')[0];
      if (tooltip.className.indexOf(' hide') === -1) {
        tooltip.className += ' hide';
      }
    } else {
      document.getElementsByClassName('vis-network-tooltip')[0].className = 'vis-network-tooltip';
    }
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

    doOpenModal(mapping) {
      this.set('currentMapping', mapping);
      this.set('openModal', true);
    },

    receiveRating(mappingId, userRating, isValid) {
      if (!isValid) {
        if (this.get('currentUser.logged')) {
          this.toast.error('Mappings können nur einmal bewertet werden', '', { closeButton: false, progressBar: false });
        } else {
          this.toast.error('Sie müssen sich einloggen, um Mappings zu bewerten', '', { closeButton: false, progressBar: false });
        }
      }
    },

  },


});
