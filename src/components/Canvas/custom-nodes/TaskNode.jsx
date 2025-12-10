import { Handle, Position } from 'reactflow';

export default function TaskNode({ data, selected }) {
  return (
    <div className={`wf-node wf-node--task ${selected ? 'selected' : ''}`}>
      <div className="wf-node-title">Task</div>
      <div className="wf-node-sub">{data?.title}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
