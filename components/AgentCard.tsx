import React from 'react';
import type { Agent, ToolName } from '../types';
import { AVAILABLE_TOOLS } from '../constants';
import Tooltip from './Tooltip';
import { useLocalization } from '../hooks/useLocalization';

interface AgentCardProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
  onDelete: (agentId: number) => void;
}

const ToolBadge: React.FC<{ toolName: ToolName }> = ({ toolName }) => {
    const { t } = useLocalization();
    const tool = AVAILABLE_TOOLS.find(t => t.name === toolName);
    
    if (!tool) return null;

    const tooltipText = t(tool.descriptionKey);

    return (
        <Tooltip text={tooltipText}>
            <span className="bg-gray-700 text-primary-300 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-600 cursor-help">
                {toolName}
            </span>
        </Tooltip>
    )
};


const AgentCard: React.FC<AgentCardProps> = ({ agent, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 flex flex-col justify-between h-full group">
      <div>
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-white mb-1">{agent.role}</h3>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(agent)} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg>
                </button>
                <button onClick={() => onDelete(agent.id)} className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            </div>
        </div>
        <p className="text-sm text-gray-400 italic mb-3">&ldquo;{agent.goal}&rdquo;</p>
        <p className="text-sm text-gray-300 mb-4">{agent.backstory}</p>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Tools</h4>
        <div className="flex flex-wrap gap-2">
          {agent.tools.length > 0 ? (
            agent.tools.map(tool => <ToolBadge key={tool} toolName={tool} />)
          ) : (
            <p className="text-xs text-gray-500">No tools assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentCard;