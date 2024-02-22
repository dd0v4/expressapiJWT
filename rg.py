import requests

header = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcjIiLCJhZ2UiOjIwLCJpYXQiOjE3MDg2MTg4Mzl9.WX6Kz60ffLbYS2S-UJwUK5_03c5pDYsmEN2MOotsajs"
}

r = requests.get("http://localhost:3000/users/65d77457e61ff0d4d514d412/books", headers=header)
print(r.text)