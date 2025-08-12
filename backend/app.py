from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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
        response = client.chat.completions.create(
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

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if path.endswith('.html'):
        return send_from_directory(app.static_folder, path)
    return app.send_static_file(path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000, debug=True)