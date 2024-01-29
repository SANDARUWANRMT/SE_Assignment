import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const {id} = useParams()
     
      const [data, setData] = useState([])
      const navigate = useNavigate()
      
      useEffect(()=> {
        axios.get('http://localhost:3001/')
        .then(res => {
            console.log(res);
          setData(res.data);
        })
        .catch(err => console.log(err));
      }, [])
   
    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteuser/'+id)
        .then(res => {
            console.log(res)
            navigate('/')
        }).catch(err => console.log(err))
    }

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Dashboard</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>

			<div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="shadow-lg p-3 mb-5 rounded bg-white w-50 ">
        <Link to="/create" className="btn btn-warning btn-sm">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
            <th>ID</th>  
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                data.map((user, index) => {
                    return <tr key={index}>
                         <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>
                            <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-success">active</button>
                        </td>
                        <td>
                            <Link to={`/edit/${user._id}`} className="btn btn-sm btn-success me-2">Update</Link>
                            <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
                        </td>
                    </tr>
                })
            }
          </tbody>
        </table>
      </div>
    </div>

		</div>
	);
};

export default Main;
