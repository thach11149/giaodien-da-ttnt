import os
from google import genai
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

# Initialize API Clients
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyCusS52pdQ6btZCBh8dyZkb0fBvbRkhP84") # Hardcoded for demo as per da-ttnt
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

gemini_client = None
try:
    gemini_client = genai.Client(api_key=GEMINI_API_KEY)
except Exception as e:
    print(f"Warning: Gemini AI not configured. {e}")

groq_client = None
if GROQ_API_KEY:
    try:
        groq_client = Groq(api_key=GROQ_API_KEY)
    except Exception as e:
        print(f"Warning: Groq AI not configured. {e}")

def call_ai_with_fallback(prompt: str) -> str:
    """
    Try Gemini first, if it fails (quota exceeded), fallback to Groq.
    """
    # Try Gemini first
    if gemini_client and GEMINI_API_KEY:
        try:
            response = gemini_client.models.generate_content(
                model="gemini-2.0-flash-exp",
                contents=prompt
            )
            return response.text
        except Exception as e:
            print(f"Gemini failed: {e}")
            # Fallback to Groq
            pass
    
    # Fallback to Groq
    if groq_client:
        try:
            response = groq_client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=500,
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Groq also failed: {e}")
            raise Exception(f"All AI providers failed. Last error: {e}")
    
    raise Exception("No AI provider available.")
