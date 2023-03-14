import { OpenAIStream, OpenAIStreamPayload } from "../../../lib/OpenAIStream";

// export const config = {
//     runtime: "edge",
//   };

export async function POST(req: Request): Promise<Response> {

    if (!process.env.OPENAITOKEN) {
        throw new Error("Missing env var from OpenAI");
    }
    
    const body = await req.json()
    console.log(body)

    if (!body) {
        return new Response("No prompt in the request", { status: 400 });
    }

    const payload: OpenAIStreamPayload = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: body }],
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 4000,
        stream: true,
        n: 1,
    };

    const stream = await OpenAIStream(payload);
    console.log(stream)
    // return new Response(stream);
    return new Response(stream, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

export default POST