import { useState, useEffect } from 'react';

export default function TaskNodeForm({ node, onChange }) {
  const [title, setTitle] = useState(node?.data?.title || '');
  const [description, setDescription] = useState(node?.data?.description || '');
  const [assignee, setAssignee] = useState(node?.data?.assignee || '');
  const [dueDate, setDueDate] = useState(node?.data?.dueDate || '');
  const [customFields, setCustomFields] = useState(node?.data?.customFields || []);

  useEffect(() => {
    setTitle(node?.data?.title || '');
    setDescription(node?.data?.description || '');
    setAssignee(node?.data?.assignee || '');
    setDueDate(node?.data?.dueDate || '');
    setCustomFields(node?.data?.customFields || []);
  }, [node?.id]);

  useEffect(() => {
    onChange({ title, description, assignee, dueDate, customFields });
  }, [title, description, assignee, dueDate, customFields]);

  const addField = () => setCustomFields((f) => [...f, { name: '', value: '' }]);
  const updateField = (idx, name, value) => setCustomFields((f) => f.map((it, i) => (i === idx ? { name, value } : it)));
  const removeField = (idx) => setCustomFields((f) => f.filter((_, i) => i !== idx));

  return (
    <div className="wf-form">
      <h3>Task Node</h3>
      <div className="wf-field">
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="wf-field">
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="wf-field">
        <label>Assignee</label>
        <input value={assignee} onChange={(e) => setAssignee(e.target.value)} />
      </div>
      <div className="wf-field">
        <label>Due Date</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>
      <div style={{ marginTop: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong>Custom Fields</strong>
          <button className="wf-btn" onClick={addField}>Add</button>
        </div>
        {customFields.map((m, idx) => (
          <div key={idx} className="wf-cf">
            <input placeholder="name" value={m.name} onChange={(e) => updateField(idx, e.target.value, m.value)} />
            <input placeholder="value" value={m.value} onChange={(e) => updateField(idx, m.name, e.target.value)} />
            <button className="wf-btn wf-remove" onClick={() => removeField(idx)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
}
