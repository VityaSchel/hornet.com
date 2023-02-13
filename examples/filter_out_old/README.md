# hornet.com package examples: filter_out_old

Delete conversations with people older than specified age.

## Running this example

1. Fill .env file as instructed in [examples/README.md](../README.md)
2. Install all dependencies, build project as this example uses `/out` dir
3. Run `node index.js`
4. Follow prompt instructions on your screen

> **Note**
> You can find user's profile id by looking into API. The simpliest way to do it is to look inside HTML code of page of user and look up `id="shoebox-ember-data-storefront">{"queries":{"GET::https://gethornet.com/api/v3/members/` — right after that will be id before `.json":"{\"member\":{\"id\`