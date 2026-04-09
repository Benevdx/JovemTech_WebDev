// ═══════════════════════════════════════════════════════════════
// REFERÊNCIAS AOS ELEMENTOS DO HTML
// ═══════════════════════════════════════════════════════════════

// Telas
var telaLogin    = document.getElementById("telaLogin");
var telaCadastro = document.getElementById("telaCadastro");
var telaPerfil   = document.getElementById("telaPerfil");

// Campos — Login
var loginEmail = document.getElementById("loginEmail");
var loginSenha = document.getElementById("loginSenha");
var msgLogin   = document.getElementById("msgLogin");

// Campos — Cadastro
var cadNome       = document.getElementById("cadNome");
var cadEmail      = document.getElementById("cadEmail");
var cadSenha      = document.getElementById("cadSenha");
var cadCep        = document.getElementById("cadCep");
var cadLogradouro = document.getElementById("cadLogradouro");
var cadBairro     = document.getElementById("cadBairro");
var cadCidade     = document.getElementById("cadCidade");
var cadUf         = document.getElementById("cadUf");
var msgCadastro   = document.getElementById("msgCadastro");

// Campos — Perfil
var avatarInicial  = document.getElementById("avatarInicial");
var perfilNome     = document.getElementById("perfilNome");
var perfilEmail    = document.getElementById("perfilEmail");
var perfilCep      = document.getElementById("perfilCep");
var perfilLogradouro = document.getElementById("perfilLogradouro");
var perfilBairro   = document.getElementById("perfilBairro");
var perfilCidade   = document.getElementById("perfilCidade");
var perfilUf       = document.getElementById("perfilUf");


// ═══════════════════════════════════════════════════════════════
// UTILITÁRIOS
// ═══════════════════════════════════════════════════════════════

// Exibe uma mensagem de feedback num elemento <p>
// tipo pode ser "erro" ou "sucesso"
function mostrarMensagem(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = "mensagem " + tipo;
}

// ── Troca de telas ──────────────────────────────────────────────
// Esconde todas as telas e exibe apenas a pedida

function mostrarTela(tela) {
  // TODO: adicione a classe "oculto" nas três telas (telaLogin, telaCadastro, telaPerfil)
  // Dica: elemento.classList.add("oculto")
  telaLogin.classList.add("oculto");
  // ↓ complete as duas linhas abaixo




  // TODO: remova a classe "oculto" da tela que deve aparecer
  // Dica: elemento.classList.remove("oculto")

}

// ── Links de navegação entre telas ─────────────────────────────

document.getElementById("irParaCadastro").addEventListener("click", function() {
  // TODO: chame mostrarTela() passando a tela de cadastro

});

document.getElementById("irParaLogin").addEventListener("click", function() {
  // TODO: chame mostrarTela() passando a tela de login

});


// ═══════════════════════════════════════════════════════════════
// CRIPTOGRAFIA SIMPLES — apenas para curiosidade didática
// ═══════════════════════════════════════════════════════════════
//
// O que é isso?
// Em sistemas reais, senhas NUNCA são salvas como texto puro.
// Elas passam por um algoritmo chamado "hash" — uma função
// que transforma o texto em um código embaralhado que não
// pode ser revertido. Ex: "senha123" → "a665a45920..."
//
// Abaixo temos uma versão bem simples e ilustrativa.
// NÃO use isso em projetos reais — é só para entender o conceito.
//
// Como funciona essa versão?
// Ela pega cada letra da senha e soma um número (a "chave")
// ao código ASCII dela, deslocando o caractere.
// Ex: "a" com chave 3 vira "d", "b" vira "e", e assim por diante.
// É chamado de Cifra de César.
//
// Para ativar: substitua "guardarSenha(senha)" por "cifrarSenha(senha, 3)"
// nos dois lugares onde a senha é usada (cadastro e login).

function cifrarSenha(texto, chave) {
  var resultado = "";
  for (var i = 0; i < texto.length; i++) {
    var codigo = texto.charCodeAt(i);
    resultado += String.fromCharCode(codigo + chave);
  }
  return resultado;
}

// Por enquanto usamos essa função que não faz nada —
// apenas guarda a senha como texto mesmo (para fins didáticos)
function guardarSenha(senha) {
  return senha;
}


// ═══════════════════════════════════════════════════════════════
// BUSCAR CEP — API ViaCEP
// ═══════════════════════════════════════════════════════════════

