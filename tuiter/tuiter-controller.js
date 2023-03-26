import tuits from "./tuits.js";
function TuiterController(app) {
  const findAllTuits = (req, res) => {
    res.json(tuits);
  };
  const findTuitById = (req, res) => {
    const tuitId = req.params.tuitId;
    const tuit = tuits.find((tuit) => tuit._id === tuitId);
    if (tuit) {
      res.json(tuit);
    } else {
      res.sendStatus(404);
    }
  };

  const createTuit = (req, res) => {
    const tuit = { ...req.body, _id: new Date().getTime() + "" };
    tuits.push(tuit);
    res.json(tuit);
  };
  const updateTuit = (req, res) => {
    const tuitId = req.params.tuitId;
    const newTuit = req.body;
    const index = tuits.findIndex((tuit) => tuit._id === tuitId);
    if (index === -1) {
      res.sendStatus(404);
      return;
    }
    tuits[index] = newTuit;
    res.sendStatus(200);
  };
  const deleteTuit = (req, res) => {
    const tuitId = req.params.tuitId;
    const index = tuits.findIndex((tuit) => tuit._id === tuitId);
    if (index === -1) {
      res.sendStatus(404);
      return;
    }
    tuits.splice(index, 1);
    res.sendStatus(200);
  };

  app.get("/tuits", findAllTuits);
  app.get("/tuits/:tuitId", findTuitById);
  app.post("/tuits", createTuit);
  app.put("/tuits/:tuitId", updateTuit);
  app.delete("/tuits/:tuitId", deleteTuit);
}

export default TuiterController;
