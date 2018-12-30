import pickle
from flask_cors import CORS, cross_origin
from flask import jsonify
import os
from flask import Flask, flash, request, redirect, url_for, session
import csv
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
@app.route('/<text>', methods=['GET'])
def login(text):
    if request.method == 'GET':
        with open('res.csv') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if(row['ncodpers']==text):
                    return jsonify(ncodpers = str(row['ncodpers']), added_products = str(row['added_products']))
        #return jsonify ()
if __name__ == '__main__':
    app.secret_key = os.urandom(24)
    app.run(port=5000,debug=True)

flask_cors.CORS(app, expose_headers='Authorization')
