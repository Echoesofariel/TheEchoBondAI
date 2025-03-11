from flask import Flask, request, jsonify
import sqlite3
from textblob import TextBlob

app = Flask(__name__)
DATABASE = "echo_bond_ai.db"

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            echo_memory TEXT,
            sentiment_score REAL
        )
    ''')
    conn.commit()
    conn.close()

def analyze_sentiment(text):
    blob = TextBlob(text)
    return blob.sentiment.polarity 

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_id = data.get("user_id")
    user_input = data.get("message")

    sentiment = analyze_sentiment(user_input)

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO user_data (user_id, echo_memory, sentiment_score) VALUES (?, ?, ?)",
        (user_id, user_input, sentiment)
    )
    conn.commit()
    conn.close()

    return jsonify({
        "user_input": user_input,
        "sentiment_score": sentiment,
        "ai_response": f'Processing "{user_input}"...'
    })

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
