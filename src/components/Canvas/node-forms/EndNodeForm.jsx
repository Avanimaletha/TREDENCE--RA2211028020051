import { useState, useEffect } from 'react';

export default function EndNodeForm({ node, onChange }) {
  const [title, setTitle] = useState(node?.data?.title || '');
  const [message, setMessage] = useState(node?.data?.message || '');
  const [summary, setSummary] = useState(Boolean(node?.data?.summary));

  useEffect(() => {
    setTitle(node?.data?.title || '');
    setMessage(node?.data?.message || '');
    setSummary(Boolean(node?.data?.summary));
  }, [node?.id]);

  useEffect(() => {
    onChange({ title, message, summary });
  }, [title, message, summary]);

  return (
    <div>
      <h3>End Node</h3>
      <label>Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>Message
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <input type="checkbox" checked={summary} onChange={(e) => setSummary(e.target.checked)} />
        Summary
      </label>
    </div>
  );
}
