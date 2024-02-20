import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constent/index";
import toast from "react-hot-toast";

export default function BlogCard(blog, i) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-detials/${blog.id}`);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/api/v1/blog/delete-blog/${blog.id}`
      );
      if (data?.success) {
        toast.success("Blog Deleted!");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div key={i}>
      <Card
        sx={{
          width: "40%",
          margin: "10px auto 10px auto",
          padding: "0 15px",
          boxShaddow: "5px 5px 10px #ccc",
          ":hover:": {
            boxShaddow: "10px 10px 20px #ccc",
          },
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {blog.username}
            </Avatar>
          }
          action={
            blog?.isUser && (
              <Box display="flex">
                <IconButton
                  color="info"
                  onClick={handleEdit}
                  sx={{ ml: "auto" }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            )
          }
          title={blog.username}
          subheader={blog.createdAt}
        />
        <CardMedia
          component="img"
          height="194"
          image={blog.image}
          alt="Image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <b>Titel : </b>
            {blog.titel}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Description : </b>
            {blog.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
