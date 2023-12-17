from transformers import pipeline
#data = ["ALL CAPS JUST LIKE MY COMMENT", "yiu look like my gramma", "this hits hard in 1.75x" ]
#results = sentiment_pipeline(data)
#Print the results
#for text, result in zip(data, results):
    #print(f"Text: {text} | Sentiment: {result['label']} | Score: {result['score']:.4f}")

import googleapiclient.discovery
import googleapiclient.errors
from flask import Flask, jsonify, render_template, request, Response
import json
from flask_cors import CORS
import os

app = Flask(__name__)
cors = CORS(app)  # Enable CORS for all routes in the app
def get_negative_comments(video_id):
    sentiment_pipeline = pipeline("sentiment-analysis")
    api_service_name = "youtube"
    api_version = "v3"
    DEVELOPER_KEY = "AIzaSyAmuPoqgeZyvjoueoRoNCOFa9-jx5aiQHU"

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey = DEVELOPER_KEY)

    # Fetch all comments using updated maxResults
    request = youtube.commentThreads().list(
        part="snippet",
        videoId=video_id,
        maxResults=100
    )
    response = request.execute()

    comments = []
    for i in response['items']:
        #print(i)
        text = (i['snippet']['topLevelComment']['snippet']['textOriginal'])
        author = (i['snippet']['topLevelComment']['snippet']['authorDisplayName'])
        comments.append({'text': text, 'author': author})

    for i in range(9):
        try:
            next_page_token = response['nextPageToken']
        except KeyError:
            break
        next_page_token = response['nextPageToken']
        #create new request object with the next page token
        next_request = youtube.commentThreads().list(
            part="snippet",
            videoId=video_id,
            maxResults=100,
            pageToken=next_page_token
        )
        #execute the request
        response = next_request.execute()
        #append the response items to the comments list
        for i in response['items']:
            text = (i['snippet']['topLevelComment']['snippet']['textOriginal'])
            author = (i['snippet']['topLevelComment']['snippet']['authorDisplayName'])
            comments.append({'text': text, 'author': author})
    count = 0
    max_length = 256
    for i in comments:
        if len(i['text']) > max_length:
            i['text'] = i['text'][:max_length]
    negative_comments = []
    for i in comments:
        data = [i['text']]
        results = sentiment_pipeline(data)
        # if results[0]['label'] == 'NEGATIVE':
        #     negative_comments.append(i)
        for text, result in zip(data, results):
            #print(result['label'])
            if result['label'] == 'NEGATIVE' and result['score'] > 0.9:
                #print(f"Text: {text} | Sentiment: {result['label']} | Score: {result['score']:.4f}")
                negative_comments.append({'id': count, 'text': i['text'], 'author': i['author']})
                count = count + 1
            #print(f"Text: {text} | Sentiment: {result['label']} | Score: {result['score']:.4f}")
    return negative_comments

@app.route("/process_comments/<video_id>")
def process_comments(video_id):
    negative_comments = get_negative_comments(video_id)
    # Use json.dumps with ensure_ascii=False
    json_data = json.dumps(negative_comments, ensure_ascii=False)

    # Create a Flask Response object
    response = Response(json_data, content_type='application/json; charset=utf-8')
    return response

# for i in negative_comments:
#     print(i['text'])
#     print(i['author'])
#     print('')

# print(len(negative_comments))
# print(len(comments))
# video_id = 'fQvCZ5ZsnGM'
# negative_comments = get_negative_comments(video_id)
# print((negative_comments))

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))