declare global {
  const orca: {
    commands: {
      registerCommand(id: string, fn: Function, label: string): void;
      registerEditorCommand(id: string, doFn: Function, undoFn: Function, config: any): void;
      invokeCommand(id: string, ...args: any[]): Promise<any>;
      unregisterCommand(id: string): void;
    };
    plugins: {
      setData(name: string, key: string, value: any): Promise<void>;
      getData(name: string, key: string): Promise<any>;
      removeData(name: string, key: string): Promise<void>;
      setSettingsSchema(name: string, schema: any): Promise<void>;
    };
    headbar: {
      registerHeadbarButton(id: string, component: Function): void;
      unregisterHeadbarButton(id: string): void;
    };
    themes: {
      injectCSSResource(path: string, pluginName: string): void;
      removeCSSResources(pluginName: string): void;
    };
    components: {
      Button: any;
      HoverContextMenu: any;
      MenuText: any;
    };
    broadcasts: {
      registerHandler(event: string, handler: Function): void;
      unregisterHandler(event: string, handler: Function): void;
    };
    notify(type: string, message: string): void;
    invokeBackend: (message: string, ...args: any[]) => Promise<any>;
    state: {
      plugins: Record<string, any>;
      commands?: Record<string, any>;
      headbarButtons?: Record<string, any>;
      panels?: Record<string, any>;
      blocks?: Record<string, any>;
    };
  };
}