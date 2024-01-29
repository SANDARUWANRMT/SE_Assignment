import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
 
function UpdateUser() {
    const {id} = useParams()
    
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    
    useEffect(()=> {
        const fetchData = async() => {
            try {
                const response = await axios.get("http://localhost:3001/get/"+id);
                console.log(response);
                setName(response.data.name)
                setEmail(response.data.email)
                setAge(response.data.age)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])
     
    const navigate = useNavigate()
 
    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/update/'+id, {name, email, age})
        .then(res => {
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err))
    }
 
    return ( 
        <div className="d-flex vh-100  justify-content-center align-items-center">
      <div className="w-50 shadow-lg p-3 mb-5 rounded">
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="text"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button className="btn btn-warning">Update</button>
        </form>
      </div>
    </div>
  );
}
 
export default UpdateUser;