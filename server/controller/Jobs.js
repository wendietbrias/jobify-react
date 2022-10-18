const jobModel = require("../db/schema/jobs");

const GetAllJob = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const allJob = await jobModel.find({ userId: { $eq: userId } });
    res.status(200).json(allJob);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const CreateJob = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const { position, company, location, status, jobType } = req.body;

  const created = new jobModel({
    userId,
    position,
    company,
    location,
    status,
    jobType,
  });

  try {
    const saved = await created.save();
    res.status(200).json(saved);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

const DeleteJob = async (req, res) => {
  const { id } = req.params;
  const findJob = await jobModel.findById(id);

  if (!findJob) {
    return res.status(404).json({ msg: `Job with id: ${id} was not found` });
  }

  try {
    const deleted = await jobModel.findByIdAndDelete(id);
    if (deleted) {
      res.status(200).json({ msg: "deleted success" });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const UpdateJob = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const { id } = req.params;

  if (!id) {
    return res.status(402).json({ msg: "no data found" });
  }

  const findData = await jobModel.findById(id);

  if (!findData) {
    return res.status(402).json({ msg: "No post or job found" });
  }

  findData.position = req.body.position;
  findData.status = req.body.status;
  findData.location = req.body.location;
  findData.company = req.body.company;
  findData.jobType = req.body.jobType;

  try {
    const saved = await findData.save();
    return res.status(200).json(saved);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const SearchJob = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const { search, status, jobType } = req.body;

  let query = jobModel.find({ userId: { $eq: userId } });

  if (search && search !== "") {
    query = query.regex(`position`, new RegExp(search, "i"));
  }

  if (status && status !== "") {
    query = query.regex(`status`, new RegExp(status, "i"));
  }

  if (jobType && jobType !== "") {
    query = query.regex(`jobType`, new RegExp(jobType, "i"));
  }

  try {
    const searched = await query.exec();
    return res.status(200).json(searched);
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

module.exports = { GetAllJob, CreateJob, DeleteJob, UpdateJob, SearchJob };
