
const dataConverter = {

  /* globals:
      lodash as '_'

  */

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
    debugger;

    const nodes = [];
    const edges = [];

    _.forEach(tactics, (tactic) => {
      nodes.push({
        id: tactic.id,
        label: tactic.name,
        color: 'green',
        title: tactic.name,
      });

      _.forEach(tactic.childTacticIds, (childTacticId) => {
        edges.push({ from: tactic.id, to: childTacticId });
      });

    });

    _.forEach(mappings, (mapping) => {
      edges.push({ from: mapping.tacticId, to: mapping.patternId });
    });

    _.forEach(patterns, (pattern) => {
      nodes.push({ id: pattern.id,
        label: pattern.name,
        color: 'red',
        title: pattern.name,
      });
    });

    return { nodes, edges };
  },

};

export default dataConverter;
