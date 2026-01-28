import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { dataInput } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { result: "API Key is missing." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Using standard Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    // UPDATE: Now we ask for English output
    const prompt = `
      You are an expert data analyst. 
      Analyze the following dataset and provide a short sentence professional, 
      enthusiastic insight in English. Use emojis.
      
      Dataset:
      ${dataInput}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ result: text });
    
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { result: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}