// Basic validation helpers for the workflow graph

export function hasSingleStart(nodes) {
  const count = nodes.filter((n) => n.type === 'start').length;
  return count === 1;
}

export function hasEnd(nodes) {
  return nodes.some((n) => n.type === 'end');
}

export function hasNoCycles(nodes, edges) {
  // Simple cycle detection using DFS
  const adj = new Map();
  nodes.forEach((n) => adj.set(n.id, []));
  edges.forEach((e) => {
    if (adj.has(e.source)) adj.get(e.source).push(e.target);
  });

  const visited = new Set();
  const stack = new Set();

  const dfs = (nodeId) => {
    if (stack.has(nodeId)) return true; // cycle
    if (visited.has(nodeId)) return false;
    visited.add(nodeId);
    stack.add(nodeId);
    for (const next of adj.get(nodeId) || []) {
      if (dfs(next)) return true;
    }
    stack.delete(nodeId);
    return false;
  };

  for (const n of nodes) {
    if (dfs(n.id)) return false;
  }
  return true;
}

export function validateGraph(nodes, edges) {
  const errors = [];
  if (!hasSingleStart(nodes)) errors.push('Workflow must contain exactly one Start node');
  if (!hasEnd(nodes)) errors.push('Workflow must contain at least one End node');
  if (!hasNoCycles(nodes, edges)) errors.push('Workflow must not contain cycles');
  return { valid: errors.length === 0, errors };
}
