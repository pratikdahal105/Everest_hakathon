
from flask import Flask, jsonify
from flask_graphql import GraphQLView
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()