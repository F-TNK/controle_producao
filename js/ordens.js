const ops = document.querySelectorAll(".op");
const resumo = document.querySelector("#resumo");
const botaoTv = document.querySelector("#modo-tv");
let aguardando = 0,
  concluido = 0,
  producao = 0;

let filtro = "todas";

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

const createOp = (op) => {
  const item = document.createElement("li"); // 1. cria (fora da tela)
  item.classList.add("op", "status-" + op.status);
  const titulo = document.createElement("h3");
  titulo.textContent = "OP-" + op.numero + " · " + op.produto; // 2. preenche
  item.append(titulo); // 3. monta o card
  lista.append(item); // 4. coloca na página
  return item;
};

const desenhar = () => {
  lista.textContent = "";
  aguardando = 0;
  concluido = 0;
  producao = 0;

  ordens.forEach((op) => {
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
};

ordens.length +
  " ordens no painel\n" +
  "Aguardando: " +
  botaoTv.addEventListener("click", () => {
    const body = document.querySelector("body");
    body.classList.toggle("modo-tv");
    botaoTv.textContent = body.classList.contains("modo-tv")
      ? "sair do modo TV"
      : "Modo TV";
  });

desenhar();
