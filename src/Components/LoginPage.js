import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email.length != 0 && password.length != 0) {
        await axios
          .post("http://localhost:5000/login", {
            email,
            password,
          })
          .then((response) => {
            let verifyMessage = response.data.message;
            if (verifyMessage == "Invalid User") {
              toast.error("Invalid User");
            } else if (verifyMessage == "Invalid Password") {
              toast.error("Invalid Password");
            } else {
              let data = JSON.stringify(response.data.data);
              localStorage.setItem("auth", data);
              toast.success("Sucessfully Login");
              navigate("/home");
            }
          });
      } else {
        toast.error("Fill the inputs detail fields");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = () => {
    navigate("/register");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "100vw",
        height: "500px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h4>Login Page</h4>
        <p>
          Enter Email:
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={email}
          />
        </p>
        <p>
          Enter Password:{" "}
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            defaultValue={password}
          />
        </p>
        <h5 onClick={handleLogin}>click here to Register Page</h5>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
