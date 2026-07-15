# Text Express 7.0

Ferramenta para scripts de atendimento e registros internos de protocolo.

## Nome do atendente lembrado automaticamente

Na primeira vez em que um modelo usar `[atendente]`, o Text Express solicitará o nome.

Depois disso:

- o nome fica salvo no navegador;
- os próximos modelos com `[atendente]` são preenchidos automaticamente;
- a janela não será aberta novamente apenas para pedir o nome;
- o nome pode ser alterado ou apagado em **Configurações → Nome do atendente**.

Por segurança, dados variáveis de clientes, protocolos e prazos não ficam gravados permanentemente. A memória automática é usada somente para dados fixos do operador, como `[atendente]`.

## Salvamento automático dos scripts

Ao editar um modelo existente:

- as alterações são salvas automaticamente após uma breve pausa;
- aparece a mensagem **Salvo automaticamente**;
- o atalho passa a usar o novo conteúdo imediatamente;
- o card e a visualização são atualizados;
- o salvamento é conferido no armazenamento do navegador;
- fechar a janela de edição não perde a última alteração válida.

Modelos novos ainda precisam do botão **Salvar e concluir** para serem criados.

## Sincronização

Quando o mesmo sistema estiver aberto em mais de uma aba ou janela:

- alterações salvas em uma aba aparecem nas demais;
- os mapas de atalhos são atualizados;
- a versão mais recente do texto é usada na próxima inserção;
- o nome do atendente lembrado também é atualizado.

A sincronização automática funciona entre abas do mesmo site e navegador. Sites diferentes possuem armazenamentos separados por segurança do navegador.

## Recursos preservados

- interface leve;
- launcher pequeno e arrastável;
- modo de tela grande;
- sequências apenas em Atendimento;
- protocolos como textos únicos;
- categorias, favoritos e busca;
- importação e exportação;
- tema claro e escuro;
- atalhos personalizados.

## Atualização no GitHub

Substitua na raiz do repositório:

- `index.html`
- `styles.css`
- `app.js`
- `bookmarklet.js`
- `README.md`

Depois aguarde o GitHub Pages atualizar e pressione `Ctrl + F5`.
