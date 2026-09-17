// GoodLeap routes to keep together when app/sitemap.ts is updated.
export const goodLeapSitemapEntries = [
  ["/goodleap", "weekly", 0.95],
  ["/goodleap/states", "weekly", 0.9],
  ["/goodleap/states/minnesota", "monthly", 0.9],
  ["/goodleap/states/virginia", "monthly", 0.9],
  ["/goodleap/resources", "monthly", 0.85],
] as const;
