/**
 * Portfólio pessoal — interações da página.
 *
 * Organização: cada seção reúne seus dados, funções e eventos.
 * Edite os arrays para atualizar o conteúdo, sem precisar alterar o HTML.
 */

/* ========================================
   01. TEMA
======================================== */

const botaoTema = document.querySelector("#botao-tema");
const html = document.documentElement;

// A preferência fica no navegador; ao recarregar, o tema escolhido é restaurado.

const temaSalvo = localStorage.getItem("tema");
if (temaSalvo === "claro") {
    html.classList.add("tema-claro");
}

/* 01.1 Atualização do botão */

function atualizarBotao() {
    const modoClaro = html.classList.contains("tema-claro");
    const icone = modoClaro
        ? `
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.802a6 6 0 0 0 8.27 8.27c.342-.215.824-.003.801.402" />
            </svg>
        `
        : `
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.42 1.42" />
                <path d="m17.65 17.65 1.42 1.42" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.35 17.65-1.42 1.42" />
                <path d="m19.07 4.93-1.42 1.42" />
            </svg>
        `;
    const texto = modoClaro ? "Modo escuro" : "Modo claro";

    // Os SVGs são fixos no código; não há conteúdo fornecido pelo visitante.
    botaoTema.innerHTML = `
        ${icone}
        <span>${texto}</span>
    `;
    botaoTema.setAttribute(
        "aria-label",
        modoClaro ? "Ativar modo escuro" : "Ativar modo claro"
    );
}

function alternarTema() {
    const modoClaro = html.classList.toggle("tema-claro");
    localStorage.setItem(
        "tema",
        modoClaro ? "claro" : "escuro"
    );
    atualizarBotao();
}

if (botaoTema) {
    atualizarBotao();
    botaoTema.addEventListener("click", alternarTema);
}


/* ========================================
   02. MENU RESPONSIVO
======================================== */

const botaoMenu = document.querySelector("#botao-menu");
const menuNavegacao = document.querySelector("#menu-navegacao");

// Centraliza o fechamento para cliques nos links, fora do cabeçalho e na tecla Esc.
function fecharMenu() {
    menuNavegacao.classList.remove("menu-aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute(
        "aria-label",
        "Abrir menu de navegação"
    );
}

function alternarMenu() {
    const aberto = botaoMenu.getAttribute("aria-expanded") === "true";

    // A classe controla a exibição via CSS; aria-expanded informa o estado ao leitor de tela.
    menuNavegacao.classList.toggle("menu-aberto", !aberto);
    botaoMenu.setAttribute("aria-expanded", String(!aberto));

    botaoMenu.setAttribute(
        "aria-label",
        aberto ? "Abrir menu de navegação" : "Fechar menu de navegação"
    );
}

/* 02.1 Eventos do menu */

if (botaoMenu && menuNavegacao) {
    botaoMenu.addEventListener("click", alternarMenu);

    menuNavegacao.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", fecharMenu);

    });

    document.addEventListener("click", (evento) => {
        if (!botaoMenu.closest("header").contains(evento.target)) {
            fecharMenu();
        }
    });

    document.addEventListener("keydown", (evento) => {

        if (
            evento.key === "Escape" &&
            menuNavegacao.classList.contains("menu-aberto")
        ) {
            fecharMenu();
            botaoMenu.focus();
        }
    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {
            fecharMenu();
        }
    });

    const marcaLink = document.querySelector(".marca-link");

    if (marcaLink) {
        marcaLink.addEventListener("click", fecharMenu);
    }
}


/* ========================================
   03. EXPERIÊNCIA PROFISSIONAL
======================================== */

