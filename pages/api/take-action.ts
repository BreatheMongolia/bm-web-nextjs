import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAPI } from 'lib/graphql-api/api'

type TypeSubmissionBody = {
  id: number | string
  language: string
  date: string
  value?: string
}

export type SubmissionResult = {
  totalPledges?: number
  totalUserFeedbacks?: { yes: number; no: number }
}

const MUTATIONS = {
  pledge: `
    mutation addPledgeMutation($id: ID!, $cid: String!, $language: String!, $date: String!) {
      addPledge(input: { clientMutationId: $cid, date: $date, id: $id, language: $language }) {
        takeAction {
          totalPledges
        }
      }
    }
  `,
  feedback: `
    mutation addFeedbackMutation($id: ID!, $cid: String!, $language: String!, $date: String!, $value: String!) {
      addUserFeedback(input: { clientMutationId: $cid, date: $date, id: $id, language: $language, value: $value }) {
        takeAction {
          totalUserFeedbacks {
            no
            yes
          }
        }
      }
    }
  `,
}

export function validateSubmissionBody(body: any, requireValue: boolean): string | null {
  if (!body || typeof body !== 'object') {
    return 'Invalid request body'
  }
  if (!body.id || (typeof body.id !== 'number' && typeof body.id !== 'string')) {
    return 'Invalid id'
  }
  if (typeof body.language !== 'string' || !['en', 'mn'].includes(body.language.toLowerCase())) {
    return 'Invalid language'
  }
  if (typeof body.date !== 'string' || Number.isNaN(Date.parse(body.date))) {
    return 'Invalid date'
  }
  if (requireValue && (typeof body.value !== 'string' || !['yes', 'no'].includes(body.value.toLowerCase()))) {
    return 'Invalid value'
  }
  return null
}

export async function handleSubmission(
  req: NextApiRequest,
  res: NextApiResponse,
  kind: 'pledge' | 'feedback',
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = req.body as Partial<TypeSubmissionBody>
  const validationError = validateSubmissionBody(body, kind === 'feedback')
  if (validationError) {
    res.status(400).json({ error: validationError })
    return
  }

  try {
    const result = await fetchAPI(MUTATIONS[kind], {
      variables: {
        id: body.id,
        cid: `${kind}-${body.id}`,
        language: body.language,
        date: body.date,
        ...(kind === 'feedback' ? { value: body.value } : {}),
      },
    })

    const takeAction = kind === 'pledge' ? result?.addPledge?.takeAction : result?.addUserFeedback?.takeAction

    res.status(200).json({
      totalPledges: takeAction?.totalPledges,
      totalUserFeedbacks: takeAction?.totalUserFeedbacks,
    })
  } catch (error) {
    const graphqlErrors = (error as Error & { graphqlErrors?: Array<{ message?: string }> })?.graphqlErrors

    // The backend rate limiter (bm_enforce_rate_limit) throws UserErrors that
    // WPGraphQL surfaces in the errors array while already showing the current
    // submission; tell the client to back off instead of reporting a failure.
    if (Array.isArray(graphqlErrors) && graphqlErrors.some(e => /already submitted|too many submissions/i.test(e?.message ?? ''))) {
      res.status(429).json({ error: 'Too many submissions' })
      return
    }

    console.error(`Failed to submit ${kind}:`, error)
    res.status(502).json({ error: 'Failed to submit' })
  }
}
