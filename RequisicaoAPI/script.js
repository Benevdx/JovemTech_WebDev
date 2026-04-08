// ─────────────────────────────────────────────
// REFERÊNCIAS AOS ELEMENTOS DO HTML
// ─────────────────────────────────────────────

// Cadastro
var inputNome       = document.getElementById("inputNome");
var inputId         = document.getElementById("inputId");
var inputCep        = document.getElementById("inputCep");
var inputLogradouro = document.getElementById("inputLogradouro");
var inputBairro     = document.getElementById("inputBairro");
var inputCidade     = document.getElementById("inputCidade");
var inputUf         = document.getElementById("inputUf");
var btnBuscarCep    = document.getElementById("btnBuscarCep");
var btnCadastrar    = document.getElementById("btnCadastrar");
var msgCadastro     = document.getElementById("msgCadastro");

// Consulta
var inputConsultaId    = document.getElementById("inputConsultaId");
var btnConsultar       = document.getElementById("btnConsultar");
var msgConsulta        = document.getElementById("msgConsulta");
var resultadoConsulta  = document.getElementById("resultadoConsulta");

// Campos do resultado
var rNome       = document.getElementById("rNome");
var rId         = document.getElementById("rId");
var rCep        = document.getElementById("rCep");
var rLogradouro = document.getElementById("rLogradouro");
var rBairro     = document.getElementById("rBairro");
var rCidade     = document.getElementById("rCidade");
var rUf         = document.getElementById("rUf");


// ─────────────────────────────────────────────
// FUNÇÃO: mostrar mensagem de feedback
// ─────────────────────────────────────────────

function mostrarMensagem(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = "mensagem " + tipo; // "erro" ou "sucesso"
}


// ─────────────────────────────────────────────
// BOTÃO: Buscar CEP na API do ViaCEP
// ─────────────────────────────────────────────

btnBuscarCep.addEventListener("click", function() {

  var cep = inputCep.value.trim();

  // Validação básica: CEP precisa ter 8 dígitos
  if (cep.length !== 8) {
    mostrarMensagem(msgCadastro, "CEP inválido. Digite 8 números sem traço.", "erro");
    return;
  }

  mostrarMensagem(msgCadastro, "Buscando CEP...", "");

  // Faz a requisição para a API do ViaCEP
  fetch("https://viacep.com.br/ws/" + cep + "/json/")
    .then(function(resposta) {
      return resposta.json();
    })
    .then(function(dados) {

      // ViaCEP retorna { erro: true } quando o CEP não existe
      if (dados.erro) {
        mostrarMensagem(msgCadastro, "CEP não encontrado.", "erro");
        limparCamposEndereco();
        return;
      }

      // Preenche os campos automaticamente com os dados da API
      inputLogradouro.value = dados.logradouro;
      inputBairro.value     = dados.bairro;
      inputCidade.value     = dados.localidade;
      inputUf.value         = dados.uf;

      mostrarMensagem(msgCadastro, "Endereço encontrado! Confira os campos.", "sucesso");
    })
    .catch(function() {
      mostrarMensagem(msgCadastro, "Erro de conexão. Verifique sua internet.", "erro");
    });
});


// ─────────────────────────────────────────────
// FUNÇÃO: limpar campos de endereço
// ─────────────────────────────────────────────

function limparCamposEndereco() {
  inputLogradouro.value = "";
  inputBairro.value     = "";
  inputCidade.value     = "";
  inputUf.value         = "";
}


// ─────────────────────────────────────────────
// BOTÃO: Cadastrar — salvar no localStorage
// ─────────────────────────────────────────────

btnCadastrar.addEventListener("click", function() {

  var nome = inputNome.value.trim();
  var id   = inputId.value.trim();
  var cep  = inputCep.value.trim();

  // Validações antes de salvar
  if (nome === "") {
    mostrarMensagem(msgCadastro, "Por favor, preencha o nome.", "erro");
    return;
  }

  if (id.length !== 3 || isNaN(id)) {
    mostrarMensagem(msgCadastro, "O ID precisa ter exatamente 3 dígitos numéricos.", "erro");
    return;
  }

  if (inputLogradouro.value === "") {
    mostrarMensagem(msgCadastro, "Busque um CEP válido antes de cadastrar.", "erro");
    return;
  }

  // Verifica se esse ID já está cadastrado
  var jaExiste = localStorage.getItem("usuario_" + id);
  if (jaExiste) {
    mostrarMensagem(msgCadastro, "Esse ID já está cadastrado. Escolha outro.", "erro");
    return;
  }

  // Monta o objeto com todos os dados do usuário
  var usuario = {
    nome:       nome,
    id:         id,
    cep:        cep,
    logradouro: inputLogradouro.value,
    bairro:     inputBairro.value,
    cidade:     inputCidade.value,
    uf:         inputUf.value
  };

  // Salva no localStorage usando o ID como chave
  // Chave: "usuario_042", "usuario_117", etc.
  localStorage.setItem("usuario_" + id, JSON.stringify(usuario));

  mostrarMensagem(msgCadastro, "Cadastro realizado com sucesso! ID: " + id, "sucesso");

  // Limpa o formulário após salvar
  inputNome.value = "";
  inputId.value   = "";
  inputCep.value  = "";
  limparCamposEndereco();
});


// ─────────────────────────────────────────────
// BOTÃO: Consultar cadastro por ID
// ─────────────────────────────────────────────

btnConsultar.addEventListener("click", function() {

  var id = inputConsultaId.value.trim();

  if (id.length !== 3) {
    mostrarMensagem(msgConsulta, "Digite um ID de 3 dígitos.", "erro");
    resultadoConsulta.style.display = "none";
    return;
  }

  // Busca no localStorage pela chave do ID
  var dadosSalvos = localStorage.getItem("usuario_" + id);

  

  if (!dadosSalvos) {
    mostrarMensagem(msgConsulta, "Nenhum cadastro encontrado para o ID " + id + ".", "erro");
    resultadoConsulta.style.display = "none";
    return;
  }

  // Converte o texto de volta para objeto
  var usuario = JSON.parse(dadosSalvos);

  // Preenche a tabela de resultado
  rNome.textContent       = usuario.nome;
  rId.textContent         = usuario.id;
  rCep.textContent        = usuario.cep;
  rLogradouro.textContent = usuario.logradouro;
  rBairro.textContent     = usuario.bairro;
  rCidade.textContent     = usuario.cidade;
  rUf.textContent         = usuario.uf;

  // Exibe o bloco de resultado
  resultadoConsulta.style.display = "block";
  mostrarMensagem(msgConsulta, "Cadastro encontrado!", "sucesso");
});
