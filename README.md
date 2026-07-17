# Text Express 22.0

Ferramenta flutuante para localizar, visualizar, inserir e organizar textos de Atendimento e Protocolo.

## Novidade principal: sequências numeradas

As sequências continuam exclusivas da área **Atendimento** e agora possuem um menu persistente.

O menu pode ser aberto de duas formas:

- digitando o atalho principal da sequência, como `/semgerencia`, e pressionando o gatilho configurado;
- clicando no botão **ABRIR SEQUÊNCIA** existente no card ou no painel de detalhes.

Quando o menu estiver aberto:

- digitar `1`, `2`, `3` etc. em um campo de chat vazio insere a pergunta correspondente;
- o número serve somente para escolher a pergunta e não é inserido no chat;
- clicar em uma pergunta também insere o texto no último campo de atendimento utilizado;
- palavras-chave, como `/led`, `/mexeu` ou `/foto`, podem ser cadastradas em cada pergunta;
- o menu permanece aberto após cada inserção;
- é possível alternar entre diferentes atendimentos sem fechar a sequência;
- `ESC` ou o botão `X` fecham o menu;
- o cabeçalho mostra qual sequência está aberta e quantas perguntas ela possui;
- a busca localiza perguntas por número, nome, conteúdo ou palavra-chave.

## Cadastro de palavras-chave

Ao criar ou editar uma sequência, cada pergunta possui o campo **Palavras-chave desta pergunta**.

Exemplo:

```text
/led, /mexeu, /foto
```

As palavras-chave adicionais funcionam enquanto a respectiva sequência estiver aberta. O atalho principal de cada pergunta continua funcionando normalmente.

## Compatibilidade ampliada com chats

A versão 22.0 melhora a inserção de textos em:

- `input` e `textarea` comuns;
- campos `contenteditable`;
- editores controlados por frameworks;
- componentes com Shadow DOM aberto;
- iframes de mesma origem;
- campos com `role="textbox"`.

Iframes de outra origem continuam protegidos pelas regras de segurança do navegador. Nesses casos, quando a inserção direta não for permitida, o Text Express copia o texto para a área de transferência.

## Recursos preservados

A versão 22.0 mantém:

- todos os modelos das versões anteriores;
- dados existentes no `localStorage`;
- categorias;
- sequências de Atendimento;
- Protocolos;
- favoritos;
- importação completa e mesclagem;
- nome do atendente memorizado;
- salvamento automático;
- posições e estado visual;
- separação de atalhos entre Atendimento e Protocolo;
- visualização completa ao clicar nos cards;
- bookmarklet compacto.

## Favorito compacto

Salve o código abaixo como endereço de um favorito do navegador:

```javascript
javascript:(()=>{const s=document.createElement('script');s.src='https://king-programador.github.io/text-express/bookmarklet.js?v='+Date.now();(document.head||document.documentElement).appendChild(s)})()
```

## Arquivos para o GitHub

Envie somente estes cinco arquivos:

- `index.html`
- `styles.css`
- `app.js`
- `bookmarklet.js`
- `README.md`

Depois da publicação, pressione `Ctrl + F5` no sistema de trabalho.

## Endereços do projeto

- Repositório: `https://github.com/King-Programador/text-express`
- GitHub Pages: `https://king-programador.github.io/text-express/`
