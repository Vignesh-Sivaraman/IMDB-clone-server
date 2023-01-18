const db = require("../config/connect.js");

// get All movies

const getAllMovies = (req, res) => {
  const getAllMoviesQ = "SELECT * FROM movies";
  db.query(getAllMoviesQ, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(200).json(data);
    return res.status(200).json({ message: "No Movies found" });
  });
};

//  get movie

const getMovie = (req, res) => {
  const getMovieQ = "SELECT * FROM movies where idmovies = ?";
  db.query(getMovieQ, [req.body.movieId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(200).json(data);
    return res.status(200).json({ message: "No Movie Match found" });
  });
};

// add actor

const addMovie = (req, res) => {
  const { moviename, movieyear, movieposter, movieplot, producerId, actors } =
    req.body;

  const getMovieQ =
    "SELECT * FROM movies where moviename = ? AND movieyear = ?";
  db.query(getMovieQ, [moviename, movieyear], (err, data) => {
    if (err) return err;
    if (data.length > 0) var movieExists = true;
    else var movieExists = false;
    console.log(movieExists);
    if (!movieExists) {
      const addMovieQ =
        "INSERT INTO movies (`moviename`, `movieyear`, `movieposter`, `movieplot`, `movieproducerid`) value(?)";
      const userValues = [
        moviename,
        movieyear,
        movieposter,
        movieplot,
        producerId,
      ];
      db.query(addMovieQ, [userValues], (err, data) => {
        if (err)
          return res.status(500).json({ message: `something wrong ${err}` });
        let movieId = data.insertId;

        console.log(movieId);

        //  adding actors

        actors.forEach((element, i) => {
          console.log("running");
          const relationQ =
            "INSERT INTO movierelations (`actorId`,`movieId`) value(?)";
          console.log(element, movieId);
          let relationValues = [element, movieId];
          db.query(relationQ, [relationValues], (err, data) => {
            if (err)
              return res
                .status(500)
                .json({ message: `something wrong ${err}` });
            if (i === actors.length - 1)
              return res
                .status(200)
                .json({ message: "movie added successfully" });
          });
        });
      });
    } else {
      return res.status(500).json({ message: `movie already exists` });
    }
  });
};

//edit movie

const updateMovie = (req, res) => {
  const updateActorQ =
    "UPDATE movies SET `moviename` =?, `movieyear` =?, `movieposter` =?, `movieplot` =?, `movieproducerid` =?  WHERE idmovies =?";
  db.query(
    updateActorQ,
    [
      req.body.moviename,
      req.body.movieyear,
      req.body.movieposter,
      req.body.movieplot,
      req.body.producerId,
      req.body.movieId,
    ],
    (err, data) => {
      if (err)
        return res.status(500).json({ message: `something wrong ${err}` });
      if (data.affectedRows > 0) {
        // deleting old data

        db.query(
          "DELETE FROM movierelations WHERE movieID = ?",
          [req.body.movieId],
          (err, data) => {
            if (err)
              return res
                .status(500)
                .json({ message: `something wrong ${err}` });

            // updating actors

            req.body.actors.forEach((element, i) => {
              console.log("running");
              const relationQ =
                "INSERT INTO movierelations (`actorId`,`movieId`) value(?)";
              let relationValues = [element, req.body.movieId];
              db.query(relationQ, [relationValues], (err, data) => {
                if (err)
                  return res
                    .status(500)
                    .json({ message: `something wrong ${err}` });
                if (i === req.body.actors.length - 1)
                  return res
                    .status(200)
                    .json({ message: "movie updated successfully" });
              });
            });
          }
        );
      } else {
        return res.status(500).json({ message: "No Movie Match found" });
      }
    }
  );
};

module.exports = {
  getAllMovies,
  getMovie,
  addMovie,
  updateMovie,
};
