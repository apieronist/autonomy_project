from flask_frozen import Freezer
from app import app  # Asegúrate de que tu archivo principal se llame app.py

# Le decimos que guarde todo en la carpeta 'docs' para GitHub Pages
app.config['FREEZER_DESTINATION'] = 'docs'

freezer = Freezer(app)

if __name__ == '__main__':
    freezer.freeze()