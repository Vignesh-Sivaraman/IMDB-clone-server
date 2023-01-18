const db = require("../config/connect.js");

// get All actors

const getAllActors = (req, res) => {
  const getAllActorsQ = "SELECT * FROM actors";
  db.query(getAllActorsQ, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(200).json(data);
    return res.status(200).json({ message: "No Actors found" });
  });
};

//  get actor

const getActor = (req, res) => {
  const getActorQ = "SELECT * FROM actors where idactors = ?";
  db.query(getActorQ, [req.body.actorId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(200).json(data);
    return res.status(200).json({ message: "No Actor Match found" });
  });
};

// add actor
const addActor = (req, res) => {
  const { actorname, actorgender, actordob, actorbio } = req.body;
  const addActorQ =
    "INSERT INTO actors (`actorname`, `actorgender`, `actordob`, `actorbio`) value(?)";
  const userValues = [actorname, actorgender, actordob, actorbio];
  db.query(addActorQ, [userValues], (err, data) => {
    if (err) return res.status(500).json({ message: `something wrong ${err}` });
    return res.status(200).json({ message: "actor added successfully" });
  });
};

//edit actor

const updateActor = (req, res) => {
  const updateActorQ =
    "UPDATE actors SET `actorname` =?, `actorgender` =?, `actordob` =?, `actorbio` =? WHERE idactors =?";
  db.query(
    updateActorQ,
    [
      req.body.actorname,
      req.body.actorgender,
      req.body.actordob,
      req.body.actorbio,
      req.body.actorId,
    ],
    (err, data) => {
      if (err)
        return res.status(500).json({ message: `something wrong ${err}` });
      if (data.affectedRows > 0)
        return res.status(200).json({ message: "actor updated successfully" });
      return res.status(500).json({ message: "No Actor Match found" });
    }
  );
};

module.exports = {
  getAllActors,
  getActor,
  addActor,
  updateActor,
};
