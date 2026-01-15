var $ = { exports: {} }, B = {};
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
  var r = G, A = Symbol.for("react.element"), t = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, o = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(l, c, n) {
    var i, h = {}, y = null, p = null;
    n !== void 0 && (y = "" + n), c.key !== void 0 && (y = "" + c.key), c.ref !== void 0 && (p = c.ref);
    for (i in c) e.call(c, i) && !a.hasOwnProperty(i) && (h[i] = c[i]);
    if (l && l.defaultProps) for (i in c = l.defaultProps, c) h[i] === void 0 && (h[i] = c[i]);
    return { $$typeof: A, type: l, key: y, ref: p, props: h, _owner: o.current };
  }
  return B.Fragment = t, B.jsx = s, B.jsxs = s, B;
}
var O;
function q() {
  return O || (O = 1, $.exports = _()), $.exports;
}
var k = q();
const Z = Symbol(), Y = Object.getPrototypeOf, J = /* @__PURE__ */ new WeakMap(), X = (r) => r && (J.has(r) ? J.get(r) : Y(r) === Object.prototype || Y(r) === Array.prototype), AA = (r) => X(r) && r[Z] || null, V = (r, A = !0) => {
  J.set(r, A);
}, M = {}, F = (r) => typeof r == "object" && r !== null, D = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakSet(), tA = (r = Object.is, A = (n, i) => new Proxy(n, i), t = (n) => F(n) && !T.has(n) && (Array.isArray(n) || !(Symbol.iterator in n)) && !(n instanceof WeakMap) && !(n instanceof WeakSet) && !(n instanceof Error) && !(n instanceof Number) && !(n instanceof Date) && !(n instanceof String) && !(n instanceof RegExp) && !(n instanceof ArrayBuffer), e = (n) => {
  switch (n.status) {
    case "fulfilled":
      return n.value;
    case "rejected":
      throw n.reason;
    default:
      throw n;
  }
}, o = /* @__PURE__ */ new WeakMap(), a = (n, i, h = e) => {
  const y = o.get(n);
  if (y?.[0] === i)
    return y[1];
  const p = Array.isArray(n) ? [] : Object.create(Object.getPrototypeOf(n));
  return V(p, !0), o.set(n, [i, p]), Reflect.ownKeys(n).forEach((N) => {
    if (Object.getOwnPropertyDescriptor(p, N))
      return;
    const w = Reflect.get(n, N), { enumerable: S } = Reflect.getOwnPropertyDescriptor(
      n,
      N
    ), g = {
      value: w,
      enumerable: S,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: !0
    };
    if (T.has(w))
      V(w, !1);
    else if (w instanceof Promise)
      delete g.value, g.get = () => h(w);
    else if (D.has(w)) {
      const [I, b] = D.get(
        w
      );
      g.value = a(
        I,
        b(),
        h
      );
    }
    Object.defineProperty(p, N, g);
  }), Object.preventExtensions(p);
}, s = /* @__PURE__ */ new WeakMap(), l = [1, 1], c = (n) => {
  if (!F(n))
    throw new Error("object required");
  const i = s.get(n);
  if (i)
    return i;
  let h = l[0];
  const y = /* @__PURE__ */ new Set(), p = (u, E = ++l[0]) => {
    h !== E && (h = E, y.forEach((R) => R(u, E)));
  };
  let N = l[1];
  const w = (u = ++l[1]) => (N !== u && !y.size && (N = u, g.forEach(([E]) => {
    const R = E[1](u);
    R > h && (h = R);
  })), h), S = (u) => (E, R) => {
    const C = [...E];
    C[1] = [u, ...C[1]], p(C, R);
  }, g = /* @__PURE__ */ new Map(), I = (u, E) => {
    if ((M ? "production" : void 0) !== "production" && g.has(u))
      throw new Error("prop listener already exists");
    if (y.size) {
      const R = E[3](S(u));
      g.set(u, [E, R]);
    } else
      g.set(u, [E]);
  }, b = (u) => {
    var E;
    const R = g.get(u);
    R && (g.delete(u), (E = R[1]) == null || E.call(R));
  }, Q = (u) => (y.add(u), y.size === 1 && g.forEach(([R, C], P) => {
    if ((M ? "production" : void 0) !== "production" && C)
      throw new Error("remove already exists");
    const j = R[3](S(P));
    g.set(P, [R, j]);
  }), () => {
    y.delete(u), y.size === 0 && g.forEach(([R, C], P) => {
      C && (C(), g.set(P, [R]));
    });
  }), H = Array.isArray(n) ? [] : Object.create(Object.getPrototypeOf(n)), z = A(H, {
    deleteProperty(u, E) {
      const R = Reflect.get(u, E);
      b(E);
      const C = Reflect.deleteProperty(u, E);
      return C && p(["delete", [E], R]), C;
    },
    set(u, E, R, C) {
      const P = Reflect.has(u, E), j = Reflect.get(u, E, C);
      if (P && (r(j, R) || s.has(R) && r(j, s.get(R))))
        return !0;
      b(E), F(R) && (R = AA(R) || R);
      let v = R;
      if (R instanceof Promise)
        R.then((W) => {
          R.status = "fulfilled", R.value = W, p(["resolve", [E], W]);
        }).catch((W) => {
          R.status = "rejected", R.reason = W, p(["reject", [E], W]);
        });
      else {
        !D.has(R) && t(R) && (v = c(R));
        const W = !T.has(v) && D.get(v);
        W && I(E, W);
      }
      return Reflect.set(u, E, v, C), p(["set", [E], R, j]), !0;
    }
  });
  s.set(n, z);
  const L = [
    H,
    w,
    a,
    Q
  ];
  return D.set(z, L), Reflect.ownKeys(n).forEach((u) => {
    const E = Object.getOwnPropertyDescriptor(
      n,
      u
    );
    "value" in E && (z[u] = n[u], delete E.value, delete E.writable), Object.defineProperty(H, u, E);
  }), z;
}) => [
  // public functions
  c,
  // shared state
  D,
  T,
  // internal things
  r,
  A,
  t,
  e,
  o,
  a,
  s,
  l
], [eA] = tA();
function K(r = {}) {
  return eA(r);
}
function nA(r, A, t) {
  const e = D.get(r);
  (M ? "production" : void 0) !== "production" && !e && console.warn("Please use proxy object");
  let o;
  const a = [], s = e[3];
  let l = !1;
  const n = s((i) => {
    a.push(i), o || (o = Promise.resolve().then(() => {
      o = void 0, l && A(a.splice(0));
    }));
  });
  return l = !0, () => {
    l = !1, n();
  };
}
function oA(r, A) {
  const t = D.get(r);
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
        const s = a.status === 401 ? "AUTH_ERROR" : a.status === 429 ? "RATE_LIMIT_ERROR" : "NETWORK_ERROR";
        throw new Error(`${s}: HTTP ${a.status} - ${await a.text()}`);
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
        const s = await this.makeRequest(`/highlights?${a.toString()}`);
        s?.results ? (t = t.concat(s.results), console.log(`📄 Page ${o}: ${s.results.length} highlights`), e = s.next ? o + 1 : null, o++, await this.delay(100)) : e = null;
      } catch (s) {
        throw console.error(`❌ Failed to fetch page ${o}:`, s), s;
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
        a?.results ? (t = t.concat(a.results), e = a.nextPageCursor, console.log(`📄 Fetched ${a.results.length} books, total highlights so far: ${t.reduce((s, l) => s + (l.highlights?.length || 0), 0)}`)) : e = null, e && await this.delay(100);
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
      const o = await this.syncHighlightsToOrca(e);
      this.updateSyncStats(o, A), await this.saveLastSyncDate();
      const s = Date.now() - t, l = Math.floor(s / 6e4), c = Math.floor(s % 6e4 / 1e3);
      return orca.notify("success", `同步完成，本次同步 ${o.newCount} 条数据，耗时 ${l} 分 ${c} 秒。`), o;
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
      const e = await this.readwiseAPI.exportHighlights(A), o = [];
      for (const n of e)
        if (n.highlights && Array.isArray(n.highlights))
          for (const i of n.highlights)
            o.push({
              ...i,
              book_title: n.title,
              author: n.author,
              category: n.category || "books"
            });
      d.progress = {
        current: 0,
        total: o.length,
        message: `已获取 ${o.length} 条高亮`
      };
      const { createdBlocks: a, failedBlocks: s } = await this.createOrcaBlocks(o), l = this.categorizeHighlights(o), c = Date.now() - t;
      return {
        totalCount: o.length,
        newCount: a.length,
        failedCount: s.length,
        duration: c,
        categories: l
      };
    } catch (e) {
      throw console.error("Failed to fetch highlights:", e), new Error(`FETCH_ERROR: ${e.message}`);
    }
  }
  //🔍 数据过滤与分类处理
  //根据用户配置过滤和分类高亮内容：
  processHighlights(A, t) {
    const e = A.filter(
      (s) => this.shouldSyncHighlight(s)
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
      const S = orca.state?.blocks;
      if (S)
        for (const g in S) {
          const I = S[g];
          if (!I.parent && !I.left) {
            o = g, console.log("Found root block by iteration:", o, I);
            break;
          }
        }
    }
    if (!o)
      throw new Error("No root block found. Please open a document first.");
    console.log("Using root block ID:", o);
    const s = /* @__PURE__ */ new Date(), l = s.getFullYear(), c = String(s.getMonth() + 1).padStart(2, "0"), n = String(s.getDate()).padStart(2, "0"), i = String(s.getHours()).padStart(2, "0"), h = String(s.getMinutes()).padStart(2, "0"), y = String(s.getSeconds()).padStart(2, "0"), N = `ReadwiseSyncToOrca${`${l}${c}${n}${i}${h}${y}`}`;
    let w = null;
    try {
      if (w = await orca.commands.invokeEditorCommand(
        "core.editor.insertBlock",
        null,
        o,
        "lastChild",
        [{ t: "t", v: N }]
      ), console.log("Created sync root block with ID:", w), w) {
        await orca.commands.invokeEditorCommand("core.editor.makeHeading2", null, w);
        try {
          await orca.commands.invokeEditorCommand(
            "core.editor.insertTag",
            null,
            w,
            "Readwise"
          ), console.log("Added Readwise tag to sync block");
        } catch (I) {
          console.warn("Failed to add tag to sync block:", I);
        }
        await this.delay(100), d.progress.total = A.length, d.progress.message = "创建 Orca 块...", console.log("Creating child blocks for", A.length, "highlights");
        const S = A.filter((I) => {
          const b = this.formatBlockContent(I);
          return b && b.trim() !== "";
        });
        console.log("Valid highlights to create:", S.length), console.log("Creating child blocks using individual insertBlock calls..."), await this.createBlocksIndividually(w, S, t, e), d.progress.current = t.length, d.progress.message = `已创建 ${t.length}/${S.length} 个块`, console.log("Created", t.length, "blocks, failed", e.length), await this.delay(200);
        const g = orca.state.blocks[w];
        g ? (console.log("Sync block verification:", {
          id: g.id,
          text: g.text,
          content: g.content,
          children: g.children?.length || 0,
          parent: g.parent,
          left: g.left
        }), g.children && Array.isArray(g.children) ? (console.log("Children block IDs:", g.children), g.children.forEach((I, b) => {
          const Q = orca.state.blocks[I];
          Q ? console.log(`Child ${b}:`, {
            id: Q.id,
            parent: Q.parent,
            left: Q.left,
            text: Q.text?.substring(0, 30)
          }) : console.warn(`Child block ${I} not found in state!`);
        })) : console.warn("Sync block has no children array")) : console.warn("Sync block not found in orca.state.blocks after creation!");
      }
    } catch (S) {
      throw console.error("Failed to create sync block:", S), new Error("Failed to create sync block: " + S.message);
    }
    return { createdBlocks: t, failedBlocks: e };
  }
  // 顺序创建子块
  async createBlocksIndividually(A, t, e, o) {
    console.log("Creating blocks sequentially...");
    const a = orca.state.blocks[A];
    if (!a)
      throw console.error("Parent block not found:", A), new Error("Parent block not found");
    console.log("Parent block verified:", {
      id: a.id,
      text: a.text,
      parent: a.parent,
      left: a.left,
      childrenCount: a.children?.length || 0
    }), orca.state.blocks[A].children || (orca.state.blocks[A].children = []);
    for (let l = 0; l < t.length; l++) {
      const c = t[l], n = this.formatBlockContent(c);
      try {
        console.log(`Creating block ${l + 1}/${t.length}`);
        const i = await orca.commands.invokeEditorCommand(
          "core.editor.insertBlock",
          null,
          A,
          "lastChild",
          [{ t: "t", v: n }]
        );
        console.log(`Created block ${i}`), await this.delay(20);
        const h = l > 0 ? e[l - 1].id : null;
        orca.state.blocks[i] && (orca.state.blocks[i].parent = A, orca.state.blocks[i].left = h, console.log(`Manually set block ${i}: parent=${A}, left=${h}`)), orca.state.blocks[A].children.includes(i) || (orca.state.blocks[A].children.push(i), console.log(`Added block ${i} to parent's children array, total children: ${orca.state.blocks[A].children.length}`));
        const y = orca.state.blocks[i];
        y && console.log(`Block ${i} properties after manual fix:`, {
          parent: y.parent,
          left: y.left,
          text: y.text?.substring(0, 50)
        }), e.push({ id: i, content: n }), (e.length % 200 === 0 || e.length === t.length) && (d.progress.current = e.length, d.progress.message = `${e.length}/${t.length} 同步中`);
      } catch (i) {
        console.error("Failed to create block:", i), o.push({ highlight: c, error: i });
      }
    }
    console.log("Creation completed:", e.length, "blocks created"), console.log("Final verification..."), await this.delay(300);
    const s = orca.state.blocks[A];
    s && (console.log("Parent block final state:", {
      id: s.id,
      childrenCount: s.children?.length || 0,
      children: s.children,
      expectedCount: e.length
    }), s.children && Array.isArray(s.children) ? (console.log("Children block IDs:", s.children), s.children.forEach((l, c) => {
      const n = orca.state.blocks[l];
      n ? console.log(`Child ${c} (block ${l}):`, {
        parent: n.parent,
        left: n.left,
        text: n.text?.substring(0, 50)
      }) : console.warn(`Child block ${l} not found in state!`);
    })) : console.warn("Sync block has no children array"));
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
        const s = await orca.commands.invokeCommand("core.journal.getJournalBlock", a);
        if (s)
          return console.log("Found today's journal block:", s), {
            rootBlockId: s.id || s,
            view: "journal",
            id: s.id || s
          };
      } catch (s) {
        console.log("Journal block command failed, trying alternative method:", s);
      }
      try {
        const s = orca.state?.blocks;
        if (s)
          for (const l in s) {
            const c = s[l];
            if (c.text && (c.text.includes(a) || c.text.includes("Journal")))
              return console.log("Found potential journal block by text:", l, c), {
                rootBlockId: l,
                view: "journal",
                id: l
              };
          }
      } catch (s) {
        console.log("Failed to search for journal block:", s);
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
const f = new rA(), aA = "data:image/png;base64,AAABAAMAMDAAAAEACACoDgAANgAAACAgAAABAAgAqAgAAN4OAAAQEAAAAQAIAGgFAACGFwAAKAAAADAAAABgAAAAAQAIAAAAAAAACQAAAAAAAAAAAAAAAQAAAAAAAAAAAAC3t7QAFxcXAEBAPwBpaWcAu7u3AOTk3wDS0s4AbW1qAPv79gDt7egAJCQjALKyrwDb29cAOzs6ABYWFQDNzckA9vbxAAQEBAD6+vQAlpaTAL+/uwCEhIIAHx8eAK2tqgANDQ0AX19dAJ+fnADIyMQAkZGOALq6tgDj494Af399AKiopQDR0c0A+vr1AAgICABaWlgA/v74AHFxbwAMDAsAmpqXADU1MwDa2tYAY2NhAIyMiQC1tbEA9fXwAAMDAwBVVVMA4+PfAL6+ugCsrKkA/v75AIeHhAAjIyMAx8fDACcnJgDe3toAPj49AGdnZQCQkI0Aubm1AFVVVAB+fnwAp6ekAEJCQABra2gA+fn0ADAwLwCCgn8A/f33AP7++gDCwr4A6+vmANnZ1QAQEBAAOTk4APDw7ACLi4gAtLSwAAICAgDi4t4AfX16AAYGBQDm5uEA/f34AP///gAiIiIAnZ2aACYmJQB4eHUAZmZkAI+PjAC4uLQApqajAPj48wAGBgYALy8uAB0dHQD8/PYARkZFAG9vbQCYmJUAwcG9AOrq5QCGhoQAr6+sAEpKSAAPDw8AYWFfAIqKhwATExIA8/PuAAEBAQAqKikAGBgYAEFBQABqamgAWFhXAIGBfwAcHBsA09PPAPz89wCFhYIArq6qAEpKSQCcnJkAxcXBAO7u6QAlJSQAs7OwANzc2AA8PDsAZWVjAI6OiwAXFxYAzs7KAAUFBQAuLi0A5eXhAICAfQBubmwACQkIAOnp5ACJiYYAEhIRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYVhaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpYYQAAWBAyUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUjIQWAAAWjJ7IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI3syWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjREREREREI1ZWVlZWVlZWVlZWRyNERERERCNWVlZWVlZWViNERERERCNSWgAAWlIjREREREQJHCCNjY2NjY2NjY2NfIQJRERECUt8jY2NjY2NeCIJRERERCNSWgAAWlIjRERERERWFAAAAAAAAAAAAAAAKBVHREREEYYAAAAAAAAAMCFWRERERCNSWgAAWlIjREREREQjOkEIbQAAAAAAAGNAa2kjRER7g20AAAAAAIpsfx8jRERERCNSWgAAWlIjRERERERECSZgbgAAAAAAAC01ViNERCOQdQAAAAAAcgQKNSNERERERCNSWgAAWlIjRERERERERERWbwAAAAAAYS5WRERERAmHMAAAAAAATR8JRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WREREZAc3AAAAAAAZGHtERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WREREEVwAAAAAAAAsLxNERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRER7UG0AAAAAADcHe0RERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRCOQQgAAAAAAEj0JRERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WRAldMAAAAAAAZUojRERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WCXoLAAAAAABwHntERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJF5WETwAAAAAAAAnYERERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAJAVXLm0AAAAAAIsNCURERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAEiw2KgAAAAAAMC1EViNERERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAAAAAUYI/WVV7RERERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAAAAAAAAAEg4zCURERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAABdaVAAAAAAAAAAAAAA3OHtERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAJKRfVN3A0U5AnIAAAAAMXFERERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAB5AUhgTpCMaxkAAAAADxB7RERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAC0l7IyM1Po8AAAAAMF9WRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAGKJe0RWKQAAAAAAAB1WRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAACFS3t7jQAAAAAAAIdWRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAflJWdgAAAAAAchtWRERERERERCNSWgAAWlIjRERERERERERWhwAAAAAAAAAAAAAAACVpGgAAAAAATIB7RERERERERCNSWgAAWlIjRERERERERERWTwAAAAAAAAAAAAAAAFF2MQAAAAAAZYEjRERERERERCNSWgAAWlIjREREREREI1Z7QwAAAAAAAAAAAAAAAAAkDwAAAAB0XntERERERERERCNSWgAAWlIjREREREQjBl5GiAAAAAAAAAAAAAAAAAAAAAAAcnM0RERERERERERERCNSWgAAWlIjRERERERWZzAAAAAAAAAAAAAAAAAAAAAAYQI7aisJRERERERERERERCNSWgAAWlIjREREREQJaI5mZmZmZmZmZmZmZmYnWxZnDAeBewlERERERERERERERCNSWgAAWlIjREREREREIwkJCQkJCQkJCQkJCQlke1ZWVgkjRERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWlIjRERERERERERERERERERERERERERERERERERERERERERERERERERERCNSWgAAWjJ7IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI3syWgAAWBAyUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUjIQWAAAYVhaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpYYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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";
let m;
async function uA(r) {
  m = r, console.log(`${m} plugin enabled`), orca.themes.injectCSSResource(`${m}/dist/index.css`, m), await orca.plugins.setSettingsSchema(m, {
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
  }), await RA(m);
}
async function dA() {
  console.log("Readwise Sync plugin disabled"), await EA();
  try {
    orca.themes.removeCSSResources(m);
  } catch {
  }
  try {
    orca.headbar?.unregisterHeadbarButton?.(`${m}.sync`);
  } catch {
  }
  try {
    orca.commands.unregisterCommand(`${m}.sync`);
  } catch {
  }
  try {
    orca.commands.unregisterCommand(`${m}.testConnection`);
  } catch {
  }
}
async function x() {
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
function cA(r) {
  orca.state.commands?.[`${r}.sync`] == null && orca.commands.registerCommand(
    `${r}.sync`,
    async () => {
      try {
        const A = orca.state.plugins[r]?.settings || await x();
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
  ), orca.state.commands?.[`${r}.fullSync`] == null && orca.commands.registerCommand(
    `${r}.fullSync`,
    async () => {
      try {
        const A = orca.state.plugins[r]?.settings || await x();
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
  ), orca.state.commands?.[`${r}.testConnection`] == null && orca.commands.registerCommand(
    `${r}.testConnection`,
    async () => {
      try {
        const A = orca.state.plugins[r]?.settings || await x();
        return f.settings = { ...f.settings, ...A }, f.settings.apiKey ? (await f.validateConnection(), orca.notify("success", "Readwise connection successful"), !0) : (orca.notify("error", "Please configure your Readwise API Key in settings"), !1);
      } catch (A) {
        return orca.notify("error", `Readwise connection failed: ${A?.message || "Unknown error"}`), !1;
      }
    },
    "Test Readwise Connection"
  );
}
function iA(r) {
  if (orca.state.headbarButtons?.[`${r}.sync`] == null)
    try {
      const A = orca.components.Button, t = orca.components.HoverContextMenu, e = orca.components.MenuText;
      if (!A || !t || !e) {
        console.error("[Readwise Sync] Required components not available");
        return;
      }
      let o = null;
      const a = () => {
        const l = oA(d), c = l.isSyncing, n = l.progress;
        let i = "";
        return c && n.total > 0 ? i = `${n.current}/${n.total} 同步中` : c && (i = "同步中..."), /* @__PURE__ */ k.jsx(
          t,
          {
            menu: (h) => /* @__PURE__ */ k.jsxs(k.Fragment, { children: [
              /* @__PURE__ */ k.jsx(
                e,
                {
                  title: c ? "正在同步中..." : "Sync Now (Incremental)",
                  onClick: async () => {
                    c || (h(), await orca.commands.invokeCommand(`${r}.sync`));
                  },
                  disabled: c
                }
              ),
              /* @__PURE__ */ k.jsx(
                e,
                {
                  title: "Full Sync (All Highlights)",
                  onClick: async () => {
                    c || (h(), await orca.commands.invokeCommand(`${r}.fullSync`));
                  },
                  disabled: c
                }
              ),
              /* @__PURE__ */ k.jsx(
                e,
                {
                  title: "Test Connection",
                  onClick: async () => {
                    c || (h(), await orca.commands.invokeCommand(`${r}.testConnection`));
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
                  c || orca.commands.invokeCommand(`${r}.sync`);
                },
                disabled: c,
                style: { opacity: c ? 0.5 : 1 },
                children: [
                  /* @__PURE__ */ k.jsx("img", { className: "readwise-sync-button", src: aA, alt: "Readwise Sync" }),
                  i && /* @__PURE__ */ k.jsx("span", { style: { marginLeft: "8px", fontSize: "12px" }, children: i })
                ]
              }
            )
          }
        );
      };
      orca.headbar.registerHeadbarButton(
        `${r}.sync`,
        () => a()
      );
      const s = nA(d, () => {
        orca.headbar.unregisterHeadbarButton(`${r}.sync`), orca.headbar.registerHeadbarButton(
          `${r}.sync`,
          () => a()
        );
      });
      window.__readwiseSyncUnsubscribe = s, console.log("[Readwise Sync] Headbar button registered successfully");
    } catch (A) {
      console.error("[Readwise Sync] Failed to register headbar button:", A);
    }
  else
    console.log("[Readwise Sync] Headbar button already registered");
}
function lA(r) {
  f.settings = { ...f.settings, ...r }, typeof f.setupAutoSync == "function" && f.setupAutoSync();
}
async function RA(r) {
  const A = await x();
  lA(A), cA(r), await new Promise((t) => setTimeout(t, 100)), iA(r);
}
async function EA() {
  typeof f.cleanup == "function" && f.cleanup();
}
export {
  uA as load,
  dA as unload
};
