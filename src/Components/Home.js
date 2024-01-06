import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Fetch the token from wherever it's stored (localStorage, etc.)
    const token = localStorage.getItem("auth"); // Assuming it's stored in localStorage

    console.log("Token:", token); // Log the token to verify its value

    // Make the GET request with the 'auth' header
    axios
      .get("http://localhost:5000/all", {
        headers: {
          auth: JSON.parse(token),
        },
      })
      .then((response) => {
        let data = response.data.data; // Log the response data
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Log any error that occurs
      });
  }, []); // Empty dependency array means this effect runs once, like componentDidMount

  return (
    <>
      <div>
        <h2>All users</h2>
        {users.map((userDetails) => {
          return (
            <div key={userDetails._id}>
              <span>{userDetails.username}</span>|
              <span>{userDetails.email}</span> | password:
              <span>{userDetails.password}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
