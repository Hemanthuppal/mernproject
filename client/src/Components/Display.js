import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import EditModal from "./EditModal";

function Display() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/getusers");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      // Fetch the updated user list
      const updatedUsers = await fetch("http://localhost:4000/getusers").then(
        (response) => response.json()
      );
      setUsers(updatedUsers);

      // Clear the form data
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    setEditingUser(userToEdit);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/updateuser/${editingUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingUser),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      // Fetch the updated user list after update
      const updatedUsers = await fetch("http://localhost:4000/getusers").then(
        (response) => response.json()
      );
      setUsers(updatedUsers);

      // Reset the editingUser state to null to hide the edit form
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancelEdit = () => {
    // Reset the editingUser state to null to hide the edit form
    setEditingUser(null);
  };

  const handleEditInputChange = (e) => {
    // Update the editingUser state with the changes
    setEditingUser({
      ...editingUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/deleteuser/${userId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result);
  
      // Fetch the updated user list after deletion
      const updatedUsers = await fetch("http://localhost:4000/getusers").then(
        (response) => response.json()
      );
      setUsers(updatedUsers);
  
      // Display success alert
      window.alert("Data has been successfully deleted!");
    } catch (error) {
      console.error("Error deleting user:", error.message);
  
      // Display error alert
      window.alert("Error deleting user. Please try again.");
    }
  };
  
  return (
    <div>
      <center>
        <div className="w-50 vh-100 mt-5">
          <div className="row">
            <h2>Data</h2>
            <div className="col-12 d-flex justify-content-end">
              <Link to="/">
                <button className="btn btn-success mb-4" type="submit">
                  Add User +
                </button>
              </Link>
            </div>
          </div>
          <EditModal
            show={showModal}
            handleClose={handleCloseModal}
            handleUpdate={handleUpdate}
            editingUser={editingUser}
            handleEditInputChange={handleEditInputChange}
          />

          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    {/* Edit button */}
                    <button className="btn btn-primary" onClick={() => handleEdit(user._id)}>Edit</button>
                    {/* Delete button */}&nbsp;
                    <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </center>
    </div>
  );
}

export default Display;
