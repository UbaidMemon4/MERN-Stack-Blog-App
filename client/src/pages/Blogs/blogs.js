import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../../component/BlogCard/blogCard";
import "./cssForWave.css";
import { BASE_URL } from "../../constent/index";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const getAllBlog = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/blog/all-blog`);
      if (data?.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlog();
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
            <>
              <BlogCard
                titel={blog?.titel}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                createdAt={blog?.createdAt}
                id={blog?._id}
                isUser={localStorage.getItem("userId") === blog?.user?._id}
              />
            </>
          );
        })
      ) : (
        <div
          style={{
            height: "100%",
            width: "100%",
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
            <h1> There Haven't Blog Avialble </h1>
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

export default Blogs;
