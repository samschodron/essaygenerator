import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const generateText = async ()=>{
    try {
        const generatedText = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Write a 200-250 word essay about a personal experience in an untraditional learning space.",
            temperature: 0.7,
            max_tokens: 500,
            top_p: 1,
          });
          const newText = generatedText.data.choices[0].text
          console.log(newText)
          return newText as string
    }
    catch(e) {
        console.log(e)
    }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  response: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await generateText() as string
  res.status(200).json({ response })
}
