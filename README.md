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

### Backend Setup
1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate
   # On Windows: venv\Scripts\activate
   
2. Install Dependencies
   ```bash
   cd backend
   pip install -r requirements.txt
   
4. Create a .env file in the backend directory with your OpenAI API key:
   OPENAI_API_KEY=your_api_key_here
   
6. Run the Flask server
   ```bash
   python app.py 

### Frontend Setup
1. Open the frontend directory in your browser or use a local server:
   ```bash
   cd frontend
   python -m http.server 8000
   
3. Open http://localhost:8000 in your browser.



Built by Arthi Bhoomireddy