document.getElementById("btnBuscarCep").addEventListener("click", function() {

  // TODO: pegue o valor do campo cadCep com .value e guarde numa variável chamada "cep"
  // Dica: use .trim() para remover espaços



  // TODO: valide se o cep tem exatamente 8 caracteres
  // Se não tiver, mostre uma mensagem de erro em msgCadastro e use "return" para parar
  // Dica: cep.length !== 8



  mostrarMensagem(msgCadastro, "Buscando CEP...", "");

  // TODO: faça um fetch para a URL abaixo, trocando CEP_AQUI pelo valor da variável cep
  // URL: "https://viacep.com.br/ws/" + cep + "/json/"
  // Encadeie .then() para converter a resposta com .json()
  // Encadeie outro .then() para usar os dados
  // Encadeie .catch() para tratar erro de conexão

  fetch(/* ← coloque a URL aqui */)
    .then(function(resposta) {
      // TODO: retorne resposta.json() para converter a resposta em objeto

    })
    .then(function(dados) {

      // TODO: verifique se dados.erro existe (CEP inválido)
      // Se existir, mostre mensagem de erro e use "return"



      // TODO: preencha os campos readonly com os dados da API:
      // cadLogradouro.value = dados.logradouro
      // cadBairro.value     = dados.bairro
      // cadCidade.value     = dados.localidade
      // cadUf.value         = dados.uf



      mostrarMensagem(msgCadastro, "Endereço encontrado!", "sucesso");
    })
    .catch(function() {
      mostrarMensagem(msgCadastro, "Erro de conexão. Verifique sua internet.", "erro");
    });
});


// ═══════════════════════════════════════════════════════════════
// CADASTRO — salvar usuário no localStorage
// ═══════════════════════════════════════════════════════════════

document.getElementById("btnCadastrar").addEventListener("click", function() {

  // Captura os valores dos campos
  var nome  = cadNome.value.trim();
  var email = cadEmail.value.trim();
  var senha = cadSenha.value;
  var cep   = cadCep.value.trim();

  // TODO: valide se os campos nome, email e senha estão preenchidos
  // Se algum estiver vazio (""), mostre mensagem de erro e use "return"



  // TODO: valide se o CEP foi buscado (verifique se cadLogradouro.value está vazio)
  // Se estiver, mostre: "Busque um CEP válido antes de continuar." e use "return"



  // TODO: verifique se já existe um usuário com esse email no localStorage
  // A chave que usamos é "usuario_" + email
  // Use localStorage.getItem("usuario_" + email) — se retornar algo, o email já existe
  // Mostre: "E-mail já cadastrado." e use "return"



  // Monta o objeto do usuário com todos os dados
  var usuario = {
    nome:        nome,
    email:       email,
    senha:       guardarSenha(senha),   // troque por cifrarSenha(senha, 3) para testar a criptografia
    cep:         cep,
    logradouro:  cadLogradouro.value,
    bairro:      cadBairro.value,
    cidade:      cadCidade.value,
    uf:          cadUf.value
  };

  // TODO: salve o objeto no localStorage usando JSON.stringify
  // Use a chave "usuario_" + email
  // Dica: localStorage.setItem(chave, JSON.stringify(usuario))



  mostrarMensagem(msgCadastro, "Conta criada! Faça login para entrar.", "sucesso");

  // Limpa o formulário após o cadastro
  cadNome.value  = "";
  cadEmail.value = "";
  cadSenha.value = "";
  cadCep.value   = "";
  cadLogradouro.value = "";
  cadBairro.value     = "";
  cadCidade.value     = "";
  cadUf.value         = "";
});


// ═══════════════════════════════════════════════════════════════
// LOGIN — verificar credenciais no localStorage
// ═══════════════════════════════════════════════════════════════

document.getElementById("btnEntrar").addEventListener("click", function() {

  var email = loginEmail.value.trim();
  var senha = loginSenha.value;

  // TODO: valide se os campos email e senha foram preenchidos
  // Se algum estiver vazio, mostre mensagem de erro e use "return"



  // TODO: busque o usuário no localStorage pela chave "usuario_" + email
  // Guarde o resultado numa variável chamada "dadosSalvos"



  // TODO: se dadosSalvos for null (usuário não encontrado),
  // mostre: "E-mail não cadastrado." e use "return"



  // TODO: converta dadosSalvos de texto para objeto usando JSON.parse
  // Guarde numa variável chamada "usuario"



  // TODO: compare a senha digitada com a senha salva no objeto
  // Use guardarSenha(senha) para tratar a senha digitada antes de comparar
  // (se você ativou cifrarSenha, use cifrarSenha(senha, 3) nos dois lugares)
  // Se as senhas forem diferentes, mostre: "Senha incorreta." e use "return"



  // ── Login bem-sucedido ──────────────────────────────────────
  // Preenche a tela de perfil com os dados do usuário

  // TODO: coloque a primeira letra do nome no avatarInicial
  // Dica: usuario.nome[0].toUpperCase()



  // TODO: preencha os campos de perfil com os dados do objeto usuario:
  // perfilNome.textContent       = usuario.nome
  // perfilEmail.textContent      = usuario.email
  // perfilCep.textContent        = usuario.cep
  // perfilLogradouro.textContent = usuario.logradouro
  // perfilBairro.textContent     = usuario.bairro
  // perfilCidade.textContent     = usuario.cidade
  // perfilUf.textContent         = usuario.uf



  // TODO: chame mostrarTela() passando a tela de perfil

});


// ═══════════════════════════════════════════════════════════════
// SAIR — voltar para a tela de login
// ═══════════════════════════════════════════════════════════════

document.getElementById("btnSair").addEventListener("click", function() {

  // Limpa os campos de login por segurança
  loginEmail.value = "";
  loginSenha.value = "";
  mostrarMensagem(msgLogin, "", "");

  // TODO: chame mostrarTela() passando a tela de login

});
