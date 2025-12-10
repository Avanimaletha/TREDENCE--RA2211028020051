import { useState, useEffect } from 'react';

export default function StartNodeForm({ node, onChange }) {
  const [title, setTitle] = useState(node?.data?.title || '');
  const [metadata, setMetadata] = useState(node?.data?.metadata || []);

  useEffect(() => {
    setTitle(node?.data?.title || '');
    setMetadata(node?.data?.metadata || []);
  }, [node?.id]);

  useEffect(() => {
    onChange({ title, metadata });
  }, [title, metadata]);

  const addMeta = () => setMetadata((m) => [...m, { key: '', value: '' }]);
  const updateMeta = (idx, key, value) => {
    setMetadata((m) => m.map((item, i) => (i === idx ? { key, value } : item)));
  };
  const removeMeta = (idx) => setMetadata((m) => m.filter((_, i) => i !== idx));

  return (
    <div className="wf-form">
      <h3>Start Node</h3>
      <div className="wf-field">
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div style={{ marginTop: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong>Metadata</strong>
          <button className="wf-btn" onClick={addMeta}>Add</button>
        </div>
        {metadata.map((m, idx) => (
          <div key={idx} className="wf-kv">
            <input placeholder="key" value={m.key} onChange={(e) => updateMeta(idx, e.target.value, m.value)} />
            <input placeholder="value" value={m.value} onChange={(e) => updateMeta(idx, m.key, e.target.value)} />
            <button className="wf-btn wf-remove" onClick={() => removeMeta(idx)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
}
