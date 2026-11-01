// ===================================
// CADASTRO DAS PERGUNTAS DO NICOLAS
// ===================================

const perguntas = [

    {
        pergunta: "Qual é a cor favorita do Nicolas?",
        opcoes: ["Azul", "Vermelho", "Verde", "Amarelo"],
        resposta: "Vermelho"
    },

    {
        pergunta: "Qual é a comida favorita dele?",
        opcoes: ["Pizza", "Macarrão", "Lasanha", "Hambúrguer"],
        resposta: "Macarrão"
    },

    {
        pergunta: "Qual é o desenho favorito dele?",
        opcoes: ["Bob Esponja", "Pica-Pau", "Pantera Cor-de-Rosa", "Tom e Jerry"],
        resposta: "Pantera Cor-de-Rosa"
    },

    {
        pergunta: "Para qual time ele torce?",
        opcoes: ["Palmeiras", "Corinthians", "Flamengo", "São Paulo"],
        resposta: "Flamengo"
    },

    {
        pergunta: "Qual é a brincadeira favorita dele?",
        opcoes: ["Queimada", "Pega-pega", "Pique-esconde", "Amarelinha"],
        resposta: "Pique-esconde"
    },

    {
        pergunta: "Ele prefere doce ou salgado?",
        opcoes: ["Doce", "Salgado", "Os dois", "Nenhum"],
        resposta: "Salgado"
    },

    {
        pergunta: "Qual é a fruta favorita dele?",
        opcoes: ["Banana", "Maçã", "Uva", "Melancia"],
        resposta: "Maçã"
    },

    {
        pergunta: "Qual é o animal favorito dele?",
        opcoes: ["Cachorro", "Gato", "Jabuti", "Coelho"],
        resposta: "Jabuti"
    },

    {
        pergunta: "Qual é a matéria favorita dele?",
        opcoes: ["Português", "História", "Matemática", "Geografia"],
        resposta: "Matemática"
    },

    {
        pergunta: "Qual bebida ele mais gosta?",
        opcoes: ["Suco", "Água", "Refrigerante", "Leite"],
        resposta: "Refrigerante"
    },

    {
        pergunta: "Qual é o sabor de sorvete favorito dele?",
        opcoes: ["Morango", "Chocolate", "Baunilha", "Flocos"],
        resposta: "Chocolate"
    },

    {
        pergunta: "Ele prefere assistir a quê?",
        opcoes: ["Filmes", "Desenhos", "Novelas", "Documentários"],
        resposta: "Desenhos"
    }

];


// ===================================
// VARIÁVEIS
// ===================================

let jogador = "";

let perguntaAtual = 0;

let pontos = 0;

let respondeu = false;

let rodadaJabuti = 1;

let pontosJabuti = 0;

let localJabuti = 0;

let jabutiRespondido = false;

let cartasViradas = [];

let paresEncontrados = 0;

let pontosMemoria = 0;

let bloqueioMemoria = false;


// ===================================
// FUNÇÃO PARA TROCAR DE TELA
// ===================================

function mostrarTela(id) {

    document.querySelectorAll(".tela").forEach(tela => {

        tela.classList.add("escondida");

    });

    document.getElementById(id).classList.remove("escondida");

}


// ===================================
// INICIAR JOGO
// ===================================

function iniciarJogo() {

    jogador = document.getElementById("nomeJogador").value.trim();

    if (jogador === "") {

        alert("Digite seu nome para começar!");

        return;

    }

    perguntaAtual = 0;

    pontos = 0;

    mostrarTela("telaJogo");

    mostrarPergunta();

}


// ===================================
// MOSTRAR PERGUNTA
// ===================================

function mostrarPergunta() {

    respondeu = false;

    const atual = perguntas[perguntaAtual];

    document.getElementById("pergunta").textContent =
        atual.pergunta;

    document.getElementById("numeroPergunta").textContent =
        `Pergunta ${perguntaAtual + 1}/12`;

    document.getElementById("pontuacao").textContent =
        `⭐ ${pontos} pontos`;

    document.getElementById("barraProgresso").style.width =
        `${((perguntaAtual + 1) / perguntas.length) * 100}%`;

    document.getElementById("mensagem").textContent = "";

    document.getElementById("botaoProximo").classList.add("escondida");

    const area = document.getElementById("alternativas");

    area.innerHTML = "";

    atual.opcoes.forEach(opcao => {

        const botao = document.createElement("button");

        botao.textContent = opcao;

        botao.classList.add("alternativa");

        botao.addEventListener("click", () => {

            verificarResposta(opcao, botao);

        });

        area.appendChild(botao);

    });

}


// ===================================
// VERIFICAR RESPOSTA
// ===================================

