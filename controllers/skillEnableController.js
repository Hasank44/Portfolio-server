const { default: mongoose } = require("mongoose");
const Skill = require('../models/Skill');

exports.skillEnable =  async (req, res) => {
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
    const updatedSkill = await Skill.findByIdAndUpdate(
      {_id: id,},
      { isEnable },
      { new: true }
    );

    if (!updatedSkill) {
        return res.status(404).json({
            message: "Skill not found"
        });
    };

    return res.status(202).json({
      message: `Skill ${isEnable ? "Enabled" : "Disabled"} successfully`,
      result: updatedSkill,
    });
  } catch (error) {
        res.status(500).json({
            message: "Failed to update Skill status",
        });
    };
};
