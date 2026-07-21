# Text Express 27.1 — Fluxo de Protocolo com duas opções

A versão 27.1 foi construída diretamente sobre a versão funcional 27.0. A base de cartões, categorias, Sequências de Atendimento, protocolos, atalhos, importação, mesclagem, salvamento local, tema e redimensionamento foi preservada.

## Ajustes visuais no editor

O modal de criação e edição exibe somente um título. A repetição de “Editar modelo” foi removida e o título permanece legível nos modos claro e escuro.

Os seletores de formato foram corrigidos para evitar botões internos sobrepostos. Na área de Protocolo, aparecem de forma clara:

- **Protocolo comum**;
- **Fluxo de protocolo**.

## Fluxo de Protocolo

Os protocolos comuns continuam inserindo o texto imediatamente.

Somente um protocolo marcado como **Fluxo de protocolo** abre o menu compacto compartilhado com as Sequências de Atendimento.

Todo Fluxo de Protocolo possui exatamente duas opções:

1. **Normalizado**;
2. **Aberto O.S.**.

O editor não permite criar uma terceira opção, excluir uma das duas ou alterar os nomes fixos.

## Visualização do protocolo no menu

Cada uma das duas opções possui um campo próprio para o texto do protocolo. Esse texto é mostrado no menu antes da execução, seguindo o padrão visual das falas das Sequências de Atendimento.

O menu mantém:

- pesquisa;
- seleção pelos números `1` e `2`;
- atalhos diretos e palavras-chave;
- fechamento com `ESC` ou `X`;
- arraste e redimensionamento;
- posição e tamanho salvos;
- permanência aberta após a execução.

## Ações disponíveis

Apesar de o menu possuir somente duas opções, cada opção pode ser configurada para:

- inserir o protocolo no campo ativo;
- abrir outro Fluxo de Protocolo;
- abrir uma Sequência existente do Atendimento;
- abrir um atendimento externo por endereço HTTP ou HTTPS;
- executar uma ação personalizada registrada por integração.

Nos casos em que a opção executa uma ação diferente da inserção, o texto do protocolo continua aparecendo no menu para conferência.

Fluxos encadeados mantêm o botão **Voltar**.

## Compatibilidade persistente do Atendimento

Permanece a correção da versão 27.0 para manter os atalhos ativos quando o chat:

- recria o campo de entrada;
- substitui partes do DOM;
- intercepta eventos de teclado;
- utiliza `Shadow DOM`, inclusive fechado;
- utiliza ou recria `iframe` de mesma origem.

## Recursos preservados

- 21 categorias;
- 132 cartões/modelos da base;
- 29 Sequências de Atendimento;
- 97 falas internas;
- Atendimento e Protocolo separados;
- Protocolo como área inicial;
- protocolos comuns com inserção imediata;
- importação completa e mesclagem;
- favoritos;
- modo claro e escuro;
- salvamento automático;
- arraste e redimensionamento;
- prevenção de sobreposição das janelas.

## Ações personalizadas

```javascript
window.textExpressApp.registerProtocolFlowAction(
  "abrir-painel-tecnico",
  async ({ flow, step }) => {
    return { message: `Ação executada em ${flow.nome}: ${step.nome}` };
  }
);
```

## Publicação no GitHub

Envie estes cinco arquivos para a raiz do repositório:

- `index.html`;
- `styles.css`;
- `app.js`;
- `bookmarklet.js`;
- `README.md`.

Depois confirme o commit, aguarde o GitHub Pages e pressione `Ctrl + F5` na página publicada.