// Para adicionar uma experiência, inclua um objeto neste array na posição desejada.
const experiencias = [
    {
        id: 1,
        cargo: "Desenvolvedor OutSystems",
        empresa: "Mirante Tecnologia S/A",
        periodo: "Abr/2025 — Ago/2026",
        atividades: [
            "Desenvolvimento, manutenção e evolução de aplicações corporativas utilizando OutSystems.",
            "Atuação no projeto Espaço Confinado da Petrobras, voltado à gestão e ao acompanhamento de processos operacionais."
        ]
    },
    {
        id: 2,
        cargo: "Estagiário — SSIC",
        empresa: "Gabinete de Segurança Institucional da Presidência da República (GSI/PR)",
        periodo: "Nov/2022 — Nov/2024",
        atividades: [
            "Reformulação, estruturação e manutenção do portal da Secretaria de Segurança da Informação e Cibernética (SSIC).",
            "Participação na elaboração e revisão da Taxonomia de Incidentes Cibernéticos.",
            "Apoio à organização de eventos e atividades institucionais."
        ]
    }
];

const listaExperiencias = document.querySelector(
    "#lista-experiencias"
);

/* 03.1 Construção da linha do tempo */

function criarCartaoExperiencia(experiencia) {
    const item = document.createElement("li");
    item.classList.add("experiencia-item");
    const card = document.createElement("article");
    card.classList.add("experiencia-card");

    const periodo = document.createElement("span");
    periodo.classList.add("experiencia-periodo");
    periodo.textContent = experiencia.periodo;

    const cargo = document.createElement("h3");
    cargo.textContent = experiencia.cargo;

    const empresa = document.createElement("p");
    empresa.classList.add("experiencia-empresa");
    empresa.textContent = experiencia.empresa;

    const atividades = document.createElement("ul");
    atividades.classList.add("experiencia-atividades");
    experiencia.atividades.forEach((atividade) => {

        const atividadeItem = document.createElement("li");
        atividadeItem.textContent = atividade;

        atividades.appendChild(atividadeItem);
    });

    card.append(periodo, cargo, empresa, atividades);
    item.appendChild(card);

    return item;
}

function exibirExperiencias() {

    const cartoes = experiencias.map(criarCartaoExperiencia);
    listaExperiencias.replaceChildren(...cartoes);
}

if (listaExperiencias) {
    exibirExperiencias();
}


/* ========================================
   04. PROJETOS
======================================== */

// Edite este array para atualizar os projetos apresentados no portfólio.
const projetos = [
    {
        titulo: "Portfólio Web",
        descricao: "Meu portfólio pessoal, desenvolvido para apresentar minhas habilidades e experiências profissionais.",
        tecnologias: ["HTML", "CSS", "JavaScript"]
    }
];

const listaProjetos = document.querySelector("#lista-projetos");
const filtrosProjetos = document.querySelector("#filtros-projetos");
const mensagemSemProjetos = document.querySelector("#sem-projetos");

// Set não permite repetição: um filtro só pode estar selecionado uma vez.
const tecnologiasSelecionadas = new Set();
let observadorAnimacoes = null;

/* 04.1 Filtragem e montagem dos cartões */

function filtrarProjetos(filtros) {

    // Os filtros são cumulativos: ao selecionar HTML e CSS, o projeto precisa ter ambos.
    return projetos.filter((projeto) =>
        [...filtros].every((tecnologia) =>
            projeto.tecnologias.includes(tecnologia)
        )
    );
}

function criarCartaoProjeto(projeto) {
    const card = document.createElement("article");
    card.classList.add("projeto-card");
    const titulo = document.createElement("h3");
    titulo.textContent = projeto.titulo;
    const descricao = document.createElement("p");
    descricao.textContent = projeto.descricao;
    const tecnologias = document.createElement("div");
    tecnologias.classList.add("tecnologias");
    projeto.tecnologias.forEach((tecnologia) => {

        const etiqueta = document.createElement("span");
        etiqueta.textContent = tecnologia;

        tecnologias.appendChild(etiqueta);
    });
    card.append(titulo, descricao, tecnologias);
    return card;
}

