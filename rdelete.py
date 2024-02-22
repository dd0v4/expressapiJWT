import requests

r = requests.delete("http://localhost:3000/users/65d77389f06b3ae98b44c460")
print(r.text)