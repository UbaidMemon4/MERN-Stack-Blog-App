const { default: mongoose } = require("mongoose");
const blogModal = require("../Modal/blogModal");
const UserModal = require("../Modal/userModal");

//Get All blogs
exports.getAllBlogsContoller = async (req, res) => {
  try {
    const blogs = await blogModal.find({}).populate("user");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "blog not found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "all blog list",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting All Blogs",
      error,
    });
  }
};

//Create blog
exports.createBlogContoller = async (req, res) => {
  try {
    const { titel, description, image, user } = req.body;
    //vallidation
    if (!titel || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const existingUser = await UserModal.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }
    const newBlog = new blogModal({ titel, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    session.commitTransaction();

    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created Sucessful",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Creating Blogs",
      error,
    });
  }
};
//Single blog
exports.getBlogByIdContoller = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModal.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog Not Found In This Id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch Single Blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Getting Single Blog",
      error,
    });
  }
};

//Update blog
exports.updateBlogContoller = async (req, res) => {
  try {
    const { id } = req.params;
    // const { titel, description, image } = req.body;
    const blog = await blogModal.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog Updated Suuceesful",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Updating Blog",
      error,
    });
  }
};

//Delete blog
exports.deleteBlogContoller = async (req, res) => {
  try {
    const blog = await blogModal.findByIdAndDelete(req.params.id);
    // .populate("user");
    // console.log("blogUser=>", blog);
    // const blogUser = await blog.populate("user");
    // await blog.user.pull(blog);
    // await blog.user.save();

    return res.status(200).send({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Delete Blog",
      error,
    });
  }
};

// Get User Blog

exports.userBlogContoller = async (req, res) => {
  try {
    const userBlog = await UserModal.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      res.status(404).send({
        success: false,
        message: "Blog not Found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User Blog",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in User Blog ",
      error,
    });
  }
};
