import './env.ts'
import HornetAPI from '../out/index'

if(!process.env.TOKEN) throw new Error('Please define process.env.TOKEN')
const api = new HornetAPI(process.env.TOKEN)

it('gets messages', async () => {
  const messages = await api.getMessages(process.env.TEST_MESSAGES_PROFILE_ID)
  console.log(messages.messages)
  expect(Array.isArray(messages.messages)).toBe(true)
})

it('gets profile', async () => {
  const user = await api.getProfile(process.env.TEST_MESSAGES_PROFILE_ID)
  console.log(user, user.age > 20)
  expect(user).not.toBe(undefined)
})

it('deletes conversation', async () => {
  const deletionStatus = await api.deleteConversation(123456)
  console.log(deletionStatus)
  expect(deletionStatus).toBe(true)
})