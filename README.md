# Text Express 27.0 — Fluxos de Protocolo e compatibilidade persistente

A versão 27.0 foi construída diretamente sobre a base funcional 26.0. Todos os cartões, categorias, sequências, protocolos, atalhos, importação, mesclagem, salvamento local, tema e redimensionamento foram preservados.

## Novidades da versão 27.0

### Fluxos opcionais na área de Protocolos

Um protocolo pode continuar sendo **comum**, com inserção imediata, ou ser configurado individualmente como **Fluxo de protocolo**.

Ao clicar em **Inserir** ou ativar o atalho principal de um protocolo do tipo Fluxo, o Text Express abre o mesmo menu compacto utilizado nas Sequências do Atendimento. O menu preserva:

- identidade visual;
- pesquisa;
- seleção por número;
- palavras-chave;
- fechamento com `ESC` ou `X`;
- arraste, redimensionamento e posição salva;
- permanência aberta após executar uma opção.

Cada opção do fluxo pode:

- inserir um script;
- abrir outro Fluxo de Protocolo;
- abrir uma Sequência existente do Atendimento;
- abrir um atendimento externo por endereço HTTP ou HTTPS;
- executar uma ação personalizada registrada por integração.

Fluxos encadeados exibem o botão **Voltar**, permitindo retornar ao menu anterior.

### Configuração individual

A janela de criação e edição agora exibe o formato para as duas áreas:

- Atendimento: **Fala única** ou **Sequência de falas**;
- Protocolo: **Protocolo comum** ou **Fluxo de protocolo**.

Protocolos existentes permanecem como protocolos comuns e continuam inserindo o texto imediatamente. Nenhuma conversão automática é realizada.

### Compatibilidade persistente com o chat de Atendimento

A captura de atalhos foi reforçada para continuar ativa quando o chat:

- recria ou substitui o campo de entrada;
- intercepta eventos de teclado antes do `document`;
- utiliza `Shadow DOM`, inclusive fechado;
- move o editor para `iframe` acessível da mesma origem;
- substitui repetidamente componentes durante o atendimento.

A lógica dos atalhos e a separação entre Atendimento e Protocolo foram preservadas.

## Recursos preservados

- 21 categorias da base;
- 132 cartões/modelos da base;
- 29 sequências de Atendimento;
- 97 falas internas;
- Atendimento e Protocolo separados;
- atalhos pesquisados somente na área selecionada;
- Protocolo como área inicial;
- recolhimento do painel ao abrir sequência ou fluxo;
- prevenção de sobreposição das janelas;
- arraste e redimensionamento;
- importação completa e mesclagem;
- modo claro e escuro;
- salvamento automático e compatibilidade com dados existentes.

## Ações personalizadas

Integrações podem registrar uma ação pelo identificador configurado na opção:

```javascript
window.textExpressApp.registerProtocolFlowAction("abrir-painel-tecnico", async ({ flow, step }) => {
  // Executar integração autorizada.
  return { message: `Ação executada em ${flow.nome}: ${step.nome}` };
});
```

A função pode retornar `false`, uma mensagem, um texto para inserção ou o identificador de outro fluxo em `openFlowId`.

## Publicação no GitHub

Envie estes cinco arquivos para a raiz do repositório:

- `index.html`
- `styles.css`
- `app.js`
- `bookmarklet.js`
- `README.md`

Repositório: `https://github.com/King-Programador/text-express`

GitHub Pages: `https://king-programador.github.io/text-express/`
