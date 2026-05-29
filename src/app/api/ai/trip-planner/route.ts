import { generateTripPlan } from "@/lib/ai";
import { requireDeepSeekKey } from "@/lib/config";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    requireDeepSeekKey();

    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== "string") {
      return Response.json(
        { error: "Please provide a travel query" },
        { status: 400 }
      );
    }

    const result = await generateTripPlan(query);

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Trip planner error:", error);

    if (error instanceof Error && error.message.includes("DEEPSEEK_API_KEY")) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return Response.json(
      { error: "Failed to generate trip plan. Please try again." },
      { status: 500 }
    );
  }
}
