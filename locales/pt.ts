// FIX: Provide full implementation for the missing file.
export const pt = {
  header: {
    title: 'CrewForge AI',
    subtitle: 'Construa, personalize e implante equipes de agentes de IA autônomos visualmente com facilidade. Da ideia ao código em minutos.',
    goHome: 'Início',
  },
  footer: {
    builtWith: 'Construído com CrewAI & Gemini. Inspirado no trabalho de João Moura.',
    sourceCode: 'Criado por Cauã Leal',
  },
  welcomeScreen: {
    title: 'Bem-vindo ao CrewForge AI',
    description: 'A ferramenta definitiva para criar e gerenciar equipes de agentes de IA autônomos. Projete seus agentes, defina suas tarefas e deixe o CrewForge gerar o código Python completo para você.',
    getStarted: 'Começar',
    features: {
      visualBuilder: {
        title: 'Construtor Visual',
        description: 'Projete sua equipe com uma interface intuitiva de arrastar e soltar. Nenhum código é necessário para começar.',
      },
      codeGeneration: {
        title: 'Geração de Código Instantânea',
        description: 'Gere automaticamente código Python limpo e pronto para produção para seus projetos crewAI.',
      },
      templates: {
        title: 'Modelos Prontos',
        description: 'Comece com uma variedade de modelos para casos de uso comuns, como análise de mercado, planejamento de viagens e mais.',
      },
    },
  },
  modeSelection: {
    title: 'Como você quer criar sua equipe?',
    description: 'Escolha o método que melhor se adapta às suas necessidades. Você pode começar do zero, obter uma sugestão da IA ou usar um modelo pronto.',
    manual: {
      title: 'Modo Manual',
      description: 'Defina todos os detalhes. Você especifica os agentes, suas ferramentas e as tarefas exatas que eles precisam executar.',
    },
    suggest: {
      title: 'Sugerir com IA',
      description: 'Descreva seu objetivo em linguagem natural e deixe a IA sugerir uma estrutura de equipe para você.',
    },
    single: {
      title: 'Modo de Agente Único',
      description: 'Para tarefas mais simples. Descreva seu objetivo e um único agente poderoso será configurado para lidar com isso.',
    },
    templates: {
      title: 'Ou comece com um modelo',
      description: 'Selecione uma equipe pré-configurada para ter um ponto de partida em seu projeto.',
    }
  },
  agentConfig: {
    editAgent: 'Editar Agente',
    createAgent: 'Criar Novo Agente',
    agent: {
      role: 'Função',
      goal: 'Objetivo',
      backstory: 'História de Fundo',
      tools: 'Ferramentas',
    },
    agents: {
      title: 'Configure Seus Agentes',
      add: 'Adicionar Agente',
    },
    tasks: {
      title: 'Defina Suas Tarefas',
      add: 'Adicionar Tarefa',
      none: 'Nenhuma tarefa definida ainda. Adicione uma tarefa para começar.',
    },
    suggest: {
      title: 'Descreva o Objetivo da Sua Equipe',
      description: 'Explique o que você quer que sua equipe realize, e nós geraremos os agentes e tarefas para você.',
      placeholder: 'Ex: "Planejar uma viagem de 7 dias focada em tecnologia para o Japão, incluindo voos, hotéis e uma lista de eventos ou empresas de tecnologia relevantes para visitar."',
    },
    single: {
      title: 'Descreva o Objetivo do Seu Agente',
      description: 'Explique o objetivo único e principal para o seu agente.',
      placeholder: 'Ex: "Pesquisar as últimas tendências em inteligência artificial e escrever um relatório resumido."',
    },
    llm: {
      title: 'Configuração do LLM',
      provider: 'Provedor',
      model: 'Modelo',
      ollamaPlaceholder: 'Ex: llama3',
    },
    apiKeys: {
      title: 'Chaves de API',
      instructions: 'Como obter as chaves?',
      serperTooltip: 'Necessário para a SerperDevTool (acesso à Pesquisa Google).',
    },
    startOver: 'Recomeçar',
    generate: 'Gerar Equipe',
    confirmStartOver: {
      title: 'Você tem certeza?',
      message: 'Isso limpará sua configuração atual e o retornará à tela de boas-vindas. Todo o progresso será perdido.',
      confirm: 'Sim, Recomeçar',
    },
  },
  taskModal: {
    editTask: 'Editar Tarefa',
    createTask: 'Criar Nova Tarefa',
    name: 'Nome da Tarefa',
    description: 'Descrição',
    agent: 'Agente Designado',
    anyAgent: 'Qualquer agente (delegado)',
  },
  apiKeyModal: {
    title: 'Como Obter Chaves de API',
    closeButton: 'Entendi, obrigado!',
    openai: {
      title: 'Chave de API da OpenAI (para modelos GPT)',
      description: 'Uma chave de API da OpenAI é necessária para usar modelos como GPT-4o, GPT-4, etc.',
      step1: 'Faça login na sua conta em',
      step2: 'Navegue até a seção "API Keys" no menu à esquerda.',
      step3: 'Clique em "Create new secret key".',
      step4: 'Copie a chave e cole-a no campo OPENAI_API_KEY.',
    },
    google: {
      title: 'Chave de API do Google (para modelos Gemini)',
      description: 'Uma Chave de API do Google é necessária para usar os modelos Gemini.',
      step1: 'Acesse',
      step2: 'Clique em "Get API key".',
      step3: 'Clique em "Create API key in new project".',
      step4: 'Copie sua chave gerada e cole-a no campo GOOGLE_API_KEY.',
    },
    serper: {
      title: 'Chave de API da Serper (para a Ferramenta de Pesquisa Google)',
      description: 'A SerperDevTool requer esta chave para acesso em tempo real à Pesquisa Google.',
      step1: 'Crie uma conta em',
      step2: 'Após se registrar, você será redirecionado para o seu painel.',
      step3: 'Sua chave de API está disponível no canto superior direito.',
      step4: 'Copie-a e cole-a no campo SERPER_API_KEY.',
    },
  },
  loadingScreen: {
    title: 'Forjando Sua Equipe...',
    messages: [
      'Montando agentes...',
      'Definindo tarefas complexas...',
      'Calibrando processos autônomos...',
      'Gerando scripts Python...',
      'Estruturando arquivos do projeto...',
      'Quase lá, preparando para o lançamento!',
    ],
  },
  resultDisplay: {
    title: 'Sua Equipe de IA está Pronta!',
    introduction: 'Abaixo está o seu projeto crewAI totalmente gerado. Siga os próximos passos para executá-lo em sua máquina local.',
    projectStructure: 'Estrutura do Projeto',
    nextSteps: 'Próximos Passos',
    startOverButton: 'Criar Nova Equipe',
    downloadButton: 'Baixar .zip',
  },
  codeBlock: {
    copy: 'Copiar',
    copied: 'Copiado!',
  },
  languageSwitcher: {
    changeLanguage: 'Mudar idioma',
  },
  templates: {
    techBlogCrew: {
      name: 'Equipe de Blog de Tecnologia',
      description: 'Uma equipe para pesquisar um tópico e escrever um post de blog.',
    },
    marketAnalysisCrew: {
      name: 'Equipe de Análise de Mercado',
      description: 'Analisa tendências de mercado e concorrentes para um produto.',
    },
    tripPlannerCrew: {
      name: 'Equipe de Planejamento de Viagem',
      description: 'Planeja itinerários de viagem detalhados com base em suas preferências.',
    },
    financialAnalystCrew: {
      name: 'Equipe de Analistas Financeiros',
      description: 'Uma equipe para analisar o desempenho de ações e dados de mercado.',
    },
  },
  tooltip: {
    tools: {
      serperDevTool: 'Fornece recursos de pesquisa Google em tempo real para os agentes.',
      scrapeWebsiteTool: 'Extrai conteúdo de uma URL. Útil para extração de dados.',
      websiteSearchTool: 'Realiza uma busca semântica no conteúdo de um site.',
      directoryReadTool: 'Permite que os agentes leiam arquivos dentro de um diretório especificado.',
      fileReadTool: 'Permite que os agentes leiam o conteúdo de um arquivo específico.',
    },
  },
  common: {
    save: 'Salvar',
    cancel: 'Cancelar',
  }
};
