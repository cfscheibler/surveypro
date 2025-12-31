# G2M Survey Platform - Technical Architecture

## System Overview

This document outlines the technical architecture for the G2M Survey Platform, designed to be scalable, secure, and compliant with SOC II standards.

---

## High-Level Architecture

```
┌─────────────────┐
│   Web Client    │ (React + TypeScript)
│   (Dashboard)   │
└────────┬────────┘
         │
         │ HTTPS
         │
┌────────▼────────┐
│   API Gateway   │ (Rate Limiting, Auth)
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│  API  │ │ Auth  │
│ Server│ │Service│
└───┬───┘ └───┬───┘
    │         │
    └────┬────┘
         │
┌────────▼────────┐
│    Database     │ (PostgreSQL + Redis)
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│  File │ │ Queue │
│Storage│ │System │
└───────┘ └───────┘
```

---

## Database Schema Design

### Core Tables

#### `companies`
```sql
- id (UUID, PK)
- name (string, unique, indexed)
- website_url (string)
- industry (string)
- company_size (string)
- company_html (text)
- company_css (text)
- company_logo_url (string)
- brand_colors (JSON)
- settings (JSON)
- created_at (timestamp)
- updated_at (timestamp)
- is_active (boolean)
```

#### `users` (Admins)
```sql
- id (UUID, PK)
- company_id (UUID, FK -> companies.id)
- email (string, unique, indexed)
- password_hash (string)
- first_name (string)
- last_name (string)
- phone_number (string)
- role (enum: super_admin, admin, viewer)
- email_verified (boolean)
- phone_verified (boolean)
- created_at (timestamp)
- updated_at (timestamp)
- last_login_at (timestamp)
- is_active (boolean)
- invited_by (UUID, FK -> users.id, nullable)
```

#### `survey_takers` (User Accounts)
```sql
- id (UUID, PK)
- company_id (UUID, FK -> companies.id)
- email (string, indexed)
- first_name (string)
- last_name (string)
- phone_number (string, nullable)
- custom_fields (JSON)
- email_verified (boolean)
- phone_verified (boolean)
- opt_out_email (boolean)
- opt_out_sms (boolean)
- created_at (timestamp)
- updated_at (timestamp)
- last_survey_at (timestamp, nullable)
```

#### `surveys`
```sql
- id (UUID, PK)
- user_id (UUID, FK -> users.id)
- title (string)
- description (text)
- status (enum: draft, active, paused, closed)
- settings (JSON)
- created_at (timestamp)
- updated_at (timestamp)
- closed_at (timestamp)
```

#### `survey_sections`
```sql
- id (UUID, PK)
- survey_id (UUID, FK -> surveys.id)
- title (string)
- description (text)
- order_index (integer)
- created_at (timestamp)
```

#### `survey_questions`
```sql
- id (UUID, PK)
- section_id (UUID, FK -> survey_sections.id)
- type (enum: multiple-choice, checkboxes, short-answer, paragraph)
- text (string)
- options (JSON array)
- placeholder (string)
- required (boolean)
- logic (JSON)
- hint (text)
- order_index (integer)
- created_at (timestamp)
```

#### `survey_responses`
```sql
- id (UUID, PK)
- survey_id (UUID, FK -> surveys.id)
- survey_taker_id (UUID, FK -> survey_takers.id, nullable)
- participant_id (UUID, FK -> participants.id, nullable)
- started_at (timestamp)
- completed_at (timestamp, nullable)
- ip_address (string, nullable)
- user_agent (string, nullable)
- created_at (timestamp)
```

#### `survey_response_answers`
```sql
- id (UUID, PK)
- response_id (UUID, FK -> survey_responses.id)
- question_id (UUID, FK -> survey_questions.id)
- answer_value (text or JSON)
- created_at (timestamp)
```

#### `participants`
```sql
- id (UUID, PK)
- company_id (UUID, FK -> companies.id)
- survey_taker_id (UUID, FK -> survey_takers.id, nullable)
- email (string, indexed)
- phone_number (string, indexed)
- first_name (string)
- last_name (string)
- custom_fields (JSON)
- tags (JSON array)
- opt_out_email (boolean)
- opt_out_sms (boolean)
- created_at (timestamp)
- updated_at (timestamp)
```

#### `participant_segments`
```sql
- id (UUID, PK)
- user_id (UUID, FK -> users.id)
- name (string)
- filter_criteria (JSON)
- created_at (timestamp)
```

