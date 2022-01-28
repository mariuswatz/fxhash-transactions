import getActions from './query.js'
import fs from 'fs'

const userID='tz2NY3Fgt5QufrYGP1JKdvLKcWWt86sLsqrS';
const endpoint = 'https://api.fxhash.xyz/graphql'

async function main() {
  let user = {
    id: userID,
    skip: 0,
    take: 50,
    actions: [],
  }


  let ok = false
  do {
    ok = getActions(user, endpoint)
    if (!ok) {
      console.log(user.actions.length + ' actions...')
      fs.writeFileSync('actions.json', JSON.stringify(user))
    }
  } while (ok)
}

main().catch((error) => console.error(error))
