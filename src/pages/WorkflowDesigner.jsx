import { useState } from 'react';
import WorkflowCanvas from '../components/Canvas/WorkflowCanvas';
import WorkflowTester from '../components/TestingPanel/WorkflowTester';
import useWorkflowStore from '../hooks/useWorkflowStore';
import '../styles/workflow.css';

export default function WorkflowDesigner() {
  const store = useWorkflowStore({ nodes: [], edges: [] });
  const [showTester, setShowTester] = useState(false);

  return (
    <div className="wf-app">
      <div className="wf-header">
        <h2>HR Workflow Designer</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="wf-btn" onClick={() => setShowTester(true)}>Open Tester</button>
        </div>
      </div>
      <div className="wf-body">
        <WorkflowCanvas
          onSelectNode={(n) => store.setSelection(n)}
          onOpenTester={() => setShowTester(true)}
        />
      </div>
      {showTester && (
        <div className="wf-tester">
          <WorkflowTester nodes={store.nodes} edges={store.edges} onClose={() => setShowTester(false)} />
        </div>
      )}
    </div>
  );
}