function exibirProjetos() {
    const projetosFiltrados = filtrarProjetos(
        tecnologiasSelecionadas
    );
    const cartoes = projetosFiltrados.map(criarCartaoProjeto);
    // Substitui os cartões anteriores sem acumular resultados a cada filtro.
    listaProjetos.replaceChildren(...cartoes);
    mensagemSemProjetos.hidden = projetosFiltrados.length > 0;
    if (observadorAnimacoes) {
        cartoes.forEach(observarElemento);
    }
}

/* 04.2 Botões de filtro */

function atualizarFiltros() {
    filtrosProjetos.querySelectorAll(".filtro-btn").forEach((botao) => {

        const tecnologia = botao.dataset.tecnologia;
        const ativo = tecnologia === "Todos"
            ? tecnologiasSelecionadas.size === 0
            : tecnologiasSelecionadas.has(tecnologia);
        botao.classList.toggle("ativo", ativo);
        botao.setAttribute("aria-pressed", String(ativo));
    });
}

function criarFiltros() {
    const tecnologias = projetos.flatMap(
        (projeto) => projeto.tecnologias
    );
    // Set elimina tecnologias repetidas e mantém a ordem da primeira ocorrência.
    const filtros = ["Todos", ...new Set(tecnologias)];
    filtros.forEach((tecnologia) => {

        const botao = document.createElement("button");

        botao.type = "button";
        botao.classList.add("filtro-btn");
        botao.textContent = tecnologia;
        botao.dataset.tecnologia = tecnologia;
        botao.addEventListener("click", () => {

            if (tecnologia === "Todos") {
                tecnologiasSelecionadas.clear();

            } else if (tecnologiasSelecionadas.has(tecnologia)) {
                tecnologiasSelecionadas.delete(tecnologia);

            } else {
                tecnologiasSelecionadas.add(tecnologia);
            }
            atualizarFiltros();
            exibirProjetos();
        });
        filtrosProjetos.appendChild(botao);
    });
    atualizarFiltros();
}

if (listaProjetos && filtrosProjetos && mensagemSemProjetos) {

    criarFiltros();
    exibirProjetos();
}


/* ========================================
   05. HABILIDADES
======================================== */

// Adicione ou remova habilidades aqui; icone deve corresponder a uma chave de iconesHabilidades.
const habilidades = [
    {
        nome: "HTML",
        icone: "html"
    },
    {
        nome: "CSS",
        icone: "css"
    },
    {
        nome: "JavaScript",
        icone: "javascript"
    },
    {
        nome: "Python",
        icone: "python"
    },
    {
        nome: "SQL",
        icone: "sql"
    },
    {
        nome: "React",
        icone: "react"
    },
    {
        nome: "Inglês (C1)",
        icone: "idioma",
        categoria: "Idioma"
    }
];

// SVGs locais dispensam dependências; somente ícones definidos no código são inseridos no HTML.
/* 05.1 Ícones SVG */

