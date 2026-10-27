const resumo = document.querySelector("#resumo");
const botaoTv = document.querySelector("#modo-tv");
const formOp = document.querySelector("#form-op");

const busca = document.querySelector("#busca");
const vazia = document.querySelector("#vazia");

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

  if (op.status !== "concluida") {
    const avancar = document.createElement("button");

    if (op.status === "aguardando") {
      avancar.textContent = "Iniciar produção";
    } else {
      avancar.textContent = "Concluir";
    }

    avancar.addEventListener("click", (event) => {
      if (op.status === "aguardando") {
        op.status = "producao";
      } else {
        op.status = "concluida";
      }
      desenhar();
    });
    item.append(avancar);
  }

  if (op.status === "aguardando") {
    const cancelar = document.createElement("button");
    cancelar.textContent = "Cancelar";

    cancelar.addEventListener("click", () => {
      if (confirm("Cancelar a OP-" + op.numero + "?")) {
        ordens = ordens.filter((o) => o !== op); // fica com todas, menos esta
        desenhar();
      }
    });

    item.append(cancelar);
  }

  return item;
};

botoes.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    filtros = event.target.dataset.filtro;
    botoes.forEach((b) => b.classList.remove("selecionado"));
    btn.classList.add("selecionado");
    desenhar();
  });
});

function desenhar() {
  aguardando = 0;
  concluido = 0;
  producao = 0;

  ordensSelecionadas =
    filtros === "todas"
      ? ordens
      : ordens.filter((ordem) => ordem.status === filtros);

  ordensSelecionadas.forEach((op) => {
    lista.append(createOp(op));
    if (op.status === "aguardando") {
      aguardando++;
    } else if (op.status === "concluida") {
      concluido++;
    } else if (op.status === "producao") {
      producao++;
    }

    let visiveis = ordens;
    if (filtros !== "todas") {
      visiveis = ordens.filter((op) => op.status === filtros);
    }
    const textoBusca = busca.value.trim().toLowerCase();
    visiveis = visiveis.filter((op) =>
      op.produto.toLowerCase().includes(textoBusca)
    );
    lista.textContent = "";
    visiveis.forEach((op) => {
      lista.append(createOp(op));
    });
    vazia.hidden = visiveis.length > 0;
    atualizarResumo(visiveis.length);
  });
}

function atualizarResumo() {
  aguardando = 0;
  producao = 0;
  concluido = 0;
  ordens.forEach((op) => {
    if (op.status === "aguardando") {
      aguardando++;
    } else if (op.status === "concluida") {
      concluido++;
    } else if (op.status === "producao") {
      producao++;
    }
  });
  resumo.textContent =
    ordens.length +
    " ordens no painel\n" +
    "Aguardando: " +
    aguardando +
    " · Em produção: " +
    producao +
    " · Concluídas: " +
    concluido;
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

busca.addEventListener("input", desenhar);

desenhar();

/* <img src="x" onerror="alert('invadido')"> com innerHTML:
      Adiciona um produto com uma imagem "vazia" e gera uma mensagem de erro no terminal do navegador
*/
