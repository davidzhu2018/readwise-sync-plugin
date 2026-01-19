var F = { exports: {} }, v = {};
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
function q() {
  if (U) return v;
  U = 1;
  var a = G, A = Symbol.for("react.element"), t = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, n = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function r(g, c, o) {
    var i, l = {}, d = null, E = null;
    o !== void 0 && (d = "" + o), c.key !== void 0 && (d = "" + c.key), c.ref !== void 0 && (E = c.ref);
    for (i in c) e.call(c, i) && !s.hasOwnProperty(i) && (l[i] = c[i]);
    if (g && g.defaultProps) for (i in c = g.defaultProps, c) l[i] === void 0 && (l[i] = c[i]);
    return { $$typeof: A, type: g, key: d, ref: E, props: l, _owner: n.current };
  }
  return v.Fragment = t, v.jsx = r, v.jsxs = r, v;
}
var O;
function Z() {
  return O || (O = 1, F.exports = q()), F.exports;
}
var N = Z();
const _ = Symbol(), Y = Object.getPrototypeOf, J = /* @__PURE__ */ new WeakMap(), X = (a) => a && (J.has(a) ? J.get(a) : Y(a) === Object.prototype || Y(a) === Array.prototype), AA = (a) => X(a) && a[_] || null, K = (a, A = !0) => {
  J.set(a, A);
}, x = {}, H = (a) => typeof a == "object" && a !== null, B = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakSet(), tA = (a = Object.is, A = (o, i) => new Proxy(o, i), t = (o) => H(o) && !M.has(o) && (Array.isArray(o) || !(Symbol.iterator in o)) && !(o instanceof WeakMap) && !(o instanceof WeakSet) && !(o instanceof Error) && !(o instanceof Number) && !(o instanceof Date) && !(o instanceof String) && !(o instanceof RegExp) && !(o instanceof ArrayBuffer), e = (o) => {
  switch (o.status) {
    case "fulfilled":
      return o.value;
    case "rejected":
      throw o.reason;
    default:
      throw o;
  }
}, n = /* @__PURE__ */ new WeakMap(), s = (o, i, l = e) => {
  const d = n.get(o);
  if (d?.[0] === i)
    return d[1];
  const E = Array.isArray(o) ? [] : Object.create(Object.getPrototypeOf(o));
  return K(E, !0), n.set(o, [i, E]), Reflect.ownKeys(o).forEach((S) => {
    if (Object.getOwnPropertyDescriptor(E, S))
      return;
    const w = Reflect.get(o, S), { enumerable: p } = Reflect.getOwnPropertyDescriptor(
      o,
      S
    ), h = {
      value: w,
      enumerable: p,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: !0
    };
    if (M.has(w))
      K(w, !1);
    else if (w instanceof Promise)
      delete h.value, h.get = () => l(w);
    else if (B.has(w)) {
      const [I, C] = B.get(
        w
      );
      h.value = s(
        I,
        C(),
        l
      );
    }
    Object.defineProperty(E, S, h);
  }), Object.preventExtensions(E);
}, r = /* @__PURE__ */ new WeakMap(), g = [1, 1], c = (o) => {
  if (!H(o))
    throw new Error("object required");
  const i = r.get(o);
  if (i)
    return i;
  let l = g[0];
  const d = /* @__PURE__ */ new Set(), E = (y, u = ++g[0]) => {
    l !== u && (l = u, d.forEach((R) => R(y, u)));
  };
  let S = g[1];
  const w = (y = ++g[1]) => (S !== y && !d.size && (S = y, h.forEach(([u]) => {
    const R = u[1](y);
    R > l && (l = R);
  })), l), p = (y) => (u, R) => {
    const k = [...u];
    k[1] = [y, ...k[1]], E(k, R);
  }, h = /* @__PURE__ */ new Map(), I = (y, u) => {
    if ((x ? "production" : void 0) !== "production" && h.has(y))
      throw new Error("prop listener already exists");
    if (d.size) {
      const R = u[3](p(y));
      h.set(y, [u, R]);
    } else
      h.set(y, [u]);
  }, C = (y) => {
    var u;
    const R = h.get(y);
    R && (h.delete(y), (u = R[1]) == null || u.call(R));
  }, Q = (y) => (d.add(y), d.size === 1 && h.forEach(([R, k], j) => {
    if ((x ? "production" : void 0) !== "production" && k)
      throw new Error("remove already exists");
    const P = R[3](p(j));
    h.set(j, [R, P]);
  }), () => {
    d.delete(y), d.size === 0 && h.forEach(([R, k], j) => {
      k && (k(), h.set(j, [R]));
    });
  }), D = Array.isArray(o) ? [] : Object.create(Object.getPrototypeOf(o)), T = A(D, {
    deleteProperty(y, u) {
      const R = Reflect.get(y, u);
      C(u);
      const k = Reflect.deleteProperty(y, u);
      return k && E(["delete", [u], R]), k;
    },
    set(y, u, R, k) {
      const j = Reflect.has(y, u), P = Reflect.get(y, u, k);
      if (j && (a(P, R) || r.has(R) && a(P, r.get(R))))
        return !0;
      C(u), H(R) && (R = AA(R) || R);
      let $ = R;
      if (R instanceof Promise)
        R.then((W) => {
          R.status = "fulfilled", R.value = W, E(["resolve", [u], W]);
        }).catch((W) => {
          R.status = "rejected", R.reason = W, E(["reject", [u], W]);
        });
      else {
        !B.has(R) && t(R) && ($ = c(R));
        const W = !M.has($) && B.get($);
        W && I(u, W);
      }
      return Reflect.set(y, u, $, k), E(["set", [u], R, P]), !0;
    }
  });
  r.set(o, T);
  const L = [
    D,
    w,
    s,
    Q
  ];
  return B.set(T, L), Reflect.ownKeys(o).forEach((y) => {
    const u = Object.getOwnPropertyDescriptor(
      o,
      y
    );
    "value" in u && (T[y] = o[y], delete u.value, delete u.writable), Object.defineProperty(D, y, u);
  }), T;
}) => [
  // public functions
  c,
  // shared state
  B,
  M,
  // internal things
  a,
  A,
  t,
  e,
  n,
  s,
  r,
  g
], [eA] = tA();
function V(a = {}) {
  return eA(a);
}
function oA(a, A, t) {
  const e = B.get(a);
  (x ? "production" : void 0) !== "production" && !e && console.warn("Please use proxy object");
  let n;
  const s = [], r = e[3];
  let g = !1;
  const o = r((i) => {
    s.push(i), n || (n = Promise.resolve().then(() => {
      n = void 0, g && A(s.splice(0));
    }));
  });
  return g = !0, () => {
    g = !1, o();
  };
}
function nA(a, A) {
  const t = B.get(a);
  (x ? "production" : void 0) !== "production" && !t && console.warn("Please use proxy object");
  const [e, n, s] = t;
  return s(e, n(), A);
}
globalThis.orca = globalThis.orca || {};
class sA {
  constructor(A) {
    this.baseURL = "https://readwise.io/api/v2", typeof A == "string" ? this.apiKey = A.trim() : A && A.apiKey ? this.apiKey = A.apiKey.trim() : this.apiKey = "", this.requestState = V({
      isConnected: !1,
      lastError: null,
      requestCount: 0
    });
  }
  // 更新配置（响应 settingsChanged 广播）
  updateSettings(A) {
    A && A.apiKey && (this.apiKey = A.apiKey.trim()), this.requestState.lastError = null;
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
      const s = await fetch(e, n);
      if (!s.ok) {
        const r = s.status === 401 ? "AUTH_ERROR" : s.status === 429 ? "RATE_LIMIT_ERROR" : "NETWORK_ERROR";
        throw new Error(`${r}: HTTP ${s.status} - ${await s.text()}`);
      }
      return await s.json();
    } catch (s) {
      throw this.requestState.lastError = s.message, console.error("Readwise API Request Failed:", s), s;
    }
  }
  //📖 分页获取所有高亮内容
  //核心同步接口 实现了基于游标的分页机制，支持增量同步：
  async getHighlights(A = null) {
    let t = [], e = null, n = 1;
    console.log(`🔄 Fetching highlights ${A ? `updated after ${A}` : "all time"}`);
    do {
      const s = new URLSearchParams({
        page_size: "1000"
        // Readwise API 允许的最大页大小
      });
      A && s.append("updated_after", A), e && s.append("page", n.toString());
      try {
        const r = await this.makeRequest(`/highlights?${s.toString()}`);
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
        const s = await this.makeRequest(`/export/?${n.toString()}`);
        s?.results ? (t = t.concat(s.results), e = s.nextPageCursor, console.log(`📄 Fetched ${s.results.length} books, total highlights so far: ${t.reduce((r, g) => r + (g.highlights?.length || 0), 0)}`)) : e = null, e && await this.delay(100);
      } catch (s) {
        throw console.error("❌ Failed to export page:", s), s;
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
const f = V({
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
    if (f.isSyncing)
      throw new Error("SYNC_IN_PROGRESS");
    f.isSyncing = !0, f.error = null, f.progress = { current: 0, total: 0, message: "准备同步..." }, orca.notify("info", "正在同步中，请稍候！");
    const t = Date.now();
    try {
      await this.validateConnection();
      let e = null;
      A === "full" ? (e = null, console.log("Performing full sync (all highlights)")) : A === "incremental" ? (e = this.settings.lastSyncDate, console.log("Performing incremental sync", e ? `after ${e}` : "(first sync)")) : (this.settings.defaultSyncMode || "incremental") === "full" ? (e = null, console.log("Performing full sync (default mode)")) : (e = this.settings.lastSyncDate, console.log("Performing incremental sync (default mode)", e ? `after ${e}` : "(first sync)"));
      const n = await this.syncHighlightsToOrca(e);
      this.updateSyncStats(n, A), await this.saveLastSyncDate();
      const r = Date.now() - t, g = Math.floor(r / 6e4), c = Math.floor(r % 6e4 / 1e3);
      return orca.notify("success", `同步完成，本次同步 ${n.newCount} 条数据，耗时 ${g} 分 ${c} 秒。`), n;
    } catch (e) {
      throw f.error = e, orca.notify("error", `同步失败：${e.message}`), e;
    } finally {
      f.isSyncing = !1, f.progress = { current: 0, total: 0, message: "" };
    }
  }
  //📊 分页处理与性能优化
  //处理 Readwise API 的分页响应，确保大数据量的稳定同步：
  async syncHighlightsToOrca(A = null) {
    const t = Date.now();
    f.progress.message = "获取高亮内容...";
    try {
      const e = await this.readwiseAPI.exportHighlights(A), n = [];
      for (const o of e)
        if (o.highlights && Array.isArray(o.highlights))
          for (const i of o.highlights)
            n.push({
              ...i,
              book_title: o.title,
              author: o.author,
              category: o.category || "books"
            });
      f.progress = {
        current: 0,
        total: n.length,
        message: `已获取 ${n.length} 条高亮`
      };
      const { createdBlocks: s, failedBlocks: r } = await this.createOrcaBlocks(n), g = this.categorizeHighlights(n), c = Date.now() - t;
      return {
        totalCount: n.length,
        newCount: s.length,
        failedCount: r.length,
        duration: c,
        categories: g
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
    ), n = this.categorizeHighlights(e), s = Date.now() - t;
    return {
      totalCount: A.length,
      newCount: e.length,
      duration: s,
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
    let n = null;
    const s = orca.state?.blocks;
    if (s)
      for (const p in s) {
        const h = s[p];
        if (!h.parent && !h.left) {
          n = p, console.log("Found root block:", n);
          break;
        }
      }
    if (!n)
      throw new Error("No root block found. Please open a document or journal page first.");
    console.log("Using root block ID:", n);
    const r = /* @__PURE__ */ new Date(), g = r.getFullYear(), c = String(r.getMonth() + 1).padStart(2, "0"), o = String(r.getDate()).padStart(2, "0"), i = String(r.getHours()).padStart(2, "0"), l = String(r.getMinutes()).padStart(2, "0"), d = String(r.getSeconds()).padStart(2, "0"), S = `ReadwiseSyncToOrca${`${g}${c}${o}${i}${l}${d}`}`;
    let w = null;
    try {
      if (w = await orca.commands.invokeEditorCommand(
        "core.editor.insertBlock",
        null,
        n,
        "lastChild",
        [{ t: "t", v: S }]
      ), console.log("Created sync root block with ID:", w), w) {
        await orca.commands.invokeEditorCommand("core.editor.makeHeading2", null, w);
        try {
          await orca.commands.invokeEditorCommand(
            "core.editor.insertTag",
            null,
            w,
            "Readwise"
          ), console.log("Added Readwise tag to sync block");
        } catch (C) {
          console.warn("Failed to add tag to sync block:", C);
        }
        await this.delay(100), f.progress.total = A.length, f.progress.message = "创建 Orca 块...", console.log("Creating category structure for", A.length, "highlights");
        const p = A.filter((C) => {
          const Q = this.formatBlockContent(C);
          return Q && Q.trim() !== "";
        });
        console.log("Valid highlights to create:", p.length);
        const h = this.groupHighlightsByCategory(p);
        console.log("Grouped highlights by category:", Object.keys(h).map((C) => `${C}: ${h[C].length}`)), await this.createCategoryBlocks(w, h, t, e), f.progress.current = t.length, f.progress.message = `已创建 ${t.length}/${p.length} 个块`, console.log("Created", t.length, "blocks, failed", e.length), await this.delay(200);
        const I = orca.state.blocks[w];
        I ? (console.log("Sync block verification:", {
          id: I.id,
          text: I.text,
          content: I.content,
          children: I.children?.length || 0,
          parent: I.parent,
          left: I.left
        }), I.children && Array.isArray(I.children) ? (console.log("Children block IDs:", I.children), I.children.forEach((C, Q) => {
          const D = orca.state.blocks[C];
          D ? console.log(`Child ${Q}:`, {
            id: D.id,
            parent: D.parent,
            left: D.left,
            text: D.text?.substring(0, 30)
          }) : console.warn(`Child block ${C} not found in state!`);
        })) : console.warn("Sync block has no children array")) : console.warn("Sync block not found in orca.state.blocks after creation!");
      }
    } catch (p) {
      throw console.error("Failed to create sync block:", p), new Error("Failed to create sync block: " + p.message);
    }
    return { createdBlocks: t, failedBlocks: e };
  }
  // 按分类分组高亮
  groupHighlightsByCategory(A) {
    const t = {
      books: [],
      articles: [],
      tweets: [],
      supplementals: [],
      podcasts: []
    };
    for (const e of A) {
      const n = e.category || "books";
      t[n] ? t[n].push(e) : t.books.push(e);
    }
    return t;
  }
  // 创建分类块和高亮块的三级结构
  async createCategoryBlocks(A, t, e, n) {
    console.log("Creating category blocks...");
    const s = ["books", "articles", "tweets", "supplementals", "podcasts"];
    orca.state.blocks[A].children || (orca.state.blocks[A].children = []);
    let r = null;
    const g = orca.state?.blocks;
    if (g)
      for (const i in g) {
        const l = g[i];
        if (!l.parent && !l.left) {
          r = i;
          break;
        }
      }
    if (!r) {
      console.error("No root block found for creating category blocks");
      return;
    }
    const c = {};
    for (let i = 0; i < s.length; i++) {
      const l = s[i], d = t[l];
      if (!d || d.length === 0) {
        console.log(`Skipping category ${l} (no highlights)`);
        continue;
      }
      try {
        const E = await orca.commands.invokeEditorCommand(
          "core.editor.insertBlock",
          null,
          r,
          "lastChild",
          [{ t: "t", v: l }]
        );
        await orca.commands.invokeEditorCommand("core.editor.makeHeading3", null, E);
        try {
          await orca.commands.invokeEditorCommand(
            "core.editor.insertTag",
            null,
            E,
            `Readwise/${l}`
          );
        } catch (S) {
          console.warn(`Failed to add tag to category block ${l}:`, S);
        }
        c[l] = E, console.log(`Created category block ${E} for ${l}`);
      } catch (E) {
        console.error(`Failed to create category block for ${l}:`, E);
      }
    }
    console.log("Created category blocks:", Object.keys(c)), await this.delay(100);
    const o = Object.keys(c).map((i) => c[i]);
    if (o.length > 0) {
      console.log(`Moving ${o.length} category blocks to sync root...`);
      try {
        await orca.commands.invokeEditorCommand(
          "core.editor.moveBlocks",
          null,
          o,
          A,
          "lastChild"
        ), console.log(`Moved ${o.length} category blocks to sync root using moveBlocks`);
      } catch (i) {
        console.error("Failed to move category blocks using moveBlocks:", i);
      }
      for (let i = 0; i < o.length; i++) {
        const l = o[i], d = i > 0 ? o[i - 1] : null;
        orca.state.blocks[l] && (orca.state.blocks[l].parent = A, orca.state.blocks[l].left = d, console.log(`Set category block ${l}: parent=${A}, left=${d}`)), orca.state.blocks[A].children.includes(l) || orca.state.blocks[A].children.push(l);
      }
      console.log("All category blocks moved and properties set");
    }
    for (const i of s) {
      const l = c[i], d = t[i];
      !l || !d || d.length === 0 || (console.log(`Creating highlights for category ${i} (${d.length} highlights)...`), await this.createBlocksIndividually(
        l,
        i,
        d,
        e,
        n
      ), console.log(`Completed category ${i}`));
    }
    console.log("All category blocks and highlights created");
  }
  // 并发创建独立块，然后移动到同步标记块下
  async createBlocksIndividually(A, t, e, n, s) {
    console.log(`Creating ${e.length} blocks for category ${t}...`);
    const r = e.length;
    let g;
    r > 600 ? g = 200 : r > 200 ? g = 100 : g = 50;
    let c;
    return r > 1e3 ? c = 100 : r > 500 ? c = 80 : r > 200 ? c = 50 : c = 30, console.log(`Using adaptive concurrency: ${c} for ${r} highlights`), await this.createBlocksIndividuallyLegacy(
      A,
      t,
      e,
      n,
      s,
      g,
      c
    );
  }
  // 原有的逐个创建方法（高并发优化版）
  async createBlocksIndividuallyLegacy(A, t, e, n, s, r, g) {
    let c = null;
    const o = orca.state?.blocks;
    if (o)
      for (const E in o) {
        const S = o[E];
        if (!S.parent && !S.left) {
          c = E;
          break;
        }
      }
    if (!c)
      throw new Error("No root block found for creating independent blocks");
    const i = async (E, S) => {
      const w = this.formatBlockContent(E);
      try {
        return { success: !0, blockId: await orca.commands.invokeEditorCommand(
          "core.editor.insertBlock",
          null,
          c,
          "lastChild",
          [{ t: "t", v: w }]
        ), highlight: E, index: S };
      } catch (p) {
        return { success: !1, error: p, highlight: E, index: S };
      }
    }, l = [];
    let d = 0;
    for (let E = 0; E < e.length; E += g) {
      const w = e.slice(E, E + g).map(
        (h, I) => i(h, E + I)
      ), p = await Promise.all(w);
      for (const h of p)
        h.success ? (l.push({
          id: h.blockId,
          content: this.formatBlockContent(h.highlight),
          originalIndex: h.index
        }), n.push({ id: h.blockId, content: this.formatBlockContent(h.highlight) }), d++) : s.push({ highlight: h.highlight, error: h.error });
      (d % r === 0 || d === e.length) && (f.progress.current = d, f.progress.message = `${t}: ${d}/${e.length}`);
    }
    return console.log(`Created ${l.length} independent blocks for category ${t}`), l.sort((E, S) => E.originalIndex - S.originalIndex), await this.moveBlocksToParent(A, l), l.length;
  }
  // 移动块到父块下并设置正确的parent/left/children属性
  async moveBlocksToParent(A, t) {
    if (t.length === 0) return;
    console.log(`Moving ${t.length} blocks to parent ${A}...`), orca.state.blocks[A].children || (orca.state.blocks[A].children = []);
    const e = t.map((s) => s.id);
    try {
      await orca.commands.invokeEditorCommand(
        "core.editor.moveBlocks",
        null,
        e,
        A,
        "lastChild"
      ), console.log(`Moved ${e.length} blocks to parent ${A} using moveBlocks`);
    } catch (s) {
      console.error("Failed to move blocks using moveBlocks:", s);
    }
    const n = orca.state.blocks[A].children;
    for (let s = 0; s < t.length; s++) {
      const g = t[s].id, c = s > 0 ? t[s - 1].id : null;
      orca.state.blocks[g] && (orca.state.blocks[g].parent = A, orca.state.blocks[g].left = c, console.log(`Set block ${g}: parent=${A}, left=${c}`)), n.includes(g) || n.push(g);
    }
    console.log(`All ${t.length} blocks moved and properties set successfully`);
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
      const A = /* @__PURE__ */ new Date(), t = A.getFullYear(), e = String(A.getMonth() + 1).padStart(2, "0"), n = String(A.getDate()).padStart(2, "0"), s = `${t}-${e}-${n}`;
      console.log("Getting or creating journal page for date:", s);
      try {
        const r = await orca.commands.invokeCommand("core.journal.getJournalBlock", s);
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
          for (const g in r) {
            const c = r[g];
            if (c.text && (c.text.includes(s) || c.text.includes("Journal")))
              return console.log("Found potential journal block by text:", g, c), {
                rootBlockId: g,
                view: "journal",
                id: g
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
    if (f.isSyncing) {
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
    this.cleanupFunctions.forEach((A) => A()), this.readwiseAPI && this.readwiseAPI.cleanup(), f.isSyncing = !1, f.error = null, f.progress = { current: 0, total: 0, message: "" };
  }
  delay(A) {
    return new Promise((t) => setTimeout(t, A));
  }
  //📈 统计信息暴露
  //提供同步统计信息供主入口文件使用：
  getStats() {
    return {
      isSyncing: f.isSyncing,
      lastSyncDate: f.lastSyncDate,
      ...f.syncStats
    };
  }
  updateSyncStats(A, t) {
    f.syncStats = {
      totalHighlights: A.totalCount,
      newHighlights: A.newCount,
      failedHighlights: A.failedCount || 0,
      duration: A.duration,
      categories: A.categories,
      triggerType: t,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }, f.lastSyncDate = (/* @__PURE__ */ new Date()).toISOString();
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
    const A = /* @__PURE__ */ new Date(), t = new Date(A.getTime() + 480 * 60 * 1e3 + A.getTimezoneOffset() * 60 * 1e3), e = t.getFullYear(), n = String(t.getMonth() + 1).padStart(2, "0"), s = String(t.getDate()).padStart(2, "0"), r = String(t.getHours()).padStart(2, "0"), g = String(t.getMinutes()).padStart(2, "0"), c = String(t.getSeconds()).padStart(2, "0"), o = `${e}-${n}-${s} ${r}:${g}:${c}`;
    this.settings.lastSyncDate = o;
    try {
      const i = {
        apiKey: this.settings.apiKey || "",
        defaultSyncMode: this.settings.defaultSyncMode || "incremental",
        autoSyncEnabled: this.settings.autoSyncEnabled || !1,
        syncInterval: this.settings.syncInterval || 60,
        lastSyncDate: o,
        syncCategory: this.settings.syncCategory || "all",
        includeTags: this.settings.includeTags !== !1
      };
      await orca.plugins.setSettings("app", "readwise-sync", i), console.log("Updated settings via setSettings:", o);
    } catch (i) {
      console.error("Failed to update settings via setSettings:", i);
      try {
        const l = {
          apiKey: this.settings.apiKey || "",
          defaultSyncMode: this.settings.defaultSyncMode || "incremental",
          autoSyncEnabled: this.settings.autoSyncEnabled || !1,
          syncInterval: this.settings.syncInterval || 60,
          lastSyncDate: o,
          syncCategory: this.settings.syncCategory || "all",
          includeTags: this.settings.includeTags !== !1
        };
        await orca.plugins.setData("readwise-sync", "settings", JSON.stringify(l)), console.log("Saved last sync date via setData:", o);
      } catch (l) {
        console.error("Failed to save via setData:", l);
      }
    }
  }
}
const m = new rA(), aA = "data:image/png;base64,AAABAAMAMDAAAAEACACoDgAANgAAACAgAAABAAgAqAgAAN4OAAAQEAAAAQAIAGgFAACGFwAAKAAAADAAAABgAAAAAQAIAAAAAAAACQAAAAAAAAAAAAAAAQAAAAAAAAAAAAC3t7QAFxcXAEBAPwBpaWcAu7u3AOTk3wDS0s4AbW1qAPv79gDt7egAJCQjALKyrwDb29cAOzs6ABYWFQDNzckA9vbxAAQEBAD6+vQAlpaTAL+/uwCEhIIAHx8eAK2tqgANDQ0AX19dAJ+fnADIyMQAkZGOALq6tgDj494Af399AKiopQDR0c0A+vr1AAgICABaWlgA/v74AHFxbwAMDAsAmpqXADU1MwDa2tYAY2NhAIyMiQC1tbEA9fXwAAMDAwBVVVMA4+PfAL6+ugCsrKkA/v75AIeHhAAjIyMAx8fDACcnJgDe3toAPj49AGdnZQCQkI0Aubm1AFVVVAB+fnwAp6ekAEJCQABra2gA+fn0ADAwLwCCgn8A/f33AP7++gDCwr4A6+vmANnZ1QAQEBAAOTk4APDw7ACLi4gAtLSwAAICAgDi4t4AfX16AAYGBQDm5uEA/f34AP///gAiIiIAnZ2aACYmJQB4eHUAZmZkAI+PjAC4uLQApqajAPj48wAGBgYALy8uAB0dHQD8/PYARkZFAG9vbQCYmJUAwcG9AOrq5QCGhoQAr6+sAEpKSAAPDw8AYWFfAIqKhwATExIA8/PuAAEBAQAqKikAGBgYAEFBQABqamgAWFhXAIGBfwAcHBsA09PPAPz89wCFhYIArq6qAEpKSQCcnJkAxcXBAO7u6QAlJSQAs7OwANzc2AA8PDsAZWVjAI6OiwAXFxYAzs7KAAUFBQAuLi0A5eXhAICAfQBubmwACQkIAOnp5ACJiYYAEhIRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYVhaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpYYQAAWBAyUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUjIQWAAAWjJ7IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI3syWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjREREREREI1ZWVlZWVlZWVlZWRyNERERERCNWVlZWVlZWViNERERERCNSWgAAWlIjREREREQJHCCNjY2NjY2NjY2NfIQJRERECUt8jY2NjY2NeCIJRERERCNSWgAAWlIjRERERERWFAAAAAAAAAAAAAAAKBVHREREEYYAAAAAAAAAMCFWRERERCNSWgAAWlIjREREREQjOkEIbQAAAAAAAGNAa2kjRER7g20AAAAAAIpsfx8jRERERCNSWgAAWlIjRERERERECSZgbgAAAAAAAC01ViNERCOQdQAAAAAAcgQKNSNERERERCNSWgAAWlIjRERERERERERWbwAAAAAAYS5WRERERAmHMAAAAAAATR8JRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WREREZAc3AAAAAAAZGHtERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WREREEVwAAAAAAAAsLxNERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRER7UG0AAAAAADcHe0RERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRCOQQgAAAAAAEj0JRERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRAldMAAAAAAAZUojRERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WCXoLAAAAAABwHntERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WETwAAAAAAAAnYERERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJAVXLm0AAAAAAIsNCURERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAEiw2KgAAAAAAMC1EViNERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAAAAAUYI/WVV7RERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAAAAAAAAAEg4zCURERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAABdaVAAAAAAAAAAAAAA3OHtERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAJKRfVN3A0U5AnIAAAAAMXFERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAB5AUhgTpCMaxkAAAAADxB7RERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAC0l7IyM1Po8AAAAAMF9WRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAGKJe0RWKQAAAAAAAB1WRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAACFS3t7jQAAAAAAAIdWRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAflJWdgAAAAAAchtWRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAACVpGgAAAAAATIB7RERERERERCNSWgAAWlIjRERERERERERWTwAAAAAAAAAAAAAAAFF2MQAAAAAAZYEjRERERERERCNSWgAAWlIjREREREREI1Z7QwAAAAAAAAAAAAAAAAAkDwAAAAB0XntERERERERERCNSWgAAWlIjREREREQjBl5GiAAAAAAAAAAAAAAAAAAAAAAAcnM0RERERERERERERCNSWgAAWlIjRERERERWZzAAAAAAAAAAAAAAAAAAAAAAYQI7aisJRERERERERERERCNSWgAAWlIjREREREQJaI5mZmZmZmZmZmZmZmYnWxZnDAeBewlERERERERERERERCNSWgAAWlIjREREREREIwkJCQkJCQkJCQkJCQlke1ZWVgkjRERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWjJ7IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI3syWgAAWBAyUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUjIQWAAAYVhaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpYYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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";
let b;
async function dA(a) {
  b = a, console.log(`${b} plugin enabled`), orca.themes.injectCSSResource(`${b}/dist/index.css`, b), await orca.plugins.setSettingsSchema(b, {
    apiKey: {
      label: "API Key",
      description: "Your Readwise access token. Get it from https://readwise.io/access_token",
      type: "string"
    },
    autoSyncEnabled: {
      label: "Enable Auto Sync",
      description: "Automatically sync highlights at regular intervals (minimum 5 minutes)",
      type: "boolean",
      defaultValue: !1
    },
    syncInterval: {
      label: "Auto Sync Interval (minutes)",
      description: "How often to automatically sync highlights (minimum: 5 minutes, recommended: 60 minutes)",
      type: "number",
      defaultValue: 60
    },
    syncCategory: {
      label: "Sync Category",
      description: "Select which category to sync: all (sync everything), books, articles, tweets, podcasts, or supplementals",
      type: "string",
      defaultValue: "all",
      enum: ["all", "books", "articles", "tweets", "supplementals", "podcasts"]
    },
    defaultSyncMode: {
      label: "Default Sync Mode",
      description: "Incremental: only fetch new highlights since last sync. Full: fetch all highlights every time.",
      type: "string",
      defaultValue: "incremental",
      enum: ["incremental", "full"]
    },
    includeTags: {
      label: "Include Tags",
      description: "Include tags when importing highlights",
      type: "boolean",
      defaultValue: !0
    },
    lastSyncDate: {
      label: "Last Sync Time",
      description: 'Last successful sync timestamp. Use "Reset Sync Time" from toolbar menu to reset.',
      type: "string",
      defaultValue: ""
    }
  }), await gA(b);
}
async function uA() {
  console.log("Readwise Sync plugin disabled"), await RA();
  try {
    orca.themes.removeCSSResources(b);
  } catch {
  }
  try {
    orca.headbar?.unregisterHeadbarButton?.(`${b}.sync`);
  } catch {
  }
  try {
    orca.commands.unregisterCommand(`${b}.sync`);
  } catch {
  }
  try {
    orca.commands.unregisterCommand(`${b}.fullSync`);
  } catch {
  }
  try {
    orca.commands.unregisterCommand(`${b}.testConnection`);
  } catch {
  }
  try {
    orca.commands.unregisterCommand(`${b}.resetSyncTime`);
  } catch {
  }
}
async function z() {
  const a = {
    apiKey: "",
    defaultSyncMode: "incremental",
    autoSyncEnabled: !1,
    syncInterval: 60,
    lastSyncDate: "",
    syncCategory: "all",
    includeTags: !0
  };
  try {
    return await orca.plugins.getData("readwise-sync", "settings") || a;
  } catch {
    return a;
  }
}
function cA(a) {
  orca.state.commands?.[`${a}.sync`] == null && orca.commands.registerCommand(
    `${a}.sync`,
    async () => {
      try {
        const A = orca.state.plugins[a]?.settings || await z();
        if (m.settings = { ...m.settings, ...A }, !m.settings.apiKey) {
          orca.notify("error", "Please configure your Readwise API Key in settings");
          return;
        }
        orca.notify("info", "Starting incremental sync...");
        const t = await m.performSync("incremental");
        orca.notify("success", `Sync completed: ${t.newCount || 0} new highlights`);
      } catch (A) {
        orca.notify("error", `Sync failed: ${A?.message || String(A)}`);
      }
    },
    "Sync Readwise Highlights (Incremental)"
  ), orca.state.commands?.[`${a}.fullSync`] == null && orca.commands.registerCommand(
    `${a}.fullSync`,
    async () => {
      try {
        const A = orca.state.plugins[a]?.settings || await z();
        if (m.settings = { ...m.settings, ...A }, !m.settings.apiKey) {
          orca.notify("error", "Please configure your Readwise API Key in settings");
          return;
        }
        orca.notify("info", "Starting full sync...");
        const t = await m.performSync("full");
        orca.notify("success", `Full sync completed: ${t.newCount || 0} highlights`);
      } catch (A) {
        orca.notify("error", `Sync failed: ${A?.message || String(A)}`);
      }
    },
    "Full Sync Readwise Highlights"
  ), orca.state.commands?.[`${a}.testConnection`] == null && orca.commands.registerCommand(
    `${a}.testConnection`,
    async () => {
      try {
        await new Promise((t) => setTimeout(t, 100));
        let A = null;
        return orca.state.plugins?.[a]?.settings && (A = orca.state.plugins[a].settings, console.log("[Test Connection] Loaded settings from orca.state.plugins:", A)), (!A || !A.apiKey) && (A = await z(), console.log("[Test Connection] Loaded settings from getData:", A)), m.settings = { ...m.settings, ...A }, console.log("[Test Connection] Final settings:", m.settings), !m.settings.apiKey || m.settings.apiKey.trim() === "" ? (orca.notify("error", "Please configure your Readwise API Key in settings"), !1) : (await m.validateConnection(), orca.notify("success", "Readwise connection successful"), !0);
      } catch (A) {
        return orca.notify("error", `Readwise connection failed: ${A?.message || "Unknown error"}`), !1;
      }
    },
    "Test Readwise Connection"
  ), orca.state.commands?.[`${a}.resetSyncTime`] == null && orca.commands.registerCommand(
    `${a}.resetSyncTime`,
    async () => {
      try {
        const t = {
          ...orca.state.plugins[a]?.settings || await z(),
          lastSyncDate: ""
        };
        return await orca.plugins.setData("readwise-sync", "settings", JSON.stringify(t)), m.settings = { ...m.settings, ...t }, orca.notify("success", "Sync time has been reset. Next sync will fetch all highlights."), console.log("[Reset Sync Time] Sync time has been reset"), !0;
      } catch (A) {
        return orca.notify("error", `Failed to reset sync time: ${A?.message || "Unknown error"}`), !1;
      }
    },
    "Reset Last Sync Time"
  );
}
function iA(a) {
  if (orca.state.headbarButtons?.[`${a}.sync`] == null)
    try {
      const A = orca.components.Button, t = orca.components.HoverContextMenu, e = orca.components.MenuText;
      if (!A || !t || !e) {
        console.error("[Readwise Sync] Required components not available");
        return;
      }
      let n = null;
      const s = () => {
        const g = nA(f), c = g.isSyncing, o = g.progress;
        let i = "";
        return c && o.message ? i = o.message : c && (i = "同步中..."), /* @__PURE__ */ N.jsx(
          t,
          {
            menu: (l) => /* @__PURE__ */ N.jsxs(N.Fragment, { children: [
              /* @__PURE__ */ N.jsx(
                e,
                {
                  title: c ? "正在同步中..." : "Sync Now (Incremental)",
                  onClick: async () => {
                    c || (l(), await orca.commands.invokeCommand(`${a}.sync`));
                  },
                  disabled: c
                }
              ),
              /* @__PURE__ */ N.jsx(
                e,
                {
                  title: "Full Sync (All Highlights)",
                  onClick: async () => {
                    c || (l(), await orca.commands.invokeCommand(`${a}.fullSync`));
                  },
                  disabled: c
                }
              ),
              /* @__PURE__ */ N.jsx(
                e,
                {
                  title: "Test Connection",
                  onClick: async () => {
                    c || (l(), await orca.commands.invokeCommand(`${a}.testConnection`));
                  },
                  disabled: c
                }
              ),
              /* @__PURE__ */ N.jsx(
                e,
                {
                  title: "Reset Sync Time",
                  onClick: async () => {
                    c || (l(), await orca.commands.invokeCommand(`${a}.resetSyncTime`));
                  },
                  disabled: c
                }
              )
            ] }),
            children: /* @__PURE__ */ N.jsxs(
              A,
              {
                variant: "plain",
                onClick: () => {
                  c || orca.commands.invokeCommand(`${a}.sync`);
                },
                disabled: c,
                style: { opacity: c ? 0.5 : 1 },
                children: [
                  /* @__PURE__ */ N.jsx("img", { className: "readwise-sync-button", src: aA, alt: "Readwise Sync" }),
                  i && /* @__PURE__ */ N.jsx("span", { style: { marginLeft: "8px", fontSize: "12px" }, children: i })
                ]
              }
            )
          }
        );
      };
      orca.headbar.registerHeadbarButton(
        `${a}.sync`,
        () => s()
      );
      const r = oA(f, () => {
        orca.headbar.unregisterHeadbarButton(`${a}.sync`), orca.headbar.registerHeadbarButton(
          `${a}.sync`,
          () => s()
        );
      });
      window.__readwiseSyncUnsubscribe = r, console.log("[Readwise Sync] Headbar button registered successfully");
    } catch (A) {
      console.error("[Readwise Sync] Failed to register headbar button:", A);
    }
  else
    console.log("[Readwise Sync] Headbar button already registered");
}
function lA(a) {
  m.settings = { ...m.settings, ...a }, typeof m.setupAutoSync == "function" && m.setupAutoSync();
}
async function gA(a) {
  const A = await z();
  lA(A), cA(a), await new Promise((t) => setTimeout(t, 100)), iA(a);
}
async function RA() {
  typeof m.cleanup == "function" && m.cleanup();
}
export {
  dA as load,
  uA as unload
};
