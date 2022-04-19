import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/user/`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };
    //post data to server
    fetch(`http://localhost:5000/user/`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        const newUser = [...users, data];
        setUsers(newUser);
        console.log(newUser);
        // console.log("Success:", data);
      });
  };
  return (
    <div className="App">
      <h1>my own data{users.length}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="submit" value="Submit" />
      </form>
      {users.map((user) => (
        <li key={user.id}>
          name:{user.name} email:{user.email} Phone:{user.phone}
        </li>
      ))}
    </div>
  );
}

export default App;
