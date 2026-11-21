# Redobrai: duas frentes de atuação

**Data:** 2026-11-21  
**Status:** Aprovado para implementação

## Objetivo

Reorganizar a página institucional da Redobrai para apresentar com clareza duas unidades de atuação: Redobrai IA, dedicada a soluções agentivas para empresas, e Redobrai Indústrias, dedicada a soluções para operações industriais. Adotar os componentes do design system aberto Astryx, preservando a identidade visual da Redobrai.

## Contexto atual

O site é uma página estática, implementada em `index.html`, `styles-reference.css` e `script.js`. A página atual mistura indústria, comunicação, software sob medida e laboratório digital numa única apresentação. O formulário valida os campos no navegador e abre o aplicativo de e-mail com a mensagem pronta. Os ativos locais são o logotipo da Redobrai e uma imagem do WattSense. O conteúdo apresenta ainda um projeto de visão computacional para inspeção de tampinhas na Uppla.

O Astryx é um sistema de design para React 19+, com biblioteca de componentes, temas e estilos personalizáveis. O projeto atual não tem `package.json` nem framework de interface, por isso a adoção direta pede uma migração de estrutura.

## Decisão de arquitetura

Migrar a página estática para React 19 com Vite e usar os componentes do pacote Astryx diretamente. Aplicar o tema base do Astryx com tokens de marca da Redobrai, mantendo o verde presente na identidade. O resultado será uma única página responsiva, sem criar rotas ou páginas separadas para as duas unidades.

## Estrutura e conteúdo

1. **Cabeçalho:** logotipo, navegação por âncoras para Redobrai IA, Redobrai Indústrias e contato, além de uma chamada principal.
2. **Abertura:** apresentar a Redobrai e direcionar visitantes para uma das duas áreas.
3. **Redobrai IA:** explicar, em termos institucionais, a atuação com soluções agentivas para empresas e convidar o visitante a conversar sobre seu desafio. Não afirmar capacidades, integrações ou resultados específicos sem conteúdo fornecido.
4. **Redobrai Indústrias:** apresentar aplicações para a operação industrial com base no material existente: WattSense, monitoramento de energia e visão computacional para inspeção. Preservar a distinção entre projetos apresentados e funcionalidades disponíveis.
5. **Contato:** manter o formulário de nome, e-mail e desafio, com abertura de mensagem `mailto:` e validação nativa.
6. **Rodapé:** preservar logotipo, ano dinâmico e acesso ao topo.

Os conteúdos antigos de comunicação, software sob medida e laboratório digital só entram quando ajudarem diretamente a explicar uma das duas unidades. Não criar clientes, métricas, depoimentos, estudos de caso ou promessas de produto.

## Componentes e identidade

Usar componentes Astryx apropriados para navegação, botões, cartões, campos e demais controles presentes na biblioteca. Personalizar aparência com tokens de tema e CSS local. Construir em HTML semântico, com foco visível, estados de teclado, nomes acessíveis e layout que funcione em telas estreitas. Reutilizar o logotipo e as imagens locais existentes. A direção visual deve diferenciar as duas áreas por composição e cor de apoio, mantendo uma identidade única da Redobrai.

## Fluxo de interação

- Links de navegação levam às âncoras dentro da mesma página.
- CTAs de cada área levam ao formulário de contato.
- O formulário exige nome, e-mail e descrição; ao enviar, valida os campos e abre o cliente de e-mail com os dados preenchidos.
- O menu se mantém utilizável por toque, teclado e leitores de tela em telas pequenas.

## Verificação de entrega

- A aplicação instala e compila usando as versões atuais do React 19, Vite e Astryx compatíveis entre si.
- A página inicial apresenta as duas unidades sem misturar suas propostas.
- Navegação, menu móvel e formulário mantêm os fluxos já disponíveis no site.
- Conteúdo e controles permanecem legíveis e utilizáveis em desktop e mobile.
- Não há referências visuais ou de texto às antigas três frentes como estrutura principal.

## Fora de escopo

- Criar páginas separadas, backend, CRM, banco de dados ou envio de formulário no servidor.
- Publicar o site ou alterar hospedagem.
- Inventar um catálogo de agentes, setores atendidos, integrações, clientes, métricas ou cases de Redobrai IA.
- Alterar os ativos de marca além do necessário para integrá-los ao novo layout.
