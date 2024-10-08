import requests
from llm_call import get_response

hard_letters = list(set(['t', 'a', 'u', 'g', 'h']))

def fetch_user(username):
    response = requests.get(f'http://localhost:3000/users/{username}')
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching user: {response.status_code}")
        return None

def update_user(username, selected_text, hard_letters):

    response = requests.put(f'http://localhost:3000/users/{username}', json={
        'selected_text': selected_text,
        'hard_letters': hard_letters
    })
    if response.status_code == 200:
        print("User updated successfully")
    else:
        print(f"Error updating user: {response.status_code}")

def clear_user_data(username):
    response = requests.patch(f'http://localhost:3000/users/{username}/clear')
    if response.status_code == 200:
        print("User data cleared successfully")
    else:
        print(f"Error clearing user data: {response.status_code}")

def run_llm():
    if hard_letters:
        response = get_response(f"Provide one simple sentence with more of the following letters in it: {hard_letters}. Do not include more sentences")
    else:
        response = get_response("Provide one simple, VERY VERY concise English sentence.")
    content = response['choices'][0]['message']['content']
    print("\n\n\n", content, "\n\n\n")

    return content

    # # Fetch user data
    # username = "john.smith@usc.edu"  # Replace with the actual username if available
    # user_data = fetch_user(username)
    
    # if user_data:
    #     # Clear user data
    #     clear_user_data(username)
        
    #     # Update user data
    #     update_user(username, content, hard_letters)

    