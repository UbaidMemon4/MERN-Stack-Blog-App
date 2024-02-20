import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../../component/BlogCard/blogCard";
import "./cssForWave.css";
import { BASE_URL } from "../../constent/index";

const UserBlog = () => {
  const [blogs, setblog] = useState([]);

  //get user blog
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/blog/user-blog/${id}`
      );
      if (data?.success) {
        setblog(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => {
          return (
            <div>
              <BlogCard
                titel={blog.titel}
                description={blog.description}
                image={blog.image}
                username={blog.user.username}
                createdAt={blog.createdAt}
                id={blog._id}
                isUser={true}
              />
            </div>
          );
        })
      ) : (
        <div
          style={{
            height: "100%",
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            class="parent-div"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1> You Haven't Created Blog</h1>
            <div class="ocean">
              <div class="wave"></div>
              <div class="wave"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBlog;
