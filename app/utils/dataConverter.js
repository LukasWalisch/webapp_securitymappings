/* globals:
    lodash as '_'

*/

const dataConverter = {

  dataToDataset(tactics, patterns, mappings) {

    const nodes = [];
    const edges = [];

    for (let tactic of tactics) {
      nodes.push({ id: tactic.id, label: tactic.name, color: 'green' });

      for (let childTacticId of tactic.childTacticIds) {
        edges.push({ from: tactic.id, to: childTacticId });
      }

    }

    for (let pattern of patterns) {
      nodes.push({ id: pattern.id, label: pattern.name, color: 'red' });
    }

    for (let mapping of mappings) {
      edges.push({ from: mapping.tacticId, to: mapping.patternId });
    }

    return { nodes, edges };
  },

};

export default dataConverter;
