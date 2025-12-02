import { GoogleGenAI, Type } from "@google/genai";
import { GeneratorOptions, ProjectIdea } from "../types";

const parseGeminiError = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const generateProjectIdeas = async (options: GeneratorOptions): Promise<ProjectIdea[]> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing. Please check your environment variables.");
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      Act as a Senior Principal Software Architect.
      Create 2 comprehensive technical specifications for React web applications tailored to the following requirements:
      
      Target Industry: ${options.industry}
      Complexity Level: ${options.complexity}
      Technical Focus: ${options.focusArea}

      Constraints:
      1. REAL WORLD PROBLEMS ONLY. Focus on complex workflows, data visualization, real-time collaboration, or system optimization.
      2. The "Tech Architecture" must include modern, specific libraries.
      3. **Target Users**: Define specific user personas (e.g., "Radiology Department Head", "High-Frequency Trader").
      4. **Suggested Tools**: Recommend external tools, APIs, or AI models to accelerate dev (e.g. "Sentry for monitoring", "Gemini API for summarization").
      5. **Risk & Security**: Provide real analysis on risks (e.g. "GDPR Compliance") and security (e.g. "End-to-end encryption").
      6. **Implementation**: A concrete step-by-step roadmap.
      7. **Future**: Limitations of the MVP and future scale-up ideas.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              shortDescription: { type: Type.STRING },
              problem: { type: Type.STRING, description: "The specific real-world pain point." },
              solution: { type: Type.STRING, description: "High-level technical solution strategy." },
              targetUsers: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of 2-3 specific user personas or roles."
              },
              features: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "List of 3-4 key technical features."
              },
              techStack: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "List of 5-7 specific libraries or patterns."
              },
              toolsAndAI: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of 3-4 recommended external tools, dev tools, or AI models to integrate."
              },
              implementationSteps: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "5-6 sequential steps to build the application."
              },
              userExperienceTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of 3 specific UX features/micro-interactions."
              },
              security: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of 3 key security considerations (e.g. 'RBAC', 'Data Encryption')."
              },
              risks: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of 3 potential risks and their mitigations."
              },
              limitations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of 3 MVP limitations or ideas for future versions."
              },
              complexity: { type: Type.STRING },
              realWorldImpact: { type: Type.STRING, description: "Why this matters in business." }
            },
            required: [
              "title", "shortDescription", "problem", "solution", "targetUsers", 
              "features", "techStack", "toolsAndAI", "implementationSteps", 
              "userExperienceTips", "security", "risks", "limitations", 
              "complexity", "realWorldImpact"
            ]
          }
        }
      }
    });

    if (!response.text) {
      throw new Error("No response received from Gemini.");
    }

    const data = JSON.parse(response.text) as ProjectIdea[];
    return data;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(`Failed to generate ideas: ${parseGeminiError(error)}`);
  }
};