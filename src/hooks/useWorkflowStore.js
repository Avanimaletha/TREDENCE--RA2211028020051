import { useCallback, useMemo, useState } from 'react';
import { nanoid } from 'nanoid/non-secure';
import { validateGraph } from '../utils/validators';
import { serializeGraph } from '../utils/workflowSerializer';

// Central store for workflow state
export default function useWorkflowStore(initial) {
  const [nodes, setNodes] = useState(initial?.nodes || []);
  const [edges, setEdges] = useState(initial?.edges || []);
  const [selectedNode, setSelectedNode] = useState(null);

  const addNode = useCallback((type, position = { x: 100, y: 100 }, data = {}) => {
    const id = nanoid(8);
    const node = { id, type, position, data: { title: `${type} ${id}`, ...data } };
    setNodes((prev) => [...prev, node]);
    return id;
  }, []);

  const removeNode = useCallback((id) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
    setEdges((prev) => prev.filter((e) => e.source !== id && e.target !== id));
    setSelectedNode((s) => (s?.id === id ? null : s));
  }, []);

  const addEdge = useCallback((source, target, label) => {
    const id = nanoid(10);
    const edge = { id, source, target, type: 'default', label };
    setEdges((prev) => [...prev, edge]);
    return id;
  }, []);

  const removeEdge = useCallback((id) => {
    setEdges((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const updateNodeConfig = useCallback((id, partial) => {
    setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...partial } } : n)));
  }, []);

  const setSelection = useCallback((node) => {
    setSelectedNode(node);
  }, []);

  const validateWorkflow = useCallback(() => {
    return validateGraph(nodes, edges);
  }, [nodes, edges]);

  const serializeWorkflow = useCallback(() => {
    return serializeGraph(nodes, edges);
  }, [nodes, edges]);

  const api = useMemo(
    () => ({
      nodes,
      edges,
      selectedNode,
      setNodes,
      setEdges,
      addNode,
      removeNode,
      addEdge,
      removeEdge,
      updateNodeConfig,
      setSelection,
      validateWorkflow,
      serializeWorkflow,
    }),
    [nodes, edges, selectedNode, addNode, removeNode, addEdge, removeEdge, updateNodeConfig, setSelection, validateWorkflow, serializeWorkflow]
  );

  return api;
}
