import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
 
function CreateUser() {
 
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
 
    const navigate = useNavigate()
 
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/create', {name, email, age})
        .then(res => {
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err))
    }
 
  return (
    <div className="d-flex vh-100  justify-content-center align-items-center">
      <div className="w-50 shadow-lg p-3 mb-5 rounded">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="">ID</label>
            <input
              type="text"
              placeholder="Enter ID"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="text"
              placeholder="Enter Age"
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button className="btn btn-warning">Submit</button>
        </form>
      </div>
    </div>
  );
}
 
export default CreateUser;