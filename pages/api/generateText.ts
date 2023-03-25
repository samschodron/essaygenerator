import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const generateText = async (text: string)=>{
    try {
        const generatedText = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
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
  if (req.method !== 'POST') {
    return res.status(304).json({response: "Not a POST call"})
  }
  else {
    if(!req.body || !req.body.text) {
      res.status(400).json({response: "No body input."})
    }
    const text = req.body.text
    const response = await generateText(text) as string
    return res.status(200).json({ response })
  } 
}
