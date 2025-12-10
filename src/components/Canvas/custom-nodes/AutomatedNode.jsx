import { Handle, Position } from 'reactflow';

export default function AutomatedNode({ data, selected }) {
  return (
    <div className={`wf-node wf-node--automated ${selected ? 'selected' : ''}`}>
      <div className="wf-node-title">Automated</div>
      <div className="wf-node-sub">{data?.title}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