const iconesHabilidades = {

    html: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.7"
             stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 3h16l-1.5 16L12 22l-6.5-3L4 3Z"/>
            <path d="m9.5 10-2 2 2 2"/>
            <path d="m14.5 10 2 2-2 2"/>
        </svg>
    `,

    css: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.7"
             stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 3h16l-1.5 16L12 22l-6.5-3L4 3Z"/>
            <path d="M9 9h6M9 12h6M10 15h4"/>
        </svg>
    `,

    javascript: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.7">
            <rect x="2.5" y="2.5" width="19" height="19" rx="3"/>
            <text x="12" y="15.5" text-anchor="middle"
                  font-size="9" font-weight="700"
                  stroke="none" fill="currentColor">JS</text>
        </svg>
    `,

    python: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.7">
            <rect x="2.5" y="2.5" width="19" height="19" rx="5"/>
            <text x="12" y="15.5" text-anchor="middle"
                  font-size="9" font-weight="700"
                  stroke="none" fill="currentColor">Py</text>
        </svg>
    `,

    sql: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8"
             stroke-linecap="round" stroke-linejoin="round">
            <ellipse cx="12" cy="5" rx="8" ry="3"/>
            <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/>
            <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>
        </svg>
    `,

    react: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.5">
            <ellipse cx="12" cy="12" rx="10" ry="4"/>
            <ellipse cx="12" cy="12" rx="10" ry="4"
                     transform="rotate(60 12 12)"/>
            <ellipse cx="12" cy="12" rx="10" ry="4"
                     transform="rotate(120 12 12)"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"
                    stroke="none"/>
        </svg>
    `,

    idioma: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8"
             stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9"/>
            <path d="M3 12h18"/>
            <path d="M12 3a15 15 0 0 1 0 18"/>
            <path d="M12 3a15 15 0 0 0 0 18"/>
        </svg>
    `
};

const listaHabilidades = document.querySelector("#lista-habilidades");

/* 05.2 Construção dos cartões */

function criarCartaoHabilidade(habilidade) {
    const card = document.createElement("li");
    card.classList.add("habilidade-card");
    const icone = document.createElement("span");
    icone.classList.add("habilidade-icone");
    icone.setAttribute("aria-hidden", "true");
    icone.innerHTML = iconesHabilidades[habilidade.icone] || "";
    const nome = document.createElement("h3");
    nome.textContent = habilidade.nome;
    card.append(icone, nome);
    if (habilidade.categoria) {

        const categoria = document.createElement("span");
        categoria.classList.add("habilidade-categoria");
        categoria.textContent = habilidade.categoria;

        card.appendChild(categoria);
    }

    return card;
}

function exibirHabilidades() {
    const cartoes = habilidades.map(criarCartaoHabilidade);
    listaHabilidades.replaceChildren(...cartoes);
}

if (listaHabilidades) {
    exibirHabilidades();
}


/* ========================================
   06. CERTIFICAÇÕES
======================================== */

// "ordem" controla a exibição; "id" apenas identifica a certificação no cadastro.
const certificacoes = [
    {
        id: 1,
        ordem: 2,
        nome: "Associate Developer (O11)",
        instituicao: "OutSystems",
        link: "assets/certificados/Guilherme Pereira OutSystems Certificate.pdf"
    },
    {
        id: 2,
        ordem: 3,
        nome: "Associate Developer (ODC)",
        instituicao: "OutSystems",
        link: "assets/certificados/Guilherme Pereira OutSystems Certificate.pdf"
    },
    {
        id: 3,
        ordem: 4,
        nome: "Mobile Developer Specialist (O11 and ODC)",
        instituicao: "OutSystems",
        link: "assets/certificados/Guilherme Pereira OutSystems Certificate.pdf"
    },
    {
        id: 4,
        ordem: 1,
        nome: "C1 Advanced (CAE)",
        instituicao: "Cambridge English",
        link: "assets/certificados/C1 Advanced (CAE).pdf"
    },
    {
        id: 5,
        ordem: 5,
        nome: "Menção Honrosa: Congresso de Iniciação Científica - PIC",
        instituicao: "Universidade de Brasília (UnB)",
        link: "assets/certificados/Mencao Honrosa Congresso de Iniciação Científica - PIC.pdf"
    },
    {
        id: 6,
        ordem: 6,
        nome: "Básico ao Avançado - O curso Completo de Macros e VBA Excel",
        instituicao: "Udemy",
        link: "assets/certificados/Certificado Macros e VBA - Guilherme Lopes Costa Pereira.pdf"
    }
];

const listaCertificacoes = document.querySelector(
    "#lista-certificacoes"
);
const janelaCertificacoes = document.querySelector(
    "#certificacoes-janela"
);
const botaoAnterior = document.querySelector(
    "#certificacao-anterior"
);

const botaoProximo = document.querySelector(
    "#certificacao-proximo"
);
const indicadoresCertificacoes = document.querySelector(
    "#indicadores-certificacoes"
);

/* 06.1 Montagem dos certificados */

function criarCartaoCertificacao(certificacao) {
    const card = document.createElement("article");
    card.classList.add("certificacao-card");
    const icone = document.createElement("span");
    icone.classList.add("certificacao-icone");
    icone.setAttribute("aria-hidden", "true");
    icone.innerHTML = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="12" cy="8" r="6" />
            <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.11" />
        </svg>
    `;
    const nome = document.createElement("h3");
    nome.textContent = certificacao.nome;
    const instituicao = document.createElement("p");
    instituicao.textContent = certificacao.instituicao;
    card.append(icone, nome, instituicao);
    if (certificacao.link) {

        const link = document.createElement("a");

        link.classList.add("certificacao-link");
        link.textContent = "Ver certificado ↗";

        link.href = certificacao.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        link.setAttribute(
            "aria-label",
            `Ver certificado ${certificacao.nome} em nova aba`
        );

        card.appendChild(link);
    }

    return card;
}

