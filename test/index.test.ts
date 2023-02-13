import './env.ts'
import HornetAPI from '../out/index'

if(!process.env.TOKEN) throw new Error('Please define process.env.TOKEN')
if(!process.env.TEST_MESSAGES_PROFILE_ID) throw new Error('Please define process.env.TEST_MESSAGES_PROFILE_ID')
const testMessagesProfileId = Number(process.env.TEST_MESSAGES_PROFILE_ID)
const api = new HornetAPI(process.env.TOKEN)

it('gets messages', async () => {
  const messages = await api.getMessages(testMessagesProfileId)
  // console.log(messages.messages)
  expect(Array.isArray(messages.messages)).toBe(true)
})

it('gets profile', async () => {
  const user = await api.getProfile(testMessagesProfileId)
  // console.log(user, user.age > 20)
  expect(user).not.toBe(undefined)
})

it('deletes conversation', async () => {
  const deletionStatus = await api.deleteConversation(123456)
  // console.log(deletionStatus)
  expect(deletionStatus).toBe(true)
})