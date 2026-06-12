from flask_frozen import Freezer
from app import app

app.config['FREEZER_DESTINATION'] = 'docs'
# Esta línea hace que los enlaces funcionen de forma relativa en cualquier servidor
app.config['FREEZER_RELATIVE_URLS'] = True 

freezer = Freezer(app)

if __name__ == '__main__':
    freezer.freeze()