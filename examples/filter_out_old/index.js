import '../env.js'
import prompts from 'prompts'
import HornetAPI from '../../out/index.js'

console.log('[!!!] Please note that this script will actually DELETE conversations with specified user if their age is higher than specified. It is not test and not dry run. Be careful with inputting profile id to not accidentally delete important conversations.')

if(!process.env.TOKEN) throw new Error('Please define process.env.TOKEN')
const api = new HornetAPI(process.env.TOKEN)


const values = await prompts([
  {
    type: 'number',
    name: 'profile_id',
    message: 'Please enter profile id to test for age'
  },
  {
    type: 'number',
    name: 'age',
    message: 'Please enter MAXIMUM age allowed, if previously specified user\'s age is higher, conversation with them will be deleted',
    validate: value => value < 18 ? 'Hornet profiles can\'t have age < 18, this will delete any conversation' : true
  }
])

const profile = await api.getProfile(values.profile_id)
console.log('User\'s age:', profile.age, 'Maximum age:', values.age)
if(profile.age > values.age) {
  console.log('User\'s age is higher, deleting conversation...')
  await api.deleteConversation(values.profile_id)
} else {
  console.log('User\'s age is same or lower, skipping...')
}

console.log('Done!')