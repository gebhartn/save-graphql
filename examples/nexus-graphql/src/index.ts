import { app } from './server'

void (async () => {
  const port = process.env.PORT || 8000
  const { url } = await app.listen({ port })

  console.log(url)
})()
