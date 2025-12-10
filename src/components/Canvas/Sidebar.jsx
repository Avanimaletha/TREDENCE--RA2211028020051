import { NODE_TYPES, getDefaultData } from '../../hooks/useNodeConfig';

export default function Sidebar({ onAdd }) {
  const add = (type) => onAdd(type, undefined, getDefaultData(type));
  return (
    <div className="wf-sidebar">
      <h3>Nodes</h3>
      <button className="wf-list-btn wf-btn" onClick={() => add(NODE_TYPES.start)}>Start Node</button>
      <button className="wf-list-btn wf-btn" onClick={() => add(NODE_TYPES.task)}>Task Node</button>
      <button className="wf-list-btn wf-btn" onClick={() => add(NODE_TYPES.approval)}>Approval Node</button>
      <button className="wf-list-btn wf-btn" onClick={() => add(NODE_TYPES.automated)}>Automated Node</button>
      <button className="wf-list-btn wf-btn" onClick={() => add(NODE_TYPES.end)}>End Node</button>
      <p className="wf-muted">Click a node to edit details</p>
    </div>
  );
}
