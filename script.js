const metricNumbers = document.querySelectorAll("[data-count]");
const timelineItems = document.querySelectorAll(".timeline-item");
const tickerTrack = document.querySelector(".ticker div");
const scrollProgress = document.querySelector("#scroll-progress");
const cursorLight = document.querySelector("#cursor-light");
const briefPanel = document.querySelector("#live-brief");
const briefToggle = document.querySelector("#brief-toggle");
const briefTitle = document.querySelector("#brief-title");
const briefCopy = document.querySelector("#brief-copy");
const radarCard = document.querySelector("#radar-card");
const modal = document.querySelector("#case-modal");
const modalClose = document.querySelector("#modal-close");
const modalTag = document.querySelector("#modal-tag");
const modalTitle = document.querySelector("#modal-title");
const modalCopy = document.querySelector("#modal-copy");
const modalPoints = document.querySelector("#modal-points");

const cases = {
  alfinetei: {
    tag: "case de crescimento",
    title: "Alfinetei",
    copy: "Dossiê de crescimento, linguagem editorial, monetização e domínio de cultura pop em grande escala.",
    points: ["Crescimento citado: 7/11M para 23M seguidores", "Pautas de realities, celebridades e internet", "Provas de linguagem, alcance e monetização"]
  },
  "sou-eu": {
    tag: "gestão de audiência",
    title: "Sou Eu na Vida",
    copy: "Atuação como editor-chefe e criativo em uma audiência massiva, diversa e conectada à cultura cotidiana.",
    points: ["17 milhões de seguidores", "Editorias, linguagem e calendário", "Comunidade, recorrência e leitura de comportamento"]
  },
  banca: {
    tag: "head de criação",
    title: "Banca Digital",
    copy: "Atuação em criação e atendimento, aproximando marcas, influenciadores e formatos nativos da internet.",
    points: ["Head de criação e atendimento por 4 anos", "Conexão entre marca, creator e conversa pública", "Projetos orientados por cultura digital"]
  },
  bbb: {
    tag: "reality e torcida",
    title: "BBB",
    copy: "Leitura de torcida, timing emocional e narrativa social para transformar acontecimentos em conversa de massa.",
    points: ["3 vitórias citadas no portfolio antigo", "Monitoramento de torcida e repercussão", "Conteúdo rápido para momentos de alta atenção"]
  },
  byd: {
    tag: "ativação de marca",
    title: "Carnaval da BYD",
    copy: "Case de marca para demonstrar visão criativa aplicada a evento, presença social e conversa pública.",
    points: ["Ativação e cultura pop", "Presença social conectada ao evento", "Narrativa de marca com repertório de internet"]
  },
  eventos: {
    tag: "eventos e cultura pop",
    title: "Sapucaí, Farofa da Gkay e BBB",
    copy: "Coberturas que dependem de timing, leitura de repercussão e velocidade de publicação.",
    points: ["Narrativa em tempo real", "Cobertura e repercussão", "Bastidores, cortes e leitura de conversa"]
  },
  mynd: {
    tag: "direção criativa",
    title: "Mynd & Billboard",
    copy: "Experiência em direção de criação e liderança de tendências, conectando entretenimento, creator economy e publicidade.",
    points: ["Direção de criação e liderança de tendências", "Mercado digital, memes e entretenimento", "Repertório aplicado a marcas e produtos culturais"]
  }
};

const labIdeas = {
  reality: {
    label: "sala de pauta",
    title: "Cobertura em tempo real",
    copy: "Transformar acontecimentos de reality show em narrativa social com timing, humor e leitura de torcida.",
    power: "88%",
    list: ["Monitorar conversa", "Achar a virada emocional", "Publicar antes da curva cair"]
  },
  marca: {
    label: "território de marca",
    title: "Marca falando a língua da internet",
    copy: "Criar uma ideia de campanha que não pareça anúncio: primeiro conversa, depois conversão.",
    power: "76%",
    list: ["Mapear repertório", "Definir tom de voz", "Encaixar produto sem forçar"]
  },
  evento: {
    label: "cobertura viva",
    title: "Evento como máquina de assunto",
    copy: "Construir presença antes, durante e depois do evento para multiplicar lembrança e compartilhamento.",
    power: "82%",
    list: ["Pré-aquecimento", "Cortes em tempo real", "Pós com bastidores"]
  },
  produto: {
    label: "lançamento autoral",
    title: "Produto com narrativa própria",
    copy: "Assinar produtos e experiências com conceito, desejo e formato pronto para circular nas redes.",
    power: "72%",
    list: ["Conceito vendável", "Gancho visual", "Prova social"]
  }
};

const updateScrollProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
};

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

if (tickerTrack) {
  tickerTrack.innerHTML += tickerTrack.innerHTML;
}

const animateNumber = (element) => {
  const target = Number(element.dataset.count);
  const duration = 1100;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `+${Math.round(target * eased)}`;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    if (entry.target.matches("[data-count]")) animateNumber(entry.target);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.22 });