function exibirCertificacoes() {

    // Copiamos o array antes de sort() para não alterar a ordem original dos dados.
    const certificacoesOrdenadas = [...certificacoes].sort(
        (a, b) => a.ordem - b.ordem
    );
    const cartoes = certificacoesOrdenadas.map(
        criarCartaoCertificacao
    );
    listaCertificacoes.replaceChildren(...cartoes);
}

/* 06.2 Controle do carrossel */

function iniciarCarrosselCertificacoes() {
    let posicaoAtual = 0;
    let temporizadorRolagem;

/* 06.3 Cálculo de posições e deslocamentos */

    function obterCartoesVisiveis() {
        if (window.innerWidth <= 600) {
            return 1;
        }
        if (window.innerWidth <= 900) {
            return 2;
        }
        return 4;
    }

    // Exemplo: com 6 certificados e 4 visíveis, existem 3 posições possíveis.
    function obterTotalPosicoes() {

        const visiveis = obterCartoesVisiveis();
        return Math.max(
            1,
            certificacoes.length - visiveis + 1
        );
    }

    function calcularPosicao(indice) {

        const cartoes = listaCertificacoes.children;

        if (cartoes.length === 0) {
            return 0;
        }
        const primeiro = cartoes[0];
        const destino = cartoes[indice];

        if (!destino) {
            return 0;
        }

        // offsetLeft mede a distância do cartão de destino ao primeiro cartão.
        const distancia = (
            destino.offsetLeft - primeiro.offsetLeft
        );
        const maximo = Math.max(
            0,
            janelaCertificacoes.scrollWidth -
            janelaCertificacoes.clientWidth
        );
        return Math.min(distancia, maximo);
    }

    function atualizarControles() {

        const totalPosicoes = obterTotalPosicoes();
        botaoAnterior.disabled = posicaoAtual === 0;

        botaoProximo.disabled = (
            posicaoAtual >= totalPosicoes - 1
        );
        indicadoresCertificacoes
            .querySelectorAll(".certificacao-indicador")
            .forEach((indicador, indice) => {

                const ativo = indice === posicaoAtual;
                indicador.classList.toggle("ativo", ativo);
                if (ativo) {
                    indicador.setAttribute("aria-current", "true");
                } else {
                    indicador.removeAttribute("aria-current");
                }
            });
    }

    function irParaPosicao(indice, animar = true) {

        const totalPosicoes = obterTotalPosicoes();
        posicaoAtual = Math.max(
            0,
            Math.min(indice, totalPosicoes - 1)
        );
        const reduzir = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        janelaCertificacoes.scrollTo({
            left: calcularPosicao(posicaoAtual),
            behavior: reduzir || !animar ? "auto" : "smooth"
        });
        atualizarControles();
    }

/* 06.4 Indicadores e eventos */

    function criarIndicadores() {
        indicadoresCertificacoes.replaceChildren();

        const totalPosicoes = obterTotalPosicoes();
        for (let i = 0; i < totalPosicoes; i++) {

            const indicador = document.createElement("button");

            indicador.type = "button";
            indicador.classList.add("certificacao-indicador");

            indicador.setAttribute(
                "aria-label",
                `Ir para a posição ${i + 1} de ${totalPosicoes}`
            );
            indicador.addEventListener("click", () => {
                irParaPosicao(i);
            });

            indicadoresCertificacoes.appendChild(indicador);
        }
        indicadoresCertificacoes.hidden = totalPosicoes <= 1;

        atualizarControles();
    }
    botaoProximo.addEventListener("click", () => {
        irParaPosicao(posicaoAtual + 1);
    });
    botaoAnterior.addEventListener("click", () => {
        irParaPosicao(posicaoAtual - 1);
    });

    let cartoesVisiveisAnteriores = obterCartoesVisiveis();

    window.addEventListener("resize", () => {

        const cartoesVisiveis = obterCartoesVisiveis();
        if (cartoesVisiveis !== cartoesVisiveisAnteriores) {

            cartoesVisiveisAnteriores = cartoesVisiveis;

            criarIndicadores();
        }
        irParaPosicao(posicaoAtual, false);
    });
    janelaCertificacoes.addEventListener("scroll", () => {
        clearTimeout(temporizadorRolagem);

        // Aguarda o fim da rolagem manual para sincronizar setas e indicadores.
        temporizadorRolagem = setTimeout(() => {

            const totalPosicoes = obterTotalPosicoes();

            let posicaoMaisProxima = 0;
            let menorDistancia = Infinity;
            for (let i = 0; i < totalPosicoes; i++) {

                const distancia = Math.abs(
                    janelaCertificacoes.scrollLeft -
                    calcularPosicao(i)
                );

                if (distancia < menorDistancia) {

                    menorDistancia = distancia;
                    posicaoMaisProxima = i;
                }
            }
            posicaoAtual = posicaoMaisProxima;

            atualizarControles();

        }, 150);

    }, { passive: true });

    criarIndicadores();
    irParaPosicao(0, false);
}
if (
    listaCertificacoes &&
    janelaCertificacoes &&
    botaoAnterior &&
    botaoProximo &&
    indicadoresCertificacoes
) {
    exibirCertificacoes();
    iniciarCarrosselCertificacoes();
}


