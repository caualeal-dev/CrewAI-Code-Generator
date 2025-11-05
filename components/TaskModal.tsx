// FIX: Provide full implementation for the missing file.
import React, { useState, useEffect } from 'react';
import type { Task, Agent } from '../types';
import { useLocalization } from '../hooks/useLocalization';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  taskToEdit?: Task | null;
  agents: Agent[];
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, taskToEdit, agents }) => {
  const { t } = useLocalization();
  const [task, setTask] = useState<Omit<Task, 'id'>>({ name: '', description: '', agentId: null });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      setTask({ name: '', description: '', agentId: agents[0]?.id || null });
    }
  }, [taskToEdit, isOpen, agents]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ ...task, id: taskToEdit?.id || Date.now() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">{taskToEdit ? t('taskModal.editTask') : t('taskModal.createTask')}</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">{t('taskModal.name')}</label>
            <input 
              type="text" 
              value={task.name} 
              onChange={e => setTask({ ...task, name: e.target.value })} 
              className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">{t('taskModal.description')}</label>
            <textarea 
              value={task.description} 
              onChange={e => setTask({ ...task, description: e.target.value })} 
              rows={4} 
              className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">{t('taskModal.agent')}</label>
            <select 
              value={task.agentId ?? ''} 
              onChange={e => setTask({ ...task, agentId: e.target.value ? Number(e.target.value) : null })} 
              className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">{t('taskModal.anyAgent')}</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>{agent.role}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="p-4 bg-gray-900/50 flex justify-end gap-4 border-t border-gray-700">
          <button onClick={onClose} className="bg-gray-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-500">{t('common.cancel')}</button>
          <button onClick={handleSave} className="bg-primary-600 font-bold py-2 px-6 rounded-lg hover:bg-primary-700">{t('common.save')}</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
