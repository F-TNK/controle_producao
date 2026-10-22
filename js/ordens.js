const resumo = document.querySelector("#resumo");
const botaoTv = document.querySelector("#modo-tv");
const formOp = document.querySelector("#form-op");

let aguardando = 0,
  concluido = 0,
  producao = 0;

const botoes = document.querySelectorAll(".filtro");
let filtros = "todas";

let ordens = [
  {
    numero: 101,
    produto: "Eixo de transmissão",
    quantidade: 200,
    maquina: "Torno CNC",
    status: "aguardando",
  },
  {
    numero: 102,
    produto: "Suporte de motor",
    quantidade: 500,
    maquina: "Prensa",
    status: "producao",
  },
  {
    numero: 103,
    produto: "Tampa plástica",
    quantidade: 1200,
    maquina: "Injetora",
    status: "concluida",
  },
  {
    numero: 104,
    produto: "Flange de aço",
    quantidade: 80,
    maquina: "Torno CNC",
    status: "aguardando",
  },
];

const NOMES = {
  aguardando: "Aguardando",
  producao: "Em produção",
  concluida: "Concluída",
};

botaoTv.addEventListener("click", () => {
  const body = document.querySelector("body");
  body.classList.toggle("modo-tv");
  botaoTv.textContent = body.classList.contains("modo-tv")
    ? "sair do modo TV"
    : "Modo TV";
});

const createOp = (op) => {
  const item = document.createElement("li"); // 1. cria (fora da tela)
  item.classList.add("op", "status-" + op.status);
  const titulo = document.createElement("h3");
  titulo.textContent = "OP-" + op.numero + " · " + op.produto; // 2. preenche
  item.append(titulo); // 3. monta o card
  lista.append(item); // 4. coloca na página
  return item;
};

botoes.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    filtros = event.target.dataset.filtro;
    botoes.forEach((b) => b.classList.remove("selecionado"));
    btn.classList.add("selecionado");
    console.log("aqui " + filtros);
    desenhar();
  });
});

function desenhar() {
  lista.textContent = "";
  aguardando = 0;
  concluido = 0;
  producao = 0;

  ordensSelecionadas =
    filtros === "todas"
      ? ordens
      : ordens.filter((ordem) => ordem.status === filtros);

  console.log(ordensSelecionadas);

  ordensSelecionadas.forEach((op) => {
    lista.append(createOp(op));
    if (op.status === "aguardando") {
      aguardando++;
    } else if (op.status === "concluida") {
      concluido++;
    } else if (op.status === "producao") {
      producao++;
    }

    const texto =
      ordens.length +
      " ordens no painel\n" +
      "Aguardando: " +
      aguardando +
      " - Em produção: " +
      producao +
      " - Concluido: " +
      concluido;

    resumo.textContent = texto;
  });
}

formOp.addEventListener("submit", (event) => {
  event.preventDefault();
  const produto = document.querySelector("#produto").value.trim();
  const qnt = Number(document.querySelector("#quantidade").value);
  const maquina = document.querySelector("#maquina");
  const mensagem = document.querySelector("#mensagem");

  if (produto === "" || qnt <= 0) {
    const texto = "Informe o produto e uma quantidade maior que zero";
    mensagem.hidden = false;
    mensagem.textContent = texto;
  } else {
    mensagem.hidden = true;
    mensagem.textContent = "";
    ordens.push({
      numero: ordens[ordens.length - 1].numero + 1,
      produto,
      quantidade: qnt,
      status: "aguardando",
      maquina: maquina.value,
    });
    desenhar();
  }
});

desenhar();
