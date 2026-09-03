# Solar Consumer Research architecture

## Product boundary

Solar Consumer Research is a public research utility for residential solar consumers. It organizes source-backed state and federal resources, documented cases, guides, and a private research-help intake.

The product does not automatically evaluate individual claims, interpret contracts, recommend legal action, draft legal documents, or connect users with attorneys, contractors, or paid service providers. Research-help submissions are reviewed by a person and are not published automatically.

## Current system

```text
Browser
  |
  v
React 19 application with Next-compatible routing through Vinext
  - public state and federal research pages
  - documented case and company research
  - guides and resource directories
  - private research-help form
  - public source-submission form
  |
  +-----------------------------+
  |                             |
  v                             v
Read APIs                    Submission APIs
/api/resources              /api/contact
/api/guides                 /api/source-submissions
/api/updates                   |
/api/search                    +-> input validation
  |                            +-> honeypot field check
  |                            +-> server-side Turnstile verification
  |                            +-> server-only Supabase admin client
  |                                      |
  +-----------------------------+--------+
                                v
                         Supabase Postgres
                         - published research content
                         - private contact requests
                         - private source submissions
                         - administrative and audit data

Production runtime: Cloudflare Worker-compatible Vinext output
```

The contact route records a valid research-help request before making a best-effort notification request through FormSubmit using the submitted email, state, city, and question. A notification failure does not discard a request that was already saved. The public privacy page identifies Supabase, FormSubmit, and Cloudflare as service providers involved in this flow.

## Trust and publishing model

1. Database-backed public research records use approved source domains.
2. Public records carry source information, editorial status, and verification metadata where an individual review date is recorded.
3. Anonymous visitors can read only content exposed as published public material.
4. Allegations, complaints, investigations, enforcement actions, settlements, and findings are described according to what the underlying source establishes.
5. User submissions are private intake, not public research records.
6. AI does not have an autonomous publication path. Publication decisions remain human-controlled.

The application also keeps a reviewed local content snapshot so core public information can remain available when the content API is unavailable.

## Private intake and security boundaries

The current public research-help flow does not require account creation or passwordless sign-in.

For `/api/contact` and `/api/source-submissions`:

- Input is parsed and validated on the server.
- A populated honeypot field is rejected before normal processing.
- Cloudflare Turnstile is verified server-side before a database write.
- Missing Turnstile server configuration fails closed rather than accepting an unverified submission.
- Database writes use a Supabase service-role credential available only to the server route.
- Direct browser access to the private intake tables is revoked.
- The service-role key and Turnstile secret are read from server environment variables.
- Submitted research-help text is not automatically converted into a public claim, finding, or legal analysis.

The Supabase URL, publishable key, and Turnstile site key are public client configuration. They are distinct from the server-only service-role and Turnstile secret values.

## Application layers

- `app/`: page routes and HTTP API handlers.
- `components/`: reusable interface components and public intake forms.
- `lib/content.ts`: reviewed fallback content and the state directory.
- `lib/state-research.ts` and related research modules: structured state and research data used by public pages.
- `lib/supabase/`: browser and server Supabase configuration and clients.
- `supabase/migrations/`: reproducible database schema and access-control history.
- `worker/`: Cloudflare Worker entry point for the Vinext application.
- `docs/`: architecture and operating documentation.

## Current API surface

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/api/health` | Public | Basic application health response |
| GET | `/api/resources?state=MA&topic=complaints` | Public | Published official resources |
| GET | `/api/guides?state=MA` | Public | Published guides |
| GET | `/api/updates?state=MA` | Public | Published source-backed updates |
| GET | `/api/search?state=MA&q=financing` | Public | Full-text search across published database content |
| POST | `/api/contact` | Public, Turnstile protected | Store a private research-help request and attempt a team notification |
| POST | `/api/source-submissions` | Public, Turnstile protected | Store a private proposed public-source link for review |

The search endpoint exists, but the public site search interface remains intentionally disabled while the content and update process are refined.

## Earlier authenticated intake code

The repository still contains `/api/profile`, `/api/questions`, related authentication helpers, and database tables from an earlier passwordless-account design. The current public interface does not call those endpoints.

They are retained for now rather than being removed as part of a documentation change. A separate cleanup should decide whether to retire them or deliberately reintroduce an authenticated workflow.

## AI-native engineering workflow

AI is used as an engineering tool across implementation, research organization, testing, code review, debugging, and documentation. The workflow is human-directed: architecture, product scope, source standards, security boundaries, acceptance criteria, and publication decisions are controlled by the maintainer.

AI output is not treated as a source of truth. Research claims are checked against the underlying record, code changes are reviewed against repository behavior and automated checks, and public release remains a human decision.

## Verification and release controls

Pull requests run the repository `Verify` workflow, which installs dependencies, runs linting, and runs the test suite. The default branch is protected by a repository ruleset requiring a pull request and the `verify` status check before changes can enter `main`.

## Known cleanup items

- decide whether to remove the unused authenticated profile/question routes
- move editorial dates and page metadata closer to the content records they describe
- continue separating large research datasets from page-rendering components
- keep private submission writes behind server-side validation and access controls
- expose the existing search infrastructure publicly only when the research update process is ready for it
