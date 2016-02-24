# -*- encoding: utf-8 -*-
from datetime import datetime
import requests
import pytz

email = 'admin@example.com'
password = 'admin'

login_url = 'http://127.0.0.1:5000/api/v1/auth'
response = requests.post(login_url, json={'email': email, 'password': password})
response_data = response.json()

access_token = response_data['access_token']

print('Token is {0}'.format(access_token))

birthday = datetime(2016, 1, 2, 15, 30, tzinfo=pytz.UTC)

url = 'http://127.0.0.1:5000/api/v1/kids'

name = 'John'
new_kid_data = {'name': name,
                'gender': 'male',
                'birthday': birthday.strftime('%Y-%m-%dT%H:%M:%SZ')}

response = requests.post(url, json=new_kid_data,
                         headers={'Authorization': 'JWT ' + access_token})

print(response.json())

