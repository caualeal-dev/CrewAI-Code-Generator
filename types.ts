export type Language = 'en' | 'pt';

export type ToolName = 'SerperDevTool' | 'ScrapeWebsiteTool' | 'WebsiteSearchTool' | 'DirectoryReadTool' | 'FileReadTool';

export interface Tool {
    name: ToolName;
    descriptionKey: string;
    package: string;
}

export interface Agent {
    id: number;
    role: string;
    goal: string;
    backstory: string;
    tools: ToolName[];
}

export interface Task {
    id: number;
    name: string;
    description: string;
    agentId: number | null; // null means any agent can pick it up
}

export type LLMProvider = 'openai' | 'google' | 'ollama';

export interface LLMConfig {
    provider: LLMProvider;
    model: string;
}

export interface CrewTemplate {
    id: string;
    nameKey: string;
    descriptionKey: string;
    llmConfig: LLMConfig;
}

export type CreationMode = 'manual' | 'suggest' | 'single';

export interface ApiKeys {
    OPENAI_API_KEY?: string;
    GOOGLE_API_KEY?: string;
    SERPER_API_KEY?: string;
}

export interface GenerationParams {
    mode: CreationMode | 'template';
    agents: Agent[];
    tasks: Task[];
    field?: string; // For 'suggest' mode
    apiKeys: ApiKeys;
    llmConfig: LLMConfig;
    language: Language;
}

export interface GeneratedFile {
    file_path: string;
    content: string;
}

export interface GenerationResult {
    introduction: string;
    file_structure: string;
    files: GeneratedFile[];
    next_steps: string;
}