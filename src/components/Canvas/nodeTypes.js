import StartNode from './custom-nodes/StartNode';
import TaskNode from './custom-nodes/TaskNode';
import ApprovalNode from './custom-nodes/ApprovalNode';
import AutomatedNode from './custom-nodes/AutomatedNode';
import EndNode from './custom-nodes/EndNode';

export const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};