#### `survey_distributions`
```sql
- id (UUID, PK)
- survey_id (UUID, FK -> surveys.id)
- distribution_type (enum: email, sms, link, app)
- recipient_list (JSON array of participant IDs or emails/phones)
- message_template (text)
- scheduled_at (timestamp, nullable)
- sent_at (timestamp, nullable)
- status (enum: pending, sending, completed, failed)
- created_at (timestamp)
```

#### `audit_logs`
```sql
- id (UUID, PK)
- user_id (UUID, FK -> users.id, nullable)
- action (string)
- resource_type (string)
- resource_id (UUID)
- details (JSON)
- ip_address (string)
- user_agent (string)
- created_at (timestamp)
```

---

## API Endpoints Design

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/verify-email
POST   /api/auth/verify-phone
POST   /api/auth/2fa/enable
POST   /api/auth/2fa/verify
```

### Surveys
```
GET    /api/surveys
POST   /api/surveys
GET    /api/surveys/:id
PUT    /api/surveys/:id
DELETE /api/surveys/:id
POST   /api/surveys/:id/duplicate
POST   /api/surveys/:id/publish
POST   /api/surveys/:id/pause
POST   /api/surveys/:id/close
GET    /api/surveys/:id/responses
GET    /api/surveys/:id/analytics
```

### Survey Responses (Public)
```
POST   /api/public/surveys/:surveyId/responses
GET    /api/public/surveys/:surveyId (for preview)
```

### Participants
```
GET    /api/participants
POST   /api/participants
POST   /api/participants/import
GET    /api/participants/:id
PUT    /api/participants/:id
DELETE /api/participants/:id
GET    /api/participants/search
```

### Segments
```
GET    /api/segments
POST   /api/segments
GET    /api/segments/:id
PUT    /api/segments/:id
DELETE /api/segments/:id
```

### Distributions
```
GET    /api/distributions
POST   /api/distributions
GET    /api/distributions/:id
POST   /api/distributions/:id/send
GET    /api/distributions/:id/status
POST   /api/distributions/email/send
POST   /api/distributions/sms/send
```

### Branding
```
GET    /api/branding
PUT    /api/branding
POST   /api/branding/logo
POST   /api/branding/extract-colors
GET    /api/branding/preview
```

### Branding
```
GET    /api/branding
PUT    /api/branding
POST   /api/branding/logo
POST   /api/branding/extract-colors
```

### Analytics
```
GET    /api/analytics/dashboard
GET    /api/analytics/surveys/:id
GET    /api/analytics/responses
```

---

## Security Architecture

### Authentication Flow
1. User submits credentials
2. Server validates and generates JWT token
3. Token stored in httpOnly cookie (more secure than localStorage)
4. Token includes: user_id, email, permissions, exp
5. Refresh token stored separately for token rotation

### Authorization
- Role-Based Access Control (RBAC)
- Roles: Admin, User, Viewer
- Resource-level permissions
- API endpoint protection middleware

### Data Encryption
- **At Rest**: AES-256 encryption for sensitive fields
- **In Transit**: TLS 1.3 for all connections
- **Database**: Encrypted connections, encrypted backups
- **Files**: Encrypted S3 buckets

### Input Validation
- Input sanitization on all endpoints
- SQL injection prevention (parameterized queries)
- XSS prevention (content security policy)
- CSRF protection (tokens)

### Audit Logging
- All authentication events
- All data modifications
- All access to sensitive data
- Log retention: 7 years (compliance requirement)

---

## Branding System Architecture

### Company HTML Processing
1. User uploads/pastes company HTML
2. System extracts:
   - CSS stylesheets
   - Color schemes (primary, secondary, accent)
   - Font families
   - Logo images
   - Layout patterns
3. Store extracted data in `users` table
4. Generate survey theme CSS

### Survey Theme Application
1. Load user's company branding data
2. Generate CSS variables from extracted colors
3. Apply fonts and styles
4. Inject into survey HTML
5. Ensure responsive design maintained

### Implementation Approach
```typescript
// Branding extraction service
class BrandingExtractor {
  extractColors(html: string): BrandColors
  extractFonts(html: string): FontFamily[]
  extractLogo(html: string): LogoData
  generateThemeCSS(branding: BrandingData): string
}

