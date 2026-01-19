var x = { exports: {} }, v = {};
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
  var s = G, A = Symbol.for("react.element"), t = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, o = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = { key: !0, ref: !0, __self: !0, __source: !0 };
  function l(g, a, r) {
    var c, i = {}, d = null, E = null;
    r !== void 0 && (d = "" + r), a.key !== void 0 && (d = "" + a.key), a.ref !== void 0 && (E = a.ref);
    for (c in a) e.call(a, c) && !n.hasOwnProperty(c) && (i[c] = a[c]);
    if (g && g.defaultProps) for (c in a = g.defaultProps, a) i[c] === void 0 && (i[c] = a[c]);
    return { $$typeof: A, type: g, key: d, ref: E, props: i, _owner: o.current };
  }
  return v.Fragment = t, v.jsx = l, v.jsxs = l, v;
}
var O;
function Z() {
  return O || (O = 1, x.exports = q()), x.exports;
}
var N = Z();
const _ = Symbol(), Y = Object.getPrototypeOf, J = /* @__PURE__ */ new WeakMap(), X = (s) => s && (J.has(s) ? J.get(s) : Y(s) === Object.prototype || Y(s) === Array.prototype), AA = (s) => X(s) && s[_] || null, K = (s, A = !0) => {
  J.set(s, A);
}, F = {}, H = (s) => typeof s == "object" && s !== null, B = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakSet(), tA = (s = Object.is, A = (r, c) => new Proxy(r, c), t = (r) => H(r) && !M.has(r) && (Array.isArray(r) || !(Symbol.iterator in r)) && !(r instanceof WeakMap) && !(r instanceof WeakSet) && !(r instanceof Error) && !(r instanceof Number) && !(r instanceof Date) && !(r instanceof String) && !(r instanceof RegExp) && !(r instanceof ArrayBuffer), e = (r) => {
  switch (r.status) {
    case "fulfilled":
      return r.value;
    case "rejected":
      throw r.reason;
    default:
      throw r;
  }
}, o = /* @__PURE__ */ new WeakMap(), n = (r, c, i = e) => {
  const d = o.get(r);
  if (d?.[0] === c)
    return d[1];
  const E = Array.isArray(r) ? [] : Object.create(Object.getPrototypeOf(r));
  return K(E, !0), o.set(r, [c, E]), Reflect.ownKeys(r).forEach((S) => {
    if (Object.getOwnPropertyDescriptor(E, S))
      return;
    const m = Reflect.get(r, S), { enumerable: p } = Reflect.getOwnPropertyDescriptor(
      r,
      S
    ), y = {
      value: m,
      enumerable: p,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: !0
    };
    if (M.has(m))
      K(m, !1);
    else if (m instanceof Promise)
      delete y.value, y.get = () => i(m);
    else if (B.has(m)) {
      const [k, I] = B.get(
        m
      );
      y.value = n(
        k,
        I(),
        i
      );
    }
    Object.defineProperty(E, S, y);
  }), Object.preventExtensions(E);
}, l = /* @__PURE__ */ new WeakMap(), g = [1, 1], a = (r) => {
  if (!H(r))
    throw new Error("object required");
  const c = l.get(r);
  if (c)
    return c;
  let i = g[0];
  const d = /* @__PURE__ */ new Set(), E = (h, u = ++g[0]) => {
    i !== u && (i = u, d.forEach((R) => R(h, u)));
  };
  let S = g[1];
  const m = (h = ++g[1]) => (S !== h && !d.size && (S = h, y.forEach(([u]) => {
    const R = u[1](h);
    R > i && (i = R);
  })), i), p = (h) => (u, R) => {
    const b = [...u];
    b[1] = [h, ...b[1]], E(b, R);
  }, y = /* @__PURE__ */ new Map(), k = (h, u) => {
    if ((F ? "production" : void 0) !== "production" && y.has(h))
      throw new Error("prop listener already exists");
    if (d.size) {
      const R = u[3](p(h));
      y.set(h, [u, R]);
    } else
      y.set(h, [u]);
  }, I = (h) => {
    var u;
    const R = y.get(h);
    R && (y.delete(h), (u = R[1]) == null || u.call(R));
  }, j = (h) => (d.add(h), d.size === 1 && y.forEach(([R, b], P) => {
    if ((F ? "production" : void 0) !== "production" && b)
      throw new Error("remove already exists");
    const Q = R[3](p(P));
    y.set(P, [R, Q]);
  }), () => {
    d.delete(h), d.size === 0 && y.forEach(([R, b], P) => {
      b && (b(), y.set(P, [R]));
    });
  }), D = Array.isArray(r) ? [] : Object.create(Object.getPrototypeOf(r)), T = A(D, {
    deleteProperty(h, u) {
      const R = Reflect.get(h, u);
      I(u);
      const b = Reflect.deleteProperty(h, u);
      return b && E(["delete", [u], R]), b;
    },
    set(h, u, R, b) {
      const P = Reflect.has(h, u), Q = Reflect.get(h, u, b);
      if (P && (s(Q, R) || l.has(R) && s(Q, l.get(R))))
        return !0;
      I(u), H(R) && (R = AA(R) || R);
      let $ = R;
      if (R instanceof Promise)
        R.then((W) => {
          R.status = "fulfilled", R.value = W, E(["resolve", [u], W]);
        }).catch((W) => {
          R.status = "rejected", R.reason = W, E(["reject", [u], W]);
        });
      else {
        !B.has(R) && t(R) && ($ = a(R));
        const W = !M.has($) && B.get($);
        W && k(u, W);
      }
      return Reflect.set(h, u, $, b), E(["set", [u], R, Q]), !0;
    }
  });
  l.set(r, T);
  const L = [
    D,
    m,
    n,
    j
  ];
  return B.set(T, L), Reflect.ownKeys(r).forEach((h) => {
    const u = Object.getOwnPropertyDescriptor(
      r,
      h
    );
    "value" in u && (T[h] = r[h], delete u.value, delete u.writable), Object.defineProperty(D, h, u);
  }), T;
}) => [
  // public functions
  a,
  // shared state
  B,
  M,
  // internal things
  s,
  A,
  t,
  e,
  o,
  n,
  l,
  g
], [eA] = tA();
function V(s = {}) {
  return eA(s);
}
function oA(s, A, t) {
  const e = B.get(s);
  (F ? "production" : void 0) !== "production" && !e && console.warn("Please use proxy object");
  let o;
  const n = [], l = e[3];
  let g = !1;
  const r = l((c) => {
    n.push(c), o || (o = Promise.resolve().then(() => {
      o = void 0, g && A(n.splice(0));
    }));
  });
  return g = !0, () => {
    g = !1, r();
  };
}
function nA(s, A) {
  const t = B.get(s);
  (F ? "production" : void 0) !== "production" && !t && console.warn("Please use proxy object");
  const [e, o, n] = t;
  return n(e, o(), A);
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
    const e = `${this.baseURL}${A}`, o = {
      headers: {
        Authorization: `Token ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      ...t
    };
    try {
      this.requestState.requestCount++;
      const n = await fetch(e, o);
      if (!n.ok) {
        const l = n.status === 401 ? "AUTH_ERROR" : n.status === 429 ? "RATE_LIMIT_ERROR" : "NETWORK_ERROR";
        throw new Error(`${l}: HTTP ${n.status} - ${await n.text()}`);
      }
      return await n.json();
    } catch (n) {
      throw this.requestState.lastError = n.message, console.error("Readwise API Request Failed:", n), n;
    }
  }
  //📖 分页获取所有高亮内容
  //核心同步接口 实现了基于游标的分页机制，支持增量同步：
  async getHighlights(A = null) {
    let t = [], e = null, o = 1;
    console.log(`🔄 Fetching highlights ${A ? `updated after ${A}` : "all time"}`);
    do {
      const n = new URLSearchParams({
        page_size: "1000"
        // Readwise API 允许的最大页大小
      });
      A && n.append("updated_after", A), e && n.append("page", o.toString());
      try {
        const l = await this.makeRequest(`/highlights?${n.toString()}`);
        l?.results ? (t = t.concat(l.results), console.log(`📄 Page ${o}: ${l.results.length} highlights`), e = l.next ? o + 1 : null, o++, await this.delay(100)) : e = null;
      } catch (l) {
        throw console.error(`❌ Failed to fetch page ${o}:`, l), l;
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
      const o = new URLSearchParams();
      e && o.append("pageCursor", e), A && o.append("updatedAfter", A), console.log(`Making export API request with params: ${o.toString()}`);
      try {
        const n = await this.makeRequest(`/export/?${o.toString()}`);
        n?.results ? (t = t.concat(n.results), e = n.nextPageCursor, console.log(`📄 Fetched ${n.results.length} books, total highlights so far: ${t.reduce((l, g) => l + (g.highlights?.length || 0), 0)}`)) : e = null, e && await this.delay(100);
      } catch (n) {
        throw console.error("❌ Failed to export page:", n), n;
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
      categories: [...new Set(e.map((o) => o.category))]
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
      const o = await this.syncHighlightsToOrca(e);
      this.updateSyncStats(o, A), await this.saveLastSyncDate(), o.syncRootBlockId && await this.moveSyncBlockToTodayJournal(o.syncRootBlockId);
      const l = Date.now() - t, g = Math.floor(l / 6e4), a = Math.floor(l % 6e4 / 1e3);
      return orca.notify("success", `同步完成，本次同步 ${o.newCount} 条数据，耗时 ${g} 分 ${a} 秒。`), o;
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
      const e = await this.readwiseAPI.exportHighlights(A), o = [];
      for (const c of e)
        if (c.highlights && Array.isArray(c.highlights))
          for (const i of c.highlights)
            o.push({
              ...i,
              book_title: c.title,
              author: c.author,
              category: c.category || "books"
            });
      f.progress = {
        current: 0,
        total: o.length,
        message: `已获取 ${o.length} 条高亮`
      };
      const { createdBlocks: n, failedBlocks: l, syncRootBlockId: g } = await this.createOrcaBlocks(o), a = this.categorizeHighlights(o), r = Date.now() - t;
      return {
        totalCount: o.length,
        newCount: n.length,
        failedCount: l.length,
        duration: r,
        categories: a,
        syncRootBlockId: g
        // 返回同步标记块 ID
      };
    } catch (e) {
      throw console.error("Failed to fetch highlights:", e), new Error(`FETCH_ERROR: ${e.message}`);
    }
  }
  //🔍 数据过滤与分类处理
  //根据用户配置过滤和分类高亮内容：
  processHighlights(A, t) {
    const e = A.filter(
      (l) => this.shouldSyncHighlight(l)
    ), o = this.categorizeHighlights(e), n = Date.now() - t;
    return {
      totalCount: A.length,
      newCount: e.length,
      duration: n,
      categories: o,
      highlights: e
    };
  }
  shouldSyncHighlight(A) {
    return this.settings.lastSyncDate ? !(A.updated_at && A.updated_at <= this.settings.lastSyncDate || !this.isCategoryEnabled(A.category)) : !0;
  }
  categorizeHighlights(A) {
    const t = {};
    return A.forEach((e) => {
      const o = e.category || "uncategorized";
      t[o] = (t[o] || 0) + 1;
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
        } catch (o) {
          console.error(`Failed to add tag ${e} to block ${A}:`, o);
        }
  }
  //💾 Orca 数据写入
  //将高亮内容转换为 Orca 块格式并写入系统：
  async createOrcaBlocks(A) {
    const t = [], e = [];
    console.log("Starting to create blocks for", A.length, "highlights");
    let o = null;
    const n = orca.state?.blocks;
    if (n)
      for (const p in n) {
        const y = n[p];
        if (!y.parent && !y.left) {
          o = p, console.log("Found root block:", o);
          break;
        }
      }
    if (!o)
      throw new Error("No root block found. Please open a document or journal page first.");
    console.log("Using root block ID:", o);
    const l = /* @__PURE__ */ new Date(), g = l.getFullYear(), a = String(l.getMonth() + 1).padStart(2, "0"), r = String(l.getDate()).padStart(2, "0"), c = String(l.getHours()).padStart(2, "0"), i = String(l.getMinutes()).padStart(2, "0"), d = String(l.getSeconds()).padStart(2, "0"), S = `ReadwiseSyncToOrca${`${g}${a}${r}${c}${i}${d}`}`;
    let m = null;
    try {
      if (m = await orca.commands.invokeEditorCommand(
        "core.editor.insertBlock",
        null,
        o,
        "lastChild",
        [{ t: "t", v: S }]
      ), console.log("Created sync root block with ID:", m), m) {
        await orca.commands.invokeEditorCommand("core.editor.makeHeading2", null, m);
        try {
          await orca.commands.invokeEditorCommand(
            "core.editor.insertTag",
            null,
            m,
            "Readwise"
          ), console.log("Added Readwise tag to sync block");
        } catch (I) {
          console.warn("Failed to add tag to sync block:", I);
        }
        await this.delay(100), f.progress.total = A.length, f.progress.message = "创建 Orca 块...", console.log("Creating category structure for", A.length, "highlights");
        const p = A.filter((I) => {
          const j = this.formatBlockContent(I);
          return j && j.trim() !== "";
        });
        console.log("Valid highlights to create:", p.length);
        const y = this.groupHighlightsByCategory(p);
        console.log("Grouped highlights by category:", Object.keys(y).map((I) => `${I}: ${y[I].length}`)), await this.createCategoryBlocks(m, y, t, e), f.progress.current = t.length, f.progress.message = `已创建 ${t.length}/${p.length} 个块`, console.log("Created", t.length, "blocks, failed", e.length), await this.delay(200);
        const k = orca.state.blocks[m];
        k ? (console.log("Sync block verification:", {
          id: k.id,
          text: k.text,
          content: k.content,
          children: k.children?.length || 0,
          parent: k.parent,
          left: k.left
        }), k.children && Array.isArray(k.children) ? (console.log("Children block IDs:", k.children), k.children.forEach((I, j) => {
          const D = orca.state.blocks[I];
          D ? console.log(`Child ${j}:`, {
            id: D.id,
            parent: D.parent,
            left: D.left,
            text: D.text?.substring(0, 30)
          }) : console.warn(`Child block ${I} not found in state!`);
        })) : console.warn("Sync block has no children array")) : console.warn("Sync block not found in orca.state.blocks after creation!");
      }
    } catch (p) {
      throw console.error("Failed to create sync block:", p), new Error("Failed to create sync block: " + p.message);
    }
    return { createdBlocks: t, failedBlocks: e, syncRootBlockId: m };
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
      const o = e.category || "books";
      t[o] ? t[o].push(e) : t.books.push(e);
    }
    return t;
  }
  // 创建分类块和高亮块的三级结构
  async createCategoryBlocks(A, t, e, o) {
    console.log("Creating category blocks...");
    const n = ["books", "articles", "tweets", "supplementals", "podcasts"];
    orca.state.blocks[A].children || (orca.state.blocks[A].children = []);
    let l = null;
    const g = orca.state?.blocks;
    if (g)
      for (const c in g) {
        const i = g[c];
        if (!i.parent && !i.left) {
          l = c;
          break;
        }
      }
    if (!l) {
      console.error("No root block found for creating category blocks");
      return;
    }
    const a = {};
    for (let c = 0; c < n.length; c++) {
      const i = n[c], d = t[i];
      if (!d || d.length === 0) {
        console.log(`Skipping category ${i} (no highlights)`);
        continue;
      }
      try {
        const E = await orca.commands.invokeEditorCommand(
          "core.editor.insertBlock",
          null,
          l,
          "lastChild",
          [{ t: "t", v: i }]
        );
        await orca.commands.invokeEditorCommand("core.editor.makeHeading3", null, E);
        try {
          await orca.commands.invokeEditorCommand(
            "core.editor.insertTag",
            null,
            E,
            `Readwise/${i}`
          );
        } catch (S) {
          console.warn(`Failed to add tag to category block ${i}:`, S);
        }
        a[i] = E, console.log(`Created category block ${E} for ${i}`);
      } catch (E) {
        console.error(`Failed to create category block for ${i}:`, E);
      }
    }
    console.log("Created category blocks:", Object.keys(a)), await this.delay(100);
    const r = Object.keys(a).map((c) => a[c]);
    if (r.length > 0) {
      console.log(`Moving ${r.length} category blocks to sync root...`);
      try {
        await orca.commands.invokeEditorCommand(
          "core.editor.moveBlocks",
          null,
          r,
          A,
          "lastChild"
        ), console.log(`Moved ${r.length} category blocks to sync root using moveBlocks`);
      } catch (c) {
        console.error("Failed to move category blocks using moveBlocks:", c);
      }
      for (let c = 0; c < r.length; c++) {
        const i = r[c], d = c > 0 ? r[c - 1] : null;
        orca.state.blocks[i] && (orca.state.blocks[i].parent = A, orca.state.blocks[i].left = d, console.log(`Set category block ${i}: parent=${A}, left=${d}`)), orca.state.blocks[A].children.includes(i) || orca.state.blocks[A].children.push(i);
      }
      console.log("All category blocks moved and properties set");
    }
    for (const c of n) {
      const i = a[c], d = t[c];
      !i || !d || d.length === 0 || (console.log(`Creating highlights for category ${c} (${d.length} highlights)...`), await this.createBlocksIndividually(
        i,
        c,
        d,
        e,
        o
      ), console.log(`Completed category ${c}`));
    }
    console.log("All category blocks and highlights created");
  }
  // 并发创建独立块，然后移动到同步标记块下
  async createBlocksIndividually(A, t, e, o, n) {
    console.log(`Creating ${e.length} blocks for category ${t}...`);
    const l = e.length;
    let g;
    l > 600 ? g = 200 : l > 200 ? g = 100 : g = 50;
    let a;
    return l > 1e3 ? a = 100 : l > 500 ? a = 80 : l > 200 ? a = 50 : a = 30, console.log(`Using adaptive concurrency: ${a} for ${l} highlights`), await this.createBlocksIndividuallyLegacy(
      A,
      t,
      e,
      o,
      n,
      g,
      a
    );
  }
  // 原有的逐个创建方法（高并发优化版）
  async createBlocksIndividuallyLegacy(A, t, e, o, n, l, g) {
    let a = null;
    const r = orca.state?.blocks;
    if (r)
      for (const E in r) {
        const S = r[E];
        if (!S.parent && !S.left) {
          a = E;
          break;
        }
      }
    if (!a)
      throw new Error("No root block found for creating independent blocks");
    const c = async (E, S) => {
      const m = this.formatBlockContent(E);
      try {
        return { success: !0, blockId: await orca.commands.invokeEditorCommand(
          "core.editor.insertBlock",
          null,
          a,
          "lastChild",
          [{ t: "t", v: m }]
        ), highlight: E, index: S };
      } catch (p) {
        return { success: !1, error: p, highlight: E, index: S };
      }
    }, i = [];
    let d = 0;
    for (let E = 0; E < e.length; E += g) {
      const m = e.slice(E, E + g).map(
        (y, k) => c(y, E + k)
      ), p = await Promise.all(m);
      for (const y of p)
        y.success ? (i.push({
          id: y.blockId,
          content: this.formatBlockContent(y.highlight),
          originalIndex: y.index
        }), o.push({ id: y.blockId, content: this.formatBlockContent(y.highlight) }), d++) : n.push({ highlight: y.highlight, error: y.error });
      (d % l === 0 || d === e.length) && (f.progress.current = d, f.progress.message = `${t}: ${d}/${e.length}`);
    }
    return console.log(`Created ${i.length} independent blocks for category ${t}`), i.sort((E, S) => E.originalIndex - S.originalIndex), await this.moveBlocksToParent(A, i), i.length;
  }
  // 移动块到父块下并设置正确的parent/left/children属性
  async moveBlocksToParent(A, t) {
    if (t.length === 0) return;
    console.log(`Moving ${t.length} blocks to parent ${A}...`), orca.state.blocks[A].children || (orca.state.blocks[A].children = []);
    const e = t.map((n) => n.id);
    try {
      await orca.commands.invokeEditorCommand(
        "core.editor.moveBlocks",
        null,
        e,
        A,
        "lastChild"
      ), console.log(`Moved ${e.length} blocks to parent ${A} using moveBlocks`);
    } catch (n) {
      console.error("Failed to move blocks using moveBlocks:", n);
    }
    const o = orca.state.blocks[A].children;
    for (let n = 0; n < t.length; n++) {
      const g = t[n].id, a = n > 0 ? t[n - 1].id : null;
      orca.state.blocks[g] && (orca.state.blocks[g].parent = A, orca.state.blocks[g].left = a, console.log(`Set block ${g}: parent=${A}, left=${a}`)), o.includes(g) || o.push(g);
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
      console.log("Getting today journal block using orca.invokeBackend");
      try {
        const A = await orca.invokeBackend("get-journal-block", /* @__PURE__ */ new Date());
        if (A) {
          console.log("Found today's journal block:", A);
          const t = A.id || A;
          return {
            rootBlockId: t,
            view: "journal",
            id: t
          };
        }
      } catch (A) {
        console.log("get-journal-block failed, trying alternative method:", A);
      }
      try {
        const A = /* @__PURE__ */ new Date(), t = A.getFullYear(), e = String(A.getMonth() + 1).padStart(2, "0"), o = String(A.getDate()).padStart(2, "0"), n = `${t}-${e}-${o}`;
        console.log("Searching for journal block with date:", n);
        const l = orca.state?.blocks;
        if (l)
          for (const g in l) {
            const a = l[g];
            if (a.text && (a.text.includes(n) || a.text.includes("Journal")))
              return console.log("Found potential journal block by text:", g, a), {
                rootBlockId: g,
                view: "journal",
                id: g
              };
          }
      } catch (A) {
        console.log("Failed to search for journal block:", A);
      }
      return console.warn("Could not get today journal page"), null;
    } catch (A) {
      return console.error("Error getting today's journal page:", A), null;
    }
  }
  // 将同步标记块移动到今日 journal page
  async moveSyncBlockToTodayJournal(A) {
    try {
      console.log("Moving sync block to today journal:", A);
      const t = await this.getOrCreateTodayJournalPage();
      if (!t || !t.rootBlockId) {
        console.warn("Failed to get today journal page, skipping move");
        return;
      }
      const e = t.rootBlockId;
      if (console.log("Found today journal root block:", e), !orca.state.blocks[A]) {
        console.warn("Sync block not found in state:", A);
        return;
      }
      if (A === e) {
        console.log("Sync block is the same as journal root block, no move needed");
        return;
      }
      if (this.isBlockDescendant(A, e)) {
        console.log("Sync block is already a descendant of journal page, no move needed");
        return;
      }
      if (this.isBlockDescendant(e, A)) {
        console.warn("Journal block is a descendant of sync block, cannot move (would create cycle)");
        return;
      }
      if (orca.state.blocks[A].parent === e) {
        console.log("Sync block is already in today journal page");
        return;
      }
      try {
        await orca.commands.invokeEditorCommand(
          "core.editor.moveBlocks",
          null,
          [A],
          e,
          "lastChild"
        ), console.log("Successfully moved sync block to today journal page");
      } catch (n) {
        console.error("Failed to move sync block:", n);
      }
    } catch (t) {
      console.error("Error moving sync block to today journal:", t);
    }
  }
  // 检查一个块是否是另一个块的后代
  isBlockDescendant(A, t) {
    try {
      if (!orca.state.blocks[A] || !orca.state.blocks[t])
        return !1;
      let e = A;
      const o = /* @__PURE__ */ new Set();
      for (; e && !o.has(e); ) {
        if (o.add(e), e === t)
          return !0;
        const n = orca.state.blocks[e];
        if (!n)
          break;
        e = n.parent;
      }
      return !1;
    } catch (e) {
      return console.error("Error checking block descendants:", e), !1;
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
      const o = orca.state.blocks[e];
      if (!o.parent)
        return console.log("Found root block by iteration:", o), e;
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
    const A = /* @__PURE__ */ new Date(), t = new Date(A.getTime() + 480 * 60 * 1e3 + A.getTimezoneOffset() * 60 * 1e3), e = t.getFullYear(), o = String(t.getMonth() + 1).padStart(2, "0"), n = String(t.getDate()).padStart(2, "0"), l = String(t.getHours()).padStart(2, "0"), g = String(t.getMinutes()).padStart(2, "0"), a = String(t.getSeconds()).padStart(2, "0"), r = `${e}-${o}-${n} ${l}:${g}:${a}`;
    this.settings.lastSyncDate = r;
    try {
      const c = {
        apiKey: this.settings.apiKey || "",
        defaultSyncMode: this.settings.defaultSyncMode || "incremental",
        autoSyncEnabled: this.settings.autoSyncEnabled || !1,
        syncInterval: this.settings.syncInterval || 60,
        lastSyncDate: r,
        syncCategory: this.settings.syncCategory || "all",
        includeTags: this.settings.includeTags !== !1
      };
      await orca.plugins.setSettings("app", "readwise-sync", c), console.log("Updated settings via setSettings:", r);
    } catch (c) {
      console.error("Failed to update settings via setSettings:", c);
      try {
        const i = {
          apiKey: this.settings.apiKey || "",
          defaultSyncMode: this.settings.defaultSyncMode || "incremental",
          autoSyncEnabled: this.settings.autoSyncEnabled || !1,
          syncInterval: this.settings.syncInterval || 60,
          lastSyncDate: r,
          syncCategory: this.settings.syncCategory || "all",
          includeTags: this.settings.includeTags !== !1
        };
        await orca.plugins.setData("readwise-sync", "settings", JSON.stringify(i)), console.log("Saved last sync date via setData:", r);
      } catch (i) {
        console.error("Failed to save via setData:", i);
      }
    }
  }
}
const w = new rA(), aA = "data:image/png;base64,AAABAAMAMDAAAAEACACoDgAANgAAACAgAAABAAgAqAgAAN4OAAAQEAAAAQAIAGgFAACGFwAAKAAAADAAAABgAAAAAQAIAAAAAAAACQAAAAAAAAAAAAAAAQAAAAAAAAAAAAC3t7QAFxcXAEBAPwBpaWcAu7u3AOTk3wDS0s4AbW1qAPv79gDt7egAJCQjALKyrwDb29cAOzs6ABYWFQDNzckA9vbxAAQEBAD6+vQAlpaTAL+/uwCEhIIAHx8eAK2tqgANDQ0AX19dAJ+fnADIyMQAkZGOALq6tgDj494Af399AKiopQDR0c0A+vr1AAgICABaWlgA/v74AHFxbwAMDAsAmpqXADU1MwDa2tYAY2NhAIyMiQC1tbEA9fXwAAMDAwBVVVMA4+PfAL6+ugCsrKkA/v75AIeHhAAjIyMAx8fDACcnJgDe3toAPj49AGdnZQCQkI0Aubm1AFVVVAB+fnwAp6ekAEJCQABra2gA+fn0ADAwLwCCgn8A/f33AP7++gDCwr4A6+vmANnZ1QAQEBAAOTk4APDw7ACLi4gAtLSwAAICAgDi4t4AfX16AAYGBQDm5uEA/f34AP///gAiIiIAnZ2aACYmJQB4eHUAZmZkAI+PjAC4uLQApqajAPj48wAGBgYALy8uAB0dHQD8/PYARkZFAG9vbQCYmJUAwcG9AOrq5QCGhoQAr6+sAEpKSAAPDw8AYWFfAIqKhwATExIA8/PuAAEBAQAqKikAGBgYAEFBQABqamgAWFhXAIGBfwAcHBsA09PPAPz89wCFhYIArq6qAEpKSQCcnJkAxcXBAO7u6QAlJSQAs7OwANzc2AA8PDsAZWVjAI6OiwAXFxYAzs7KAAUFBQAuLi0A5eXhAICAfQBubmwACQkIAOnp5ACJiYYAEhIRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYVhaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpYYQAAWBAyUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUjIQWAAAWjJ7IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI3syWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjREREREREI1ZWVlZWVlZWVlZWRyNERERERCNWVlZWVlZWViNERERERCNSWgAAWlIjREREREQJHCCNjY2NjY2NjY2NfIQJRERECUt8jY2NjY2NeCIJRERERCNSWgAAWlIjRERERERWFAAAAAAAAAAAAAAAKBVHREREEYYAAAAAAAAAMCFWRERERCNSWgAAWlIjREREREQjOkEIbQAAAAAAAGNAa2kjRER7g20AAAAAAIpsfx8jRERERCNSWgAAWlIjRERERERECSZgbgAAAAAAAC01ViNERCOQdQAAAAAAcgQKNSNERERERCNSWgAAWlIjRERERERERERWbwAAAAAAYS5WRERERAmHMAAAAAAATR8JRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WREREZAc3AAAAAAAZGHtERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WREREEVwAAAAAAAAsLxNERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRER7UG0AAAAAADcHe0RERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRCOQQgAAAAAAEj0JRERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRAldMAAAAAAAZUojRERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WCXoLAAAAAABwHntERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WETwAAAAAAAAnYERERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJAVXLm0AAAAAAIsNCURERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAEiw2KgAAAAAAMC1EViNERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAAAAAUYI/WVV7RERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAAAAAAAAAEg4zCURERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAABdaVAAAAAAAAAAAAAA3OHtERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAJKRfVN3A0U5AnIAAAAAMXFERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAB5AUhgTpCMaxkAAAAADxB7RERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAC0l7IyM1Po8AAAAAMF9WRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAGKJe0RWKQAAAAAAAB1WRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAACFS3t7jQAAAAAAAIdWRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAflJWdgAAAAAAchtWRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAACVpGgAAAAAATIB7RERERERERCNSWgAAWlIjRERERERERERWTwAAAAAAAAAAAAAAAFF2MQAAAAAAZYEjRERERERERCNSWgAAWlIjREREREREI1Z7QwAAAAAAAAAAAAAAAAAkDwAAAAB0XntERERERERERCNSWgAAWlIjREREREQjBl5GiAAAAAAAAAAAAAAAAAAAAAAAcnM0RERERERERERERCNSWgAAWlIjRERERERWZzAAAAAAAAAAAAAAAAAAAAAAYQI7aisJRERERERERERERCNSWgAAWlIjREREREQJaI5mZmZmZmZmZmZmZmYnWxZnDAeBewlERERERERERERERCNSWgAAWlIjREREREREIwkJCQkJCQkJCQkJCQlke1ZWVgkjRERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWjJ7IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI3syWgAAWBAyUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUjIQWAAAYVhaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpYYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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";
let C;
async function dA(s) {
  C = s, console.log(`${C} plugin enabled`), orca.themes.injectCSSResource(`${C}/dist/index.css`, C), await orca.plugins.setSettingsSchema(C, {
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
  }), await gA(C);
}
async function uA() {
  console.log("Readwise Sync plugin disabled"), await RA();
  try {
    orca.themes.removeCSSResources(C);
  } catch {
  }
  try {
    orca.headbar?.unregisterHeadbarButton?.(`${C}.sync`);
  } catch {
  }
  try {
    orca.commands.unregisterCommand(`${C}.sync`);
  } catch {
  }
  try {
    orca.commands.unregisterCommand(`${C}.fullSync`);
  } catch {
  }
  try {
    orca.commands.unregisterCommand(`${C}.testConnection`);
  } catch {
  }
  try {
    orca.commands.unregisterCommand(`${C}.resetSyncTime`);
  } catch {
  }
}
async function z() {
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
        const A = orca.state.plugins[s]?.settings || await z();
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
        const A = orca.state.plugins[s]?.settings || await z();
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
        await new Promise((t) => setTimeout(t, 100));
        let A = null;
        return orca.state.plugins?.[s]?.settings && (A = orca.state.plugins[s].settings, console.log("[Test Connection] Loaded settings from orca.state.plugins:", A)), (!A || !A.apiKey) && (A = await z(), console.log("[Test Connection] Loaded settings from getData:", A)), w.settings = { ...w.settings, ...A }, console.log("[Test Connection] Final settings:", w.settings), !w.settings.apiKey || w.settings.apiKey.trim() === "" ? (orca.notify("error", "Please configure your Readwise API Key in settings"), !1) : (await w.validateConnection(), orca.notify("success", "Readwise connection successful"), !0);
      } catch (A) {
        return orca.notify("error", `Readwise connection failed: ${A?.message || "Unknown error"}`), !1;
      }
    },
    "Test Readwise Connection"
  ), orca.state.commands?.[`${s}.resetSyncTime`] == null && orca.commands.registerCommand(
    `${s}.resetSyncTime`,
    async () => {
      try {
        const t = {
          ...orca.state.plugins[s]?.settings || await z(),
          lastSyncDate: ""
        };
        return await orca.plugins.setData("readwise-sync", "settings", JSON.stringify(t)), w.settings = { ...w.settings, ...t }, orca.notify("success", "Sync time has been reset. Next sync will fetch all highlights."), console.log("[Reset Sync Time] Sync time has been reset"), !0;
      } catch (A) {
        return orca.notify("error", `Failed to reset sync time: ${A?.message || "Unknown error"}`), !1;
      }
    },
    "Reset Last Sync Time"
  );
}
function lA(s) {
  if (orca.state.headbarButtons?.[`${s}.sync`] == null)
    try {
      const A = orca.components.Button, t = orca.components.HoverContextMenu, e = orca.components.MenuText;
      if (!A || !t || !e) {
        console.error("[Readwise Sync] Required components not available");
        return;
      }
      let o = null;
      const n = () => {
        const g = nA(f), a = g.isSyncing, r = g.progress;
        let c = "";
        return a && r.message ? c = r.message : a && (c = "同步中..."), /* @__PURE__ */ N.jsx(
          t,
          {
            menu: (i) => /* @__PURE__ */ N.jsxs(N.Fragment, { children: [
              /* @__PURE__ */ N.jsx(
                e,
                {
                  title: a ? "正在同步中..." : "Sync Now (Incremental)",
                  onClick: async () => {
                    a || (i(), await orca.commands.invokeCommand(`${s}.sync`));
                  },
                  disabled: a
                }
              ),
              /* @__PURE__ */ N.jsx(
                e,
                {
                  title: "Full Sync (All Highlights)",
                  onClick: async () => {
                    a || (i(), await orca.commands.invokeCommand(`${s}.fullSync`));
                  },
                  disabled: a
                }
              ),
              /* @__PURE__ */ N.jsx(
                e,
                {
                  title: "Test Connection",
                  onClick: async () => {
                    a || (i(), await orca.commands.invokeCommand(`${s}.testConnection`));
                  },
                  disabled: a
                }
              ),
              /* @__PURE__ */ N.jsx(
                e,
                {
                  title: "Reset Sync Time",
                  onClick: async () => {
                    a || (i(), await orca.commands.invokeCommand(`${s}.resetSyncTime`));
                  },
                  disabled: a
                }
              )
            ] }),
            children: /* @__PURE__ */ N.jsxs(
              A,
              {
                variant: "plain",
                onClick: () => {
                  a || orca.commands.invokeCommand(`${s}.sync`);
                },
                disabled: a,
                style: { opacity: a ? 0.5 : 1 },
                children: [
                  /* @__PURE__ */ N.jsx("img", { className: "readwise-sync-button", src: aA, alt: "Readwise Sync" }),
                  c && /* @__PURE__ */ N.jsx("span", { style: { marginLeft: "8px", fontSize: "12px" }, children: c })
                ]
              }
            )
          }
        );
      };
      orca.headbar.registerHeadbarButton(
        `${s}.sync`,
        () => n()
      );
      const l = oA(f, () => {
        orca.headbar.unregisterHeadbarButton(`${s}.sync`), orca.headbar.registerHeadbarButton(
          `${s}.sync`,
          () => n()
        );
      });
      window.__readwiseSyncUnsubscribe = l, console.log("[Readwise Sync] Headbar button registered successfully");
    } catch (A) {
      console.error("[Readwise Sync] Failed to register headbar button:", A);
    }
  else
    console.log("[Readwise Sync] Headbar button already registered");
}
function iA(s) {
  w.settings = { ...w.settings, ...s }, typeof w.setupAutoSync == "function" && w.setupAutoSync();
}
async function gA(s) {
  const A = await z();
  iA(A), cA(s), await new Promise((t) => setTimeout(t, 100)), lA(s);
}
async function RA() {
  typeof w.cleanup == "function" && w.cleanup();
}
export {
  dA as load,
  uA as unload
};
