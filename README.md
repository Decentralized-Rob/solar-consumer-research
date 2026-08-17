# Solar Consumer Research

A neutral, source-backed research application for residential solar consumers. The initial release organizes Massachusetts and federal public resources, full-text search, step-by-step research guides, verified updates, and private user questions.

This project does not provide legal advice, professional referrals, contractor listings, or individualized contract analysis.

## Architecture

- React 19 and Next-compatible routing through Vinext
- Supabase Postgres, Auth, and row-level security
- Public, source-backed content with a draft/review/publish workflow
- Passwordless user accounts for private questions and saved state
- Cloudflare-compatible production output

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the system design, API surface, trust model, and scale path.
