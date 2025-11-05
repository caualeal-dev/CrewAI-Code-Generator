// FIX: Provide full implementation for the missing file.
import React from 'react';
import type { Task, Agent } from '../types';

interface TaskCardProps {
  task: Task;
  agents: Agent[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, agents, onEdit, onDelete }) => {
  const assignedAgent = agents.find(a => a.id === task.agentId);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 flex items-start justify-between gap-4 group">
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-white mb-1">{task.name}</h3>
        <p className="text-sm text-gray-300 mb-3">{task.description}</p>
        <div className="text-xs text-gray-400">
          <span className="font-semibold">Assigned Agent: </span>
          {assignedAgent ? (
            <span className="bg-gray-700 text-primary-300 px-2 py-0.5 rounded-full border border-gray-600">
                {assignedAgent.role}
            </span>
          ) : (
            <span className="italic">Any</span>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(task)} className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg>
        </button>
        <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
