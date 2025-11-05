import type { Agent, CrewTemplate, LLMProvider, Tool } from './types';

export const initialAgents: Agent[] = [
  {
    id: 1,
    role: 'Senior Researcher',
    goal: 'Uncover cutting-edge developments in AI and data science',
    backstory: `You are a Senior Research Analyst at a top-tier tech think tank.
Your expertise lies in identifying emerging trends and technologies in AI.
You have a knack for dissecting complex data and presenting actionable insights.`,
    tools: ['SerperDevTool'],
  },
  {
    id: 2,
    role: 'Tech Content Strategist',
    goal: 'Craft compelling content on tech advancements',
    backstory: `You are a renowned Content Strategist, known for your insightful and engaging articles on technology.
You specialize in translating complex technical concepts into accessible and compelling narratives, helping your audience understand the future of technology.`,
    tools: [],
  }
];

export const LLM_OPTIONS: Record<LLMProvider, { models: string[] }> = {
    openai: {
        models: ['gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    },
    google: {
        models: ['gemini-2.5-pro', 'gemini-2.5-flash'],
    },
    ollama: {
        models: [], // User provides their own model string
    }
};

// FIX: Explicitly type AVAILABLE_TOOLS as Tool[] to ensure type safety for tool names.
export const AVAILABLE_TOOLS: Tool[] = [
    { name: 'SerperDevTool', descriptionKey: 'tooltip.tools.serperDevTool', package: 'google-search-results' },
    { name: 'ScrapeWebsiteTool', descriptionKey: 'tooltip.tools.scrapeWebsiteTool', package: 'beautifulsoup4' },
    { name: 'WebsiteSearchTool', descriptionKey: 'tooltip.tools.websiteSearchTool', package: 'duckduckgo-search' },
    { name: 'DirectoryReadTool', descriptionKey: 'tooltip.tools.directoryReadTool', package: '' },
    { name: 'FileReadTool', descriptionKey: 'tooltip.tools.fileReadTool', package: '' },
];

export const CREW_TEMPLATES: CrewTemplate[] = [
    {
        id: 'tech-blog-crew',
        nameKey: 'templates.techBlogCrew.name',
        descriptionKey: 'templates.techBlogCrew.description',
        llmConfig: { provider: 'openai', model: 'gpt-4o' }
    },
    {
        id: 'market-analysis-crew',
        nameKey: 'templates.marketAnalysisCrew.name',
        descriptionKey: 'templates.marketAnalysisCrew.description',
        llmConfig: { provider: 'openai', model: 'gpt-4o' }
    },
    {
        id: 'trip-planner-crew',
        nameKey: 'templates.tripPlannerCrew.name',
        descriptionKey: 'templates.tripPlannerCrew.description',
        llmConfig: { provider: 'google', model: 'gemini-2.5-flash' }
    },
    {
        id: 'financial-analyst-crew',
        nameKey: 'templates.financialAnalystCrew.name',
        descriptionKey: 'templates.financialAnalystCrew.description',
        llmConfig: { provider: 'openai', model: 'gpt-4-turbo' }
    }
];