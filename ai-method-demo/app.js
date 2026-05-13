const data = window.demoData;
let activeCaseId = data.cases[0]?.id || 1;
let activeStep = 0;

const operationSteps = [
  {
    step: "01",
    title: "在扣子编程中一键部署 OpenClaw",
    subtitle: "先搭出 7×24 小时在线的智能助手底座。",
    goal: "完成项目创建、版本选择和渠道配置，让后续测试 Agent 能稳定运行。",
    actions: [
      "登录扣子编程，进入一键部署 OpenClaw 区域。",
      "点击“立刻领取”，选择满血版或省流版。",
      "确认渠道配置；如果暂不发布渠道，可先在 Web UI 中对话验证。",
    ],
    images: [
      { src: "assets/docx-media/demo_doc-001.png", caption: "扣子编程首页的一键部署入口" },
      { src: "assets/docx-media/demo_doc-002.png", caption: "选择 OpenClaw 版本与配置" },
    ],
  },
  {
    step: "02",
    title: "部署飞书渠道并完成授权",
    subtitle: "让 OpenClaw 助手进入真实办公沟通场景。",
    goal: "创建飞书机器人，完成权限、长连接、事件回调和账号授权。",
    actions: [
      "进入 OpenClaw 配置页，确认飞书机器人名称。",
      "点击授权并登录飞书，系统自动创建机器人应用。",
      "回到飞书客户端，确认机器人可被唤起和对话。",
    ],
    images: [
      { src: "assets/docx-media/demo_doc-003.png", caption: "配置页中创建飞书机器人" },
      { src: "assets/docx-media/demo_doc-004.png", caption: "飞书授权确认弹窗" },
      { src: "assets/docx-media/demo_doc-006.png", caption: "飞书机器人入口" },
    ],
  },
  {
    step: "03",
    title: "初始配置：确认状态、命名与业务场景",
    subtitle: "让系统理解“我要测试亲智聊 Agent 的对话质量”。",
    goal: "检查助手状态，修改机器人名称，并把批量测试业务目标输入给小龙虾。",
    actions: [
      "询问当前状态，确认服务可用。",
      "按演示需要修改机器人名称，方便评委识别。",
      "输入业务场景：批量测试亲智聊 Agent 输出质量、输出时间和可优化方向。",
    ],
    images: [
      { src: "assets/docx-media/demo_doc-005.png", caption: "询问助手当前状态" },
      { src: "assets/docx-media/demo_doc-007.png", caption: "输入家长画像与测试 Agent 设定" },
    ],
  },
  {
    step: "04",
    title: "定义家长画像 Agent 与输出格式",
    subtitle: "用模拟家长驱动亲智聊，形成可复现的多轮对话。",
    goal: "把家长画像、测试目的、对话轮次、报告字段提前结构化。",
    actions: [
      "定义家长画像 Agent：身份、目的、反应方式和追问方向。",
      "观察小龙虾理解程度，沿着它给出的框架继续补充。",
      "固定输出格式，让每轮对话、评分、响应时间都能进入报告。",
      "授权飞书文档/表格写入，保证报告能自动沉淀。",
    ],
    images: [
      { src: "assets/docx-media/demo_doc-008.png", caption: "继续完善家长画像与测试需求" },
      { src: "assets/docx-media/demo_doc-009.png", caption: "小龙虾生成测试框架" },
      { src: "assets/docx-media/demo_doc-010.png", caption: "逐步贴近项目理解" },
      { src: "assets/docx-media/demo_doc-011.png", caption: "输出格式基本成型" },
      { src: "assets/docx-media/demo_doc-012.png", caption: "授权飞书文档/表格调用" },
      { src: "assets/docx-media/demo_doc-013.png", caption: "授权成功后的确认提示" },
    ],
  },
  {
    step: "05",
    title: "配置具体评测场景并生成报告",
    subtitle: "把评测维度颗粒度化，让结果能被比较、被复盘。",
    goal: "明确每个测试案例的目的、维度定义、评分标准、Bot ID/API 调用和飞书输出地址。",
    actions: [
      "继续按小龙虾指引确认协作方式。",
      "细化评测要点：准确性、场景相关性、可操作性、同理心、个性化等。",
      "调用 Coze 中亲智聊智能体的 Bot ID 和 API。",
      "要求结果写入飞书文档，生成完整测试案例报告。",
    ],
    images: [
      { src: "assets/docx-media/demo_doc-014.png", caption: "明确需要补充的关键问题" },
      { src: "assets/docx-media/demo_doc-015.png", caption: "配置 Bot ID、API 与评测细节" },
      { src: "assets/docx-media/demo_doc-016.png", caption: "生成 15 个案例测试汇总表" },
    ],
  },
  {
    step: "06",
    title: "更精细化测试与迁移备份",
    subtitle: "让演示不只可运行，还能可迭代、可迁移。",
    goal: "为每个案例增加测试目的，并准备下载备份，防止环境切换影响演示。",
    actions: [
      "在每个案例里加入“测试目的”，定位提示词问题。",
      "执行迁移备份指令，生成下载地址。",
      "将备份上传到新的小龙虾环境，完成内容迁移。",
    ],
    images: [
      { src: "assets/docx-media/demo_doc-017.png", caption: "迁移备份指令输入" },
      { src: "assets/docx-media/demo_doc-018.png", caption: "生成下载地址与备份内容" },
      { src: "assets/docx-media/demo_doc-019.png", caption: "最终报告/文档入口效果" },
    ],
  },
];

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
  const target = $("#operationDemo");
  if (!target) return;

  const totalScreenshots = operationSteps.reduce((sum, item) => sum + item.images.length, 0);
  const quickStats = [
    ["演示步骤", `${operationSteps.length} 步`],
    ["过程截图", `${totalScreenshots} 张`],
    ["最终产出", "飞书测试报告"],
  ];

  target.innerHTML = `
    <div class="operation-summary">
      ${quickStats
        .map(
          ([label, value]) => `
            <div>
              <span>${escapeHtml(label)}</span>
              <strong>${escapeHtml(value)}</strong>
            </div>
          `
        )
        .join("")}
    </div>
    <div class="operation-steps">
      ${operationSteps.map(renderOperationStep).join("")}
    </div>
  `;
}

function renderOperationStep(item) {
  const screenshots = item.images
    .map(
      (image, index) => `
        <a class="operation-shot ${index === 0 ? "featured" : ""}" href="${escapeHtml(image.src)}" target="_blank" rel="noreferrer">
          <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.caption)}" />
          <span>${escapeHtml(image.caption)}</span>
        </a>
      `
    )
    .join("");

  return `
    <article class="operation-step">
      <div class="operation-copy">
        <span class="operation-number">${escapeHtml(item.step)}</span>
        <p class="eyebrow">操作步骤</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="operation-subtitle">${escapeHtml(item.subtitle)}</p>
        <div class="operation-goal">
          <strong>目标</strong>
          <p>${escapeHtml(item.goal)}</p>
        </div>
        <ol class="operation-actions">
          ${item.actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}
        </ol>
      </div>
      <div class="operation-media">
        ${screenshots}
      </div>
    </article>
  `;
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
