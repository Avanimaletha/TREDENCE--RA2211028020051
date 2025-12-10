import { Handle, Position } from 'reactflow';

export default function ApprovalNode({ data, selected }) {
  return (
    <div className={`wf-node wf-node--approval ${selected ? 'selected' : ''}`}>
      <div className="wf-node-title">Approval</div>
      <div className="wf-node-sub">{data?.title}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
