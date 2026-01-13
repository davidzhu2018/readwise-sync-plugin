export interface SyncSettings {
  apiKey: string;
  autoSyncEnabled: boolean;
  syncInterval: number; // minutes
  lastSyncDate?: string | null;
  syncAllCategories: boolean;
  includeTags: boolean;
}