/* ========================================
   07. FORMULÁRIO DE CONTATO
======================================== */

// IDs públicos do EmailJS: não coloque senha, token privado ou credenciais do Gmail aqui.
const SERVICE_ID = "service_vbuvk4i";
const TEMPLATE_ID = "template_fiw8dfb";
const PUBLIC_KEY = "5ISIwXXyXaNLlnAQs";

const formularioContato = document.querySelector("#form-contato");
const botaoEnviar = document.querySelector("#botao-enviar");
const campoNome = document.querySelector("#nome");
const campoEmail = document.querySelector("#email");
const campoMensagem = document.querySelector("#mensagem");
const respostaContato = document.querySelector("#resposta-contato");
const contadorMensagem = document.querySelector("#contador-mensagem");

/* 07.1 Contador e mensagens do formulário */

function atualizarContadorMensagem() {
    if (!campoMensagem || !contadorMensagem) {
        return;
    }
    const quantidade = campoMensagem.value.length;
    const limite = campoMensagem.maxLength;
    contadorMensagem.textContent = `${quantidade} / ${limite}`;
}

function mostrarResposta(mensagem, tipo) {
    respostaContato.textContent = mensagem;
    respostaContato.dataset.tipo = tipo;
}

/* 07.2 Validação e envio ao EmailJS */

