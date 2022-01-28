import request, { GraphQLClient, gql } from 'graphql-request'

const userActions = gql`
  query Query($id: String!, $take: Int, $skip: Int) {
    user(id: $id) {
      id
      actions(take: $take, skip: $skip) {
        id
        type
        metadata
        createdAt
        issuer {
          id
          name
          flag
          avatarUri
        }
        target {
          id
          name
          flag
          avatarUri
        }
        token {
          id
          name
        }
        objkt {
          id
          name
        }
      }
    }
  }
`

let client

export default async function getActions(user, endpoint) {
  if (!client) client = new GraphQLClient(endpoint)

  console.log(user.skip, user.skip + user.take)
  // const res=await
  try {
    const data = await client.request(userActions, {
      id: user.id,
      take: user.take,
      skip: user.skip,
    })

    console.log(data.user.id, data.user.actions.length)
    data.user.actions.forEach((el) => {
      user.actions.push(el)
    })

    console.log(user.actions.length)
    user.skip += user.take

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
