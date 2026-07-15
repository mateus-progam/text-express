/*
 * Text Express 2.0.0
 * Expansor de textos para atendimento e registro de protocolos.
 * Sem dependências externas.
 */
(() => {
  "use strict";

  const APP_VERSION = "2.0.0";
  const STORAGE_KEYS = Object.freeze({
    snippets: "text_express_snippets",
    darkMode: "te_dark_mode",
    settings: "text_express_settings",
    position: "text_express_position",
    categories: "text_express_categories"
  });

  const DEFAULT_SETTINGS = Object.freeze({
    autoExpand: true,
    keepOpenAfterInsert: true,
    confirmBeforeDelete: true
  });

  const DEFAULT_CATEGORIES = [{"id":"cat-atd-saudacoes","tipo":"atendimento","nome":"Saudações","icone":"message-circle","cor":"#4f7cff","ordem":10,"padrao":true},{"id":"cat-atd-respostas","tipo":"atendimento","nome":"Respostas","icone":"reply","cor":"#16a36a","ordem":20,"padrao":true},{"id":"cat-atd-solicitacoes","tipo":"atendimento","nome":"Solicitações","icone":"clipboard-list","cor":"#8b5cf6","ordem":30,"padrao":true},{"id":"cat-atd-problemas","tipo":"atendimento","nome":"Problemas","icone":"alert-triangle","cor":"#e64b4b","ordem":40,"padrao":true},{"id":"cat-atd-orientacoes","tipo":"atendimento","nome":"Orientações","icone":"compass","cor":"#0891b2","ordem":50,"padrao":true},{"id":"cat-atd-encerramentos","tipo":"atendimento","nome":"Encerramentos","icone":"check-circle","cor":"#18864b","ordem":60,"padrao":true},{"id":"cat-atd-outros","tipo":"atendimento","nome":"Outros","icone":"folder","cor":"#64748b","ordem":70,"padrao":true},{"id":"cat-prot-fibra-onu","tipo":"protocolo","nome":"Fibra e ONU","icone":"network","cor":"#3b82f6","ordem":10,"padrao":true},{"id":"cat-prot-instalacao-reparo","tipo":"protocolo","nome":"Instalação e Reparo","icone":"wrench","cor":"#f97316","ordem":20,"padrao":true},{"id":"cat-prot-internet","tipo":"protocolo","nome":"Internet","icone":"globe","cor":"#4f46e5","ordem":30,"padrao":true},{"id":"cat-prot-wifi-equipamentos","tipo":"protocolo","nome":"Wi-Fi e Equipamentos","icone":"wifi","cor":"#0891b2","ordem":40,"padrao":true},{"id":"cat-prot-telefonia","tipo":"protocolo","nome":"Telefonia","icone":"phone","cor":"#16a36a","ordem":50,"padrao":true},{"id":"cat-prot-atendimento-retorno","tipo":"protocolo","nome":"Atendimento e Retorno","icone":"users","cor":"#8b5cf6","ordem":60,"padrao":true},{"id":"cat-prot-tv","tipo":"protocolo","nome":"TV","icone":"monitor","cor":"#db2777","ordem":70,"padrao":true},{"id":"cat-prot-sistemas-aplicativos","tipo":"protocolo","nome":"Sistemas e Aplicativos","icone":"server","cor":"#2563eb","ordem":80,"padrao":true},{"id":"cat-prot-fwa","tipo":"protocolo","nome":"FWA","icone":"radio","cor":"#d97706","ordem":90,"padrao":true},{"id":"cat-prot-financeiro","tipo":"protocolo","nome":"Financeiro","icone":"wallet","cor":"#15803d","ordem":100,"padrao":true},{"id":"cat-prot-abertura","tipo":"protocolo","nome":"Abertura","icone":"play-circle","cor":"#2563eb","ordem":110,"padrao":true},{"id":"cat-prot-relato","tipo":"protocolo","nome":"Relato","icone":"file-text","cor":"#7c3aed","ordem":120,"padrao":true},{"id":"cat-prot-analise","tipo":"protocolo","nome":"Análise","icone":"search","cor":"#4f46e5","ordem":130,"padrao":true},{"id":"cat-prot-procedimento","tipo":"protocolo","nome":"Procedimento","icone":"settings","cor":"#f97316","ordem":140,"padrao":true},{"id":"cat-prot-orientacao","tipo":"protocolo","nome":"Orientação","icone":"compass","cor":"#0891b2","ordem":150,"padrao":true},{"id":"cat-prot-encaminhamento","tipo":"protocolo","nome":"Encaminhamento","icone":"send","cor":"#2563eb","ordem":160,"padrao":true},{"id":"cat-prot-pendencia","tipo":"protocolo","nome":"Pendência","icone":"clock","cor":"#d97706","ordem":170,"padrao":true},{"id":"cat-prot-conclusao","tipo":"protocolo","nome":"Conclusão","icone":"check-circle","cor":"#15803d","ordem":180,"padrao":true},{"id":"cat-prot-outros","tipo":"protocolo","nome":"Outros","icone":"folder","cor":"#64748b","ordem":190,"padrao":true}];

  const CATEGORY_ICON_OPTIONS = Object.freeze(["layout-grid", "message-circle", "reply", "clipboard-list", "alert-triangle", "compass", "check-circle", "folder", "network", "wrench", "globe", "wifi", "phone", "users", "monitor", "server", "radio", "wallet", "play-circle", "file-text", "search", "settings", "send", "clock", "tag", "headphones", "shield-check", "database", "smartphone", "package", "map-pin", "bell", "zap"]);
  const CATEGORY_COLOR_OPTIONS = Object.freeze(["#4f7cff", "#2563eb", "#4f46e5", "#8b5cf6", "#db2777", "#e64b4b", "#f97316", "#d97706", "#16a36a", "#0891b2", "#64748b", "#0f766e"]);

  const TRIGGER_LABELS = Object.freeze({
    space: "Espaço",
    tab: "Tab",
    enter: "Enter"
  });

  const DEFAULT_SNIPPETS = [{"id":"te-atd-001","tipo":"atendimento","nome":"Saudação — Olá, tudo bem","atalho":"/a-saudacao-01","categoria":"Saudações","grupo":"Atendimento geral","contexto":"SAUDAÇÃO","conteudo":"Olá, tudo bem? 😊 Me chamo [atendente], faço parte do time de suporte técnico da Brisanet e vou te atender hoje.","variaveis":["atendente"],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-002","tipo":"atendimento","nome":"Saudação — Falo com o(a) titular do contrato","atalho":"/a-saudacao-02","categoria":"Saudações","grupo":"Atendimento geral","contexto":"SAUDAÇÃO","conteudo":"Falo com o(a) titular do contrato?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-003","tipo":"atendimento","nome":"Saudação — Por gentileza confirmar os dados","atalho":"/a-saudacao-03","categoria":"Saudações","grupo":"Atendimento geral","contexto":"SAUDAÇÃO","conteudo":"Pode por gentileza confirmar os dados? Para prosseguirmos com o atendimento.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-004","tipo":"atendimento","nome":"Saudação — Olá! Você ainda está aí?","atalho":"/a-saudacao-04","categoria":"Saudações","grupo":"Atendimento geral","contexto":"SAUDAÇÃO","conteudo":"Olá! Você ainda está aí?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-005","tipo":"atendimento","nome":"Saudação — Só um momento","atalho":"/a-saudacao-05","categoria":"Saudações","grupo":"Atendimento geral","contexto":"SAUDAÇÃO","conteudo":"Só um momento.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-006","tipo":"atendimento","nome":"Saudação — Obrigado pelas informações","atalho":"/a-saudacao-06","categoria":"Saudações","grupo":"Atendimento geral","contexto":"SAUDAÇÃO","conteudo":"Obrigado pelas informações! Como posso te ajudar? 😊","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-007","tipo":"atendimento","nome":"Saudação — No que posso ajudar, por gentileza","atalho":"/a-saudacao-07","categoria":"Saudações","grupo":"Atendimento geral","contexto":"SAUDAÇÃO","conteudo":"No que posso ajudar, por gentileza?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-008","tipo":"atendimento","nome":"Saudação — Qual endereço deseja atendimento","atalho":"/a-saudacao-08","categoria":"Saudações","grupo":"Atendimento geral","contexto":"SAUDAÇÃO","conteudo":"Qual endereço deseja atendimento?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-009","tipo":"atendimento","nome":"Saudação — Vou verificar agora mesmo e farei o possível…","atalho":"/a-saudacao-09","categoria":"Saudações","grupo":"Atendimento geral","contexto":"SAUDAÇÃO","conteudo":"Vou verificar agora mesmo e farei o possível para resolver o problema em seu acesso.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-010","tipo":"atendimento","nome":"Saudação — Aguarde um instante enquanto encaminho você ao…","atalho":"/a-saudacao-10","categoria":"Saudações","grupo":"Atendimento geral","contexto":"SAUDAÇÃO","conteudo":"Peço que aguarde um instante enquanto encaminho você ao setor *SAC 5G*. Por lá, nossa equipe especializada fará a análise detalhada da sua demanda, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-011","tipo":"atendimento","nome":"Saudação — Por questão de segurança, confirme os seguintes…","atalho":"/a-saudacao-11","categoria":"Saudações","grupo":"Atendimento geral","contexto":"SAUDAÇÃO","conteudo":"Por questão de segurança, confirme os seguintes dados, por gentileza:\n\n*Nome completo do titular: *\n*Data de nascimento: *\n*Rua: *\n*Bairro: *\n*Número da residência: *","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-012","tipo":"atendimento","nome":"Dados Incorretos — O bairro informado está diferente do que mostra…","atalho":"/a-dados-incorretos-01","categoria":"Respostas","grupo":"Atendimento geral","contexto":"DADOS INCORRETOS","conteudo":"O bairro informado está diferente do que mostra em cadastro, verifique por gentileza.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-013","tipo":"atendimento","nome":"Dados Incorretos — A rua informada está diferente do que mostra em…","atalho":"/a-dados-incorretos-02","categoria":"Respostas","grupo":"Atendimento geral","contexto":"DADOS INCORRETOS","conteudo":"A rua informada está diferente do que mostra em cadastro, verifique por gentileza.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-014","tipo":"atendimento","nome":"Dados Incorretos — A data de nascimento informada difere da que…","atalho":"/a-dados-incorretos-03","categoria":"Respostas","grupo":"Atendimento geral","contexto":"DADOS INCORRETOS","conteudo":"A data de nascimento informada difere da que consta em cadastro, verifique por gentileza.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-015","tipo":"atendimento","nome":"Dados Incorretos — O nome do titular está diferente do que mostra…","atalho":"/a-dados-incorretos-04","categoria":"Respostas","grupo":"Atendimento geral","contexto":"DADOS INCORRETOS","conteudo":"O nome do titular está diferente do que mostra em cadastro, verifique por gentileza.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-016","tipo":"atendimento","nome":"Dados Incorretos — O endereço está divergente em nosso sistema,…","atalho":"/a-dados-incorretos-05","categoria":"Respostas","grupo":"Atendimento geral","contexto":"DADOS INCORRETOS","conteudo":"Como o endereço está divergente em nosso sistema, oriento que *(em outro momento)* envie um comprovante de residência e o CPF/CNPJ do titular para o e-mail: dados@grupobrisanet.com.br para a correção ser feita.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-017","tipo":"atendimento","nome":"Encerramento — Ajudo em algo mais","atalho":"/a-encerramento-01","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"ENCERRAMENTO","conteudo":"Ajudo em algo mais? 😊","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-018","tipo":"atendimento","nome":"Encerramento — Seu serviço, no momento, está 100% operante","atalho":"/a-encerramento-02","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"ENCERRAMENTO","conteudo":"Verifiquei no sistema que seu serviço, no momento, está 100% operante. Porém, caso o problema volte a persistir, nos contate e estaremos à disposição, ok?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-019","tipo":"atendimento","nome":"Encerramento — Seu serviço, no momento, está 100% operante (2)","atalho":"/a-encerramento-03","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"ENCERRAMENTO","conteudo":"Verifiquei no sistema que seu serviço, no momento, está 100% operante. Neste caso, peço que avalie como vai ficar seu acesso no resto do dia e da semana. Caso o problema volte a persistir, ou sinta qualquer instabilidade, nos contate novamente.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-020","tipo":"atendimento","nome":"Encerramento — Disponha, fico feliz em ter ajudado","atalho":"/a-encerramento-04","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"ENCERRAMENTO","conteudo":"Disponha, fico feliz em ter ajudado!","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-021","tipo":"atendimento","nome":"Encerramento — Disponha","atalho":"/a-encerramento-05","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"ENCERRAMENTO","conteudo":"Disponha! Eu que agradeço por sua atenção e compreensão.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-022","tipo":"atendimento","nome":"Encerramento — Ótimo! Dessa forma, agradeço por sua atenção e…","atalho":"/a-encerramento-06","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"ENCERRAMENTO","conteudo":"Ótimo! Dessa forma, agradeço por sua atenção e compreensão!","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-023","tipo":"atendimento","nome":"Encerramento — Dessa forma, no momento, ficou alguma dúvida ou…","atalho":"/a-encerramento-07","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"ENCERRAMENTO","conteudo":"Dessa forma, no momento, ficou alguma dúvida ou ajudo em algo mais? 🥰","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-024","tipo":"atendimento","nome":"Encerramento — Esse atendimento está sendo encerrado por falta…","atalho":"/a-encerramento-08","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"ENCERRAMENTO","conteudo":"Esse atendimento está sendo encerrado por falta de resposta do(a) cliente. A Brisanet agradece seu contato. Caso preferir, pode entrar em contato com o 0800 281 3017 *(grátis para celular)*, escritório local, site: *www.brisanet.com.br* e *redes sociais*.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-025","tipo":"atendimento","nome":"Encerramento — Agradeço pela sua atenção e te desejo um…","atalho":"/a-encerramento-09","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"ENCERRAMENTO","conteudo":"Agradeço pela sua atenção e te desejo um excelente dia! Um grande abraço, fique com Deus! 💙💙","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-026","tipo":"atendimento","nome":"Encerramento — Gostaria de pedir sua ajuda para avaliar o meu…","atalho":"/a-encerramento-10","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"ENCERRAMENTO","conteudo":"Gostaria de pedir sua ajuda para avaliar o meu atendimento. Sua opinião é fundamental para melhorarmos nossos serviços. 😊🧡","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-027","tipo":"atendimento","nome":"Encerramento — Peço desculpa pela demora em te responder,…","atalho":"/a-encerramento-11","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"ENCERRAMENTO","conteudo":"Peço desculpa pela demora em te responder, neste momento, estamos com um volume alto de contato e, por isso, você ficou esperando um tempinho para ser atendido.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-028","tipo":"atendimento","nome":"Inatividade — Poxa! Como você não falou nada, terei de…","atalho":"/a-inatividade-01","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"INATIVIDADE","conteudo":"Poxa! Como você não falou nada, terei de finalizar o nosso atendimento. Mas não se preocupe, você pode entrar em contato novamente por este canal ou com o nosso 0800 281 3017. Sempre que precisar, conte conosco. Tchau!","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-029","tipo":"atendimento","nome":"Inatividade — Poxa! Nosso atendimento está sendo encerrado…","atalho":"/a-inatividade-02","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"INATIVIDADE","conteudo":"Poxa! Nosso atendimento está sendo encerrado por falta de comunicação. A Brisanet agradece seu contato. Caso preferir, pode entrar em contato com o 0800 281 3017 *(grátis para celular)*, escritório local, site: *www.brisanet.com.br* e *redes sociais*. 🧡🧡🧡","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-030","tipo":"atendimento","nome":"Cliente Não Confirma Os Dados — Você não me confirmou as informações…","atalho":"/a-cliente-nao-confirma-o-01","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"Cliente não CONFIRMA OS DADOS","conteudo":"Como você não me confirmou as informações solicitadas e por questão de segurança dos dados pessoais do titular, não posso seguir com nosso atendimento. Peço que entre em contato em outro momento com o nome e endereço completo, e data de nascimento do titular, tudo bem? !","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-031","tipo":"atendimento","nome":"Outros — Peço desculpas pelos transtornos causados, o…","atalho":"/a-outros-01","categoria":"Respostas","grupo":"Atendimento geral","contexto":"OUTROS","conteudo":"Peço desculpas pelos transtornos causados, o quanto antes seu serviço será normalizado.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-032","tipo":"atendimento","nome":"Outros — Esse procedimento pode ser visto com o setor ,…","atalho":"/a-outros-02","categoria":"Orientações","grupo":"Atendimento geral","contexto":"OUTROS","conteudo":"Esse procedimento pode ser visto com o setor *[setor]*, tudo bem? Peço que aguarde um instante enquanto repasso você à *[fila]* do setor responsável.","variaveis":["fila","setor"],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-033","tipo":"atendimento","nome":"Outros — O endereço informado se trata de um ponto…","atalho":"/a-outros-03","categoria":"Respostas","grupo":"Atendimento geral","contexto":"OUTROS","conteudo":"Como o endereço informado se trata de um ponto corporativo e, para que possamos atender melhor a sua demanda, estarei transferindo você ao setor *Suporte Corporativo*. Só um instante!","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-034","tipo":"atendimento","nome":"Outros — A plataforma está passando por problemas…","atalho":"/a-outros-04","categoria":"Respostas","grupo":"Atendimento geral","contexto":"OUTROS","conteudo":"No momento a plataforma está passando por problemas técnicos que impossibilitam baixar áudio, pode escrever por gentileza.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-035","tipo":"atendimento","nome":"Outros — Lamento o tempo de espera","atalho":"/a-outros-05","categoria":"Respostas","grupo":"Atendimento geral","contexto":"OUTROS","conteudo":"Lamento o tempo de espera. No momento estamos com uma alta demanda de atendimento. 💬","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-036","tipo":"atendimento","nome":"Outros — Nossa central de atendimentos está disponível…","atalho":"/a-outros-06","categoria":"Respostas","grupo":"Atendimento geral","contexto":"OUTROS","conteudo":"Nossa central de atendimentos está disponível para chamadas. Contato: 10517","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-037","tipo":"atendimento","nome":"Sondagem — Me informe qual o problema específico que está…","atalho":"/a-sondagem-01","categoria":"Solicitações","grupo":"Atendimento geral","contexto":"SONDAGEM","conteudo":"Por gentileza, me informe qual o problema específico que está ocorrendo em sua conexão. *Ex.: * lentidão, quedas na conexão, sem acesso total…","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-038","tipo":"atendimento","nome":"Instabilidade — Esse é um problema que está ocorrendo em todos…","atalho":"/a-instabilidade-01","categoria":"Solicitações","grupo":"Atendimento geral","contexto":"INSTABILIDADE","conteudo":"Esse é um problema que está ocorrendo em todos os aparelhos conectados?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-039","tipo":"atendimento","nome":"Instabilidade — Independente de estar perto ou longe do roteador","atalho":"/a-instabilidade-02","categoria":"Solicitações","grupo":"Atendimento geral","contexto":"INSTABILIDADE","conteudo":"Independente de estar perto ou longe do roteador?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-040","tipo":"atendimento","nome":"Instabilidade — Tem horários específicos para que isso ocorra","atalho":"/a-instabilidade-03","categoria":"Solicitações","grupo":"Atendimento geral","contexto":"INSTABILIDADE","conteudo":"Tem horários específicos para que isso ocorra?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-041","tipo":"atendimento","nome":"Instabilidade Geral Na Rede — Está acontecendo uma instabilidade geral na…","atalho":"/a-instabilidade-geral-na-01","categoria":"Solicitações","grupo":"Atendimento geral","contexto":"INSTABILIDADE GERAL NA REDE","conteudo":"No momento está acontecendo uma instabilidade geral na rede, o nosso setor de programação está trabalhando para resolver esse problema o mais breve possível, foi repassado um prazo de 1 hora para normalizar o serviço, dessa forma pode aguardar que a qualquer momento o serviço já pode estabilizar no local, Tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-042","tipo":"atendimento","nome":"Plano Não Chega — O problema informado ocorre nos dispositivos…","atalho":"/a-plano-nao-chega-01","categoria":"Solicitações","grupo":"Atendimento geral","contexto":"PLANO NÃO CHEGA","conteudo":"O problema informado ocorre nos dispositivos conectados via rede Wi-Fi, via rede cabeada ou nos dois?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-043","tipo":"atendimento","nome":"Plano Não Chega — Efetue um novo teste de velocidade, tire e…","atalho":"/a-plano-nao-chega-02","categoria":"Solicitações","grupo":"Atendimento geral","contexto":"PLANO NÃO CHEGA","conteudo":"Por gentileza, efetue um novo teste de velocidade, tire e envie um print ou foto para que eu possa analisar, ok?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-044","tipo":"atendimento","nome":"Plano Não Chega — Para verificar a velocidade máxima de conexão,…","atalho":"/a-plano-nao-chega-03","categoria":"Solicitações","grupo":"Atendimento geral","contexto":"PLANO NÃO CHEGA","conteudo":"Para verificar a velocidade máxima de conexão, por gentileza, acesse *Painel de Controle>Rede e Internet>Central de Rede e Compartilhamento>Alterar as configurações do adaptador*. Agora, clique com botão direito do mouse sobre a conexão de rede *cabeada* e, em seguida, clique em \"Status\".","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-045","tipo":"atendimento","nome":"Plano Não Chega — Está realizando testes na rede Wi-Fi ou na rede…","atalho":"/a-plano-nao-chega-04","categoria":"Solicitações","grupo":"Atendimento geral","contexto":"PLANO NÃO CHEGA","conteudo":"Está realizando testes na rede Wi-Fi ou na rede cabeada?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-046","tipo":"atendimento","nome":"Plano Não Chega — Verifique se no modem (pequeno sem antenas) tem…","atalho":"/a-plano-nao-chega-05","categoria":"Solicitações","grupo":"Atendimento geral","contexto":"PLANO NÃO CHEGA","conteudo":"Por gentileza, verifique se no modem (pequeno sem antenas) tem um cabo conectado na porta *LAN 1*. Logo em seguida, verifique se a outra extremidade desse cabo está conectado na porta *WAN* do roteador *TP-LINK* (com antenas).","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-047","tipo":"atendimento","nome":"Equipamento Particular — Referente a esse procedimento, você deve estar…","atalho":"/a-equipamento-particular-01","categoria":"Solicitações","grupo":"Atendimento geral","contexto":"EQUIPAMENTO PARTICULAR","conteudo":"Referente a esse procedimento, você deve estar adquirindo um roteador de caráter particular e contactando um técnico, também de caráter particular, especializado nessa área, para que possa ser configurado corretamente, ok?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-048","tipo":"atendimento","nome":"Plano Não Chega Ao Contratado — A Brisanet não garante a entrega do plano…","atalho":"/a-plano-nao-chega-ao-con-01","categoria":"Solicitações","grupo":"Atendimento geral","contexto":"PLANO NÃO CHEGA AO CONTRATADO","conteudo":"A Brisanet não garante a entrega do plano contratado por meio de conexão sem fio, apenas por conexão cabeada, tendo em vista que a conexão sem fio é uma conexão difusa que possibilita interferências e problemas de conexão, não ofertando um teste confiável na entrega do plano, mesmo que você esteja próximo do equipamento. Tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-049","tipo":"atendimento","nome":"Plano Não Chega Ao Contratado — O teste deve ser realizado somente via cabo,…","atalho":"/a-plano-nao-chega-ao-con-02","categoria":"Orientações","grupo":"Atendimento geral","contexto":"PLANO NÃO CHEGA AO CONTRATADO","conteudo":"O teste deve ser realizado somente via cabo, conforme resolução da Anatel.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-050","tipo":"atendimento","nome":"Plano Não Chega Ao Contratado — Além disso, devido a rede se comportar de…","atalho":"/a-plano-nao-chega-ao-con-03","categoria":"Orientações","grupo":"Atendimento geral","contexto":"PLANO NÃO CHEGA AO CONTRATADO","conteudo":"Além disso, devido a rede se comportar de maneira diferente em cada dispositivo, pode ocorrer do smartphone (ou dispositivos em geral) não suportar o plano contratado.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-051","tipo":"atendimento","nome":"Plano Não Chega Ao Contratado — A nível de melhorar o seu acesso, vou realizar…","atalho":"/a-plano-nao-chega-ao-con-04","categoria":"Orientações","grupo":"Atendimento geral","contexto":"PLANO NÃO CHEGA AO CONTRATADO","conteudo":"A nível de melhorar o seu acesso, vou realizar alguns procedimentos no sistema. Porém, esse procedimento não vai fazer com que a velocidade chegue conforme o contratado, visto que o teste está sendo feito via wi-fi, onde é uma rede propicia a muita interferência e não proporciona um teste correto.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-052","tipo":"atendimento","nome":"Plano Não Chega Ao Contratado — Todos os testes de conectividade deverão ser…","atalho":"/a-plano-nao-chega-ao-con-05","categoria":"Orientações","grupo":"Atendimento geral","contexto":"PLANO NÃO CHEGA AO CONTRATADO","conteudo":"*Todos os testes de conectividade deverão ser efetuados por meios cabeados (Ethernet). Você pode estar verificando no contrato e nos anexos contratuais no site da brisanet seguindo o seguinte procedimento: Regulatórios>Particularidades técnicas>Em vigência>Internet>Acesse aqui.*","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-053","tipo":"atendimento","nome":"Plano Não Chega Ao Contratado — Caso não seja possível realizar os testes na…","atalho":"/a-plano-nao-chega-ao-con-06","categoria":"Solicitações","grupo":"Atendimento geral","contexto":"PLANO NÃO CHEGA AO CONTRATADO","conteudo":"Caso não seja possível realizar os testes na rede cabeada, posso enviar um de nossos técnicos no local, com um notebook e um cabo de rede, onde o mesmo irá efetuar vários testes em sua presença, a fim de confirmar que o plano está sendo entregue como o contratado, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-054","tipo":"atendimento","nome":"Redes Unificadas — Foi instalado na sua residência o equipamento…","atalho":"/a-redes-unificadas-01","categoria":"Orientações","grupo":"Atendimento geral","contexto":"REDES UNIFICADAS","conteudo":"Obrigado por aguardar! Verifiquei no sistema que foi instalado na sua residência o equipamento mais recente que a empresa fornece, onde, este equipamento, unifica as duas redes Wi-Fi (2.4 e 5.8) em uma só. Nos seus dispositivos irá aparecer apenas uma rede, [nome_rede], porém os dispositivos irão se conectar de acordo com a inteligência de cada um.","variaveis":["nome_rede"],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-055","tipo":"atendimento","nome":"Personalizar A Rede Wifi — Infelizmente não é possível personalizar a senha","atalho":"/a-personalizar-a-rede-wi-01","categoria":"Orientações","grupo":"Atendimento geral","contexto":"PERSONALIZAR A REDE WIFI","conteudo":"Infelizmente não é possível personalizar a senha. As senhas são geradas automaticamente pelo sistema de forma aleatória, seguindo um padrão de letras e números. Caso haja realmente a necessidade desse procedimento, é necessário um roteador particular, assim, todas as alterações desejadas ficarão a seu critério.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-056","tipo":"atendimento","nome":"Personalizar A Rede Wifi — Infelizmente não é possível personalizar o nome…","atalho":"/a-personalizar-a-rede-wi-02","categoria":"Orientações","grupo":"Atendimento geral","contexto":"PERSONALIZAR A REDE WIFI","conteudo":"Infelizmente não é possível personalizar o nome da rede Wi-Fi. O nome e senha são gerados automaticamente pelo sistema e não podem ser personalizados. Para procedimentos como esse, é necessário um roteador particular, assim, todas as alterações desejadas ficarão a seu critério.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-057","tipo":"atendimento","nome":"Câmera Particular — Esses equipamentos instalados no local ele tem…","atalho":"/a-camera-particular-01","categoria":"Orientações","grupo":"Atendimento geral","contexto":"CÂMERA PARTICULAR","conteudo":"Esses equipamentos instalados no local ele tem as redes unificadas, não é possível fazer a separação das duas frequências","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-058","tipo":"atendimento","nome":"Câmera Particular — A única forma de resolver isso é instalando um…","atalho":"/a-camera-particular-02","categoria":"Orientações","grupo":"Atendimento geral","contexto":"CÂMERA PARTICULAR","conteudo":"A única forma de resolver isso é instalando um roteador particular com as duas redes separadas","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-059","tipo":"atendimento","nome":"Câmera Particular — Ou a brisanet pode trocar esses equipamentos no…","atalho":"/a-camera-particular-03","categoria":"Orientações","grupo":"Atendimento geral","contexto":"CÂMERA PARTICULAR","conteudo":"Ou a brisanet pode trocar esses equipamentos no local por um modelo mais antigo onde tem essas duas redes separadas, porém nesse modelo você só tem acesso a uma entrada para cabear dispositivos no local, caso deseje posso solicitar a troca","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-060","tipo":"atendimento","nome":"Alcance Do Wifi — O modem brisanet pode chegar de 7 a 10 metros…","atalho":"/a-alcance-do-wifi-01","categoria":"Orientações","grupo":"Atendimento geral","contexto":"ALCANCE DO WIFI","conteudo":"O modem brisanet pode chegar de 7 a 10 metros quadrados em relação a distância percorrida dentro da residência, isso não havendo bloqueios como portas, paredes, forros, móveis e etc. Algumas vezes é viável possuir um roteador de caráter particular instalado em um local estratégico da casa para que assim tenha maior cobertura de sinal WI-FI.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-061","tipo":"atendimento","nome":"Alcance Do Wifi — Os roteadores/repetidores de sinal Wi-Fi são…","atalho":"/a-alcance-do-wifi-02","categoria":"Orientações","grupo":"Atendimento geral","contexto":"ALCANCE DO WIFI","conteudo":"Os roteadores/repetidores de sinal Wi-Fi são equipamentos disponíveis no mercado usados para ampliar o sinal da internet. Se em sua residência tem muitas barreiras entre o roteador que emite o sinal Wi-Fi e os equipamentos que necessitam de acesso à rede, o ideal seria adquirir um roteador particular para uma melhor distribuição do sinal em sua residência.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-062","tipo":"atendimento","nome":"Alcance Do Wifi — Nesses casos onde o equipamento da brisanet não…","atalho":"/a-alcance-do-wifi-03","categoria":"Solicitações","grupo":"Atendimento geral","contexto":"ALCANCE DO WIFI","conteudo":"Nesses casos onde o equipamento da brisanet não está sendo suficiente para entrega do sinal na residência do cliente a brisanet orienta o cliente a instalar um segundo ponto de acesso no caso um roteador particular nesses pontos onde o sinal não está chegando bem, Entendeu?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-063","tipo":"atendimento","nome":"Alcance Do Wifi — Posso mandar alguém no local para verificar se…","atalho":"/a-alcance-do-wifi-04","categoria":"Solicitações","grupo":"Atendimento geral","contexto":"ALCANCE DO WIFI","conteudo":"Posso mandar alguém no local para verificar se é uma questão com o equipamento da brisanet ou se é necessário mesmo fazer isso que te orientei, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-064","tipo":"atendimento","nome":"Equipamento Compatível Com O Plano (Roteador Da Brisa) — O modem brisanet é desenvolv…","atalho":"/a-equipamento-compativel-01","categoria":"Orientações","grupo":"Atendimento geral","contexto":"EQUIPAMENTO COMPATÍVEL COM O PLANO (ROTEADOR DA BRISA)","conteudo":"O modem brisanet é desenvolvido para suportar planos superiores a 1GB, neste caso *ele entrega totalmente o plano contratado*. Você pode estar sofrendo problemas com a entrega do plano por alguns motivos, inicialmente se você estiver utilizando a conexão via WI-FI, *nenhuma provedora de internet pode garantir a entrega do plano contratado*, tendo em vista que a conexão via WI-FI sofre *muita interferência*. Se você estiver utilizando conexão via cabo, a ANATEL exige que a provedora garanta do seu plano *pelo menos 80% para download e upload*. você deve verificar se o cabo de rede é um cabo *CAT-5E (1GB) ou superior*, pois cabos abaixo dessa especificação podem fazer com que você tenha bloqueios na entrega de plano. Você necessita também verificar se a placa de rede do seu dispositivo conectado via cabo, *se a mesma é Gigabyte*, pois se for inferior, pode ocorrer que a mesma barre o plano contratado, impedindo você de ter bons resultados. Saliento também que *todo teste de velocidade deve ser realizado em um computador/notebook conectado a internet via cabo*, pois somente dessa forma você pode verificar a real conexão que está chegando ao contratado.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-065","tipo":"atendimento","nome":"Sem Acesso (Tudo Normal) — As primeiras verificações mostraram que, com o…","atalho":"/a-sem-acesso-tudo-normal-01","categoria":"Respostas","grupo":"Internet","contexto":"SEM ACESSO (TUDO NORMAL)","conteudo":"As primeiras verificações mostraram que, com o nosso equipamento, no sistema, está tudo normal. Mas como você está sem acesso, isso pode significar que o equipamento travou, Talvez haja uma falha de autenticação com a sua senha de acesso atual ou que esteja ocorrendo um problema físico, no cabo da fibra ou nos conectores.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-066","tipo":"atendimento","nome":"Sem Acesso (Tudo Normal) — Aguarde mais um momento enquanto executo os…","atalho":"/a-sem-acesso-tudo-normal-02","categoria":"Respostas","grupo":"Internet","contexto":"SEM ACESSO (TUDO NORMAL)","conteudo":"Aguarde mais um momento enquanto executo os devidos procedimentos para reparar o acesso, certo? Já peço para você verificar novamente.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-067","tipo":"atendimento","nome":"Sem Acesso (Tudo Normal) — Obrigado por aguardar, por gentileza desligue…","atalho":"/a-sem-acesso-tudo-normal-03","categoria":"Respostas","grupo":"Internet","contexto":"SEM ACESSO (TUDO NORMAL)","conteudo":"Obrigado por aguardar, por gentileza desligue os nossos equipamentos da tomada e, em seguida, ligue-os novamente. Após isso, verifique o seu acesso.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-068","tipo":"atendimento","nome":"Sem Acesso (Tudo Normal - Externo) — Conforme foram efetuados todos os procedimentos…","atalho":"/a-sem-acesso-tudo-normal-04","categoria":"Solicitações","grupo":"Internet","contexto":"SEM ACESSO (TUDO NORMAL - EXTERNO)","conteudo":"Conforme foram efetuados todos os procedimentos cabíveis a fim da resolução do problema, e você informa que ainda persiste, será necessário abrir um chamado externo, para que um de nossos técnicos possa ir ao local fazer verificações e procedimentos mais específicos a fim de normalizar o seu serviço, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-069","tipo":"atendimento","nome":"Sem Gerência Tp-Link — Vi aqui no sistema que o motivo da sua falta de…","atalho":"/a-sem-gerencia-tp-link-01","categoria":"Respostas","grupo":"Internet","contexto":"SEM GERÊNCIA TP-LINK","conteudo":"Vi aqui no sistema que o motivo da sua falta de acesso é devido seu roteador está sem gerência, é um erro no sistema desse aparelho maior.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-070","tipo":"atendimento","nome":"Sem Gerência Tp-Link — Estou fazendo algumas atualizações no sistema…","atalho":"/a-sem-gerencia-tp-link-02","categoria":"Solicitações","grupo":"Internet","contexto":"SEM GERÊNCIA TP-LINK","conteudo":"Estou fazendo algumas atualizações no sistema para tentar normalizar esse seu serviço, Tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-071","tipo":"atendimento","nome":"Sem Gerência Tp-Link — Para finalizar as atualizações no sistema pode…","atalho":"/a-sem-gerencia-tp-link-03","categoria":"Respostas","grupo":"Internet","contexto":"SEM GERÊNCIA TP-LINK","conteudo":"Para finalizar as atualizações no sistema pode reiniciar os dois equipamentos da tomada no local, por gentileza","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-072","tipo":"atendimento","nome":"Sem Gerência Tp-Link — Verifiquei em sistema e mostra que o cabo de…","atalho":"/a-sem-gerencia-tp-link-04","categoria":"Problemas","grupo":"Internet","contexto":"SEM GERÊNCIA TP-LINK","conteudo":"Verifiquei em sistema e mostra que o cabo de rede não está conectado na porta LAN 1 do modem (aparelho menor), verifique por gentileza.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-073","tipo":"atendimento","nome":"Sem Gerência Tp-Link — Finalizei as atualizações de forma remota, pode…","atalho":"/a-sem-gerencia-tp-link-05","categoria":"Solicitações","grupo":"Internet","contexto":"SEM GERÊNCIA TP-LINK","conteudo":"Finalizei as atualizações de forma remota, pode testar agora se normalizou?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-074","tipo":"atendimento","nome":"Aberto O.S — Foi feito todos os procedimentos de forma…","atalho":"/a-aberto-o-s-01","categoria":"Solicitações","grupo":"Internet","contexto":"ABERTO O.S","conteudo":"Como foi feito todos os procedimentos de forma remota porém sem sucesso, dessa forma vou encaminhar uma equipe no local para que possa verificar esse problema com você certo?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-075","tipo":"atendimento","nome":"Crm Travado Na Tl1 — O seu serviço foi bloqueado, mas agora…","atalho":"/a-crm-travado-na-tl1-01","categoria":"Problemas","grupo":"Internet","contexto":"CRM TRAVADO NA TL1","conteudo":"Verifiquei no sistema que o seu serviço foi bloqueado, mas agora encontra-se ativo; porém, o prazo para o restabelecimento da conexão, após a quitação do débito, é de 24 horas, podendo voltar antes.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-076","tipo":"atendimento","nome":"Crm Travado Na Tl1 — Quando é solicitado o desbloqueio do serviço, é…","atalho":"/a-crm-travado-na-tl1-02","categoria":"Respostas","grupo":"Internet","contexto":"CRM TRAVADO NA TL1","conteudo":"Quando é solicitado o desbloqueio do serviço, é enviado um comando no servidor. Assim que esse comando é concluído, o sinal retorna. Devido à alta demanda de comandos como esses em todos os servidores, os desbloqueios estão demorando um pouco mais para serem efetuados.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-077","tipo":"atendimento","nome":"Crm Travado Na Tl1 — Mas pode ficar tranquilo, acabei de efetuar um…","atalho":"/a-crm-travado-na-tl1-03","categoria":"Solicitações","grupo":"Internet","contexto":"CRM TRAVADO NA TL1","conteudo":"Mas pode ficar tranquilo, acabei de efetuar um processo no servidor que fará com que o seu comando finalize mais rápido, na lista de prioridade, ok?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-078","tipo":"atendimento","nome":"Crm Travado Na Tl1 — Obrigado por aguardar, pode verificar o seu…","atalho":"/a-crm-travado-na-tl1-04","categoria":"Solicitações","grupo":"Internet","contexto":"CRM TRAVADO NA TL1","conteudo":"Obrigado por aguardar, pode verificar o seu acesso novamente?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-079","tipo":"atendimento","nome":"Nenhuma Led Ativa — Em sua casa algum chegou a manusear ou causar…","atalho":"/a-nenhuma-led-ativa-01","categoria":"Solicitações","grupo":"Internet","contexto":"NENHUMA LED ATIVA","conteudo":"Em sua casa algum chegou a manusear ou causar algum dano nesse equipamento?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-080","tipo":"atendimento","nome":"Nenhuma Led Ativa — Houve queda de energia, chuva ou infiltração,…","atalho":"/a-nenhuma-led-ativa-02","categoria":"Solicitações","grupo":"Internet","contexto":"NENHUMA LED ATIVA","conteudo":"Houve queda de energia, chuva ou infiltração, Próximo do equipamento?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-081","tipo":"atendimento","nome":"Nenhuma Led Ativa — Nesse caso como não tem nenhuma led ativa no…","atalho":"/a-nenhuma-led-ativa-03","categoria":"Solicitações","grupo":"Internet","contexto":"NENHUMA LED ATIVA","conteudo":"Nesse caso como não tem nenhuma led ativa no equipamento, pode ser algum problema com a fonte do equipamento, dessa forma vou mandar uma equipe no local para verificar com você, Certo?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-082","tipo":"atendimento","nome":"Nenhuma Led Ativa — Se for identificado algum manuseio ou dano…","atalho":"/a-nenhuma-led-ativa-04","categoria":"Solicitações","grupo":"Internet","contexto":"NENHUMA LED ATIVA","conteudo":"Se for identificado algum manuseio ou dano ocasionado por alguem no local pode ser gerado valores, Tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-083","tipo":"atendimento","nome":"Rádio Travado — As primeiras verificações mostraram que, com o…","atalho":"/a-radio-travado-01","categoria":"Respostas","grupo":"Internet","contexto":"RÁDIO TRAVADO","conteudo":"As primeiras verificações mostraram que, com o nosso equipamento, no sistema, está tudo normal. Mas como você está sem acesso, isso pode significar que o equipamento travou, seja por oscilações ou quedas na energia.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-084","tipo":"atendimento","nome":"Rádio Travado — Desligue o nosso equipamento da tomada e, em…","atalho":"/a-radio-travado-02","categoria":"Solicitações","grupo":"Internet","contexto":"RÁDIO TRAVADO","conteudo":"Por gentileza, desligue o nosso equipamento da tomada e, em seguida, ligue-o novamente. Após isso, verifique o seu acesso.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-085","tipo":"atendimento","nome":"Inadiplência Financeira — Verifiquei aqui no sistema e vi que você está…","atalho":"/a-inadiplencia-financeir-01","categoria":"Solicitações","grupo":"Internet","contexto":"INADIPLÊNCIA FINANCEIRA","conteudo":"Verifiquei aqui no sistema e vi que você está sem acesso devido um bloqueio na sua parte financeira, e devido isso acabou deixando o seu contrato BLOQUEADO, Certo?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-086","tipo":"atendimento","nome":"Inadiplência Financeira — Para restabelecer o serviço só quitar a fatura…","atalho":"/a-inadiplencia-financeir-02","categoria":"Solicitações","grupo":"Internet","contexto":"INADIPLÊNCIA FINANCEIRA","conteudo":"Para restabelecer o serviço só quitar a fatura em atraso ou solicitar o desbloqueio temporário no aplicativo, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-087","tipo":"atendimento","nome":"Inadiplência Financeira — Ou se você quiser posso te passar para o setor…","atalho":"/a-inadiplencia-financeir-03","categoria":"Solicitações","grupo":"Internet","contexto":"INADIPLÊNCIA FINANCEIRA","conteudo":"Ou se você quiser posso te passar para o setor financeiro, para solicitar isso, Da certo?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-088","tipo":"atendimento","nome":"Rota Inoperante — Verifiquei no sistema e constatei que você está…","atalho":"/a-rota-inoperante-01","categoria":"Problemas","grupo":"Internet","contexto":"ROTA INOPERANTE","conteudo":"Verifiquei no sistema e constatei que você está sem acesso devido a rota no qual você é conectado(a) está inoperante, decorrente de um rompimento na fibra óptica que atende sua área.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-089","tipo":"atendimento","nome":"Rota Inoperante — Porém, como o problema já foi identificado e…","atalho":"/a-rota-inoperante-02","categoria":"Respostas","grupo":"Internet","contexto":"ROTA INOPERANTE","conteudo":"Porém, como o problema já foi identificado e nossa equipe está trabalhando para normalização, peço que, de tempos em tempos, verifique a sua conexão, pois a qualquer momento o serviço retorna, tudo bem? 🧡🧡","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-090","tipo":"atendimento","nome":"Rota Inoperante — Além disso, como se trata de um problema geral…","atalho":"/a-rota-inoperante-03","categoria":"Respostas","grupo":"Internet","contexto":"ROTA INOPERANTE","conteudo":"Além disso, como se trata de um problema geral na rede, o prazo para normalização do serviço é de até 24 horas. A Brisanet está acelerando o reparo e o chamado foi aberto com urgência para que o serviço seja restabelecido o mais rápido possível. Tudo bem? 🧡🧡","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-091","tipo":"atendimento","nome":"Rota Inoperante — Se desejar, pode contactar o setor financeiro…","atalho":"/a-rota-inoperante-04","categoria":"Respostas","grupo":"Internet","contexto":"ROTA INOPERANTE","conteudo":"Se desejar, pode contactar o setor financeiro após o serviço retornar e solicitar desconto na fatura pelas horas sem acesso.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-092","tipo":"atendimento","nome":"Rota Inoperante — Infelizmente em sua região e cidade a nossa…","atalho":"/a-rota-inoperante-05","categoria":"Problemas","grupo":"Internet","contexto":"ROTA INOPERANTE","conteudo":"Infelizmente em sua região e cidade a nossa empresa está sendo alvo de bastante vandalismo, seja elas na fibra ou nas próprias caixas, e no momento infelizmente a sua rota foi afetada.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-093","tipo":"atendimento","nome":"Rota Inoperante — Infelizmente o reparo tem demorado mais que o…","atalho":"/a-rota-inoperante-06","categoria":"Solicitações","grupo":"Internet","contexto":"ROTA INOPERANTE","conteudo":"Infelizmente o reparo tem demorado mais que o esperado, mas as equipes de campo estão trabalhando para restabelecer o serviço o mais rápido possível. Peço que aguarde, ok?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-094","tipo":"atendimento","nome":"Rota Inoperante — Dessa forma, realizei uma cobrança via sistema,…","atalho":"/a-rota-inoperante-07","categoria":"Respostas","grupo":"Internet","contexto":"ROTA INOPERANTE","conteudo":"Dessa forma, realizei uma cobrança via sistema, onde a equipe vai ser notificada e tratará o reparo com urgência, visto que a falta de acesso também prejudica outros clientes.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-095","tipo":"atendimento","nome":"Rota Inoperante — A empresa pede as mais sinceras desculpas e…","atalho":"/a-rota-inoperante-08","categoria":"Problemas","grupo":"Internet","contexto":"ROTA INOPERANTE","conteudo":"A empresa pede as mais sinceras desculpas e gostaríamos de deixar você ciente de que resolveremos o seu problema o mais depressa possível, podendo normalizar a qualquer momento. Peço, por gentileza, que aguarde.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-096","tipo":"atendimento","nome":"Rota Inoperante — Sinto muito que você esteja passando por isso","atalho":"/a-rota-inoperante-09","categoria":"Problemas","grupo":"Internet","contexto":"ROTA INOPERANTE","conteudo":"Sinto muito que você esteja passando por isso. Assim como você sou consumidor e sei o quão complicado é ficar sem acesso, além de entender os impactos que a falta de acesso pode promover. Mas como se trata de um problema externo complexo. Apenas as equipes de campo podem verificar.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-097","tipo":"atendimento","nome":"Rota Inoperante — Geralmente quando ocorre esse tipo de problema,…","atalho":"/a-rota-inoperante-10","categoria":"Respostas","grupo":"Internet","contexto":"ROTA INOPERANTE","conteudo":"Geralmente quando ocorre esse tipo de problema, as equipes têm um prazo inicial de 72h para normalizar o serviço, mas dependendo da complexidade ou se ocorrer algo que possa atrapalhar o serviço, como chuvas ou troca de poste que depende da empresa de energia do estado, pode demorar um pouco mais.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-098","tipo":"atendimento","nome":"Rota Inoperante — A Brisanet garante aos seus clientes um prazo…","atalho":"/a-rota-inoperante-11","categoria":"Orientações","grupo":"Internet","contexto":"ROTA INOPERANTE","conteudo":"A Brisanet garante aos seus clientes um prazo máximo de 72 horas para reparos em rompimentos de fibra, enquanto a Anatel estabelece um prazo de até 10 dias para esse tipo de serviço. Essa redução no prazo visa minimizar o impacto nos serviços prestados aos nossos clientes, garantindo uma rápida resolução de problemas que possam afetar a conectividade.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-099","tipo":"atendimento","nome":"Rota Inoperante — Quando o serviço retornar, você poderá entrar…","atalho":"/a-rota-inoperante-12","categoria":"Respostas","grupo":"Internet","contexto":"ROTA INOPERANTE","conteudo":"Quando o serviço retornar, você poderá entrar em contato com o setor financeiro pelo nosso *0800 281 3017* e solicitar o desconto referente ao período que ficou sem o serviço.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-100","tipo":"atendimento","nome":"Servidor Inoperante — Com as informações repassadas, fiz a…","atalho":"/a-servidor-inoperante-01","categoria":"Problemas","grupo":"Internet","contexto":"SERVIDOR INOPERANTE","conteudo":"Com as informações repassadas, fiz a verificação do problema no sistema, e identifiquei que o servidor no qual você é conectado está inoperante, no momento. Isto significa que todos os clientes conectados neste mesmo servidor também estão sem acesso, e como se trata de um problema geral, temos um prazo máximo exigido pela *ANATEL* de 24 horas para normalização do serviço.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-101","tipo":"atendimento","nome":"Servidor Inoperante — Apesar disso, como o problema já foi…","atalho":"/a-servidor-inoperante-02","categoria":"Solicitações","grupo":"Internet","contexto":"SERVIDOR INOPERANTE","conteudo":"Apesar disso, como o problema já foi identificado, peço que, de tempos em tempos, verifique a sua conexão, pois a qualquer momento o serviço retorna. Tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-102","tipo":"atendimento","nome":"Sondagem — O(s) nosso(s) equipamento(s) está(ão) ligado(s)…","atalho":"/a-sondagem-02","categoria":"Solicitações","grupo":"Internet","contexto":"SONDAGEM","conteudo":"O(s) nosso(s) equipamento(s) está(ão) ligado(s) à energia?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-103","tipo":"atendimento","nome":"Sondagem — Verificar se tem uma LED VERMELHA piscando no…","atalho":"/a-sondagem-03","categoria":"Solicitações","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Pode verificar se tem uma *LED VERMELHA* piscando no modem (*aparelho menor*)?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-104","tipo":"atendimento","nome":"Sondagem — Antes do acesso cair, alguém chegou a manusear…","atalho":"/a-sondagem-04","categoria":"Solicitações","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Antes do acesso cair, alguém chegou a manusear o equipamento? Retirar algum cabo?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-105","tipo":"atendimento","nome":"Sondagem — Se possível, por gentileza me envie uma foto…","atalho":"/a-sondagem-05","categoria":"Solicitações","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Se possível, por gentileza me envie uma foto dos equipamentos para que eu analise.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-106","tipo":"atendimento","nome":"Sondagem — Essa luz vermelha piscando (LOS), indica um…","atalho":"/a-sondagem-06","categoria":"Respostas","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Essa luz vermelha piscando (LOS), indica um problema físico. Ela representa uma falha no conector do modem, fibra rompida, tanto dentro como fora da residência, rota inoperante, entre outros problemas. Em outras palavras, o sinal que vem da caixa lá no poste não está chegando no aparelho.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-107","tipo":"atendimento","nome":"Sondagem — Nesse caso, estou abrindo um chamado externo,…","atalho":"/a-sondagem-07","categoria":"Respostas","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Nesse caso, estou abrindo um chamado externo, onde uma de nossas equipes irá ao local para verificar e corrigir a falha. 😊 É importante ressaltar que, para que essa visita aconteça, é necessário estar com o número de protocolo deste atendimento em mãos.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-108","tipo":"atendimento","nome":"Sondagem — Nossos atendimentos são feitos dentro de 24…","atalho":"/a-sondagem-08","categoria":"Solicitações","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Nossos atendimentos são feitos dentro de 24 horas, mais nosso agendador de reparo entra em contato com você antes para alinhar esse horário da visita, Certo?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-109","tipo":"atendimento","nome":"Sondagem — Aqui na agenda apresenta vagas para hoje no…","atalho":"/a-sondagem-09","categoria":"Solicitações","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Aqui na agenda apresenta vagas para hoje no período da [periodo], posso agendar a visita?","variaveis":["periodo"],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-110","tipo":"atendimento","nome":"Sondagem — O seu atendimento depende do fluxo para a…","atalho":"/a-sondagem-10","categoria":"Respostas","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Como o seu atendimento depende do fluxo para a cidade, seu atendimento pode ocorrer a qualquer momento.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-111","tipo":"atendimento","nome":"Sondagem — Quanto a visita pode ficar tranquilo (a), pois…","atalho":"/a-sondagem-11","categoria":"Respostas","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Quanto a visita pode ficar tranquilo (a), pois solicitei urgência máxima, mediante sua necessidade.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-112","tipo":"atendimento","nome":"Sondagem — Não se preocupe, esse é apenas um prazo máximo","atalho":"/a-sondagem-12","categoria":"Solicitações","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Não se preocupe, esse é apenas um prazo máximo. Dependendo da demanda da equipe, e como solicitei urgência, eles podem ir ainda hoje, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-113","tipo":"atendimento","nome":"Sondagem — Em relação ao horário, o nosso setor de…","atalho":"/a-sondagem-13","categoria":"Orientações","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Em relação ao horário, o nosso setor de agendamento estará entrando em contato para marcar a visita, assim considerando o que se aplica melhor ao seu tempo livre.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-114","tipo":"atendimento","nome":"Sondagem — Ficar tranquilo(a) em relação à constância…","atalho":"/a-sondagem-14","categoria":"Solicitações","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Pode ficar tranquilo(a) em relação à constância desse problema, pois já estou solicitando que a equipe faça a revisão da estrutura e, caso necessário, que os técnicos efetuem o remanejamento do cabo para uma outra rota, a fim de normalizar o acesso de forma definitiva.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-115","tipo":"atendimento","nome":"Reclamação De Instalação — Sua instalação é recente, isso indica uma…","atalho":"/a-reclamacao-de-instalac-01","categoria":"Solicitações","grupo":"Internet","contexto":"RECLAMAÇÃO DE INSTALAÇÃO","conteudo":"Como sua instalação é recente, isso indica uma complicação nessa instalação, ou seja, uma instalação mal sucedida. Não é um problema comum de ocorrer, mas é possível. Peço novamente desculpas pelo inconveniente, pois será necessário enviar novamente a equipe de instalação no local para que seja verificado, ok?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-116","tipo":"atendimento","nome":"Pon Piscando Externo — Ria verificar se a LED PON está piscando ou…","atalho":"/a-pon-piscando-externo-01","categoria":"Solicitações","grupo":"Internet","contexto":"PON PISCANDO EXTERNO","conteudo":"Poderia verificar se a *LED PON* está piscando ou apagada?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-117","tipo":"atendimento","nome":"Pon Piscando Externo — A LED PON, quando piscando, indica um problema…","atalho":"/a-pon-piscando-externo-02","categoria":"Respostas","grupo":"Internet","contexto":"PON PISCANDO EXTERNO","conteudo":"A LED PON, quando piscando, indica um problema físico. Pode se tratar de uma falha no conector do modem, fibra rompida, tanto dentro como fora da residência. Em outras palavras, ela indica que o sinal que vem da caixa lá no poste não está chegando no aparelho ou está chegando muito fraco.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-118","tipo":"atendimento","nome":"Pon Piscando Externo — No caso, será necessário abrir um chamado…","atalho":"/a-pon-piscando-externo-03","categoria":"Solicitações","grupo":"Internet","contexto":"PON PISCANDO EXTERNO","conteudo":"No caso, será necessário abrir um chamado externo, onde uma de nossas equipes irá ao local para verificar e corrigir a falha. É importante ressaltar que, para que essa visita aconteça, é necessário estar com o número de protocolo deste atendimento em mãos. O prazo de atendimento é de *até 48 horas*, mas não se preocupe, pois já solicitei a prioridade *alta* em seu atendimento, para que todo o problema seja resolvido o quanto antes, ok?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-119","tipo":"atendimento","nome":"Sinal Irregular — Há uma irregularidade na conexão à fibra","atalho":"/a-sinal-irregular-01","categoria":"Problemas","grupo":"Internet","contexto":"SINAL IRREGULAR","conteudo":"Verifiquei no sistema que há uma irregularidade na conexão à fibra. Isso significa que há um problema na conexão poste/modem, que está causando toda a instabilidade que me informou anteriormente.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-120","tipo":"atendimento","nome":"Sinal Irregular — No caso, como se trata de um problema físico,…","atalho":"/a-sinal-irregular-02","categoria":"Respostas","grupo":"Internet","contexto":"SINAL IRREGULAR","conteudo":"No caso, como se trata de um problema físico, será necessário abrir um chamado externo, onde uma de nossas equipes irá ao local para verificar e corrigir a falha. É importante ressaltar que, para que essa visita aconteça, é necessário estar com o número de protocolo deste atendimento em mãos.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-121","tipo":"atendimento","nome":"Sinal Irregular — O prazo de atendimento é de até 48 horas, mas…","atalho":"/a-sinal-irregular-03","categoria":"Solicitações","grupo":"Internet","contexto":"SINAL IRREGULAR","conteudo":"O prazo de atendimento é de *até 48 horas*, mas não se preocupe, pois já solicitei a prioridade *alta* em seu atendimento, para que todo o problema seja resolvido o quanto antes, ok?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-122","tipo":"atendimento","nome":"Onu Sem Sinal (Manuseio Do Cliente) — A Brisanet não aconselha a remoção do…","atalho":"/a-onu-sem-sinal-manuseio-01","categoria":"Orientações","grupo":"Internet","contexto":"ONU SEM SINAL (MANUSEIO DO CLIENTE)","conteudo":"A Brisanet não aconselha a remoção do equipamento (ex.: modem, roteador, cabo, conector etc) sem assistência técnica, devido os mesmos serem sensíveis, podendo vir a danificá-los, o que pode gerar custos ao cliente, pois nosso equipamento está sob sua responsabilidade.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-123","tipo":"atendimento","nome":"Onu Sem Sinal (Manuseio Do Cliente) — Será aberto um chamado externo, onde uma de…","atalho":"/a-onu-sem-sinal-manuseio-02","categoria":"Solicitações","grupo":"Internet","contexto":"ONU SEM SINAL (MANUSEIO DO CLIENTE)","conteudo":"Será aberto um chamado externo, onde uma de nossas equipes vai ao local fazer a revisão do aparelho. Lembrando que, se verificado dano por mal uso, será gerado taxas. Taxas essas que serão ditas por nossa equipe no local, ok?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-124","tipo":"atendimento","nome":"Sondagem — Tem horários específicos para esse problema…","atalho":"/a-sondagem-15","categoria":"Solicitações","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Tem horários específicos para esse problema ocorrer?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-125","tipo":"atendimento","nome":"Sondagem — O equipamento instalado em sua residência está…","atalho":"/a-sondagem-16","categoria":"Problemas","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Verifiquei que o equipamento instalado em sua residência está com configurações não adequadas e tem uma atualização pendente, o que pode estar causando a instabilidade que você informou.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-126","tipo":"atendimento","nome":"Sondagem — Vou efetuar uma reconfiguração completa no…","atalho":"/a-sondagem-17","categoria":"Solicitações","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Vou efetuar uma reconfiguração completa no serviço, o acesso pode cair, mas retornará em seguida. Só um momento, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-127","tipo":"atendimento","nome":"Sondagem — Aguarde um momento, vou verificar os aparelhos…","atalho":"/a-sondagem-18","categoria":"Respostas","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Peço que aguarde um momento, vou verificar os aparelhos em sistema e efetuar os devidos procedimentos para reparar o seu acesso. 😊","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-128","tipo":"atendimento","nome":"Sondagem — Todos os procedimentos foram finalizados, Peço…","atalho":"/a-sondagem-19","categoria":"Solicitações","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Obrigado por aguardar! Todos os procedimentos foram finalizados, Peço que realize alguns testes e veja se normalizou. Tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-129","tipo":"atendimento","nome":"Sondagem — Por gentileza, reinicie os equipamentos para…","atalho":"/a-sondagem-20","categoria":"Respostas","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Peço que por gentileza, reinicie os equipamentos para ser validado as configurações.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-130","tipo":"atendimento","nome":"Sondagem — Você teste durante o dia caso apresente…","atalho":"/a-sondagem-21","categoria":"Solicitações","grupo":"Internet","contexto":"SONDAGEM","conteudo":"Peço que você teste durante o dia caso apresente qualquer outra falha pode nos retornar que se for preciso mandamos alguém no local verificar melhor, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-131","tipo":"atendimento","nome":"Instabilidade Na Rede — O equipamento instalado em sua residência está…","atalho":"/a-instabilidade-na-rede-01","categoria":"Problemas","grupo":"Internet","contexto":"INSTABILIDADE NA REDE","conteudo":"Verifiquei que o equipamento instalado em sua residência está com uma atualização pendente, que deveria ter sido realizada automaticamente. Isso pode estar causando a instabilidade que você relatou.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-132","tipo":"atendimento","nome":"Instabilidade Na Rede — Além disso, verifiquei chamados anteriores a…","atalho":"/a-instabilidade-na-rede-02","categoria":"Respostas","grupo":"Internet","contexto":"INSTABILIDADE NA REDE","conteudo":"Além disso, verifiquei chamados anteriores a esse relacionados a solicitações semelhantes. Dessa forma, listei todos os procedimentos efetuados no seu equipamento até hoje, e realizei uma tratativa diferente, com novos procedimentos específicos para resolver a questão.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-133","tipo":"atendimento","nome":"Instabilidade Na Rede — Aguarde um momento, estarei efetuando os…","atalho":"/a-instabilidade-na-rede-03","categoria":"Respostas","grupo":"Internet","contexto":"INSTABILIDADE NA REDE","conteudo":"Peço que aguarde um momento, estarei efetuando os devidos procedimentos para reparar o seu acesso.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-134","tipo":"atendimento","nome":"Instabilidade Na Rede — Irei efetuar uma reconfiguração completa no…","atalho":"/a-instabilidade-na-rede-04","categoria":"Respostas","grupo":"Internet","contexto":"INSTABILIDADE NA REDE","conteudo":"Irei efetuar uma reconfiguração completa no serviço, desta forma peço que aguarde por gentileza.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-135","tipo":"atendimento","nome":"Instabilidade Na Rede — Caso a conexão caia, pode ficar tranquila, em…","atalho":"/a-instabilidade-na-rede-05","categoria":"Solicitações","grupo":"Internet","contexto":"INSTABILIDADE NA REDE","conteudo":"Caso a conexão caia, pode ficar tranquila, em instantes sua conexão será restabelecida, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-136","tipo":"atendimento","nome":"Instabilidade Na Rede — Todos os procedimentos foram finalizados com…","atalho":"/a-instabilidade-na-rede-06","categoria":"Solicitações","grupo":"Internet","contexto":"INSTABILIDADE NA REDE","conteudo":"Obrigado por aguardar! Todos os procedimentos foram finalizados com sucesso e, peço que reinicie os equipamentos Brisanet e os aparelhos conectados à sua rede. Logo após, verifique sua conexão novamente e me informe se normalizou, certo?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-137","tipo":"atendimento","nome":"Instabilidade Na Rede — Todos os procedimentos foram finalizados e, com…","atalho":"/a-instabilidade-na-rede-07","categoria":"Respostas","grupo":"Internet","contexto":"INSTABILIDADE NA REDE","conteudo":"Obrigado por aguardar! Todos os procedimentos foram finalizados e, com isso, peço que verifique novamente a sua conexão, por gentileza.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-138","tipo":"atendimento","nome":"Instabilidade Na Rede — Mediante as verificações, tomei o devido…","atalho":"/a-instabilidade-na-rede-08","categoria":"Respostas","grupo":"Internet","contexto":"INSTABILIDADE NA REDE","conteudo":"Mediante as verificações, tomei o devido cuidado em efetuar procedimentos específicos que realmente possam normalizar o seu acesso de forma definitiva, o mais importante.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-139","tipo":"atendimento","nome":"Lentidão Vários Protocolos Internos — Dessa forma, como todos os procedimentos…","atalho":"/a-lentidao-varios-protoc-01","categoria":"Solicitações","grupo":"Internet","contexto":"LENTIDÃO VÁRIOS PROTOCOLOS INTERNOS","conteudo":"Dessa forma, como todos os procedimentos remotos já foram realizados e mesmo assim o problema persiste, isso indica um problema físico na estrutura de sua instalação. Mediante a essa problemática, estarei solicitando que uma de nossas equipes físicas especialistas em instalação vá no local para realizar a revisão dessa estrutura e, consequentemente, o reparo definitivo da conexão, ok?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-140","tipo":"atendimento","nome":"Lentidão Vários Protocolos (Troca De Onu) — Assim estarei abrindo um chamado para rev…","atalho":"/a-lentidao-varios-protoc-02","categoria":"Orientações","grupo":"Internet","contexto":"LENTIDÃO VÁRIOS PROTOCOLOS (TROCA DE ONU)","conteudo":"Assim estarei abrindo um chamado para revisão de equipamento, apenas para formalizar a constatação do problema físico ou lógico do aparelhos e para verificação da troca para o novo kit de equipamentos, como o técnico solicitou.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-141","tipo":"atendimento","nome":"Ping Alto — A latência está diretamente relacionada à…","atalho":"/a-ping-alto-01","categoria":"Orientações","grupo":"Internet","contexto":"PING ALTO","conteudo":"A latência está diretamente relacionada à distância que o servidor de destino se encontra da máquina inicial. Dessa forma a latência para servidores nacionais será de no máximo 80 ms, desde que não haja qualquer problema de roteamento ou nas próprias máquinas de destino, conforme resolução de qualidade SCM da ANATEL.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-142","tipo":"atendimento","nome":"Ping Alto — A Brisanet não é abarcada pelo Regulamento de…","atalho":"/a-ping-alto-02","categoria":"Orientações","grupo":"Internet","contexto":"PING ALTO","conteudo":"A Brisanet não é abarcada pelo Regulamento de Qualidade do Serviço de Comunicação Multimídia (SCM) por sermos uma PPP. Além disso, para esses testes, é necessário instalar servidores dentro da rede ou em um PTT muito próximo, isso significa que, ao testarmos via EAQ não atingirá a velocidade por ser um serviço onde a latência ficará elevada e consequente os testes terão resultados que não condiz com o plano que o cliente contratou. No entanto, a Brisanet mesmo sendo PPP garante os fornecimentos de acordo com o que a ANATEL exige e podendo ser realizado os testes em outras plataformas. Como não somos obrigados a medir a qualidade, não utilizamos a EAQ.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-143","tipo":"atendimento","nome":"Ping Alto — As metas de qualidade descritas neste…","atalho":"/a-ping-alto-03","categoria":"Orientações","grupo":"Internet","contexto":"PING ALTO","conteudo":"As metas de qualidade descritas neste Regulamento estão estabelecidas sob o ponto de vista da rede e do Assinante e devem ser cumpridas por todas as prestadoras que não se enquadrarem na definição de Prestadora de Pequeno Porte, conforme definido no Regulamento.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-144","tipo":"atendimento","nome":"Ping Alto — 15.8.1 O CLIENTE reconhece que, na aferição ou…","atalho":"/a-ping-alto-04","categoria":"Respostas","grupo":"Internet","contexto":"PING ALTO","conteudo":"15.8.1 O CLIENTE reconhece que, na aferição ou medição da velocidade de conexão à Internet, deverá utilizar-se das técnicas informadas pela PRESTADORA, devendo ainda observar as seguintes exigências: (i) possuir um navegador de web atualizado; (ii) instalar e ativar o Javascript em seu computador; (iii) ativar os Cookies do seu navegador; (iv) não executar, durante o teste, outros softwares, rotinas, processos, programas e/ou aplicativos; (v) realizar os testes em equipamento diretamente conectado ao cabo de rede, devendo também desconectar todos os outros equipamentos que estejam acessando a rede, física ou remotamente (Wi-Fi); (vi) não acessar, simultaneamente ao teste, outros sites ou quaisquer recursos da internet. A garantia de velocidade se dá unicamente via cabo, em dispositivos que tenham suporte mínimo para perceber a banda contratada.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-145","tipo":"atendimento","nome":"Alcance — O nosso modem possui o alcance de cerca de 7 a…","atalho":"/a-alcance-01","categoria":"Orientações","grupo":"Internet","contexto":"ALCANCE","conteudo":"O nosso modem possui o alcance de cerca de 7 a 15 metros quadrados em referência a rede wi-fi para melhor abranger uma residência ampla é indicado a aquisição de um roteador de caráter pessoal com maior potência em relação à rede wireless.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-146","tipo":"atendimento","nome":"Iptv — O serviço de IPTV independente, via de regra, é…","atalho":"/a-iptv-01","categoria":"Orientações","grupo":"Internet","contexto":"IPTV","conteudo":"O serviço de IPTV independente, via de regra, é um serviço não homologado pela *ANATEL* e, portanto, faz uso de servidores piratas. Geralmente, este é um serviço que funciona normalmente, mas que está sempre suscetível à instabilidade, além de ser compartilhado com milhares de usuários ao mesmo tempo, o que gera congestionamentos no servidor.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-147","tipo":"atendimento","nome":"Iptv — Posso recomendar que verifique com a…","atalho":"/a-iptv-02","categoria":"Orientações","grupo":"Internet","contexto":"IPTV","conteudo":"Posso recomendar que verifique com a pessoa/técnico que efetuou a venda e instalação do seu serviço de IPTV independente se está havendo alguma instabilidade no serviço, pois, caso o problema fosse dentro da rede da Brisanet, todos os outros serviços utilizados também estariam instáveis.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-148","tipo":"atendimento","nome":"Iptv — A Brisanet não faz nenhum tipo de bloqueio em…","atalho":"/a-iptv-03","categoria":"Orientações","grupo":"Internet","contexto":"IPTV","conteudo":"A Brisanet não faz nenhum tipo de bloqueio em serviços de streaming ou IPTV particulares, até porque, por ser um serviço não homologado pela *ANATEL*, não prestamos suporte a esse tipo de dispositivo.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-149","tipo":"atendimento","nome":"Plano Contratado — Você está realizando o teste via cabo ou via…","atalho":"/a-plano-contratado-01","categoria":"Solicitações","grupo":"Internet","contexto":"PLANO CONTRATADO","conteudo":"Você está realizando o teste via cabo ou via wi-fi?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-150","tipo":"atendimento","nome":"Plano Contratado — Me encaminhe aqui um print dos dados da placa…","atalho":"/a-plano-contratado-02","categoria":"Solicitações","grupo":"Internet","contexto":"PLANO CONTRATADO","conteudo":"Por gentileza, me encaminhe aqui um print dos dados da placa de rede do seu PC, apenas para registro.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-151","tipo":"atendimento","nome":"Via Cabo (Barramento 100) — Para verificar a velocidade máxima de conexão…","atalho":"/a-via-cabo-barramento-10-01","categoria":"Respostas","grupo":"Internet","contexto":"VIA CABO (BARRAMENTO 100)","conteudo":"Para verificar a velocidade máxima de conexão que seu aparelho aguenta, por gentileza, acesse \"Painel de Controle\", \"Rede e Internet\", \"Central de Rede e Compartilhamento\". No canto superior esquerdo, clique em \"Alterar as configurações do adaptador\". Clique em propriedades, em seguida configurar, após isto vá em avançado e procure por Speed & Duplex ou Velocidade & Duplex. Na opção valor: deverá ter 1 GB Full Duplex. Mande uma foto.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-152","tipo":"atendimento","nome":"Via Wi-Fi (Sem Computador) — De todas essas informações da imagem, o que nos…","atalho":"/a-via-wi-fi-sem-computad-01","categoria":"Respostas","grupo":"Internet","contexto":"VIA WI-FI (SEM COMPUTADOR)","conteudo":"De todas essas informações da imagem, o que nos interessa é a *velocidade*, pois ela indica o barramento da placa de rede do aparelho. A informação mostra que o barramento da placa de rede do seu computador é 100, ou seja, ele suporta, apenas, até 100 Mbps. Esse é o motivo do plano não estar chegando a contratado.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-153","tipo":"atendimento","nome":"Via Wi-Fi (Sem Computador) — Compreendo","atalho":"/a-via-wi-fi-sem-computad-02","categoria":"Respostas","grupo":"Internet","contexto":"VIA WI-FI (SEM COMPUTADOR)","conteudo":"Compreendo. Com relação aos testes de velocidade via console (seja Xbox ou PS4), são conectados ao servidor descrito como Xbox Network (ou PlayStation Network, caso faça o uso de PS4). No qual são servidores a caráter internacional e podendo de fato obter variações sobre o tempo de resposta. Desta forma, sugerimos que realize os testes através de um computador ou notebook, via cabo (conexão direta) sobre o website Fast.com, para a checagem adequada com o tempo de resposta do serviço.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-154","tipo":"atendimento","nome":"Problemas Tv — Com o controle da Brisanet em mãos, pressione o…","atalho":"/a-problemas-tv-01","categoria":"Solicitações","grupo":"TV","contexto":"PROBLEMAS TV","conteudo":"Por gentileza, com o controle da Brisanet em mãos, pressione o botão *MENU*. Após pressionar o botão MENU, pressione o botão *B (cor verde)* e, logo em seguida, pressione *OK* para *resetar o receptor aos padrões de fábrica*, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-155","tipo":"atendimento","nome":"Problemas Tv — Tire e envie para mim uma foto da tela da TV,…","atalho":"/a-problemas-tv-02","categoria":"Solicitações","grupo":"TV","contexto":"PROBLEMAS TV","conteudo":"Por gentileza, tire e envie para mim uma foto da tela da TV, para que eu possa analisar o erro, por gentileza.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-156","tipo":"atendimento","nome":"Tv Erro De Ntp — O cabo que sai do receptor de TV para o modem…","atalho":"/a-tv-erro-de-ntp-01","categoria":"Solicitações","grupo":"TV","contexto":"TV ERRO DE NTP","conteudo":"O cabo que sai do receptor de TV para o modem *FiberHome* de internet está conectado na *LAN 1, 2, 3 ou 4*?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-157","tipo":"atendimento","nome":"Tv Erro De Ntp — Com o botão OK do controle, selecione a opção…","atalho":"/a-tv-erro-de-ntp-02","categoria":"Respostas","grupo":"TV","contexto":"TV ERRO DE NTP","conteudo":"Com o botão *OK* do controle, selecione a opção *NET*; em seguida, selecione a opção *IP* e pressione *OK* novamente. Após isso, verifique se a opção *DHCP* está selecionada. Se sim, pressione, por *5 segundos*, o botão *A (cor vermelha)*, depois o botão *VOLTAR* 1x e o botão *SAIR* 2x.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-158","tipo":"atendimento","nome":"Problemas Telefonia Fixa — Virando o telefone de cabeça para baixo, você…","atalho":"/a-problemas-telefonia-fi-01","categoria":"Solicitações","grupo":"Telefonia","contexto":"PROBLEMAS TELEFONIA FIXA","conteudo":"Virando o telefone de cabeça para baixo, você vai conseguir identificar uma trava de segurança, tipo uma seta apontada para o vermelho ou para o verde. Verifique em qual opção está, por gentileza.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-159","tipo":"atendimento","nome":"Problemas Telefonia Fixa — Na lateral do telefone fixo tem um botão do…","atalho":"/a-problemas-telefonia-fi-02","categoria":"Solicitações","grupo":"Telefonia","contexto":"PROBLEMAS TELEFONIA FIXA","conteudo":"Na lateral do telefone fixo tem um botão do volume com as opções *HI* que significa alto, e *LO* que significa baixo e *OFF* que significa sem som. Está em qual opção?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-160","tipo":"atendimento","nome":"Telefone Modo Pulse — Na lateral do telefone fixo tem um botão com as…","atalho":"/a-telefone-modo-pulse-01","categoria":"Solicitações","grupo":"Telefonia","contexto":"TELEFONE MODO PULSE","conteudo":"Na lateral do telefone fixo tem um botão com as opções *P* e *T*. Está em qual opção?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-161","tipo":"atendimento","nome":"Telefone Modo Pulse — Altere de P para T e, em seguida, teste…","atalho":"/a-telefone-modo-pulse-02","categoria":"Solicitações","grupo":"Telefonia","contexto":"TELEFONE MODO PULSE","conteudo":"Por gentileza, altere de *P* para *T* e, em seguida, teste novamente o serviço de telefonia fixa.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-162","tipo":"atendimento","nome":"Telefone Desativado — No modem (FiberHome), o cabo que sai do…","atalho":"/a-telefone-desativado-01","categoria":"Solicitações","grupo":"Telefonia","contexto":"TELEFONE DESATIVADO","conteudo":"No modem (*FiberHome*), o cabo que sai do aparelho de telefone, é para estar conectado na porta FONE 1 ou na porta FONE 2. Pode verificar em qual porta está?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-163","tipo":"atendimento","nome":"Telefone Desativado — O cabo que sai do aparelho de telefone para o…","atalho":"/a-telefone-desativado-02","categoria":"Solicitações","grupo":"Telefonia","contexto":"TELEFONE DESATIVADO","conteudo":"O cabo que sai do aparelho de telefone para o modem (*FiberHome*) de internet está conectado na entrada com o nome *PHONE*?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-164","tipo":"atendimento","nome":"Telefone Desativado — Após algumas verificações, consegui identificar…","atalho":"/a-telefone-desativado-03","categoria":"Solicitações","grupo":"Telefonia","contexto":"TELEFONE DESATIVADO","conteudo":"Após algumas verificações, consegui identificar um problema de autenticação do aparelho, mas já foi solucionado. Pode verificar como está o seu serviço de telefonia fixa agora?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-165","tipo":"atendimento","nome":"Telefone Falha De Autenticação — Após algumas verificações, consegui identificar…","atalho":"/a-telefone-falha-de-aute-01","categoria":"Respostas","grupo":"Telefonia","contexto":"TELEFONE FALHA DE AUTENTICAÇÃO","conteudo":"Após algumas verificações, consegui identificar um problema de autenticação do aparelho.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-166","tipo":"atendimento","nome":"Telefone Falha De Autenticação — Caso a conexão com a internet caia, pode ficar…","atalho":"/a-telefone-falha-de-aute-02","categoria":"Solicitações","grupo":"Telefonia","contexto":"TELEFONE FALHA DE AUTENTICAÇÃO","conteudo":"Caso a conexão com a internet caia, pode ficar tranquilo(a), em instantes sua conexão será restabelecida, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-167","tipo":"atendimento","nome":"Alteração De Cômodo — Em referência ao serviço adicional de alteração…","atalho":"/a-alteracao-de-comodo-01","categoria":"Orientações","grupo":"Serviços adicionais","contexto":"ALTERAÇÃO DE CÔMODO","conteudo":"Em referência ao serviço adicional de *alteração de cômodo*, existe uma taxa de apenas R$30, 00 pelo procedimento. Se houver necessidade de utilização/troca de um novo cabo de fibra, será cobrado R$0, 60 centavos adicionais por cada metro utilizado do poste até a casa. Caso deseje que seja conectado via cabo de rede algum dos seus equipamentos, será gerado o valor de R$1, 30 por metro utilizado. O valor total será acrescentado na(s) sua(s) próxima(s) fatura(s). Nossa equipe levará um termo de compromisso para ser assinado no ato do procedimento.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-168","tipo":"atendimento","nome":"Alteração De Cômodo — Se a alteração for no mesmo cômodo, será…","atalho":"/a-alteracao-de-comodo-02","categoria":"Orientações","grupo":"Serviços adicionais","contexto":"ALTERAÇÃO DE CÔMODO","conteudo":"Se a alteração for no mesmo cômodo, será cobrado apenas R$20, 00 do procedimento. Se houver necessidade de utilização/troca de um novo cabo de fibra, será cobrado R$0, 60 centavos adicionais por cada metro utilizado.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-169","tipo":"atendimento","nome":"Troca De Onu — O equipamento só pode ser trocado sem custos a…","atalho":"/a-troca-de-onu-01","categoria":"Orientações","grupo":"Serviços adicionais","contexto":"TROCA DE ONU","conteudo":"O equipamento só pode ser trocado sem custos a partir do momento que for constatado problema físico ou lógico no mesmo, que não tenha sido ocasionado pelo cliente. Caso contrário, seja por estética ou motivo pessoal, esse procedimento gera taxa como igual a todos os nossos clientes de apenas R$100, 00 na qual podemos dividir em até 4x sem juros, por questão de estética do cliente ou apenas para ter a nova tecnologia. Até porque os dois equipamentos têm a mesma potência qualidade o que difere um do outro é apenas as redes WI-FI dual 2.4 e 5.8 Ghz, onde o cliente deve possuir equipamentos compatíveis com tal rede.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-170","tipo":"atendimento","nome":"Troca De Onu — Posso estar encaminhando a equipe no local para…","atalho":"/a-troca-de-onu-02","categoria":"Solicitações","grupo":"Serviços adicionais","contexto":"TROCA DE ONU","conteudo":"Posso estar encaminhando a equipe no local para verificar a parte física do equipamento, caso realmente seja constatado que o problema está no aparelho, e que no mesmo não tenha marcas de mau uso por parte de comodatos da residência, será sim efetuado a troca de forma gratuita, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-171","tipo":"atendimento","nome":"Visita Particular (Metragem De Cabo) — Por ser uma solicitação particular do cliente,…","atalho":"/a-visita-particular-metr-01","categoria":"Solicitações","grupo":"Serviços adicionais","contexto":"VISITA PARTICULAR (METRAGEM DE CABO)","conteudo":"Por ser uma solicitação particular do cliente, há uma taxa de R$20, 00 pela visita, onde, no procedimento, você tem direito a usar até 15 metros de cabo de rede gratuitamente. Caso deseje utilizar mais que essa metragem, será desconsiderado os R$20, 00 da visita e será cobrado apenas R$1, 30 por metro de cabo utilizado, ok, lembrando que é apenas para a equipe entregar o cabeamento ok?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-172","tipo":"atendimento","nome":"Visita Particular (Metragem De Cabo) — Deseja proceder, posso abrir a ordem de serviço","atalho":"/a-visita-particular-metr-02","categoria":"Solicitações","grupo":"Serviços adicionais","contexto":"VISITA PARTICULAR (METRAGEM DE CABO)","conteudo":"Como deseja proceder, posso abrir a ordem de serviço?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-173","tipo":"atendimento","nome":"Configuração Estruturada — Referente à configuração estruturada, é gerado…","atalho":"/a-configuracao-estrutura-01","categoria":"Orientações","grupo":"Serviços adicionais","contexto":"CONFIGURAÇÃO ESTRUTURADA","conteudo":"Referente à configuração estruturada, é gerado uma taxa de R$90, 00, podendo ser dividido em até 3x. Esse procedimento fornece até 20 metros de cabo de rede para que sejam conectados seus aparelhos na residência, assim tendo melhor estabilidade no sinal. Caso seja necessário utilizar mais que a metragem disponível, será cobrado o valor de R$ 1, 30 por metro de cabo excedente utilizado.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-174","tipo":"atendimento","nome":"Acesso A Onu — Em relação ao nosso equipamento, ele é deixado…","atalho":"/a-acesso-a-onu-01","categoria":"Orientações","grupo":"Internet","contexto":"ACESSO A ONU","conteudo":"Em relação ao nosso equipamento, ele é deixado na residência do cliente como comodato, onde o cliente é responsável apenas pela integridade física do equipamento. Os clientes não possuem acesso ao equipamento, e, mesmo que consigam ter, qualquer alteração além de não ser permitida, caso seja feita, voltará ao padrão Brisanet quando o equipamento for atualizado. Qualquer configuração específica que seja necessária, será preciso adquirir um roteador particular.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-175","tipo":"atendimento","nome":"Rede Unificada — O equipamento instalado na sua residência…","atalho":"/a-rede-unificada-01","categoria":"Orientações","grupo":"Internet","contexto":"REDE UNIFICADA","conteudo":"Obrigado por aguardar! Verifiquei no sistema que o equipamento instalado na sua residência possui as redes (2.4 e 5.8) unificadas em uma só. Nos seus dispositivos irá aparecer apenas uma rede, [nome_rede], porém os dispositivos irão se conectar de acordo com a inteligência de cada um;","variaveis":["nome_rede"],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-176","tipo":"atendimento","nome":"Rede Unificada — Para você vai aparecer apenas a rede , mas…","atalho":"/a-rede-unificada-02","categoria":"Orientações","grupo":"Internet","contexto":"REDE UNIFICADA","conteudo":"Para você vai aparecer apenas a rede *[nome_rede]*, mas nessa única rede estão as duas tecnologias, onde o seu equipamento irá efetuar a troca automática da tecnologia conforme a melhor performance no momento. Ex.: se estiver acessando próximo ao modem, provavelmente vai estar utilizando a rede turbo (5.8Ghz) e caso esteja utilizando o celular em um local que fique mais distante do modem, por a rede turbo ter um alcance mais limitado, automaticamente é feito a autenticação, onde estará utilizando a rede 2.4Ghz.","variaveis":["nome_rede"],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-177","tipo":"atendimento","nome":"Alteração Da Senha Wi-Fi — Conecte seu celular nos dados móveis ou em…","atalho":"/a-alteracao-da-senha-wi--01","categoria":"Solicitações","grupo":"Internet","contexto":"ALTERAÇÃO DA SENHA WI-FI","conteudo":"Peço que conecte seu celular nos dados móveis ou em outra rede Wi-Fi pois, quando eu gerar a nova senha, todos os dispositivos serão desconectados automaticamente, ok?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-178","tipo":"atendimento","nome":"Alteração Da Senha Wi-Fi — Sua nova senha de acesso da rede Wi-Fi é","atalho":"/a-alteracao-da-senha-wi--02","categoria":"Orientações","grupo":"Internet","contexto":"ALTERAÇÃO DA SENHA WI-FI","conteudo":"Sua nova senha de acesso da rede Wi-Fi [nome_rede] é: [nova_senha]","variaveis":["nome_rede","nova_senha"],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-179","tipo":"atendimento","nome":"Alteração Da Senha Wi-Fi — Teste a conexão com a nova senha e me informe…","atalho":"/a-alteracao-da-senha-wi--03","categoria":"Solicitações","grupo":"Internet","contexto":"ALTERAÇÃO DA SENHA WI-FI","conteudo":"Por gentileza, teste a conexão com a nova senha e me informe se deu certo.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-180","tipo":"atendimento","nome":"Alteração Da Senha Wi-Fi — A personalização da senha Wi-Fi, por enquanto,…","atalho":"/a-alteracao-da-senha-wi--04","categoria":"Orientações","grupo":"Internet","contexto":"ALTERAÇÃO DA SENHA WI-FI","conteudo":"A personalização da senha Wi-Fi, por enquanto, é possível somente no App Brisacliente.\n\n1. Acesse o App Brisacliente;\n2. Na aba *Planos*, clique em *Configurações de Wi-Fi*;\n3. Localize a opção *Alterar senha de Wi-Fi*;\n4. Clique em *Alterar a senha manualmente*;\n5. Insira a senha desejada e confirme.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-181","tipo":"atendimento","nome":"Porta Wps — O aparelho oferecido pela Brisanet ao cliente…","atalho":"/a-porta-wps-01","categoria":"Orientações","grupo":"Internet","contexto":"PORTA WPS","conteudo":"O aparelho oferecido pela Brisanet ao cliente como comodato, por questões de segurança, vem com algumas funções desabilitadas, incluindo, a função WPS.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-182","tipo":"atendimento","nome":"Porta Wps — Para que o cliente possa utilizar esta função,…","atalho":"/a-porta-wps-02","categoria":"Orientações","grupo":"Internet","contexto":"PORTA WPS","conteudo":"Para que o cliente possa utilizar esta função, ele deve ter um roteador próprio.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-183","tipo":"atendimento","nome":"Dados Pppoe — Login da autenticação PPPoE","atalho":"/a-dados-pppoe-01","categoria":"Orientações","grupo":"Internet","contexto":"DADOS PPPOE","conteudo":"*Login da autenticação PPPoE: * [login_pppoe]\n*Senha da autenticação PPPoE: * [senha_pppoe]","variaveis":["login_pppoe","senha_pppoe"],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-184","tipo":"atendimento","nome":"Portas Lans — O aparelho oferecido pela Brisanet ao cliente…","atalho":"/a-portas-lans-01","categoria":"Orientações","grupo":"Internet","contexto":"PORTAS LANs","conteudo":"O aparelho oferecido pela Brisanet ao cliente como comodato não é um roteador; na verdade, se trata de um modem (ONU *Fiberhome*), cujas portas LANs são direcionadas para serviços independentes: *LAN 1 é direcionada para o serviço de internet*, *LAN 2, 3 e 4, para o serviço de TV a cabo da Brisanet* e as portas *Phone 1, Phone 2 ou só Phone, são específicas para o uso do serviço de telefonia fixa da empresa.*","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-185","tipo":"atendimento","nome":"Portas Lans — Para que o cliente possa utilizar outro…","atalho":"/a-portas-lans-02","categoria":"Orientações","grupo":"Internet","contexto":"PORTAS LANs","conteudo":"Para que o cliente possa utilizar outro equipamento por cabo, ele deve ter um roteador próprio.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-186","tipo":"atendimento","nome":"Serviço De Câmeras — IP Fixo é um IP público, fora da rede “nateada”…","atalho":"/a-servico-de-cameras-01","categoria":"Orientações","grupo":"Internet","contexto":"SERVIÇO DE CÂMERAS","conteudo":"IP Fixo é um IP público, fora da rede “nateada” e de NAT aberto (devido utilizarmos o protocolo CGNAT). Diferente do IP dinâmico fornecido pela empresa, o IP Fixo é um IP que não altera periodicamente, ou seja, ele fica “fixo” ao cliente e apenas ao mesmo.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-187","tipo":"atendimento","nome":"Cobrança De Reparo — Consta um chamado externo aberto onde uma de…","atalho":"/a-cobranca-de-reparo-01","categoria":"Respostas","grupo":"Acompanhamento","contexto":"COBRANÇA DE REPARO","conteudo":"Verifiquei no sistema que consta um chamado externo aberto onde uma de nossas equipes irá em sua residência verificar o problema, o prazo máximo para o atendimento são de até *48 horas* após a solicitação. Mas pode ficar tranquilo, já solicitei o máximo de agilidade em seu atendimento, então peço, por gentileza, que fique no aguardo.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-188","tipo":"atendimento","nome":"Cobrança De Reparo — Verifiquei também com o setor responsável que o…","atalho":"/a-cobranca-de-reparo-02","categoria":"Respostas","grupo":"Acompanhamento","contexto":"COBRANÇA DE REPARO","conteudo":"Verifiquei também com o setor responsável que o chamado já foi designado para uma equipe específica que já está em rota, ou seja, já está efetuando os atendimentos, o que significa que você irá recebê-los o quanto antes.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-189","tipo":"atendimento","nome":"Cobrança De Reparo — Você receberá uma ligação do nosso departamento…","atalho":"/a-cobranca-de-reparo-03","categoria":"Solicitações","grupo":"Acompanhamento","contexto":"COBRANÇA DE REPARO","conteudo":"Você receberá uma ligação do nosso departamento de agendamento informando a ida deles, ok?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-190","tipo":"atendimento","nome":"Cobrança De Reparo — Visto com o responsável pelas equipes em sua…","atalho":"/a-cobranca-de-reparo-04","categoria":"Respostas","grupo":"Acompanhamento","contexto":"COBRANÇA DE REPARO","conteudo":"Visto com o responsável pelas equipes em sua cidade que a equipe designada pelo reparo em sua residência estará se deslocando ao local [local]","variaveis":["local"],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-191","tipo":"atendimento","nome":"Cobrança De Reparo — O reparo feito é recente, isso indica uma…","atalho":"/a-cobranca-de-reparo-05","categoria":"Solicitações","grupo":"Acompanhamento","contexto":"COBRANÇA DE REPARO","conteudo":"Como o reparo feito é recente, isso indica uma complicação nesse reparo. Não é um problema comum de ocorrer, mas é possível. Peço novamente desculpas pelo inconveniente, pois será necessário enviar novamente a equipe de reparo no local em até 24 horas para que seja verificado, ok?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-192","tipo":"atendimento","nome":"Cobrança De Alt De Endereço — Visto que sua solicitação foi feita em , onde…","atalho":"/a-cobranca-de-alt-de-end-01","categoria":"Solicitações","grupo":"Acompanhamento","contexto":"COBRANÇA DE ALT DE ENDEREÇO","conteudo":"Visto que sua solicitação foi feita em [data_solicitacao], onde temos o prazo de 5 a 7 dias úteis para concluir todo o procedimento. Apesar do prazo, devido sua cobrança, estou solicitando o máximo de agilidade dos responsáveis para que sua alteração de endereço seja concluída o quanto antes. Peço que aguarde, ok?","variaveis":["data_solicitacao"],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-193","tipo":"atendimento","nome":"Cobrança De Alt De Endereço — Visto com o setor responsável que sua…","atalho":"/a-cobranca-de-alt-de-end-02","categoria":"Respostas","grupo":"Acompanhamento","contexto":"COBRANÇA DE ALT DE ENDEREÇO","conteudo":"Visto com o setor responsável que sua solicitação está no estágio final, que consiste em uma de nossas equipes ir ao local concluir a instalação. Peço que aguarde o contato do nosso departamento de agendamento para que seja agendado esse procedimento.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-194","tipo":"atendimento","nome":"Cobrança De Alt De Endereço — Visto com o setor responsável que a equipe…","atalho":"/a-cobranca-de-alt-de-end-03","categoria":"Respostas","grupo":"Acompanhamento","contexto":"COBRANÇA DE ALT DE ENDEREÇO","conteudo":"Visto com o setor responsável que a equipe designada pelo reparo em sua residência estará se deslocando ao local [local] para concluir o procedimento.","variaveis":["local"],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-195","tipo":"atendimento","nome":"Cobrança De Alt De Plano — A atualização, após assinatura dos contratos,…","atalho":"/a-cobranca-de-alt-de-pla-01","categoria":"Respostas","grupo":"Acompanhamento","contexto":"COBRANÇA DE ALT DE PLANO","conteudo":"A atualização, após assinatura dos contratos, ocorre em um prazo de até 5 dias. Peço que aguarde.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-196","tipo":"atendimento","nome":"Cobrança De Alt De Plano — Você já assinou os contratos","atalho":"/a-cobranca-de-alt-de-pla-02","categoria":"Solicitações","grupo":"Acompanhamento","contexto":"COBRANÇA DE ALT DE PLANO","conteudo":"Você já assinou os contratos?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-197","tipo":"atendimento","nome":"Cobrança De Alt De Plano — Você deve assinar os novos contratos no…","atalho":"/a-cobranca-de-alt-de-pla-03","categoria":"Respostas","grupo":"Acompanhamento","contexto":"COBRANÇA DE ALT DE PLANO","conteudo":"Você deve assinar os novos contratos no aplicativo *brisacliente*, após isso, em um prazo de 3 a 5 dias seu plano será atualizado.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-198","tipo":"atendimento","nome":"Brisacliente — Abra o app brisacliente, insira o CPF do…","atalho":"/a-brisacliente-01","categoria":"Orientações","grupo":"Aplicativos","contexto":"BRISACLIENTE","conteudo":"Abra o app brisacliente, insira o CPF do titular e pressione o botão *Esqueci minha senha*. Após isso, insira novamente o CPF do titular e selecione o número do cadastro para que seja enviado um TOKEN via SMS para ele.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-199","tipo":"atendimento","nome":"Geolocalização — Esse tipo de procedimento não depende da…","atalho":"/a-geolocalizacao-01","categoria":"Orientações","grupo":"Outros serviços","contexto":"GEOLOCALIZAÇÃO","conteudo":"esse tipo de procedimento não depende da provedora, pois a regulamentação do serviço de geolocalização de IPs pertence a IANA (internet Assigned Authory). dessa forma o cliente deve entrar no site https://support.maxmind.com/geoip-data-correction-request/correct-a-geoip-location/ e solicitar a correção da geolocalização do seu serviço de atribuição de números de internet.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-200","tipo":"atendimento","nome":"Disney+ — Obrigado pelas informações relacionadas ao…","atalho":"/a-disney-01","categoria":"Respostas","grupo":"Outros serviços","contexto":"DISNEY+","conteudo":"Obrigado pelas informações relacionadas ao problema. Como estamos recebendo uma alta demanda relacionada ao Disney+ dentro da nossa rede, e como foram efetuados todos os procedimentos possíveis para resolução do mesmo, porém sem sucesso, será repassado ao setor responsável para que verifiquem a rede, desde já, peço desculpas pelo inconveniente, o prazo para verificação é de até 24 horas.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-201","tipo":"atendimento","nome":"Disney+ — Estamos recebendo uma alta demanda relacionada…","atalho":"/a-disney-02","categoria":"Solicitações","grupo":"Outros serviços","contexto":"DISNEY+","conteudo":"Estamos recebendo uma alta demanda relacionada ao Disney+ dentro da nossa rede, onde o problema já está sendo verificado pelo setor de redes, com um prazo de até 24 horas para normalização, ok?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-202","tipo":"atendimento","nome":"Solicitação De Cancelamento — Sou do setor de suporte técnico não consigo…","atalho":"/a-solicitacao-de-cancela-01","categoria":"Solicitações","grupo":"Outros serviços","contexto":"SOLICITAÇÃO DE CANCELAMENTO","conteudo":"Como sou do setor de suporte técnico não consigo realizar o cancelamento, mas irei abrir o chamado para o setor de cancelamento te retornar em até 48 horas e finalizar a sua solicitação, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-203","tipo":"atendimento","nome":"Solicitação De Cancelamento — Caso desejar agilizar é somente entrar em…","atalho":"/a-solicitacao-de-cancela-02","categoria":"Orientações","grupo":"Outros serviços","contexto":"SOLICITAÇÃO DE CANCELAMENTO","conteudo":"Caso desejar agilizar é somente entrar em contato direto com o setor de cancelamento no 0800 281 3017.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-204","tipo":"atendimento","nome":"Solicitação De Cancelamento — Para assuntos relacionados ao cancelamento dos…","atalho":"/a-solicitacao-de-cancela-03","categoria":"Solicitações","grupo":"Outros serviços","contexto":"SOLICITAÇÃO DE CANCELAMENTO","conteudo":"Para assuntos relacionados ao cancelamento dos serviços Brisanet é possível pelo nosso canal de atendimento 0800 281 3017. Você pode entrar em contato através desse número que te repassei das 08 horas às 20 horas de segunda a sábado, certo?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-205","tipo":"atendimento","nome":"Solicitação De Cancelamento — Verifiquei em sistema que já consta uma…","atalho":"/a-solicitacao-de-cancela-04","categoria":"Solicitações","grupo":"Outros serviços","contexto":"SOLICITAÇÃO DE CANCELAMENTO","conteudo":"Verifiquei em sistema que já consta uma solicitação de cancelamento em aberto no dia de hoje. Dessa forma, oriento que aguarde o retorno da equipe de cancelamento dentro do prazo de 48 horas para finalizar a tratativa, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-206","tipo":"atendimento","nome":"Solicitação De Cancelamento — Verifiquei no sistema o chamado de cancelamento…","atalho":"/a-solicitacao-de-cancela-05","categoria":"Problemas","grupo":"Outros serviços","contexto":"SOLICITAÇÃO DE CANCELAMENTO","conteudo":"Verifiquei no sistema o chamado de cancelamento aberto. Dessa forma, realizei uma cobrança ao setor responsável para que seja feito o retorno o quanto antes a fim de finalizar sua solicitação.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-207","tipo":"atendimento","nome":"Solicitação De Cancelamento — Mediante sua solicitação, cobrei urgência máxima","atalho":"/a-solicitacao-de-cancela-06","categoria":"Orientações","grupo":"Outros serviços","contexto":"SOLICITAÇÃO DE CANCELAMENTO","conteudo":"Mediante sua solicitação, cobrei urgência máxima. Anexei o contato e deixei explícito a sua necessidade de cancelar.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-208","tipo":"atendimento","nome":"Tp-Link Sem Custo Onu 2.4 — Tem um modelo de modem antigo, estarei abrindo…","atalho":"/a-tp-link-sem-custo-onu--01","categoria":"Solicitações","grupo":"Outros serviços","contexto":"TP-LINK SEM CUSTO ONU 2.4","conteudo":"Verifiquei que tem um modelo de modem antigo, estarei abrindo uma ordem de serviço para realizar a instalação do equipamento roteador Tp-Link. O modelo atual continuará instalado para conversão do sinal óptico em sinal de internet. Será instalado um novo equipamento para distribuir o sinal por rede cabeada e wi-fi em sua residência, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-209","tipo":"atendimento","nome":"Instabilidade Massiva Na Rede Da Brisanet (Fwa - 5G) — Verifiquei sua situação e iden…","atalho":"/a-instabilidade-massiva--01","categoria":"Problemas","grupo":"Outros serviços","contexto":"INSTABILIDADE MASSIVA NA REDE DA BRISANET (FWA - 5G)","conteudo":"Verifiquei sua situação e identifiquei que a falta de acesso está relacionada a uma instabilidade geral no serviço, que afetou tanto o FWA quanto o Móvel 5G.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-210","tipo":"atendimento","nome":"Instabilidade Massiva Na Rede Da Brisanet (Fwa - 5G) — Essa ocorrência está ligada ao…","atalho":"/a-instabilidade-massiva--02","categoria":"Problemas","grupo":"Outros serviços","contexto":"INSTABILIDADE MASSIVA NA REDE DA BRISANET (FWA - 5G)","conteudo":"Essa ocorrência está ligada ao uso da franquia, e o setor responsável já está atuando para resolver o quanto antes. A previsão informada para a normalização é de até 2 horas.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-atd-211","tipo":"atendimento","nome":"Instabilidade Massiva Na Rede Da Brisanet (Fwa - 5G) — Peço desculpas pelo transtorno…","atalho":"/a-instabilidade-massiva--03","categoria":"Respostas","grupo":"Outros serviços","contexto":"INSTABILIDADE MASSIVA NA REDE DA BRISANET (FWA - 5G)","conteudo":"Peço desculpas pelo transtorno e agradeço pela sua compreensão. Seguimos acompanhando o caso e ficamos à disposição para qualquer dúvida.","variaveis":[],"favorito":false,"ativo":true,"origem":"Script chat MATEUS.docx","triggerKey":"space"},{"id":"te-prot-001","tipo":"protocolo","nome":"Cabo de fibra rompido — causa não informada","atalho":"/p-cabo-de-fibra-rompido-causa-nao-inf","categoria":"Fibra e ONU","conteudo":"Informa que está sem acesso, Com LOS ATIVA, Segundo o cliente o cabo de fibra que liga sua residência foi rompido, Cliente não sabe informar qual o motivo do cabo está rompido, visto rota normal e operante, Dessa forma aberto O. S para que possa ser verificado no local, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-002","tipo":"protocolo","nome":"Cabo de fibra rompido — caminhão","atalho":"/p-cabo-de-fibra-rompido-caminhao","categoria":"Fibra e ONU","conteudo":"Informa que está sem acesso, Com LOS ATIVA, Segundo o cliente o cabo de fibra que liga sua residência foi rompido, Ciente informa que um caminhão passou e rompeu essa fibra, visto rota normal e operante, Dessa forma aberto O. S para que possa ser verificado no local, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-003","tipo":"protocolo","nome":"Lentidão — ficha 01","atalho":"/p-lentidao-ficha-01","categoria":"Internet","conteudo":"Informa que está com lentidão, Segundo ele a conexão é instável em todos os aparelhos no local e vem acontecendo durante o dia todo, feito toda a sondagem de instabilidade, ele informa também que poucas pessoas usam seu acesso e não há compartilhamento de senha, Dessa forma foi alterado o canal e reiniciado a ONU em seguida cliente realiza alguns testes e confirma serviço normal.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-004","tipo":"protocolo","nome":"Lentidão e quedas — ficha 02","atalho":"/p-lentidao-e-quedas-ficha-02","categoria":"Internet","conteudo":"Informa problema de lentidão e quedas na sua conexão. verificado que o sinal da fibra está normal, cliente informa que o problema ocorre em todos os dispositivos, durante o dia todo, o equipamento fica livre, utiliza a rede Wi-Fi próximo ao equipamento e não compartilha senha com vizinhos, Então foi alterado o canal, ativado e reiniciado os equipamentos pelo sistema, após realizar testes foi constatado normalidade no serviço.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-005","tipo":"protocolo","nome":"Rota inoperante — monitoramento aberto","atalho":"/p-rota-inoperante-monitoramento-abert","categoria":"Internet","conteudo":"Informa que está sem acesso, Visto rota inoperante e não tinha chamado em aberto no SASKI, Dessa forma aberto chamado para o IMOC verificar e repassado o prazo ao cliente o mesmo ciente e no aguarde da resolução do problema.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-006","tipo":"protocolo","nome":"Rota inoperante — chamado na URA","atalho":"/p-rota-inoperante-chamado-na-ura","categoria":"Internet","conteudo":"Informa que está sem acesso, Visto rota inoperante e chamado em aberto, Dessa forma repassado o prazo de acordo com o Saski, cliente ciente e no aguarde.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-007","tipo":"protocolo","nome":"Torre inoperante FWA — problema geral","atalho":"/p-torre-inoperante-fwa-problema-geral","categoria":"FWA","conteudo":"Problema geral afetando todos os clientes da cidade que utilizam o FWA, devido a falha na torre de sinal. O setor responsável já foi acionado e está verificando a situação, com previsão de normalização do serviço em até 12 horas. Foi informado ao cliente que se trata de um problema geral e que todos os usuários da cidade estão sem sinal, orientando-o a aguardar a resolução do problema dentro do prazo estimado. Cliente ciente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-008","tipo":"protocolo","nome":"Roteador offline — acesso normalizado","atalho":"/p-roteador-offline-acesso-normalizado","categoria":"Wi-Fi e Equipamentos","conteudo":"Informa que está sem acesso, Visto roteador sem gerência no sistema, Dessa forma foi orientado o cliente a reiniciar os equipamentos no local, em seguida o mesmo realiza testes e confirma serviço normal.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-009","tipo":"protocolo","nome":"Roteador offline — abertura de O.S.","atalho":"/p-roteador-offline-abertura-de-o-s","categoria":"Wi-Fi e Equipamentos","conteudo":"Informa que está sem acesso, Visto roteador sem gerência no sistema, Visto conectado na porta correta, Dessa forma foi orientado o cliente a reiniciar os equipamentos no local também foi ativado e reiniciado no sistema porém sem sucesso, dessa forma como foi realizado todos os procedimentos possíveis aberto O. S. para que possa ser verificado no local, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-010","tipo":"protocolo","nome":"Ligações internacionais — solicitação de desbloqueio","atalho":"/p-ligacoes-internacionais-solicitacao","categoria":"Telefonia","conteudo":"Solicita o desbloqueio do seu telefone fixo para ligações internacionais, por gentileza desbloquear a linha da cliente para esse tipo de ligação, a mesma ciente que pode ser gerado taxas adicionais sobre essas ligações.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-011","tipo":"protocolo","nome":"CPE sem sinal — abertura de O.S.","atalho":"/p-cpe-sem-sinal-abertura-de-o-s","categoria":"FWA","conteudo":"Informa que está sem acesso, visto torre normal e operante, realizado os procedimentos remotos porém sem sucesso, dessa forma aberto O. S. para que seja visto no local.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-012","tipo":"protocolo","nome":"Instabilidade Axess","atalho":"/p-instabilidade-axess","categoria":"Sistemas e Aplicativos","conteudo":"Informa que está sem acesso/ instabilidade a rede, visto problema interno de comunicação com o sistema dos aparelhos, foi repassado um prazo de 3 horas para normalização, cliente ciente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-013","tipo":"protocolo","nome":"LOS ativo — abertura de O.S.","atalho":"/p-los-ativo-abertura-de-o-s","categoria":"Fibra e ONU","conteudo":"Informa que está totalmente sem acesso. Visto com o cliente que o led LOS está ativo. Verificado que não houve nenhum manuseio, ou danos físicos no equipamento. Verificado também que não houve nenhum curto, ou infiltração na residência, Rota normal, Aberto O. S para a equipe ir no local verificar.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-014","tipo":"protocolo","nome":"Falha de acesso por Cloudflare","atalho":"/p-falha-de-acesso-por-cloudflare","categoria":"Sistemas e Aplicativos","conteudo":"Informa que não esta conseguindo acessar alguns sites, visto que o problema é na cloudflare que armazena os serviços, repassado informações ao cliente o mesmo ciente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-015","tipo":"protocolo","nome":"Sem acesso após troca de senha","atalho":"/p-sem-acesso-apos-troca-de-senha","categoria":"Internet","conteudo":"Entra me contato informando que está presentado um problema de senha incorreta ao conectar na rede, esse problema veio após uma alteração de senha ontem pelo aplicativo. Dessa forma, feito configurações, e alterado a senha, cliente confirma acesso normal.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-016","tipo":"protocolo","nome":"Instabilidade em serviços AWS","atalho":"/p-instabilidade-em-servicos-aws","categoria":"Sistemas e Aplicativos","conteudo":"Próprio titular. Entrou em contato via chat relatando lentidão e falha ao acessar alguns sites e serviços. Verificado que o sinal em sua residência está normal e, ao consultar o site Downdetector, foi identificado problema generalizado nos servidores da AWS (Amazon Web Services), afetando diversos sites e plataformas no Brasil e no mundo. Informado ao cliente que a instabilidade é global e não se encontra na rede da Brisanet. Ao nível de manutenção e satisfação do cliente, foi alterado canal e modo, ativado o roteador/roteador e reiniciados os aparelhos. Solicitado ao cliente que acompanhe o acesso nas próximas 24h e, caso o problema persista após a normalização dos serviços da AWS, entrar em contato novamente. Cliente ciente de que o problema não está relacionado ao provedor.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-017","tipo":"protocolo","nome":"Manutenção geral — cliente já havia entrado em contato","atalho":"/p-manutencao-geral-cliente-ja-havia-e","categoria":"Atendimento e Retorno","conteudo":"Titular entrou em contato informando que estava com instabilidade em seu acesso, visto que a mesma já entrou em contato antes, foi informando o restante do prazo para normalização do serviço. Por ser algo regionalizado, não será realizado sondagem. A cliente está ciente que é algo temporário e o setor responsável já está tratando. Contato: [contato].","variaveis":["contato"],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-018","tipo":"protocolo","nome":"Manutenção FWA","atalho":"/p-manutencao-fwa","categoria":"FWA","conteudo":"Cliente informa que está sem acesso ao serviço, visto instabilidade geral, repassado o prazo de 08 horas para normalização, o mesmo ciente e no aguarde.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-019","tipo":"protocolo","nome":"ONU desligada da energia — acesso normalizado","atalho":"/p-onu-desligada-da-energia-acesso-nor","categoria":"Fibra e ONU","conteudo":"Relata que não tem sinal de internet. Verificado no sistema ONU desligada. Onde verificado com o cliente que não apresenta nenhum led acessa na ONU. Solicitei para verificar a fonte na tomada e ligar no botão power, verificando se também tem energia na residência. Após religar o equipamento o acesso foi normalizado.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-020","tipo":"protocolo","nome":"ONU desligada da energia — equipamento não ligou","atalho":"/p-onu-desligada-da-energia-equipament","categoria":"Fibra e ONU","conteudo":"Após verificações equipamento segue sem ligar dessa forma OS aberta para ser revisado equipamento.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-021","tipo":"protocolo","nome":"Bloqueio total FWA — pagamento há menos de 24 horas","atalho":"/p-bloqueio-total-fwa-pagamento-ha-men","categoria":"Financeiro","conteudo":"Com status de bloqueio total no sistema, onde o pagamento dele foi identificado a menos de 24 horas, repassado o prazo para restabelecer o serviço, cliente ciente e no aguarde.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-022","tipo":"protocolo","nome":"Bloqueio total FWA — situação com mais de 24 horas","atalho":"/p-bloqueio-total-fwa-situacao-com-mai","categoria":"Financeiro","conteudo":"Cliente entra em contato informando que está sem o acesso à internet após bloqueio financeiro, mas já faz mais de 24 que realizou o pagamento e mesmo assim não normalizou, visto que no sistema já foi ativado, mas ainda se encontra com (Bloqueio Total), enviado e-mail para os responsáveis verificar problema. A cliente ficou ciente de todas as informações.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-023","tipo":"protocolo","nome":"Rota reparada, mas cliente segue sem acesso — IMOC","atalho":"/p-rota-reparada-mas-cliente-segue-sem","categoria":"Internet","conteudo":"Informa que está sem acesso, visto que a sua rota estava inoperante onde já foi feito o reparo da rota e somente em sua casa permanece sem acesso com LOS ativa, aberto chamado para que possa ser feito reparo no local, cliente ciente do prazo e no aguarde da visita.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-024","tipo":"protocolo","nome":"Torre inoperante FWA — prazo informado","atalho":"/p-torre-inoperante-fwa-prazo-informad","categoria":"FWA","conteudo":"Cliente informa que está sem acesso, visto torre inoperante na região, dessa forma repassado o prazo para normalização do serviço no local, cliente ciente e no aguarde.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-025","tipo":"protocolo","nome":"Alteração de número — limite de trocas excedido","atalho":"/p-alteracao-de-numero-limite-de-troca","categoria":"Atendimento e Retorno","conteudo":"Tendo em vista a recorrência e várias trocas realizadas, foi informado ao cliente que excedeu as tentativas de troca e que não é mais possível a alteração do número.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-026","tipo":"protocolo","nome":"Jogo instável — serviço normalizado","atalho":"/p-jogo-instavel-servico-normalizado","categoria":"Internet","conteudo":"O mesmo relata instabilidade no jogo, informado que pode ser um possível problema no servido do jogo onde isso pode estar ocasionando esses problemas, feito alterações no sistema o mesmo realiza testes em seguida e confirma serviço normal.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-027","tipo":"protocolo","nome":"Orientação sobre IPv6","atalho":"/p-orientacao-sobre-ipv6","categoria":"Sistemas e Aplicativos","conteudo":"Próprio(a) titular. Entrou em contato com o número: Solicitou gerenciamento do protocolo IPv6 para uso particular onde foi repassado para o/a mesmo/a que o uso do IPv6 na rede da Brisanet é apenas para conexão de requisições de dados a internet a sistemas que já utilizam IPv6 como protocolo de acesso. Caso a requisição com IPv6 encontre sistemas que utilizam do protocolo IPv4 o mesmo realizará a conversão da requisição em IPv6 para IPv4. Logo o uso do IPv6 na rede Brisanet funciona apenas da seguinte forma: Em modo Router (Roteador) o cliente tem acesso ao protocolo IPv6 apenas em cidades em que o mesmo já foi implementado onde o cliente não tem gerência do mesmo, pois o Modem da Brisanet por padrão não disponibiliza o gerenciamento da ONU. Já em modo Bridge (Transparente) o protocolo IPv6 não têm disponibilidade, assim, o cliente não terá acesso ao IPv6 com o roteador TP-Link Brisanet e também não terá acesso com um Roteador Particular com conexão em Bridge e também não terá em Router pelo modo em DHCP. Dessa forma, o cliente apenas tem disponibilizado o IPv6 com a ONU em modo Router em cidades em que o mesmo já foi implementado, mas o mesmo não tem gerência do protocolo, apenas se utiliza do mesmo para conexão a internet. Cliente ciente das informações.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-028","tipo":"protocolo","nome":"Brisa HDTV travada — abertura de O.S.","atalho":"/p-brisa-hdtv-travada-abertura-de-o-s","categoria":"TV","conteudo":"Informa que a tela da TV está travada com o nome Brisanet HDTV, feito os procedimentos no local porém sem sucesso, dessa forma aberto O. S. para que possa ser verificado no local.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-029","tipo":"protocolo","nome":"Quedas na conexão — ONU reinicia e apresenta LOS","atalho":"/p-quedas-na-conexao-onu-reinicia-e-ap","categoria":"Fibra e ONU","conteudo":"Entra em contato informando que esta passando por quedas na conexão, onde a sua ONU reinicia sozinha e em seguida apresenta LOS ativa, mas que normaliza quando a cliente retira o equipamento da tomada e coloca novamente o serviço volta ao normal. Sendo assim verificado juntamente da liderança, foi solicitado abrir OS para verificar a fibra e os equipamentos da cliente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-030","tipo":"protocolo","nome":"Quedas na conexão — roteador reinicia","atalho":"/p-quedas-na-conexao-roteador-reinicia","categoria":"Wi-Fi e Equipamentos","conteudo":"Em contato informando que esta passando por quedas na conexão, onde a seu roteador reinicia sozinho e em seguida apresenta um led laranja, mas que normaliza. Sendo assim verificado juntamente da liderança, foi solicitado abrir OS para verificar os equipamentos.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-031","tipo":"protocolo","nome":"Alteração de endereço mal sucedida — sem acesso","atalho":"/p-alteracao-de-endereco-mal-sucedida","categoria":"Instalação e Reparo","conteudo":"O mesmo informa que está sem acesso, com LOS ativa, Visto rota normal e operante, questionado ao cliente se houve manuseio dos equipamentos no local ou até mesmo danos, cliente confirma que não, Fibra visivelmente normal sem nenhum problema, também não houve nenhuma queda de energia ou infiltração próximo do equipamento, cliente informa que oi feita a alteração de endereço hoje e quando chegou na residência e ele já se encontra sem acesso com LOS ativa, dessa forma aberto uma alteração de endereço mal sucedida para que o gestor da equipe responsável possa verificar e direcionar a equipe até o local para realizar o reparo, cliente ciente do prazo e no aguarde da visita, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-032","tipo":"protocolo","nome":"Sistema em manutenção","atalho":"/p-sistema-em-manutencao","categoria":"Sistemas e Aplicativos","conteudo":"Cliente entrou em contato relatando instabilidade no acesso. Porém, devido a um problema técnico interno que está afetando parcialmente nossos sistemas e impedindo a execução de procedimentos, foi informado que estamos trabalhando na correção do problema. O prazo estimado para resolução é de 1 hora. O cliente foi notificado e está ciente da situação onde foi orientado ao mesmo que, caso após esse prazo o problema continue, que o mesmo entre em contato novamente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-033","tipo":"protocolo","nome":"Ressaca de instabilidade massiva — normalizado","atalho":"/p-ressaca-de-instabilidade-massiva-no","categoria":"Internet","conteudo":"Entra em contato informando que esta sem acesso, visto que a Brisanet esta passando por uma instabilidade massiva de rede, informado que se trata da ressaca do problema onde após mudar o canal e reiniciado a ONU cliente testa e confirma serviço normal.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-034","tipo":"protocolo","nome":"Instabilidade massiva na rede","atalho":"/p-instabilidade-massiva-na-rede","categoria":"Internet","conteudo":"Entra em contato informando que esta sem acesso, visto que a Brisanet esta passando por uma instabilidade massiva de rede, passado a informação e o prazo para a cliente, a mesma ciente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-035","tipo":"protocolo","nome":"Quedas na conexão — ajustes e normalização","atalho":"/p-quedas-na-conexao-ajustes-e-normali","categoria":"Internet","conteudo":"Passando por quedas na sua conexão, verificando que o sinal da ONU e IP normais, feito sondagem de técnica de necessidade, onde possivelmente o problema pode estar relacionado a interferência ou conflito de tecnologias (Unificação de redes). Foi alterado o canal, largura de banda reativado e reconfigurado a ONU, acesso testado e normalizado.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-036","tipo":"protocolo","nome":"Sem acesso com sinal e IP normais — normalizado","atalho":"/p-sem-acesso-com-sinal-e-ip-normais-n","categoria":"Internet","conteudo":"Informa está sem acesso a sua internet, verificado sinal normal e ip normal, dessa forma alterado o canal e reiniciado a ONU em seguida cliente realiza testes e confirma serviço normal.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-037","tipo":"protocolo","nome":"OLT em manutenção","atalho":"/p-olt-em-manutencao","categoria":"Fibra e ONU","conteudo":"Informando estar sem acesso. Verificado que devido à manutenção no gerenciador de distribuição de internet OLT (Optical Line Terminal) o mesmo veio a ficar sem internet. Passado o prazo da URA referente a normalização. Cliente ciente das informações.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-038","tipo":"protocolo","nome":"Instabilidade geral — normalizada","atalho":"/p-instabilidade-geral-normalizada","categoria":"Internet","conteudo":"Informa que está com instabilidade na rede, onde foi identificado instabilidade geral na rede, dessa forma realizado os procedimentos onde em seguida cliente realiza testes e confirma serviço normal.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-039","tipo":"protocolo","nome":"Troca da ONU 2.4 por TP-Link","atalho":"/p-troca-da-onu-2-4-por-tp-link","categoria":"Fibra e ONU","conteudo":"Entra em contato solicitando a troca da sua ONU 2.4 para tentar melhorar o serviço no local, visto que ela utiliza uma ONU 2.4, solicitado a troca para que possa melhorar a conexão da cliente no local, sem custos a nível de satisfação da cliente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-040","tipo":"protocolo","nome":"Impressora sem configuração WPS","atalho":"/p-impressora-sem-configuracao-wps","categoria":"Wi-Fi e Equipamentos","conteudo":"Entra em contato informando que não está conseguindo configurar sua impressora pela tecla WPS em nosso equipamento, informado a cliente que essa função é desabilitada em nosso equipamento e que para configurar seu aparelho ela vai precisar utilizar um roteador particular com essa função que ela possa habilita-la.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-041","tipo":"protocolo","nome":"Fibra danificada por cachorro","atalho":"/p-fibra-danificada-por-cachorro","categoria":"Fibra e ONU","conteudo":"Informa que seu cachorro quebrou a fibra que liga a ONU, a mesma com LOS ativa, informado o valor de 20,00 R$ pela visita onde se for constatado mais danos no equipamento dependendo da verificação da equipe pode ser gerado mais valores a mesma ciente e no aguarde.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-042","tipo":"protocolo","nome":"Fibra danificada por obra na residência","atalho":"/p-fibra-danificada-por-obra-na-reside","categoria":"Fibra e ONU","conteudo":"Informa que quebrou a fibra que liga a ONU, Devido uma obra que está sendo feita no local, a mesma com LOS ativa, informado o valor de 20,00 R$ pela visita onde se for constatado mais danos no equipamento dependendo da verificação da equipe pode ser gerado mais valores a mesma ciente e no aguarde.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-043","tipo":"protocolo","nome":"Netflix com anúncios — incompatibilidade","atalho":"/p-netflix-com-anuncios-incompatibilid","categoria":"TV","conteudo":"Não está conseguindo acessar a netflix, visto que ele usa a netflix com anúncios informado que alguns aparelhos não são compatíveis com esse plano, foi repassado para o Sac comercial para verificar uma possível atualização do plano.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-044","tipo":"protocolo","nome":"Configuração estruturada — cabeamento particular","atalho":"/p-configuracao-estruturada-cabeamento","categoria":"Instalação e Reparo","conteudo":"Entra em contato solicitando o cabeamento de seu equipamento particular, informado o valor de 90,00 R$ onde o mesmo tem direito a 20 metros de cabo de rede onde se ultrapassar essa metragem é cobrado o valor de 01,30 a cada metro utilizado, o mesmo ciente dos valores e no aguarde da visita, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-045","tipo":"protocolo","nome":"Câmera particular em redes unificadas","atalho":"/p-camera-particular-em-redes-unificad","categoria":"Wi-Fi e Equipamentos","conteudo":"Informa que perdeu acesso ao serviço de suas câmeras particulares no local, visto que seus aparelhos tem acesso apenas a rede 2.4 e nesse equipamento da Brisanet como possui as redes unificadas tem essa dificuldade para fazer essa conexão, orientado cliente a comprar um roteador particular só para conexão dessas câmeras ou é possível fazer a troca desse roteador pela ONU 5.8, informado as desvantagens desse equipamento, o mesmo ciente ficou de verificar.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-046","tipo":"protocolo","nome":"Conecta+ — cabeamento e configuração","atalho":"/p-conecta-cabeamento-e-configuracao","categoria":"Instalação e Reparo","conteudo":"A/o mesma/o entra em contato solicitando o cabeamento de seu computador particular no local, Visto que a/o cliente é assinante do conecta+, foi informado que ela tem direito ao cabeamento e configuração de até 4 dispositivos no local onde ela tem direito até 30 metros de cabo de rede e se ultrapassar essa metragem é cobrado o valor de 01,30 a cada metro utilizado, A/o mesma/o ciente dos valores e no aguarde da visita, por gentileza verificar no local.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-047","tipo":"protocolo","nome":"Telefone na tecla incorreta — normalizado","atalho":"/p-telefone-na-tecla-incorreta-normali","categoria":"Telefonia","conteudo":"Informa que seu telefone fixo não está recebendo e nem realizando ligações, Visto telefone registrado e na porta correta, foi visto que estava na tecla LO, Orientado cliente a colocar na letra HI em seguida realizado testes com o cliente o mesmo confirma serviço normal.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-048","tipo":"protocolo","nome":"Bloqueio por inadimplência","atalho":"/p-bloqueio-por-inadimplencia","categoria":"Financeiro","conteudo":"Entra em contato informando que esta sem acesso à internet, visto que o contrato está bloqueado por ausência de pagamento/inadimplência financeira. Passado a informação para o cliente. O mesmo ciente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-049","tipo":"protocolo","nome":"Sem contato — tentativa sem sucesso","atalho":"/p-sem-contato-tentativa-sem-sucesso","categoria":"Atendimento e Retorno","conteudo":"1). Tentei contato com a cliente porém sem sucesso.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-050","tipo":"protocolo","nome":"Sem contato — várias tentativas e SMS","atalho":"/p-sem-contato-varias-tentativas-e-sms","categoria":"Atendimento e Retorno","conteudo":"1). Tentei contato com a cliente varias vezes através dos números dos números no cadastro porém sem sucesso, dessa forma enviado SMS e encerrado o chamado.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-051","tipo":"protocolo","nome":"Ligação caiu — retorno sem sucesso","atalho":"/p-ligacao-caiu-retorno-sem-sucesso","categoria":"Atendimento e Retorno","conteudo":"2). Ligação caiu tentei contato com a cliente porém sem sucesso, dessa forma encerrado o chamado.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-052","tipo":"protocolo","nome":"Ligação caiu — cliente em atendimento com outro colaborador","atalho":"/p-ligacao-caiu-cliente-em-atendimento","categoria":"Atendimento e Retorno","conteudo":"2). Ligação caiu tentei contato com a cliente porém sem sucesso, visto cliente em atendimento com outro colaborador, dessa forma encerrado o chamado.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-053","tipo":"protocolo","nome":"PON ativa — ONU reconfigurada e acesso normalizado","atalho":"/p-pon-ativa-onu-reconfigurada-e-acess","categoria":"Fibra e ONU","conteudo":"Entra em contato, o/a mesmo/a informa esta sem acesso com a LED PON ativa, Questionado ao mesmo/a sobre manuseio dos equipamentos o/a mesmo/a informa que ninguém chegou a manusear os equipamentos, também informa que não houve nenhuma queda de energia no local, Dessa forma reconfigurado a ONU em seguida o/a mesmo/a testa e informa Acesso normalizado.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-054","tipo":"protocolo","nome":"PON piscando — abertura de O.S.","atalho":"/p-pon-piscando-abertura-de-o-s","categoria":"Fibra e ONU","conteudo":"Informa que está sem acesso com a PON PISCANDO, Feito a sondagem, o/a mesmo/a informa que não houve manuseio dos equipamentos da Brisanet, nem queda de energia ou infiltração próximo do aparelho, visto rota normal e operante, Dessa Forma aberto O. S. para verificação no local, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-055","tipo":"protocolo","nome":"Inadimplência financeira — comando CRM ativo na TL1","atalho":"/p-inadimplencia-financeira-comando-cr","categoria":"Financeiro","conteudo":"Informa que está sem acesso, visto que o cliente passou por um bloqueio na parte financeira e no momento o comando CRM está ativo em sua TL1, foi informado ao mesmo que tem que aguardar esse comando ser concluído a nível de sistema para que seu serviço possa ser reativado novamente o mesmo ciente do prazo de 24 horas e no aguarde.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-056","tipo":"protocolo","nome":"Queda de energia — problema geral","atalho":"/p-queda-de-energia-problema-geral","categoria":"Internet","conteudo":"Informa que está sem acesso, devido uma queda de energia, visto que se trata de um problema geral em sua região devido essa oscilação, foi orientado cliente a aguardar, o mesmo ciente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-057","tipo":"protocolo","nome":"Reparo mal sucedido — retorno dentro de 48 horas","atalho":"/p-reparo-mal-sucedido-retorno-dentro","categoria":"Instalação e Reparo","conteudo":"O mesmo informa que esta sem acesso, visto que a equipe esteve recentemente em sua residência e já apresenta o mesmo erro, dessa forma reparo mal sucedido dentro do prazo de 48 horas, dessa forma aberto O. S para verificação.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-058","tipo":"protocolo","nome":"Roteador sem LEDs ativos — abertura de O.S.","atalho":"/p-roteador-sem-leds-ativos-abertura-d","categoria":"Wi-Fi e Equipamentos","conteudo":"Informa que não tem nenhuma led ativa no TP-Link da Brisanet, visto rota normal e operante, a/o mesma/o informa que ninguém veio a mexer no equipamento ou causar nenhum tipo de dano, também não houve queda de energia nem infiltração próximo do equipamento, Dessa forma informado a mesma que se for constatado algum tipo de dano no equipamento, dependendo da avaliação do técnico pode gerar custos, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-059","tipo":"protocolo","nome":"ONU somente com LED Power ativo — abertura de O.S.","atalho":"/p-onu-somente-com-led-power-ativo-abe","categoria":"Fibra e ONU","conteudo":"Informa que está sem acesso, apenas a led power está ativa na ONU, Foi alterado a tomada, visto botão power ativo e mesmo assim o equipamento permanece apenas com a power ativa, questionado se houve manuseio dos equipamentos o mesmo informa que não, também não houve nenhuma queda de energia ou infiltração próximo do equipamento, Dessa forma como foi realizado todos os procedimentos no local e mesmo assim sem sucesso, Cliente ciente que se for constatado mal uso pode ser gerado valores dependendo da verificação da equipe no local, aberto O. S. para que possa ser verificado no local.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-060","tipo":"protocolo","nome":"Alcance insuficiente do Wi-Fi","atalho":"/p-alcance-insuficiente-do-wi-fi","categoria":"Wi-Fi e Equipamentos","conteudo":"Entra em contato informando que o sinal não esta chegando em alguns pontos de sua residência, Foi informado a mesma que dependendo do local onde o equipamento está instalado pode ocorrer esse tipo de instabilidade, O indicado nesses casos onde o sinal não sendo distribuído para toda a residência, é que seja instalado ou um roteador particular ou um repetidor de sinal justamente para que esse sinal possa ser ampliado para toda a residência o mesmo ciente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-061","tipo":"protocolo","nome":"Redes unificadas — rede turbo não visível","atalho":"/p-redes-unificadas-rede-turbo-nao-vis","categoria":"Wi-Fi e Equipamentos","conteudo":"Deseja saber porque a rede turbo não está visível em seu dispositivo, Visto que o mesma possui redes unificadas, Foi informado ao mesmo que vai apresentar sempre o mesmo nome de rede no seu dispositivo, se o seu equipamento for compatível ele vai conseguir utilizar ambas as redes porém vai apresentar sempre o mesmo nome de rede, dependendo da distância que ela acessar do equipamento vai ter a alternância dessas duas redes o mesma ciente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-062","tipo":"protocolo","nome":"Plano não chega ao contratado pelo Wi-Fi","atalho":"/p-plano-nao-chega-ao-contratado-pelo","categoria":"Wi-Fi e Equipamentos","conteudo":"Entra em contato informando que seu plano não está chegando o contratado, Visto que o mesmo está efetuando esses testes através da rede Wi-Fi, foi informado ao mesmo sobre as possíveis interferência que podem ocorrer na rede, indicado o mesmo a fazer o teste através de uma rede cabeada pois como seria uma ligação física não ia sofrer com nenhum tipo de interferência e esse plano chegaria corretamente, O mesmo ciente ficou de verificar no local.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-063","tipo":"protocolo","nome":"Revisão de equipamentos por quedas e lentidão","atalho":"/p-revisao-de-equipamentos-por-quedas","categoria":"Instalação e Reparo","conteudo":"Cliente entra em contato, o mesmo informa que está sofrendo com quedas em sua conexão e lentidão o mesmo informa que já é um problema recorrente em seu sistema, e crer que seja um problema ou com seu moldem ou com o cabo de fibra que vem para sua residência, dessa forma o mesmo solicita que uma equipe vá até o local para realizar uma revisão em seus equipamentos para que possa ser encontrado o motivo dessa instabilidade em sua rede.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-064","tipo":"protocolo","nome":"Alteração de endereço — cobrança dentro do prazo","atalho":"/p-alteracao-de-endereco-cobranca-dent","categoria":"Atendimento e Retorno","conteudo":"Entra em contato cobrando sua alteração de endereço, Visto que a solicitação estava dentro prazo, porém o mesmo solicita urgência, Coloquei todas as informações no chamado externo em aberto cobrando a alteração de endereço do cliente, reforçado também o prazo junto ao cliente o mesmo ciente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-065","tipo":"protocolo","nome":"Alteração de endereço — cobrança fora do prazo","atalho":"/p-alteracao-de-endereco-cobranca-fora","categoria":"Atendimento e Retorno","conteudo":"Cliente entra em contato cobrando sua alt. de endereço, visto chamado em aberto e fora do prazo, onde o chamado já se encontra para uma equipe externa, dessa forma entrei em contato com o agendador de reparo da cidade em seguida repassei o prazo a cliente a mesma ciente e no aguarde da visita.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-066","tipo":"protocolo","nome":"Cobrança de reparo — dentro do prazo","atalho":"/p-cobranca-de-reparo-dentro-do-prazo","categoria":"Atendimento e Retorno","conteudo":"Entra em contato cobrando o reparo de sua conexão, Visto chamado em aberto e dentro do prazo de atendimento, foi reforçado o prazo junto do cliente e realizado a cobrança no chamado aberto a/o mesma/o ciente e no aguarde da visita.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-067","tipo":"protocolo","nome":"Cobrança de reparo — fora do prazo","atalho":"/p-cobranca-de-reparo-fora-do-prazo","categoria":"Atendimento e Retorno","conteudo":"Entra em contato cobrando o reparo de sua conexão, visto chamado em aberto e fora do prazo de atendimento, entrei em contato com os responsáveis pela equipe e foi repassado o prazo a/o cliente a/o mesma ciente e no aguarde da visita.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-068","tipo":"protocolo","nome":"Alteração de senha — concluída","atalho":"/p-alteracao-de-senha-concluida","categoria":"Internet","conteudo":"Entra em contato solicitando alteração da senha da sua rede, Dessa forma alterado a senha no sistema e repassado a nova senha ao cliente, o mesmo se conecta com a senha repassada e informa acesso normal.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-069","tipo":"protocolo","nome":"Cabo de fibra baixo — risco de acidente","atalho":"/p-cabo-de-fibra-baixo-risco-de-aciden","categoria":"Instalação e Reparo","conteudo":"Informa que o cabo de fibra que liga sua residência está baixo, Como possui o risco de acidente, devido afiação está baixo, Dessa forma aberto O. S. para que uma equipe vá até o local fazer ancoragem desse cabo de fibra de forma correta, o mesmo ciente do prazo e no aguarde da visita, por gentileza priorizar.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-070","tipo":"protocolo","nome":"Cabo de fibra baixo após passagem de caminhão","atalho":"/p-cabo-de-fibra-baixo-apos-passagem-d","categoria":"Instalação e Reparo","conteudo":"Informa que um caminhão passou e arrancou uma parte da fibra e deixou ela baixa, Ele se encontra com acesso porém como tem essa parte baixa da fibra ele solicita a visita de uma equipe no local para corrigir essa afiação, Dessa forma aberto O. S. para que possa ser feito a ancoragem dessa fibra, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-071","tipo":"protocolo","nome":"Mudança de endereço — solicitação encaminhada","atalho":"/p-mudanca-de-endereco-solicitacao-enc","categoria":"Instalação e Reparo","conteudo":"O mesmo deseja realizar uma alteração de endereço, Dessa forma repassado para o setor responsável que é o setor de alteração de endereço, A/O mesma/o ficou de verificar junto ao setor responsável.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-072","tipo":"protocolo","nome":"Alteração de cômodo — mesmo cômodo","atalho":"/p-alteracao-de-comodo-mesmo-comodo","categoria":"Instalação e Reparo","conteudo":"Entra em contato solicitando uma alt. de cômodo, Foi informado ao mesmo que se for no mesmo cômodo é cobrado o valor de 20 reais mais a metragem de cabo de fibra utilizada que é 00,60 centavos ou 01,30 no caso do cabo de rede, o/a mesmo/a ciente dos valores e no aguarde da visita.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-073","tipo":"protocolo","nome":"Alteração de cômodo — outro cômodo","atalho":"/p-alteracao-de-comodo-outro-comodo","categoria":"Instalação e Reparo","conteudo":"Entra em contato solicitando uma alteração de cômodo, informado ao mesmo que é cobrado o valor de 30 reais mais a metragem de cabo de fibra que é 00,60 centavos a cada metro utilizado ou 01,30 no caso do cabo de rede, O/A mesma/o ciente dos valores e no aguarde da visita, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-074","tipo":"protocolo","nome":"Sinal irregular na fibra — abertura de O.S.","atalho":"/p-sinal-irregular-na-fibra-abertura-d","categoria":"Instalação e Reparo","conteudo":"Entra em contato informando que está com quedas na conexão, Dessa forma consultado o sinal do cabo de fibra e visto sinal muito irregular em comparação com o sinal da sua rota, Dessa forma aberto O. S. para que uma equipe vá até o local fazer o reparo e deixar esse sinal dentro dos padrões da empresa, Cliente ciente do prazo e no aguarde da visita.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-075","tipo":"protocolo","nome":"Rota com sinal irregular — chamado em aberto","atalho":"/p-rota-com-sinal-irregular-chamado-em","categoria":"Internet","conteudo":"Cliente entra em contato informando que está sem acesso, visto rota com sinal irregular e chamado aberto no saski, repassado o prazo para normalização o mesmo ciente e no aguarde do reparo.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-076","tipo":"protocolo","nome":"Abertura de portas da ONU","atalho":"/p-abertura-de-portas-da-onu","categoria":"Fibra e ONU","conteudo":"O/A mesmo/a entra em contato solicitando a abertura de mais portas para o uso de internet, Informado a/o mesmo que na ONU apenas a porta lan 1 é liberada para o uso de internet, Para abertura de mais portas seria necessário a utilização ou de um roteador particular ou de switch o/a mesmo ciente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-077","tipo":"protocolo","nome":"Reclamação de instalação — sem acesso","atalho":"/p-reclamacao-de-instalacao-sem-acesso","categoria":"Instalação e Reparo","conteudo":"O mesmo informa que está sem acesso, com LOS ativa, Visto rota normal e operante, questionado ao cliente se houve manuseio dos equipamentos no local ou até mesmo danos, cliente confirma que não, Fibra visivelmente normal sem nenhum problema, também não houve nenhuma queda de energia ou infiltração próximo do equipamento, Visto que seu serviço foi instalado recentemente e ele já se encontra sem acesso com LOS ativa, dessa forma aberto uma reclamação de instalação para que o gestor da equipe responsável possa verificar e direcionar a equipe até o local para realizar o reparo, cliente ciente do prazo e no aguarde da visita, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-078","tipo":"protocolo","nome":"ONU sem IP — normalizado","atalho":"/p-onu-sem-ip-normalizado","categoria":"Fibra e ONU","conteudo":"Cliente entra em contato, confirma dados, visto ONU sem Ip, dessa forma reconfigurado o equipamento e após isso o mesmo testa e informa acesso normalizado.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-079","tipo":"protocolo","nome":"Sem conexão com VPN","atalho":"/p-sem-conexao-com-vpn","categoria":"Sistemas e Aplicativos","conteudo":"Cliente entra em contato, confirma dados, o mesmo informa que não está conseguindo acessar sua VPN, cliente informa que já viu essa questão com o setor de TI, onde o problema seria na rede, informado ao mesmo que nesse caso seria necessário fazer a configuração da ONU em modo bridge além de ter conectado um roteador particular em modo PPOE, caso com esses procedimentos não venha a normalizar vai ser preciso adquirir o endereço de IP fixo, o mesmo ciente das informações.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-080","tipo":"protocolo","nome":"Plano não chega ao contratado na rede cabeada — abertura de O.S.","atalho":"/p-plano-nao-chega-ao-contratado-na-re","categoria":"Instalação e Reparo","conteudo":"Informou que seu plano não estava chegando ao contratado. O seu computador estava conectado via rede cabeada foi realizado testes pelo velocímetro, porém verificado que não estaria chegando o plano contratado, verificado que a sua placa é compatível e os cabos UTPs, dessa forma foi reconfigurado e reiniciado a ONU, após realizar testes o mesmo informou que o serviço não normalizou, dessa forma foi aberto uma O. S para equipe passar no local e verificar. Cliente ciente do prazo de 48h e no aguardo.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-081","tipo":"protocolo","nome":"Plano não chega ao contratado na rede cabeada — normalizado","atalho":"/p-plano-nao-chega-ao-contratado-na-2","categoria":"Instalação e Reparo","conteudo":"Informa que o plano não está chegando ao contratado, O mesmo informa que foi realizado o teste pela rede cabeada e um computador. Questionado se tem outros equipamentos conectados durante os testes, se o equipamento suporte a banda contratada, se foi feito em velocímetro ou se tem Roteadores e Switch conectados à ONU, Reconfigurado a ONU. O mesmo informa que normalizou.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-082","tipo":"protocolo","nome":"Plano não chega ao contratado — equipamento com barramento 100","atalho":"/p-plano-nao-chega-ao-contratado-equip","categoria":"Instalação e Reparo","conteudo":"Informa que seu plano não está chegando ao contratado, Visto que os testes estão sendo feitos na rede cabeada direito no equipamento da Brisanet, Cliente não utiliza nenhum roteador particular ou switch e somente ele está conectado na rede, cliente informa que seu equipamento é compatível com o plano contratado, Dessa forma foi reconfigurado a ONU em seguida cliente realiza testes e informa que o erro permanece, dessa forma solicitado um acesso remoto realizado testes junto do cliente e visto que sua maquina é barramento 100, o mesmo ciente da limitação ficou de realizar testes em equipamento compatível com sua velocidade.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-083","tipo":"protocolo","nome":"Controle remoto com problema","atalho":"/p-controle-remoto-com-problema","categoria":"TV","conteudo":"Cliente entra em contato, confirma dados, a mesma informa que seu controle remoto de sua Tv está com mal funcionamento, cliente já tentou trocar as pilhas porém sem sucesso, a mesma informa que ninguém veio a derrubar ou causar nenhum tipo de dano, a mesma ciente que se for constatado algum tipo de dano por parte do cliente, pode ser que venha a gerar custos dependendo da avaliação do técnico, cliente ciente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-084","tipo":"protocolo","nome":"TV sem conexão Wi-Fi — visita particular","atalho":"/p-tv-sem-conexao-wi-fi-visita-particu","categoria":"TV","conteudo":"Cliente entra em contato, confirma dados, o mesmo informa que sua TV não esta funcionando o Wi-Fi em sua TV, tentado reconfigurar e trocar a frequência, tentado orientar o mesmo a se conectar nesse aparelho porém sem sucesso, como se tratava apenas de sua TV foi informado ao mesmo que poderia ser algum problema relacionado a esse equipamento e para que eu possa enviar uma equipe até o local seria cobrado o valor de 20 reais pela visita, o mesmo ciente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-085","tipo":"protocolo","nome":"Auxílio no aplicativo Brisa Cliente","atalho":"/p-auxilio-no-aplicativo-brisa-cliente","categoria":"Sistemas e Aplicativos","conteudo":"Cliente entra em contato, o mesmo solicita auxílio para acessar o aplicativo BRISA CLIENTE; instruções repassadas e dúvidas sobre o portal sanadas.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-086","tipo":"protocolo","nome":"NAT restrito em jogos online","atalho":"/p-nat-restrito-em-jogos-online","categoria":"Sistemas e Aplicativos","conteudo":"Cliente entra em contato, confirma dados, o mesmo informa está com problemas em acessar alguns jogos onlines, logo, foi analisado que o mesmo está com restrição de NAT, visto que utiliza a ONU em modo router. Então foi indicado ao cliente realizar a aquisição de um roteador particular e alterar a ONU para modo Bridge, em última instância, se o problema não for resolvido, foi indicado a contratação de um plano de IP fixo. Cliente ciente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-087","tipo":"protocolo","nome":"IPTV com lentidão exclusiva","atalho":"/p-iptv-com-lentidao-exclusiva","categoria":"TV","conteudo":"Entrou em contato informando estar com problemas de lentidão exclusivamente em um serviço de IPTV pois quando está assistindo alguma programação, o serviço fica travando. Dessa forma expliquei ao cliente que o se são utilizados servidores piratas que não comporta vários acessos ao mesmo tempo. Dessa forma pedi para o cliente testar em outros aplicativos (Netflix e YouTube) onde veio a verificar que o serviço está normal; resumindo, a conexão do cliente está normal, o único problema é no seu equipamento particular que não opera como a mesma deseja.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-088","tipo":"protocolo","nome":"Reclamação de instalação — cabo de rede não disponibilizado","atalho":"/p-reclamacao-de-instalacao-cabo-de-re","categoria":"Instalação e Reparo","conteudo":"Informa que o cabo de rede não foi disponibilizado no ato da instalação. Segundo o cliente ele fez a solicitação a equipe no local porém não foi disponibilizado. Foi aberto uma reclamação de instalação para o gestor de instalação da equipe, para verificação do ocorrido e caso necessário mandar uma equipe técnica novamente ao local. Cliente ciente do prazo e no aguarde da visita.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-089","tipo":"protocolo","nome":"Alteração da ONU para modo Bridge","atalho":"/p-alteracao-da-onu-para-modo-bridge","categoria":"Fibra e ONU","conteudo":"(Cliente) solicitou a troca do modo da ONU para o modo Bridge, realizado a alteração e ativação da ONU foi passado as informações de PPPoE (Login: E-mail no Revan, senha criada para o modo transparente) o/a mesmo/a adicionou ao seu dispositivo roteador particular na opção PPPoE as informações deixando todo o gerenciamento da rede de internet ao seu equipamento. Atendimento realizado com sucesso.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-090","tipo":"protocolo","nome":"Alteração da ONU de Bridge para Router","atalho":"/p-alteracao-da-onu-de-bridge-para-rou","categoria":"Fibra e ONU","conteudo":"(Cliente) solicitou a troca do modo da ONU de Bridge para Router deixando o gerenciamento pela ONU onde o mesmo testou o acesso ao sistema aprovando utilização. Chamado finalizado com sucesso.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-091","tipo":"protocolo","nome":"Aquisição de roteador TP-Link","atalho":"/p-aquisicao-de-roteador-tp-link","categoria":"Wi-Fi e Equipamentos","conteudo":"Cliente entrou em contato solicitando o Roteador TP-Link. informado ao mesmo sobre a taxa de R$100,00 para adquirir o equipamento, podendo ser parcelado em até 4x de R$25,00. Cliente ciente dos valores e no aguardo da visita. Por gentileza aos responsáveis verificar.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-092","tipo":"protocolo","nome":"Erro NTP — abertura de O.S.","atalho":"/p-erro-ntp-abertura-de-o-s","categoria":"TV","conteudo":"Informa que o serviço de Tv não está funcionando, Segundo o mesmo apresenta erro de NTP, Visto cabeamento correto entre o STB e a ONU, foi feito todo o procedimento de NET> IP > DHCP.. Letra A vermelha duas vezes e sair varias vezes porém sem sucesso, foi reiniciado os equipamentos manualmente mais sem êxito, Dessa forma aberto O. S para que uma equipe vá até o local verificar o mesmo ciente do prazo e no aguarde.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-093","tipo":"protocolo","nome":"Erro NTP — serviço normalizado","atalho":"/p-erro-ntp-servico-normalizado","categoria":"TV","conteudo":"Cliente informa que o serviço de Tv não está funcionando, Segundo o mesmo apresenta erro de NTP, Visto cabeamento correto entre o STB e a ONU, foi feito todo o procedimento de NET> IP > DHCP.. Letra A vermelha duas vezes e sair varias vezes porém sem sucesso, foi reiniciado os equipamentos manualmente em seguida cliente testa e confirma serviço normal.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-094","tipo":"protocolo","nome":"TV com tela preta ou travada — restaurada","atalho":"/p-tv-com-tela-preta-ou-travada-restau","categoria":"TV","conteudo":"(Cliente) entrou em contato informando que sua TV estaria com a Tela Preta / Travada, feito o procedimento para voltar aos padrões de fábrica do Set Box (Menu + Botão B de cor verde aparecendo a informação: Deseja restaurar para configurações de fábrica? apertando Ok restaurando o Set Box) e com isso o serviço foi normalizado. Cliente realizou testes.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-095","tipo":"protocolo","nome":"Receptor bloqueado — desbloqueado pela liderança","atalho":"/p-receptor-bloqueado-desbloqueado-pel","categoria":"TV","conteudo":"Entrou em contato informando que está sua TV está sem serviço, Seu receptor está bloqueado sendo que a situação financeira está ok dessa forma falei com o líder de plantão, onde o serviço de TV foi desbloqueado, após isso o serviço ficou normal.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-096","tipo":"protocolo","nome":"TV na porta incorreta — normalizada","atalho":"/p-tv-na-porta-incorreta-normalizada","categoria":"TV","conteudo":"Cliente entra em contato, confirma dados, informa que a TV está com tela preta, com falha de autenticação, visto STB na porta errada, dessa forma pedi para o cliente colocar na porta Lan 2, que é a porta correta, ao fazer esse procedimento o cliente informa acesso normalizado.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-097","tipo":"protocolo","nome":"Telefonia com problema geral","atalho":"/p-telefonia-com-problema-geral","categoria":"Telefonia","conteudo":"Cliente entra em contato, confirma dados, o mesmo informa que não está conseguindo realizar ligações, visto que se trata de um problema geral na telefonia, repassado o prazo de 24 horas para normalização a mesma ciente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-098","tipo":"protocolo","nome":"Telefonia bloqueada por limite","atalho":"/p-telefonia-bloqueada-por-limite","categoria":"Telefonia","conteudo":"Cliente entra em contato, informa que não está conseguindo realizar ligações, visto bloqueado por limite, repassado informações a cliente, ficou ciente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-099","tipo":"protocolo","nome":"Telefone desativado — normalizado","atalho":"/p-telefone-desativado-normalizado","categoria":"Telefonia","conteudo":"Informa que não consegue usar o seu telefone fixo, telefone não realiza nem recebe chamadas, está mudo, visto telefonia desativada, ativado ONU, em seguida cliente testa e confirma acesso normalizado.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-100","tipo":"protocolo","nome":"Telefonia com falha de autenticação — normalizada","atalho":"/p-telefonia-com-falha-de-autenticacao","categoria":"Telefonia","conteudo":"Informa que não consegue usar o seu telefone fixo, telefone não realiza nem recebe chamadas, está mudo, visto telefonia com falha de autenticação, ativado ONU, em seguida cliente testa e confirma acesso normalizado.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-101","tipo":"protocolo","nome":"Telefonia com chiado — abertura de O.S.","atalho":"/p-telefonia-com-chiado-abertura-de-o","categoria":"Telefonia","conteudo":"Cliente entra em contato, confirma dados, informando que o telefone fixo está com um chiado no fone, dessa forma foi verificado que o equipamento é da empresa, foram verificado os cabos, reconfigurado a ONU/telefonia, porém o mesmo informa que o problema ainda persiste mesmo após os procedimentos, dessa forma foi aberto O. S. por gentileza passar no local e verificar.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-102","tipo":"protocolo","nome":"Telefone na porta incorreta — normalizado","atalho":"/p-telefone-na-porta-incorreta-normali","categoria":"Telefonia","conteudo":"Cliente entra em contato, confirma dados, informa que não conseguir usar o seu telefone fixo, telefone não realiza nem recebe chamadas, está mudo, visto telefonia registrada e normal, visto na porta Phone 2, auxiliado ao mesmo/a a colocar na porta Phone 1, em seguida cliente testa e confirma acesso normalizado.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-103","tipo":"protocolo","nome":"Telefone mudo — abertura de O.S.","atalho":"/p-telefone-mudo-abertura-de-o-s","categoria":"Telefonia","conteudo":"Informa que não conseguir usar o seu telefone fixo ele está mudo, Visto na porta correta e registrado normal, Foi verificado as teclas laterais desse seu telefone e todas posicionadas de forma correta, realizado testes serviço ainda continua mudo, Dessa forma aberto O. S para verificação.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-104","tipo":"protocolo","nome":"Troca de número de telefone fixo","atalho":"/p-troca-de-numero-de-telefone-fixo","categoria":"Telefonia","conteudo":"(Cliente) solicitou a troca do número de telefone por um novo [motivo]. Informado ao/à mesmo/a que será enviado um E-mail para o setor responsável. O e-mail deverá ser direcionado aos responsáveis internos para realização da troca do número atual por um novo. Repassado o prazo de 5 dias para resolução da solicitação, cliente ciente das informações. Aguardando informações do processo.","variaveis":["motivo"],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"},{"id":"te-prot-105","tipo":"protocolo","nome":"Visita técnica para cabeamento particular","atalho":"/p-visita-tecnica-para-cabeamento-part","categoria":"Instalação e Reparo","conteudo":"Entra em contato, confirma dados, Informa que deseja cabear sua TV informado valor da visita particular de 20 reais, incluso 15 metros de cabos, e caso passe desse valor será cobrado 1,30 por metro o mesmo ciente, aberto O. S, informado prazo de 48 horas, cliente ciente.","variaveis":[],"favorito":false,"ativo":true,"origem":"protocolos.docx","triggerKey":"space"}];

  class TextExpressApp {
    constructor(root) {
      this.root = root;
      this.panel = root.querySelector(".te-panel");
      this.reopenButton = root.querySelector(".te-reopen-button");
      this.listElement = root.querySelector("#te-snippet-list");
      this.emptyState = root.querySelector("#te-empty-state");
      this.detailPane = root.querySelector("#te-detail-pane");
      this.categoryBar = root.querySelector("#te-category-bar");
      this.searchInput = root.querySelector("#te-search-input");
      this.countBadge = root.querySelector("#te-count-badge");
      this.statusCounts = root.querySelector("#te-status-counts");
      this.importInput = root.querySelector("#te-import-input");
      this.snippetModal = root.querySelector("#te-snippet-modal");
      this.snippetForm = root.querySelector("#te-snippet-form");
      this.variableModal = root.querySelector("#te-variable-modal");
      this.variableForm = root.querySelector("#te-variable-form");
      this.variableFields = root.querySelector("#te-variable-fields");
      this.settingsModal = root.querySelector("#te-settings-modal");
      this.settingsForm = root.querySelector("#te-settings-form");
      this.categoryModal = root.querySelector("#te-category-modal");
      this.categoryForm = root.querySelector("#te-category-form");
      this.categoryIconGrid = root.querySelector("#te-category-icon-grid");
      this.categoryColorGrid = root.querySelector("#te-category-color-grid");
      this.toastStack = root.querySelector("#te-toast-stack");

      this.snippets = [];
      this.categories = [];
      this.settings = { ...DEFAULT_SETTINGS };
      this.activeType = "atendimento";
      this.activeCategory = "Todos";
      this.selectedId = null;
      this.editingId = null;
      this.editingCategoryId = null;
      this.shortcutMap = new Map();
      this.lastActiveElement = null;
      this.contentEditableRanges = new WeakMap();
      this.variableResolver = null;
      this.storageAvailable = true;
      this.dragState = null;
      this.isClosed = false;

      this.onGlobalKeyDown = this.onGlobalKeyDown.bind(this);
      this.onGlobalFocusIn = this.onGlobalFocusIn.bind(this);
      this.onSelectionChange = this.onSelectionChange.bind(this);
      this.onDragMove = this.onDragMove.bind(this);
      this.onDragEnd = this.onDragEnd.bind(this);
    }

    init() {
      if (!this.root || this.root.dataset.teInitialized === "true") return;
      this.root.dataset.teInitialized = "true";
      this.checkStorage();
      this.loadSettings();
      this.loadTheme();
      this.loadCategories();
      this.loadSnippets();
      this.restorePosition();
      this.setupEvents();
      this.rebuildShortcutMap();
      this.render();

      if (!this.storageAvailable) {
        this.showToast("O armazenamento local está bloqueado nesta página. As alterações valerão apenas nesta sessão.", "error", 6000);
      }
    }

    checkStorage() {
      try {
        const key = "__te_storage_test__";
        window.localStorage.setItem(key, "1");
        window.localStorage.removeItem(key);
        this.storageAvailable = true;
      } catch (error) {
        this.storageAvailable = false;
      }
    }

    storageGet(key) {
      if (!this.storageAvailable) return null;
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        this.storageAvailable = false;
        return null;
      }
    }

    storageSet(key, value) {
      if (!this.storageAvailable) return false;
      try {
        window.localStorage.setItem(key, value);
        return true;
      } catch (error) {
        this.storageAvailable = false;
        return false;
      }
    }

    loadSettings() {
      const saved = this.storageGet(STORAGE_KEYS.settings);
      if (!saved) return;
      try {
        const parsed = JSON.parse(saved);
        this.settings = {
          autoExpand: parsed.autoExpand !== false,
          keepOpenAfterInsert: parsed.keepOpenAfterInsert !== false,
          confirmBeforeDelete: parsed.confirmBeforeDelete !== false
        };
      } catch (error) {
        this.settings = { ...DEFAULT_SETTINGS };
      }
    }

    saveSettings() {
      this.storageSet(STORAGE_KEYS.settings, JSON.stringify(this.settings));
    }

    loadTheme() {
      const saved = this.storageGet(STORAGE_KEYS.darkMode);
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const enabled = saved === null ? prefersDark : saved === "true";
      this.applyTheme(enabled);
    }

    applyTheme(enabled) {
      document.body.classList.toggle("te-dark", enabled);
      this.root.classList.toggle("te-dark", enabled);
      const use = this.root.querySelector(".te-theme-icon use");
      if (use) use.setAttribute("href", enabled ? "#te-i-sun" : "#te-i-moon");
    }

    toggleTheme() {
      const enabled = !this.root.classList.contains("te-dark");
      this.applyTheme(enabled);
      this.storageSet(STORAGE_KEYS.darkMode, String(enabled));
      this.showToast(enabled ? "Modo escuro ativado." : "Modo claro ativado.", "success");
    }


    getDefaultCategories() {
      return DEFAULT_CATEGORIES.map((item) => this.normalizeCategory(item));
    }

    loadCategories() {
      const saved = this.storageGet(STORAGE_KEYS.categories);
      if (!saved) {
        this.categories = this.getDefaultCategories();
        this.saveCategories();
        return;
      }
      try {
        const parsed = JSON.parse(saved);
        const source = Array.isArray(parsed) ? parsed : parsed && Array.isArray(parsed.categories) ? parsed.categories : null;
        if (!source) throw new Error("Formato inválido");
        const seen = new Set();
        this.categories = source.map((item) => this.normalizeCategory(item)).filter((item) => {
          if (seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        });
        for (const tipo of ["atendimento", "protocolo"]) {
          if (!this.categories.some((item) => item.tipo === tipo)) {
            this.categories.push(this.normalizeCategory({ tipo, nome: "Outros", icone: "folder", cor: "#64748b", ordem: 999 }));
          }
        }
        this.sortCategories();
      } catch (error) {
        this.categories = this.getDefaultCategories();
        this.saveCategories();
      }
    }

    saveCategories() {
      this.sortCategories();
      const payload = {
        app: "Text Express",
        schemaVersion: 3,
        appVersion: APP_VERSION,
        updatedAt: new Date().toISOString(),
        categories: this.categories
      };
      this.storageSet(STORAGE_KEYS.categories, JSON.stringify(payload));
    }

    normalizeCategory(raw = {}) {
      const tipo = raw.tipo === "protocolo" ? "protocolo" : "atendimento";
      const nome = String(raw.nome || "Nova categoria").trim().slice(0, 48) || "Nova categoria";
      const icone = CATEGORY_ICON_OPTIONS.includes(raw.icone) ? raw.icone : "folder";
      const cor = /^#[0-9a-f]{6}$/i.test(String(raw.cor || "")) ? String(raw.cor).toLowerCase() : "#64748b";
      const ordem = Number.isFinite(Number(raw.ordem)) ? Number(raw.ordem) : 999;
      return {
        id: this.isSafeId(raw.id) ? String(raw.id) : this.generateCategoryId(tipo, nome),
        tipo,
        nome,
        icone,
        cor,
        ordem,
        padrao: Boolean(raw.padrao)
      };
    }

    generateCategoryId(tipo, nome = "categoria") {
      const slug = this.slugify(nome).slice(0, 36) || "categoria";
      const base = `cat-${tipo === "protocolo" ? "prot" : "atd"}-${slug}`;
      if (!this.categories.some((item) => item.id === base)) return base;
      return `${base}-${Date.now().toString(36)}`;
    }

    slugify(value) {
      return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }

    sortCategories() {
      this.categories.sort((a, b) => a.tipo.localeCompare(b.tipo) || a.ordem - b.ordem || a.nome.localeCompare(b.nome, "pt-BR"));
    }

    getCategoryById(id) {
      return this.categories.find((item) => item.id === id) || null;
    }

    findCategoryByName(nome, tipo) {
      const normalized = this.normalizeSearchText(nome);
      return this.categories.find((item) => item.tipo === tipo && this.normalizeSearchText(item.nome) === normalized) || null;
    }

    resolveCategory(categoryId, categoryName, tipo) {
      let category = categoryId ? this.getCategoryById(String(categoryId)) : null;
      if (category && category.tipo !== tipo) category = null;
      if (!category && categoryName) category = this.findCategoryByName(categoryName, tipo);
      if (!category) category = this.findCategoryByName("Outros", tipo) || this.getCategoriesForType(tipo)[0] || null;
      if (!category) {
        category = this.normalizeCategory({ tipo, nome: categoryName || "Outros", icone: "folder", cor: "#64748b", ordem: 999 });
        this.categories.push(category);
        this.saveCategories();
      }
      return category;
    }

    getCategoryForSnippet(snippet) {
      return this.resolveCategory(snippet.categoriaId, snippet.categoria, snippet.tipo);
    }

    icon(name, extraClass = "") {
      const safe = CATEGORY_ICON_OPTIONS.includes(name) || ["plus","edit","trash","copy","star","send","download","upload","rotate-ccw","x","chevron-left","chevron-right","palette","save","info","moon","sun","minus","maximize-2","sliders","heart","check","more-horizontal"].includes(name) ? name : "folder";
      return `<svg class="te-icon ${this.escapeAttr(extraClass)}" aria-hidden="true"><use href="#te-i-${this.escapeAttr(safe)}"></use></svg>`;
    }

    getDefaultSnippets() {
      return DEFAULT_SNIPPETS.map((item) => this.normalizeSnippet(item));
    }

    loadSnippets() {
      const saved = this.storageGet(STORAGE_KEYS.snippets);
      if (!saved) {
        this.snippets = this.getDefaultSnippets();
        this.saveSnippets();
        return;
      }

      try {
        const parsed = JSON.parse(saved);
        const source = Array.isArray(parsed) ? parsed : parsed && Array.isArray(parsed.snippets) ? parsed.snippets : null;
        if (!source) throw new Error("Formato inválido");
        this.snippets = this.normalizeCollection(source);
        if (!this.snippets.length) throw new Error("Base vazia");
      } catch (error) {
        this.snippets = this.getDefaultSnippets();
        this.saveSnippets();
      }
    }

    saveSnippets() {
      const payload = {
        app: "Text Express",
        schemaVersion: 3,
        appVersion: APP_VERSION,
        updatedAt: new Date().toISOString(),
        snippets: this.snippets
      };
      const saved = this.storageSet(STORAGE_KEYS.snippets, JSON.stringify(payload));
      if (!saved && this.storageAvailable === false) {
        this.showToast("Não foi possível salvar no armazenamento local.", "error");
      }
      this.rebuildShortcutMap();
    }

    normalizeCollection(items) {
      const ids = new Set();
      const shortcuts = new Set();
      const normalized = [];

      for (const raw of items) {
        const item = this.normalizeSnippet(raw);
        if (!item.conteudo || !item.nome) continue;
        if (ids.has(item.id)) item.id = this.generateId(item.tipo);
        ids.add(item.id);
        item.atalho = this.makeUniqueShortcut(item.atalho, shortcuts);
        shortcuts.add(item.atalho);
        normalized.push(item);
      }
      return normalized;
    }

    normalizeSnippet(raw = {}) {
      const tipo = raw.tipo === "protocolo" ? "protocolo" : "atendimento";
      const nome = String(raw.nome || "Modelo sem nome").trim().slice(0, 100);
      const conteudo = String(raw.conteudo || raw.content || "").replace(/\r\n/g, "\n").trim();
      const category = this.resolveCategory(raw.categoriaId || raw.categoryId, raw.categoria || raw.category, tipo);
      const atalhoBase = raw.atalho || raw.shortcut || this.suggestShortcutFromName(nome);
      const triggerKey = ["space", "tab", "enter"].includes(raw.triggerKey) ? raw.triggerKey : "space";
      return {
        id: this.isSafeId(raw.id) ? String(raw.id) : this.generateId(tipo),
        tipo,
        nome,
        atalho: this.normalizeShortcut(atalhoBase),
        categoriaId: category.id,
        categoria: category.nome,
        grupo: raw.grupo ? String(raw.grupo).slice(0, 80) : "",
        contexto: raw.contexto ? String(raw.contexto).slice(0, 120) : "",
        conteudo,
        variaveis: this.extractVariables(conteudo),
        favorito: Boolean(raw.favorito),
        ativo: raw.ativo !== false,
        triggerKey,
        origem: raw.origem ? String(raw.origem).slice(0, 150) : "Text Express"
      };
    }

    isSafeId(value) {
      return typeof value === "string" && /^[a-zA-Z0-9_-]{3,100}$/.test(value);
    }

    generateId(tipo = "modelo") {
      if (window.crypto && typeof window.crypto.randomUUID === "function") {
        return `te-${tipo}-${window.crypto.randomUUID()}`;
      }
      return `te-${tipo}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    }

    normalizeShortcut(value) {
      let text = String(value || "").trim().toLowerCase();
      text = text.replace(/^\/+/, "");
      text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      text = text.replace(/\s+/g, "-").replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-");
      text = text.replace(/^[-_]+|[-_]+$/g, "");
      return `/${text || "modelo"}`;
    }

    suggestShortcutFromName(name) {
      return this.normalizeShortcut(name || "modelo");
    }

    makeUniqueShortcut(shortcut, usedSet = null, ignoreId = null) {
      const used = usedSet || new Set(this.snippets.filter((item) => item.id !== ignoreId).map((item) => item.atalho));
      const base = this.normalizeShortcut(shortcut);
      if (!used.has(base)) return base;
      let index = 2;
      while (used.has(`${base}-${index}`)) index += 1;
      return `${base}-${index}`;
    }

    rebuildShortcutMap() {
      this.shortcutMap = new Map();
      for (const snippet of this.snippets) {
        if (snippet.ativo && snippet.atalho) this.shortcutMap.set(snippet.atalho.toLowerCase(), snippet);
      }
    }

    setupEvents() {
      this.root.addEventListener("click", (event) => this.handleRootClick(event));
      this.root.addEventListener("change", (event) => this.handleRootChange(event));
      this.root.addEventListener("input", (event) => this.handleRootInput(event));
      this.searchInput.addEventListener("input", () => this.renderSnippets());
      this.snippetForm.addEventListener("submit", (event) => this.saveSnippet(event));
      this.categoryForm.addEventListener("submit", (event) => this.saveCategory(event));
      this.variableForm.addEventListener("submit", (event) => this.submitVariables(event));
      this.settingsForm.addEventListener("submit", (event) => this.submitSettings(event));
      this.importInput.addEventListener("change", (event) => this.handleImportFile(event));

      const contentField = this.root.querySelector("#te-form-content");
      contentField.addEventListener("input", () => this.detectVariables(contentField.value));
      this.root.querySelector("#te-form-name").addEventListener("blur", () => {
        const shortcutField = this.root.querySelector("#te-form-shortcut");
        if (!shortcutField.value.trim()) shortcutField.value = this.getAvailableSuggestedShortcut();
      });
      this.root.querySelector("#te-form-shortcut").addEventListener("blur", (event) => {
        event.target.value = this.normalizeShortcut(event.target.value);
        this.validateShortcutField();
      });

      document.addEventListener("keydown", this.onGlobalKeyDown, true);
      document.addEventListener("focusin", this.onGlobalFocusIn, true);
      document.addEventListener("selectionchange", this.onSelectionChange, true);
      window.addEventListener("resize", () => this.constrainPanel());

      const dragHandle = this.root.querySelector("[data-te-drag-handle]");
      dragHandle.addEventListener("pointerdown", (event) => this.onDragStart(event));
    }

    handleRootClick(event) {
      const typeButton = event.target.closest("[data-te-type]");
      if (typeButton) {
        this.activeType = typeButton.dataset.teType;
        this.activeCategory = "Todos";
        this.selectedId = null;
        this.searchInput.value = "";
        this.render();
        return;
      }

      const actionButton = event.target.closest("[data-te-action]");
      const card = event.target.closest("[data-te-card-id]");
      if (actionButton) {
        const action = actionButton.dataset.teAction;
        const id = actionButton.dataset.teId || (card && card.dataset.teCardId) || null;
        const categoryId = actionButton.dataset.teCategoryId || null;
        const iconName = actionButton.dataset.teIconName || null;
        const color = actionButton.dataset.teColor || null;
        const actions = {
          theme: () => this.toggleTheme(),
          minimize: () => this.toggleMinimize(),
          close: () => this.closeApp(),
          reopen: () => this.openApp(),
          new: () => this.openModal(),
          import: () => this.importSnippets(),
          export: () => this.exportSnippets(),
          reset: () => this.resetSnippets(),
          settings: () => this.openSettings(),
          "settings-close": () => this.closeSettings(),
          "modal-close": () => this.closeModal(),
          "suggest-shortcut": () => this.applySuggestedShortcut(),
          "variable-cancel": () => this.finishVariablePrompt(null),
          insert: () => this.insertSnippet(id),
          copy: () => this.copySnippet(id),
          edit: () => this.editSnippet(id),
          delete: () => this.deleteSnippet(id),
          favorite: () => this.toggleFavorite(id),
          "category-new": () => this.openCategoryModal(),
          "category-add-from-form": () => this.openCategoryModal(null, this.root.querySelector('input[name="te-type"]:checked')?.value || "atendimento", true),
          "category-edit": () => this.openCategoryModal(this.getCategoryById(categoryId)),
          "category-close": () => this.closeCategoryModal(),
          "category-delete": () => this.deleteCategory(this.editingCategoryId),
          "category-move-left": () => this.moveCategory(this.editingCategoryId, -1),
          "category-move-right": () => this.moveCategory(this.editingCategoryId, 1),
          "category-icon": () => this.selectCategoryIcon(iconName),
          "category-color": () => this.selectCategoryColor(color)
        };
        if (actions[action]) {
          event.preventDefault();
          event.stopPropagation();
          actions[action]();
          return;
        }
      }

      const categoryButton = event.target.closest("[data-te-category]");
      if (categoryButton) {
        this.activeCategory = categoryButton.dataset.teCategory;
        this.selectedId = null;
        this.renderCategories();
        this.renderSnippets();
        return;
      }

      if (card) {
        this.selectedId = card.dataset.teCardId;
        this.renderSnippets();
      }
    }

    handleRootChange(event) {
      if (event.target.matches('input[name="te-type"]')) {
        this.updateCategoryOptions(event.target.value);
      }
      if (event.target.matches('input[name="te-category-type"]')) {
        this.updateCategoryPreview();
      }
      if (event.target.id === "te-category-form-color") {
        this.selectCategoryColor(event.target.value);
      }
    }

    handleRootInput(event) {
      if (event.target.id === "te-category-form-name") this.updateCategoryPreview();
    }


    render() {
      this.root.querySelectorAll("[data-te-type]").forEach((button) => {
        button.classList.toggle("te-active", button.dataset.teType === this.activeType);
      });
      this.renderCategories();
      this.renderSnippets();
      this.updateCount();
    }

    getCategoriesForType(type) {
      let ids = null;
      if (type === "favoritos") {
        ids = new Set(this.snippets.filter((item) => item.favorito && item.ativo).map((item) => item.categoriaId));
      }
      return this.categories
        .filter((category) => type === "favoritos" ? ids.has(category.id) : category.tipo === type)
        .sort((a, b) => a.ordem - b.ordem || a.nome.localeCompare(b.nome, "pt-BR"));
    }

    renderCategories() {
      const categories = this.getCategoriesForType(this.activeType);
      const visibleItems = this.snippets.filter((item) => item.ativo && (this.activeType === "favoritos" ? item.favorito : item.tipo === this.activeType));
      const allCount = visibleItems.length;
      if (this.activeCategory !== "Todos" && !categories.some((item) => item.id === this.activeCategory)) this.activeCategory = "Todos";

      const categoryHtml = categories.map((category) => {
        const count = visibleItems.filter((item) => item.categoriaId === category.id).length;
        return `
          <div class="te-category-chip ${category.id === this.activeCategory ? "te-active" : ""}" style="--te-category-color:${this.escapeAttr(category.cor)}">
            <button type="button" class="te-category-button" data-te-category="${this.escapeAttr(category.id)}" title="Filtrar por ${this.escapeAttr(category.nome)}">
              ${this.icon(category.icone)}
              <span>${this.escapeHtml(category.nome)}</span>
              <span class="te-category-count">${count}</span>
            </button>
            <button type="button" class="te-category-edit" data-te-action="category-edit" data-te-category-id="${this.escapeAttr(category.id)}" title="Editar categoria" aria-label="Editar categoria ${this.escapeAttr(category.nome)}">
              ${this.icon("edit")}
            </button>
          </div>`;
      }).join("");

      this.categoryBar.innerHTML = `
        <div class="te-category-chip te-category-all ${this.activeCategory === "Todos" ? "te-active" : ""}" style="--te-category-color:var(--te-primary)">
          <button type="button" class="te-category-button" data-te-category="Todos">
            ${this.icon("layout-grid")}<span>Todos</span><span class="te-category-count">${allCount}</span>
          </button>
        </div>
        ${categoryHtml}
        <button type="button" class="te-category-add-button" data-te-action="category-new" title="Adicionar categoria">
          ${this.icon("plus")}<span>Categoria</span>
        </button>`;
    }

    getFilteredSnippets() {
      const query = this.normalizeSearchText(this.searchInput.value);
      return this.snippets.filter((snippet) => {
        if (!snippet.ativo) return false;
        const matchesType = this.activeType === "favoritos" ? snippet.favorito : snippet.tipo === this.activeType;
        if (!matchesType) return false;
        if (this.activeCategory !== "Todos" && snippet.categoriaId !== this.activeCategory) return false;
        if (!query) return true;
        const category = this.getCategoryForSnippet(snippet);
        const haystack = this.normalizeSearchText([
          snippet.nome, snippet.atalho, snippet.conteudo, category.nome, snippet.grupo, snippet.contexto
        ].join(" "));
        return haystack.includes(query);
      });
    }

    normalizeSearchText(value) {
      return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    renderSnippets() {
      const items = this.getFilteredSnippets();
      if (!items.some((item) => item.id === this.selectedId)) this.selectedId = items[0] ? items[0].id : null;

      this.listElement.innerHTML = items.map((snippet) => this.renderCard(snippet)).join("");
      this.emptyState.classList.toggle("te-hidden", items.length > 0);
      this.listElement.classList.toggle("te-hidden", items.length === 0);
      this.renderDetail(this.selectedId ? this.snippets.find((item) => item.id === this.selectedId) : null);
    }

    renderCard(snippet) {
      const selected = snippet.id === this.selectedId ? "te-selected" : "";
      const category = this.getCategoryForSnippet(snippet);
      return `
        <article class="te-snippet-card ${selected}" data-te-card-id="${this.escapeAttr(snippet.id)}" data-te-snippet-type="${snippet.tipo}" style="--te-card-accent:${this.escapeAttr(category.cor)}">
          <span class="te-card-icon" aria-hidden="true" style="--te-category-color:${this.escapeAttr(category.cor)}">${this.icon(category.icone)}</span>
          <div class="te-card-main">
            <div class="te-card-title-row">
              <span class="te-card-title" title="${this.escapeAttr(snippet.nome)}">${this.escapeHtml(snippet.nome)}</span>
              <span class="te-category-tag" title="${this.escapeAttr(category.nome)}" style="--te-category-color:${this.escapeAttr(category.cor)}">${this.icon(category.icone)}${this.escapeHtml(category.nome)}</span>
            </div>
            <div class="te-shortcut-line">
              <code>${this.escapeHtml(snippet.atalho)}</code>
              <span>${this.icon("play-circle")} ${this.escapeHtml(TRIGGER_LABELS[snippet.triggerKey] || "Espaço")}</span>
            </div>
            <p class="te-card-excerpt">${this.escapeHtml(snippet.conteudo)}</p>
            <div class="te-card-actions">
              <button class="te-text-button" type="button" data-te-action="edit" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("edit")} Editar</button>
              <button class="te-text-button te-delete" type="button" data-te-action="delete" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("trash")} Excluir</button>
              <button class="te-text-button te-card-insert" type="button" data-te-action="insert" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("send")} Inserir</button>
            </div>
          </div>
          <button class="te-favorite-button ${snippet.favorito ? "te-active" : ""}" type="button" data-te-action="favorite" data-te-id="${this.escapeAttr(snippet.id)}" title="${snippet.favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}" aria-label="${snippet.favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}">${this.icon("star")}</button>
        </article>`;
    }

    renderDetail(snippet) {
      if (!snippet) {
        this.detailPane.removeAttribute("data-te-snippet-type");
        this.detailPane.innerHTML = `<div class="te-detail-empty">${this.icon("zap")}<strong>Selecione um modelo</strong><p>Veja o conteúdo completo, as variáveis e o atalho de ativação.</p></div>`;
        return;
      }
      const category = this.getCategoryForSnippet(snippet);
      this.detailPane.dataset.teSnippetType = snippet.tipo;
      this.detailPane.style.setProperty("--te-detail-accent", category.cor);
      const variableHtml = snippet.variaveis.length
        ? snippet.variaveis.map((variable) => `<span class="te-variable-tag">${this.icon("tag")}${this.escapeHtml(variable)}</span>`).join("")
        : '<span class="te-muted">Nenhuma variável encontrada.</span>';
      this.detailPane.innerHTML = `
        <div class="te-detail-header">
          <div class="te-detail-title-wrap">
            <span class="te-detail-category-icon" style="--te-category-color:${this.escapeAttr(category.cor)}">${this.icon(category.icone)}</span>
            <div><h2>${this.escapeHtml(snippet.nome)}</h2><div class="te-detail-meta">
              <span class="te-category-tag" style="--te-category-color:${this.escapeAttr(category.cor)}">${this.icon(category.icone)}${this.escapeHtml(category.nome)}</span>
              <code class="te-detail-shortcut">${this.escapeHtml(snippet.atalho)}</code>
              <span class="te-muted">+ ${this.escapeHtml(TRIGGER_LABELS[snippet.triggerKey] || "Espaço")}</span>
            </div></div>
          </div>
          <button class="te-favorite-button ${snippet.favorito ? "te-active" : ""}" type="button" data-te-action="favorite" data-te-id="${this.escapeAttr(snippet.id)}" title="Favorito">${this.icon("star")}</button>
        </div>
        <section class="te-detail-section"><strong>${this.icon("file-text")} Conteúdo</strong><div class="te-content-preview">${this.escapeHtml(snippet.conteudo)}</div></section>
        <section class="te-detail-section"><strong>${this.icon("tag")} Variáveis detectadas</strong><div class="te-variable-tags">${variableHtml}</div></section>
        <section class="te-detail-section te-how-to"><strong>${this.icon("info")} Como usar</strong><br>Digite <code>${this.escapeHtml(snippet.atalho)}</code> e pressione <strong>${this.escapeHtml(TRIGGER_LABELS[snippet.triggerKey] || "Espaço")}</strong>, ou clique em “Inserir”.</section>
        <div class="te-detail-actions">
          <button class="te-primary-button" type="button" data-te-action="insert" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("send")} Inserir no campo ativo</button>
          <button class="te-secondary-button" type="button" data-te-action="copy" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("copy")} Copiar</button>
          <button class="te-secondary-button" type="button" data-te-action="edit" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("edit")} Editar</button>
          <button class="te-danger-button" type="button" data-te-action="delete" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("trash")} Excluir</button>
        </div>`;
    }

    updateCount() {
      const atendimento = this.snippets.filter((item) => item.tipo === "atendimento" && item.ativo).length;
      const protocolo = this.snippets.filter((item) => item.tipo === "protocolo" && item.ativo).length;
      const total = atendimento + protocolo;
      this.countBadge.textContent = `${total} ${total === 1 ? "modelo" : "modelos"}`;
      this.statusCounts.textContent = `Atendimento: ${atendimento} · Protocolo: ${protocolo} · Total: ${total}`;
    }

    openModal(data = null) {
      const type = data ? data.tipo : this.activeType === "protocolo" ? "protocolo" : "atendimento";
      this.editingId = data ? data.id : null;
      this.root.querySelector("#te-modal-kicker").textContent = data ? "Editar modelo" : "Novo modelo";
      this.root.querySelector("#te-modal-title").textContent = data ? "Editar modelo" : "Criar modelo";
      this.root.querySelector("#te-form-id").value = data ? data.id : "";
      this.root.querySelectorAll('input[name="te-type"]').forEach((input) => input.checked = input.value === type);
      this.root.querySelector("#te-form-name").value = data ? data.nome : "";
      this.root.querySelector("#te-form-shortcut").value = data ? data.atalho : "";
      this.root.querySelector("#te-form-trigger").value = data ? data.triggerKey : "space";
      this.root.querySelector("#te-form-content").value = data ? data.conteudo : "";
      this.root.querySelector("#te-form-favorite").checked = data ? data.favorito : false;
      this.clearFormErrors();
      this.updateCategoryOptions(type, data ? data.categoriaId : null);
      this.detectVariables(data ? data.conteudo : "");
      this.snippetModal.classList.remove("te-hidden");
      window.setTimeout(() => this.root.querySelector("#te-form-name").focus(), 30);
    }

    closeModal() {
      this.snippetModal.classList.add("te-hidden");
      this.snippetForm.reset();
      this.editingId = null;
      this.clearFormErrors();
    }

    updateCategoryOptions(type, selected = null) {
      const field = this.root.querySelector("#te-form-category");
      const categories = this.getCategoriesForType(type);
      const desired = selected || field.value || categories[0]?.id;
      field.innerHTML = categories.map((category) => `<option value="${this.escapeAttr(category.id)}">${this.escapeHtml(category.nome)}</option>`).join("");
      field.value = categories.some((category) => category.id === desired) ? desired : (categories[0]?.id || "");
    }

    clearFormErrors() {
      this.root.querySelectorAll("[data-te-error]").forEach((element) => {
        element.textContent = "";
      });
    }

    setFormError(field, message) {
      const target = this.root.querySelector(`[data-te-error="${field}"]`);
      if (target) target.textContent = message;
    }

    saveSnippet(event) {
      event.preventDefault();
      this.clearFormErrors();
      const id = this.root.querySelector("#te-form-id").value;
      const tipo = this.root.querySelector('input[name="te-type"]:checked')?.value || "atendimento";
      const nome = this.root.querySelector("#te-form-name").value.trim();
      const atalho = this.normalizeShortcut(this.root.querySelector("#te-form-shortcut").value);
      const triggerKey = this.root.querySelector("#te-form-trigger").value;
      const categoriaId = this.root.querySelector("#te-form-category").value;
      const category = this.getCategoryById(categoriaId) || this.resolveCategory(null, "Outros", tipo);
      const conteudo = this.root.querySelector("#te-form-content").value.trim();
      const favorito = this.root.querySelector("#te-form-favorite").checked;
      let valid = true;
      if (!nome) { this.setFormError("name", "Informe um nome para o modelo."); valid = false; }
      if (!conteudo) { this.setFormError("content", "Informe o conteúdo que será inserido."); valid = false; }
      const duplicate = this.snippets.find((item) => item.id !== id && item.atalho === atalho);
      if (duplicate) { this.setFormError("shortcut", `Esse atalho já pertence ao modelo “${duplicate.nome}”.`); valid = false; }
      if (!valid) return;
      const existingIndex = id ? this.snippets.findIndex((item) => item.id === id) : -1;
      const base = existingIndex >= 0 ? this.snippets[existingIndex] : {};
      const snippet = this.normalizeSnippet({ ...base, id: existingIndex >= 0 ? id : this.generateId(tipo), tipo, nome, atalho, triggerKey, categoriaId: category.id, categoria: category.nome, conteudo, favorito, ativo: true, origem: existingIndex >= 0 ? base.origem : "Criado pelo usuário" });
      if (existingIndex >= 0) this.snippets.splice(existingIndex, 1, snippet); else this.snippets.unshift(snippet);
      this.saveSnippets();
      this.activeType = tipo; this.activeCategory = "Todos"; this.selectedId = snippet.id;
      this.closeModal(); this.render();
      this.showToast(existingIndex >= 0 ? "Modelo atualizado com sucesso." : "Modelo criado com sucesso.", "success");
    }


    openCategoryModal(category = null, forcedType = null, returnToSnippet = false) {
      const type = category?.tipo || forcedType || (this.activeType === "protocolo" ? "protocolo" : "atendimento");
      this.editingCategoryId = category?.id || null;
      this.categoryModal.dataset.returnToSnippet = returnToSnippet ? "true" : "false";
      this.root.querySelector("#te-category-modal-kicker").textContent = category ? "Personalizar categoria" : "Nova categoria";
      this.root.querySelector("#te-category-modal-title").textContent = category ? "Editar categoria" : "Criar categoria";
      this.root.querySelector("#te-category-form-id").value = category?.id || "";
      this.root.querySelector("#te-category-form-name").value = category?.nome || "";
      this.root.querySelector("#te-category-form-icon").value = category?.icone || "folder";
      this.root.querySelector("#te-category-form-color").value = category?.cor || CATEGORY_COLOR_OPTIONS[0];
      this.root.querySelectorAll('input[name="te-category-type"]').forEach((input) => {
        input.checked = input.value === type;
        input.disabled = Boolean(category && this.getCategoryUsage(category.id) > 0);
      });
      const usage = category ? this.getCategoryUsage(category.id) : 0;
      this.root.querySelector("#te-category-usage").textContent = category ? `${usage} modelo(s) usando esta categoria.` : "A categoria será salva no navegador.";
      this.root.querySelector("#te-category-delete-button").classList.toggle("te-hidden", !category);
      this.root.querySelector("#te-category-move-left").classList.toggle("te-hidden", !category);
      this.root.querySelector("#te-category-move-right").classList.toggle("te-hidden", !category);
      this.renderCategoryChoices();
      this.updateCategoryPreview();
      this.categoryModal.classList.remove("te-hidden");
      window.setTimeout(() => this.root.querySelector("#te-category-form-name").focus(), 30);
    }

    closeCategoryModal() {
      this.categoryModal.classList.add("te-hidden");
      this.editingCategoryId = null;
    }

    renderCategoryChoices() {
      const selectedIcon = this.root.querySelector("#te-category-form-icon").value || "folder";
      const selectedColor = this.root.querySelector("#te-category-form-color").value || CATEGORY_COLOR_OPTIONS[0];
      this.categoryIconGrid.innerHTML = CATEGORY_ICON_OPTIONS.map((name) => `<button type="button" class="te-icon-choice ${name === selectedIcon ? "te-active" : ""}" data-te-action="category-icon" data-te-icon-name="${this.escapeAttr(name)}" title="${this.escapeAttr(name)}">${this.icon(name)}</button>`).join("");
      this.categoryColorGrid.innerHTML = CATEGORY_COLOR_OPTIONS.map((color) => `<button type="button" class="te-color-choice ${color.toLowerCase() === selectedColor.toLowerCase() ? "te-active" : ""}" data-te-action="category-color" data-te-color="${this.escapeAttr(color)}" style="--te-choice-color:${this.escapeAttr(color)}" title="${this.escapeAttr(color)}"><span></span></button>`).join("");
    }

    selectCategoryIcon(name) {
      if (!CATEGORY_ICON_OPTIONS.includes(name)) return;
      this.root.querySelector("#te-category-form-icon").value = name;
      this.renderCategoryChoices();
      this.updateCategoryPreview();
    }

    selectCategoryColor(color) {
      if (!/^#[0-9a-f]{6}$/i.test(String(color || ""))) return;
      this.root.querySelector("#te-category-form-color").value = color;
      this.renderCategoryChoices();
      this.updateCategoryPreview();
    }

    updateCategoryPreview() {
      const name = this.root.querySelector("#te-category-form-name").value.trim() || "Nome da categoria";
      const icon = this.root.querySelector("#te-category-form-icon").value || "folder";
      const color = this.root.querySelector("#te-category-form-color").value || CATEGORY_COLOR_OPTIONS[0];
      const preview = this.root.querySelector("#te-category-preview");
      preview.style.setProperty("--te-category-color", color);
      preview.innerHTML = `${this.icon(icon)}<span>${this.escapeHtml(name)}</span><span class="te-category-count">0</span>`;
    }

    saveCategory(event) {
      event.preventDefault();
      const id = this.root.querySelector("#te-category-form-id").value;
      const existing = id ? this.getCategoryById(id) : null;
      const tipo = existing?.tipo || this.root.querySelector('input[name="te-category-type"]:checked')?.value || "atendimento";
      const nome = this.root.querySelector("#te-category-form-name").value.trim();
      const icone = this.root.querySelector("#te-category-form-icon").value;
      const cor = this.root.querySelector("#te-category-form-color").value;
      const error = this.root.querySelector("#te-category-name-error");
      error.textContent = "";
      if (!nome) { error.textContent = "Informe o nome da categoria."; return; }
      const duplicate = this.categories.find((item) => item.id !== id && item.tipo === tipo && this.normalizeSearchText(item.nome) === this.normalizeSearchText(nome));
      if (duplicate) { error.textContent = "Já existe uma categoria com esse nome neste tipo."; return; }
      let category;
      if (existing) {
        existing.nome = nome; existing.icone = CATEGORY_ICON_OPTIONS.includes(icone) ? icone : "folder"; existing.cor = cor;
        category = existing;
      } else {
        const maxOrder = Math.max(0, ...this.categories.filter((item) => item.tipo === tipo).map((item) => item.ordem));
        category = this.normalizeCategory({ id: this.generateCategoryId(tipo, nome), tipo, nome, icone, cor, ordem: maxOrder + 10, padrao: false });
        this.categories.push(category);
      }
      this.snippets.forEach((snippet) => { if (snippet.categoriaId === category.id) snippet.categoria = category.nome; });
      this.saveCategories(); this.saveSnippets();
      const returnToSnippet = this.categoryModal.dataset.returnToSnippet === "true";
      this.closeCategoryModal();
      if (returnToSnippet && !this.snippetModal.classList.contains("te-hidden")) this.updateCategoryOptions(tipo, category.id);
      this.activeType = tipo; this.activeCategory = category.id; this.render();
      this.showToast(existing ? "Categoria atualizada." : "Categoria criada.", "success");
    }

    getCategoryUsage(categoryId) {
      return this.snippets.filter((item) => item.categoriaId === categoryId).length;
    }

    deleteCategory(id) {
      const category = this.getCategoryById(id);
      if (!category) return;
      const usage = this.getCategoryUsage(id);
      const message = usage ? `Excluir “${category.nome}”? ${usage} modelo(s) serão movidos para “Outros”.` : `Excluir a categoria “${category.nome}”?`;
      if (!window.confirm(message)) return;
      let fallback = this.categories.find((item) => item.tipo === category.tipo && item.id !== id && this.normalizeSearchText(item.nome) === "outros");
      if (!fallback) fallback = this.categories.find((item) => item.tipo === category.tipo && item.id !== id);
      if (!fallback) {
        fallback = this.normalizeCategory({ tipo: category.tipo, nome: "Outros", icone: "folder", cor: "#64748b", ordem: 999 });
        this.categories.push(fallback);
      }
      this.snippets.forEach((snippet) => { if (snippet.categoriaId === id) { snippet.categoriaId = fallback.id; snippet.categoria = fallback.nome; } });
      this.categories = this.categories.filter((item) => item.id !== id);
      if (this.activeCategory === id) this.activeCategory = "Todos";
      this.saveCategories(); this.saveSnippets(); this.closeCategoryModal(); this.render();
      this.showToast("Categoria excluída e modelos reorganizados.", "success");
    }

    moveCategory(id, direction) {
      const category = this.getCategoryById(id);
      if (!category) return;
      const list = this.getCategoriesForType(category.tipo);
      const index = list.findIndex((item) => item.id === id);
      const targetIndex = index + direction;
      if (index < 0 || targetIndex < 0 || targetIndex >= list.length) return;
      const target = list[targetIndex];
      const temp = category.ordem; category.ordem = target.ordem; target.ordem = temp;
      this.saveCategories(); this.renderCategories();
      this.showToast(direction < 0 ? "Categoria movida para a esquerda." : "Categoria movida para a direita.", "success");
    }

    editSnippet(id) {
      const snippet = this.snippets.find((item) => item.id === id);
      if (snippet) this.openModal(snippet);
    }

    deleteSnippet(id) {
      const snippet = this.snippets.find((item) => item.id === id);
      if (!snippet) return;
      if (this.settings.confirmBeforeDelete && !window.confirm(`Excluir o modelo “${snippet.nome}”?`)) return;
      this.snippets = this.snippets.filter((item) => item.id !== id);
      if (this.selectedId === id) this.selectedId = null;
      this.saveSnippets();
      this.render();
      this.showToast("Modelo excluído.", "success");
    }

    toggleFavorite(id) {
      const snippet = this.snippets.find((item) => item.id === id);
      if (!snippet) return;
      snippet.favorito = !snippet.favorito;
      this.saveSnippets();
      this.render();
      this.showToast(snippet.favorito ? "Adicionado aos favoritos." : "Removido dos favoritos.", "success");
    }

    getAvailableSuggestedShortcut() {
      const name = this.root.querySelector("#te-form-name").value;
      return this.makeUniqueShortcut(this.suggestShortcutFromName(name), null, this.editingId);
    }

    applySuggestedShortcut() {
      const shortcut = this.getAvailableSuggestedShortcut();
      this.root.querySelector("#te-form-shortcut").value = shortcut;
      this.validateShortcutField();
    }

    validateShortcutField() {
      const field = this.root.querySelector("#te-form-shortcut");
      const shortcut = this.normalizeShortcut(field.value);
      field.value = shortcut;
      const duplicate = this.snippets.find((item) => item.id !== this.editingId && item.atalho === shortcut);
      this.setFormError("shortcut", duplicate ? `Esse atalho já pertence ao modelo “${duplicate.nome}”.` : "");
      return !duplicate;
    }

    extractVariables(content) {
      const variables = [];
      const regex = /\[([^\[\]\n]{1,80})\]/g;
      let match;
      while ((match = regex.exec(String(content || ""))) !== null) {
        const name = match[1].trim();
        if (name && !variables.includes(name)) variables.push(name);
      }
      return variables;
    }

    detectVariables(content) {
      const variables = this.extractVariables(content);
      const preview = this.root.querySelector("#te-variable-preview");
      preview.innerHTML = variables.length
        ? variables.map((variable) => `<span class="te-variable-tag">${this.escapeHtml(variable)}</span>`).join("")
        : '<span class="te-muted">Nenhuma variável encontrada.</span>';
      return variables;
    }

    async processVariables(content) {
      const variables = this.extractVariables(content);
      if (!variables.length) return content;
      const values = await this.requestVariableValues(variables);
      if (!values) return null;
      let result = content;
      for (const variable of variables) {
        const pattern = new RegExp(`\\[${this.escapeRegExp(variable)}\\]`, "g");
        result = result.replace(pattern, values[variable] ?? "");
      }
      return result;
    }

    requestVariableValues(variables) {
      if (this.variableResolver) this.finishVariablePrompt(null);
      this.variableFields.innerHTML = variables.map((variable, index) => `
        <label>
          <span>${this.escapeHtml(variable)}</span>
          <input type="text" name="te-variable-${index}" data-te-variable-name="${this.escapeAttr(variable)}" autocomplete="off" placeholder="Informe ${this.escapeAttr(variable)}">
        </label>
      `).join("");
      this.variableModal.classList.remove("te-hidden");
      window.setTimeout(() => {
        const first = this.variableFields.querySelector("input");
        if (first) first.focus();
      }, 30);
      return new Promise((resolve) => {
        this.variableResolver = resolve;
      });
    }

    submitVariables(event) {
      event.preventDefault();
      const values = {};
      this.variableFields.querySelectorAll("[data-te-variable-name]").forEach((input) => {
        values[input.dataset.teVariableName] = input.value;
      });
      this.finishVariablePrompt(values);
    }

    finishVariablePrompt(result) {
      if (!this.variableResolver) {
        this.variableModal.classList.add("te-hidden");
        return;
      }
      const resolve = this.variableResolver;
      this.variableResolver = null;
      this.variableModal.classList.add("te-hidden");
      this.variableFields.innerHTML = "";
      resolve(result);
    }

    async insertSnippet(id) {
      const snippet = this.snippets.find((item) => item.id === id);
      if (!snippet) return;
      const context = this.captureInsertionContext(this.lastActiveElement, 0);
      const content = await this.processVariables(snippet.conteudo);
      if (content === null) {
        this.showToast("Inserção cancelada.");
        return;
      }

      if (context && this.applyInsertionContext(context, content)) {
        this.showToast("Texto inserido no campo ativo.", "success");
      } else {
        await this.copyText(content);
        this.showToast("Nenhum campo ativo. O texto foi copiado.", "success");
      }

      if (!this.settings.keepOpenAfterInsert) this.toggleMinimize(true);
    }

    async copySnippet(id) {
      const snippet = this.snippets.find((item) => item.id === id);
      if (!snippet) return;
      const content = await this.processVariables(snippet.conteudo);
      if (content === null) return;
      await this.copyText(content);
      this.showToast("Texto copiado para a área de transferência.", "success");
    }

    async copyText(text) {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          return true;
        }
      } catch (error) {
        // Usa o fallback abaixo.
      }
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.style.pointerEvents = "none";
      document.body.appendChild(textarea);
      textarea.select();
      let success = false;
      try {
        success = document.execCommand("copy");
      } catch (error) {
        success = false;
      }
      textarea.remove();
      if (!success) throw new Error("Falha ao copiar");
      return true;
    }

    onGlobalFocusIn(event) {
      const editable = this.getEditableRoot(event.target);
      if (!editable || this.root.contains(editable)) return;
      this.lastActiveElement = editable;
      this.captureContentEditableRange(editable);
    }

    onSelectionChange() {
      const active = document.activeElement;
      const editable = this.getEditableRoot(active);
      if (editable && !this.root.contains(editable)) {
        this.lastActiveElement = editable;
        this.captureContentEditableRange(editable);
      }
    }

    getEditableRoot(target) {
      if (!target || target === document.body || target === document.documentElement) return null;
      if (target instanceof HTMLTextAreaElement) {
        return !target.disabled && !target.readOnly ? target : null;
      }
      if (target instanceof HTMLInputElement) {
        const allowed = ["text", "search", "email", "tel", "url", ""];
        return allowed.includes((target.type || "text").toLowerCase()) && !target.disabled && !target.readOnly ? target : null;
      }
      if (target.nodeType === Node.ELEMENT_NODE) {
        const editable = target.closest('[contenteditable="true"], [contenteditable="plaintext-only"], [role="textbox"]');
        if (editable && (editable.isContentEditable || editable.getAttribute("role") === "textbox")) return editable;
      }
      return null;
    }

    captureContentEditableRange(element) {
      if (!element || (!element.isContentEditable && element.getAttribute("role") !== "textbox")) return;
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;
      const range = selection.getRangeAt(0);
      if (element.contains(range.commonAncestorContainer)) {
        this.contentEditableRanges.set(element, range.cloneRange());
      }
    }

    captureInsertionContext(element, shortcutLength = 0) {
      if (!element || !element.isConnected || !this.getEditableRoot(element)) return null;
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        const start = typeof element.selectionStart === "number" ? element.selectionStart : element.value.length;
        const end = typeof element.selectionEnd === "number" ? element.selectionEnd : start;
        return {
          kind: "input",
          element,
          start: shortcutLength ? Math.max(0, start - shortcutLength) : start,
          end
        };
      }

      const range = this.getCurrentOrStoredRange(element);
      if (!range) return null;
      return {
        kind: "contenteditable",
        element,
        range: range.cloneRange(),
        shortcutLength
      };
    }

    getCurrentOrStoredRange(element) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount) {
        const current = selection.getRangeAt(0);
        if (element.contains(current.commonAncestorContainer)) return current;
      }
      const stored = this.contentEditableRanges.get(element);
      return stored ? stored.cloneRange() : null;
    }

    applyInsertionContext(context, content) {
      const element = context && context.element;
      if (!element || !element.isConnected) return false;
      if (context.kind === "input") return this.insertIntoInput(element, content, context.start, context.end);
      if (context.kind === "contenteditable") return this.insertIntoContentEditable(element, content, context.range, context.shortcutLength);
      return false;
    }

    insertIntoInput(element, content, start, end) {
      try {
        const value = element.value || "";
        const next = value.slice(0, start) + content + value.slice(end);
        const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");
        if (descriptor && descriptor.set) descriptor.set.call(element, next);
        else element.value = next;
        const caret = start + content.length;
        element.focus({ preventScroll: true });
        if (typeof element.setSelectionRange === "function") element.setSelectionRange(caret, caret);
        this.dispatchInputEvents(element, content);
        this.lastActiveElement = element;
        return true;
      } catch (error) {
        return false;
      }
    }

    insertIntoContentEditable(element, content, savedRange, shortcutLength = 0) {
      try {
        element.focus({ preventScroll: true });
        const selection = window.getSelection();
        selection.removeAllRanges();
        const range = savedRange.cloneRange();
        selection.addRange(range);

        if (shortcutLength > 0) {
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
          if (typeof selection.modify === "function") {
            for (let index = 0; index < shortcutLength; index += 1) {
              selection.modify("extend", "backward", "character");
            }
          } else if (range.endContainer.nodeType === Node.TEXT_NODE && range.endOffset >= shortcutLength) {
            range.setStart(range.endContainer, range.endOffset - shortcutLength);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }

        const activeRange = selection.rangeCount ? selection.getRangeAt(0) : range;
        activeRange.deleteContents();
        const textNode = document.createTextNode(content);
        activeRange.insertNode(textNode);
        activeRange.setStartAfter(textNode);
        activeRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(activeRange);
        this.contentEditableRanges.set(element, activeRange.cloneRange());
        this.dispatchInputEvents(element, content);
        this.lastActiveElement = element;
        return true;
      } catch (error) {
        return false;
      }
    }

    dispatchInputEvents(element, content) {
      try {
        element.dispatchEvent(new InputEvent("input", {
          bubbles: true,
          composed: true,
          inputType: "insertText",
          data: content
        }));
      } catch (error) {
        element.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
      }
      element.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    }

    onGlobalKeyDown(event) {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        this.openApp();
        return;
      }

      if (event.key === "Escape") {
        if (!this.variableModal.classList.contains("te-hidden")) {
          event.preventDefault();
          this.finishVariablePrompt(null);
        } else if (!this.snippetModal.classList.contains("te-hidden")) {
          event.preventDefault();
          this.closeModal();
        } else if (!this.settingsModal.classList.contains("te-hidden")) {
          event.preventDefault();
          this.closeSettings();
        }
        return;
      }

      if (!this.settings.autoExpand || event.defaultPrevented || event.isComposing || event.ctrlKey || event.altKey || event.metaKey) return;
      const triggerKey = this.getTriggerKey(event);
      if (!triggerKey) return;
      const editable = this.getEditableRoot(event.target);
      if (!editable || this.root.contains(editable)) return;
      const match = this.findShortcutBeforeCaret(editable, triggerKey);
      if (!match) return;

      event.preventDefault();
      this.lastActiveElement = editable;
      const context = this.captureInsertionContext(editable, match.shortcut.length);
      void this.expandShortcut(match.snippet, context);
    }

    getTriggerKey(event) {
      if (event.key === " " || event.key === "Spacebar") return "space";
      if (event.key === "Tab") return "tab";
      if (event.key === "Enter") return "enter";
      return null;
    }

    findShortcutBeforeCaret(element, triggerKey) {
      let before = "";
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        const caret = typeof element.selectionStart === "number" ? element.selectionStart : element.value.length;
        if (element.selectionStart !== element.selectionEnd) return null;
        before = element.value.slice(0, caret);
      } else {
        const range = this.getCurrentOrStoredRange(element);
        if (!range || !range.collapsed) return null;
        const prefix = range.cloneRange();
        prefix.selectNodeContents(element);
        prefix.setEnd(range.endContainer, range.endOffset);
        before = prefix.toString();
      }

      const match = before.match(/(?:^|\s)(\/[^\s]+)$/);
      if (!match) return null;
      const shortcut = match[1].toLowerCase();
      const snippet = this.shortcutMap.get(shortcut);
      if (!snippet || snippet.triggerKey !== triggerKey) return null;
      return { shortcut, snippet };
    }

    async expandShortcut(snippet, context) {
      if (!context) return;
      const content = await this.processVariables(snippet.conteudo);
      if (content === null) return;
      if (this.applyInsertionContext(context, content)) {
        this.showToast(`Atalho ${snippet.atalho} expandido.`, "success");
      } else {
        await this.copyText(content);
        this.showToast("Não foi possível inserir; o texto foi copiado.", "error");
      }
    }

    importSnippets() {
      this.importInput.value = "";
      this.importInput.click();
    }

    async handleImportFile(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      if (file.size > 8 * 1024 * 1024) { this.showToast("O arquivo excede o limite de 8 MB.", "error"); return; }
      try {
        const parsed = JSON.parse(await file.text());
        const source = Array.isArray(parsed) ? parsed : parsed && Array.isArray(parsed.snippets) ? parsed.snippets : null;
        if (!source) throw new Error("O JSON não contém uma lista de modelos.");
        if (parsed && Array.isArray(parsed.categories)) {
          for (const rawCategory of parsed.categories) {
            const candidate = this.normalizeCategory(rawCategory);
            const existing = this.findCategoryByName(candidate.nome, candidate.tipo);
            if (!existing) { candidate.id = this.generateCategoryId(candidate.tipo, candidate.nome); this.categories.push(candidate); }
          }
          this.saveCategories();
        }
        const usedIds = new Set(this.snippets.map((item) => item.id));
        const usedShortcuts = new Set(this.snippets.map((item) => item.atalho));
        const signatures = new Set(this.snippets.map((item) => this.snippetSignature(item)));
        let imported = 0, skipped = 0, renamed = 0;
        for (const raw of source) {
          const item = this.normalizeSnippet(raw);
          if (!item.nome || !item.conteudo) { skipped += 1; continue; }
          const signature = this.snippetSignature(item);
          if (signatures.has(signature)) { skipped += 1; continue; }
          if (usedIds.has(item.id)) item.id = this.generateId(item.tipo);
          const originalShortcut = item.atalho;
          item.atalho = this.makeUniqueShortcut(item.atalho, usedShortcuts);
          if (item.atalho !== originalShortcut) renamed += 1;
          usedIds.add(item.id); usedShortcuts.add(item.atalho); signatures.add(signature); this.snippets.push(item); imported += 1;
        }
        this.saveSnippets(); this.activeCategory = "Todos"; this.render();
        this.showToast(`${imported} modelo(s) importado(s). ${skipped} ignorado(s)${renamed ? ` e ${renamed} atalho(s) renomeado(s)` : ""}.`, "success", 5500);
      } catch (error) { this.showToast(`Não foi possível importar: ${error.message}`, "error", 5500); }
      finally { event.target.value = ""; }
    }

    snippetSignature(item) {
      return this.normalizeSearchText(`${item.tipo}|${item.nome}|${item.conteudo}`).replace(/\s+/g, " ").trim();
    }

    exportSnippets() {
      const payload = { app: "Text Express", schemaVersion: 3, appVersion: APP_VERSION, exportedAt: new Date().toISOString(), total: this.snippets.length, categories: this.categories, snippets: this.snippets };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
      const url = URL.createObjectURL(blob); const link = document.createElement("a"); const date = new Date().toISOString().slice(0, 10);
      link.href = url; link.download = `text-express-backup-${date}.json`; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
      this.showToast("Backup completo exportado com categorias e modelos.", "success");
    }

    resetSnippets() {
      const confirmed = window.confirm("Restaurar os modelos e categorias padrão? Os itens personalizados serão apagados. Exporte um backup antes, caso necessário.");
      if (!confirmed) return;
      this.categories = this.getDefaultCategories();
      this.snippets = this.getDefaultSnippets();
      this.activeType = "atendimento"; this.activeCategory = "Todos"; this.selectedId = null; this.searchInput.value = "";
      this.saveCategories(); this.saveSnippets(); this.render();
      this.showToast("Modelos e categorias padrão restaurados.", "success");
    }

    openSettings() {
      this.root.querySelector("#te-setting-auto-expand").checked = this.settings.autoExpand;
      this.root.querySelector("#te-setting-keep-open").checked = this.settings.keepOpenAfterInsert;
      this.root.querySelector("#te-setting-confirm-delete").checked = this.settings.confirmBeforeDelete;
      this.settingsModal.classList.remove("te-hidden");
    }

    closeSettings() {
      this.settingsModal.classList.add("te-hidden");
    }

    submitSettings(event) {
      event.preventDefault();
      this.settings = {
        autoExpand: this.root.querySelector("#te-setting-auto-expand").checked,
        keepOpenAfterInsert: this.root.querySelector("#te-setting-keep-open").checked,
        confirmBeforeDelete: this.root.querySelector("#te-setting-confirm-delete").checked
      };
      this.saveSettings();
      this.closeSettings();
      this.showToast("Configurações salvas.", "success");
    }

    toggleMinimize(forceMinimize = null) {
      const next = forceMinimize === null ? !this.panel.classList.contains("te-minimized") : Boolean(forceMinimize);
      this.panel.classList.toggle("te-minimized", next);
      const use = this.root.querySelector('[data-te-action="minimize"] use');
      if (use) use.setAttribute("href", next ? "#te-i-maximize-2" : "#te-i-minus");
      this.constrainPanel();
    }

    closeApp() {
      this.panel.classList.add("te-hidden");
      this.reopenButton.classList.remove("te-hidden");
      this.isClosed = true;
    }

    openApp() {
      this.panel.classList.remove("te-hidden");
      this.reopenButton.classList.add("te-hidden");
      this.isClosed = false;
      this.constrainPanel();
    }

    toggleApp() {
      if (this.panel.classList.contains("te-hidden")) this.openApp();
      else this.closeApp();
    }

    onDragStart(event) {
      if (event.button !== 0 || event.target.closest("button, input, select, textarea, a")) return;
      const rect = this.panel.getBoundingClientRect();
      this.dragState = {
        pointerId: event.pointerId,
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top
      };
      this.panel.style.left = `${rect.left}px`;
      this.panel.style.top = `${rect.top}px`;
      this.panel.style.right = "auto";
      this.panel.style.bottom = "auto";
      event.currentTarget.setPointerCapture?.(event.pointerId);
      document.addEventListener("pointermove", this.onDragMove, true);
      document.addEventListener("pointerup", this.onDragEnd, true);
      event.preventDefault();
    }

    onDragMove(event) {
      if (!this.dragState || event.pointerId !== this.dragState.pointerId) return;
      const rect = this.panel.getBoundingClientRect();
      const maxLeft = Math.max(8, window.innerWidth - rect.width - 8);
      const maxTop = Math.max(8, window.innerHeight - rect.height - 8);
      const left = Math.min(Math.max(8, event.clientX - this.dragState.offsetX), maxLeft);
      const top = Math.min(Math.max(8, event.clientY - this.dragState.offsetY), maxTop);
      this.panel.style.left = `${left}px`;
      this.panel.style.top = `${top}px`;
    }

    onDragEnd(event) {
      if (!this.dragState || event.pointerId !== this.dragState.pointerId) return;
      this.dragState = null;
      document.removeEventListener("pointermove", this.onDragMove, true);
      document.removeEventListener("pointerup", this.onDragEnd, true);
      const rect = this.panel.getBoundingClientRect();
      this.storageSet(STORAGE_KEYS.position, JSON.stringify({ left: Math.round(rect.left), top: Math.round(rect.top) }));
    }

    restorePosition() {
      const saved = this.storageGet(STORAGE_KEYS.position);
      if (!saved) return;
      try {
        const position = JSON.parse(saved);
        if (!Number.isFinite(position.left) || !Number.isFinite(position.top)) return;
        this.panel.style.left = `${position.left}px`;
        this.panel.style.top = `${position.top}px`;
        this.panel.style.right = "auto";
        this.panel.style.bottom = "auto";
        requestAnimationFrame(() => this.constrainPanel());
      } catch (error) {
        // Ignora posição inválida.
      }
    }

    constrainPanel() {
      if (this.panel.classList.contains("te-hidden")) return;
      const rect = this.panel.getBoundingClientRect();
      if (!this.panel.style.left && !this.panel.style.top) return;
      const left = Math.min(Math.max(8, rect.left), Math.max(8, window.innerWidth - rect.width - 8));
      const top = Math.min(Math.max(8, rect.top), Math.max(8, window.innerHeight - rect.height - 8));
      this.panel.style.left = `${left}px`;
      this.panel.style.top = `${top}px`;
      this.panel.style.right = "auto";
      this.panel.style.bottom = "auto";
    }

    showToast(message, type = "info", duration = 3000) {
      if (!this.toastStack) return;
      const toast = document.createElement("div");
      toast.className = `te-toast te-${type}`;
      const iconName = type === "success" ? "check-circle" : type === "error" ? "alert-triangle" : "info";
      toast.innerHTML = `${this.icon(iconName)}<span>${this.escapeHtml(message)}</span>`;
      this.toastStack.appendChild(toast);
      window.setTimeout(() => { toast.classList.add("te-leaving"); window.setTimeout(() => toast.remove(), 200); }, duration);
    }

    escapeHtml(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    escapeAttr(value) {
      return this.escapeHtml(value).replace(/`/g, "&#096;");
    }

    escapeRegExp(value) {
      return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  }

  function bootTextExpress() {
    const root = document.getElementById("text-express-app");
    if (!root) return;
    if (window.textExpressApp instanceof TextExpressApp) {
      window.textExpressApp.openApp();
      return;
    }
    const app = new TextExpressApp(root);
    window.TextExpressApp = TextExpressApp;
    window.textExpressApp = app;
    app.init();
  }

  window.TextExpressApp = TextExpressApp;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootTextExpress, { once: true });
  } else {
    bootTextExpress();
  }
})();
