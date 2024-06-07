import pandas as pd
import sqlite3 as sql
# # Read the Excel file
# excel_file_path = './data/JM of BATT Surface Tech CT-HWT Test Data Summary.xlsx'
# df = pd.read_excel(excel_file_path)

# # Convert to HTML
# html_file_path = './data/output.html'
# df.to_html(html_file_path)

# def show_records(record_id):
#     with sql.connect("database.db") as con:
#         cur = con.cursor()
#         cur.execute('DELETE FROM files WHERE uuid = ?', (record_id,))
#         con.commit()
#     con.close()
# record_id = "3bc561e2-6b99-494a-87d7-d48f99953877"
# show_records(record_id)


#pip install python-dotenv
from dotenv import load_dotenv
import os

# Load the .env file
load_dotenv()

# Access the environment variables
api_key = os.getenv('YOUR_API_KEY')
assist_id = os.getenv('assist_id')

print(f"API Key: {api_key}")
print(f"Database URL: {assist_id}")
