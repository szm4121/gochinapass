export const config = {
  site: {
    name: "GoChinaPass",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    description: "Your AI-powered travel companion for exploring China.",
  },
  deepseek: {
    apiKey: process.env.DEEPSEEK_API_KEY,
    model: "deepseek-chat",
    baseUrl: "https://api.deepseek.com/v1",
  },
} as const;

export function requireDeepSeekKey() {
  if (!config.deepseek.apiKey) {
    throw new Error(
      "DEEPSEEK_API_KEY environment variable is not set. " +
      "Get your API key from https://platform.deepseek.com"
    );
  }
}
