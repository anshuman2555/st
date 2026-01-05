
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
You are Georgia AI, a helpful and professional admission assistant for St. Georgia Business Academy in Patna. 
The college offers:
1. BCA (Bachelor of Computer Applications) - Focuses on software dev, networking, and IT.
2. BBA (Bachelor of Business Administration) - Focuses on corporate leadership, finance, and marketing.

Key Details:
- Location: ST. GEORGIA BUSINESS ACADEMY, Sai Niwas, Adarsh Nagar, Sampatchak, Patna - 800007.
- Phone: +91 87972 38275
- Email: admissions@stgeorgiabusinessacademy.in
- Admission Status: Active for upcoming academic cycles.
- Eligibility: 10+2 (Higher Secondary) completion in any stream.

Your goal is to answer student queries about courses, campus life, eligibility, and the application process. 
Always remain polite, encouraging, and focused on helping students enroll. 
Keep responses concise but informative.
`;

export const getGeminiResponse = async (userPrompt: string, history: ChatMessage[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: formattedHistory.concat([{ role: "user", parts: [{ text: userPrompt }] }]),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm having trouble connecting right now. Please call our admission desk at +91 87972 38275.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I am unable to process your request at the moment. Please feel free to call us directly for assistance.";
  }
};
