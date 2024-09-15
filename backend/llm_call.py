import json
import requests
import os
from dotenv import load_dotenv
import logging as logger

load_dotenv()
# Set the API key and URL
API_KEY = os.getenv("TUNE_API")
URL = os.getenv("TUNE_URL")

def get_response(prompt):
    stream = False
    url = URL
    headers = {
        "Authorization": API_KEY,
        "Content-Type": "application/json",
    }
    data = {
    "temperature": 0.8,
        "messages":  [
    {
        "role": "user",
        "content": prompt
    }
    ],
        "model": "kaushikaakash04/tune-blob",
        "stream": stream,
        "frequency_penalty":  0,
        "max_tokens": 900
    }
    response = requests.post(url, headers=headers, json=data)
    if stream:
        for line in response.iter_lines():
            if line:
                l = line[6:]
                if l != b'[DONE]':
                    logger.info(json.loads(l))
    else:
        logger.info(response.json())
    return response.json()