// Survey renderer with branding
class SurveyRenderer {
  render(survey: Survey, branding: BrandingData): HTML
  applyTheme(html: string, themeCSS: string): string
}
```

---

## Panel Management Architecture

### Participant Import
1. CSV/Excel upload
2. Validation:
   - Email format
   - Phone format (E.164)
   - Duplicate detection
   - Required fields check
3. Batch processing via queue
4. Import results notification

### Segmentation Engine
```typescript
class SegmentEngine {
  evaluate(participant: Participant, criteria: SegmentCriteria): boolean
  filter(participants: Participant[], criteria: SegmentCriteria): Participant[]
}
```

### Distribution Queue
- Use message queue (RabbitMQ, AWS SQS, or Redis Queue)
- Async processing for:
  - Email sending
  - SMS sending
  - Link generation
- Retry logic for failed sends
- Rate limiting per provider

---

## Compliance Architecture

### SOC II Controls

#### Security
- Access controls (RBAC)
- Encryption (at rest and in transit)
- Vulnerability scanning
- Security monitoring
- Incident response

#### Availability
- Uptime monitoring
- Backup systems
- Disaster recovery
- Load balancing
- Auto-scaling

#### Processing Integrity
- Data validation
- Error handling
- Transaction logging
- Data integrity checks

#### Confidentiality
- Data classification
- Access restrictions
- Encryption
- Secure transmission

#### Privacy
- Data minimization
- Consent management
- Right to deletion
- Data portability
- Privacy policy enforcement

### GDPR/CCPA Compliance
- Data export functionality
- Data deletion functionality
- Consent tracking
- Privacy policy acceptance
- Data processing agreements

---

## Technology Stack Recommendations

### Backend
- **Language**: Node.js (TypeScript) or Python (FastAPI)
- **Framework**: Express.js or FastAPI
- **Database**: PostgreSQL (primary), Redis (cache/sessions)
- **ORM**: Prisma or TypeORM (Node.js) / SQLAlchemy (Python)

### Frontend
- **Framework**: React (current) or Next.js (for SSR)
- **State Management**: Zustand or Redux Toolkit
- **Forms**: React Hook Form
- **Styling**: CSS Modules or Tailwind CSS
- **Charts**: Recharts or Chart.js

### Infrastructure
- **Hosting**: AWS, GCP, or Azure
- **CDN**: CloudFlare or AWS CloudFront
- **File Storage**: AWS S3 or CloudFlare R2
- **Queue**: AWS SQS, RabbitMQ, or Redis Queue
- **Email**: SendGrid, Mailgun, or AWS SES
- **SMS**: Twilio or AWS SNS

### Monitoring & Logging
- **APM**: Datadog, New Relic, or Sentry
- **Logging**: ELK Stack or CloudWatch
- **Uptime**: Pingdom or UptimeRobot
- **Error Tracking**: Sentry

---

## Scalability Considerations

### Horizontal Scaling
- Stateless API servers
- Load balancer distribution
- Database read replicas
- Caching layer (Redis)

### Performance Optimization
- Database indexing strategy
- Query optimization
- CDN for static assets
- Response caching
- Lazy loading

### Cost Optimization
- Auto-scaling policies
- Reserved instances for predictable workloads
- Spot instances for batch jobs
- Data archiving strategy

---

## Development Phases

### Phase 1: Foundation (Months 1-3)
- Database schema implementation
- Authentication system
- Basic API structure
- User dashboard (basic)

### Phase 2: Core Features (Months 4-6)
- Survey builder
- Branding system
- Response collection
- Basic analytics

### Phase 3: Distribution (Months 7-9)
- Panel management
- Email distribution
- SMS distribution
- Link sharing

### Phase 4: Advanced Features (Months 10-12)
- Advanced analytics
- Reporting
- API for integrations
- Webhooks

### Phase 5: Compliance (Months 13-18)
- SOC II preparation
- Security hardening
- Compliance documentation
- Audit preparation

---

## Risk Mitigation

### Technical Risks
- **Database Performance**: Implement proper indexing, query optimization
- **Scalability**: Design for horizontal scaling from start
- **Security**: Security-first approach, regular audits
- **Data Loss**: Automated backups, point-in-time recovery

### Business Risks
- **Competition**: Focus on differentiators (branding, panel management)
- **Compliance**: Engage compliance experts early
- **Costs**: Monitor infrastructure costs, optimize early
- **User Adoption**: Focus on UX, gather feedback

---

## Next Steps

1. **Choose Backend Stack**: Node.js vs Python
2. **Set Up Development Environment**: Docker, local databases
3. **Design Database Schema**: Finalize table structures
4. **Create API Specification**: OpenAPI/Swagger docs
5. **Set Up CI/CD**: GitHub Actions, deployment pipeline
6. **Security Review**: Initial security assessment
7. **Compliance Planning**: Engage SOC II consultant

