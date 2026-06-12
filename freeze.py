from flask_frozen import Freezer
from app import app

app.config['FREEZER_DESTINATION'] = 'docs'
app.config['FREEZER_RELATIVE_URLS'] = True

freezer = Freezer(app)

# Fuerza a Flask a mapear las rutas con extensión .html
@freezer.register_generator
def route_generator():
    yield 'index', {}
    yield 'medications', {}
    yield 'contacts', {}

if __name__ == '__main__':
    freezer.freeze()