function verificarResposta(opcao, botaoEscolhido) {

    if (respondeu) return;

    respondeu = true;

    const correta = perguntas[perguntaAtual].resposta;

    const botoes = document.querySelectorAll(".alternativa");

    botoes.forEach(botao => {

        botao.disabled = true;

        if (botao.textContent === correta) {

            botao.classList.add("correta");

        }

    });

    const mensagem = document.getElementById("mensagem");

    if (opcao === correta) {

        pontos += 10;

        mensagem.textContent = "🎉 ACERTOU! Muito bem!";

        mensagem.style.color = "#188038";

    } else {

        botaoEscolhido.classList.add("errada");

        mensagem.textContent =
            `😅 A resposta certa era: ${correta}`;

        mensagem.style.color = "#d93025";

    }

    document.getElementById("pontuacao").textContent =
        `⭐ ${pontos} pontos`;

    document.getElementById("botaoProximo").classList.remove("escondida");

    if (perguntaAtual === perguntas.length - 1) {

        document.getElementById("botaoProximo").textContent =
            "VER RESULTADO 🏆";

    } else {

        document.getElementById("botaoProximo").textContent =
            "PRÓXIMA PERGUNTA ➜";

    }

}


// ===================================
// PRÓXIMA PERGUNTA
// ===================================

function proximaPergunta() {

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        mostrarResultadoQuiz();

    }

}


// ===================================
// RESULTADO DAS PERGUNTAS
// ===================================

function mostrarResultadoQuiz() {

    mostrarTela("telaResultado");

    document.getElementById("nomeResultado").textContent =
        `Muito bem, ${jogador}!`;

    document.getElementById("pontosQuiz").textContent =
        pontos;

    let mensagem = "";

    if (pontos === 120) {

        mensagem = "🏆 Você conhece o Nicolas perfeitamente!";

    } else if (pontos >= 80) {

        mensagem = "🌟 Muito bem! Você conhece bastante o Nicolas!";

    } else if (pontos >= 50) {

        mensagem = "👏 Bom trabalho! Continue aprendendo sobre ele!";

    } else {

        mensagem = "💙 Vamos descobrir mais sobre o Nicolas!";

    }

    document.getElementById("mensagemQuiz").textContent =
        mensagem;

}


// ===================================
// INICIAR JOGO DO JABUTI
// ===================================

function iniciarJabuti() {

    rodadaJabuti = 1;

    pontosJabuti = 0;

    mostrarTela("telaJabuti");

    prepararJabuti();

}


// ===================================
// PREPARAR ESCONDERIJO
// ===================================

function prepararJabuti() {

    jabutiRespondido = false;

    localJabuti = Math.floor(Math.random() * 3);

    document.getElementById("rodadaJabuti").textContent =
        `Rodada ${rodadaJabuti} de 3`;

    document.getElementById("mensagemJabuti").textContent =
        "Escolha uma casinha!";

    document.getElementById("pontosJabuti").textContent =
        `⭐ ${pontosJabuti} pontos`;

    document.getElementById("proximaRodada").classList.add("escondida");

    const casas = document.querySelectorAll(".casinha");

    casas.forEach((casa, indice) => {

        casa.textContent = "🏠";

        casa.disabled = false;

        casa.onclick = () => verificarJabuti(indice);

    });

}


// ===================================
// ENCONTRAR O JABUTI
// ===================================

function verificarJabuti(escolha) {

    if (jabutiRespondido) return;

    jabutiRespondido = true;

    const casas = document.querySelectorAll(".casinha");

    casas.forEach((casa, indice) => {

        casa.disabled = true;

        if (indice === localJabuti) {

            casa.textContent = "🐢";

        } else {

            casa.textContent = "🌱";

        }

    });

    const mensagem = document.getElementById("mensagemJabuti");

    if (escolha === localJabuti) {

        pontosJabuti += 10;

        mensagem.textContent =
            "🎉 ENCONTROU! O jabuti estava aqui!";

        mensagem.style.color = "#188038";

    } else {

        mensagem.textContent =
            "😅 Ops! O jabuti estava em outra casinha!";

        mensagem.style.color = "#d93025";

    }

    document.getElementById("pontosJabuti").textContent =
        `⭐ ${pontosJabuti} pontos`;

    document.getElementById("proximaRodada").classList.remove("escondida");

    if (rodadaJabuti === 3) {

        document.getElementById("proximaRodada").textContent =
            "JOGAR DA MEMÓRIA 🧠";

    } else {

        document.getElementById("proximaRodada").textContent =
            "PRÓXIMA RODADA ➜";

    }

}


// ===================================
// PRÓXIMA RODADA DO JABUTI
// ===================================

