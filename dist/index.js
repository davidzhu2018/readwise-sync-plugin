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
var O;
function _() {
  if (O) return v;
  O = 1;
  var r = G, A = Symbol.for("react.element"), t = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, o = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function n(g, a, s) {
    var l, i = {}, u = null, R = null;
    s !== void 0 && (u = "" + s), a.key !== void 0 && (u = "" + a.key), a.ref !== void 0 && (R = a.ref);
    for (l in a) e.call(a, l) && !c.hasOwnProperty(l) && (i[l] = a[l]);
    if (g && g.defaultProps) for (l in a = g.defaultProps, a) i[l] === void 0 && (i[l] = a[l]);
    return { $$typeof: A, type: g, key: u, ref: R, props: i, _owner: o.current };
  }
  return v.Fragment = t, v.jsx = n, v.jsxs = n, v;
}
var U;
function q() {
  return U || (U = 1, F.exports = _()), F.exports;
}
var W = q();
const Z = Symbol(), Y = Object.getPrototypeOf, J = /* @__PURE__ */ new WeakMap(), X = (r) => r && (J.has(r) ? J.get(r) : Y(r) === Object.prototype || Y(r) === Array.prototype), AA = (r) => X(r) && r[Z] || null, V = (r, A = !0) => {
  J.set(r, A);
}, x = {}, H = (r) => typeof r == "object" && r !== null, P = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakSet(), tA = (r = Object.is, A = (s, l) => new Proxy(s, l), t = (s) => H(s) && !T.has(s) && (Array.isArray(s) || !(Symbol.iterator in s)) && !(s instanceof WeakMap) && !(s instanceof WeakSet) && !(s instanceof Error) && !(s instanceof Number) && !(s instanceof Date) && !(s instanceof String) && !(s instanceof RegExp) && !(s instanceof ArrayBuffer), e = (s) => {
  switch (s.status) {
    case "fulfilled":
      return s.value;
    case "rejected":
      throw s.reason;
    default:
      throw s;
  }
}, o = /* @__PURE__ */ new WeakMap(), c = (s, l, i = e) => {
  const u = o.get(s);
  if (u?.[0] === l)
    return u[1];
  const R = Array.isArray(s) ? [] : Object.create(Object.getPrototypeOf(s));
  return V(R, !0), o.set(s, [l, R]), Reflect.ownKeys(s).forEach((I) => {
    if (Object.getOwnPropertyDescriptor(R, I))
      return;
    const h = Reflect.get(s, I), { enumerable: p } = Reflect.getOwnPropertyDescriptor(
      s,
      I
    ), f = {
      value: h,
      enumerable: p,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: !0
    };
    if (T.has(h))
      V(h, !1);
    else if (h instanceof Promise)
      delete f.value, f.get = () => i(h);
    else if (P.has(h)) {
      const [m, S] = P.get(
        h
      );
      f.value = c(
        m,
        S(),
        i
      );
    }
    Object.defineProperty(R, I, f);
  }), Object.preventExtensions(R);
}, n = /* @__PURE__ */ new WeakMap(), g = [1, 1], a = (s) => {
  if (!H(s))
    throw new Error("object required");
  const l = n.get(s);
  if (l)
    return l;
  let i = g[0];
  const u = /* @__PURE__ */ new Set(), R = (y, d = ++g[0]) => {
    i !== d && (i = d, u.forEach((E) => E(y, d)));
  };
  let I = g[1];
  const h = (y = ++g[1]) => (I !== y && !u.size && (I = y, f.forEach(([d]) => {
    const E = d[1](y);
    E > i && (i = E);
  })), i), p = (y) => (d, E) => {
    const C = [...d];
    C[1] = [y, ...C[1]], R(C, E);
  }, f = /* @__PURE__ */ new Map(), m = (y, d) => {
    if ((x ? "production" : void 0) !== "production" && f.has(y))
      throw new Error("prop listener already exists");
    if (u.size) {
      const E = d[3](p(y));
      f.set(y, [d, E]);
    } else
      f.set(y, [d]);
  }, S = (y) => {
    var d;
    const E = f.get(y);
    E && (f.delete(y), (d = E[1]) == null || d.call(E));
  }, D = (y) => (u.add(y), u.size === 1 && f.forEach(([E, C], Q) => {
    if ((x ? "production" : void 0) !== "production" && C)
      throw new Error("remove already exists");
    const j = E[3](p(Q));
    f.set(Q, [E, j]);
  }), () => {
    u.delete(y), u.size === 0 && f.forEach(([E, C], Q) => {
      C && (C(), f.set(Q, [E]));
    });
  }), N = Array.isArray(s) ? [] : Object.create(Object.getPrototypeOf(s)), z = A(N, {
    deleteProperty(y, d) {
      const E = Reflect.get(y, d);
      S(d);
      const C = Reflect.deleteProperty(y, d);
      return C && R(["delete", [d], E]), C;
    },
    set(y, d, E, C) {
      const Q = Reflect.has(y, d), j = Reflect.get(y, d, C);
      if (Q && (r(j, E) || n.has(E) && r(j, n.get(E))))
        return !0;
      S(d), H(E) && (E = AA(E) || E);
      let $ = E;
      if (E instanceof Promise)
        E.then((B) => {
          E.status = "fulfilled", E.value = B, R(["resolve", [d], B]);
        }).catch((B) => {
          E.status = "rejected", E.reason = B, R(["reject", [d], B]);
        });
      else {
        !P.has(E) && t(E) && ($ = a(E));
        const B = !T.has($) && P.get($);
        B && m(d, B);
      }
      return Reflect.set(y, d, $, C), R(["set", [d], E, j]), !0;
    }
  });
  n.set(s, z);
  const L = [
    N,
    h,
    c,
    D
  ];
  return P.set(z, L), Reflect.ownKeys(s).forEach((y) => {
    const d = Object.getOwnPropertyDescriptor(
      s,
      y
    );
    "value" in d && (z[y] = s[y], delete d.value, delete d.writable), Object.defineProperty(N, y, d);
  }), z;
}) => [
  // public functions
  a,
  // shared state
  P,
  T,
  // internal things
  r,
  A,
  t,
  e,
  o,
  c,
  n,
  g
], [eA] = tA();
function K(r = {}) {
  return eA(r);
}
function oA(r, A, t) {
  const e = P.get(r);
  (x ? "production" : void 0) !== "production" && !e && console.warn("Please use proxy object");
  let o;
  const c = [], n = e[3];
  let g = !1;
  const s = n((l) => {
    c.push(l), o || (o = Promise.resolve().then(() => {
      o = void 0, g && A(c.splice(0));
    }));
  });
  return g = !0, () => {
    g = !1, s();
  };
}
function nA(r, A) {
  const t = P.get(r);
  (x ? "production" : void 0) !== "production" && !t && console.warn("Please use proxy object");
  const [e, o, c] = t;
  return c(e, o(), A);
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
    const e = `${this.baseURL}${A}`, o = {
      headers: {
        Authorization: `Token ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      ...t
    };
    try {
      this.requestState.requestCount++;
      const c = await fetch(e, o);
      if (!c.ok) {
        const n = c.status === 401 ? "AUTH_ERROR" : c.status === 429 ? "RATE_LIMIT_ERROR" : "NETWORK_ERROR";
        throw new Error(`${n}: HTTP ${c.status} - ${await c.text()}`);
      }
      return await c.json();
    } catch (c) {
      throw this.requestState.lastError = c.message, console.error("Readwise API Request Failed:", c), c;
    }
  }
  //📖 分页获取所有高亮内容
  //核心同步接口 实现了基于游标的分页机制，支持增量同步：
  async getHighlights(A = null) {
    let t = [], e = null, o = 1;
    console.log(`🔄 Fetching highlights ${A ? `updated after ${A}` : "all time"}`);
    do {
      const c = new URLSearchParams({
        page_size: "1000"
        // Readwise API 允许的最大页大小
      });
      A && c.append("updated_after", A), e && c.append("page", o.toString());
      try {
        const n = await this.makeRequest(`/highlights?${c.toString()}`);
        n?.results ? (t = t.concat(n.results), console.log(`📄 Page ${o}: ${n.results.length} highlights`), e = n.next ? o + 1 : null, o++, await this.delay(100)) : e = null;
      } catch (n) {
        throw console.error(`❌ Failed to fetch page ${o}:`, n), n;
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
        const c = await this.makeRequest(`/export/?${o.toString()}`);
        c?.results ? (t = t.concat(c.results), e = c.nextPageCursor, console.log(`📄 Fetched ${c.results.length} books, total highlights so far: ${t.reduce((n, g) => n + (g.highlights?.length || 0), 0)}`)) : e = null, e && await this.delay(100);
      } catch (c) {
        throw console.error("❌ Failed to export page:", c), c;
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
const w = K({
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
    if (w.isSyncing)
      throw new Error("SYNC_IN_PROGRESS");
    w.isSyncing = !0, w.error = null, w.progress = { current: 0, total: 0, message: "准备同步..." }, orca.notify("info", "正在同步中，请稍候！");
    const t = Date.now();
    try {
      await this.validateConnection();
      let e = null;
      A === "full" ? (e = null, console.log("Performing full sync (all highlights)")) : A === "incremental" ? (e = this.settings.lastSyncDate, console.log("Performing incremental sync", e ? `after ${e}` : "(first sync)")) : (this.settings.defaultSyncMode || "incremental") === "full" ? (e = null, console.log("Performing full sync (default mode)")) : (e = this.settings.lastSyncDate, console.log("Performing incremental sync (default mode)", e ? `after ${e}` : "(first sync)"));
      const o = await this.syncHighlightsToOrca(e);
      this.updateSyncStats(o, A), await this.saveLastSyncDate();
      const n = Date.now() - t, g = Math.floor(n / 6e4), a = Math.floor(n % 6e4 / 1e3);
      return orca.notify("success", `同步完成，本次同步 ${o.newCount} 条数据，耗时 ${g} 分 ${a} 秒。`), o;
    } catch (e) {
      throw w.error = e, orca.notify("error", `同步失败：${e.message}`), e;
    } finally {
      w.isSyncing = !1, w.progress = { current: 0, total: 0, message: "" };
    }
  }
  //📊 分页处理与性能优化
  //处理 Readwise API 的分页响应，确保大数据量的稳定同步：
  async syncHighlightsToOrca(A = null) {
    const t = Date.now();
    w.progress.message = "获取高亮内容...";
    try {
      const e = await this.readwiseAPI.exportHighlights(A), o = [];
      for (const s of e)
        if (s.highlights && Array.isArray(s.highlights))
          for (const l of s.highlights)
            o.push({
              ...l,
              book_title: s.title,
              author: s.author,
              category: s.category || "books"
            });
      w.progress = {
        current: 0,
        total: o.length,
        message: `已获取 ${o.length} 条高亮`
      };
      const { createdBlocks: c, failedBlocks: n } = await this.createOrcaBlocks(o), g = this.categorizeHighlights(o), a = Date.now() - t;
      return {
        totalCount: o.length,
        newCount: c.length,
        failedCount: n.length,
        duration: a,
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
      (n) => this.shouldSyncHighlight(n)
    ), o = this.categorizeHighlights(e), c = Date.now() - t;
    return {
      totalCount: A.length,
      newCount: e.length,
      duration: c,
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
    let o = null, c = await this.getActivePanel();
    if (c && (o = this.findRootBlock(c), console.log("Found root block from active panel:", o)), !o) {
      console.log("No root block from active panel, searching for any root block");
      const p = orca.state?.blocks;
      if (p)
        for (const f in p) {
          const m = p[f];
          if (!m.parent && !m.left) {
            o = f, console.log("Found root block by iteration:", o, m);
            break;
          }
        }
    }
    if (!o)
      throw new Error("No root block found. Please open a document first.");
    console.log("Using root block ID:", o);
    const n = /* @__PURE__ */ new Date(), g = n.getFullYear(), a = String(n.getMonth() + 1).padStart(2, "0"), s = String(n.getDate()).padStart(2, "0"), l = String(n.getHours()).padStart(2, "0"), i = String(n.getMinutes()).padStart(2, "0"), u = String(n.getSeconds()).padStart(2, "0"), I = `ReadwiseSyncToOrca${`${g}${a}${s}${l}${i}${u}`}`;
    let h = null;
    try {
      if (h = await orca.commands.invokeEditorCommand(
        "core.editor.insertBlock",
        null,
        o,
        "lastChild",
        [{ t: "t", v: I }]
      ), console.log("Created sync root block with ID:", h), h) {
        await orca.commands.invokeEditorCommand("core.editor.makeHeading2", null, h);
        try {
          await orca.commands.invokeEditorCommand(
            "core.editor.insertTag",
            null,
            h,
            "Readwise"
          ), console.log("Added Readwise tag to sync block");
        } catch (S) {
          console.warn("Failed to add tag to sync block:", S);
        }
        await this.delay(100), w.progress.total = A.length, w.progress.message = "创建 Orca 块...", console.log("Creating category structure for", A.length, "highlights");
        const p = A.filter((S) => {
          const D = this.formatBlockContent(S);
          return D && D.trim() !== "";
        });
        console.log("Valid highlights to create:", p.length);
        const f = this.groupHighlightsByCategory(p);
        console.log("Grouped highlights by category:", Object.keys(f).map((S) => `${S}: ${f[S].length}`)), await this.createCategoryBlocks(h, f, t, e), w.progress.current = t.length, w.progress.message = `已创建 ${t.length}/${p.length} 个块`, console.log("Created", t.length, "blocks, failed", e.length), await this.delay(200);
        const m = orca.state.blocks[h];
        m ? (console.log("Sync block verification:", {
          id: m.id,
          text: m.text,
          content: m.content,
          children: m.children?.length || 0,
          parent: m.parent,
          left: m.left
        }), m.children && Array.isArray(m.children) ? (console.log("Children block IDs:", m.children), m.children.forEach((S, D) => {
          const N = orca.state.blocks[S];
          N ? console.log(`Child ${D}:`, {
            id: N.id,
            parent: N.parent,
            left: N.left,
            text: N.text?.substring(0, 30)
          }) : console.warn(`Child block ${S} not found in state!`);
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
      const o = e.category || "books";
      t[o] ? t[o].push(e) : t.books.push(e);
    }
    return t;
  }
  // 创建分类块和高亮块的三级结构
  async createCategoryBlocks(A, t, e, o) {
    console.log("Creating category blocks...");
    const c = ["books", "articles", "tweets", "supplementals", "podcasts"];
    orca.state.blocks[A].children || (orca.state.blocks[A].children = []);
    let n = null;
    const g = orca.state?.blocks;
    if (g)
      for (const l in g) {
        const i = g[l];
        if (!i.parent && !i.left) {
          n = l, console.log("Found root block for creating category blocks:", n);
          break;
        }
      }
    if (!n) {
      console.error("No root block found for creating category blocks");
      return;
    }
    const a = {}, s = [];
    for (let l = 0; l < c.length; l++) {
      const i = c[l], u = t[i];
      if (!u || u.length === 0) {
        console.log(`Skipping category ${i} (no highlights)`);
        continue;
      }
      console.log(`Creating category block for ${i} (${u.length} highlights)`);
      try {
        const R = await orca.commands.invokeEditorCommand(
          "core.editor.insertBlock",
          null,
          n,
          "lastChild",
          [{ t: "t", v: i }]
        );
        await orca.commands.invokeEditorCommand("core.editor.makeHeading3", null, R);
        try {
          await orca.commands.invokeEditorCommand(
            "core.editor.insertTag",
            null,
            R,
            `Readwise/${i}`
          );
        } catch (I) {
          console.warn(`Failed to add tag to category block ${i}:`, I);
        }
        a[i] = R, s.push({
          id: R,
          category: i
        }), console.log(`Created category block ${R} for ${i}`);
      } catch (R) {
        console.error(`Failed to create category block for ${i}:`, R);
      }
    }
    if (console.log("Created category blocks:", a), await this.delay(200), s.length > 0) {
      console.log(`Moving ${s.length} category blocks to sync root...`);
      const l = s.map((i) => i.id);
      try {
        await orca.commands.invokeEditorCommand(
          "core.editor.moveBlocks",
          null,
          l,
          A,
          "lastChild"
        ), console.log(`Moved ${l.length} category blocks to sync root using moveBlocks`);
      } catch (i) {
        console.error("Failed to move category blocks using moveBlocks:", i);
      }
      for (let i = 0; i < s.length; i++) {
        const u = s[i], R = u.id, I = i > 0 ? s[i - 1].id : null;
        orca.state.blocks[R] && (orca.state.blocks[R].parent = A, orca.state.blocks[R].left = I, console.log(`Set category block ${R} (${u.category}): parent=${A}, left=${I}`)), orca.state.blocks[A].children.includes(R) || orca.state.blocks[A].children.push(R);
      }
      console.log("All category blocks moved and properties set");
    }
    for (const l of c) {
      const i = a[l], u = t[l];
      !i || !u || u.length === 0 || (console.log(`Creating highlights for category ${l} (${u.length} highlights)...`), await this.createBlocksIndividually(
        i,
        l,
        u,
        e,
        o
      ), console.log(`Completed category ${l}`));
    }
    console.log("All category blocks and highlights created");
  }
  // 并发创建独立块，然后移动到同步标记块下
  async createBlocksIndividually(A, t, e, o, c) {
    console.log(`Creating ${e.length} blocks for category ${t} using 10 concurrent threads...`);
    const n = e.length;
    let g;
    n > 600 ? g = 200 : n > 200 ? g = 100 : g = 50, console.log(`Category ${t}: using refresh interval of ${g}`);
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
    let s = null;
    const l = orca.state?.blocks;
    if (l)
      for (const h in l) {
        const p = l[h];
        if (!p.parent && !p.left) {
          s = h, console.log("Found root block for creating independent blocks:", s);
          break;
        }
      }
    if (!s)
      throw new Error("No root block found for creating independent blocks");
    const i = async (h, p) => {
      const f = this.formatBlockContent(h);
      try {
        return { success: !0, blockId: await orca.commands.invokeEditorCommand(
          "core.editor.insertBlock",
          null,
          s,
          "lastChild",
          [{ t: "t", v: f }]
        ), highlight: h, index: p };
      } catch (m) {
        return console.error(`Failed to create block for highlight ${p}:`, m), { success: !1, error: m, highlight: h, index: p };
      }
    }, u = 10, R = [];
    let I = 0;
    for (let h = 0; h < e.length; h += u) {
      const f = e.slice(h, h + u).map(
        (S, D) => i(S, h + D)
      ), m = await Promise.all(f);
      for (const S of m)
        S.success ? (R.push({
          id: S.blockId,
          content: this.formatBlockContent(S.highlight),
          originalIndex: S.index
        }), o.push({ id: S.blockId, content: this.formatBlockContent(S.highlight) }), I++) : c.push({ highlight: S.highlight, error: S.error });
      (I % g === 0 || I === e.length) && (w.progress.current = I, w.progress.message = `${t}: ${I}/${e.length}`), await this.delay(10);
    }
    return console.log(`Created ${R.length} independent blocks for category ${t}`), R.sort((h, p) => h.originalIndex - p.originalIndex), console.log(`Moving ${R.length} blocks to category block ${A}...`), await this.moveBlocksToParent(A, R), console.log(`Creation and movement completed for category ${t}:`, R.length, "blocks created"), R.length;
  }
  // 移动块到父块下并设置正确的parent/left/children属性
  async moveBlocksToParent(A, t) {
    console.log(`Moving ${t.length} blocks to parent ${A}...`), orca.state.blocks[A].children || (orca.state.blocks[A].children = []);
    const e = t.map((o) => o.id);
    try {
      await orca.commands.invokeEditorCommand(
        "core.editor.moveBlocks",
        null,
        e,
        A,
        "lastChild"
      ), console.log(`Moved ${e.length} blocks to parent ${A} using moveBlocks`);
    } catch (o) {
      console.error("Failed to move blocks using moveBlocks:", o), console.log("Attempting to set properties manually...");
    }
    for (let o = 0; o < t.length; o++) {
      const n = t[o].id, g = o > 0 ? t[o - 1].id : null;
      orca.state.blocks[n] && (orca.state.blocks[n].parent = A, orca.state.blocks[n].left = g, console.log(`Set block ${n}: parent=${A}, left=${g}`)), orca.state.blocks[A].children.includes(n) || orca.state.blocks[A].children.push(n);
    }
    console.log("All blocks moved and properties set successfully");
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
      const A = /* @__PURE__ */ new Date(), t = A.getFullYear(), e = String(A.getMonth() + 1).padStart(2, "0"), o = String(A.getDate()).padStart(2, "0"), c = `${t}-${e}-${o}`;
      console.log("Getting or creating journal page for date:", c);
      try {
        const n = await orca.commands.invokeCommand("core.journal.getJournalBlock", c);
        if (n)
          return console.log("Found today's journal block:", n), {
            rootBlockId: n.id || n,
            view: "journal",
            id: n.id || n
          };
      } catch (n) {
        console.log("Journal block command failed, trying alternative method:", n);
      }
      try {
        const n = orca.state?.blocks;
        if (n)
          for (const g in n) {
            const a = n[g];
            if (a.text && (a.text.includes(c) || a.text.includes("Journal")))
              return console.log("Found potential journal block by text:", g, a), {
                rootBlockId: g,
                view: "journal",
                id: g
              };
          }
      } catch (n) {
        console.log("Failed to search for journal block:", n);
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
    if (w.isSyncing) {
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
    this.cleanupFunctions.forEach((A) => A()), this.readwiseAPI && this.readwiseAPI.cleanup(), w.isSyncing = !1, w.error = null, w.progress = { current: 0, total: 0, message: "" };
  }
  delay(A) {
    return new Promise((t) => setTimeout(t, A));
  }
  //📈 统计信息暴露
  //提供同步统计信息供主入口文件使用：
  getStats() {
    return {
      isSyncing: w.isSyncing,
      lastSyncDate: w.lastSyncDate,
      ...w.syncStats
    };
  }
  updateSyncStats(A, t) {
    w.syncStats = {
      totalHighlights: A.totalCount,
      newHighlights: A.newCount,
      failedHighlights: A.failedCount || 0,
      duration: A.duration,
      categories: A.categories,
      triggerType: t,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }, w.lastSyncDate = (/* @__PURE__ */ new Date()).toISOString();
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
const k = new rA(), cA = "data:image/png;base64,AAABAAMAMDAAAAEACACoDgAANgAAACAgAAABAAgAqAgAAN4OAAAQEAAAAQAIAGgFAACGFwAAKAAAADAAAABgAAAAAQAIAAAAAAAACQAAAAAAAAAAAAAAAQAAAAAAAAAAAAC3t7QAFxcXAEBAPwBpaWcAu7u3AOTk3wDS0s4AbW1qAPv79gDt7egAJCQjALKyrwDb29cAOzs6ABYWFQDNzckA9vbxAAQEBAD6+vQAlpaTAL+/uwCEhIIAHx8eAK2tqgANDQ0AX19dAJ+fnADIyMQAkZGOALq6tgDj494Af399AKiopQDR0c0A+vr1AAgICABaWlgA/v74AHFxbwAMDAsAmpqXADU1MwDa2tYAY2NhAIyMiQC1tbEA9fXwAAMDAwBVVVMA4+PfAL6+ugCsrKkA/v75AIeHhAAjIyMAx8fDACcnJgDe3toAPj49AGdnZQCQkI0Aubm1AFVVVAB+fnwAp6ekAEJCQABra2gA+fn0ADAwLwCCgn8A/f33AP7++gDCwr4A6+vmANnZ1QAQEBAAOTk4APDw7ACLi4gAtLSwAAICAgDi4t4AfX16AAYGBQDm5uEA/f34AP///gAiIiIAnZ2aACYmJQB4eHUAZmZkAI+PjAC4uLQApqajAPj48wAGBgYALy8uAB0dHQD8/PYARkZFAG9vbQCYmJUAwcG9AOrq5QCGhoQAr6+sAEpKSAAPDw8AYWFfAIqKhwATExIA8/PuAAEBAQAqKikAGBgYAEFBQABqamgAWFhXAIGBfwAcHBsA09PPAPz89wCFhYIArq6qAEpKSQCcnJkAxcXBAO7u6QAlJSQAs7OwANzc2AA8PDsAZWVjAI6OiwAXFxYAzs7KAAUFBQAuLi0A5eXhAICAfQBubmwACQkIAOnp5ACJiYYAEhIRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYVhaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpYYQAAWBAyUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUjIQWAAAWjJ7IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI3syWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjREREREREI1ZWVlZWVlZWVlZWRyNERERERCNWVlZWVlZWViNERERERCNSWgAAWlIjREREREQJHCCNjY2NjY2NjY2NfIQJRERECUt8jY2NjY2NeCIJRERERCNSWgAAWlIjRERERERWFAAAAAAAAAAAAAAAKBVHREREEYYAAAAAAAAAMCFWRERERCNSWgAAWlIjREREREQjOkEIbQAAAAAAAGNAa2kjRER7g20AAAAAAIpsfx8jRERERCNSWgAAWlIjRERERERECSZgbgAAAAAAAC01ViNERCOQdQAAAAAAcgQKNSNERERERCNSWgAAWlIjRERERERERERWbwAAAAAAYS5WRERERAmHMAAAAAAATR8JRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WREREZAc3AAAAAAAZGHtERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WREREEVwAAAAAAAAsLxNERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRER7UG0AAAAAADcHe0RERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRCOQQgAAAAAAEj0JRERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRAldMAAAAAAAZUojRERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WCXoLAAAAAABwHntERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WETwAAAAAAAAnYERERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJAVXLm0AAAAAAIsNCURERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAEiw2KgAAAAAAMC1EViNERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAAAAAUYI/WVV7RERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAAAAAAAAAEg4zCURERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAABdaVAAAAAAAAAAAAAA3OHtERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAJKRfVN3A0U5AnIAAAAAMXFERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAB5AUhgTpCMaxkAAAAADxB7RERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAC0l7IyM1Po8AAAAAMF9WRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAGKJe0RWKQAAAAAAAB1WRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAACFS3t7jQAAAAAAAIdWRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAflJWdgAAAAAAchtWRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAACVpGgAAAAAATIB7RERERERERCNSWgAAWlIjRERERERERERWTwAAAAAAAAAAAAAAAFF2MQAAAAAAZYEjRERERERERCNSWgAAWlIjREREREREI1Z7QwAAAAAAAAAAAAAAAAAkDwAAAAB0XntERERERERERCNSWgAAWlIjREREREQjBl5GiAAAAAAAAAAAAAAAAAAAAAAAcnM0RERERERERERERCNSWgAAWlIjRERERERWZzAAAAAAAAAAAAAAAAAAAAAAYQI7aisJRERERERERERERCNSWgAAWlIjREREREQJaI5mZmZmZmZmZmZmZmYnWxZnDAeBewlERERERERERERERCNSWgAAWlIjREREREREIwkJCQkJCQkJCQkJCQlke1ZWVgkjRERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWjJ7IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI3syWgAAWBAyUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUjIQWAAAYVhaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpYYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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";
let b;
async function dA(r) {
  b = r, console.log(`${b} plugin enabled`), orca.themes.injectCSSResource(`${b}/dist/index.css`, b), await orca.plugins.setSettingsSchema(b, {
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
    orca.commands.unregisterCommand(`${b}.testConnection`);
  } catch {
  }
}
async function M() {
  const r = {
    apiKey: "",
    defaultSyncMode: "incremental",
    autoSyncEnabled: !1,
    syncInterval: 60,
    lastSyncDate: "",
    syncCategory: "all",
    includeTags: !0
  };
  try {
    return await orca.plugins.getData("readwise-sync", "settings") || r;
  } catch {
    return r;
  }
}
function aA(r) {
  orca.state.commands?.[`${r}.sync`] == null && orca.commands.registerCommand(
    `${r}.sync`,
    async () => {
      try {
        const A = orca.state.plugins[r]?.settings || await M();
        if (k.settings = { ...k.settings, ...A }, !k.settings.apiKey) {
          orca.notify("error", "Please configure your Readwise API Key in settings");
          return;
        }
        orca.notify("info", "Starting incremental sync...");
        const t = await k.performSync("incremental");
        orca.notify("success", `Sync completed: ${t.newCount || 0} new highlights`);
      } catch (A) {
        orca.notify("error", `Sync failed: ${A?.message || String(A)}`);
      }
    },
    "Sync Readwise Highlights (Incremental)"
  ), orca.state.commands?.[`${r}.fullSync`] == null && orca.commands.registerCommand(
    `${r}.fullSync`,
    async () => {
      try {
        const A = orca.state.plugins[r]?.settings || await M();
        if (k.settings = { ...k.settings, ...A }, !k.settings.apiKey) {
          orca.notify("error", "Please configure your Readwise API Key in settings");
          return;
        }
        orca.notify("info", "Starting full sync...");
        const t = await k.performSync("full");
        orca.notify("success", `Full sync completed: ${t.newCount || 0} highlights`);
      } catch (A) {
        orca.notify("error", `Sync failed: ${A?.message || String(A)}`);
      }
    },
    "Full Sync Readwise Highlights"
  ), orca.state.commands?.[`${r}.testConnection`] == null && orca.commands.registerCommand(
    `${r}.testConnection`,
    async () => {
      try {
        const A = orca.state.plugins[r]?.settings || await M();
        return k.settings = { ...k.settings, ...A }, k.settings.apiKey ? (await k.validateConnection(), orca.notify("success", "Readwise connection successful"), !0) : (orca.notify("error", "Please configure your Readwise API Key in settings"), !1);
      } catch (A) {
        return orca.notify("error", `Readwise connection failed: ${A?.message || "Unknown error"}`), !1;
      }
    },
    "Test Readwise Connection"
  );
}
function lA(r) {
  if (orca.state.headbarButtons?.[`${r}.sync`] == null)
    try {
      const A = orca.components.Button, t = orca.components.HoverContextMenu, e = orca.components.MenuText;
      if (!A || !t || !e) {
        console.error("[Readwise Sync] Required components not available");
        return;
      }
      let o = null;
      const c = () => {
        const g = nA(w), a = g.isSyncing, s = g.progress;
        let l = "";
        return a && s.message ? l = s.message : a && (l = "同步中..."), /* @__PURE__ */ W.jsx(
          t,
          {
            menu: (i) => /* @__PURE__ */ W.jsxs(W.Fragment, { children: [
              /* @__PURE__ */ W.jsx(
                e,
                {
                  title: a ? "正在同步中..." : "Sync Now (Incremental)",
                  onClick: async () => {
                    a || (i(), await orca.commands.invokeCommand(`${r}.sync`));
                  },
                  disabled: a
                }
              ),
              /* @__PURE__ */ W.jsx(
                e,
                {
                  title: "Full Sync (All Highlights)",
                  onClick: async () => {
                    a || (i(), await orca.commands.invokeCommand(`${r}.fullSync`));
                  },
                  disabled: a
                }
              ),
              /* @__PURE__ */ W.jsx(
                e,
                {
                  title: "Test Connection",
                  onClick: async () => {
                    a || (i(), await orca.commands.invokeCommand(`${r}.testConnection`));
                  },
                  disabled: a
                }
              )
            ] }),
            children: /* @__PURE__ */ W.jsxs(
              A,
              {
                variant: "plain",
                onClick: () => {
                  a || orca.commands.invokeCommand(`${r}.sync`);
                },
                disabled: a,
                style: { opacity: a ? 0.5 : 1 },
                children: [
                  /* @__PURE__ */ W.jsx("img", { className: "readwise-sync-button", src: cA, alt: "Readwise Sync" }),
                  l && /* @__PURE__ */ W.jsx("span", { style: { marginLeft: "8px", fontSize: "12px" }, children: l })
                ]
              }
            )
          }
        );
      };
      orca.headbar.registerHeadbarButton(
        `${r}.sync`,
        () => c()
      );
      const n = oA(w, () => {
        orca.headbar.unregisterHeadbarButton(`${r}.sync`), orca.headbar.registerHeadbarButton(
          `${r}.sync`,
          () => c()
        );
      });
      window.__readwiseSyncUnsubscribe = n, console.log("[Readwise Sync] Headbar button registered successfully");
    } catch (A) {
      console.error("[Readwise Sync] Failed to register headbar button:", A);
    }
  else
    console.log("[Readwise Sync] Headbar button already registered");
}
function iA(r) {
  k.settings = { ...k.settings, ...r }, typeof k.setupAutoSync == "function" && k.setupAutoSync();
}
async function gA(r) {
  const A = await M();
  iA(A), aA(r), await new Promise((t) => setTimeout(t, 100)), lA(r);
}
async function RA() {
  typeof k.cleanup == "function" && k.cleanup();
}
export {
  dA as load,
  uA as unload
};
