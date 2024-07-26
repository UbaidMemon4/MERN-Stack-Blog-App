import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../Redux/store";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constent/index";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  //handle input change
  const handleChange
   = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/user/login`, {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authAction.Login());
        toast.success("User Login Sucessfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          borderRadius={5}
        >
          <Typography variant="h4" padding={3} textAlign={"center"}>
            Login
          </Typography>
          <TextField
            value={inputs.email}
            placeholder="Email"
            name="email"
            margin="normal"
            type="email"
            required
            onChange={handleChange}
          />
          <TextField
            value={inputs.password}
            placeholder="Password"
            name="password"
            margin="normal"
            type="password"
            required
            onChange={handleChange}
          />
          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
            to="/login"
          >
            Not A User ? Please Registered
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
