import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from './nodeTypes';
import Sidebar from './Sidebar';
import useWorkflowStore from '../../hooks/useWorkflowStore';
import { validateGraph } from '../../utils/validators';

export default function WorkflowCanvas({ onSelectNode, onOpenTester }) {
  const store = useWorkflowStore({ nodes: [], edges: [] });

  // Use React Flow state as source of truth and sync back to store
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'default' }, eds)),
    [setEdges]
  );

  const addNode = (type, position, data) => {
    const id = store.addNode(type, position || { x: 100, y: 100 }, data);
    // Pull from store and update canvas state
    setNodes([...store.nodes]);
  };

  const onNodeClick = (event, node) => {
    store.setSelection(node);
    onSelectNode?.(node);
  };

  const onDeleteSelected = () => {
    const selectedNodes = nodes.filter((n) => n.selected).map((n) => n.id);
    const selectedEdges = edges.filter((e) => e.selected).map((e) => e.id);
    selectedNodes.forEach(store.removeNode);
    selectedEdges.forEach(store.removeEdge);
    setNodes([...store.nodes]);
    setEdges([...store.edges]);
  };

  const validate = () => {
    const res = validateGraph(store.nodes, store.edges);
    alert(res.valid ? 'Workflow valid' : `Invalid: ${res.errors.join(', ')}`);
  };

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: 0 }}>
      <Sidebar onAdd={addNode} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="wf-toolbar">
          <button className="wf-btn" onClick={onDeleteSelected}>Delete Selected</button>
          <button className="wf-btn" onClick={validate}>Validate</button>
          <button className="wf-btn" onClick={onOpenTester}>Open Tester</button>
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={(changes) => {
            onNodesChange(changes);
            // Sync to store as well
            store.setNodes(nodes);
          }}
          onEdgesChange={(changes) => {
            onEdgesChange(changes);
            store.setEdges(edges);
          }}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}
