from functools import wraps
from flask import Response, request

def authentication(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        if not session['access_token'] or not session['id_token'] or not session['credential_type']:
            return ressponse('Unauthorized', mimetype='text/plain', status=401)
        else:
