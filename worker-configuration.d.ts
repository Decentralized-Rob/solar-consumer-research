declare namespace Cloudflare {
  interface Env {
    ASSETS: Fetcher;
    DB?: D1Database;
    NAV_EVENTS?: AnalyticsEngineDataset;
  }
}
