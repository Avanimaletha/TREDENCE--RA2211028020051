import { Handle, Position } from 'reactflow';

export default function StartNode({ data, selected }) {
  return (
    <div className={`wf-node wf-node--start ${selected ? 'selected' : ''}`}>
      <div className="wf-node-title">Start</div>
      <div className="wf-node-sub">{data?.title}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