async function enviarMensagem(evento) {
    evento.preventDefault();
    if (botaoEnviar.disabled) {
        return;
    }
    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const mensagem = campoMensagem.value.trim();
    if (
        nome.length < 2 ||
        !email ||
        !campoEmail.validity.valid ||
        mensagem.length < 10 ||
        mensagem.length > 1000
    ) {

        mostrarResposta(
            "Preencha todos os campos corretamente.",
            "erro"
        );

        return;
    }
    if (!window.emailjs) {

        mostrarResposta(
            "Não foi possível iniciar o envio. Tente novamente.",
            "erro"
        );

        return;
    }

    // As chaves devem coincidir com {{from_name}}, {{reply_to}} e {{message}} no template.
    const dadosEmail = {
        from_name: nome,
        reply_to: email,
        message: mensagem
    };
    botaoEnviar.disabled = true;
    botaoEnviar.textContent = "Enviando...";
    respostaContato.textContent = "";
    delete respostaContato.dataset.tipo;
    formularioContato.setAttribute("aria-busy", "true");

    try {

        // Aguarda a resposta do serviço antes de limpar os campos ou mostrar sucesso.
        await window.emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            dadosEmail,
            {
                publicKey: PUBLIC_KEY
            }
        );
        mostrarResposta(
            `Mensagem enviada com sucesso, ${nome}! Obrigado pelo contato.`,
            "sucesso"
        );
        formularioContato.reset();
        atualizarContadorMensagem();

    } catch (erro) {
        console.error("Erro ao enviar mensagem:", erro);
        mostrarResposta(
            "Não foi possível enviar sua mensagem. Tente novamente mais tarde.",
            "erro"
        );

    // O botão é reativado tanto após sucesso quanto após falha.
    } finally {
        botaoEnviar.disabled = false;
        botaoEnviar.textContent = "Enviar mensagem";
        formularioContato.removeAttribute("aria-busy");
    }
}

if (
    formularioContato &&
    botaoEnviar &&
    campoNome &&
    campoEmail &&
    campoMensagem &&
    respostaContato
) {
    formularioContato.addEventListener("submit", enviarMensagem);
    formularioContato.addEventListener("input", () => {

        respostaContato.textContent = "";
        delete respostaContato.dataset.tipo;
    });
}

if (campoMensagem && contadorMensagem) {
    campoMensagem.addEventListener(
        "input",
        atualizarContadorMensagem
    );
    atualizarContadorMensagem();
}


/* ========================================
   08. ANIMAÇÕES DE ROLAGEM
======================================== */

// Não anima se o visitante solicitar redução de movimentos no sistema.
const reduzirMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

function observarElemento(elemento) {
    if (!observadorAnimacoes) {
        return;
    }
    elemento.classList.add("revelar");
    observadorAnimacoes.observe(elemento);
}

/* 08.1 Observação da entrada das seções na tela */

if (!reduzirMovimento && "IntersectionObserver" in window) {

    // A seção aparece ao entrar na tela; depois deixa de ser observada.
    observadorAnimacoes = new IntersectionObserver((entradas) => {

        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observadorAnimacoes.unobserve(entrada.target);
            }
        });

    }, {
        threshold: 0.1
    });
    html.classList.add("animacoes-ativas");
    document.querySelectorAll("main > section, .projeto-card")
        .forEach(observarElemento);
}


/* ========================================
   09. VOLTAR AO TOPO
======================================== */

const botaoTopo = document.querySelector("#botao-topo");

function atualizarBotaoTopo() {

    if (!botaoTopo) {
        return;
    }

    // O botão surge somente após ultrapassar 300px de rolagem.
    botaoTopo.hidden = window.scrollY <= 300;
}

function voltarAoTopo() {
    const reduzir = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
        top: 0,
        behavior: reduzir ? "auto" : "smooth"
    });
}

if (botaoTopo) {
    atualizarBotaoTopo();
    window.addEventListener("scroll", atualizarBotaoTopo, {
        passive: true
    });
    botaoTopo.addEventListener("click", voltarAoTopo);
}


/* ========================================
   10. RODAPÉ
======================================== */

const anoAtual = document.querySelector("#ano-atual");

if (anoAtual) {
    const ano = new Date().getFullYear();
    anoAtual.textContent = ano;
}
