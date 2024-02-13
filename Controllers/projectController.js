const projects = require("../Models/projectSchema");
//add project logic
exports.addUserProject = async (req, res) => {
  console.log("inside add user project");
  //userid get
  const userId = req.payload;
  //addprojectdetails
  const { title, language, github, link, overview } = req.body;
  // get image
  projectImage = req.file.filename;
  console.log(projectImage);
  // logic of adding project
  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res.status(406).json("Project already registered");
    } else {
      const newProject = new projects({
        title,
        language,
        github,
        link,
        overview,
        projectImage,
        userId,
      });
      await newProject.save(); //save new user to database
      res.status(200).json(newProject);
    }
  } catch {
    res.status(404).json({ message: err.message });
  }
};
//get user project
exports.getUserProject = async (req, res) => {
  const userId = req.payload;
  //api request
  try {
    //get project informationof particular user
    const userProject = await projects.find({ userId });
    console.log(userProject);
    res.status(200).json(userProject); //send response to client
  } catch (err) {
    res.status(401).json(err.err.message);
  }
};
//get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const allProjects = await projects.find();
    console.log(allProjects);
    res.status(200).json(allProjects);
  } catch {
    res.status(401).json(err.err.message);
  }
};
//get home projects
exports.getHomeProjects = async (req, res) => {
  try {
    const homeProjects = await projects.find().limit(3);
    console.log(homeProjects);
    res.status(200).json(homeProjects);
  } catch {
    res.status(401).json(err.err.message);
  }
};
//4 edit project
exports.edituserProjects = async (req, res) => {
  const { title, language, github, link, overview, projectImage } = req.body;
  const uploadImage = req.file ? req.file.filename : projectImage;
  const userId = req.payload;
  const { id } = req.params;
  try {
    //find particular project id in mongo db and add the updated details
    const updateProject = await projects.findByIdAndUpdate(
      { _id: id },
      {
        title,
        language,
        github,
        link,
        overview,
        projectImage: uploadImage,
        userId,
      },
      { new: true }
    );
    //save the updated details
    await updateProject.save();
    //send responseback to client
    res.status(200).json(updateProject);
  } catch (err) {
    res.status(401).json(err);
  }
};
//5 delete projects
exports.deleteProjects = async (req, res) => {
  const { pid } = req.params;
  try {
    const deleteData = await projects.findOneAndDelete({ _id: pid });
    res.status(200).json(deleteData);
  } catch (err) {
    res.status(401).json(err);
  }
};
