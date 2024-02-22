import requests


data = {
    "books": [{"title": "Nouveau livre 2", "date": 999, "genre":"Ajouté après authentification avec JWT"}]
}

header = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcjIiLCJhZ2UiOjIwLCJpYXQiOjE3MDg2MTg4Mzl9.WX6Kz60ffLbYS2S-UJwUK5_03c5pDYsmEN2MOotsajs"
}
r = requests.put("http://localhost:3000/users/65d77457e61ff0d4d514d412/books", json=data, headers=header)
print(r.text)