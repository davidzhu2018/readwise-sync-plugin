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
    toolbar: {
      registerToolbarButton(id: string, config: any): void;
      unregisterToolbarButton(id: string): void;
    };
    notify(type: string, message: string): void;
    state: {
      plugins: Record<string, any>;
    };
  };
}