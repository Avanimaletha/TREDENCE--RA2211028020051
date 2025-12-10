// Serialize nodes and edges to a portable workflow JSON
export function serializeGraph(nodes, edges) {
  return {
    version: 1,
    nodes: nodes.map((n) => ({ id: n.id, type: n.type, data: n.data })),
    edges: edges.map((e) => ({ id: e.id, source: e.source, target: e.target, label: e.label })),
  };
}
