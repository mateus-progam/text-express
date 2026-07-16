# Text Express 21.0

Ferramenta flutuante para localizar, visualizar, inserir e organizar textos de Atendimento e Protocolo.

## Alterações da versão 21.0

### Visualização dos cards

- clicar em qualquer card abre imediatamente o conteúdo completo no painel direito;
- sequências exibem todas as falas, campos e etapas;
- modelos únicos e protocolos exibem o texto integral;
- o card aberto fica destacado;
- a seleção continua sendo salva no estado visual;
- também é possível abrir o card com Enter ou Espaço quando ele estiver focado.

### Atalhos separados por área

- na aba Atendimento, os atalhos procuram somente modelos de Atendimento;
- na aba Protocolo, os atalhos procuram somente modelos de Protocolo;
- o mesmo atalho pode existir uma vez em Atendimento e uma vez em Protocolo, com textos diferentes;
- atalhos repetidos dentro da mesma área continuam sendo impedidos;
- em Favoritos, o atalho acompanha o tipo do card favorito selecionado.

Exemplo:

- Atendimento: `/semconexao` pode inserir uma resposta ao cliente;
- Protocolo: `/semconexao` pode inserir um registro técnico diferente.

## Favorito compacto

Salve o código abaixo como endereço de um favorito do navegador:

```javascript
javascript:(()=>{const s=document.createElement('script');s.src='https://king-programador.github.io/text-express/bookmarklet.js?v='+Date.now();(document.head||document.documentElement).appendChild(s)})()
```

Toda a lógica de carregamento fica no arquivo `bookmarklet.js`. Por isso, o comando salvo no favorito fica pequeno.

O endereço já está configurado para a conta **King-Programador**. No GitHub Pages, o domínio é exibido em minúsculas: `king-programador.github.io`.

## Arquivos para o GitHub

Envie somente:

- `index.html`
- `styles.css`
- `app.js`
- `bookmarklet.js`
- `README.md`

Depois da publicação, pressione `Ctrl + F5` no sistema de trabalho.

## Dados existentes

A versão 21.0 preserva:

- dados do `localStorage`;
- modelos e categorias;
- sequências de Atendimento;
- Protocolos;
- favoritos;
- importação completa e mesclagem;
- nome do atendente memorizado;
- salvamento automático;
- posições e estado visual.


## Correção do endereço do GitHub

- repositório: `https://github.com/King-Programador/text-express`;
- GitHub Pages: `https://king-programador.github.io/text-express/`;
- o `bookmarklet.js` também usa esse novo endereço como fallback.
