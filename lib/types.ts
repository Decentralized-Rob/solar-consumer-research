export type ContentStatus = "draft" | "reviewed" | "published" | "archived";

export type ResourceTopic =
  | "complaints"
  | "utility"
  | "financing"
  | "records"
  | "programs";

export type Resource = {
  id: string;
  stateCode: string | null;
  title: string;
  summary: string;
  publisher: string;
  publisherType: "government" | "regulator" | "private_nonprofit" | "research";
  topic: ResourceTopic;
  url: string;
  lastVerified: string;
};

export type GuideStep = {
  title: string;
  detail: string;
};

export type Guide = {
  id: string;
  stateCode: string | null;
  title: string;
  summary: string;
  timeLabel: string;
  steps: GuideStep[];
  sourceTitle: string;
  sourceUrl: string;
  lastVerified: string;
};

export type Update = {
  id: string;
  stateCode: string | null;
  title: string;
  summary: string;
  publisher: string;
  publishedAt: string;
  url: string;
};
