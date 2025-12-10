import { Handle, Position } from 'reactflow';

export default function EndNode({ data, selected }) {
  return (
    <div className={`wf-node wf-node--end ${selected ? 'selected' : ''}`}>
      <div className="wf-node-title">End</div>
      <div className="wf-node-sub">{data?.title}</div>
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
