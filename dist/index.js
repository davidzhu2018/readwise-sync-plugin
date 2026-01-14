var M = { exports: {} }, B = {};
const G = React;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var U;
function _() {
  if (U) return B;
  U = 1;
  var s = G, A = Symbol.for("react.element"), t = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, n = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function r(R, c, o) {
    var h, f = {}, u = null, y = null;
    o !== void 0 && (u = "" + o), c.key !== void 0 && (u = "" + c.key), c.ref !== void 0 && (y = c.ref);
    for (h in c) e.call(c, h) && !a.hasOwnProperty(h) && (f[h] = c[h]);
    if (R && R.defaultProps) for (h in c = R.defaultProps, c) f[h] === void 0 && (f[h] = c[h]);
    return { $$typeof: A, type: R, key: u, ref: y, props: f, _owner: n.current };
  }
  return B.Fragment = t, B.jsx = r, B.jsxs = r, B;
}
var O;
function q() {
  return O || (O = 1, M.exports = _()), M.exports;
}
var k = q();
const Z = Symbol(), Y = Object.getPrototypeOf, J = /* @__PURE__ */ new WeakMap(), X = (s) => s && (J.has(s) ? J.get(s) : Y(s) === Object.prototype || Y(s) === Array.prototype), AA = (s) => X(s) && s[Z] || null, V = (s, A = !0) => {
  J.set(s, A);
}, $ = {}, F = (s) => typeof s == "object" && s !== null, D = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakSet(), tA = (s = Object.is, A = (o, h) => new Proxy(o, h), t = (o) => F(o) && !T.has(o) && (Array.isArray(o) || !(Symbol.iterator in o)) && !(o instanceof WeakMap) && !(o instanceof WeakSet) && !(o instanceof Error) && !(o instanceof Number) && !(o instanceof Date) && !(o instanceof String) && !(o instanceof RegExp) && !(o instanceof ArrayBuffer), e = (o) => {
  switch (o.status) {
    case "fulfilled":
      return o.value;
    case "rejected":
      throw o.reason;
    default:
      throw o;
  }
}, n = /* @__PURE__ */ new WeakMap(), a = (o, h, f = e) => {
  const u = n.get(o);
  if (u?.[0] === h)
    return u[1];
  const y = Array.isArray(o) ? [] : Object.create(Object.getPrototypeOf(o));
  return V(y, !0), n.set(o, [h, y]), Reflect.ownKeys(o).forEach((S) => {
    if (Object.getOwnPropertyDescriptor(y, S))
      return;
    const p = Reflect.get(o, S), { enumerable: I } = Reflect.getOwnPropertyDescriptor(
      o,
      S
    ), E = {
      value: p,
      enumerable: I,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: !0
    };
    if (T.has(p))
      V(p, !1);
    else if (p instanceof Promise)
      delete E.value, E.get = () => f(p);
    else if (D.has(p)) {
      const [C, b] = D.get(
        p
      );
      E.value = a(
        C,
        b(),
        f
      );
    }
    Object.defineProperty(y, S, E);
  }), Object.preventExtensions(y);
}, r = /* @__PURE__ */ new WeakMap(), R = [1, 1], c = (o) => {
  if (!F(o))
    throw new Error("object required");
  const h = r.get(o);
  if (h)
    return h;
  let f = R[0];
  const u = /* @__PURE__ */ new Set(), y = (g, l = ++R[0]) => {
    f !== l && (f = l, u.forEach((i) => i(g, l)));
  };
  let S = R[1];
  const p = (g = ++R[1]) => (S !== g && !u.size && (S = g, E.forEach(([l]) => {
    const i = l[1](g);
    i > f && (f = i);
  })), f), I = (g) => (l, i) => {
    const m = [...l];
    m[1] = [g, ...m[1]], y(m, i);
  }, E = /* @__PURE__ */ new Map(), C = (g, l) => {
    if (($ ? "production" : void 0) !== "production" && E.has(g))
      throw new Error("prop listener already exists");
    if (u.size) {
      const i = l[3](I(g));
      E.set(g, [l, i]);
    } else
      E.set(g, [l]);
  }, b = (g) => {
    var l;
    const i = E.get(g);
    i && (E.delete(g), (l = i[1]) == null || l.call(i));
  }, Q = (g) => (u.add(g), u.size === 1 && E.forEach(([i, m], P) => {
    if (($ ? "production" : void 0) !== "production" && m)
      throw new Error("remove already exists");
    const j = i[3](I(P));
    E.set(P, [i, j]);
  }), () => {
    u.delete(g), u.size === 0 && E.forEach(([i, m], P) => {
      m && (m(), E.set(P, [i]));
    });
  }), H = Array.isArray(o) ? [] : Object.create(Object.getPrototypeOf(o)), z = A(H, {
    deleteProperty(g, l) {
      const i = Reflect.get(g, l);
      b(l);
      const m = Reflect.deleteProperty(g, l);
      return m && y(["delete", [l], i]), m;
    },
    set(g, l, i, m) {
      const P = Reflect.has(g, l), j = Reflect.get(g, l, m);
      if (P && (s(j, i) || r.has(i) && s(j, r.get(i))))
        return !0;
      b(l), F(i) && (i = AA(i) || i);
      let v = i;
      if (i instanceof Promise)
        i.then((W) => {
          i.status = "fulfilled", i.value = W, y(["resolve", [l], W]);
        }).catch((W) => {
          i.status = "rejected", i.reason = W, y(["reject", [l], W]);
        });
      else {
        !D.has(i) && t(i) && (v = c(i));
        const W = !T.has(v) && D.get(v);
        W && C(l, W);
      }
      return Reflect.set(g, l, v, m), y(["set", [l], i, j]), !0;
    }
  });
  r.set(o, z);
  const L = [
    H,
    p,
    a,
    Q
  ];
  return D.set(z, L), Reflect.ownKeys(o).forEach((g) => {
    const l = Object.getOwnPropertyDescriptor(
      o,
      g
    );
    "value" in l && (z[g] = o[g], delete l.value, delete l.writable), Object.defineProperty(H, g, l);
  }), z;
}) => [
  // public functions
  c,
  // shared state
  D,
  T,
  // internal things
  s,
  A,
  t,
  e,
  n,
  a,
  r,
  R
], [eA] = tA();
function K(s = {}) {
  return eA(s);
}
function oA(s, A, t) {
  const e = D.get(s);
  ($ ? "production" : void 0) !== "production" && !e && console.warn("Please use proxy object");
  let n;
  const a = [], r = e[3];
  let R = !1;
  const o = r((h) => {
    a.push(h), n || (n = Promise.resolve().then(() => {
      n = void 0, R && A(a.splice(0));
    }));
  });
  return R = !0, () => {
    R = !1, o();
  };
}
function nA(s, A) {
  const t = D.get(s);
  ($ ? "production" : void 0) !== "production" && !t && console.warn("Please use proxy object");
  const [e, n, a] = t;
  return a(e, n(), A);
}
globalThis.orca = globalThis.orca || {};
class sA {
  constructor(A) {
    this.baseURL = "https://readwise.io/api/v2", this.apiKey = A, this.requestState = K({
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
      const a = await fetch(e, n);
      if (!a.ok) {
        const r = a.status === 401 ? "AUTH_ERROR" : a.status === 429 ? "RATE_LIMIT_ERROR" : "NETWORK_ERROR";
        throw new Error(`${r}: HTTP ${a.status} - ${await a.text()}`);
      }
      return await a.json();
    } catch (a) {
      throw this.requestState.lastError = a.message, console.error("Readwise API Request Failed:", a), a;
    }
  }
  //📖 分页获取所有高亮内容
  //核心同步接口 实现了基于游标的分页机制，支持增量同步：
  async getHighlights(A = null) {
    let t = [], e = null, n = 1;
    console.log(`🔄 Fetching highlights ${A ? `updated after ${A}` : "all time"}`);
    do {
      const a = new URLSearchParams({
        page_size: "1000"
        // Readwise API 允许的最大页大小
      });
      A && a.append("updated_after", A), e && a.append("page", n.toString());
      try {
        const r = await this.makeRequest(`/highlights?${a.toString()}`);
        r?.results ? (t = t.concat(r.results), console.log(`📄 Page ${n}: ${r.results.length} highlights`), e = r.next ? n + 1 : null, n++, await this.delay(100)) : e = null;
      } catch (r) {
        throw console.error(`❌ Failed to fetch page ${n}:`, r), r;
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
        const a = await this.makeRequest(`/export/?${n.toString()}`);
        a?.results ? (t = t.concat(a.results), e = a.nextPageCursor, console.log(`📄 Fetched ${a.results.length} books, total highlights so far: ${t.reduce((r, R) => r + (R.highlights?.length || 0), 0)}`)) : e = null, e && await this.delay(100);
      } catch (a) {
        throw console.error("❌ Failed to export page:", a), a;
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
const d = K({
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
class rA {
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
    d.isSyncing = !0, d.error = null, d.progress = { current: 0, total: 0, message: "准备同步..." }, orca.notify("info", "正在同步中，请稍候！");
    const t = Date.now();
    try {
      await this.validateConnection();
      let e = null;
      A === "full" ? (e = null, console.log("Performing full sync (all highlights)")) : A === "incremental" ? (e = this.settings.lastSyncDate, console.log("Performing incremental sync", e ? `after ${e}` : "(first sync)")) : (this.settings.defaultSyncMode || "incremental") === "full" ? (e = null, console.log("Performing full sync (default mode)")) : (e = this.settings.lastSyncDate, console.log("Performing incremental sync (default mode)", e ? `after ${e}` : "(first sync)"));
      const n = await this.syncHighlightsToOrca(e);
      this.updateSyncStats(n, A), await this.saveLastSyncDate();
      const r = Date.now() - t, R = Math.floor(r / 6e4), c = Math.floor(r % 6e4 / 1e3);
      return orca.notify("success", `同步完成，本次同步 ${n.newCount} 条数据，耗时 ${R} 分 ${c} 秒。`), n;
    } catch (e) {
      throw d.error = e, orca.notify("error", `同步失败：${e.message}`), e;
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
          for (const h of o.highlights)
            n.push({
              ...h,
              book_title: o.title,
              author: o.author,
              category: o.category || "books"
            });
      d.progress = {
        current: 0,
        total: n.length,
        message: `已获取 ${n.length} 条高亮`
      };
      const { createdBlocks: a, failedBlocks: r } = await this.createOrcaBlocks(n), R = this.categorizeHighlights(n), c = Date.now() - t;
      return {
        totalCount: n.length,
        newCount: a.length,
        failedCount: r.length,
        duration: c,
        categories: R
      };
    } catch (e) {
      throw console.error("Failed to fetch highlights:", e), new Error(`FETCH_ERROR: ${e.message}`);
    }
  }
  //🔍 数据过滤与分类处理
  //根据用户配置过滤和分类高亮内容：
  processHighlights(A, t) {
    const e = A.filter(
      (r) => this.shouldSyncHighlight(r)
    ), n = this.categorizeHighlights(e), a = Date.now() - t;
    return {
      totalCount: A.length,
      newCount: e.length,
      duration: a,
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
    let t = String(A.text || A.highlight || "");
    return A.book_title && (t += `

来源: ${String(A.book_title)}`, A.author && (t += ` by ${String(A.author)}`)), A.highlighted_at && (t += `
高亮时间: ${String(A.highlighted_at)}`), t;
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
    let n = null, a = await this.getActivePanel();
    if (a && (n = this.findRootBlock(a), console.log("Found root block from active panel:", n)), !n) {
      console.log("No root block from active panel, searching for any root block");
      const I = orca.state?.blocks;
      if (I)
        for (const E in I) {
          const C = I[E];
          if (!C.parent && !C.left) {
            n = E, console.log("Found root block by iteration:", n, C);
            break;
          }
        }
    }
    if (!n)
      throw new Error("No root block found. Please open a document first.");
    console.log("Using root block ID:", n);
    const r = /* @__PURE__ */ new Date(), R = r.getFullYear(), c = String(r.getMonth() + 1).padStart(2, "0"), o = String(r.getDate()).padStart(2, "0"), h = String(r.getHours()).padStart(2, "0"), f = String(r.getMinutes()).padStart(2, "0"), u = String(r.getSeconds()).padStart(2, "0"), S = `ReadwiseSyncToOrca${`${R}${c}${o}${h}${f}${u}`}`;
    let p = null;
    try {
      if (p = await orca.commands.invokeEditorCommand(
        "core.editor.insertBlock",
        null,
        n,
        "lastChild",
        [{ t: "t", v: S }]
      ), console.log("Created sync root block with ID:", p), p) {
        await orca.commands.invokeEditorCommand("core.editor.makeHeading2", null, p);
        try {
          await orca.commands.invokeEditorCommand(
            "core.editor.insertTag",
            null,
            p,
            "Readwise"
          ), console.log("Added Readwise tag to sync block");
        } catch (C) {
          console.warn("Failed to add tag to sync block:", C);
        }
        await this.delay(100), d.progress.total = A.length, d.progress.message = "创建 Orca 块...", console.log("Creating child blocks for", A.length, "highlights");
        const I = A.filter((C) => {
          const b = this.formatBlockContent(C);
          return b && b.trim() !== "";
        });
        console.log("Valid highlights to create:", I.length), console.log("Creating child blocks directly using insertBlock..."), await this.createBlocksIndividually(p, I, t, e), d.progress.current = t.length, d.progress.message = `已创建 ${t.length}/${I.length} 个块`, console.log("Created", t.length, "blocks, failed", e.length), await this.delay(200);
        const E = orca.state.blocks[p];
        E ? (console.log("Sync block verification:", {
          id: E.id,
          text: E.text,
          content: E.content,
          children: E.children?.length || 0,
          parent: E.parent,
          left: E.left
        }), E.children && Array.isArray(E.children) ? (console.log("Children block IDs:", E.children), E.children.forEach((C, b) => {
          const Q = orca.state.blocks[C];
          Q ? console.log(`Child ${b}:`, {
            id: Q.id,
            parent: Q.parent,
            left: Q.left,
            text: Q.text?.substring(0, 30)
          }) : console.warn(`Child block ${C} not found in state!`);
        })) : console.warn("Sync block has no children array")) : console.warn("Sync block not found in orca.state.blocks after creation!");
      }
    } catch (I) {
      throw console.error("Failed to create sync block:", I), new Error("Failed to create sync block: " + I.message);
    }
    return { createdBlocks: t, failedBlocks: e };
  }
  // 逐个创建块的备用方法
  async createBlocksIndividually(A, t, e, n) {
    console.log("Creating blocks individually...");
    const a = orca.state.blocks[A];
    if (!a)
      throw console.error("Parent block not found:", A), new Error("Parent block not found");
    console.log("Parent block verified:", {
      id: a.id,
      text: a.text,
      parent: a.parent,
      left: a.left,
      childrenCount: a.children?.length || 0
    });
    for (let r = 0; r < t.length; r++) {
      const R = t[r], c = this.formatBlockContent(R);
      try {
        console.log(`Creating block ${r + 1}/${t.length}`);
        let o;
        const h = ["firstChild", "lastChild", "into", "append", "child"];
        let f = null;
        for (const y of h)
          try {
            console.log(`Trying position '${y}'...`), o = await orca.commands.invokeEditorCommand(
              "core.editor.insertBlock",
              null,
              A,
              y,
              [{ t: "t", v: c }]
            ), console.log(`Created block via '${y}': ${o}`), f = null;
            break;
          } catch (S) {
            f = S, console.warn(`Position '${y}' failed: ${S.message}`);
          }
        if (f && !o)
          throw f;
        await this.delay(50);
        const u = orca.state.blocks[o];
        if (u) {
          if (console.log(`Block ${o} properties:`, {
            id: u.id,
            parent: u.parent,
            left: u.left,
            text: u.text?.substring(0, 50)
          }), !u.parent || u.parent !== A) {
            console.warn(`Block ${o} has incorrect parent: ${u.parent}, expected ${A}`);
            try {
              if (orca.state.blocks && orca.state.blocks[o]) {
                const y = e.length > 0 ? e[e.length - 1].id : null;
                orca.state.blocks[o].parent = A, orca.state.blocks[o].left = y, orca.state.blocks[A].children || (orca.state.blocks[A].children = []), orca.state.blocks[A].children.includes(o) || orca.state.blocks[A].children.push(o), console.log(`Direct state modification: set parent=${A}, left=${y}`), await this.delay(20);
                const S = orca.state.blocks[o];
                console.log("After direct modification, parent:", S?.parent, "left:", S?.left);
              }
            } catch (y) {
              console.warn(`Direct state modification failed: ${y.message}`);
            }
          }
        } else
          console.warn(`Block ${o} not found in state after creation`);
        console.log(`Created block ${o} for highlight ${r + 1}:`, String(c).substring(0, 50)), e.push({ id: o, content: c });
      } catch (o) {
        console.error("Failed to create block for highlight:", o), n.push({ highlight: R, error: o });
      }
      d.progress.current = e.length, d.progress.message = `已创建 ${e.length}/${t.length} 个块`;
    }
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
      const A = /* @__PURE__ */ new Date(), t = A.getFullYear(), e = String(A.getMonth() + 1).padStart(2, "0"), n = String(A.getDate()).padStart(2, "0"), a = `${t}-${e}-${n}`;
      console.log("Getting or creating journal page for date:", a);
      try {
        const r = await orca.commands.invokeCommand("core.journal.getJournalBlock", a);
        if (r)
          return console.log("Found today's journal block:", r), {
            rootBlockId: r.id || r,
            view: "journal",
            id: r.id || r
          };
      } catch (r) {
        console.log("Journal block command failed, trying alternative method:", r);
      }
      try {
        const r = orca.state?.blocks;
        if (r)
          for (const R in r) {
            const c = r[R];
            if (c.text && (c.text.includes(a) || c.text.includes("Journal")))
              return console.log("Found potential journal block by text:", R, c), {
                rootBlockId: R,
                view: "journal",
                id: R
              };
          }
      } catch (r) {
        console.log("Failed to search for journal block:", r);
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
    if (this.readwiseAPI ? this.readwiseAPI.updateSettings(this.settings) : this.readwiseAPI = new sA(this.settings), !await this.readwiseAPI.testConnection())
      throw new Error("AUTH_ERROR: Invalid API key or connection failed");
  }
  async saveLastSyncDate() {
    this.settings.lastSyncDate = (/* @__PURE__ */ new Date()).toISOString(), await orca.plugins.setData("readwise-sync", "settings", this.settings);
  }
}
const w = new rA(), aA = "data:image/png;base64,AAABAAMAMDAAAAEACACoDgAANgAAACAgAAABAAgAqAgAAN4OAAAQEAAAAQAIAGgFAACGFwAAKAAAADAAAABgAAAAAQAIAAAAAAAACQAAAAAAAAAAAAAAAQAAAAAAAAAAAAC3t7QAFxcXAEBAPwBpaWcAu7u3AOTk3wDS0s4AbW1qAPv79gDt7egAJCQjALKyrwDb29cAOzs6ABYWFQDNzckA9vbxAAQEBAD6+vQAlpaTAL+/uwCEhIIAHx8eAK2tqgANDQ0AX19dAJ+fnADIyMQAkZGOALq6tgDj494Af399AKiopQDR0c0A+vr1AAgICABaWlgA/v74AHFxbwAMDAsAmpqXADU1MwDa2tYAY2NhAIyMiQC1tbEA9fXwAAMDAwBVVVMA4+PfAL6+ugCsrKkA/v75AIeHhAAjIyMAx8fDACcnJgDe3toAPj49AGdnZQCQkI0Aubm1AFVVVAB+fnwAp6ekAEJCQABra2gA+fn0ADAwLwCCgn8A/f33AP7++gDCwr4A6+vmANnZ1QAQEBAAOTk4APDw7ACLi4gAtLSwAAICAgDi4t4AfX16AAYGBQDm5uEA/f34AP///gAiIiIAnZ2aACYmJQB4eHUAZmZkAI+PjAC4uLQApqajAPj48wAGBgYALy8uAB0dHQD8/PYARkZFAG9vbQCYmJUAwcG9AOrq5QCGhoQAr6+sAEpKSAAPDw8AYWFfAIqKhwATExIA8/PuAAEBAQAqKikAGBgYAEFBQABqamgAWFhXAIGBfwAcHBsA09PPAPz89wCFhYIArq6qAEpKSQCcnJkAxcXBAO7u6QAlJSQAs7OwANzc2AA8PDsAZWVjAI6OiwAXFxYAzs7KAAUFBQAuLi0A5eXhAICAfQBubmwACQkIAOnp5ACJiYYAEhIRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYVhaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpYYQAAWBAyUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUjIQWAAAWjJ7IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI3syWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjREREREREI1ZWVlZWVlZWVlZWRyNERERERCNWVlZWVlZWViNERERERCNSWgAAWlIjREREREQJHCCNjY2NjY2NjY2NfIQJRERECUt8jY2NjY2NeCIJRERERCNSWgAAWlIjRERERERWFAAAAAAAAAAAAAAAKBVHREREEYYAAAAAAAAAMCFWRERERCNSWgAAWlIjREREREQjOkEIbQAAAAAAAGNAa2kjRER7g20AAAAAAIpsfx8jRERERCNSWgAAWlIjRERERERECSZgbgAAAAAAAC01ViNERCOQdQAAAAAAcgQKNSNERERERCNSWgAAWlIjRERERERERERWbwAAAAAAYS5WRERERAmHMAAAAAAATR8JRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WREREZAc3AAAAAAAZGHtERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WREREEVwAAAAAAAAsLxNERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRER7UG0AAAAAADcHe0RERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRCOQQgAAAAAAEj0JRERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRAldMAAAAAAAZUojRERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WCXoLAAAAAABwHntERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WETwAAAAAAAAnYERERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJAVXLm0AAAAAAIsNCURERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAEiw2KgAAAAAAMC1EViNERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAAAAAUYI/WVV7RERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAAAAAAAAAEg4zCURERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAABdaVAAAAAAAAAAAAAA3OHtERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAJKRfVN3A0U5AnIAAAAAMXFERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAB5AUhgTpCMaxkAAAAADxB7RERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAC0l7IyM1Po8AAAAAMF9WRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAGKJe0RWKQAAAAAAAB1WRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAACFS3t7jQAAAAAAAIdWRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAflJWdgAAAAAAchtWRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAACVpGgAAAAAATIB7RERERERERCNSWgAAWlIjRERERERERERWTwAAAAAAAAAAAAAAAFF2MQAAAAAAZYEjRERERERERCNSWgAAWlIjREREREREI1Z7QwAAAAAAAAAAAAAAAAAkDwAAAAB0XntERERERERERCNSWgAAWlIjREREREQjBl5GiAAAAAAAAAAAAAAAAAAAAAAAcnM0RERERERERERERCNSWgAAWlIjRERERERWZzAAAAAAAAAAAAAAAAAAAAAAYQI7aisJRERERERERERERCNSWgAAWlIjREREREQJaI5mZmZmZmZmZmZmZmYnWxZnDAeBewlERERERERERERERCNSWgAAWlIjREREREREIwkJCQkJCQkJCQkJCQlke1ZWVgkjRERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWjJ7IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI3syWgAAWBAyUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUjIQWAAAYVhaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpYYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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";
let N;
async function uA(s) {
  N = s, console.log(`${N} plugin enabled`), orca.themes.injectCSSResource(`${N}/dist/index.css`, N), await orca.plugins.setSettingsSchema(N, {
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
  }), await RA(N);
}
async function dA() {
  console.log("Readwise Sync plugin disabled"), await EA();
  try {
    orca.themes.removeCSSResources(N);
  } catch {
  }
  try {
    orca.headbar?.unregisterHeadbarButton?.(`${N}.sync`);
  } catch {
  }
  try {
    orca.commands.unregisterCommand(`${N}.sync`);
  } catch {
  }
  try {
    orca.commands.unregisterCommand(`${N}.testConnection`);
  } catch {
  }
}
async function x() {
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
function cA(s) {
  orca.state.commands?.[`${s}.sync`] == null && orca.commands.registerCommand(
    `${s}.sync`,
    async () => {
      try {
        const A = orca.state.plugins[s]?.settings || await x();
        if (w.settings = { ...w.settings, ...A }, !w.settings.apiKey) {
          orca.notify("error", "Please configure your Readwise API Key in settings");
          return;
        }
        orca.notify("info", "Starting incremental sync...");
        const t = await w.performSync("incremental");
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
        const A = orca.state.plugins[s]?.settings || await x();
        if (w.settings = { ...w.settings, ...A }, !w.settings.apiKey) {
          orca.notify("error", "Please configure your Readwise API Key in settings");
          return;
        }
        orca.notify("info", "Starting full sync...");
        const t = await w.performSync("full");
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
        const A = orca.state.plugins[s]?.settings || await x();
        return w.settings = { ...w.settings, ...A }, w.settings.apiKey ? (await w.validateConnection(), orca.notify("success", "Readwise connection successful"), !0) : (orca.notify("error", "Please configure your Readwise API Key in settings"), !1);
      } catch (A) {
        return orca.notify("error", `Readwise connection failed: ${A?.message || "Unknown error"}`), !1;
      }
    },
    "Test Readwise Connection"
  );
}
function iA(s) {
  if (orca.state.headbarButtons?.[`${s}.sync`] == null)
    try {
      const A = orca.components.Button, t = orca.components.HoverContextMenu, e = orca.components.MenuText;
      if (!A || !t || !e) {
        console.error("[Readwise Sync] Required components not available");
        return;
      }
      let n = null;
      const a = () => {
        const c = nA(d).isSyncing;
        return /* @__PURE__ */ k.jsx(
          t,
          {
            menu: (o) => /* @__PURE__ */ k.jsxs(k.Fragment, { children: [
              /* @__PURE__ */ k.jsx(
                e,
                {
                  title: c ? "正在同步中..." : "Sync Now (Incremental)",
                  onClick: async () => {
                    c || (o(), await orca.commands.invokeCommand(`${s}.sync`));
                  },
                  disabled: c
                }
              ),
              /* @__PURE__ */ k.jsx(
                e,
                {
                  title: "Full Sync (All Highlights)",
                  onClick: async () => {
                    c || (o(), await orca.commands.invokeCommand(`${s}.fullSync`));
                  },
                  disabled: c
                }
              ),
              /* @__PURE__ */ k.jsx(
                e,
                {
                  title: "Test Connection",
                  onClick: async () => {
                    c || (o(), await orca.commands.invokeCommand(`${s}.testConnection`));
                  },
                  disabled: c
                }
              )
            ] }),
            children: /* @__PURE__ */ k.jsxs(
              A,
              {
                variant: "plain",
                onClick: () => {
                  c || orca.commands.invokeCommand(`${s}.sync`);
                },
                disabled: c,
                style: { opacity: c ? 0.5 : 1 },
                children: [
                  /* @__PURE__ */ k.jsx("img", { className: "readwise-sync-button", src: aA, alt: "Readwise Sync" }),
                  c && /* @__PURE__ */ k.jsx("span", { style: { marginLeft: "8px", fontSize: "12px" }, children: "同步中..." })
                ]
              }
            )
          }
        );
      };
      orca.headbar.registerHeadbarButton(
        `${s}.sync`,
        () => a()
      );
      const r = oA(d, () => {
        orca.headbar.unregisterHeadbarButton(`${s}.sync`), orca.headbar.registerHeadbarButton(
          `${s}.sync`,
          () => a()
        );
      });
      window.__readwiseSyncUnsubscribe = r, console.log("[Readwise Sync] Headbar button registered successfully");
    } catch (A) {
      console.error("[Readwise Sync] Failed to register headbar button:", A);
    }
  else
    console.log("[Readwise Sync] Headbar button already registered");
}
function lA(s) {
  w.settings = { ...w.settings, ...s }, typeof w.setupAutoSync == "function" && w.setupAutoSync();
}
async function RA(s) {
  const A = await x();
  lA(A), cA(s), await new Promise((t) => setTimeout(t, 100)), iA(s);
}
async function EA() {
  typeof w.cleanup == "function" && w.cleanup();
}
export {
  uA as load,
  dA as unload
};
