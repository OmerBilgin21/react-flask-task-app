### To run the app:

```
git clone https://github.com/OmerBilgin21/react-flask-task-app.git

pip install Flask pymongo uuid

cd backend

flask run --debug --host=0.0.0.0

cd ../frontend

npm i

npm run dev
```

### To run the database

If you have mongodb installed everything should be fine.

If your mongodb runs on a different port than default, please make adjustments at /backend/app.py.

##### If you don't have mongodb installed

Fron here you can follow the instructions to install it.

https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

For ubuntu I will provide a copy-able code:

```
sudo apt-get install gnupg

curl -fsSL https://pgp.mongodb.com/server-6.0.asc | \

sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg \

--dearmor


echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

sudo apt-get update

sudo apt-get install -y mongodb-org

echo "mongodb-org hold" | sudo dpkg --set-selections

echo "mongodb-org-database hold" | sudo dpkg --set-selections

echo "mongodb-org-server hold" | sudo dpkg --set-selections

echo "mongodb-mongosh hold" | sudo dpkg --set-selections

echo "mongodb-org-mongos hold" | sudo dpkg --set-selections

echo "mongodb-org-tools hold" | sudo dpkg --set-selections

sudo systemctl start mongod

sudo systemctl status mongod

```

### Everything should be up and running after this point.
