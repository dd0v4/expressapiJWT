import requests

data = {
    "name": "user2",
    "age" : 20,
    "books": [{"title": "Harry Potter", "date": 1995, "genre": "fiction"}, {"title": "SNK", "date": 2020, "genre":"Fiction"}],
    "token": ""
}
r = requests.post("http://localhost:3000/users", json=data)
print(r.text)