from flask_pymongo import PyMongo
from flask import Flask
import os
mongo = PyMongo()

def init_mongo(app: Flask):
    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    mongo.init_app(app)
