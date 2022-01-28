import getActions from './query.js'
import fs from 'fs'

async function main() {
  let user = {
    id: 'tz2NY3Fgt5QufrYGP1JKdvLKcWWt86sLsqrS',
    skip: 0,
    take: 50,
    actions: [],
  }

  let endpoint = 'https://api.fxhash.xyz/graphql'

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
