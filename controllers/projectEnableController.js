const { default: mongoose } = require("mongoose");
const Project = require('../models/Project');

exports.projectEnable =  async (req, res) => {
    try {
    const { id } = req.params;
    const { isEnable } = req.body;
    if (!isEnable === Boolean) {
        return res.status(400).json({
            message: 'Invalid Value'
        });
    };

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(500).json({
            message: 'Invalid Params Id'
        });
    };  
    const updatedProject = await Project.findByIdAndUpdate(
      {_id: id,},
      { isEnable },
      { new: true }
    );

    if (!updatedProject) {
        return res.status(404).json({
            message: "Project not found"
        });
    };

    return res.status(202).json({
      message: `Project ${isEnable ? "Enabled" : "Disabled"} successfully`,
      project: updatedProject,
    });
  } catch (error) {
        res.status(500).json({
            message: "Failed to update project status",
        });
    };
};

