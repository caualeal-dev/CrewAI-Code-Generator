// FIX: Provide full implementation for the missing file.
import { GoogleGenAI, Type } from "@google/genai";
import type { GenerationParams, GenerationResult, Agent, Task, ToolName } from '../types';
import { AVAILABLE_TOOLS } from '../constants';

// Helper to format agents for the prompt
const formatAgents = (agents: Agent[]): string => {
  if (!agents || agents.length === 0) return 'No agents defined.';
  return agents.map(agent => `
- Role: ${agent.role}
  - Goal: ${agent.goal}
  - Backstory: ${agent.backstory}
  - Tools: ${agent.tools.length > 0 ? agent.tools.join(', ') : 'None'}
`).join('');
};

// Helper to format tasks for the prompt
const formatTasks = (tasks: Task[], agents: Agent[]): string => {
  if (!tasks || tasks.length === 0) return 'No tasks defined.';
  return tasks.map(task => {
    const assignedAgent = agents.find(a => a.id === task.agentId);
    return `
- Name: ${task.name}
  - Description: ${task.description}
  - Assigned Agent: ${assignedAgent ? assignedAgent.role : 'Any'}
`;
  }).join('');
};

const getUniqueTools = (agents: Agent[]): ToolName[] => {
    const allTools = agents.flatMap(agent => agent.tools);
    return [...new Set(allTools)];
};

const getRequiredPackages = (tools: ToolName[]): string[] => {
    const packages = new Set<string>(['crewai', 'crewai-tools', 'python-dotenv']);
    tools.forEach(toolName => {
        const tool = AVAILABLE_TOOLS.find(t => t.name === toolName);
        if (tool?.package) {
            packages.add(tool.package);
        }
    });
    return Array.from(packages);
};

// Main prompt building function
const buildPrompt = (params: GenerationParams): string => {
  const { agents, tasks, mode, field, llmConfig, language } = params;
  
  const jsonStructure = `
You MUST reply with a single JSON object. Do not include any text, notes, or explanations outside of the JSON object.

The JSON object must have the following structure:
{
  "introduction": "A brief, welcoming introduction to the generated project.",
  "file_structure": "A string representing the directory tree of the generated files.",
  "files": [
    { "file_path": "path/to/file.ext", "content": "The full content of the file." }
  ],
  "next_steps": "A clear, concise list of next steps for the user to run their project."
}`;

  const commonInstructions = (packages: string[]) => `
**Language for all output:** ${language === 'pt' ? 'Brazilian Portuguese' : 'English'}

**LLM Configuration:**
- Provider: ${llmConfig.provider}
- Model: ${llmConfig.model}

**Required Python Packages:**
${packages.join('\n')}

**Instructions:**
1.  **Generate \`main.py\`:** This should be the entry point. It must instantiate the agents and tasks, create the Crew, and kick it off. It should handle the LLM setup based on the provider ('openai', 'google', 'ollama'). For 'ollama', make sure to include the model name in the LLM instantiation. The code should load API keys from a \`.env\` file.
2.  **Generate \`agents.py\`:** Define the agent instances here. Import any necessary tools from \`crewai_tools\`.
3.  **Generate \`tasks.py\`:** Define the task instances here, correctly associating them with agents.
4.  **Generate \`requirements.txt\`:** List all required Python packages: ${packages.join(', ')}.
5.  **Generate \`.env\`:** Include placeholders for necessary API keys (e.g., OPENAI_API_KEY, GOOGLE_API_KEY, SERPER_API_KEY) based on the LLM provider and tools used. Default to OPENAI_API_KEY if unsure.
6.  **Write an \`introduction\`:** Briefly explain what the generated crew does, in the target language.
7.  **Create a \`file_structure\` view:** A simple text-based tree (e.g., \`./\n|-- main.py\n|-- agents.py\`).
8.  **Provide \`next_steps\`:** Tell the user how to set up their environment (e.g., \`pip install -r requirements.txt\`), set API keys in \`.env\`, and run the project (\`python main.py\`), in the target language.

Adhere strictly to the JSON output format.
`;

  if (mode === 'manual' || mode === 'template') {
    const uniqueTools = getUniqueTools(agents);
    const requiredPackages = getRequiredPackages(uniqueTools);
    return `
You are an expert in crewAI, a framework for orchestrating autonomous AI agents.
Your task is to generate a complete, runnable crewAI project structure based on the user's detailed specifications.
${jsonStructure}

**Project Specifications:**

**Agents:**
${formatAgents(agents)}

**Tasks:**
${formatTasks(tasks, agents)}

${commonInstructions(requiredPackages)}
`;
  }

  if (mode === 'suggest' || mode === 'single') {
    const goal = mode === 'single'
      ? `A single autonomous agent to accomplish this goal: "${field}"`
      : `An autonomous crew of AI agents to accomplish this goal: "${field}"`;
    // Include all potentially useful packages for the LLM to choose from.
    const potentialPackages = getRequiredPackages(AVAILABLE_TOOLS.map(t => t.name));

    return `
You are an expert in crewAI, a framework for orchestrating autonomous AI agents.
Your task is to design a crewAI project from a single goal and generate all the necessary files.
${jsonStructure}

**Project Goal:**
${goal}

**Available Tools to use when designing agents:**
${AVAILABLE_TOOLS.map(t => t.name).join(', ')}

**Instructions for Designing the Crew:**
1.  Based on the **Project Goal**, design a set of 1-3 specialized AI agents. For 'single' mode, design exactly one agent.
2.  For each agent, define a clear **role**, **goal**, **backstory**, and select appropriate tools from the **Available Tools** list.
3.  Create a series of tasks that break down the main goal into a logical workflow.
4.  Assign each task to the most suitable agent.
5.  Based on your designed crew, generate the complete project files. The required packages will depend on the tools you select for the agents.

${commonInstructions(potentialPackages)}
`;
  }

  // Fallback for an unknown mode
  throw new Error(`Unknown generation mode: ${mode}`);
};


export const generateCrewCode = async (params: GenerationParams): Promise<GenerationResult> => {
    // FIX: Per guidelines, initialize GoogleGenAI with the API key from process.env.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    const prompt = buildPrompt(params);

    const modelName = 'gemini-2.5-pro';

    // FIX: Define the response schema to ensure the output matches the GenerationResult type.
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            introduction: { type: Type.STRING },
            file_structure: { type: Type.STRING },
            files: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        file_path: { type: Type.STRING },
                        content: { type: Type.STRING },
                    },
                    required: ['file_path', 'content'],
                }
            },
            next_steps: { type: Type.STRING },
        },
        required: ['introduction', 'file_structure', 'files', 'next_steps'],
    };

    try {
        // FIX: Call generateContent with the model name, prompt, and JSON config.
        const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        // FIX: Access the text property directly for the response.
        const resultText = response.text;
        const resultJson = JSON.parse(resultText);
        return resultJson as GenerationResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
           throw new Error(`Failed to generate crew code. Gemini API error: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the Gemini API.");
    }
};
