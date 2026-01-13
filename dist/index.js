var F = { exports: {} }, b = {};
const L = React;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var x;
function _() {
  if (x) return b;
  x = 1;
  var s = L, A = Symbol.for("react.element"), t = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, n = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, r = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(h, E, o) {
    var l, u = {}, y = null, g = null;
    o !== void 0 && (y = "" + o), E.key !== void 0 && (y = "" + E.key), E.ref !== void 0 && (g = E.ref);
    for (l in E) e.call(E, l) && !r.hasOwnProperty(l) && (u[l] = E[l]);
    if (h && h.defaultProps) for (l in E = h.defaultProps, E) u[l] === void 0 && (u[l] = E[l]);
    return { $$typeof: A, type: h, key: y, ref: g, props: u, _owner: n.current };
  }
  return b.Fragment = t, b.jsx = a, b.jsxs = a, b;
}
var U;
function q() {
  return U || (U = 1, F.exports = _()), F.exports;
}
var m = q();
const Z = Symbol(), O = Object.getPrototypeOf, J = /* @__PURE__ */ new WeakMap(), X = (s) => s && (J.has(s) ? J.get(s) : O(s) === Object.prototype || O(s) === Array.prototype), AA = (s) => X(s) && s[Z] || null, Y = (s, A = !0) => {
  J.set(s, A);
}, $ = {}, M = (s) => typeof s == "object" && s !== null, W = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakSet(), tA = (s = Object.is, A = (o, l) => new Proxy(o, l), t = (o) => M(o) && !z.has(o) && (Array.isArray(o) || !(Symbol.iterator in o)) && !(o instanceof WeakMap) && !(o instanceof WeakSet) && !(o instanceof Error) && !(o instanceof Number) && !(o instanceof Date) && !(o instanceof String) && !(o instanceof RegExp) && !(o instanceof ArrayBuffer), e = (o) => {
  switch (o.status) {
    case "fulfilled":
      return o.value;
    case "rejected":
      throw o.reason;
    default:
      throw o;
  }
}, n = /* @__PURE__ */ new WeakMap(), r = (o, l, u = e) => {
  const y = n.get(o);
  if (y?.[0] === l)
    return y[1];
  const g = Array.isArray(o) ? [] : Object.create(Object.getPrototypeOf(o));
  return Y(g, !0), n.set(o, [l, g]), Reflect.ownKeys(o).forEach((p) => {
    if (Object.getOwnPropertyDescriptor(g, p))
      return;
    const C = Reflect.get(o, p), { enumerable: Q } = Reflect.getOwnPropertyDescriptor(
      o,
      p
    ), w = {
      value: C,
      enumerable: Q,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: !0
    };
    if (z.has(C))
      Y(C, !1);
    else if (C instanceof Promise)
      delete w.value, w.get = () => u(C);
    else if (W.has(C)) {
      const [T, j] = W.get(
        C
      );
      w.value = r(
        T,
        j(),
        u
      );
    }
    Object.defineProperty(g, p, w);
  }), Object.preventExtensions(g);
}, a = /* @__PURE__ */ new WeakMap(), h = [1, 1], E = (o) => {
  if (!M(o))
    throw new Error("object required");
  const l = a.get(o);
  if (l)
    return l;
  let u = h[0];
  const y = /* @__PURE__ */ new Set(), g = (R, i = ++h[0]) => {
    u !== i && (u = i, y.forEach((c) => c(R, i)));
  };
  let p = h[1];
  const C = (R = ++h[1]) => (p !== R && !y.size && (p = R, w.forEach(([i]) => {
    const c = i[1](R);
    c > u && (u = c);
  })), u), Q = (R) => (i, c) => {
    const I = [...i];
    I[1] = [R, ...I[1]], g(I, c);
  }, w = /* @__PURE__ */ new Map(), T = (R, i) => {
    if (($ ? "production" : void 0) !== "production" && w.has(R))
      throw new Error("prop listener already exists");
    if (y.size) {
      const c = i[3](Q(R));
      w.set(R, [i, c]);
    } else
      w.set(R, [i]);
  }, j = (R) => {
    var i;
    const c = w.get(R);
    c && (w.delete(R), (i = c[1]) == null || i.call(c));
  }, K = (R) => (y.add(R), y.size === 1 && w.forEach(([c, I], k) => {
    if (($ ? "production" : void 0) !== "production" && I)
      throw new Error("remove already exists");
    const D = c[3](Q(k));
    w.set(k, [c, D]);
  }), () => {
    y.delete(R), y.size === 0 && w.forEach(([c, I], k) => {
      I && (I(), w.set(k, [c]));
    });
  }), H = Array.isArray(o) ? [] : Object.create(Object.getPrototypeOf(o)), P = A(H, {
    deleteProperty(R, i) {
      const c = Reflect.get(R, i);
      j(i);
      const I = Reflect.deleteProperty(R, i);
      return I && g(["delete", [i], c]), I;
    },
    set(R, i, c, I) {
      const k = Reflect.has(R, i), D = Reflect.get(R, i, I);
      if (k && (s(D, c) || a.has(c) && s(D, a.get(c))))
        return !0;
      j(i), M(c) && (c = AA(c) || c);
      let B = c;
      if (c instanceof Promise)
        c.then((N) => {
          c.status = "fulfilled", c.value = N, g(["resolve", [i], N]);
        }).catch((N) => {
          c.status = "rejected", c.reason = N, g(["reject", [i], N]);
        });
      else {
        !W.has(c) && t(c) && (B = E(c));
        const N = !z.has(B) && W.get(B);
        N && T(i, N);
      }
      return Reflect.set(R, i, B, I), g(["set", [i], c, D]), !0;
    }
  });
  a.set(o, P);
  const G = [
    H,
    C,
    r,
    K
  ];
  return W.set(P, G), Reflect.ownKeys(o).forEach((R) => {
    const i = Object.getOwnPropertyDescriptor(
      o,
      R
    );
    "value" in i && (P[R] = o[R], delete i.value, delete i.writable), Object.defineProperty(H, R, i);
  }), P;
}) => [
  // public functions
  E,
  // shared state
  W,
  z,
  // internal things
  s,
  A,
  t,
  e,
  n,
  r,
  a,
  h
], [eA] = tA();
function V(s = {}) {
  return eA(s);
}
globalThis.orca = globalThis.orca || {};
class oA {
  constructor(A) {
    this.baseURL = "https://readwise.io/api/v2", this.apiKey = A, this.requestState = V({
      isConnected: !1,
      lastError: null,
      requestCount: 0
    });
  }
  // 更新配置（响应 settingsChanged 广播）
  updateSettings(A) {
    this.apiKey = A.apiKey, this.requestState.lastError = null;
  }
  //🔐 统一请求封装与错误处理
  //请求拦截器 实现了与 main.ts 错误通知规范的对接：
  async makeRequest(A, t = {}) {
    if (!this.apiKey)
      throw new Error("AUTH_ERROR: Readwise API key not configured");
    const e = `${this.baseURL}${A}`, n = {
      headers: {
        Authorization: `Token ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      ...t
    };
    try {
      this.requestState.requestCount++;
      const r = await fetch(e, n);
      if (!r.ok) {
        const a = r.status === 401 ? "AUTH_ERROR" : r.status === 429 ? "RATE_LIMIT_ERROR" : "NETWORK_ERROR";
        throw new Error(`${a}: HTTP ${r.status} - ${await r.text()}`);
      }
      return await r.json();
    } catch (r) {
      throw this.requestState.lastError = r.message, console.error("Readwise API Request Failed:", r), r;
    }
  }
  //📖 分页获取所有高亮内容
  //核心同步接口 实现了基于游标的分页机制，支持增量同步：
  async getHighlights(A = null) {
    let t = [], e = null, n = 1;
    console.log(`🔄 Fetching highlights ${A ? `updated after ${A}` : "all time"}`);
    do {
      const r = new URLSearchParams({
        page_size: "1000"
        // Readwise API 允许的最大页大小
      });
      A && r.append("updated_after", A), e && r.append("page", n.toString());
      try {
        const a = await this.makeRequest(`/highlights?${r.toString()}`);
        a?.results ? (t = t.concat(a.results), console.log(`📄 Page ${n}: ${a.results.length} highlights`), e = a.next ? n + 1 : null, n++, await this.delay(100)) : e = null;
      } catch (a) {
        throw console.error(`❌ Failed to fetch page ${n}:`, a), a;
      }
    } while (e);
    return console.log(`✅ Total highlights fetched: ${t.length}`), t;
  }
  //📤 Export API - 推荐的导出端点
  //使用 Readwise Export API 获取所有高亮（包括书籍信息）
  async exportHighlights(A = null) {
    let t = [], e = null;
    console.log(`🔄 Exporting highlights ${A ? `updated after ${A}` : "all time"}`);
    do {
      const n = new URLSearchParams();
      e && n.append("pageCursor", e), A && n.append("updatedAfter", A), console.log(`Making export API request with params: ${n.toString()}`);
      try {
        const r = await this.makeRequest(`/export/?${n.toString()}`);
        r?.results ? (t = t.concat(r.results), e = r.nextPageCursor, console.log(`📄 Fetched ${r.results.length} books, total highlights so far: ${t.reduce((a, h) => a + (h.highlights?.length || 0), 0)}`)) : e = null, e && await this.delay(100);
      } catch (r) {
        throw console.error("❌ Failed to export page:", r), r;
      }
    } while (e);
    return console.log(`✅ Export complete: ${t.length} books`), t;
  }
  //🧪 连接测试接口
  //认证验证 为配置界面提供实时反馈：
  async testConnection() {
    try {
      const A = await this.makeRequest("/books?page_size=1");
      return this.requestState.isConnected = !0, !0;
    } catch {
      return this.requestState.isConnected = !1, !1;
    }
  }
  //📊 分类内容获取（支持同步所有分类）
  ////多类型支持 确保所有分类内容都能被同步：
  async getHighlightsByCategory(A, t = null) {
    const e = new URLSearchParams({
      category: A,
      page_size: "1000"
    });
    return t && e.append("updated_after", t), await this.makeRequest(`/highlights?${e.toString()}`);
  }
  // 支持的主要内容类型
  static get SupportedCategories() {
    return ["books", "articles", "tweets", "podcasts", "supplementals"];
  }
  //⚡ 性能优化与资源管理
  //请求控制 确保符合最小同步间隔要求：
  // 延迟函数，避免触发速率限制
  delay(A) {
    return new Promise((t) => setTimeout(t, A));
  }
  // 清理函数，供 main.ts 的 cleanupPlugin 调用
  cleanup() {
    this.requestState.isConnected = !1, this.requestState.lastError = null, this.requestState.requestCount = 0;
  }
  //🔄 与主流程的完整对接
  //方法签名 严格匹配 main.ts 的调用预期：
  // 供手动/自动同步调用的统一接口
  async syncHighlightsToOrca(A = null) {
    const t = Date.now(), e = await this.getHighlights(A);
    return {
      totalCount: e.length,
      newCount: A ? e.length : 0,
      duration: Date.now() - t,
      categories: [...new Set(e.map((n) => n.category))]
    };
  }
}
globalThis.orca = globalThis.orca || {};
const d = V({
  isSyncing: !1,
  lastSyncDate: null,
  syncStats: {
    totalHighlights: 0,
    newHighlights: 0,
    failedHighlights: 0,
    duration: 0,
    categories: []
  },
  error: null,
  progress: {
    current: 0,
    total: 0,
    message: ""
  }
});
class nA {
  constructor() {
    this.settings = null, this.readwiseAPI = null, this.cleanupFunctions = [], this.initializeSettings(), this.setupSettingsListener();
  }
  async initializeSettings() {
    try {
      this.settings = await orca.plugins.getData("readwise-sync", "settings"), this.settings || (this.settings = this.getDefaultSettings());
    } catch (A) {
      console.error("Failed to load sync settings:", A), this.settings = this.getDefaultSettings();
    }
  }
  getDefaultSettings() {
    return {
      apiKey: "",
      defaultSyncMode: "incremental",
      autoSyncEnabled: !1,
      syncInterval: 30,
      // 最小5分钟
      lastSyncDate: null,
      syncCategory: "all",
      includeTags: !0
    };
  }
  //🔄 增量同步核心逻辑
  //实现基于时间戳的高效增量同步，避免重复数据拉取：
  async performSync(A = "manual") {
    if (d.isSyncing)
      throw new Error("SYNC_IN_PROGRESS");
    d.isSyncing = !0, d.error = null, d.progress = { current: 0, total: 0, message: "准备同步..." };
    try {
      await this.validateConnection();
      let t = null;
      A === "full" ? (t = null, console.log("Performing full sync (all highlights)")) : A === "incremental" ? (t = this.settings.lastSyncDate, console.log("Performing incremental sync", t ? `after ${t}` : "(first sync)")) : (this.settings.defaultSyncMode || "incremental") === "full" ? (t = null, console.log("Performing full sync (default mode)")) : (t = this.settings.lastSyncDate, console.log("Performing incremental sync (default mode)", t ? `after ${t}` : "(first sync)"));
      const e = await this.syncHighlightsToOrca(t);
      return this.updateSyncStats(e, A), await this.saveLastSyncDate(), e;
    } catch (t) {
      throw d.error = t, t;
    } finally {
      d.isSyncing = !1, d.progress = { current: 0, total: 0, message: "" };
    }
  }
  //📊 分页处理与性能优化
  //处理 Readwise API 的分页响应，确保大数据量的稳定同步：
  async syncHighlightsToOrca(A = null) {
    const t = Date.now();
    d.progress.message = "获取高亮内容...";
    try {
      const e = await this.readwiseAPI.exportHighlights(A), n = [];
      for (const o of e)
        if (o.highlights && Array.isArray(o.highlights))
          for (const l of o.highlights)
            n.push({
              ...l,
              book_title: o.title,
              author: o.author,
              category: o.category || "books"
            });
      d.progress = {
        current: 0,
        total: n.length,
        message: `已获取 ${n.length} 条高亮`
      };
      const { createdBlocks: r, failedBlocks: a } = await this.createOrcaBlocks(n), h = this.categorizeHighlights(n), E = Date.now() - t;
      return {
        totalCount: n.length,
        newCount: r.length,
        failedCount: a.length,
        duration: E,
        categories: h
      };
    } catch (e) {
      throw console.error("Failed to fetch highlights:", e), new Error(`FETCH_ERROR: ${e.message}`);
    }
  }
  //🔍 数据过滤与分类处理
  //根据用户配置过滤和分类高亮内容：
  processHighlights(A, t) {
    const e = A.filter(
      (a) => this.shouldSyncHighlight(a)
    ), n = this.categorizeHighlights(e), r = Date.now() - t;
    return {
      totalCount: A.length,
      newCount: e.length,
      duration: r,
      categories: n,
      highlights: e
    };
  }
  shouldSyncHighlight(A) {
    return this.settings.lastSyncDate ? !(A.updated_at && A.updated_at <= this.settings.lastSyncDate || !this.isCategoryEnabled(A.category)) : !0;
  }
  categorizeHighlights(A) {
    const t = {};
    return A.forEach((e) => {
      const n = e.category || "uncategorized";
      t[n] = (t[n] || 0) + 1;
    }), t;
  }
  isCategoryEnabled(A) {
    return this.settings.syncCategory === "all" ? !0 : A === this.settings.syncCategory;
  }
  formatBlockContent(A) {
    let t = A.text || A.highlight || "";
    return A.book_title && (t += `

来源: ${A.book_title}`, A.author && (t += ` by ${A.author}`)), A.highlighted_at && (t += `
高亮时间: ${A.highlighted_at}`), t;
  }
  extractBlockProperties(A) {
    const t = [];
    return A.id && t.push({
      name: "readwise_id",
      type: "string",
      value: A.id.toString()
    }), A.category && t.push({
      name: "category",
      type: "string",
      value: A.category
    }), A.updated_at && t.push({
      name: "updated_at",
      type: "string",
      value: A.updated_at
    }), A.highlight_url && t.push({
      name: "highlight_url",
      type: "string",
      value: A.highlight_url
    }), t;
  }
  async addTagsToBlock(A, t) {
    if (!(!t || !Array.isArray(t) || t.length === 0))
      for (const e of t)
        try {
          orca.blocks.addTag && await orca.blocks.addTag(A, e.name || e);
        } catch (n) {
          console.error(`Failed to add tag ${e} to block ${A}:`, n);
        }
  }
  //💾 Orca 数据写入
  //将高亮内容转换为 Orca 块格式并写入系统：
  async createOrcaBlocks(A) {
    const t = [], e = [];
    console.log("Starting to create blocks for", A.length, "highlights");
    let n = null, r = await this.getActivePanel();
    if (r && (n = this.findRootBlock(r), console.log("Found root block from active panel:", n)), !n) {
      console.log("No root block from active panel, trying today's journal page");
      const o = await this.getOrCreateTodayJournalPage();
      o && (n = this.findRootBlock(o), console.log("Found root block from journal page:", n));
    }
    if (!n) {
      console.log("No root block from journal, searching for any root block");
      const o = orca.state?.blocks;
      if (o)
        for (const l in o) {
          const u = o[l];
          if (!u.parent && !u.left) {
            n = l, console.log("Found root block by iteration:", n, u);
            break;
          }
        }
    }
    if (!n)
      throw new Error("No root block found. Please open a document first.");
    console.log("Using root block ID:", n);
    const h = `Readwise Sync - ${(/* @__PURE__ */ new Date()).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })}`;
    let E = null;
    try {
      if (E = await orca.commands.invokeEditorCommand(
        "core.editor.insertBlock",
        null,
        n,
        "lastChild",
        [{ t: "t", v: h }]
      ), console.log("Created sync root block with ID:", E), E) {
        await orca.commands.invokeEditorCommand("core.editor.makeHeading2", null, E);
        try {
          await orca.commands.invokeEditorCommand(
            "core.editor.insertTag",
            null,
            E,
            "Readwise"
          ), console.log("Added Readwise tag to sync block");
        } catch (l) {
          console.warn("Failed to add tag to sync block:", l);
        }
        await this.delay(100), d.progress.total = A.length, d.progress.message = "创建 Orca 块...", console.log("Creating child blocks for", A.length, "highlights");
        for (let l = 0; l < A.length; l++) {
          const u = A[l], y = this.formatBlockContent(u);
          if (!y || y.trim() === "") {
            console.log("Skipping highlight with no text:", u);
            continue;
          }
          try {
            const g = await orca.commands.invokeEditorCommand(
              "core.editor.insertBlock",
              null,
              E,
              "lastChild",
              [{ t: "t", v: y }]
            );
            console.log(`Created block ${g} for highlight ${l + 1}:`, y.substring(0, 50));
            try {
              await orca.commands.invokeEditorCommand(
                "core.editor.insertTag",
                null,
                g,
                "Readwise"
              ), console.log(`Added Readwise tag to block ${g}`);
            } catch (p) {
              console.warn(`Failed to add tag to block ${g}:`, p);
            }
            t.push({ id: g, content: y }), d.progress.current = l + 1, d.progress.message = `已创建 ${l + 1}/${A.length} 个块`, (l + 1) % 10 === 0 && await this.delay(50);
          } catch (g) {
            console.error(`Failed to create block for highlight ${u.id}:`, g), e.push({ highlight: u, error: g });
          }
        }
        console.log("Created", t.length, "blocks, failed", e.length);
        const o = orca.state.blocks[E];
        o ? console.log("Sync block verification:", {
          id: o.id,
          text: o.text,
          content: o.content,
          children: o.children?.length || 0,
          parent: o.parent,
          left: o.left
        }) : console.warn("Sync block not found in orca.state.blocks after creation!");
      }
    } catch (o) {
      throw console.error("Failed to create sync block:", o), new Error("Failed to create sync block: " + o.message);
    }
    return { createdBlocks: t, failedBlocks: e };
  }
  // 获取当前活动的面板
  async getActivePanel() {
    if (console.log("Looking for active panel, orca.state:", orca.state), orca.state)
      if (orca.state.panels)
        for (const A in orca.state.panels) {
          const t = orca.state.panels[A];
          if (console.log("Checking panel:", A, t), t.view === "journal" || t.view === "block")
            return console.log("Found active panel:", t), t;
        }
      else {
        console.log("orca.state.panels is not available, trying alternative methods");
        try {
          const A = orca.state?.blocks;
          if (A) {
            console.log("Found blocks in state:", Object.keys(A).length);
            for (const t in A) {
              const e = A[t];
              if (!e.parent && !e.left)
                return console.log("Found root block by iterating blocks:", t, e), {
                  rootBlockId: t,
                  view: "block",
                  id: t
                };
            }
          }
        } catch (A) {
          console.error("Error finding root block:", A);
        }
      }
    return console.warn("No active panel found, falling back to today's journal page"), null;
  }
  // 获取或创建今日日记页面
  async getOrCreateTodayJournalPage() {
    try {
      const A = /* @__PURE__ */ new Date(), t = A.getFullYear(), e = String(A.getMonth() + 1).padStart(2, "0"), n = String(A.getDate()).padStart(2, "0"), r = `${t}-${e}-${n}`;
      console.log("Getting or creating journal page for date:", r);
      try {
        const a = await orca.commands.invokeCommand("core.journal.getJournalBlock", r);
        if (a)
          return console.log("Found today's journal block:", a), {
            rootBlockId: a.id || a,
            view: "journal",
            id: a.id || a
          };
      } catch (a) {
        console.log("Journal block command failed, trying alternative method:", a);
      }
      try {
        const a = orca.state?.blocks;
        if (a)
          for (const h in a) {
            const E = a[h];
            if (E.text && (E.text.includes(r) || E.text.includes("Journal")))
              return console.log("Found potential journal block by text:", h, E), {
                rootBlockId: h,
                view: "journal",
                id: h
              };
          }
      } catch (a) {
        console.log("Failed to search for journal block:", a);
      }
      return console.warn("Could not get or create journal page"), null;
    } catch (A) {
      return console.error("Error getting today's journal page:", A), null;
    }
  }
  // 在面板中找到根块（没有 parent 的块）
  findRootBlock(A) {
    if (!A || !A.rootBlockId)
      return null;
    const t = orca.state.blocks[A.rootBlockId];
    if (t)
      return console.log("Found root block:", t), A.rootBlockId;
    for (const e in orca.state.blocks) {
      const n = orca.state.blocks[e];
      if (!n.parent)
        return console.log("Found root block by iteration:", n), e;
    }
    return null;
  }
  // 获取或创建 Readwise 分类块
  async getOrCreateReadwiseBlock() {
    try {
      const A = await orca.invokeBackend("get-block-by-alias", "Readwise");
      if (A)
        return console.log("Found existing Readwise block:", A), A;
    } catch {
      console.log("Readwise block not found, will create new one");
    }
    try {
      const A = await orca.commands.invokeEditorCommand(
        "core.editor.insertBlock",
        null,
        null,
        // refBlock 为 null，插入到根级别
        "lastChild",
        [{ t: "t", v: "Readwise Highlights" }]
      );
      if (A) {
        await orca.commands.invokeEditorCommand("core.editor.makeHeading2", null, A), await orca.commands.invokeEditorCommand(
          "core.editor.createAlias",
          null,
          "Readwise",
          A
        );
        const t = orca.state.blocks[A];
        if (t)
          return console.log("Created new Readwise block:", t), t;
      }
    } catch (A) {
      console.error("Failed to create Readwise block:", A);
    }
    throw new Error("Failed to create Readwise block");
  }
  async createHighlightBlock(A) {
    const t = this.formatBlockContent(A), e = await this.getOrCreateReadwiseBlock();
    if (!e)
      throw new Error("Readwise block not found");
    return { id: await orca.commands.invokeEditorCommand(
      "core.editor.insertBlock",
      null,
      e,
      "lastChild",
      [{ t: "t", v: t }]
    ) };
  }
  formatContentForOrca(A) {
    return [{ t: "t", v: A }];
  }
  //⚡ 自动同步管理
  //管理定时同步任务，确保配置变更时的正确重新调度：
  setupAutoSync() {
    if (this.cleanupAutoSync(), this.settings.autoSyncEnabled && this.settings.apiKey) {
      const A = Math.max(5, this.settings.syncInterval) * 60 * 1e3;
      this.autoSyncInterval = setInterval(() => {
        this.performAutoSync();
      }, A), this.cleanupFunctions.push(() => {
        clearInterval(this.autoSyncInterval);
      });
    }
  }
  // 清理自动同步定时器
  cleanupAutoSync() {
    this.autoSyncInterval && (clearInterval(this.autoSyncInterval), this.autoSyncInterval = null);
  }
  async performAutoSync() {
    if (d.isSyncing) {
      console.log("Auto sync skipped: manual sync in progress");
      return;
    }
    try {
      await this.performSync("auto"), console.log("Auto sync completed successfully");
    } catch (A) {
      console.error("Auto sync failed:", A);
    }
  }
  //🔧 设置变更监听
  //实时响应设置变更，动态调整同步行为：
  setupSettingsListener() {
    const A = async (t, e) => {
      t === "readwise-sync" && (this.settings = { ...this.settings, ...e }, this.setupAutoSync(), this.readwiseAPI && e.apiKey && this.readwiseAPI.updateSettings(e));
    };
    orca.broadcasts.registerHandler("core.settingsChanged", A), this.cleanupFunctions.push(() => {
      orca.broadcasts.unregisterHandler("core.settingsChanged", A);
    });
  }
  //🧹 资源清理与生命周期管理
  //确保插件卸载时的资源正确释放：
  cleanup() {
    this.cleanupFunctions.forEach((A) => A()), this.readwiseAPI && this.readwiseAPI.cleanup(), d.isSyncing = !1, d.error = null, d.progress = { current: 0, total: 0, message: "" };
  }
  delay(A) {
    return new Promise((t) => setTimeout(t, A));
  }
  //📈 统计信息暴露
  //提供同步统计信息供主入口文件使用：
  getStats() {
    return {
      isSyncing: d.isSyncing,
      lastSyncDate: d.lastSyncDate,
      ...d.syncStats
    };
  }
  updateSyncStats(A, t) {
    d.syncStats = {
      totalHighlights: A.totalCount,
      newHighlights: A.newCount,
      failedHighlights: A.failedCount || 0,
      duration: A.duration,
      categories: A.categories,
      triggerType: t,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }, d.lastSyncDate = (/* @__PURE__ */ new Date()).toISOString();
  }
  //🔐 连接验证与错误处理
  async validateConnection() {
    try {
      const t = await orca.plugins.getData("readwise-sync", "settings");
      t && (this.settings = { ...this.settings, ...t }, console.log("Loaded settings for validation:", this.settings));
    } catch (t) {
      console.error("Failed to load settings for validation:", t);
    }
    if (!this.settings.apiKey)
      throw new Error("AUTH_ERROR: API key not configured");
    if (this.readwiseAPI ? this.readwiseAPI.updateSettings(this.settings) : this.readwiseAPI = new oA(this.settings), !await this.readwiseAPI.testConnection())
      throw new Error("AUTH_ERROR: Invalid API key or connection failed");
  }
  async saveLastSyncDate() {
    this.settings.lastSyncDate = (/* @__PURE__ */ new Date()).toISOString(), await orca.plugins.setData("readwise-sync", "settings", this.settings);
  }
}
const f = new nA(), sA = "data:image/png;base64,AAABAAMAMDAAAAEACACoDgAANgAAACAgAAABAAgAqAgAAN4OAAAQEAAAAQAIAGgFAACGFwAAKAAAADAAAABgAAAAAQAIAAAAAAAACQAAAAAAAAAAAAAAAQAAAAAAAAAAAAC3t7QAFxcXAEBAPwBpaWcAu7u3AOTk3wDS0s4AbW1qAPv79gDt7egAJCQjALKyrwDb29cAOzs6ABYWFQDNzckA9vbxAAQEBAD6+vQAlpaTAL+/uwCEhIIAHx8eAK2tqgANDQ0AX19dAJ+fnADIyMQAkZGOALq6tgDj494Af399AKiopQDR0c0A+vr1AAgICABaWlgA/v74AHFxbwAMDAsAmpqXADU1MwDa2tYAY2NhAIyMiQC1tbEA9fXwAAMDAwBVVVMA4+PfAL6+ugCsrKkA/v75AIeHhAAjIyMAx8fDACcnJgDe3toAPj49AGdnZQCQkI0Aubm1AFVVVAB+fnwAp6ekAEJCQABra2gA+fn0ADAwLwCCgn8A/f33AP7++gDCwr4A6+vmANnZ1QAQEBAAOTk4APDw7ACLi4gAtLSwAAICAgDi4t4AfX16AAYGBQDm5uEA/f34AP///gAiIiIAnZ2aACYmJQB4eHUAZmZkAI+PjAC4uLQApqajAPj48wAGBgYALy8uAB0dHQD8/PYARkZFAG9vbQCYmJUAwcG9AOrq5QCGhoQAr6+sAEpKSAAPDw8AYWFfAIqKhwATExIA8/PuAAEBAQAqKikAGBgYAEFBQABqamgAWFhXAIGBfwAcHBsA09PPAPz89wCFhYIArq6qAEpKSQCcnJkAxcXBAO7u6QAlJSQAs7OwANzc2AA8PDsAZWVjAI6OiwAXFxYAzs7KAAUFBQAuLi0A5eXhAICAfQBubmwACQkIAOnp5ACJiYYAEhIRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYVhaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpYYQAAWBAyUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUjIQWAAAWjJ7IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI3syWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjREREREREI1ZWVlZWVlZWVlZWRyNERERERCNWVlZWVlZWViNERERERCNSWgAAWlIjREREREQJHCCNjY2NjY2NjY2NfIQJRERECUt8jY2NjY2NeCIJRERERCNSWgAAWlIjRERERERWFAAAAAAAAAAAAAAAKBVHREREEYYAAAAAAAAAMCFWRERERCNSWgAAWlIjREREREQjOkEIbQAAAAAAAGNAa2kjRER7g20AAAAAAIpsfx8jRERERCNSWgAAWlIjRERERERECSZgbgAAAAAAAC01ViNERCOQdQAAAAAAcgQKNSNERERERCNSWgAAWlIjRERERERERERWbwAAAAAAYS5WRERERAmHMAAAAAAATR8JRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WREREZAc3AAAAAAAZGHtERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WREREEVwAAAAAAAAsLxNERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRER7UG0AAAAAADcHe0RERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRCOQQgAAAAAAEj0JRERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRAldMAAAAAAAZUojRERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WCXoLAAAAAABwHntERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WETwAAAAAAAAnYERERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJAVXLm0AAAAAAIsNCURERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAEiw2KgAAAAAAMC1EViNERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAAAAAUYI/WVV7RERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAAAAAAAAAEg4zCURERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAABdaVAAAAAAAAAAAAAA3OHtERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAJKRfVN3A0U5AnIAAAAAMXFERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAB5AUhgTpCMaxkAAAAADxB7RERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAC0l7IyM1Po8AAAAAMF9WRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAGKJe0RWKQAAAAAAAB1WRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAACFS3t7jQAAAAAAAIdWRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAflJWdgAAAAAAchtWRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAACVpGgAAAAAATIB7RERERERERCNSWgAAWlIjRERERERERERWTwAAAAAAAAAAAAAAAFF2MQAAAAAAZYEjRERERERERCNSWgAAWlIjREREREREI1Z7QwAAAAAAAAAAAAAAAAAkDwAAAAB0XntERERERERERCNSWgAAWlIjREREREQjBl5GiAAAAAAAAAAAAAAAAAAAAAAAcnM0RERERERERERERCNSWgAAWlIjRERERERWZzAAAAAAAAAAAAAAAAAAAAAAYQI7aisJRERERERERERERCNSWgAAWlIjREREREQJaI5mZmZmZmZmZmZmZmYnWxZnDAeBewlERERERERERERERCNSWgAAWlIjREREREREIwkJCQkJCQkJCQkJCQlke1ZWVgkjRERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWjJ7IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI3syWgAAWBAyUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUjIQWAAAYVhaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpYYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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";
let S;
async function EA(s) {
  S = s, console.log(`${S} plugin enabled`), orca.themes.injectCSSResource(`${S}/dist/index.css`, S), await orca.plugins.setSettingsSchema(S, {
    apiKey: {
      label: "API Key",
      description: "Your Readwise access token. Get it from https://readwise.io/access_token",
      type: "string"
    },
    defaultSyncMode: {
      label: "Default Sync Mode",
      description: "Incremental sync only fetches new highlights since last sync. Full sync fetches all highlights.",
      type: "string",
      defaultValue: "incremental"
    },
    autoSyncEnabled: {
      label: "Auto Sync",
      description: "Automatically sync highlights at regular intervals",
      type: "boolean",
      defaultValue: !1
    },
    syncInterval: {
      label: "Sync Interval (minutes)",
      description: "Minimum interval is 5 minutes",
      type: "number",
      defaultValue: 60
    },
    syncCategory: {
      label: "Sync Category",
      description: "Choose which category of highlights to sync",
      type: "string",
      defaultValue: "all",
      enum: ["all", "books", "articles", "tweets", "supplementals", "podcasts"]
    },
    includeTags: {
      label: "Include Tags",
      description: "Include tags when importing highlights",
      type: "boolean",
      defaultValue: !0
    }
  }), await iA(S);
}
async function gA() {
  console.log("Readwise Sync plugin disabled"), await lA();
  try {
    orca.themes.removeCSSResources(S);
  } catch {
  }
  try {
    orca.headbar?.unregisterHeadbarButton?.(`${S}.sync`);
  } catch {
  }
  try {
    orca.commands.unregisterCommand(`${S}.sync`);
  } catch {
  }
  try {
    orca.commands.unregisterCommand(`${S}.testConnection`);
  } catch {
  }
}
async function v() {
  const s = {
    apiKey: "",
    defaultSyncMode: "incremental",
    autoSyncEnabled: !1,
    syncInterval: 60,
    lastSyncDate: "",
    syncCategory: "all",
    includeTags: !0
  };
  try {
    return await orca.plugins.getData("readwise-sync", "settings") || s;
  } catch {
    return s;
  }
}
function aA(s) {
  orca.state.commands?.[`${s}.sync`] == null && orca.commands.registerCommand(
    `${s}.sync`,
    async () => {
      try {
        const A = orca.state.plugins[s]?.settings || await v();
        if (f.settings = { ...f.settings, ...A }, !f.settings.apiKey) {
          orca.notify("error", "Please configure your Readwise API Key in settings");
          return;
        }
        orca.notify("info", "Starting incremental sync...");
        const t = await f.performSync("incremental");
        orca.notify("success", `Sync completed: ${t.newCount || 0} new highlights`);
      } catch (A) {
        orca.notify("error", `Sync failed: ${A?.message || String(A)}`);
      }
    },
    "Sync Readwise Highlights (Incremental)"
  ), orca.state.commands?.[`${s}.fullSync`] == null && orca.commands.registerCommand(
    `${s}.fullSync`,
    async () => {
      try {
        const A = orca.state.plugins[s]?.settings || await v();
        if (f.settings = { ...f.settings, ...A }, !f.settings.apiKey) {
          orca.notify("error", "Please configure your Readwise API Key in settings");
          return;
        }
        orca.notify("info", "Starting full sync...");
        const t = await f.performSync("full");
        orca.notify("success", `Full sync completed: ${t.newCount || 0} highlights`);
      } catch (A) {
        orca.notify("error", `Sync failed: ${A?.message || String(A)}`);
      }
    },
    "Full Sync Readwise Highlights"
  ), orca.state.commands?.[`${s}.testConnection`] == null && orca.commands.registerCommand(
    `${s}.testConnection`,
    async () => {
      try {
        const A = orca.state.plugins[s]?.settings || await v();
        return f.settings = { ...f.settings, ...A }, f.settings.apiKey ? (await f.validateConnection(), orca.notify("success", "Readwise connection successful"), !0) : (orca.notify("error", "Please configure your Readwise API Key in settings"), !1);
      } catch (A) {
        return orca.notify("error", `Readwise connection failed: ${A?.message || "Unknown error"}`), !1;
      }
    },
    "Test Readwise Connection"
  );
}
function rA(s) {
  if (orca.state.headbarButtons?.[`${s}.sync`] == null)
    try {
      const A = orca.components.Button, t = orca.components.HoverContextMenu, e = orca.components.MenuText;
      if (!A || !t || !e) {
        console.error("[Readwise Sync] Required components not available");
        return;
      }
      orca.headbar.registerHeadbarButton(
        `${s}.sync`,
        () => /* @__PURE__ */ m.jsx(
          t,
          {
            menu: (n) => /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
              /* @__PURE__ */ m.jsx(
                e,
                {
                  title: "Sync Now (Incremental)",
                  onClick: async () => {
                    n(), await orca.commands.invokeCommand(`${s}.sync`);
                  }
                }
              ),
              /* @__PURE__ */ m.jsx(
                e,
                {
                  title: "Full Sync (All Highlights)",
                  onClick: async () => {
                    n(), await orca.commands.invokeCommand(`${s}.fullSync`);
                  }
                }
              ),
              /* @__PURE__ */ m.jsx(
                e,
                {
                  title: "Test Connection",
                  onClick: async () => {
                    n(), await orca.commands.invokeCommand(`${s}.testConnection`);
                  }
                }
              )
            ] }),
            children: /* @__PURE__ */ m.jsx(
              A,
              {
                variant: "plain",
                onClick: () => orca.commands.invokeCommand(`${s}.sync`),
                children: /* @__PURE__ */ m.jsx("img", { className: "readwise-sync-button", src: sA, alt: "Readwise Sync" })
              }
            )
          }
        )
      ), console.log("[Readwise Sync] Headbar button registered successfully");
    } catch (A) {
      console.error("[Readwise Sync] Failed to register headbar button:", A);
    }
  else
    console.log("[Readwise Sync] Headbar button already registered");
}
function cA(s) {
  f.settings = { ...f.settings, ...s }, typeof f.setupAutoSync == "function" && f.setupAutoSync();
}
async function iA(s) {
  const A = await v();
  cA(A), aA(s), await new Promise((t) => setTimeout(t, 100)), rA(s);
}
async function lA() {
  typeof f.cleanup == "function" && f.cleanup();
}
export {
  EA as load,
  gA as unload
};
