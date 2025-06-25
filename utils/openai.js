import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only for development - move to backend in production
});

class Ratelimiter {
  constructor(maxRequests = 10, timeWindow = 60000) {
    this.requests = [];
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
  }

  canMakeRequest() {
  const now = Date.now();
  this.requests = this.requests.filter(time => now - time < this.timeWindow);
  return this.requests.length < this.maxRequests;
  }

  recordRequest() {
    this.requests.push(Date.now());
  }
}

const rateLimiter = new Ratelimiter();

export const generateContent = async (prompt, type = 'general') => {
  if (!rateLimiter.canMakeRequest()) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }

  try {
    rateLimiter.recordRequest();

    const systemPrompts = {
      seo_title: "You are an expert SEO specialist. Generate a compelling, SEO-optimized titles that are under 60 characters",
      meta_description: "You are an expert SEO specialist. Generate a concise, SEO-optimized meta description that is under 160 characters.",
      ad_copy: "You are a Google Ads expert. Generate 3 complelling ad copies that drives clicks and conversions.",
      alt_text: "You are an accessibility expert. Generate descriptive alt text for images that helps visually impaired users understand the content."
    }



    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: systemPrompts[type] || "You are a helpful content creation assistant."},
      { role: 'user', content: prompt }
    ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error', error);
    throw new Error(`Failed to generate content. ${error.message}`);
  }
}

// Test function
export const testOpenAI = async () => {
  try {
    const result = await generateContent("Generate an SEO title for a blog post about sustainable gardening", "seo_title");
    console.log("OpenAI Test Success:", result);
    return result;
  } catch (error) {
    console.error("OpenAI Test Failed:", error);
    throw error;
  }
};
