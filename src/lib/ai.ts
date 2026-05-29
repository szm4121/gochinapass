import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export const deepseek = createOpenAI({
  baseURL: "https://api.deepseek.com/v1",
  apiKey: process.env.DEEPSEEK_API_KEY ?? "",
});

export const chatModel = deepseek("deepseek-chat");

export async function generateTripPlan(query: string) {
  const result = streamText({
    model: chatModel,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: query }],
    temperature: 0.7,
    maxTokens: 8192,
  });
  return result;
}

const SYSTEM_PROMPT = `You are a China travel expert for first-time visitors.

Create a detailed travel plan with TWO sections separated by ===JSON===.

IMPORTANT: In Section 1, write in COMPLETE SENTENCES with full details. NEVER use "(e.g.," or incomplete phrases. Every attraction, hotel, and activity must include its full name.

Section 1 (Markdown): Full itinerary with specific attraction names, restaurant names, hotel names, prices in USD, and practical tips. Use ## for day headings and ### for Morning/Afternoon/Evening.

Section 2 (JSON): Structured data:
{"title":"","overview":"","days":[{"day":1,"title":"","location":"","activities":[{"time":"Morning/Afternoon/Evening","activity":"","details":""}]}],"budget":{"accommodation":{"low":0,"mid":0,"high":0},"transport":{"low":0,"mid":0,"high":0},"food":{"low":0,"mid":0,"high":0}},"transport":[{"between":"","mode":"","duration":"","approxCost":""}],"tips":[]}

Mention hotels/eSIM/VPN naturally. Use USD.`;