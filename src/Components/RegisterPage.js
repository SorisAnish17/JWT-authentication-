import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log(username);
    console.log(password);
    console.log(email);
    console.log(confirmPassword);
    e.preventDefault();
    try {
      if (
        username.length != 0 &&
        email.length != 0 &&
        password.length != 0 &&
        confirmPassword.length != 0
      ) {
        if (password == confirmPassword) {
          await axios
            .post("http://localhost:5000/create", {
              username,
              email,
              password,
            })
            .then((response) => {
              console.log(response.data.data);
              toast.success("Login Successfully");
              setConfirmPassword("");
              setEmail("");
              setPassword("");
              setUsername("");
              navigate("/");
            });
        } else {
          toast.error("Confirm Password not match");
        }
      } else {
        toast.error("Fill the inputs fields");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = () => {
    navigate("/");
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
        <h4>Register Page</h4>
        <p>
          Enter UserName:
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            defaultValue={username}
          />
        </p>
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
        <p>
          Confirm Password:
          <input
            type="text"
            onChange={(e) => setConfirmPassword(e.target.value)}
            defaultValue={confirmPassword}
          />
        </p>
        <h5 onClick={handleLogin}>click here to Login Page</h5>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterPage;
