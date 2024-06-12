from flask import Flask, request, jsonify
from assistant import chat_creation, chat_with_assitant
from flask_cors import CORS
import os
import pandas as pd
import sqlite3 as sql
import taskingai
from custom_assistant import create_or_fetch_assistant
from creating_database import database
from dotenv import load_dotenv
import os


def convert_excel_to_html(excel_path, html_path):
    df = pd.read_excel(excel_path)
    df.to_html(html_path)
    
app = Flask(__name__)
CORS(app) 

load_dotenv()
port = int(os.getenv('FLASK_PORT', 5000))
flask_host = os.getenv('FLASK_HOST', '127.0.0.1')
T_API_KEY = os.getenv('Tasking_API_KEY')
assist_id = os.getenv('assist_id')
taskingai.init(api_key=T_API_KEY)

UPLOAD_FOLDER = 'data'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
@app.route('/')
def show_records():
    data = []
    with sql.connect("database.db") as con:
        cur = con.cursor()
        records = cur.execute('''SELECT * FROM files''')
        for record in records:
            data.append({'name': record[1], 'date': record[4], 'image': '/chat.png','link': f'{record[2]}'})
            print(record[2])
        con.commit()
    con.close()
    return jsonify(data)
#http://{flask_host}:{port}/ask/{record[2]}
@app.route('/database/<path:name>',methods=['GET'])
def query_database(name):
    data = []
    with sql.connect("database.db") as con:
        cur = con.cursor()
        records = cur.execute("SELECT * FROM records WHERE Project = ?", (name,))
        all_records = records.fetchall()
        for record in all_records:
            json_record = {
            "BATT_ID": record[0],
            "Project": record[1],
            "Details": record[2],
            "MixType": record[3],
            "Binder_PG": record[4],
            "Binder_Content": record[5],
            "NMAS": record[6],
            "RAP": record[7],
            "Fiber": record[8],
            "Dosage": record[9],
            "Additive": record[10],
            "Dosage1": record[11],
            "Specimen_ID": record[12],
            "CT_index": record[13]
            }
            data.append(json_record)
        con.commit()
    return jsonify(data)

@app.route("/upload",  methods=['GET','POST'])
def File_Upload():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        convert_excel_to_html(f"./{UPLOAD_FOLDER}/{file.filename}", "./data/output2.html")
        assistant_id, collection_id = create_or_fetch_assistant(f"./{UPLOAD_FOLDER}/output2.html")
        datab = database()
        datab.set_path(f"./{UPLOAD_FOLDER}/{file.filename}")
        datab.upload_data(assistant_id,collection_id)
        datab.insert_rows()
        return jsonify({"message": "File uploaded successfully", "filename": file.filename}), 200

@app.route('/ask/<assistant_id>', methods=['POST'])
def index(assistant_id):
    if request.method == "POST":
        data = request.json
        u_input = data.get('message')
        if u_input:
            chat = chat_creation(assistant_id=assistant_id)
            #"SdELxQ3VX5Vf36OnpbNSrtFd"
            response = chat_with_assitant(chat_id=chat.chat_id, assist_id=assistant_id, u_input = u_input)
            return jsonify({'message': response.content.text})
        else:
            return jsonify({'error': 'No message provided'}), 400
    
if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5000))
    flask_host = os.getenv('FLASK_HOST', '127.0.0.1')
    app.run(host=flask_host, port=port)
