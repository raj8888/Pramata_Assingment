# Chat Application

## Tech Stack:

**Frontend:** HTML,CSS,JavaScript.
**Backend:** Node.js,Mongoose.js,Express.js,MongoDB,Socket.io.
**Token Generation**:jsonwebtoken
**Hashing Password**:Bcrypt

## Frontend Folder

- SignUp Page (For New User SignUP)
- SignIn Page (For Login)
- Chat page (Chat with everyone / Join Channel)

## Backend Flolder

## For Running Locally

- clone the project
```bash
git clone https://github.com/raj8888/Pramata_Assingment
```

- Go to the Repo
```bash
cd Pramata_Assingment
```
- For Install Modules
```bash
npm i
```

- For download nodemon globally
```bash
npm install -g nodemon
```

- For start server
```bash
nodemon index.js
```

## API Refference

- for user register
```http
POST/api/signup
```

- for user login
```http
POST/api/signin
```

### For Channel

- for getting all Channels
```http
GET/api/allchannel/
```

- for getting Single Channels
```http
GET/api/channel/:id
```

- for adding user to Channel
```http
GET/api/channels/addUser
```
