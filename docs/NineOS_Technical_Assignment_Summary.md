# NineOS Technical Assignment Summary

This document summarizes the core vision, specifications, and constraints for the **NineOS MVP**, extracted from [NineOS_Technical_Assignment_Detailed.docx](file:///c:/Users/user/Desktop/NineOS/docs/NineOS_Technical_Assignment_Detailed.docx).

---

## 1. Product Vision & Positioning
* **Product Name**: NineOS
* **Core Category**: AI Decision Intelligence Platform / AI Operating System for Business Leadership.
* **Core Value**: Connects to scattered tools, indexes everything into a Unified Company Memory, and generates daily/weekly briefings, risk alerts, and transparent actionable recommendations.
* **Non-negotiable Constraint**: **NineOS is NOT a planner, task manager, CRM, or chatbot.** It does not replace existing tools in the MVP; it layers decision intelligence over them.

---

## 2. MVP Scope (P0)
* **Auth & Workspaces**: SignUp, workspace creation, teammate invitation, role-based views.
* **Integrations**: Google Workspace, Slack, Project Tool (e.g. Asana/stub), CRM (e.g. HubSpot/stub).
* **Company Memory**: Normalized queryable event store with search and date/source/department filters.
* **AI Brief Engine**: Daily/Weekly briefings (developments, risks, recommendations) using a strict JSON schema.
* **Risk alerts**: Rule-based and LLM-assisted risk detection.
* **AI Recommendations**: Transparent, actionable items with Reasoning, Sources, Expected Impact, and Confidence Score. Wired to an Approve/Ignore workflow (Approving triggers a safe, reversible follow-up action).
* **Role-scoping**: Scoped dashboards (Executive vs. Manager) using `department_tag` filters.
* **Admin Center**: Connection/disconnection settings for all integrations.

---

## 3. Non-Negotiable Product Principles
* **Company Memory, Not Another Inbox**: Re-uses data; never asks users to manually re-explain existing context.
* **Continuous Intelligence, Not Prompt-Waiting**: Proactive periodic briefs over chat-driven Q&A.
* **AI Recommends, Humans Approve**: The AI must **never** autonomously perform high-risk, hard-to-reverse actions (e.g., terminating employees, spending money, changing payroll, sending external customer messages). All decisions require explicit human approval.
* **Traceability & Trust**: Every AI claim or risk must list links to specific `CompanyEvent` source IDs in the database and UI.

---

## 4. Integration-First Architecture
* All integrations must sit behind a standard **Connector** interface:
```typescript
interface Connector {
  id: string;
  type: "google_workspace" | "slack" | "project_tool" | "crm";
  connect(credentials: OAuthCredentials): ConnectionStatus;
  sync(sinceTimestamp?: DateTime): RawEvent[];
  disconnect(): void;
  healthCheck(): ConnectionStatus;
}
```
* A **Normalizer** component processes vendor payloads (`RawEvent.payload`) into normalized `CompanyEvent` instances. Dashboards and AI features only read the normalized events.

---

## 5. User Roles & Visibility
1. **Executive** (CEO, COO, CFO, CTO): Entire company, all departments, all connected sources.
2. **Manager** (Department/Team Leads): Scoped to their department via `department_tag` filtering.
3. **Contributor** (P1): Only their own tasks/meetings.

---

## 6. Data Model Overview
* **Core Entities**:
  * `Company` & `User` (FK -> Company, with `role` and `department_tag`).
  * `Connection` (type, status, encryption token ref, last sync timestamp).
  * `CompanyEvent` (source, type [meeting/message/task/deal/email], title, summary, department tag, raw payload, timestamp).
* **AI Entities**:
  * `Brief` (developments, period, scoped tag).
  * `Risk` (FK -> Brief, description, severity [low/medium/high], source event IDs).
  * `Recommendation` (FK -> Brief, text, reasoning, expected impact, confidence score [0-100], status [pending/approved/ignored], source event IDs).

---

## 7. AI Recommendation Rules & Output Contract
Every recommendation must conform to a strict JSON schema returned by the LLM (e.g. Anthropic Claude Sonnet):
```json
{
  "key_developments": ["string"],
  "risks": [
    {
      "description": "string",
      "severity": "low" | "medium" | "high",
      "source_event_ids": ["uuid"]
    }
  ],
  "recommendations": [
    {
      "recommendation": "string",
      "reasoning": "string",
      "source_event_ids": ["uuid"],
      "expected_impact": "string",
      "confidence_score": 0-100
    }
  ]
}
```

---

## 8. Security & Reliability Requirements
* **Encrypted Tokens**: Store OAuth tokens encrypted at rest, never in logs or events.
* **Server-side RBAC**: Enforce role-based access control on every backend endpoint.
* **Privacy Limits**:
  * Ingest Slack channels only if explicitly selected by the administrator.
  * Ingest Gmail metadata + snippets only; body text is separate opt-in.
* **Retry Engine**: Automatically retry once on invalid JSON/LLM failures.

---

## 9. Build Milestones
* **Milestone 1**: Foundation (User schema, RBAC, Layout, Scoped Dashboards).
* **Milestone 2**: Connector Framework & Google Workspace Sync.
* **Milestone 3**: Slack, Project, and CRM (Stubs/APIs).
* **Milestone 4**: Company Memory UI Timeline.
* **Milestone 5**: AI Brief Engine (Claude API + validation).
* **Milestone 6**: Risk alerts & Recommendations (Approve/Ignore flow + Task creation/Slack trigger).
* **Milestone 7**: Scoped department filtering, onboarding flow, and connection manager.
* **Milestone 8**: Stretch Features (simulation engine, department health scores).

---

## 10. Acceptance Criteria (Definition of Done)
1. User sign-up, role assignment, and workspace invitation work.
2. Google Workspace, Slack, Project Tool, and CRM connect/disconnect cleanly.
3. Ingested events appear in a filterable/searchable timeline.
4. Generates a structured brief where every risk/recommendation cites valid source IDs.
5. Approving a recommendation triggers a task creation or Slack notification; ignoring marks it resolved with no action.
6. Dashboards display role-scoped data correctly.
