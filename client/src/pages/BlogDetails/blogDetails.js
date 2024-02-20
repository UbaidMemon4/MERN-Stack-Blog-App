import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constent/index";

const BlogDetails = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [blog, setBlog] = useState();
  const id = useParams().id;
  //get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/blog/get-blog/${id}`
      );
      if (data?.success) {
        setBlog(data?.blog);
        setInput({
          titel: data?.blog.titel,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogDetail();
  }, [id]);

  //Input Change
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/blog/update-blog/${id}`,
        {
          titel: input.titel,
          description: input.description,
          image: input.image,
          user: id,
        }
      );
      if (data?.success) {
        toast.success("Blog Updated ");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderRadius={10}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection="column"
          width={"50%"}
          marginTop={"2px"}
          padding={1.8}
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            fontWeight={"bold"}
            color={"grey"}
          >
            Create a Post
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Titel
          </InputLabel>
          <TextField
            name="titel"
            value={input.titel}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            description
          </InputLabel>
          <TextField
            name="description"
            value={input.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={input.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="warning" variant="contained">
            Update
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BlogDetails;
