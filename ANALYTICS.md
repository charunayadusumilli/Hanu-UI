# Analytics Implementation Plan - Hanu Consulting

**Target URL:** `https://www.hanu-consulting.com/services`

## 1. The Technology Stack (Architecture)

| Layer | Tool | Purpose |
| :--- | :--- | :--- |
| **Orchestration** | Google Tag Manager (GTM) | Central hub to manage tracking scripts without touching code. |
| **Identity** | LinkedIn Insight Tag + Leadfeeder | Identify Job Titles and Company Names of visitors. |
| **Behavior** | Microsoft Clarity + GA4 | Analyze scrolling, clicking, and page performance. |

## 2. Implementation Checklist

### [ ] Step 1: Governance & Privacy
- [ ] Update Privacy Policy to include LinkedIn, GA4, and Behavioral tracking.
- [ ] Implement a Cookie Consent Banner (OneTrust or CookieBot) that integrates with GTM "Consent Mode."

### [ ] Step 2: GTM Configuration
- [ ] Create GTM Container.
- [ ] Deploy GA4 Configuration Tag (Measurement ID: `G-XXXXXXXX`).
- [ ] Deploy LinkedIn Insight Tag (Partner ID: `XXXXXX`).
- [ ] Deploy Microsoft Clarity Script.

### [ ] Step 3: Service Page Specific Tracking
- [ ] **Event:** `view_service_item` (Fires when a user clicks a specific service tile).
- [ ] **Event:** `lead_form_start` (Fires when a user clicks into the first field of a form).
- [ ] **Event:** `lead_form_submit` (Fires on successful submission).
- [ ] **Scroll Tracking:** Fire events at 25%, 50%, 75%, and 90% depth.

### [ ] Step 4: B2B Identity Setup
- [ ] Connect Leadfeeder or 6sense to GA4.
- [ ] Create a "High Intent" segment: Visitors who visited `/services` AND stayed > 2 mins.

### [ ] Step 5: Validation
- [ ] Use GTM "Preview Mode" to verify tags fire on `https://www.hanu-consulting.com/services`.
- [ ] Check LinkedIn Campaign Manager to see if "Website Demographics" are populating.
