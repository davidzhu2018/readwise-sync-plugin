const W = Symbol(), j = Object.getPrototypeOf, B = /* @__PURE__ */ new WeakMap(), V = (e) => e && (B.has(e) ? B.get(e) : j(e) === Object.prototype || j(e) === Array.prototype), U = (e) => V(e) && e[W] || null, M = (e, t = !0) => {
  B.set(e, t);
}, L = {}, _ = (e) => typeof e == "object" && e !== null, R = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakSet(), G = (e = Object.is, t = (n, A) => new Proxy(n, A), o = (n) => _(n) && !k.has(n) && (Array.isArray(n) || !(Symbol.iterator in n)) && !(n instanceof WeakMap) && !(n instanceof WeakSet) && !(n instanceof Error) && !(n instanceof Number) && !(n instanceof Date) && !(n instanceof String) && !(n instanceof RegExp) && !(n instanceof ArrayBuffer), a = (n) => {
  switch (n.status) {
    case "fulfilled":
      return n.value;
    case "rejected":
      throw n.reason;
    default:
      throw n;
  }
}, g = /* @__PURE__ */ new WeakMap(), y = (n, A, p = a) => {
  const h = g.get(n);
  if (h?.[0] === A)
    return h[1];
  const d = Array.isArray(n) ? [] : Object.create(Object.getPrototypeOf(n));
  return M(d, !0), g.set(n, [A, d]), Reflect.ownKeys(n).forEach((b) => {
    if (Object.getOwnPropertyDescriptor(d, b))
      return;
    const S = Reflect.get(n, b), { enumerable: O } = Reflect.getOwnPropertyDescriptor(
      n,
      b
    ), u = {
      value: S,
      enumerable: O,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: !0
    };
    if (k.has(S))
      M(S, !1);
    else if (S instanceof Promise)
      delete u.value, u.get = () => p(S);
    else if (R.has(S)) {
      const [v, H] = R.get(
        S
      );
      u.value = y(
        v,
        H(),
        p
      );
    }
    Object.defineProperty(d, b, u);
  }), Object.preventExtensions(d);
}, l = /* @__PURE__ */ new WeakMap(), D = [1, 1], $ = (n) => {
  if (!_(n))
    throw new Error("object required");
  const A = l.get(n);
  if (A)
    return A;
  let p = D[0];
  const h = /* @__PURE__ */ new Set(), d = (i, r = ++D[0]) => {
    p !== r && (p = r, h.forEach((s) => s(i, r)));
  };
  let b = D[1];
  const S = (i = ++D[1]) => (b !== i && !h.size && (b = i, u.forEach(([r]) => {
    const s = r[1](i);
    s > p && (p = s);
  })), p), O = (i) => (r, s) => {
    const f = [...r];
    f[1] = [i, ...f[1]], d(f, s);
  }, u = /* @__PURE__ */ new Map(), v = (i, r) => {
    if ((L ? "production" : void 0) !== "production" && u.has(i))
      throw new Error("prop listener already exists");
    if (h.size) {
      const s = r[3](O(i));
      u.set(i, [r, s]);
    } else
      u.set(i, [r]);
  }, H = (i) => {
    var r;
    const s = u.get(i);
    s && (u.delete(i), (r = s[1]) == null || r.call(s));
  }, z = (i) => (h.add(i), h.size === 1 && u.forEach(([s, f], P) => {
    if ((L ? "production" : void 0) !== "production" && f)
      throw new Error("remove already exists");
    const E = s[3](O(P));
    u.set(P, [s, E]);
  }), () => {
    h.delete(i), h.size === 0 && u.forEach(([s, f], P) => {
      f && (f(), u.set(P, [s]));
    });
  }), T = Array.isArray(n) ? [] : Object.create(Object.getPrototypeOf(n)), I = t(T, {
    deleteProperty(i, r) {
      const s = Reflect.get(i, r);
      H(r);
      const f = Reflect.deleteProperty(i, r);
      return f && d(["delete", [r], s]), f;
    },
    set(i, r, s, f) {
      const P = Reflect.has(i, r), E = Reflect.get(i, r, f);
      if (P && (e(E, s) || l.has(s) && e(E, l.get(s))))
        return !0;
      H(r), _(s) && (s = U(s) || s);
      let C = s;
      if (s instanceof Promise)
        s.then((m) => {
          s.status = "fulfilled", s.value = m, d(["resolve", [r], m]);
        }).catch((m) => {
          s.status = "rejected", s.reason = m, d(["reject", [r], m]);
        });
      else {
        !R.has(s) && o(s) && (C = $(s));
        const m = !k.has(C) && R.get(C);
        m && v(r, m);
      }
      return Reflect.set(i, r, C, f), d(["set", [r], s, E]), !0;
    }
  });
  l.set(n, I);
  const K = [
    T,
    S,
    y,
    z
  ];
  return R.set(I, K), Reflect.ownKeys(n).forEach((i) => {
    const r = Object.getOwnPropertyDescriptor(
      n,
      i
    );
    "value" in r && (I[i] = n[i], delete r.value, delete r.writable), Object.defineProperty(T, i, r);
  }), I;
}) => [
  // public functions
  $,
  // shared state
  R,
  k,
  // internal things
  e,
  t,
  o,
  a,
  g,
  y,
  l,
  D
], [q] = G();
function Y(e = {}) {
  return q(e);
}
const c = Y({
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
class J {
  constructor() {
    this.settings = null, this.readwiseAPI = null, this.cleanupFunctions = [], this.initializeSettings(), this.setupSettingsListener();
  }
  async initializeSettings() {
    try {
      this.settings = await orca.plugins.getData("readwise-sync", "settings"), this.settings || (this.settings = this.getDefaultSettings());
    } catch (t) {
      console.error("Failed to load sync settings:", t), this.settings = this.getDefaultSettings();
    }
  }
  getDefaultSettings() {
    return {
      apiKey: "",
      autoSyncEnabled: !1,
      syncInterval: 30,
      // 最小5分钟
      lastSyncDate: null,
      syncAllCategories: !0,
      includeTags: !0
    };
  }
  //🔄 增量同步核心逻辑
  //实现基于时间戳的高效增量同步，避免重复数据拉取：
  async performSync(t = "manual") {
    if (c.isSyncing)
      throw new Error("SYNC_IN_PROGRESS");
    c.isSyncing = !0, c.error = null, c.progress = { current: 0, total: 0, message: "准备同步..." };
    try {
      await this.validateConnection();
      const o = this.settings.lastSyncDate, a = await this.syncHighlightsToOrca(o);
      return this.updateSyncStats(a, t), await this.saveLastSyncDate(), a;
    } catch (o) {
      throw c.error = o, o;
    } finally {
      c.isSyncing = !1, c.progress = { current: 0, total: 0, message: "" };
    }
  }
  //📊 分页处理与性能优化
  //处理 Readwise API 的分页响应，确保大数据量的稳定同步：
  async syncHighlightsToOrca(t = null) {
    const o = Date.now();
    let a = [], g = null, y = 0;
    c.progress.message = "获取高亮内容...";
    do
      try {
        y++;
        const l = await this.fetchHighlightsPage(t, g);
        l.results && l.results.length > 0 && (a = a.concat(l.results), c.progress = {
          current: a.length,
          total: l.count || a.length,
          message: `已获取 ${a.length} 条高亮`
        }), g = l.next, g && await this.delay(200);
      } catch (l) {
        throw console.error(`Failed to fetch page ${y}:`, l), new Error(`PAGE_FETCH_ERROR: ${l.message}`);
      }
    while (g);
    return this.processHighlights(a, o);
  }
  //🔍 数据过滤与分类处理
  //根据用户配置过滤和分类高亮内容：
  processHighlights(t, o) {
    const a = t.filter(
      (l) => this.shouldSyncHighlight(l)
    ), g = this.categorizeHighlights(a), y = Date.now() - o;
    return {
      totalCount: t.length,
      newCount: a.length,
      duration: y,
      categories: g,
      highlights: a
    };
  }
  shouldSyncHighlight(t) {
    return !(this.settings.lastSyncDate && t.updated_at <= this.settings.lastSyncDate || !this.settings.syncAllCategories && !this.isCategoryEnabled(t.category));
  }
  //💾 Orca 数据写入
  //将高亮内容转换为 Orca 块格式并写入系统：
  async createOrcaBlocks(t) {
    const o = [], a = [];
    c.progress.total = t.length, c.progress.message = "创建 Orca 块...";
    for (let g = 0; g < t.length; g++) {
      const y = t[g];
      try {
        const l = await this.createHighlightBlock(y);
        o.push(l), c.progress.current = g + 1, c.progress.message = `已创建 ${g + 1}/${t.length} 个块`, (g + 1) % 10 === 0 && await this.delay(100);
      } catch (l) {
        console.error(`Failed to create block for highlight ${y.id}:`, l), a.push({ highlight: y, error: l });
      }
    }
    return { createdBlocks: o, failedBlocks: a };
  }
  async createHighlightBlock(t) {
    const o = this.formatBlockContent(t), a = this.extractBlockProperties(t), g = await orca.blocks.createBlock({
      type: "text",
      content: o,
      properties: a
    });
    return this.settings.includeTags && t.tags && await this.addTagsToBlock(g.id, t.tags), g;
  }
  //⚡ 自动同步管理
  //管理定时同步任务，确保配置变更时的正确重新调度：
  setupAutoSync() {
    if (this.settings.autoSyncEnabled && this.settings.apiKey) {
      const t = Math.max(5, this.settings.syncInterval) * 60 * 1e3;
      this.autoSyncInterval = setInterval(() => {
        this.performAutoSync();
      }, t), this.cleanupFunctions.push(() => {
        clearInterval(this.autoSyncInterval);
      });
    }
  }
  async performAutoSync() {
    if (c.isSyncing) {
      console.log("Auto sync skipped: manual sync in progress");
      return;
    }
    try {
      await this.performSync("auto"), console.log("Auto sync completed successfully");
    } catch (t) {
      console.error("Auto sync failed:", t);
    }
  }
  //🔧 设置变更监听
  //实时响应设置变更，动态调整同步行为：
  setupSettingsListener() {
    const t = async (o, a) => {
      o === "readwise-sync" && (this.settings = { ...this.settings, ...a }, this.setupAutoSync(), this.readwiseAPI && a.apiKey && this.readwiseAPI.updateSettings(a));
    };
    orca.broadcasts.registerHandler("core.settingsChanged", t), this.cleanupFunctions.push(() => {
      orca.broadcasts.unregisterHandler("core.settingsChanged", t);
    });
  }
  //🧹 资源清理与生命周期管理
  //确保插件卸载时的资源正确释放：
  cleanup() {
    this.cleanupFunctions.forEach((t) => t()), this.readwiseAPI && this.readwiseAPI.cleanup(), c.isSyncing = !1, c.error = null, c.progress = { current: 0, total: 0, message: "" };
  }
  delay(t) {
    return new Promise((o) => setTimeout(o, t));
  }
  //📈 统计信息暴露
  //提供同步统计信息供主入口文件使用：
  getStats() {
    return {
      isSyncing: c.isSyncing,
      lastSyncDate: c.lastSyncDate,
      ...c.syncStats
    };
  }
  updateSyncStats(t, o) {
    c.syncStats = {
      totalHighlights: t.totalCount,
      newHighlights: t.newCount,
      failedHighlights: t.failedCount || 0,
      duration: t.duration,
      categories: t.categories,
      triggerType: o,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }, c.lastSyncDate = (/* @__PURE__ */ new Date()).toISOString();
  }
  //🔐 连接验证与错误处理
  async validateConnection() {
    if (!this.settings.apiKey)
      throw new Error("AUTH_ERROR: API key not configured");
    if (this.readwiseAPI || (this.readwiseAPI = new ReadwiseAPI(this.settings)), !await this.readwiseAPI.testConnection())
      throw new Error("AUTH_ERROR: Invalid API key or connection failed");
  }
  async saveLastSyncDate() {
    this.settings.lastSyncDate = (/* @__PURE__ */ new Date()).toISOString(), await orca.plugins.setData("readwise-sync", "settings", this.settings);
  }
}
const w = new J();
async function et(e) {
  console.log(`${e} plugin enabled`), await N(e);
}
async function st() {
  console.log("Readwise Sync plugin disabled"), await x();
}
async function Q() {
  const e = {
    apiKey: "",
    autoSyncEnabled: !1,
    syncInterval: 60,
    lastSyncDate: "",
    syncAllCategories: !0,
    includeTags: !0
  };
  try {
    return await orca.plugins.getData("readwise-sync", "settings") || e;
  } catch {
    return e;
  }
}
function X(e) {
  orca.commands.registerCommand(
    `${e}.manual-sync`,
    async () => {
      try {
        orca.notify("info", "Starting Readwise sync...");
        const t = await w.performSync("manual");
        orca.notify("success", `Sync completed: ${t.newCount || 0} new highlights`);
      } catch (t) {
        orca.notify("error", `Sync failed: ${t?.message || String(t)}`);
      }
    },
    "Sync Readwise Highlights"
  ), orca.commands.registerCommand(
    `${e}.test-connection`,
    async () => {
      try {
        return await w.validateConnection(), orca.notify("success", "Readwise connection successful"), !0;
      } catch {
        return orca.notify("error", "Readwise connection failed"), !1;
      }
    },
    "Test Readwise Connection"
  );
}
function Z(e) {
  orca.toolbar.registerToolbarButton(`${e}.toolbar-button`, {
    icon: "ti ti-refresh",
    tooltip: "Sync Readwise Highlights",
    command: `${e}.manual-sync`
  });
}
function F(e) {
  w.settings = { ...w.settings, ...e }, typeof w.setupAutoSync == "function" && w.setupAutoSync();
}
orca.broadcasts.registerHandler(
  "core.settingsChanged",
  async (e, t) => {
    e === "readwise-sync" && (F(t), typeof w.updateSettings == "function" && w.updateSettings(t));
  }
);
async function N(e) {
  const t = await Q();
  F(t), X(e), Z(e);
}
async function x() {
  typeof w.cleanup == "function" && w.cleanup();
}
export {
  et as load,
  st as unload
};
