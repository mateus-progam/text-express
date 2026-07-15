# Text Express 2.0

Ferramenta local para **scripts de atendimento** e **registros de protocolo**, com expansão por atalhos personalizados e interface flutuante.

## Novidades desta versão

- interface redesenhada com ícones SVG internos, sem bibliotecas externas;
- categorias com ícone, cor e contador de modelos;
- botão **+ Categoria** diretamente na faixa de filtros;
- edição pelo lápis exibido em cada categoria;
- criação, edição, exclusão e reordenação de categorias;
- categorias salvas no `localStorage`;
- ao excluir uma categoria, os modelos são movidos para **Outros**;
- seletor de categoria também permite criar uma nova categoria durante o cadastro de um modelo;
- importação e exportação incluem categorias e modelos;
- base inicial preservada: 211 scripts de atendimento e 105 protocolos.

## Arquivos

- `index.html` — interface e página de demonstração;
- `styles.css` — estilos completos e modo escuro;
- `app.js` — aplicação, modelos, categorias, atalhos e persistência;
- `bookmarklet.js` — código para o favorito, configurado para `mateus-progam.github.io/text-express`.

## Atualizar o GitHub

Envie estes arquivos para a raiz do repositório, substituindo os anteriores:

1. `index.html`
2. `styles.css`
3. `app.js`
4. `bookmarklet.js`
5. `README.md`

Depois, aguarde o GitHub Pages publicar a nova versão e pressione `Ctrl + F5` na página.

## Categorias

Na faixa abaixo da busca:

- clique em uma categoria para filtrar;
- passe o mouse e clique no lápis para editar;
- clique em **+ Categoria** para criar;
- escolha nome, tipo, ícone e cor;
- use os botões para mover a categoria para a esquerda ou direita.

## Armazenamento

- modelos: `text_express_snippets`
- categorias: `text_express_categories`
- configurações: `text_express_settings`
- tema: `te_dark_mode`

Tudo permanece no navegador. Nenhum dado preenchido nas variáveis é enviado a servidores.
