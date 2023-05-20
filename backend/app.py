from flask import Flask, request
from pymongo import MongoClient
from uuid import uuid4

client = MongoClient('localhost', 27017)
db = client.flask_db
todosdb = db.todos

app = Flask(__name__)


def can_user_do_this(pitch, time):
    user_can_add_event = True

    for docs in todosdb.find():
        if docs['pitch'] == pitch:
            if docs['time'] == time:
                user_can_add_event = False

    return user_can_add_event


@app.post('/save_data')
def save_event_data():
    if request.form is not None:
        user_can_add_event = can_user_do_this(
            request.form["pitch"], request.form["time"])

        event = request.form['event']
        person = request.form['person']
        pitch = request.form['pitch']
        time = request.form['time']

        if user_can_add_event == True:
            todosdb.insert_one(
                {"event": event, "person": person, "pitch": pitch, "time": time, "id": str(uuid4())})

            return {"message": "successful"}

        return {"message": "failed"}

    return {"message": "failed"}


@app.get('/get_event_data')
def get_event_data():
    current_data = {"event": [], "person": [],
                    "pitch": [], "time": [], 'id': []}
    for x in db.todos.find():
        current_data["id"].append(str(x['id']))
        current_data["event"].append(x["event"])
        current_data["time"].append(x["time"])
        current_data["person"].append(x["person"])
        current_data["pitch"].append(x["pitch"])

    return current_data


@app.put('/edit_data')
def edit_data():
    if request.json is not None:
        user_can_edit_event = can_user_do_this(
            request.json['pitch'], request.json['time'])

        if user_can_edit_event == True:
            db.todos.find_one_and_replace(
                {'id': request.json['id']}, request.json)

            return {"message": "successful"}

        return {"message": "failed"}

    return {"message": "failed"}


@app.post('/delete_data')
def delete_data():
    if request.json is not None:
        db.todos.find_one_and_delete({"id": request.json['id']})

        return {"messsage": "successful"}

    return {"message": "failed"}
