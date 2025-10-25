from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import pymysql
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

app = FastAPI(title="Employee Management API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Database connection function
def get_db_connection():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="Dinesh",  # 🔒 replace with your MySQL password
        database="prac",
        cursorclass=pymysql.cursors.DictCursor
    )

# ✅ Pydantic model for employee data
class Employee(BaseModel):
    name: str
    email: EmailStr
    position: str
    salary: float

class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    position: Optional[str] = None
    salary: Optional[float] = None

# 🏠 Root endpoint
@app.get("/")
def home():
    return {"message": "Employee Management API is running 🚀"}


# ➕ CREATE Employee
@app.post("/employees")
def create_employee(employee: Employee):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO employees (name, email, position, salary) VALUES (%s, %s, %s, %s)",
            (employee.name, employee.email, employee.position, employee.salary)
        )
        conn.commit()
        return {"message": "Employee added successfully ✅"}
    except pymysql.err.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already exists ❌")
    finally:
        cursor.close()
        conn.close()


# 📋 READ all Employees
@app.get("/employees")
def get_employees():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM employees")
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return {"employees": result}


# 🔍 READ Employee by ID
@app.get("/employees/{emp_id}")
def get_employee(emp_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM employees WHERE id = %s", (emp_id,))
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    if result:
        return result
    raise HTTPException(status_code=404, detail="Employee not found ❌")


# ✏️ UPDATE Employee
@app.put("/employees/{emp_id}")
def update_employee(emp_id: int, employee: Employee):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM employees WHERE id = %s", (emp_id,))
    if not cursor.fetchone():
        raise HTTPException(status_code=404, detail="Employee not found ❌")

    cursor.execute(
        "UPDATE employees SET name=%s, email=%s, position=%s, salary=%s WHERE id=%s",
        (employee.name, employee.email, employee.position, employee.salary, emp_id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Employee updated successfully ✅"}


# ❌ DELETE Employee
@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM employees WHERE id = %s", (emp_id,))
    if not cursor.fetchone():
        raise HTTPException(status_code=404, detail="Employee not found ❌")

    cursor.execute("DELETE FROM employees WHERE id = %s", (emp_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Employee deleted successfully ✅"}

@app.patch("/employees/{emp_id}")
def update_employee_partial(emp_id: int, emp: EmployeeUpdate):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        fields = []
        values = []
        
        for key, value in emp.dict(exclude_unset=True).items():
            fields.append(f"{key}=%s")
            values.append(value)

        if not fields:
            raise HTTPException(status_code=400, detail="No fields provided to update")

        values.append(emp_id)
        sql = f"UPDATE employees SET {', '.join(fields)} WHERE id=%s"
        cursor.execute(sql, values)
        conn.commit()
        cursor.close()
        conn.close()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Employee not found")
        return {"message": "Employee updated successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
