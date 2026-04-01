// Exibe mensagens simples no console
console.log("Olá, mundo!");
console.log("Olá do JS!");

// Operações básicas e tipos
console.log(2 + 3); // Soma → 5
console.log(typeof "texto"); // Verifica o tipo → "string"

// Declaração de variáveis
let nome = "Ana"; // variável mutável (pode mudar)
let idade = 25;
let ativo = true; // booleano (true/false)
const PI = 3.14; // constante (não pode mudar)

// Exibindo múltiplos valores
console.log(nome, idade, ativo);

// Template string (forma moderna de concatenar)
console.log(`O valor de PI é ${PI}`);

// Comparações
console.log(5 == "5"); // true → compara apenas valor (conversão implícita) ⚠️ perigoso
console.log(5 === "5"); // false → compara valor + tipo (mais seguro)

// Operador módulo (resto da divisão)
console.log(10 % 3); // 1

// Estrutura condicional
let temperatura = 28;

if (temperatura > 30) {
	console.log("Está quente!");
} else if (temperatura > 20) {
	console.log("Temperatura agradável.");
} else {
	console.log("Está frio!");
}

// Loop FOR → usado quando sabemos quantas vezes repetir
for (let i = 1; i <= 5; i++) {
	console.log("Volta número " + i);
}

// Loop WHILE → usado quando depende de condição
let contador = 0;
while (contador < 3) {
	console.log("Contando: " + contador);
	contador++; // incrementa para evitar loop infinito
}

// Função simples
function saudacao(nome) {
	return "Olá, " + nome + "! Bem-vindo ao JS.";
}

// Chamando a função
console.log(saudacao("Carlos"));
console.log(saudacao("Maria"));

// Alerta no navegador (não funciona no Node.js)
alert("Bem-vindo ao JavaScript!");

// Array (lista)
let frutas = ["maçã", "banana", "uva"];

// Acessando elementos
console.log(frutas[0]); // primeiro elemento → "maçã"
console.log(frutas.length); // tamanho do array → 3

// Métodos de array
frutas.push("manga"); // adiciona no final
frutas.pop(); // remove o último elemento

// Percorrendo array
for (let fruta of frutas) {
	console.log(fruta);
}

// Objeto (estrutura com chave-valor)
let aluno = {
	nome: "Lucas",
	idade: 20,
	cursos: ["HTML", "CSS", "JS"],
};

// Acessando propriedades do objeto
console.log(aluno.nome); // "Lucas"
console.log(aluno["idade"]); // 20 (forma alternativa)
console.log(aluno.cursos[0]); // "HTML"
