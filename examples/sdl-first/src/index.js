import { server } from './server'

const port = process.env.PORT || 4000

void (async function () {
  const { url } = await server.listen({ port })

  console.log(url)
})()
