from flask import Flask, redirect, request, jsonify,session
from flask_cors import CORS
from flask_graphql import GraphQLView
from message import Message 
from database import db
from schema.schema import schema  # make sure your schema is imported correctly
import requests
import json
import base64
import uuid
from jose import jwt

app = Flask(__name__)
app.secret_key =  "Everest"
cors = CORS(app, resources={r"/graphql": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://chroxmxwwrnpsc:0a5d1f66b55416e48b18e2ee701a0434ab257d65c2315571e878afc754418167@ec2-18-205-44-21.compute-1.amazonaws.com:5432/d586kgmbr7n0rk"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Your Worldcoin app settingsa
CLIENT_ID = "app_6c25c96f26a7c560a77e5d9e00a2090a"
CLIENT_SECRET = "sk_a9e8ea23c68d3324059a9d9ee48a6b1992ca8e62c923f9ff"
REDIRECT_URI = "http://localhost:5000/callback"
BASE_URL = "https://id.worldcoin.org"


def verify_jwt(token):
    jwks_url = 'https://id.worldcoin.org/jwks.json'
    response = requests.get(jwks_url)
    keys = response.json()
    header = jwt.get_unverified_header(token)
    rsa_key = {}
    for key in keys['keys']:
        if key['kid'] == header['kid']:
            rsa_key = {
                'kty': key.get('kty', ''),
                'kid': key.get('kid', ''),
                'use': key.get('use', ''),
                'n': key.get('n', ''),
                'e': key.get('e', '')
            }
    try:
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=['RS256'],
            audience=CLIENT_ID,
            issuer='https://id.worldcoin.org'
        )
        return payload
    except Exception as e:
        print(e)
    return None

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/', methods = ['GET'])
def land_page():
    # Redirect user to Worldcoin authentication page
    return "go to http://localhost:5000/signInWC"

@app.route('/signInWC', methods = ['GET'])
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
    token = session.get('token')
    app.logger.info(token)
    if token:
        # You might want to adjust this part based on the token structure you receive
        payload = verify_jwt(token['access_token'])  # I'm assuming you receive an 'sub'
        if payload is not None:
            print("Token is valid.")
            app.logger.info("Token is valid.")
        else:
            print("Invalid token.")
    # Now you can use the tokens to call Worldcoin APIs on behalf of the user
    # For this example, we just display them
     # Get user information from /userinfo endpoint
        userinfo_url = "https://id.worldcoin.org/userinfo"
        userinfo_headers = {
            "Authorization": f"Bearer {token['access_token']}"
        }
        userinfo_response = requests.post(userinfo_url, headers=userinfo_headers)
        userinfo_data = userinfo_response.json()
        # Include user information in the tokens dictionary
        tokens['user_info'] = userinfo_data
    # return jsonify(tokens['access_token'])
    if(tokens['access_token']):
        session['sub'] = tokens['user_info']['sub']
        session['access_token'] = tokens['access_token']
        session['credential_type'] = tokens['user_info']['https://id.worldcoin.org/beta']['credential_type']
        if(session['credential_type'] == "orb"):
            return jsonify(token), 202
        else:
            return jsonify({'message': 'Not Orb Verified', 'status': False}), 401
    else:
        return jsonify({'message': 'User Logged In!', 'status': False}), 401
    
@app.route("/register", methods=['POST'])
def register():
    # Extract user data from the request
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No data provided'}), 400

    username = data.get('username')
    password = data.get('password')
    phone_number = data.get('phone_number')  # New line

    # Perform validation on the input data
    if not username or not password or not phone_number:  # Update this line
        return jsonify({'error': 'Incomplete user data'}), 400

    mutation = '''
    mutation($username: String!, $password: String!, $phoneNumber: String!) {
        createUser(username: $username, password: $password, id: $id, phoneNumber: $phoneNumber) {
            user {
                username
                phoneNumber
            }
        }
    }
'''

# In the register() function, generate a UUID and convert it to an integer string
    id = str(uuid.uuid4().int)
    phoneNumber = 1

    variables = {
    'username': username,
    'password': password,
    'id': id,
    'phoneNumber': phoneNumber,
}

    result = schema.execute(mutation, variable_values=variables)

    if result.errors:
        return jsonify({'error': str(result.errors[0])}), 400

    return jsonify(result.data['createUser'])


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
