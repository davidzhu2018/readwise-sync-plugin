export interface SyncSettings {
  apiKey: string;
  defaultSyncMode: 'incremental' | 'full';
  autoSyncEnabled: boolean;
  syncInterval: number; // minutes
  lastSyncDate?: string | null;
  syncCategory: 'all' | 'books' | 'articles' | 'tweets' | 'supplementals' | 'podcasts';
  includeTags: boolean;
}
