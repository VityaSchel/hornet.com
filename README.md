# hornet.com

Unofficial browser API wrapper for queer social network [hornet.com](https://hornet.com).

Written in TypeScript, tested with Jest.

![Logo](./logo.png)

This project was made by some enthusiast who had 3 free hours in evening, please feel free to fork and maintain it, since I'm not really interested in continuing developing it. 

## Usage

```
npm install hornet.com
```

```ts
import HornetAPI from 'hornet.com'

const api = new HornetAPI('your-token')
```

Find your session token using one of the following methods:
1. Find cookie `hornet-web-auth` encoded with percent-encoding, decode it, parse json and use value from "at" key. Example: `{"at":"yourtoken-here","r":true,"pid":123456,"u":"yourusername","ip":true}`
2. Open Local Storage (🤦‍♂️🤦‍♂️🤦‍♂️), open key `storage:current-user`, parse json and use value from "session.access_token" key. Example: `{"session":{"access_token":"yourtoken-here","external_access_token":<...>,"valid_until":<...>,"account":<...>,"profile":<...>,"settings":<...>,"totals":<...>,"filters":<...>,"onboarding_objective_set":<...>,"public_share_moment_toggle":<...>,"honey_account":<...>,"hornet_points_account":<...>,"entitlements":<...>,"user_video_audience_options":<...>,"currentLocation":<...>}}`

## API reference

Not really work-in-progress since there is no work and no progress on this section, but you got the idea.

- async getMessages(profileId: number, limit = 15, beforePaginationId?: string): - Promise\<getMessagesResponse\>
- async getProfile(profileId: number): Promise\<HornetUser\>
- async deleteConversation(profileId: number)

## Examples

You can find examples in [./examples/](./examples/README.md)

## Useful to know

- Hornet requires client version when making requests to API, and they will most likely deprecate version hardcoded by default in this package: `Web 74.15.3`. You can find up-to-date version code just by looking into Network tab in your browser, under `x-client-version` header in any request to hornet API. Change it by setting `xClientVersion` property on HornetAPI instance:
```ts
const api = new HornetAPI('your-token')
api.xClientVersion = `Web 12.34.5`
```
Otherwise you will be getting weird errors and sometimes even fabricated responses to keep backwards compatability
- Please someone fix type definitions generations, they are not being outputted by swc/tsc and I'm not sure how to fix that. They are only generated when using `tsc`, not `swc`