from flask import Flask, redirect, request, jsonify
from flask_cors import CORS
from flask_graphql import GraphQLView
from message import Message 
from database import db
from schema import schema  # make sure your schema is imported correctly
import requests
import json
import base64

app = Flask(__name__)
cors = CORS(app, resources={r"/graphql": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://chroxmxwwrnpsc:0a5d1f66b55416e48b18e2ee701a0434ab257d65c2315571e878afc754418167@ec2-18-205-44-21.compute-1.amazonaws.com:5432/d586kgmbr7n0rk"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Your Worldcoin app settings
CLIENT_ID = "app_staging_a23155e3d7ed6e3f075172c93c6f7e4c"
CLIENT_SECRET = "sk_b901a6800e7160ce480521edccdd9ca755e556abe5a753fc"
REDIRECT_URI = "http://localhost:5000/auth/callback"
BASE_URL = "https://id.worldcoin.org"

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/', methods = ['GET'])
def hello_world():
    # Redirect user to Worldcoin authentication page
    auth_url = f"{BASE_URL}/authorize?response_type=code&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}"
    return redirect(auth_url, code=302)

@app.route("/callback")
def callback():
    # Worldcoin redirects user here after authentication
    auth_code = request.args.get("code")

    # Exchange authorization code for tokens
    token_url = f"{BASE_URL}/token"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode()
    }
    data = {
        "code": auth_code,
        "grant_type": "authorization_code"
    }
    response = requests.post(token_url, headers=headers, data=data)
    tokens = response.json()
    session['token'] = tokens


    # Now you can use the tokens to call Worldcoin APIs on behalf of the user
    # For this example, we just display them
    return jsonify(tokens)

@app.route("/register", methods = ['POST'])
def register():
    # Extract user data from the request
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    verifivation = 

    # Perform validation on the input data
    if not name or not email or not password:
        return jsonify({'error': 'Incomplete user data'})

    mutation = '''
        mutation($name: String!, $email: String!, $password: String!) {
        registerUser(name: $name, email: $email, password: $password) {
            message
        }
        }
    '''
    variables = {
        'name': name,
        'email': email,
        'password': password
    }
    result = schema.execute(mutation, variable_values=variables)

app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,  # Pass the schema object directly
        graphiql=True
    )
)

if __name__ == '__main__':
    app.run(debug=True)
