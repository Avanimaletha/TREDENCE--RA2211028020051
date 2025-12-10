// Local mock fetch for automations
export async function fetchAutomations() {
  // If MSW is running, this can be a real fetch('/automations')
  // For now, return local static data to avoid network dependency
  return [
    { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
    { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  ];
}
