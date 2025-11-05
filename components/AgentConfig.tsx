// FIX: Provide full implementation for the missing file.
import React, { useState, useEffect } from 'react';
import type { Agent, Task, LLMConfig, ApiKeys, CreationMode, CrewTemplate, ToolName, LLMProvider } from '../types';
import { initialAgents } from '../constants';
import { useLocalization } from '../hooks/useLocalization';
import { LLM_OPTIONS, AVAILABLE_TOOLS } from '../constants';
import AgentCard from './AgentCard';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import ApiKeyInstructionsModal from './ApiKeyInstructionsModal';
import ConfirmationModal from './ConfirmationModal';
import Tooltip from './Tooltip';

interface AgentConfigProps {
  mode: CreationMode | 'template';
  template?: CrewTemplate;
  onGenerate: (params: { agents: Agent[], tasks: Task[], llmConfig: LLMConfig, apiKeys: ApiKeys, field?: string }) => void;
  onStartOver: () => void;
}

// AgentModal implementation within AgentConfig
interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (agent: Agent) => void;
  agentToEdit?: Agent | null;
}

const AgentModal: React.FC<AgentModalProps> = ({ isOpen, onClose, onSave, agentToEdit }) => {
  const { t } = useLocalization();
  const [agent, setAgent] = useState<Omit<Agent, 'id'>>({ role: '', goal: '', backstory: '', tools: [] });

  useEffect(() => {
    if (agentToEdit) {
      setAgent(agentToEdit);
    } else {
      setAgent({ role: '', goal: '', backstory: '', tools: [] });
    }
  }, [agentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ ...agent, id: agentToEdit?.id || Date.now() });
    onClose();
  };

  const toggleTool = (toolName: ToolName) => {
    setAgent(prev => ({
      ...prev,
      tools: prev.tools.includes(toolName)
        ? prev.tools.filter(t => t !== toolName)
        : [...prev.tools, toolName]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">{agentToEdit ? t('agentConfig.editAgent') : t('agentConfig.createAgent')}</h2>
        </div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Form fields */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">{t('agentConfig.agent.role')}</label>
            <input type="text" value={agent.role} onChange={e => setAgent({ ...agent, role: e.target.value })} className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">{t('agentConfig.agent.goal')}</label>
            <textarea value={agent.goal} onChange={e => setAgent({ ...agent, goal: e.target.value })} rows={2} className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">{t('agentConfig.agent.backstory')}</label>
            <textarea value={agent.backstory} onChange={e => setAgent({ ...agent, backstory: e.target.value })} rows={3} className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{t('agentConfig.agent.tools')}</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TOOLS.map(tool => (
                <button key={tool.name} onClick={() => toggleTool(tool.name)} className={`px-3 py-1 text-sm rounded-full border transition-colors ${agent.tools.includes(tool.name) ? 'bg-primary-600 border-primary-500 text-white' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}>
                  {tool.name}
                </button>
              ))}
            </div>
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


const AgentConfig: React.FC<AgentConfigProps> = ({ mode, template, onGenerate, onStartOver }) => {
    const { t } = useLocalization();
    const [agents, setAgents] = useState<Agent[]>(initialAgents);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [llmConfig, setLlmConfig] = useState<LLMConfig>({ provider: 'openai', model: 'gpt-4o' });
    const [apiKeys, setApiKeys] = useState<ApiKeys>({ OPENAI_API_KEY: '', GOOGLE_API_KEY: '', SERPER_API_KEY: '' });
    const [field, setField] = useState('');

    const [isAgentModalOpen, setAgentModalOpen] = useState(false);
    const [agentToEdit, setAgentToEdit] = useState<Agent | null>(null);
    const [isTaskModalOpen, setTaskModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
    const [isApiModalOpen, setApiModalOpen] = useState(false);
    const [isConfirmStartOverOpen, setConfirmStartOverOpen] = useState(false);

    useEffect(() => {
        if (template) {
            setLlmConfig(template.llmConfig);
            // In a real app, we'd fetch template agents/tasks
            // For now, we just set the LLM
        }
    }, [template]);

    const handleAddAgent = () => {
        setAgentToEdit(null);
        setAgentModalOpen(true);
    };

    const handleEditAgent = (agent: Agent) => {
        setAgentToEdit(agent);
        setAgentModalOpen(true);
    };

    const handleDeleteAgent = (agentId: number) => {
        setAgents(agents.filter(a => a.id !== agentId));
        // Also remove tasks assigned to this agent
        setTasks(tasks.map(t => t.agentId === agentId ? { ...t, agentId: null } : t));
    };

    const handleSaveAgent = (agent: Agent) => {
        const index = agents.findIndex(a => a.id === agent.id);
        if (index > -1) {
            setAgents(agents.map(a => a.id === agent.id ? agent : a));
        } else {
            setAgents([...agents, agent]);
        }
    };

    const handleAddTask = () => {
        setTaskToEdit(null);
        setTaskModalOpen(true);
    };
    
    const handleEditTask = (task: Task) => {
        setTaskToEdit(task);
        setTaskModalOpen(true);
    };
    
    const handleDeleteTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId));
    };
    
    const handleSaveTask = (task: Task) => {
        const index = tasks.findIndex(t => t.id === task.id);
        if (index > -1) {
            setTasks(tasks.map(t => t.id === task.id ? task : t));
        } else {
            setTasks([...tasks, task]);
        }
    };
    
    const handleGenerateClick = () => {
        onGenerate({ agents, tasks, llmConfig, apiKeys, field });
    };

    const handleProviderChange = (provider: LLMProvider) => {
      const newModel = LLM_OPTIONS[provider].models[0] || '';
      setLlmConfig({ provider, model: newModel });
    }

    const renderManualMode = () => (
        <>
            {/* Agents Section */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{t('agentConfig.agents.title')}</h2>
                    <button onClick={handleAddAgent} className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                        {t('agentConfig.agents.add')}
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map(agent => <AgentCard key={agent.id} agent={agent} onEdit={handleEditAgent} onDelete={handleDeleteAgent} />)}
                </div>
            </div>

            {/* Tasks Section */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{t('agentConfig.tasks.title')}</h2>
                    <button onClick={handleAddTask} className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                        {t('agentConfig.tasks.add')}
                    </button>
                </div>
                <div className="space-y-4">
                    {tasks.length > 0 ? tasks.map(task => <TaskCard key={task.id} task={task} agents={agents} onEdit={handleEditTask} onDelete={handleDeleteTask} />) : <p className="text-gray-400 text-center py-4">{t('agentConfig.tasks.none')}</p>}
                </div>
            </div>
        </>
    );

    const renderSuggestMode = (isSingle: boolean) => (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">{isSingle ? t('agentConfig.single.title') : t('agentConfig.suggest.title')}</h2>
            <p className="text-gray-400 mb-6">{isSingle ? t('agentConfig.single.description') : t('agentConfig.suggest.description')}</p>
            <textarea
                value={field}
                onChange={e => setField(e.target.value)}
                placeholder={isSingle ? t('agentConfig.single.placeholder') : t('agentConfig.suggest.placeholder')}
                rows={4}
                className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            />
        </div>
    );


    return (
        <div className="space-y-12 animate-fade-in">
            {mode === 'manual' || mode === 'template' ? renderManualMode() : renderSuggestMode(mode === 'single')}

            {/* Config Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LLM Config */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">{t('agentConfig.llm.title')}</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">{t('agentConfig.llm.provider')}</label>
                            <select value={llmConfig.provider} onChange={e => handleProviderChange(e.target.value as LLMProvider)} className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2">
                                {Object.keys(LLM_OPTIONS).map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-gray-300 mb-1">{t('agentConfig.llm.model')}</label>
                            {llmConfig.provider === 'ollama' ? (
                                <input type="text" value={llmConfig.model} onChange={e => setLlmConfig({...llmConfig, model: e.target.value})} placeholder={t('agentConfig.llm.ollamaPlaceholder')} className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2" />
                            ) : (
                                <select value={llmConfig.model} onChange={e => setLlmConfig({...llmConfig, model: e.target.value})} className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2">
                                    {LLM_OPTIONS[llmConfig.provider].models.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            )}
                        </div>
                    </div>
                </div>

                {/* API Keys */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">{t('agentConfig.apiKeys.title')}</h2>
                        <button onClick={() => setApiModalOpen(true)} className="text-sm text-blue-400 hover:underline">{t('agentConfig.apiKeys.instructions')}</button>
                    </div>
                    <div className="space-y-4">
                        {Object.keys(apiKeys).map(key => (
                             <div key={key}>
                                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                                    {key}
                                    {key === 'SERPER_API_KEY' && 
                                        <Tooltip text={t('agentConfig.apiKeys.serperTooltip')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </Tooltip>
                                    }
                                </label>
                                <input type="password" value={apiKeys[key as keyof ApiKeys]} onChange={e => setApiKeys({...apiKeys, [key]: e.target.value})} className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 font-mono" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-6 pt-6 border-t border-gray-800">
                <button onClick={() => setConfirmStartOverOpen(true)} className="text-gray-400 hover:text-white transition-colors">{t('agentConfig.startOver')}</button>
                <button onClick={handleGenerateClick} className="bg-primary-600 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-primary-700 transition-transform transform hover:scale-105 shadow-lg shadow-primary-500/20">
                    {t('agentConfig.generate')}
                </button>
            </div>
            
            {/* Modals */}
            <AgentModal isOpen={isAgentModalOpen} onClose={() => setAgentModalOpen(false)} onSave={handleSaveAgent} agentToEdit={agentToEdit} />
            <TaskModal isOpen={isTaskModalOpen} onClose={() => setTaskModalOpen(false)} onSave={handleSaveTask} taskToEdit={taskToEdit} agents={agents} />
            <ApiKeyInstructionsModal isOpen={isApiModalOpen} onClose={() => setApiModalOpen(false)} />
            <ConfirmationModal 
                isOpen={isConfirmStartOverOpen}
                onClose={() => setConfirmStartOverOpen(false)}
                onConfirm={onStartOver}
                title={t('agentConfig.confirmStartOver.title')}
                message={t('agentConfig.confirmStartOver.message')}
                confirmButtonText={t('agentConfig.confirmStartOver.confirm')}
                cancelButtonText={t('common.cancel')}
            />
        </div>
    );
};

export default AgentConfig;
