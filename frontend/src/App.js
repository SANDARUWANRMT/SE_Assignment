import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import CreateUser from './components/Main/createUser'
import UpdateUser from './components/Main/updateUser'

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
        <Route path='/create' element={<CreateUser />}></Route>
        <Route path='/edit/:id' element={<UpdateUser />}></Route>
		</Routes>
	);
}

export default App;
