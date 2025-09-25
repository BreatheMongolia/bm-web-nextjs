export function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-CA') // e.g. "2016-04-09"
}

export function splitLocalizedValue(value: string, locale: string): string {
  const [en, mn] = value.split(' / ')
  return locale === 'mn' ? (mn || en) : en
}

export function translateList(items: string[], locale: string): string[] {
  return items.map(item => splitLocalizedValue(item, locale))
}

export function transformPolicy(raw: any) {
  const f = raw.policy.policyPageCustomFields;

  return {
    title: {
      en: f.title,
      mn: f.titleMn,
    },
    description: {
      en: f.name,
      mn: f.nameMn,
    },
    summary: {
      en: f.summary,
      mn: f.summaryMn,
    },
    updates: {
      en: f.updates,
      mn: f.updatesMn,
    },
    furtherReading: {
      en: f.furtherReading,
      mn: f.furtherReadingMn,
    },
    dateApproved: formatDate(f.initiatedDate),
    fileMn: f.downloadUrlMn,
    fileEn: f.downloadUrl,
    sourceUrl: f.sourceUrl,
    topics: (raw.policy.topics?.edges || []).map((e: any) => e.node.name),
    documentTypes: (raw.policy.documentTypes?.edges || []).map((e: any) => e.node.name),
    status: (raw.policy.policyStatuses?.edges || []).map((e: any) => e.node.name),
    recommendedActions: (f.recommendedAction?.edges || []).map((e: any) => e.node),
    relatedPolicies: (f.relatedPolicies?.edges || []).map((e: any) => e.node),
  }
}