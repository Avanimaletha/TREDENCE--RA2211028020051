// Minimal MSW setup (optional). If MSW isn't installed, this is inert.
// You can wire this by importing in main.jsx and calling startMockServer().

export function startMockServer() {
  // Lazy import to avoid bundler errors if msw not installed
  try {
    // eslint-disable-next-line no-undef
    const { setupWorker, rest } = require('msw');
    const worker = setupWorker(
      rest.get('/automations', (req, res, ctx) => {
        return res(
          ctx.json([
            { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
            { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
          ])
        );
      }),
      rest.post('/simulate', async (req, res, ctx) => {
        const body = await req.json();
        const steps = (body.nodes || []).map((n) => ({ id: n.id, description: `Execute ${n.type}: ${n.data?.title || ''}` }));
        return res(ctx.json({ success: true, steps }));
      })
    );
    worker.start();
  } catch (e) {
    // MSW not installed — skip
    // console.warn('MSW not available, using local mocks');
  }
}
