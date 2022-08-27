import apis
from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello"


# Login Related APIs
@app.route("/register", methods=["POST"])
def register():
    return apis.register(request.get_json(force=True))


@app.route("/login", methods=["POST"])
def login():
    return apis.login(request.get_json(force=True))


# Get and Load data APIs
@app.route("/get_population_data", methods=["GET"])
def get_population_data():
    return apis.get_population_data()


@app.route("/load_data", methods=["GET"])
def load_data():
    return apis.load_data()


if __name__ == "__main__":
    app.run(debug=True)
