import fetch, { Response } from 'node-fetch'
import { getMessagesRequest, getMessagesResponse } from './definitions.js'
import { convertToStringValues } from './utils.js'

const DEBUG = true

export default class HornetAPI {
  token: string | null = null
  xClientVersion = 'Web 74.15.3'

  constructor(token: string) {
    this.token = token
  }

  async #request(endpoint: string, body: { [key: string]: any }, method: 'POST')
  async #request(endpoint: string, body: { [key: string]: string }, method: 'GET')
  async #request(endpoint: string, body: { [key: string]: any } | { [key: string]: string }, method: string) {
    const baseUrl = 'https://gethornet.com/api/v3/'
    let request: Promise<Response>
    const commonHeaders = {
      'Authorization': `Hornet ${this.token}`,
      'x-client-version': this.xClientVersion
    }
    switch(method) {
      case 'GET':
        request = fetch(baseUrl + endpoint + new URLSearchParams(body), {
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
    const result = await response.json()
    return result
  }

  async getMessages(profileId: number, limit = 15, beforePaginationId?: string): Promise<getMessagesResponse> {
    const options: getMessagesRequest = {
      profile_id: profileId,
      per_page: limit
    }
    if(beforePaginationId) options.before = beforePaginationId
    const messages = await this.#request(`messages/${profileId}/conversation.json`, convertToStringValues(options), 'GET') as getMessagesResponse
    return messages
  }
}