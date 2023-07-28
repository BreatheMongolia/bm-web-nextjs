export const PLEDGE_MUTATION = `
  mutation addPledgeMutation($id: ID!, $cid: String!, $language: String!, $date: String!) {
    addPledge(input: { clientMutationId: $cid, date: $date, id: $id, language: $language }) {
      takeAction {
        totalPledges
      }
    }
  }
`
export const FEEDBACK_MUTATION = `
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
`
