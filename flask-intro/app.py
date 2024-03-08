from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)

# Telling app where the database is located
# Can also use mysql
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app) # Initialize database with settings from app

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    # Returns this when a new task is posted
    def __repr__(self):
        return f"<Task {self.id}>"

@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        task_content = request.form['content']
        new_task = Todo(content=task_content)

        # Push to database
        try:
            db.session.add(new_task)
            db.session.commit()
            return redirect('/')
        except:
            return "Error: Not able to save task."
    else:
        # Display tasks on page
        tasks = Todo.query.order_by(Todo.date_created).all()
        # tasks = Todo.query.order_by(Todo.date_created).first()

        return render_template('index.html', tasks=tasks)

# Implement delete functionality
@app.route('/delete/<int:id>')
def delete(id):
    task_to_delete = Todo.query.get_or_404(id) # If it can't, 404
    try:
        db.session.delete(task_to_delete)
        db.session.commit()
        return redirect('/')
    except:
        return ("Error: Unable to delete task.")

# Implement delete functionality
@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update(id):
    task_to_update = Todo.query.get_or_404(id) # If it can't, 404
    if request.method == "POST":
        update_text = request.form["content"]
        task_to_update.content = update_text
        try:
            # db.session.add(task_to_update) # Don't have to add because row is already there
            db.session.commit()
            return redirect('/')
        except:
            return ("Error: Unable to update task.")
    else:
        return render_template('/update.html', task=task_to_update)

if __name__ == "__main__":
    app.run(debug=True, port=8000)