"use strict";
const Nav = (() => {
  const toggle = document.getElementById("nav-toggle");
  const mobile = document.getElementById("nav-mobile");
  const overlay = document.getElementById("nav-overlay");
  const links = mobile ? mobile.querySelectorAll("a") : [];
  function open() {
    mobile.classList.add("is-open");
    overlay.classList.add("is-visible");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function close() {
    mobile.classList.remove("is-open");
    overlay.classList.remove("is-visible");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  function init() {
    if (!toggle || !mobile) return;
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? close() : open();
    });
    overlay.addEventListener("click", close);
    links.forEach((link) => link.addEventListener("click", close));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }
  return { init };
})();
const Counters = (() => {
  const DURATION = 1400;
  const STEP_MS = 20;
  function animateOne(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || "";
    const steps = DURATION / STEP_MS;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, STEP_MS);
  }
  function init() {
    const els = document.querySelectorAll(".stat__number[data-target]");
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateOne(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    els.forEach((el) => obs.observe(el));
  }
  return { init };
})();
const Particles = (() => {
  const COLORS = ["#e63946", "#f4813f", "#1a8cdc", "#8dd4f5", "#2dd4bf"];
  const COUNT = 16;
  function create(container) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.setAttribute("aria-hidden", "true");
      const size = (Math.random() * 7 + 4).toFixed(1);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const left = (Math.random() * 100).toFixed(1);
      const delay = (Math.random() * 9).toFixed(2);
      const dur = (6 + Math.random() * 8).toFixed(2);
      const radius = Math.random() > 0.5 ? "50%" : "3px";
      Object.assign(p.style, {
        width: size + "px",
        height: size + "px",
        left: left + "%",
        background: color,
        animationDelay: delay + "s",
        animationDuration: dur + "s",
        borderRadius: radius,
      });
      frag.appendChild(p);
    }
    container.appendChild(frag);
  }
  function init() {
    const hero = document.getElementById("hero");
    if (hero) create(hero);
  }
  return { init };
})();
const OceanScene = (() => {
  const TRASH_EMOJI = ["🧴", "🥤", "🛍️", "🍶", "🥫", "🧃", "🪣"];
  const FISH_CLEAN = ["#2dd4bf", "#8dd4f5", "#f4d03f", "#ff8fab", "#1a8cdc"];
  const FISH_POLLUTED = ["#7a7a7a", "#545454", "#9e9e9e"];
  const MESSAGES = {
    clean:
      "🌊 Um oceano limpo abriga centenas de espécies e mantém o equilíbrio do planeta.",
    polluted:
      "⚠️ Um oceano poluído perde biodiversidade, afeta nossa saúde e compromete o clima global.",
  };
  let scene, msgEl;
  function buildBubbles(frag, count) {
    for (let i = 0; i < count; i++) {
      const b = document.createElement("div");
      b.className = "bubble";
      b.setAttribute("aria-hidden", "true");
      const size = (Math.random() * 13 + 5).toFixed(1);
      Object.assign(b.style, {
        width: size + "px",
        height: size + "px",
        left: (Math.random() * 95).toFixed(1) + "%",
        bottom: (Math.random() * 55).toFixed(1) + "px",
        animationDelay: (Math.random() * 7).toFixed(2) + "s",
        animationDuration: (4 + Math.random() * 5).toFixed(2) + "s",
      });
      frag.appendChild(b);
    }
  }
  function buildFish(frag, mode) {
    const colors = mode === "clean" ? FISH_CLEAN : FISH_POLLUTED;
    const count = mode === "clean" ? 7 : 3;
    for (let i = 0; i < count; i++) {
      const f = document.createElement("div");
      f.className = "fish";
      f.setAttribute("aria-hidden", "true");
      const color = colors[i % colors.length];
      const yPos = (30 + Math.random() * 210).toFixed(0);
      const speed = (8 + Math.random() * 11).toFixed(1);
      const delay = -(Math.random() * parseFloat(speed)).toFixed(1);
      const scale = (0.6 + Math.random() * 0.75).toFixed(2);
      Object.assign(f.style, {
        top: yPos + "px",
        animationDuration: speed + "s",
        animationDelay: delay + "s",
        transform: `scale(${scale})`,
      });
      const body = document.createElement("div");
      body.className = "fish__body";
      body.style.background = color;
      const tail = document.createElement("div");
      tail.className = "fish__tail";
      tail.style.borderRight = `12px solid ${color}`;
      f.appendChild(body);
      f.appendChild(tail);
      frag.appendChild(f);
    }
  }
  function buildTrash(frag) {
    for (let i = 0; i < 11; i++) {
      const t = document.createElement("div");
      t.className = "trash-item";
      t.textContent =
        TRASH_EMOJI[Math.floor(Math.random() * TRASH_EMOJI.length)];
      t.setAttribute("aria-hidden", "true");
      Object.assign(t.style, {
        left: (Math.random() * 88).toFixed(1) + "%",
        top: (25 + Math.random() * 220).toFixed(0) + "px",
        animationDelay: (Math.random() * 3).toFixed(2) + "s",
        animationDuration: (2.5 + Math.random() * 2).toFixed(2) + "s",
      });
      frag.appendChild(t);
    }
  }
  function build(mode) {
    if (!scene) return;
    scene.innerHTML = "";
    scene.classList.toggle("ocean-scene--polluted", mode === "polluted");
    const frag = document.createDocumentFragment();
    buildBubbles(frag, 13);
    buildFish(frag, mode);
    if (mode === "polluted") buildTrash(frag);
    scene.appendChild(frag);
    if (msgEl) msgEl.textContent = MESSAGES[mode] || "";
  }
  function setMode(mode) {
    build(mode);
    document.querySelectorAll("[data-ocean-btn]").forEach((btn) => {
      const isActive = btn.dataset.oceanBtn === mode;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }
  function init() {
    scene = document.getElementById("oceanScene");
    msgEl = document.getElementById("ocean-msg");
    if (!scene) return;
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-ocean-btn]");
      if (btn) setMode(btn.dataset.oceanBtn);
    });
    setMode("clean");
  }
  return { init };
})();
const BarChart = (() => {
  function init() {
    const bars = document.querySelectorAll(".bar-fill");
    if (!bars.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-animated");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 },
    );
    bars.forEach((bar) => obs.observe(bar));
  }
  return { init };
})();
const ScrollReveal = (() => {
  function init() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
  }
  return { init };
})();
const Quiz = (() => {
  const DATA = [
    {
      question:
        "Quantos anos um canudo plástico leva para se decompor na natureza?",
      options: ["10 anos", "50 anos", "200 anos", "500 anos"],
      correct: 2,
      feedback:
        "Um canudo plástico pode levar até 200 anos para se decompor — e nunca desaparece completamente, apenas vira microplástico.",
    },
    {
      question: "Qual porcentagem do oxigênio que respiramos vem dos oceanos?",
      options: ["10%", "30%", "50%", "70%"],
      correct: 2,
      feedback:
        'Cerca de 50% do oxigênio atmosférico é produzido pelo fitoplâncton marinho. Os oceanos são os "pulmões" do planeta!',
    },
    {
      question: "O que são microplásticos?",
      options: [
        "Plásticos recicláveis especiais",
        "Fragmentos menores que 5 mm",
        "Plásticos biodegradáveis",
        "Embalagens de laboratório",
      ],
      correct: 1,
      feedback:
        "Microplásticos são fragmentos menores que 5 mm. Já foram encontrados no ar, na água potável, no sangue humano e até no leite materno.",
    },
    {
      question: "Qual país gera mais poluição plástica nos oceanos?",
      options: ["Estados Unidos", "Brasil", "Índia", "Filipinas"],
      correct: 3,
      feedback:
        "As Filipinas lideram o ranking de poluição plástica oceânica. O Brasil aparece entre os 10 maiores — por isso nossa responsabilidade é enorme!",
    },
    {
      question:
        "Qual ação individual tem maior impacto para reduzir a poluição oceânica?",
      options: [
        "Usar canudo de metal",
        "Recusar sacolas plásticas",
        "Reduzir o consumo geral de plástico",
        'Comprar produtos "eco-friendly"',
      ],
      correct: 2,
      feedback:
        'A melhor ação é REDUZIR o consumo. Não consumir é sempre mais eficiente do que consumir de forma "sustentável".',
    },
  ];
  const TITLES = [
    "Continue Aprendendo!",
    "Bom Começo!",
    "Você Está Atento!",
    "Muito Bem!",
    "Excelente!",
    "Guardião do Oceano! 🌊",
  ];
  const MESSAGES = [
    "Não se preocupe — o importante é aprender! Explore o site e volte para praticar.",
    "Você está no caminho certo. Compartilhe o que aprendeu com amigos!",
    "Boa pontuação! Você claramente se preocupa com o meio ambiente.",
    "Impressionante! Você já sabe bastante sobre os oceanos. Espalhe esse conhecimento!",
    "Incrível! Você é um verdadeiro especialista. O oceano agradece! 🐬",
    "Perfeito! Você conhece profundamente o tema. O planeta precisa de pessoas como você! 🌊",
  ];
  let currentIndex = 0;
  let score = 0;
  let answered = false;
  let els = {};
  function renderProgress() {
    els.progress.innerHTML = DATA.map((_, i) => {
      let cls = "q-dot";
      if (i < currentIndex) cls += " q-dot--done";
      else if (i === currentIndex) cls += " q-dot--active";
      return `<span class="${cls}" role="listitem" aria-label="Pergunta ${i + 1}${i < currentIndex ? " respondida" : i === currentIndex ? " atual" : ""}"></span>`;
    }).join("");
  }
  function renderQuestion() {
    const q = DATA[currentIndex];
    els.question.textContent = q.question;
    els.options.innerHTML = q.options
      .map(
        (opt, i) => `
      <button
        class="quiz-opt"
        data-index="${i}"
        type="button"
        aria-label="Opção ${i + 1}: ${opt}"
      >${opt}</button>
    `,
      )
      .join("");
    els.feedback.textContent = "";
    els.feedback.className = "quiz-feedback";
    els.next.style.display = "none";
    els.next.textContent =
      currentIndex === DATA.length - 1 ? "Ver resultado →" : "Próxima →";
    answered = false;
  }
  function render() {
    renderProgress();
    renderQuestion();
  }
  function handleAnswer(idx) {
    if (answered) return;
    answered = true;
    const q = DATA[currentIndex];
    const isRight = idx === q.correct;
    if (isRight) score++;
    els.options.querySelectorAll(".quiz-opt").forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add("quiz-opt--correct");
      else if (i === idx) btn.classList.add("quiz-opt--wrong");
    });
    els.feedback.textContent = (isRight ? "✅ " : "❌ ") + q.feedback;
    els.feedback.className =
      "quiz-feedback" + (isRight ? " quiz-feedback--correct" : "");
    els.next.style.display = "inline-flex";
  }
  function nextQuestion() {
    currentIndex++;
    if (currentIndex >= DATA.length) {
      showResult();
    } else {
      render();
    }
  }
  function showResult() {
    els.main.style.display = "none";
    els.result.style.display = "block";
    els.finalScore.textContent = score;
    els.resultTitle.textContent = TITLES[score] || TITLES[TITLES.length - 1];
    els.resultMsg.textContent =
      MESSAGES[score] || MESSAGES[MESSAGES.length - 1];
    els.progress.innerHTML = DATA.map(
      () => '<span class="q-dot q-dot--done" role="listitem"></span>',
    ).join("");
  }
  function restart() {
    currentIndex = 0;
    score = 0;
    els.main.style.display = "block";
    els.result.style.display = "none";
    render();
  }
  function init() {
    els = {
      progress: document.getElementById("quizProgress"),
      main: document.getElementById("quizMain"),
      question: document.getElementById("quizQ"),
      options: document.getElementById("quizOpts"),
      feedback: document.getElementById("quizFeed"),
      next: document.getElementById("quizNext"),
      result: document.getElementById("quizResult"),
      finalScore: document.getElementById("finalScore"),
      resultTitle: document.getElementById("resultTitle"),
      resultMsg: document.getElementById("resultMsg"),
      restartBtn: document.getElementById("quizRestart"),
    };
    if (!els.progress) return;
    els.main.style.display = "block";
    els.result.style.display = "none";
    els.next.style.display = "none";
    els.options.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-index]");
      if (btn) handleAnswer(parseInt(btn.dataset.index, 10));
    });
    els.next.addEventListener("click", nextQuestion);
    if (els.restartBtn) els.restartBtn.addEventListener("click", restart);
    render();
  }
  return { init };
})();
const ImpactoColetivo = (() => {
  const ACTIONS = [
    {
      suffix: "pessoas pararem de usar canudos plásticos hoje,",
      unit: "canudos evitados por ano",
      basePerPerson: 730,
      contextFn: (val, people) => {
        const pools = (val / 100_000).toFixed(1);
        return {
          bold: `${pools} piscinas olímpicas`,
          rest: " de plástico que não vai para o oceano.",
        };
      },
    },
    {
      suffix: "pessoas deixarem de usar sacolas plásticas avulsas,",
      unit: "sacolas plásticas evitadas por ano",
      basePerPerson: 500,
      contextFn: (val, people) => {
        const km = Math.round(val / 8_000);
        return {
          bold: `${km.toLocaleString("pt-BR")} km de fila`,
          rest: " — a distância de São Paulo a Buenos Aires, coberta de sacolas.",
        };
      },
    },
    {
      suffix: "pessoas separarem o lixo corretamente em casa,",
      unit: "kg de resíduo reciclado por ano",
      basePerPerson: 168,
      contextFn: (val, people) => {
        const tons = Math.round(val / 1000);
        return {
          bold: `${tons.toLocaleString("pt-BR")} toneladas`,
          rest: " recicladas — evitando aterros e rios poluídos.",
        };
      },
    },
    {
      suffix: "pessoas participarem de um mutirão de praia este ano,",
      unit: "kg de lixo recolhido das praias",
      basePerPerson: 4,
      contextFn: (val, people) => {
        const caminhoes = Math.round(val / 5_000);
        const txt =
          caminhoes < 1
            ? "menos de 1 caminhão"
            : `${caminhoes.toLocaleString("pt-BR")} caminhões de lixo`;
        return { bold: txt, rest: " removidos das praias brasileiras." };
      },
    },
  ];
  const PEOPLE_STEPS = [1_000, 10_000, 100_000, 1_000_000, 10_000_000];
  function fmt(n) {
    if (n >= 1_000_000_000)
      return (n / 1_000_000_000).toFixed(1).replace(".", ",") + " bi";
    if (n >= 1_000_000)
      return (n / 1_000_000).toFixed(1).replace(".", ",") + " mi";
    if (n >= 1_000) return (n / 1_000).toFixed(0) + " mil";
    return n.toLocaleString("pt-BR");
  }
  function fmtPeople(n) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(0) + " milhão";
    if (n >= 1_000) return (n / 1_000).toFixed(0).replace(".", ",") + " mil";
    return n.toLocaleString("pt-BR");
  }
  let currentAction = 0;
  let currentStep = 1;
  let els = {};
  function render() {
    const action = ACTIONS[currentAction];
    const people = PEOPLE_STEPS[currentStep - 1];
    const value = action.basePerPerson * people;
    const ctx = action.contextFn(value, people);
    const barPct = Math.min(10 + (currentStep - 1) * 22, 98);
    els.count.textContent = fmtPeople(people);
    els.suffix.textContent = action.suffix;
    els.resultNum.textContent = fmt(value);
    els.resultUnit.textContent = action.unit;
    els.resultBold.textContent = ctx.bold;
    els.resultCtx.lastChild.textContent = ctx.rest;
    els.barFill.style.width = barPct + "%";
  }
  function setAction(idx) {
    currentAction = idx;
    document.querySelectorAll(".ic-tab").forEach((tab, i) => {
      const active = i === idx;
      tab.classList.toggle("ic-tab--active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    render();
  }
  function init() {
    els = {
      count: document.getElementById("ic-count"),
      suffix: document.getElementById("ic-suffix"),
      slider: document.getElementById("ic-slider"),
      resultNum: document.getElementById("ic-result-num"),
      resultUnit: document.getElementById("ic-result-unit"),
      resultCtx: document.getElementById("ic-result-ctx"),
      resultBold: document.getElementById("ic-result-bold"),
      barFill: document.getElementById("ic-bar-fill"),
    };
    if (!els.count) return;
    document.querySelectorAll(".ic-tab").forEach((tab, i) => {
      tab.addEventListener("click", () => setAction(i));
    });
    els.slider.addEventListener("input", (e) => {
      currentStep = parseInt(e.target.value, 10);
      render();
    });
    render();
  }
  return { init };
})();
const FlipCards = (() => {
  function flip(inner) {
    const isFlipped = inner.classList.toggle("is-flipped");
    inner.setAttribute("aria-pressed", isFlipped ? "true" : "false");
    inner
      .querySelector(".flip-card__front")
      .setAttribute("aria-hidden", isFlipped ? "true" : "false");
    inner
      .querySelector(".flip-card__back")
      .setAttribute("aria-hidden", isFlipped ? "false" : "true");
  }
  function init() {
    const inners = document.querySelectorAll(".flip-card__inner");
    if (!inners.length) return;
    inners.forEach((inner) => {
      inner.addEventListener("click", () => flip(inner));
      inner.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          flip(inner);
        }
      });
    });
  }
  return { init };
})();
const MiniJogo = (() => {
  const ITEMS = [
    {
      emoji: "🧴",
      name: "Shampoo",
      correct: "bin",
      feedCorrect:
        "✅ Ótimo! Embalagens plásticas vão para a lixeira de recicláveis.",
      feedWrong:
        "❌ Ops! Embalagens plásticas demoram 400 anos para se decompor no oceano.",
    },
    {
      emoji: "🥤",
      name: "Copo plástico",
      correct: "bin",
      feedCorrect:
        "✅ Perfeito! Copos plásticos podem ser reciclados — nunca jogar no mar.",
      feedWrong:
        "❌ Errou! Copos plásticos matam tartarugas que os confundem com alimento.",
    },
    {
      emoji: "🍎",
      name: "Maçã",
      correct: "bin",
      feedCorrect:
        "✅ Certo! Restos orgânicos vão para o lixo orgânico ou compostagem.",
      feedWrong:
        "❌ Ops! Mesmo orgânicos, jogar comida no oceano desequilibra o ecossistema.",
    },
    {
      emoji: "🛍️",
      name: "Sacola plástica",
      correct: "bin",
      feedCorrect:
        "✅ Isso! Sacolas plásticas são perigosíssimas para golfinhos e tartarugas.",
      feedWrong:
        "❌ Não! Sacolas plásticas são uma das maiores causas de morte de tartarugas.",
    },
    {
      emoji: "🥫",
      name: "Lata",
      correct: "bin",
      feedCorrect: "✅ Muito bem! Latas de alumínio são 100% recicláveis.",
      feedWrong:
        "❌ Errou! Latas no oceano liberam metais pesados que envenenam os peixes.",
    },
    {
      emoji: "📦",
      name: "Papelão",
      correct: "bin",
      feedCorrect:
        "✅ Correto! Papelão é reciclável e nunca deve ir para o mar.",
      feedWrong:
        "❌ Papelão no oceano afunda e sufoca animais do fundo do mar.",
    },
    {
      emoji: "🐚",
      name: "Concha",
      correct: "ocean",
      feedCorrect:
        "✅ Exato! Conchas são naturais — pertencem ao oceano e à areia das praias.",
      feedWrong:
        "❌ Conchas são naturais e devem permanecer no oceano. Não são lixo!",
    },
    {
      emoji: "🪨",
      name: "Pedra",
      correct: "ocean",
      feedCorrect:
        "✅ Isso! Pedras são elementos naturais do ecossistema marinho.",
      feedWrong:
        "❌ Pedras são elementos naturais — elas pertencem à natureza, não à lixeira.",
    },
    {
      emoji: "🧃",
      name: "Caixinha suco",
      correct: "bin",
      feedCorrect:
        "✅ Ótimo! Caixinhas são recicláveis — nunca jogar no oceano.",
      feedWrong:
        "❌ Caixinhas de suco levam 200 anos para se decompor na água salgada.",
    },
    {
      emoji: "🪣",
      name: "Balde velho",
      correct: "bin",
      feedCorrect:
        "✅ Correto! Plásticos grandes vão para a coleta de recicláveis ou ecopontos.",
      feedWrong:
        "❌ Plásticos grandes se fragmentam em milhares de microplásticos no oceano.",
    },
  ];
  let queue = [],
    currentIndex = 0,
    scoreRight = 0,
    scoreTotal = 0;
  let isDragging = false,
    touchZone = null;
  let els = {};
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function showItem() {
    const item = queue[currentIndex];
    els.itemEmoji.textContent = item.emoji;
    els.itemName.textContent = item.name;
    els.item.setAttribute("aria-label", "Arrastar: " + item.name);
    els.item.setAttribute("aria-grabbed", "false");
    els.item.classList.remove("is-entering");
    void els.item.offsetWidth;
    els.item.classList.add("is-entering");
    els.feedback.className = "game-feedback";
    els.feedback.textContent = "";
  }
  function updateScore() {
    els.scoreRight.textContent = scoreRight;
    els.scoreTotal.textContent = scoreTotal;
    [els.scoreRight, els.scoreTotal].forEach((el) => {
      el.classList.remove("is-bumping");
      void el.offsetWidth;
      el.classList.add("is-bumping");
      setTimeout(() => el.classList.remove("is-bumping"), 300);
    });
  }
  function play(target) {
    if (currentIndex >= queue.length) return;
    const item = queue[currentIndex];
    const correct = target === item.correct;
    scoreTotal++;
    if (correct) scoreRight++;
    updateScore();
    els.hint.classList.add("is-hidden");
    els.feedback.textContent = correct ? item.feedCorrect : item.feedWrong;
    els.feedback.className =
      "game-feedback is-visible " +
      (correct ? "game-feedback--correct" : "game-feedback--wrong");
    const zone = target === "bin" ? els.zoneBin : els.zoneOcean;
    if (correct) {
      zone.classList.add("is-correct");
      setTimeout(() => zone.classList.remove("is-correct"), 600);
    } else {
      zone.classList.add("is-shaking", "is-wrong");
      setTimeout(() => zone.classList.remove("is-shaking", "is-wrong"), 500);
    }
    currentIndex++;
    if (currentIndex >= queue.length) {
      setTimeout(showResult, 1200);
    } else {
      setTimeout(showItem, 900);
    }
  }
  function showResult() {
    const pct = Math.round((scoreRight / scoreTotal) * 100);
    let emoji, title, msg;
    if (pct === 100) {
      emoji = "🏆";
      title = "Campeão do Oceano!";
      msg = "Você acertou tudo! Compartilhe esse conhecimento com seus amigos!";
    } else if (pct >= 70) {
      emoji = "🐬";
      title = "Muito bem!";
      msg = `Você acertou ${scoreRight} de ${scoreTotal}! O oceano agradece cada atitude certa.`;
    } else if (pct >= 40) {
      emoji = "🐢";
      title = "Quase lá!";
      msg = `Acertou ${scoreRight} de ${scoreTotal}. Revise as seções acima e tente de novo!`;
    } else {
      emoji = "🌊";
      title = "O oceano precisa de você!";
      msg = `Acertou ${scoreRight} de ${scoreTotal}. Não desanime — leia o site e volte!`;
    }
    els.resultEmoji.textContent = emoji;
    els.resultTitle.textContent = title;
    els.resultMsg.textContent = msg;
    els.result.hidden = false;
    els.stage.style.display = "none";
    els.zones.style.display = "none";
    els.scoreEl.style.display = "none";
    els.feedback.style.display = "none";
  }
  function restart() {
    scoreRight = 0;
    scoreTotal = 0;
    currentIndex = 0;
    queue = shuffle(ITEMS);
    els.result.hidden = true;
    els.stage.style.display = "";
    els.zones.style.display = "";
    els.scoreEl.style.display = "";
    els.feedback.style.display = "";
    els.hint.classList.remove("is-hidden");
    updateScore();
    showItem();
  }
  function initMouseDrag() {
    let clone = null;
    els.item.addEventListener("mousedown", (e) => {
      if (currentIndex >= queue.length) return;
      e.preventDefault();
      isDragging = true;
      els.item.classList.add("is-dragging");
      const rect = els.item.getBoundingClientRect();
      clone = els.item.cloneNode(true);
      Object.assign(clone.style, {
        position: "fixed",
        width: rect.width + "px",
        height: rect.height + "px",
        left: e.clientX - rect.width / 2 + "px",
        top: e.clientY - rect.height / 2 + "px",
        pointerEvents: "none",
        zIndex: "9999",
        opacity: "0.92",
        transform: "scale(1.1) rotate(3deg)",
        transition: "none",
      });
      document.body.appendChild(clone);
    });
    document.addEventListener("mousemove", (e) => {
      if (!isDragging || !clone) return;
      const rect = els.item.getBoundingClientRect();
      clone.style.left = e.clientX - rect.width / 2 + "px";
      clone.style.top = e.clientY - rect.height / 2 + "px";
      const under = document.elementFromPoint(e.clientX, e.clientY);
      const zone = under ? under.closest(".game-zone") : null;
      els.zoneBin.classList.toggle("is-over", zone === els.zoneBin);
      els.zoneOcean.classList.toggle("is-over", zone === els.zoneOcean);
    });
    document.addEventListener("mouseup", (e) => {
      if (!isDragging) return;
      isDragging = false;
      els.item.classList.remove("is-dragging");
      if (clone) {
        clone.remove();
        clone = null;
      }
      els.zoneBin.classList.remove("is-over");
      els.zoneOcean.classList.remove("is-over");
      const under = document.elementFromPoint(e.clientX, e.clientY);
      const zone = under ? under.closest(".game-zone") : null;
      if (zone) play(zone.dataset.zone);
    });
  }
  function initTouchDrag() {
    let clone = null;
    els.item.addEventListener(
      "touchstart",
      (e) => {
        if (currentIndex >= queue.length) return;
        e.preventDefault();
        const t = e.touches[0];
        isDragging = true;
        const rect = els.item.getBoundingClientRect();
        clone = els.item.cloneNode(true);
        Object.assign(clone.style, {
          position: "fixed",
          width: rect.width + "px",
          height: rect.height + "px",
          left: t.clientX - rect.width / 2 + "px",
          top: t.clientY - rect.height / 2 + "px",
          pointerEvents: "none",
          zIndex: "9999",
          opacity: "0.9",
          transform: "scale(1.12) rotate(3deg)",
          transition: "none",
        });
        document.body.appendChild(clone);
      },
      { passive: false },
    );
    els.item.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging || !clone) return;
        e.preventDefault();
        const t = e.touches[0];
        const rect = els.item.getBoundingClientRect();
        clone.style.left = t.clientX - rect.width / 2 + "px";
        clone.style.top = t.clientY - rect.height / 2 + "px";
        clone.style.display = "none";
        const under = document.elementFromPoint(t.clientX, t.clientY);
        clone.style.display = "";
        touchZone = under ? under.closest(".game-zone") : null;
        els.zoneBin.classList.toggle("is-over", touchZone === els.zoneBin);
        els.zoneOcean.classList.toggle("is-over", touchZone === els.zoneOcean);
      },
      { passive: false },
    );
    els.item.addEventListener("touchend", () => {
      if (!isDragging) return;
      isDragging = false;
      if (clone) {
        clone.remove();
        clone = null;
      }
      els.zoneBin.classList.remove("is-over");
      els.zoneOcean.classList.remove("is-over");
      if (touchZone) play(touchZone.dataset.zone);
      touchZone = null;
    });
  }
  function initZoneClick() {
    [els.zoneBin, els.zoneOcean].forEach((zone) => {
      zone.addEventListener("click", () => {
        if (currentIndex < queue.length) play(zone.dataset.zone);
      });
      zone.addEventListener("keydown", (e) => {
        if (
          (e.key === "Enter" || e.key === " ") &&
          currentIndex < queue.length
        ) {
          e.preventDefault();
          play(zone.dataset.zone);
        }
      });
    });
  }
  function init() {
    els = {
      item: document.getElementById("gameItem"),
      itemEmoji: document.getElementById("gameItemEmoji"),
      itemName: document.getElementById("gameItemName"),
      hint: document.getElementById("gameHint"),
      zoneBin: document.getElementById("zoneBin"),
      zoneOcean: document.getElementById("zoneOcean"),
      scoreRight: document.getElementById("scoreRight"),
      scoreTotal: document.getElementById("scoreTotal"),
      scoreEl: document.querySelector(".game-score"),
      feedback: document.getElementById("gameFeedback"),
      result: document.getElementById("gameResult"),
      resultEmoji: document.getElementById("gameResultEmoji"),
      resultTitle: document.getElementById("gameResultTitle"),
      resultMsg: document.getElementById("gameResultMsg"),
      stage: document.querySelector(".game-stage"),
      zones: document.querySelector(".game-zones"),
    };
    if (!els.item) return;
    document.getElementById("gameRestart").addEventListener("click", restart);
    initMouseDrag();
    initTouchDrag();
    initZoneClick();
    restart();
  }
  return { init };
})();
document.addEventListener("DOMContentLoaded", () => {
  Nav.init();
  Counters.init();
  Particles.init();
  OceanScene.init();
  BarChart.init();
  ScrollReveal.init();
  FlipCards.init();
  Quiz.init();
  ImpactoColetivo.init();
  MiniJogo.init();
});
