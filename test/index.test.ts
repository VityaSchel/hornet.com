import './env.ts'
import HornetAPI from '../out/index'

it('gets messages', async () => {
  if(!process.env.TOKEN) throw new Error('Please define process.env.TOKEN')
  const api = new HornetAPI(process.env.TOKEN)
  const messages = await api.getMessages(process.env.TEST_MESSAGES_PROFILE_ID)
  console.log(messages.messages)
  expect(Array.isArray(messages.messages)).toBe(true)
})