import { useState, useEffect } from 'react';
import { fetchAutomations } from '../../../api/automations';

export default function AutomatedNodeForm({ node, onChange }) {
  const [title, setTitle] = useState(node?.data?.title || '');
  const [automationId, setAutomationId] = useState(node?.data?.automationId || '');
  const [params, setParams] = useState(node?.data?.params || {});
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    fetchAutomations().then(setCatalog);
  }, []);

  useEffect(() => {
    setTitle(node?.data?.title || '');
    setAutomationId(node?.data?.automationId || '');
    setParams(node?.data?.params || {});
  }, [node?.id]);

  useEffect(() => {
    onChange({ title, automationId, params });
  }, [title, automationId, params]);

  const selected = catalog.find((c) => c.id === automationId);

  const updateParam = (key, value) => setParams((p) => ({ ...p, [key]: value }));

  return (
    <div>
      <h3>Automated Node</h3>
      <label>Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>Automation
        <select value={automationId} onChange={(e) => setAutomationId(e.target.value)}>
          <option value="">Select automation</option>
          {catalog.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
      </label>
      {selected && (
        <div style={{ marginTop: 8 }}>
          <strong>Parameters</strong>
          {selected.params.map((p) => (
            <div key={p} style={{ display: 'flex', gap: 4, marginTop: 4 }}>
              <label style={{ width: 120 }}>{p}</label>
              <input value={params[p] || ''} onChange={(e) => updateParam(p, e.target.value)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
