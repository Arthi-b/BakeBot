# BakeBot 🧁 🍪 🍰
 
**BakeBot** is an AI-powered baking assistant that tells you whether your dessert recipe will work and what to fix if it won’t. Whether you're trying to make a protein cookie or a low-carb cake, BakeBot analyzes your ingredients and predicts whether the recipe will turn out with the right texture (cookie-like, cake-like, etc.).

---

## Features

- Input a custom list of ingredients
- Uses an LLM (GPT) to evaluate recipe success
- Provides explanations and suggestions for improvement
- Frontend + Flask backend architecture

---

## Tech Stack

| Layer        | Tech Used                     |
|--------------|-------------------------------|
| Frontend     | HTML, CSS, JavaScript         |
| Backend      | Python, Flask, Flask-CORS     |
| AI Core      | OpenAI GPT-3.5/4 API (LLM)     |
| Dev Tools    | Git, VS Code, Postman, Vercel/Render (deployment)

---

## How It Works

1. User enters ingredients (e.g., "almond flour, maple syrup, egg")
2. BakeBot sends a prompt to the LLM asking if the recipe will turn out as a cookie
4. The backend returns:
   - A verdict (`"will bake as cookie"`)
   - An explanation (`"Has enough structure and binder"`)
   - The source (`"llm"`)

Built by Arthi Bhoomireddy


