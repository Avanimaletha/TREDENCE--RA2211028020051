import { useMemo, useState } from 'react';
import { serializeGraph } from '../../utils/workflowSerializer';
import { validateGraph } from '../../utils/validators';
import { simulateWorkflow } from '../../api/simulate';

export default function WorkflowTester({ nodes, edges, onClose }) {
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);

  const payload = useMemo(() => serializeGraph(nodes, edges), [nodes, edges]);
  const validation = useMemo(() => validateGraph(nodes, edges), [nodes, edges]);

  const run = async () => {
    setRunning(true);
    const res = await simulateWorkflow(payload);
    setResult(res);
    setRunning(false);
  };

  return (
    <div style={{ position: 'fixed', right: 20, top: 20, width: 360, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, boxShadow: '0 8px 16px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Workflow Tester</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <div style={{ marginTop: 8 }}>
        <strong>Validation</strong>
        <div style={{ color: validation.valid ? '#10b981' : '#ef4444' }}>
          {validation.valid ? 'Valid' : validation.errors.join(', ')}
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <strong>Serialized</strong>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>{JSON.stringify(payload, null, 2)}</pre>
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={run} disabled={!validation.valid || running}>
          {running ? 'Running...' : 'Run Simulation'}
        </button>
      </div>
      {result && (
        <div style={{ marginTop: 8 }}>
          <strong>Execution Log</strong>
          <ul>
            {result.steps.map((s) => (
              <li key={s.id}>{s.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
