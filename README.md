# Solar Consumer Research

Solar Consumer Research is a source-backed research tool for residential solar customers. It brings official resources, practical research guides, verified updates, and private user questions into one place.

Massachusetts is the first supported state. The data model and publishing workflow are designed to add more states without rebuilding the product.

## What the application does

- Searches published resources, guides, and updates from one interface
- Keeps federal information visible alongside state-specific material
- Shows the publisher, source link, and verification date for public content
- Gives signed-in users a private place to submit and track research questions
- Falls back to a reviewed local content snapshot if the database is unavailable

The application does not provide legal advice, interpret individual contracts, recommend professionals, or publish user questions.

## Source and publishing standards

Public content must meet four requirements:

1. The source domain is on the approved publisher list.
2. The item has a direct source URL and named publisher.
3. The item has a verification date and editorial status.
4. Only published records are available to anonymous visitors.

Database row-level security controls access to profiles, questions, responses, administrative records, and unpublished content. The database also rejects public source URLs that do not match the selected approved domain.

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

## Development model

Product direction, research standards, scope, and acceptance decisions are human-owned. Coding agents are used as implementation tools under explicit requirements. Their output is reviewed, tested, and committed as ordinary project work.

## Status

The current release is a working private MVP. Massachusetts content and the core research workflow are in place; broader public release and additional states remain future phases.
