import { chatModel } from "@/lib/ai";
import { streamText } from "ai";
import { requireDeepSeekKey } from "@/lib/config";

export const runtime = "nodejs";

const QA_SYSTEM = `You are a China travel expert assistant. Answer questions from foreign tourists about traveling in China.

Rules:
- Be accurate and practical — give real, actionable advice
- If you're unsure about current regulations, say so and suggest the user check official sources
- Keep answers concise but helpful (2-4 paragraphs max)
- Always mention relevant guides or tools when applicable
- For internet/VPN questions, note that regulations change frequently`;

export async function POST(request: Request) {
  try {
    requireDeepSeekKey();

    const body = await request.json();
    const { question } = body;

    if (!question || typeof question !== "string") {
      return Response.json(
        { error: "Please provide a question" },
        { status: 400 }
      );
    }

    const result = streamText({
      model: chatModel,
      system: QA_SYSTEM,
      messages: [{ role: "user", content: question }],
      temperature: 0.3,
      maxTokens: 1024,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("QA error:", error);
    return Response.json(
      { error: "Failed to answer question. Please try again." },
      { status: 500 }
    );
  }
}
