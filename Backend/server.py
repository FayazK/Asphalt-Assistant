from flask import Flask, request, jsonify, redirect, url_for
from assistant import chat_creation, chat_with_assitant
from flask_cors import CORS
import os
import pandas as pd
import sqlite3 as sql
import taskingai
from custom_assistant import create_or_fetch_assistant, create_assistant_only
from creating_database import database
from dotenv import load_dotenv
import os
import logging

logging.basicConfig(level=logging.DEBUG)
#X5lMGRxmL4ML018K9Kh11nC6
def convert_excel_to_html(excel_path, html_path):
    df = pd.read_excel(excel_path)
    df.to_html(html_path)
    
app = Flask(__name__)
CORS(app) 

load_dotenv()
port = int(os.getenv('FLASK_PORT'))
flask_host = os.getenv('FLASK_HOST')
T_API_KEY = os.getenv('Tasking_API_KEY')
taskingai.init(api_key=T_API_KEY,host='https://tasking.fayazk.com')

UPLOAD_FOLDER = 'data'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
@app.route('/')
def show_records():
    '''The function will return the list of all the assistant present in database to show in card layout'''
    data = []
    with sql.connect("database.db") as con:
        cur = con.cursor()
        records = cur.execute('''SELECT * FROM files''')
        for record in records:
            data.append({'name': record[1], 'date': record[4], 'image': '/chat.png','link': f'{record[0]}'}) #the link contian UUID of the file
        con.commit()
    con.close()
    return jsonify(data)


@app.route('/database/<path:name>',methods=['GET'])
def query_database(name):
    '''Thi is api for database it will return all the project based on name of project'''
    data = []
    with sql.connect("database.db") as con:
        cur = con.cursor()
        records = cur.execute("SELECT * FROM records WHERE Project = ?", (name,))
        all_records = records.fetchall()
        #inserting all the records into the database
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
    '''Handle upload file request creating assistant, inserting into the databse'''
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
        datab.insert_rows() #insert all the records in a file
        return jsonify({"message": "File uploaded successfully", "filename": file.filename}), 200

@app.route("/create_assistant",  methods=['GET','POST'])
def create_assistant():
    '''create assistant if deleted'''
    value = request.args.get('value')
    uuid = request.args.get('uuid')
    if request.method == 'POST': 
        if value:
           assistant_id, collection_id = create_assistant_only(collection_id=value)
           datab = database()
           datab.update_assistant_data(assistant_id,uuid)
    else:
        # Handle GET request if needed
        return jsonify({"message": "Please upload a file", "value": value}), 200

@app.route('/ask/<uuid>', methods=['POST'])
def index(uuid):
    '''main endpoing it will hadle the chat conversation with assitatn based on UUID'''
    try:
        if request.method == "POST":
            data = request.json
            u_input = data.get('message')
            chat_id = data.get('chat_id')
            with sql.connect("database.db") as con:
                cur = con.cursor()
                records = cur.execute('''SELECT * FROM files WHERE uuid = ?''', (uuid,))
                record = records.fetchone()
                assistant_id = record[2]
            if not chat_id:
                try:
                    chat = chat_creation(assistant_id=assistant_id)
                    chat_id = chat.chat_id
                    print('chat id created ==',chat_id)
                except taskingai.client.rest.ApiException as e:
                    value = record[3]
                    uuid = record[0]
                    return redirect(url_for('create_assistant', value=value, uuid=uuid, method='POST'))  # Redirect to create_assistant
                    
            if u_input:
                response = chat_with_assitant(chat_id=chat_id, assist_id=assistant_id, u_input=u_input)
                return jsonify({'message': response.content.text, 'uuid': uuid, 'chat_id': chat_id})
            
            else:
                return jsonify({'error': 'No message provided'}), 400
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({'error': 'Unexpected error occurred'}), 500


if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT'))
    flask_host = os.getenv('FLASK_HOST')
    app.run(host=flask_host, port=port)
