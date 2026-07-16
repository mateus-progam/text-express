# Text Express 20.0

## Janela de importação corrigida

A janela de escolha aparecia, mas os botões não respondiam.

### Causa

O elemento raiz do Text Express utiliza `pointer-events: none` para não
bloquear os cliques do sistema onde o bookmarklet está aberto.

O painel principal reativava os cliques, mas a janela de importação não.
Por isso ela era exibida sem permitir interação.

### Correções

- a janela de importação agora recebe cliques;
- Restaurar backup completo funciona;
- Mesclar com os dados atuais funciona;
- o botão X funciona;
- clicar no fundo fecha a janela;
- Esc cancela e fecha;
- suporte adicional a pointerup para sites que interceptam click;
- foco inicial no botão Restaurar backup completo;
- contraste do título corrigido.

## Como restaurar no outro navegador

1. Abra o Text Express dentro do mesmo sistema onde será utilizado.
2. Clique em Importar.
3. Selecione o backup.
4. Clique em Restaurar backup completo.
5. Aguarde a mensagem de conclusão.

## Atualização

Envie para o GitHub:

- index.html
- styles.css
- app.js
- bookmarklet.js
- README.md

Depois pressione Ctrl + F5.
