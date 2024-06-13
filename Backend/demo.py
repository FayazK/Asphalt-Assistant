# from taskingai.inference import chat_completion, SystemMessage, UserMessage
# import taskingai
# from dotenv import load_dotenv
# import os
# load_dotenv()

# T_API_KEY = os.getenv('Tasking_API_KEY')
# #assist_id = os.getenv('assist_id')
# taskingai.init(api_key='tkXF0DmGv8KMlq2YLnwvkt88xbCuMB7X',host='https://tasking.fayazk.com')


# # choose an available chat_completion model from your project
# model_id = "Tpadd13F"

# # create a chat_completion task
# chat_completion = chat_completion(
#     model_id=model_id,
#     messages=[
#         UserMessage("Hi how can you help me?"),
#     ]
# )

# print(chat_completion)


import sqlite3

def delete_record_by_name(database, table, name):
    try:
        conn = sqlite3.connect(database)
        cursor = conn.cursor()
        
        sql_query = f"DELETE FROM {table} WHERE assistant_id = ?"
        
        cursor.execute(sql_query, (name,))
        conn.commit()

    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    finally:
        # Close the connection
        if conn:
            conn.close()

# Example usage
database = 'database.db'
table = 'files'       
name_to_delete = 'X5lMQglZ3ik6jc6OewQa8LqP'

delete_record_by_name(database, table, name_to_delete)
