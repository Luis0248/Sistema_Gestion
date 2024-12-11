from flask import Flask
from config.mysql import db
from config.mongodb import init_mongo, mongo
from routes.gestion import gestion
import os
from flask_cors import CORS

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@127.0.0.1/gestion_compras'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

db.init_app(app)

init_mongo(app)

print("Colecciones disponibles en MongoDB:", mongo.db.list_collection_names())

app.register_blueprint(gestion, url_prefix='/api')

if __name__ == "__main__":
    app.run(debug=True)

CORS(app)
CORS(app, origins=["http://localhost:4200"])  # Cambia la URL según tu entorno
