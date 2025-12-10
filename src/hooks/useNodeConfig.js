// Maps node types to default data and minimal schema hints used by forms
export const NODE_TYPES = {
  start: 'start',
  task: 'task',
  approval: 'approval',
  automated: 'automated',
  end: 'end',
};

export function getDefaultData(type) {
  switch (type) {
    case NODE_TYPES.start:
      return { title: 'Start', metadata: [] };
    case NODE_TYPES.task:
      return { title: 'Task', description: '', assignee: '', dueDate: '', customFields: [] };
    case NODE_TYPES.approval:
      return { title: 'Approval', approverRole: '', autoApproveThreshold: 0 };
    case NODE_TYPES.automated:
      return { title: 'Automation', automationId: '', params: {} };
    case NODE_TYPES.end:
      return { title: 'End', message: '', summary: true };
    default:
      return { title: type };
  }
}

export default function useNodeConfig() {
  return { NODE_TYPES, getDefaultData };
}