document.querySelectorAll(".reveal, [data-count]").forEach((element) => revealObserver.observe(element));

const briefObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;
  briefTitle.textContent = visible.target.dataset.briefTitle;
  briefCopy.textContent = visible.target.dataset.briefCopy;
}, { threshold: 0.42 });

document.querySelectorAll("[data-brief-title]").forEach((section) => briefObserver.observe(section));

briefToggle?.addEventListener("click", () => {
  briefPanel.classList.toggle("is-open");
});

timelineItems.forEach((item) => {
  item.addEventListener("click", () => {
    timelineItems.forEach((current) => current.classList.remove("is-active"));
    item.classList.add("is-active");
  });
});

document.querySelectorAll(".radar-node").forEach((node) => {
  node.addEventListener("click", () => {
    document.querySelectorAll(".radar-node").forEach((current) => current.classList.remove("is-active"));
    node.classList.add("is-active");
    const [title, copy] = node.dataset.radar.split("|");
    radarCard.querySelector("strong").textContent = title;
    radarCard.querySelector("p").textContent = copy;
  });
});

document.addEventListener("click", (event) => {
  const node = event.target.closest(".radar-node");
  if (!node) return;
  document.querySelectorAll(".radar-node").forEach((current) => current.classList.remove("is-active"));
  node.classList.add("is-active");
  const [title, copy] = node.dataset.radar.split("|");
  radarCard.querySelector("strong").textContent = title;
  radarCard.querySelector("p").textContent = copy;
});

document.addEventListener("click", (event) => {
  const tab = event.target.closest(".lab-tab");
  if (!tab) return;

  const current = labIdeas[tab.dataset.lab];
  document.querySelectorAll(".lab-tab").forEach((item) => item.classList.remove("is-active"));
  tab.classList.add("is-active");

  document.querySelector("#lab-label").textContent = current.label;
  document.querySelector("#lab-title").textContent = current.title;
  document.querySelector("#lab-copy").textContent = current.copy;
  document.querySelector("#lab-list").innerHTML = current.list.map((item) => `<li>${item}</li>`).join("");
});

document.querySelectorAll("[data-case]").forEach((card) => {
  card.addEventListener("click", (event) => {
    if (!event.target.closest("button") && event.target.tagName !== "ARTICLE") return;
    const current = cases[card.dataset.case];
    modalTag.textContent = current.tag;
    modalTitle.textContent = current.title;
    modalCopy.textContent = current.copy;
    modalPoints.innerHTML = current.points
      .map((point, index) => `<li><span>0${index + 1}</span><strong>${point}</strong></li>`)
      .join("");
    modal.showModal();
  });
});

modalClose?.addEventListener("click", () => modal.close());

document.addEventListener("pointermove", (event) => {
  cursorLight?.style.setProperty("--mx", `${event.clientX}px`);
  cursorLight?.style.setProperty("--my", `${event.clientY}px`);

  document.querySelectorAll(".magnetic:hover").forEach((element) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    element.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
  });
});

document.addEventListener("pointerout", (event) => {
  if (event.target?.classList?.contains("magnetic")) {
    event.target.style.transform = "";
  }
});

document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--rx", `${y * -8}deg`);
    card.style.setProperty("--ry", `${x * 10}deg`);
    card.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });
});

const canvas = document.querySelector("#signal-canvas");
const context = canvas?.getContext("2d");
const particles = Array.from({ length: 46 }, () => ({
  x: Math.random(),
  y: Math.random(),
  vx: (Math.random() - 0.5) * 0.0007,
  vy: (Math.random() - 0.5) * 0.0007,
  size: Math.random() * 2 + 0.6
}));

const resizeCanvas = () => {
  if (!canvas) return;
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
};

const drawSignals = () => {
  if (!context || !canvas) return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  context.scale(window.devicePixelRatio, window.devicePixelRatio);
  context.globalAlpha = 0.55;

  particles.forEach((particle, index) => {
    particle.x = (particle.x + particle.vx + 1) % 1;
    particle.y = (particle.y + particle.vy + 1) % 1;

    const x = particle.x * window.innerWidth;
    const y = particle.y * window.innerHeight;
    context.fillStyle = index % 3 === 0 ? "#52e3ff" : index % 3 === 1 ? "#ff3d52" : "#ffcf3d";
    context.beginPath();
    context.arc(x, y, particle.size, 0, Math.PI * 2);
    context.fill();

    particles.slice(index + 1).forEach((other) => {
      const ox = other.x * window.innerWidth;
      const oy = other.y * window.innerHeight;
      const distance = Math.hypot(x - ox, y - oy);
      if (distance > 135) return;
      context.strokeStyle = `rgba(82, 227, 255, ${0.14 * (1 - distance / 135)})`;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(ox, oy);
      context.stroke();
    });
  });

  context.restore();
  requestAnimationFrame(drawSignals);
};

resizeCanvas();
drawSignals();
window.addEventListener("resize", resizeCanvas);
