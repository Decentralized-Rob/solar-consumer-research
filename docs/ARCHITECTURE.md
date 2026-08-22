# Solar Consumer Research architecture

## Product boundary

The product is a neutral research utility for residential solar consumers. It organizes verified public information by state and gives signed-in users a private place to submit research questions.

The product does not evaluate individual claims, interpret contracts, recommend a course of legal action, draft legal documents, or connect users with attorneys, contractors, or paid service providers.

## System architecture

```text
Browser / installable PWA
        |
        v
Next-compatible React application (Vinext)
  - public research interface
  - state, topic, and full-text search
  - dedicated resource, guide, and update indexes
  - Supabase passwordless authentication
  - accessible responsive UI
        |
        +-------------------------+
        |                         |
        v                         v
Next route handlers          Supabase Auth
  /api/resources             email identity
  /api/guides                    |
  /api/updates                   v
  /api/search                    |
  /api/profile                   v
  /api/questions             PostgreSQL
                             - published content
                               - profiles
                               - private questions
                               - review workflow
                               - audit records
```

## Trust and publishing model

1. Every public item is tied to an allowlisted source domain.
2. Every item carries a publisher, source URL, verification date, and editorial status.
3. Anonymous visitors can read only published content.
4. Signed-in users can read and update only their own profile and questions.
5. Content creation and publishing are admin-only.
6. Questions are never public and are not answered automatically. User wording is stored as the user's description, not as a verified factual or legal finding.
7. Database row-level security is the final authorization boundary.

## Application layers

- `app/`: routes, page composition, and HTTP API handlers.
- `components/`: reusable client-side product UI.
- `lib/content.ts`: reviewed fallback content and the state directory used when the API is unavailable.
- `lib/supabase/`: browser and server Supabase clients.
- `supabase/`: reproducible PostgreSQL schema and seed data.
- `docs/`: architecture and operating decisions.

## File structure

```text
app/
  about/page.tsx
  corrections/page.tsx
  guides/page.tsx
  methodology/page.tsx
  privacy/page.tsx
  resources/page.tsx
  updates/page.tsx
  api/
    guides/route.ts
    health/route.ts
    profile/route.ts
    questions/route.ts
    resources/route.ts
    search/route.ts
    updates/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  account-panel.tsx
  info-page.tsx
  research-app.tsx
docs/
  ARCHITECTURE.md
lib/
  api/auth.ts
  supabase/client.ts
  supabase/config.ts
  supabase/server.ts
  content.ts
  state-research.ts
  database.types.ts
  types.ts
supabase/
  migrations/
    20260816224500_initial_schema.sql
    20260816225500_optimize_rls_and_indexes.sql
    20260816230500_enforce_source_allowlist.sql
    20260816234000_add_full_text_search.sql
```

## Database schema

| Table | Purpose | Public access |
| --- | --- | --- |
| `states` | State rollout and availability | Active rows readable |
| `source_domains` | Publisher metadata and URL allowlist | Active rows readable |
| `resources` | State and federal official resources | Published rows readable |
| `guides` | Source-backed guide metadata | Published rows readable |
| `guide_steps` | Ordered guide instructions | Steps of published guides readable |
| `updates` | Source-backed public updates | Published rows readable |
| `profiles` | Email and selected state | Owner only |
| `questions` | Private user research questions | Owner and admins only |
| `question_responses` | Source-backed private responses | Question owner and admins only |
| `admin_users` | Administrative allowlist | Current admin can verify own row |
| `audit_logs` | Administrative activity record | Admin only |

Every exposed table has row-level security enabled. Content records use `draft`, `reviewed`, `published`, and `archived` states. A database trigger rejects public source URLs that do not match the selected allowlisted domain.

Published resources, guides, and updates carry generated weighted `tsvector` columns. Partial GIN indexes support fast natural-language search while limiting the indexed set to published content.

## UI architecture

- Sticky responsive navigation with dedicated resource, guide, update, and methodology routes.
- Disabled homepage search preview marked as coming soon; published content remains browsable by section and route.
- State selector that scopes state-specific content while retaining federal resources.
- Topic filters for complaints, utility, financing, records, and programs.
- Source cards that expose publisher type and verification date before sending a visitor off-site.
- Expandable guides with ordered steps and a direct source citation.
- Source-backed update feed with publication or verification dates.
- Passwordless account panel with private question submission and response history.
- Verified local content snapshot remains visible if the content API is temporarily unavailable.

## Scale path

- Update state sources and documented case records through a reviewed publishing workflow.
- Move editorial work into an authenticated admin interface without changing public APIs.
- Add result ranking and synonyms to PostgreSQL search before introducing a separate search service.
- Add moderation queues and source-check automation without allowing automated publishing.
- Wrap the same responsive web application with Capacitor after the web MVP is validated.

## Initial API surface

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/api/health` | Public | Application readiness check |
| GET | `/api/resources?state=MA&topic=complaints` | Public | Published official resources |
| GET | `/api/guides?state=MA` | Public | Published step-by-step guides |
| GET | `/api/updates?state=MA` | Public | Published source-backed updates |
| GET | `/api/search?state=MA&q=financing` | Public | Full-text search across published content |
| PUT | `/api/profile` | Signed in | Save the current user's state |
| POST | `/api/questions` | Signed in | Store a private question as `submitted` and return the human-review workflow state |
| GET | `/api/questions` | Signed in | Retrieve the current user's questions |
