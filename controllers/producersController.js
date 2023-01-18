const db = require("../config/connect.js");

//  get all producers

const getAllProducers = (req, res) => {
  const getAllProducersQ = "SELECT * FROM producers";
  db.query(getAllProducersQ, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(200).json(data);
    return res.status(200).json({ message: "No Producers found" });
  });
};

//  get producer

const getProducer = (req, res) => {
  const getProducerQ = "SELECT * FROM producers where idproducers = ?";
  db.query(getProducerQ, [req.body.producerId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(200).json(data);
    return res.status(200).json({ message: "No Producer Match found" });
  });
};

// add producer
const addProducer = (req, res) => {
  const { producername, producergender, producerdob, producerbio } = req.body;
  const addProducerQ =
    "INSERT INTO producers (`producername`, `producergender`, `producerdob`, `producerbio`) value(?)";
  const userValues = [producername, producergender, producerdob, producerbio];
  db.query(addProducerQ, [userValues], (err, data) => {
    if (err) return res.status(500).json({ message: `something wrong ${err}` });
    return res.status(200).json({ message: "producer added successfully" });
  });
};

//edit producer

const updateProducer = (req, res) => {
  const updateProducerQ =
    "UPDATE producers SET `producername` =?, `producergender` =?, `producerdob` =?, `producerbio` =? WHERE idproducers =?";
  db.query(
    updateProducerQ,
    [
      req.body.producername,
      req.body.producergender,
      req.body.producerdob,
      req.body.producerbio,
      req.body.producerId,
    ],
    (err, data) => {
      if (err)
        return res.status(500).json({ message: `something wrong ${err}` });
      if (data.affectedRows > 0)
        return res
          .status(200)
          .json({ message: "producer updated successfully" });
      return res.status(500).json({ message: "No Producer Match found" });
    }
  );
};

module.exports = {
  getAllProducers,
  getProducer,
  addProducer,
  updateProducer,
};
