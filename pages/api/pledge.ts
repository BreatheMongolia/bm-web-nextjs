import type { NextApiRequest, NextApiResponse } from 'next'
import { handleSubmission } from 'pages/api/take-action'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return handleSubmission(req, res, 'pledge')
}
