import os
from flask import Flask, render_template

# Configure application
app = Flask(__name__)

@app.after_request
def after_request(response):
    """Ensure responses aren't cached by the browser"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/")
def index():
    """Render the main dashboard"""
    return render_template("index.html")

@app.route("/medications")
def medications():
    """Render the medication management page"""
    return render_template("medications.html")

@app.route("/contacts")
def contacts():
    """Render the emergency contacts directory"""
    return render_template("contacts.html")

# This allows running the app directly if needed
if __name__ == "__main__":
    app.run(debug=True)
