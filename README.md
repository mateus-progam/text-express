# Text Express 23.0 — Base sanitizada

Esta versão continua a partir do Text Express 22.0 e preserva o sistema de sequências numeradas.

## Base incluída

- 21 categorias;
- 132 cartões/modelos;
- 29 sequências de Atendimento;
- 97 falas internas nas sequências;
- categorias e cartões mantidos na mesma organização do backup enviado.

## Dados removidos

Não foram incorporados ao projeto:

- nome lembrado do atendente;
- preferências pessoais;
- tema claro/escuro anteriormente escolhido;
- posição da janela e do botão;
- filtros, pesquisas, rolagem e seleção anterior;
- datas e revisões particulares do backup.

Os campos `origem` foram generalizados para não expor nomes pessoais.

## Migração automática

No primeiro carregamento da versão 23.0, a base local antiga é substituída pela base limpa incluída no projeto. A migração ocorre uma única vez. Depois, novos cartões, edições e preferências voltam a ser salvos normalmente no navegador.

## Sequências

Na área Atendimento, o comando principal de um cartão do tipo sequência abre o menu com suas falas internas. Exemplo:

1. digite o comando principal, como `/oi`;
2. o comando é removido do chat;
3. o menu da sequência aparece;
4. digite o número da fala, use o atalho interno ou clique no item;
5. somente o texto é inserido, sem o número;
6. o menu continua aberto até `ESC` ou `X`.

## Publicação no GitHub

Envie estes cinco arquivos para a raiz do repositório:

- `index.html`
- `styles.css`
- `app.js`
- `bookmarklet.js`
- `README.md`

GitHub Pages: `https://king-programador.github.io/text-express/`
