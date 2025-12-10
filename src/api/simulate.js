// Local mock simulate API
export async function simulateWorkflow(workflowJson) {
  // Normally: const res = await fetch('/simulate', { method: 'POST', body: JSON.stringify(workflowJson) })
  // For now, simulate in-memory
  const steps = [];
  workflowJson.nodes.forEach((n) => {
    steps.push({ id: n.id, description: `Execute ${n.type}: ${n.data?.title || ''}` });
  });
  return { success: true, steps };
}
