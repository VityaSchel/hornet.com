import fetch, { Response } from 'node-fetch'
import { HornetUser } from './definitions/HornetUser.js'
import { getMessagesRequest, getMessagesResponse } from './definitions/index.js'
import { convertToStringValues } from './utils.js'

const DEBUG = true

export default class HornetAPI {
  token: string | null = null
  xClientVersion = 'Web 74.15.3'

  constructor(token: string) {
    this.token = token
  }

  async #request(endpoint: string, method: 'POST', body: { [key: string]: any })
  async #request(endpoint: string, method: 'GET', body: { [key: string]: string })
  async #request(endpoint: string, method: 'DELETE', body: null)
  async #request(endpoint: string, method: string, body: { [key: string]: any } | { [key: string]: string } | null) {
    const baseUrl = 'https://gethornet.com/api/v3/'
    let request: Promise<Response>
    const commonHeaders = {
      'Authorization': `Hornet ${this.token}`,
      'x-client-version': this.xClientVersion
    }
    switch(method) {
      case 'DELETE':
        request = fetch(baseUrl + endpoint, {
          method: 'DELETE', headers: commonHeaders
        })
        break

      case 'GET':
        request = fetch(baseUrl + endpoint + new URLSearchParams(body as { [key: string]: string }), {
          method: 'GET', headers: commonHeaders
        })
        break

      case 'POST':
        request = fetch(baseUrl + endpoint, {
          body: JSON.stringify(body), method, headers: {
            'Content-Type': 'application/json',
            ...commonHeaders
          }
        })
        break

      default:
        throw new Error('Hornet API does not support this method')
    }
    const response = await request
    // DEBUG && console.log(response.status)
    try {
      const text = await response.text()
      try {
        const json = JSON.parse(text)
        return json
      } catch(e) {
        // DEBUG && console.warn('Unable to parse response as JSON', text)
        if(text.length === 0) return null
        else return text
      }
    } catch(e) {
      DEBUG && console.warn('Unable to parse response as text')
      return null
    }
  }

  async getMessages(profileId: number, limit = 15, beforePaginationId?: string): Promise<getMessagesResponse> {
    const options: getMessagesRequest = {
      profile_id: profileId,
      per_page: limit
    }
    if(beforePaginationId) options.before = beforePaginationId
    const messages = await this.#request(`messages/${profileId}/conversation.json`, 'GET', convertToStringValues(options)) as getMessagesResponse
    return messages
  }

  async getInbox() {

  }

  async getProfile(profileId: number): Promise<HornetUser> {
    const user = await this.#request(`members/${profileId}.json`, 'GET', {}) as { member: HornetUser }
    return user.member
  }

  async deleteConversation(profileId: number) {
    const response = await this.#request(`messages/${profileId}`, 'DELETE', null) as { member: HornetUser }
    if(response !== null) {
      throw new Error(`Couldn't delete Hornet conversation with id${profileId}. Error: ${response}`)
    }
    return response === null
  }
}