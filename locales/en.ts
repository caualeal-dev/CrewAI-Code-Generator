// FIX: Provide full implementation for the missing file.
export const en = {
  header: {
    title: 'CrewForge AI',
    subtitle: 'Visually build, customize, and deploy autonomous AI agent crews with ease. From idea to code in minutes.',
    goHome: 'Go Home',
  },
  footer: {
    builtWith: 'Built with CrewAI & Gemini. Inspired by the work of João Moura.',
    sourceCode: 'Created by Cauã Leal',
  },
  welcomeScreen: {
    title: 'Welcome to CrewForge AI',
    description: 'The ultimate tool for creating and managing autonomous AI agent crews. Design your agents, define their tasks, and let CrewForge generate the complete Python code for you.',
    getStarted: 'Get Started',
    features: {
      visualBuilder: {
        title: 'Visual Builder',
        description: 'Design your crew with an intuitive drag-and-drop interface. No coding required to get started.',
      },
      codeGeneration: {
        title: 'Instant Code Generation',
        description: 'Automatically generate clean, production-ready Python code for your crewAI projects.',
      },
      templates: {
        title: 'Pre-built Templates',
        description: 'Start with a variety of templates for common use-cases like market analysis, trip planning, and more.',
      },
    },
  },
  modeSelection: {
    title: 'How do you want to create your crew?',
    description: 'Choose a method that best suits your needs. You can start from scratch, get a suggestion from AI, or use a pre-built template.',
    manual: {
      title: 'Manual Mode',
      description: 'Define every detail. You specify the agents, their tools, and the exact tasks they need to perform.',
    },
    suggest: {
      title: 'Suggest with AI',
      description: 'Describe your goal in plain English, and let AI suggest a crew structure for you.',
    },
    single: {
      title: 'Single-Agent Mode',
      description: 'For simpler tasks. Describe your goal and a single, powerful agent will be configured to handle it.',
    },
    templates: {
      title: 'Or start with a template',
      description: 'Select a pre-configured crew to get a head start on your project.',
    }
  },
  agentConfig: {
    editAgent: 'Edit Agent',
    createAgent: 'Create New Agent',
    agent: {
      role: 'Role',
      goal: 'Goal',
      backstory: 'Backstory',
      tools: 'Tools',
    },
    agents: {
      title: 'Configure Your Agents',
      add: 'Add Agent',
    },
    tasks: {
      title: 'Define Your Tasks',
      add: 'Add Task',
      none: 'No tasks defined yet. Add a task to get started.',
    },
    suggest: {
      title: 'Describe Your Crew\'s Goal',
      description: 'Explain what you want your crew to accomplish, and we\'ll generate the agents and tasks for you.',
      placeholder: 'e.g., "Plan a 7-day tech-focused trip to Japan, including flights, hotels, and a list of relevant tech events or companies to visit."',
    },
    single: {
      title: 'Describe Your Agent\'s Goal',
      description: 'Explain the single, primary objective for your agent.',
      placeholder: 'e.g., "Research the latest trends in artificial intelligence and write a summary report."',
    },
    llm: {
      title: 'LLM Configuration',
      provider: 'Provider',
      model: 'Model',
      ollamaPlaceholder: 'e.g., llama3',
    },
    apiKeys: {
      title: 'API Keys',
      instructions: 'How to get keys?',
      serperTooltip: 'Required for SerperDevTool (Google Search access).',
    },
    startOver: 'Start Over',
    generate: 'Generate Crew',
    confirmStartOver: {
      title: 'Are you sure?',
      message: 'This will clear your current configuration and return you to the welcome screen. All progress will be lost.',
      confirm: 'Yes, Start Over',
    },
  },
  taskModal: {
    editTask: 'Edit Task',
    createTask: 'Create New Task',
    name: 'Task Name',
    description: 'Description',
    agent: 'Assigned Agent',
    anyAgent: 'Any agent (delegated)',
  },
  apiKeyModal: {
    title: 'How to Get API Keys',
    closeButton: 'Got it, thanks!',
    openai: {
      title: 'OpenAI API Key (for GPT models)',
      description: 'An OpenAI API key is required to use models like GPT-4o, GPT-4, etc.',
      step1: 'Log in to your account at',
      step2: 'Navigate to the "API Keys" section in the left-hand menu.',
      step3: 'Click "Create new secret key".',
      step4: 'Copy the key and paste it into the OPENAI_API_KEY field.',
    },
    google: {
      title: 'Google API Key (for Gemini models)',
      description: 'A Google API Key is needed to use Gemini models.',
      step1: 'Go to',
      step2: 'Click on "Get API key".',
      step3: 'Click "Create API key in new project".',
      step4: 'Copy your generated key and paste it into the GOOGLE_API_KEY field.',
    },
    serper: {
      title: 'Serper API Key (for Google Search Tool)',
      description: 'The SerperDevTool requires this key for real-time Google Search access.',
      step1: 'Create an account at',
      step2: 'After signing up, you will be redirected to your dashboard.',
      step3: 'Your API key is available in the top right corner.',
      step4: 'Copy it and paste it into the SERPER_API_KEY field.',
    },
  },
  loadingScreen: {
    title: 'Forging Your Crew...',
    messages: [
      'Assembling agents...',
      'Defining complex tasks...',
      'Calibrating autonomous processes...',
      'Generating Python scripts...',
      'Structuring project files...',
      'Almost there, preparing for launch!',
    ],
  },
  resultDisplay: {
    title: 'Your AI Crew is Ready!',
    introduction: 'Below is your fully generated crewAI project. Follow the next steps to get it running on your local machine.',
    projectStructure: 'Project Structure',
    nextSteps: 'Next Steps',
    startOverButton: 'Create New Crew',
    downloadButton: 'Download .zip',
  },
  codeBlock: {
    copy: 'Copy',
    copied: 'Copied!',
  },
  languageSwitcher: {
    changeLanguage: 'Change language',
  },
  templates: {
    techBlogCrew: {
      name: 'Tech Blog Crew',
      description: 'A crew to research a topic and write a blog post.',
    },
    marketAnalysisCrew: {
      name: 'Market Analysis Crew',
      description: 'Analyzes market trends and competitors for a product.',
    },
    tripPlannerCrew: {
      name: 'Trip Planner Crew',
      description: 'Plans detailed travel itineraries based on your preferences.',
    },
    financialAnalystCrew: {
      name: 'Financial Analyst Crew',
      description: 'A crew for analyzing stock performance and market data.',
    },
  },
  tooltip: {
    tools: {
      serperDevTool: 'Provides real-time Google search capabilities for agents.',
      scrapeWebsiteTool: 'Scrapes content from a given URL. Useful for data extraction.',
      websiteSearchTool: 'Performs a semantic search on a website\'s content.',
      directoryReadTool: 'Allows agents to read files within a specified directory.',
      fileReadTool: 'Enables agents to read the content of a specific file.',
    },
  },
  common: {
    save: 'Save',
    cancel: 'Cancel',
  }
};
