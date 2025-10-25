# 🧑‍💼 Employee Management System

A full-stack Employee Management System built with **FastAPI (Python)** for the backend and **React.js** for the frontend.  
It allows you to manage employee data efficiently — add, view, update, and delete employees — all connected to a MySQL database.

---

## 🚀 Tech Stack

### 🖥️ Backend (API)
- Python 3.11  
- FastAPI  
- PyMySQL  
- Pydantic (for validation)  
- MySQL Database  
- CORS Middleware for frontend integration  

### 💻 Frontend
- React.js  
- Tailwind CSS (for styling)  

---

## 🗂️ Project Structure

```
python-prac/
│
├── employee-frontend/        # React frontend app
│   ├── src/                  # React components & pages
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── venv/                     # Python virtual environment
│
├── main.py                   # FastAPI backend file
├── requirements.txt          # Python dependencies
├── README.md                 # Project documentation
└── .gitignore                # Files/folders to ignore in Git
```

---

## ⚙️ Backend Setup (FastAPI)

### 1️⃣ Create and activate a virtual environment
```bash
# Create venv
python -m venv venv

# Activate venv (Windows)
venv\Scripts\activate

# Activate venv (Mac/Linux)
source venv/bin/activate
```

### 2️⃣ Install dependencies
```bash
pip install -r requirements.txt
```

### 3️⃣ Run the FastAPI server
```bash
uvicorn main:app --reload
```

➡ Backend runs on: **http://127.0.0.1:8000**

---

## 💾 Database Setup

1. Install MySQL Server and create a database:
```sql
CREATE DATABASE employee_db;
```

2. Update your database connection inside `main.py`:
```python
db = pymysql.connect(
    host="localhost",
    user="root",
    password="yourpassword",
    database="employee_db"
)
```

3. Make sure the MySQL server is **running** before starting the backend.

---

## 💻 Frontend Setup (React)

Navigate to the frontend folder:
```bash
cd employee-frontend
```

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Run the React app
```bash
npm start
```

➡ Frontend runs on: **http://localhost:3000**

---

## 🔗 Connecting Backend and Frontend

In your frontend API calls, make sure to use:
```js
http://127.0.0.1:8000
```
as the backend base URL.

CORS is already enabled in `main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🧪 Example API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/employees` | Get all employees |
| POST | `/employees` | Add a new employee |
| PUT | `/employees/{id}` | Update employee by ID |
| DELETE | `/employees/{id}` | Delete employee by ID |

---

## 🧰 requirements.txt Example

```
fastapi
uvicorn
pymysql
pydantic
python-multipart
```

---

## 🧾 Submission Guidelines (Hackathon)

Before pushing to GitHub:
1. Ensure your virtual environment (`venv/`) is included in `.gitignore`
2. Repository should contain:
   - `README.md`
   - `requirements.txt`
   - `main.py`
   - `employee-frontend/`
   - `.gitignore`
3. Test the app locally (both backend and frontend) to confirm everything runs without errors.

---

## 🎬 Demo Flow (For Presentation)

Here’s a simple 2–3 minute demo script you can follow:

1. **Introduction (30 sec)**  
   “Hi everyone, I’m Dinesh, and this is my Employee Management System built using FastAPI and React.”

2. **Show the Backend (45 sec)**  
   - Open your FastAPI server terminal (show `uvicorn` running).  
   - Explain that you’re using MySQL to store employee data.  
   - Quickly show one API endpoint (like `/employees`) on Swagger UI (`http://127.0.0.1:8000/docs`).

3. **Show the Frontend (1 min)**  
   - Switch to the running React app.  
   - Demonstrate adding a new employee and seeing it appear in the list.  
   - Edit or delete one record.

4. **Wrap Up (30 sec)**  
   “This project demonstrates a complete full-stack CRUD application with proper validation, CORS setup, and real-time connection between frontend and backend.”

---

## 👨‍💻 Author

**Dinesh V**  
GitHub: [https://github.com/Dinesh4166](https://github.com/Dinesh4166)

---
