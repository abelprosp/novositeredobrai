export const upplaCase = {
  path: '/cases/uppla/',
  slug: 'uppla',
  kind: 'case',
  title: 'Case Uppla',
  description: 'Na Uppla, a Redobrai desenvolveu dois modelos de IA para inspecionar tampinhas. O primeiro detecta as tampas no molde da injetora. Depois que elas caem na esteira, outro modelo analisa as imagens das câmeras e seleciona as peças que podem seguir.',
};

export const divisions = [
  {
    id: 'redobrai-ia',
    name: 'Redobrai IA',
    groups: [
      {
        title: 'Agentes de IA',
        pages: [
          {
            slug: 'agentes-para-suporte',
            title: 'Agentes para suporte',
            description: 'Responda a dúvidas recorrentes, organize chamados e encaminhe situações que exigem atendimento humano.',
            applications: [
              ['Respostas com base no seu conteúdo', 'Use a base de conhecimento da empresa para responder perguntas recorrentes e indicar os materiais relevantes.'],
              ['Triagem de chamados', 'Classifique solicitações por assunto e reúna o contexto necessário para encaminhá-las à equipe responsável.'],
              ['Atendimento humano quando necessário', 'Defina quais casos devem ser transferidos, como reclamações, exceções ou perguntas sem resposta na base.'],
            ],
          },
          {
            slug: 'apoio-a-decisoes-industriais',
            title: 'Agentes para decisões industriais',
            description: 'Reúna dados e registros da operação para investigar desvios e avaliar prioridades com a equipe responsável.',
            applications: [
              ['Contexto da operação', 'Consulte registros e indicadores relacionados a uma ocorrência para reunir informações que podem estar em fontes diferentes.'],
              ['Investigação de desvios', 'Compare indicadores com referências da operação para levantar perguntas e orientar a investigação.'],
              ['Priorização com a equipe', 'Organize ocorrências e evidências para que os responsáveis avaliem causas e decidam como agir.'],
            ],
          },
          {
            slug: 'analise-em-tempo-real',
            title: 'Agentes de análise em tempo real',
            description: 'Interprete indicadores à medida que os dados chegam e identifique mudanças que exigem atenção.',
            applications: [
              ['Leitura contínua de indicadores', 'Acompanhe os dados disponíveis conforme eventos ou medições chegam à solução.'],
              ['Alertas com contexto', 'Destaque mudanças relevantes e inclua o indicador, o horário e a referência usada na comparação.'],
              ['Revisão de ocorrências', 'Retome eventos anteriores para entender o que mudou e ajustar quais ocorrências merecem atenção.'],
            ],
          },
          {
            slug: 'agentes-de-visao-computacional',
            title: 'Agentes de visão computacional',
            description: 'Use imagens para identificar objetos e encaminhar ocorrências para análise ou revisão.',
            applications: [
              ['Identificação em imagens', 'Defina o que a solução deve reconhecer, como objetos, características visuais ou condições fora do padrão.'],
              ['Encaminhamento de ocorrências', 'Associe a imagem ao contexto disponível para facilitar a avaliação da equipe responsável.'],
              ['Avaliação com imagens representativas', 'Teste a abordagem com exemplos das condições reais de captura, incluindo variações de iluminação e enquadramento.'],
            ],
          },
        ],
      },
      {
        title: 'Serviços para empresas',
        pages: [
          {
            slug: 'treinamento-de-modelos',
            title: 'Treinamento personalizado de modelos',
            description: 'Treinamos modelos de IA para a empresa solicitante, com uma abordagem definida a partir da tarefa e dos dados disponíveis.',
            applications: [
              ['Definição da tarefa', 'Identifique o que o modelo deve fazer e estabeleça critérios para medir a qualidade das respostas ou previsões.'],
              ['Treinamento ou ajuste de um modelo', 'Avalie o tipo de treinamento adequado e prepare exemplos representativos do processo, com dados autorizados pela empresa.'],
              ['Avaliação antes da implantação', 'Teste o modelo com exemplos separados dos dados de treinamento para identificar onde ele funciona e onde precisa de revisão.'],
            ],
          },
          {
            slug: 'infraestrutura-em-nuvem',
            title: 'Infraestrutura em nuvem para IA',
            description: 'Planejamos infraestrutura em nuvem para treinar, executar e operar soluções de IA conforme os requisitos da empresa.',
            applications: [
              ['Dimensionamento de recursos', 'Estime o volume de uso, a necessidade de processamento e os requisitos de armazenamento para cada carga de trabalho.'],
              ['Ambientes para treino e execução', 'Organize a infraestrutura conforme o uso, desde experimentos até a execução de modelos em produção.'],
              ['Operação e custos', 'Defina como acompanhar o uso de recursos, os custos e as condições de acesso ao ambiente.'],
            ],
          },
        ],
      },
      {
        title: 'Ecossistema',
        pages: [
          {
            slug: 'parceiros',
            title: 'Parceiros de IA',
            description: 'Conheça plataformas e fornecedores de modelos de IA que podem ser avaliados de acordo com os requisitos de cada projeto.',
            providers: [
              {name: 'OpenAI', url: 'https://openai.com/', description: 'Desenvolve modelos de IA e oferece uma plataforma de API para integrá-los a aplicações.'},
              {name: 'Anthropic', url: 'https://www.anthropic.com/', description: 'Desenvolve a família de modelos Claude.'},
              {name: 'DeepSeek', url: 'https://www.deepseek.com/', description: 'Desenvolve modelos de IA e disponibiliza acesso por meio de sua plataforma de API.'},
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'redobrai-industria',
    name: 'Redobrai Indústrias',
    groups: [
      {
        title: 'Energia',
        pages: [
          {
            slug: 'wattsense',
            title: 'WattSense',
            description: 'Medidor industrial para acompanhar tensão, corrente e consumo de energia na operação.',
            image: '/assets/wattsense.png',
            imageAlt: 'Medidor industrial WattSense com tela de consumo, tensão e corrente',
            applications: [
              ['Consumo de energia', 'Acompanhe o consumo no ponto monitorado para obter uma referência sobre o uso de energia na operação.'],
              ['Tensão e corrente', 'Consulte as medições elétricas apresentadas pelo equipamento para analisar as condições do ponto monitorado.'],
              ['Aplicação na sua operação', 'Identifique o equipamento ou processo que deseja monitorar para avaliar onde instalar o medidor.'],
            ],
          },
        ],
      },
      {
        title: 'Engenharia de produto',
        pages: [
          {
            slug: 'digitalizacao-3d-e-cad',
            title: 'Digitalização 3D e edição em CAD',
            description: 'Transforme um produto físico em um modelo 3D para visualização e revisão de projeto. Use IA para auxiliar nas modificações em CAD.',
            applications: [
              ['Digitalização do produto físico', 'Use a geometria do objeto como ponto de partida para criar uma representação digital.'],
              ['Revisão do modelo', 'Examine a representação no contexto do projeto e identifique quais características precisam ser preservadas ou verificadas.'],
              ['Edição assistida em CAD', 'Aplique alterações conforme a necessidade do projeto, com revisão das dimensões e dos requisitos pela equipe responsável.'],
            ],
          },
        ],
      },
      {
        title: 'Qualidade na produção',
        pages: [
          {
            slug: 'visao-computacional-industrial',
            title: 'Visão computacional industrial',
            description: 'Use imagens para identificar itens e apoiar a detecção de falhas na linha de produção.',
            casePath: upplaCase.path,
            applications: [
              ['Captura de imagens na linha', 'Defina o ponto de captura e as condições de iluminação conforme o item e a etapa de inspeção.'],
              ['Identificação de desvios visuais', 'Use amostras do processo para definir o que deve ser detectado e avaliar o resultado da inspeção.'],
              ['Inspeção de tampinhas na Uppla', 'Na Uppla, a aplicação foi voltada à inspeção de tampinhas na linha de produção.'],
            ],
          },
          upplaCase,
        ],
      },
    ],
  },
];

export const detailPages = new Map();

for (const division of divisions) {
  for (const group of division.groups) {
    for (const page of group.pages) {
      page.path ??= `/${division.id}/${page.slug}/`;
      detailPages.set(page.path, {...page, division, group: group.title});
    }
  }
}
