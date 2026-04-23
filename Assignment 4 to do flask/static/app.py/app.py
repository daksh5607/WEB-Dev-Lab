from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)

tasks = []
next_id = 1


# Home Route
@app.route("/")
def home():
    return render_template("index.html")


# GET All Tasks + Filter
@app.route("/api/tasks", methods=["GET"])
def get_tasks():

    status = request.args.get("status")

    if status == "active":
        return jsonify(
            [
                t for t in tasks
                if not t["completed"]
            ]
        )

    elif status == "completed":
        return jsonify(
            [
                t for t in tasks
                if t["completed"]
            ]
        )

    return jsonify(tasks)


# ADD TASK
@app.route("/api/tasks", methods=["POST"])
def add_task():

    global next_id

    data = request.get_json()

    if not data or not data.get("title","").strip():
        return jsonify(
            {"error":"Title required"}
        ),400

    task = {
        "id": next_id,
        "title": data["title"],
        "description": data.get("description",""),
        "priority": data.get("priority","Medium"),
        "completed": False,
        "created_at": str(datetime.now())
    }

    tasks.append(task)

    next_id += 1

    return jsonify(task),201


# EDIT TASK
@app.route("/api/tasks/<int:id>", methods=["PUT"])
def edit_task(id):

    for task in tasks:

        if task["id"] == id:

            data = request.get_json()

            task["title"] = data.get(
                "title",
                task["title"]
            )

            task["description"] = data.get(
                "description",
                task["description"]
            )

            task["priority"] = data.get(
                "priority",
                task["priority"]
            )

            return jsonify(task)

    return jsonify(
        {"error":"Task not found"}
    ),404


# TOGGLE STATUS
@app.route(
"/api/tasks/<int:id>/toggle",
methods=["PATCH"]
)
def toggle_task(id):

    for task in tasks:

        if task["id"] == id:

            task["completed"] = not task["completed"]

            return jsonify(task)

    return jsonify(
        {"error":"Not found"}
    ),404


# DELETE TASK
@app.route(
"/api/tasks/<int:id>",
methods=["DELETE"]
)
def delete_task(id):

    global tasks

    for task in tasks:

        if task["id"] == id:

            tasks = [
                t for t in tasks
                if t["id"] != id
            ]

            return "",204

    return jsonify(
        {"error":"Not found"}
    ),404


if __name__ == "__main__":
    app.run(debug=True)-