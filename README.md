# Solar Consumer Research

Solar Consumer Research is a public research project for residential solar consumers. It organizes official complaint routes, regulatory resources, documented cases, practical guides, and a private research-help intake by state.

## What the application does

- Provides an official consumer-protection starting point and documented solar reference for every state
- Separates state resources from federal complaint and consumer-protection resources
- Publishes source-backed research, documented cases, and practical guides
- Shows the publisher and direct source for public research, with verification dates where an individual review date is recorded
- Accepts private research-help requests with an email address, state, city or town, and a short description; no account is required
- Uses a reviewed local content snapshot if the content API is unavailable

Research-help submissions are stored privately for human review. The application does not automatically generate legal analysis, provide legal advice, interpret individual contracts, recommend professionals, or publish user submissions.

## Source and publishing standards

Public content must meet four requirements:

1. The source domain is on the approved publisher list.
2. The item has a direct source URL and named publisher.
3. The item has a verification date and editorial status.
4. Only published records are available to anonymous visitors.

Research claims are reviewed against the underlying public record. Allegations, complaints, investigations, enforcement actions, settlements, and findings are labeled according to what the source actually establishes.

## Private intake and security

Public intake is handled through server-side routes. The research-help and source-submission forms validate input, use a honeypot, and require server-side Cloudflare Turnstile verification before a database write.

Private intake tables are not directly available to browser roles. Server-only credentials are read from environment variables and are not sent to the browser. User submissions are not automatically published.

See [SECURITY.md](SECURITY.md) for vulnerability reporting.

## Contributing and corrections

Public-source corrections and focused website improvements are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request. Individual solar situations belong in the private research-help flow at [solarcomplaint.com](https://solarcomplaint.com), not in GitHub.

## Technical overview

- React 19 with Next-compatible routing through Vinext
- Supabase Postgres for public research data and private intake
- Server-side Cloudflare Turnstile verification for public submission routes
- PostgreSQL full-text search infrastructure with weighted indexes
- Cloudflare Worker-compatible production output
- SQL migrations for schema, access controls, source enforcement, intake, and search

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the current system design and API boundaries.

## AI-native development

Solar Consumer Research is intentionally built through an AI-native, human-directed engineering workflow.

AI is used across implementation, research organization, testing, code review, and documentation. The maintainer sets the architecture, product direction, source standards, security boundaries, acceptance criteria, and publication decisions. AI output is treated as work product to verify, test, and review, not as an authority.

The public research standard does not change because AI is involved: claims must still be supported by the underlying source, code must pass the repository checks, and publication remains a human decision.

## Local development

Requirements:

- Node.js 22.13 or newer
- A Supabase project with the included migrations applied

Create a local environment file from `.env.example` and provide the required configuration.

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

Migrations live in `supabase/migrations/` and should be applied in timestamp order. The schema includes public research content, private intake, administrative controls, audit records, source-domain enforcement, and indexed full-text search. The migration history also contains tables from an earlier authenticated question workflow; those routes are not part of the current public intake UI.

## Status

The public site is live at [solarcomplaint.com](https://solarcomplaint.com). State pages, federal resources, public guides, research pages, and the private research-help flow are active. Site search remains intentionally unavailable in the public interface while the underlying content and update process are refined.
