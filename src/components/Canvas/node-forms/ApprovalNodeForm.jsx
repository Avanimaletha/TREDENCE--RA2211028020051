import { useState, useEffect } from 'react';

export default function ApprovalNodeForm({ node, onChange }) {
  const [title, setTitle] = useState(node?.data?.title || '');
  const [approverRole, setApproverRole] = useState(node?.data?.approverRole || '');
  const [autoApproveThreshold, setAutoApproveThreshold] = useState(node?.data?.autoApproveThreshold || 0);

  useEffect(() => {
    setTitle(node?.data?.title || '');
    setApproverRole(node?.data?.approverRole || '');
    setAutoApproveThreshold(node?.data?.autoApproveThreshold || 0);
  }, [node?.id]);

  useEffect(() => {
    onChange({ title, approverRole, autoApproveThreshold: Number(autoApproveThreshold) });
  }, [title, approverRole, autoApproveThreshold]);

  return (
    <div>
      <h3>Approval Node</h3>
      <label>Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>Approver Role
        <input value={approverRole} onChange={(e) => setApproverRole(e.target.value)} />
      </label>
      <label>Auto-Approve Threshold
        <input type="number" value={autoApproveThreshold} onChange={(e) => setAutoApproveThreshold(e.target.value)} />
      </label>
    </div>
  );
}