function proximaRodadaJabuti() {

    rodadaJabuti++;

    if (rodadaJabuti <= 3) {

        prepararJabuti();

    } else {

        iniciarMemoria();

    }

}


// ===================================
// JOGO DA MEMÓRIA
// ===================================

function iniciarMemoria() {

    mostrarTela("telaMemoria");

    paresEncontrados = 0;

    pontosMemoria = 0;

    cartasViradas = [];

    bloqueioMemoria = false;

    document.getElementById("mensagemMemoria").textContent = "";

    document.getElementById("finalizarMemoria").classList.add("escondida");

    const figuras = [

        "🐢", "⚽", "🍎",

        "🍦", "🌸", "🐢",

        "⚽", "🍎", "🍦",

        "🌸", "🐱", "🐱"

    ];

    figuras.sort(() => Math.random() - 0.5);

    const tabuleiro = document.getElementById("tabuleiro");

    tabuleiro.innerHTML = "";

    figuras.forEach((figura, indice) => {

        const carta = document.createElement("button");

        carta.classList.add("carta");

        carta.textContent = "❓";

        carta.dataset.figura = figura;

        carta.dataset.indice = indice;

        carta.addEventListener("click", () => virarCarta(carta));

        tabuleiro.appendChild(carta);

    });

    atualizarMemoria();

}


// ===================================
// VIRAR CARTA
// ===================================

function virarCarta(carta) {

    if (bloqueioMemoria) return;

    if (carta.classList.contains("revelada")) return;

    if (carta.classList.contains("encontrada")) return;

    carta.textContent = carta.dataset.figura;

    carta.classList.add("revelada");

    cartasViradas.push(carta);

    if (cartasViradas.length === 2) {

        verificarPar();

    }

}


// ===================================
// VERIFICAR PAR
// ===================================

function verificarPar() {

    const [carta1, carta2] = cartasViradas;

    bloqueioMemoria = true;

    if (carta1.dataset.figura === carta2.dataset.figura) {

        carta1.classList.add("encontrada");

        carta2.classList.add("encontrada");

        carta1.disabled = true;

        carta2.disabled = true;

        paresEncontrados++;

        pontosMemoria += 5;

        cartasViradas = [];

        bloqueioMemoria = false;

        document.getElementById("mensagemMemoria").textContent =
            "🎉 Você encontrou um par!";

        atualizarMemoria();

        if (paresEncontrados === 6) {

            document.getElementById("mensagemMemoria").textContent =
                "🏆 PARABÉNS! Você encontrou todos os pares!";

            document.getElementById("finalizarMemoria").classList.remove("escondida");

        }

    } else {

        document.getElementById("mensagemMemoria").textContent =
            "😅 Não são iguais! Tente novamente.";

        setTimeout(() => {

            carta1.textContent = "❓";

            carta2.textContent = "❓";

            carta1.classList.remove("revelada");

            carta2.classList.remove("revelada");

            cartasViradas = [];

            bloqueioMemoria = false;

        }, 900);

    }

}


// ===================================
// ATUALIZAR PONTUAÇÃO DA MEMÓRIA
// ===================================

function atualizarMemoria() {

    document.getElementById("pontosMemoria").textContent =
        `⭐ Pares encontrados: ${paresEncontrados}/6`;

}


// ===================================
// RESULTADO FINAL
// ===================================

function mostrarFinal() {

    mostrarTela("telaFinal");

    const total = pontos + pontosJabuti + pontosMemoria;

    document.getElementById("nomeFinal").textContent =
        `Parabéns, ${jogador}!`;

    document.getElementById("pontosFinais").textContent =
        total;

    document.getElementById("detalhesFinal").textContent =
        `Perguntas: ${pontos}/120 | Jabuti: ${pontosJabuti}/30 | Memória: ${pontosMemoria}/30`;

    let mensagem = "";

    if (total === 180) {

        mensagem = "🏆 CAMPEÃO! Você arrasou em todos os desafios!";

    } else if (total >= 130) {

        mensagem = "🌟 INCRÍVEL! Você foi muito bem!";

    } else if (total >= 80) {

        mensagem = "👏 PARABÉNS! Você completou os desafios!";

    } else {

        mensagem = "💙 Não desista! Vamos jogar novamente!";

    }

    document.getElementById("mensagemFinal").textContent =
        mensagem;

}


// ===================================
// REINICIAR JOGO
// ===================================

function reiniciarJogo() {

    perguntaAtual = 0;

    pontos = 0;

    rodadaJabuti = 1;

    pontosJabuti = 0;

    pontosMemoria = 0;

    document.getElementById("nomeJogador").value = "";

    mostrarTela("telaInicial");

}