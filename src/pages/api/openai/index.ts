export const prerender = false
const OPENAIKEY = import.meta.env.VITE_OPENAI_API_KEY
interface RequestBody {
  prompt: string
  width: number
  height: number
}
export async function POST({
  request,
}: {
  request: Request
}): Promise<Response> {
  const requestBody: RequestBody = await request.json()
  const { prompt, width, height } = requestBody

  return new Response(`https://placekitten.com/${width}/${height}`)
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAIKEY}`,
    },
    body: JSON.stringify({
      prompt,
      n: 1,
      size: String(width + "x" + height) || "256x256",
    }),
  }

  let response
  try {
    const r = await fetch(
      "https://api.openai.com/v1/images/generations",
      options
    )
    console.log(`\nImage generation response: ${r.status}, ${r.statusText}`)
    const data = await r.json()
    console.log(`\nImage generation data: ${data.data[0].url}`)
    response = data.data[0].url
  } catch (error) {
    console.error("Creation of image failed, retrying")
    response = undefined
  }
  return new Response(response)
}
