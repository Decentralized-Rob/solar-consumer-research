# Solar Consumer Research

Solar Consumer Research is a public research tool for residential solar customers. It organizes official complaint routes, consumer resources, documented cases, practical guides, and private research requests by state.

## What the application does

- Provides an official consumer-protection starting point and a documented solar case or enforcement item for every state
- Separates state resources from federal complaint resources
- Shows the publisher, source link, and verification date for public content
- Lets verified users submit a private research request
- Uses a reviewed local content snapshot if the content API is unavailable

Submitted questions are stored with a `submitted` status for human review. The application does not generate automatic legal analysis, provide legal advice, interpret individual contracts, recommend professionals, or publish user questions.

## Source and publishing standards

Public content must meet four requirements:

1. The source domain is on the approved publisher list.
2. The item has a direct source URL and named publisher.
3. The item has a verification date and editorial status.
4. Only published records are available to anonymous visitors.

Database row-level security controls access to profiles, questions, responses, administrative records, and unpublished content. The database also rejects public source URLs that do not match the selected approved domain.

## Contributing and corrections

Public-source corrections and focused website improvements are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request. Individual solar situations belong in the private request flow at [solarcomplaint.com](https://solarcomplaint.com), not in GitHub.

## Technical overview

- React 19 with Next-compatible routing through Vinext
- Supabase Postgres and passwordless authentication
- PostgreSQL full-text search with weighted indexes
- Cloudflare Worker-compatible production output
- SQL migrations for schema, security policy, source enforcement, and search

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the system design, API routes, access rules, and scale path.

## Local development

Requirements:

- Node.js 22.13 or newer
- A Supabase project with the included migrations applied

Create a local environment file from `.env.example`, then provide your Supabase URL and publishable key.

```bash
npm ci
npm run dev
```

Useful checks:

```bash
npm run lint
npm test
```

## Database

Migrations live in `supabase/migrations/` and should be applied in timestamp order. The current schema includes public research content, private accounts and questions, administrative controls, audit records, source-domain enforcement, and indexed full-text search.

## AI-assisted development

AI tools assist with implementation and updates. Source selection, editorial standards, scope, review, and publication decisions remain human-owned.

## Status

The public site is live at [solarcomplaint.com](https://solarcomplaint.com). State pages, federal resources, public guides, and the private research-request flow are active. Site search remains intentionally unavailable while the underlying content and update process are refined.
