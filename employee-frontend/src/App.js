import React, { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", position: "", salary: "" });
  const [message, setMessage] = useState("");

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/employees");
      const data = await res.json();
      setEmployees(data.employees || []);
    } catch (err) {
      setMessage("Failed to fetch employees ❌");
      console.error(err);
    }
  };

  // Add employee
  const addEmployee = async () => {
    try {
      await fetch("http://127.0.0.1:8000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ name: "", email: "", position: "", salary: "" });
      setMessage("Employee added successfully ✅");
      fetchEmployees();
    } catch (err) {
      setMessage("Failed to add employee ❌");
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/employees/${id}`, { method: "DELETE" });
      setMessage("Employee deleted successfully ✅");
      fetchEmployees();
    } catch (err) {
      setMessage("Failed to delete employee ❌");
    }
  };

  // Start editing inline
  const startEdit = (emp) => {
    setEditingId(emp.id);
    setForm({ ...emp });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", email: "", position: "", salary: "" });
  };

  // Update employee
  const updateEmployee = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/employees/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setMessage("Employee updated successfully ✅");
      setEditingId(null);
      setForm({ name: "", email: "", position: "", salary: "" });
      fetchEmployees();
    } catch (err) {
      setMessage("Failed to update employee ❌");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Employee Management System</h1>

      {/* Feedback message */}
      {message && <div className="mb-4 p-2 bg-yellow-100 border">{message}</div>}

      {/* Add Employee */}
      {!editingId && (
        <div className="mb-6">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
          <input placeholder="Salary" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />
          <button onClick={addEmployee}>Add Employee</button>
        </div>
      )}

      {/* Employees Table */}
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Position</th><th>Salary</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>
                {editingId === emp.id ? (
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                ) : emp.name}
              </td>
              <td>
                {editingId === emp.id ? (
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                ) : emp.email}
              </td>
              <td>
                {editingId === emp.id ? (
                  <input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
                ) : emp.position}
              </td>
              <td>
                {editingId === emp.id ? (
                  <input value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />
                ) : emp.salary}
              </td>
              <td>
                {editingId === emp.id ? (
                  <>
                    <button onClick={updateEmployee}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(emp)}>Edit</button>
                    <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
