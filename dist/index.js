var H = { exports: {} }, B = {};
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
  var s = G, A = Symbol.for("react.element"), t = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, o = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function n(i, c, r) {
    var g, h = {}, R = null, y = null;
    r !== void 0 && (R = "" + r), c.key !== void 0 && (R = "" + c.key), c.ref !== void 0 && (y = c.ref);
    for (g in c) e.call(c, g) && !a.hasOwnProperty(g) && (h[g] = c[g]);
    if (i && i.defaultProps) for (g in c = i.defaultProps, c) h[g] === void 0 && (h[g] = c[g]);
    return { $$typeof: A, type: i, key: R, ref: y, props: h, _owner: o.current };
  }
  return B.Fragment = t, B.jsx = n, B.jsxs = n, B;
}
var O;
function q() {
  return O || (O = 1, H.exports = _()), H.exports;
}
var N = q();
const Z = Symbol(), Y = Object.getPrototypeOf, J = /* @__PURE__ */ new WeakMap(), X = (s) => s && (J.has(s) ? J.get(s) : Y(s) === Object.prototype || Y(s) === Array.prototype), AA = (s) => X(s) && s[Z] || null, V = (s, A = !0) => {
  J.set(s, A);
}, M = {}, $ = (s) => typeof s == "object" && s !== null, D = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakSet(), tA = (s = Object.is, A = (r, g) => new Proxy(r, g), t = (r) => $(r) && !T.has(r) && (Array.isArray(r) || !(Symbol.iterator in r)) && !(r instanceof WeakMap) && !(r instanceof WeakSet) && !(r instanceof Error) && !(r instanceof Number) && !(r instanceof Date) && !(r instanceof String) && !(r instanceof RegExp) && !(r instanceof ArrayBuffer), e = (r) => {
  switch (r.status) {
    case "fulfilled":
      return r.value;
    case "rejected":
      throw r.reason;
    default:
      throw r;
  }
}, o = /* @__PURE__ */ new WeakMap(), a = (r, g, h = e) => {
  const R = o.get(r);
  if (R?.[0] === g)
    return R[1];
  const y = Array.isArray(r) ? [] : Object.create(Object.getPrototypeOf(r));
  return V(y, !0), o.set(r, [g, y]), Reflect.ownKeys(r).forEach((S) => {
    if (Object.getOwnPropertyDescriptor(y, S))
      return;
    const p = Reflect.get(r, S), { enumerable: f } = Reflect.getOwnPropertyDescriptor(
      r,
      S
    ), u = {
      value: p,
      enumerable: f,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: !0
    };
    if (T.has(p))
      V(p, !1);
    else if (p instanceof Promise)
      delete u.value, u.get = () => h(p);
    else if (D.has(p)) {
      const [m, k] = D.get(
        p
      );
      u.value = a(
        m,
        k(),
        h
      );
    }
    Object.defineProperty(y, S, u);
  }), Object.preventExtensions(y);
}, n = /* @__PURE__ */ new WeakMap(), i = [1, 1], c = (r) => {
  if (!$(r))
    throw new Error("object required");
  const g = n.get(r);
  if (g)
    return g;
  let h = i[0];
  const R = /* @__PURE__ */ new Set(), y = (d, E = ++i[0]) => {
    h !== E && (h = E, R.forEach((l) => l(d, E)));
  };
  let S = i[1];
  const p = (d = ++i[1]) => (S !== d && !R.size && (S = d, u.forEach(([E]) => {
    const l = E[1](d);
    l > h && (h = l);
  })), h), f = (d) => (E, l) => {
    const C = [...E];
    C[1] = [d, ...C[1]], y(C, l);
  }, u = /* @__PURE__ */ new Map(), m = (d, E) => {
    if ((M ? "production" : void 0) !== "production" && u.has(d))
      throw new Error("prop listener already exists");
    if (R.size) {
      const l = E[3](f(d));
      u.set(d, [E, l]);
    } else
      u.set(d, [E]);
  }, k = (d) => {
    var E;
    const l = u.get(d);
    l && (u.delete(d), (E = l[1]) == null || E.call(l));
  }, P = (d) => (R.add(d), R.size === 1 && u.forEach(([l, C], Q) => {
    if ((M ? "production" : void 0) !== "production" && C)
      throw new Error("remove already exists");
    const j = l[3](f(Q));
    u.set(Q, [l, j]);
  }), () => {
    R.delete(d), R.size === 0 && u.forEach(([l, C], Q) => {
      C && (C(), u.set(Q, [l]));
    });
  }), F = Array.isArray(r) ? [] : Object.create(Object.getPrototypeOf(r)), z = A(F, {
    deleteProperty(d, E) {
      const l = Reflect.get(d, E);
      k(E);
      const C = Reflect.deleteProperty(d, E);
      return C && y(["delete", [E], l]), C;
    },
    set(d, E, l, C) {
      const Q = Reflect.has(d, E), j = Reflect.get(d, E, C);
      if (Q && (s(j, l) || n.has(l) && s(j, n.get(l))))
        return !0;
      k(E), $(l) && (l = AA(l) || l);
      let v = l;
      if (l instanceof Promise)
        l.then((W) => {
          l.status = "fulfilled", l.value = W, y(["resolve", [E], W]);
        }).catch((W) => {
          l.status = "rejected", l.reason = W, y(["reject", [E], W]);
        });
      else {
        !D.has(l) && t(l) && (v = c(l));
        const W = !T.has(v) && D.get(v);
        W && m(E, W);
      }
      return Reflect.set(d, E, v, C), y(["set", [E], l, j]), !0;
    }
  });
  n.set(r, z);
  const L = [
    F,
    p,
    a,
    P
  ];
  return D.set(z, L), Reflect.ownKeys(r).forEach((d) => {
    const E = Object.getOwnPropertyDescriptor(
      r,
      d
    );
    "value" in E && (z[d] = r[d], delete E.value, delete E.writable), Object.defineProperty(F, d, E);
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
  o,
  a,
  n,
  i
], [eA] = tA();
function K(s = {}) {
  return eA(s);
}
function oA(s, A, t) {
  const e = D.get(s);
  (M ? "production" : void 0) !== "production" && !e && console.warn("Please use proxy object");
  let o;
  const a = [], n = e[3];
  let i = !1;
  const r = n((g) => {
    a.push(g), o || (o = Promise.resolve().then(() => {
      o = void 0, i && A(a.splice(0));
    }));
  });
  return i = !0, () => {
    i = !1, r();
  };
}
function nA(s, A) {
  const t = D.get(s);
  (M ? "production" : void 0) !== "production" && !t && console.warn("Please use proxy object");
  const [e, o, a] = t;
  return a(e, o(), A);
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
      const a = await fetch(e, o);
      if (!a.ok) {
        const n = a.status === 401 ? "AUTH_ERROR" : a.status === 429 ? "RATE_LIMIT_ERROR" : "NETWORK_ERROR";
        throw new Error(`${n}: HTTP ${a.status} - ${await a.text()}`);
      }
      return await a.json();
    } catch (a) {
      throw this.requestState.lastError = a.message, console.error("Readwise API Request Failed:", a), a;
    }
  }
  //📖 分页获取所有高亮内容
  //核心同步接口 实现了基于游标的分页机制，支持增量同步：
  async getHighlights(A = null) {
    let t = [], e = null, o = 1;
    console.log(`🔄 Fetching highlights ${A ? `updated after ${A}` : "all time"}`);
    do {
      const a = new URLSearchParams({
        page_size: "1000"
        // Readwise API 允许的最大页大小
      });
      A && a.append("updated_after", A), e && a.append("page", o.toString());
      try {
        const n = await this.makeRequest(`/highlights?${a.toString()}`);
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
        const a = await this.makeRequest(`/export/?${o.toString()}`);
        a?.results ? (t = t.concat(a.results), e = a.nextPageCursor, console.log(`📄 Fetched ${a.results.length} books, total highlights so far: ${t.reduce((n, i) => n + (i.highlights?.length || 0), 0)}`)) : e = null, e && await this.delay(100);
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
      const n = Date.now() - t, i = Math.floor(n / 6e4), c = Math.floor(n % 6e4 / 1e3);
      return orca.notify("success", `同步完成，本次同步 ${o.newCount} 条数据，耗时 ${i} 分 ${c} 秒。`), o;
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
      for (const r of e)
        if (r.highlights && Array.isArray(r.highlights))
          for (const g of r.highlights)
            o.push({
              ...g,
              book_title: r.title,
              author: r.author,
              category: r.category || "books"
            });
      w.progress = {
        current: 0,
        total: o.length,
        message: `已获取 ${o.length} 条高亮`
      };
      const { createdBlocks: a, failedBlocks: n } = await this.createOrcaBlocks(o), i = this.categorizeHighlights(o), c = Date.now() - t;
      return {
        totalCount: o.length,
        newCount: a.length,
        failedCount: n.length,
        duration: c,
        categories: i
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
    ), o = this.categorizeHighlights(e), a = Date.now() - t;
    return {
      totalCount: A.length,
      newCount: e.length,
      duration: a,
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
    let o = null, a = await this.getActivePanel();
    if (a && (o = this.findRootBlock(a), console.log("Found root block from active panel:", o)), !o) {
      console.log("No root block from active panel, searching for any root block");
      const f = orca.state?.blocks;
      if (f)
        for (const u in f) {
          const m = f[u];
          if (!m.parent && !m.left) {
            o = u, console.log("Found root block by iteration:", o, m);
            break;
          }
        }
    }
    if (!o)
      throw new Error("No root block found. Please open a document first.");
    console.log("Using root block ID:", o);
    const n = /* @__PURE__ */ new Date(), i = n.getFullYear(), c = String(n.getMonth() + 1).padStart(2, "0"), r = String(n.getDate()).padStart(2, "0"), g = String(n.getHours()).padStart(2, "0"), h = String(n.getMinutes()).padStart(2, "0"), R = String(n.getSeconds()).padStart(2, "0"), S = `ReadwiseSyncToOrca${`${i}${c}${r}${g}${h}${R}`}`;
    let p = null;
    try {
      if (p = await orca.commands.invokeEditorCommand(
        "core.editor.insertBlock",
        null,
        o,
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
        } catch (m) {
          console.warn("Failed to add tag to sync block:", m);
        }
        await this.delay(100), w.progress.total = A.length, w.progress.message = "创建 Orca 块...", console.log("Creating child blocks for", A.length, "highlights");
        const f = A.filter((m) => {
          const k = this.formatBlockContent(m);
          return k && k.trim() !== "";
        });
        console.log("Valid highlights to create:", f.length), console.log("Creating child blocks using individual insertBlock calls..."), await this.createBlocksIndividually(p, f, t, e), w.progress.current = t.length, w.progress.message = `已创建 ${t.length}/${f.length} 个块`, console.log("Created", t.length, "blocks, failed", e.length), await this.delay(200);
        const u = orca.state.blocks[p];
        u ? (console.log("Sync block verification:", {
          id: u.id,
          text: u.text,
          content: u.content,
          children: u.children?.length || 0,
          parent: u.parent,
          left: u.left
        }), u.children && Array.isArray(u.children) ? (console.log("Children block IDs:", u.children), u.children.forEach((m, k) => {
          const P = orca.state.blocks[m];
          P ? console.log(`Child ${k}:`, {
            id: P.id,
            parent: P.parent,
            left: P.left,
            text: P.text?.substring(0, 30)
          }) : console.warn(`Child block ${m} not found in state!`);
        })) : console.warn("Sync block has no children array")) : console.warn("Sync block not found in orca.state.blocks after creation!");
      }
    } catch (f) {
      throw console.error("Failed to create sync block:", f), new Error("Failed to create sync block: " + f.message);
    }
    return { createdBlocks: t, failedBlocks: e };
  }
  // 并发创建独立块，然后移动到同步标记块下
  async createBlocksIndividually(A, t, e, o) {
    console.log(`Creating ${t.length} blocks using 10 concurrent threads...`);
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
    let n = null;
    const i = orca.state?.blocks;
    if (i)
      for (const R in i) {
        const y = i[R];
        if (!y.parent && !y.left) {
          n = R, console.log("Found root block for creating independent blocks:", n);
          break;
        }
      }
    if (!n)
      throw new Error("No root block found for creating independent blocks");
    const c = async (R, y) => {
      const S = this.formatBlockContent(R);
      try {
        return { success: !0, blockId: await orca.commands.invokeEditorCommand(
          "core.editor.insertBlock",
          null,
          n,
          "lastChild",
          [{ t: "t", v: S }]
        ), highlight: R, index: y };
      } catch (p) {
        return console.error(`Failed to create block for highlight ${y}:`, p), { success: !1, error: p, highlight: R, index: y };
      }
    }, r = 10, g = [];
    for (let R = 0; R < t.length; R += r) {
      const S = t.slice(R, R + r).map(
        (f, u) => c(f, R + u)
      ), p = await Promise.all(S);
      for (const f of p)
        f.success ? (g.push({
          id: f.blockId,
          content: this.formatBlockContent(f.highlight),
          originalIndex: f.index
        }), e.push({ id: f.blockId, content: this.formatBlockContent(f.highlight) })) : o.push({ highlight: f.highlight, error: f.error });
      (e.length % 200 === 0 || e.length === t.length) && (w.progress.current = e.length, w.progress.message = `${e.length}/${t.length} 同步中`), await this.delay(10);
    }
    console.log(`Created ${g.length} independent blocks`), g.sort((R, y) => R.originalIndex - y.originalIndex), console.log("Moving all blocks to sync root block..."), await this.moveBlocksToParent(A, g), console.log("Creation and movement completed:", e.length, "blocks created"), console.log("Final verification..."), await this.delay(300);
    const h = orca.state.blocks[A];
    h && (console.log("Parent block final state:", {
      id: h.id,
      childrenCount: h.children?.length || 0,
      children: h.children,
      expectedCount: e.length
    }), h.children && Array.isArray(h.children) ? (console.log("Children block IDs:", h.children), h.children.forEach((R, y) => {
      const S = orca.state.blocks[R];
      S ? console.log(`Child ${y} (block ${R}):`, {
        parent: S.parent,
        left: S.left,
        text: S.text?.substring(0, 50)
      }) : console.warn(`Child block ${R} not found in state!`);
    })) : console.warn("Sync block has no children array"));
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
      const n = t[o].id, i = o > 0 ? t[o - 1].id : null;
      orca.state.blocks[n] && (orca.state.blocks[n].parent = A, orca.state.blocks[n].left = i, console.log(`Set block ${n}: parent=${A}, left=${i}`)), orca.state.blocks[A].children.includes(n) || orca.state.blocks[A].children.push(n);
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
      const A = /* @__PURE__ */ new Date(), t = A.getFullYear(), e = String(A.getMonth() + 1).padStart(2, "0"), o = String(A.getDate()).padStart(2, "0"), a = `${t}-${e}-${o}`;
      console.log("Getting or creating journal page for date:", a);
      try {
        const n = await orca.commands.invokeCommand("core.journal.getJournalBlock", a);
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
          for (const i in n) {
            const c = n[i];
            if (c.text && (c.text.includes(a) || c.text.includes("Journal")))
              return console.log("Found potential journal block by text:", i, c), {
                rootBlockId: i,
                view: "journal",
                id: i
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
const I = new rA(), aA = "data:image/png;base64,AAABAAMAMDAAAAEACACoDgAANgAAACAgAAABAAgAqAgAAN4OAAAQEAAAAQAIAGgFAACGFwAAKAAAADAAAABgAAAAAQAIAAAAAAAACQAAAAAAAAAAAAAAAQAAAAAAAAAAAAC3t7QAFxcXAEBAPwBpaWcAu7u3AOTk3wDS0s4AbW1qAPv79gDt7egAJCQjALKyrwDb29cAOzs6ABYWFQDNzckA9vbxAAQEBAD6+vQAlpaTAL+/uwCEhIIAHx8eAK2tqgANDQ0AX19dAJ+fnADIyMQAkZGOALq6tgDj494Af399AKiopQDR0c0A+vr1AAgICABaWlgA/v74AHFxbwAMDAsAmpqXADU1MwDa2tYAY2NhAIyMiQC1tbEA9fXwAAMDAwBVVVMA4+PfAL6+ugCsrKkA/v75AIeHhAAjIyMAx8fDACcnJgDe3toAPj49AGdnZQCQkI0Aubm1AFVVVAB+fnwAp6ekAEJCQABra2gA+fn0ADAwLwCCgn8A/f33AP7++gDCwr4A6+vmANnZ1QAQEBAAOTk4APDw7ACLi4gAtLSwAAICAgDi4t4AfX16AAYGBQDm5uEA/f34AP///gAiIiIAnZ2aACYmJQB4eHUAZmZkAI+PjAC4uLQApqajAPj48wAGBgYALy8uAB0dHQD8/PYARkZFAG9vbQCYmJUAwcG9AOrq5QCGhoQAr6+sAEpKSAAPDw8AYWFfAIqKhwATExIA8/PuAAEBAQAqKikAGBgYAEFBQABqamgAWFhXAIGBfwAcHBsA09PPAPz89wCFhYIArq6qAEpKSQCcnJkAxcXBAO7u6QAlJSQAs7OwANzc2AA8PDsAZWVjAI6OiwAXFxYAzs7KAAUFBQAuLi0A5eXhAICAfQBubmwACQkIAOnp5ACJiYYAEhIRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYVhaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpYYQAAWBAyUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUjIQWAAAWjJ7IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI3syWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjREREREREI1ZWVlZWVlZWVlZWRyNERERERCNWVlZWVlZWViNERERERCNSWgAAWlIjREREREQJHCCNjY2NjY2NjY2NfIQJRERECUt8jY2NjY2NeCIJRERERCNSWgAAWlIjRERERERWFAAAAAAAAAAAAAAAKBVHREREEYYAAAAAAAAAMCFWRERERCNSWgAAWlIjREREREQjOkEIbQAAAAAAAGNAa2kjRER7g20AAAAAAIpsfx8jRERERCNSWgAAWlIjRERERERECSZgbgAAAAAAAC01ViNERCOQdQAAAAAAcgQKNSNERERERCNSWgAAWlIjRERERERERERWbwAAAAAAYS5WRERERAmHMAAAAAAATR8JRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WREREZAc3AAAAAAAZGHtERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WREREEVwAAAAAAAAsLxNERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRER7UG0AAAAAADcHe0RERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRCOQQgAAAAAAEj0JRERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRAldMAAAAAAAZUojRERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WCXoLAAAAAABwHntERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WETwAAAAAAAAnYERERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJAVXLm0AAAAAAIsNCURERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAEiw2KgAAAAAAMC1EViNERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAAAAAUYI/WVV7RERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAAAAAAAAAEg4zCURERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAABdaVAAAAAAAAAAAAAA3OHtERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAJKRfVN3A0U5AnIAAAAAMXFERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAB5AUhgTpCMaxkAAAAADxB7RERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAC0l7IyM1Po8AAAAAMF9WRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAGKJe0RWKQAAAAAAAB1WRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAACFS3t7jQAAAAAAAIdWRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAflJWdgAAAAAAchtWRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAACVpGgAAAAAATIB7RERERERERCNSWgAAWlIjRERERERERERWTwAAAAAAAAAAAAAAAFF2MQAAAAAAZYEjRERERERERCNSWgAAWlIjREREREREI1Z7QwAAAAAAAAAAAAAAAAAkDwAAAAB0XntERERERERERCNSWgAAWlIjREREREQjBl5GiAAAAAAAAAAAAAAAAAAAAAAAcnM0RERERERERERERCNSWgAAWlIjRERERERWZzAAAAAAAAAAAAAAAAAAAAAAYQI7aisJRERERERERERERCNSWgAAWlIjREREREQJaI5mZmZmZmZmZmZmZmYnWxZnDAeBewlERERERERERERERCNSWgAAWlIjREREREREIwkJCQkJCQkJCQkJCQlke1ZWVgkjRERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWjJ7IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI3syWgAAWBAyUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUjIQWAAAYVhaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpYYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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";
let b;
async function uA(s) {
  b = s, console.log(`${b} plugin enabled`), orca.themes.injectCSSResource(`${b}/dist/index.css`, b), await orca.plugins.setSettingsSchema(b, {
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
  }), await RA(b);
}
async function dA() {
  console.log("Readwise Sync plugin disabled"), await EA();
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
        if (I.settings = { ...I.settings, ...A }, !I.settings.apiKey) {
          orca.notify("error", "Please configure your Readwise API Key in settings");
          return;
        }
        orca.notify("info", "Starting incremental sync...");
        const t = await I.performSync("incremental");
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
        if (I.settings = { ...I.settings, ...A }, !I.settings.apiKey) {
          orca.notify("error", "Please configure your Readwise API Key in settings");
          return;
        }
        orca.notify("info", "Starting full sync...");
        const t = await I.performSync("full");
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
        return I.settings = { ...I.settings, ...A }, I.settings.apiKey ? (await I.validateConnection(), orca.notify("success", "Readwise connection successful"), !0) : (orca.notify("error", "Please configure your Readwise API Key in settings"), !1);
      } catch (A) {
        return orca.notify("error", `Readwise connection failed: ${A?.message || "Unknown error"}`), !1;
      }
    },
    "Test Readwise Connection"
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
      const a = () => {
        const i = nA(w), c = i.isSyncing, r = i.progress;
        let g = "";
        return c && r.total > 0 ? g = `${r.current}/${r.total} 同步中` : c && (g = "同步中..."), /* @__PURE__ */ N.jsx(
          t,
          {
            menu: (h) => /* @__PURE__ */ N.jsxs(N.Fragment, { children: [
              /* @__PURE__ */ N.jsx(
                e,
                {
                  title: c ? "正在同步中..." : "Sync Now (Incremental)",
                  onClick: async () => {
                    c || (h(), await orca.commands.invokeCommand(`${s}.sync`));
                  },
                  disabled: c
                }
              ),
              /* @__PURE__ */ N.jsx(
                e,
                {
                  title: "Full Sync (All Highlights)",
                  onClick: async () => {
                    c || (h(), await orca.commands.invokeCommand(`${s}.fullSync`));
                  },
                  disabled: c
                }
              ),
              /* @__PURE__ */ N.jsx(
                e,
                {
                  title: "Test Connection",
                  onClick: async () => {
                    c || (h(), await orca.commands.invokeCommand(`${s}.testConnection`));
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
                  c || orca.commands.invokeCommand(`${s}.sync`);
                },
                disabled: c,
                style: { opacity: c ? 0.5 : 1 },
                children: [
                  /* @__PURE__ */ N.jsx("img", { className: "readwise-sync-button", src: aA, alt: "Readwise Sync" }),
                  g && /* @__PURE__ */ N.jsx("span", { style: { marginLeft: "8px", fontSize: "12px" }, children: g })
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
      const n = oA(w, () => {
        orca.headbar.unregisterHeadbarButton(`${s}.sync`), orca.headbar.registerHeadbarButton(
          `${s}.sync`,
          () => a()
        );
      });
      window.__readwiseSyncUnsubscribe = n, console.log("[Readwise Sync] Headbar button registered successfully");
    } catch (A) {
      console.error("[Readwise Sync] Failed to register headbar button:", A);
    }
  else
    console.log("[Readwise Sync] Headbar button already registered");
}
function iA(s) {
  I.settings = { ...I.settings, ...s }, typeof I.setupAutoSync == "function" && I.setupAutoSync();
}
async function RA(s) {
  const A = await x();
  iA(A), cA(s), await new Promise((t) => setTimeout(t, 100)), lA(s);
}
async function EA() {
  typeof I.cleanup == "function" && I.cleanup();
}
export {
  uA as load,
  dA as unload
};
