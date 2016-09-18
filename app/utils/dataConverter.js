/* globals:
    lodash as '_'

*/

const dataConverter = {

  /**
   * converts normal arrays of tacitcs, patterns and mapping to a vis dataset
   * @return {Object} Dataset, Example:
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
   */
  dataToDataset(tactics, patterns, mappings) {

    const nodes = [];
    const edges = [];
    for (let tactic of tactics) {
      nodes.push({
        id: tactic.id,
        label: tactic.name,
        color: 'green',
        title: tactic.name,
      });
      for (let childTacticId of tactic.childTacticIds) {
        edges.push({ from: tactic.id, to: childTacticId });
      }
    }
    for (let pattern of patterns) {
      nodes.push({ id: pattern.id,
        label: pattern.name,
        color: 'red',
        title: pattern.name,
      });
    }
    for (let mapping of mappings) {
      edges.push({ from: mapping.tacticId, to: mapping.patternId });
    }
    return { nodes, edges };
  },

};

export default dataConverter;
