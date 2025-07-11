from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_prompt(ingredients, desired_texture):
    return f"""You are an expert pastry chef and baking scientist.

The user provides this list of ingredients:
{ingredients}

They want the result to have a {desired_texture} texture.

Based on these ingredients:

1. What texture is it most likely to bake into?
2. Does it need any ingredient changes to match the desired texture? (If yes, be specific)
3. What baking temperature and time would you recommend?

Respond with a clear and concise analysis in one friendly paragraph."""

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    ingredients = data.get('ingredients', [])
    desired_texture = data.get('desired_texture', 'cookie')
    
    if not ingredients:
        return jsonify({"error": "No ingredients provided"}), 400
    
    prompt = generate_prompt(ingredients, desired_texture)
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a professional pastry chef."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=256
        )
        
        analysis = response.choices[0].message.content
        return jsonify({"analysis": analysis})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)