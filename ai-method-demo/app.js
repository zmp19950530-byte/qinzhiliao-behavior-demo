const data = window.demoData;
let activeCaseId = data.cases[0]?.id || 1;
let activeStep = 0;

const $ = (selector) => document.querySelector(selector);

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderHeroMetrics() {
  const metricItems = [
    ["综合平均分", `${data.metrics.avgScore}/5`],
    ["典型案例", `${data.metrics.caseCount} 个`],
    ["完整 AI 回复", `${data.metrics.roundCount} 条`],
    ["平均推理时间", `${data.metrics.avgTime} 秒`],
  ];

  $("#heroMetrics").innerHTML = metricItems
    .map(
      ([label, value]) => `
        <div>
          <dt>${escapeHtml(label)}</dt>
          <dd>${escapeHtml(value)}</dd>
        </div>
      `
    )
    .join("");

  $("#avgScore").textContent = data.metrics.avgScore;
  $("#caseCount").textContent = data.metrics.caseCount;
  $("#roundCount").textContent = data.metrics.roundCount;
  $("#avgTime").textContent = `${data.metrics.avgTime}s`;
}

function renderWorkflow() {
  const list = $("#workflowSteps");
  list.innerHTML = data.workflow
    .map(
      (item, index) => `
        <button class="step-button ${index === activeStep ? "active" : ""}" type="button" data-step="${index}">
          <span class="step-number">${escapeHtml(item.step)}</span>
          <span>
            <span class="step-title">${escapeHtml(item.title)}</span>
            <span class="step-copy">${escapeHtml(item.text)}</span>
          </span>
        </button>
      `
    )
    .join("");

  const current = data.workflow[activeStep];
  $("#workflowImage").src = current.image;
  $("#workflowImage").alt = current.title;
  $("#workflowCaption").textContent = `${current.step} · ${current.title}`;

  list.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeStep = Number(button.dataset.step);
      renderWorkflow();
    });
  });
}

function renderDimensions() {
  const dimensions = data.dimensions.filter(
    (item) => !["综合平均分", "平均推理时间"].includes(item.name)
  );

  $("#dimensionList").innerHTML = dimensions
    .map((item) => {
      const width = Math.max(0, Math.min(100, (item.value / 5) * 100));
      const label = item.level.replace("✅", "").replace("⚠️", "").trim();
      return `
        <div class="dimension-row">
          <span class="dimension-name">${escapeHtml(item.name)}</span>
          <span class="bar-track" aria-hidden="true">
            <span class="bar-fill" style="--score-width: ${width}%"></span>
          </span>
          <span class="dimension-score">${escapeHtml(item.label)} · ${escapeHtml(label)}</span>
        </div>
      `;
    })
    .join("");
}

function renderCaseList() {
  $("#caseList").innerHTML = data.cases
    .map(
      (item) => `
        <button class="case-button ${item.id === activeCaseId ? "active" : ""}" type="button" data-case-id="${item.id}">
          <span>案例 ${item.id}</span>
          <strong>${escapeHtml(item.title)}</strong>
          <small>${escapeHtml(item.purpose)} · ${escapeHtml(item.average)}/5 · ${escapeHtml(item.time)}秒</small>
        </button>
      `
    )
    .join("");

  $("#caseList").querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeCaseId = Number(button.dataset.caseId);
      renderCaseList();
      renderCaseDetail();
    });
  });
}

function renderCaseDetail() {
  const item = data.cases.find((entry) => entry.id === activeCaseId) || data.cases[0];
  const aiReplies = item.conversation.filter((message) => message.role === "AI").length;
  const conversation = item.conversation
    .map((message) => {
      const isAi = message.role === "AI";
      const time = isAi && message.time !== "-" ? `<span class="time-badge">响应时间 ${escapeHtml(message.time)}</span>` : "";
      return `
        <div class="message ${isAi ? "ai" : "parent"}">
          <span class="speaker">${escapeHtml(message.role)}</span>
          <div class="bubble">
            <p>${escapeHtml(message.content)}</p>
            ${time}
          </div>
        </div>
      `;
    })
    .join("");

  const scores = item.scores
    .slice(0, 9)
    .map(
      (score) => `
        <div class="mini-score">
          <strong>${escapeHtml(score.name)}</strong>
          <span>${escapeHtml(score.score)}/5</span>
        </div>
      `
    )
    .join("");

  $("#caseDetail").innerHTML = `
    <div class="case-hero">
      <p class="eyebrow">案例 ${escapeHtml(item.id)}</p>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.purpose)}</p>
      <div class="case-meta">
        <span class="pill">平均分 ${escapeHtml(item.average)}/5</span>
        <span class="pill">平均响应 ${escapeHtml(item.time)} 秒</span>
        <span class="pill">${escapeHtml(aiReplies)} 条 AI 回复</span>
      </div>
    </div>
    <div class="conversation">
      ${conversation}
    </div>
    <div class="case-scores">
      <h4>维度评分</h4>
      <div class="mini-score-grid">${scores}</div>
    </div>
  `;
}

function renderEvidence() {
  $("#evidenceGrid").innerHTML = data.evidence
    .map(
      (item) => `
        <figure class="evidence-card">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" />
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.caption)}</p>
          </div>
        </figure>
      `
    )
    .join("");
}

function renderRoadmap() {
  $("#roadmapGrid").innerHTML = data.optimizations
    .map(
      (item) => `
        <article class="roadmap-card">
          <span>${escapeHtml(item.priority)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
        </article>
      `
    )
    .join("");
}

function init() {
  renderHeroMetrics();
  renderWorkflow();
  renderDimensions();
  renderCaseList();
  renderCaseDetail();
  renderEvidence();
  renderRoadmap();
}

init();
