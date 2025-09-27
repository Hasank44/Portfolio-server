const { default: mongoose } = require("mongoose");
const Service = require('../models/Service');

exports.serviceEnable =  async (req, res) => {
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
    const updatedService = await Service.findByIdAndUpdate(
      {_id: id,},
      { isEnable },
      { new: true }
    );

    if (!updatedService) {
        return res.status(404).json({
            message: "Service not found"
        });
    };

    return res.status(202).json({
      message: `Service ${isEnable ? "Enabled" : "Disabled"} successfully`,
      result: updatedService,
    });
  } catch (error) {
        res.status(500).json({
            message: "Failed to update Service status",
        });
    };
};
