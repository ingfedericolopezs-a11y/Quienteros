import os
from anthropic import Anthropic, HUMAN_PROMPT, AI_PROMPT

# Load .env if present (optional)
try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

def _build_prompt(messages):
    """Convierte una lista de mensajes en el formato que espera la API de Claude."""
    prompt = ""
    for m in messages:
        if m["role"] == "user":
            prompt += f"{HUMAN_PROMPT} {m['content']}\n"
        else:
            prompt += f"{AI_PROMPT} {m['content']}\n"
    prompt += AI_PROMPT  # termina con el token del asistente
    return prompt

def chat(messages,
         model="claude-3-5-sonnet-20240620",
         max_tokens=1024,
         temperature=0.7):
    """Envía una conversación a Claude y devuelve la respuesta como texto."""
    response = client.completions.create(
        model=model,
        max_tokens_to_sample=max_tokens,
        temperature=temperature,
        prompt=_build_prompt(messages)
    )
    return response.completion.strip()

# Prueba rápida
if __name__ == "__main__":
    demo = [{"role": "user", "content": "Hola, ¿cómo estás?"}]
    print(chat(demo))
