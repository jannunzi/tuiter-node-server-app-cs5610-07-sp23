import tuits from "./tuits.js";
import * as tuitsDao from "./tuits-dao.js";
function TuiterController(app) {
  const findAllTuits = async (req, res) => {
    const tuits = await tuitsDao.findAllTuits();
    res.json(tuits);
  };
  const findTuitById = async (req, res) => {
    const tuitId = req.params.tuitId;
    // const tuit = tuits.find((tuit) => tuit._id === tuitId);
    const tuit = await tuitsDao.findTuitById(tuitId);
    if (tuit) {
      res.json(tuit);
    } else {
      res.sendStatus(404);
    }
  };

  const createTuit = async (req, res) => {
    // const tuit = { ...req.body, _id: new Date().getTime() + "" };
    // tuits.push(tuit);
    const tuit = await tuitsDao.createTuit(req.body);
    res.json(tuit);
  };
  const updateTuit = async (req, res) => {
    const tuitId = req.params.tuitId;
    // const newTuit = req.body;
    // const index = tuits.findIndex((tuit) => tuit._id === tuitId);
    // if (index === -1) {
    //   res.sendStatus(404);
    //   return;
    // }
    // tuits[index] = newTuit;
    await tuitsDao.updateTuit(tuitId, req.body);
    res.sendStatus(200);
  };
  const deleteTuit = async (req, res) => {
    const tuitId = req.params.tuitId;
    console.log(tuitId);
    await tuitsDao.deleteTuit(tuitId);
    // const index = tuits.findIndex((tuit) => tuit._id === tuitId);
    // console.log(index);
    // if (index === -1) {
    //   res.sendStatus(404);
    //   return;
    // }
    // tuits.splice(index, 1);
    res.sendStatus(200);
  };

  app.get("/tuits", findAllTuits);
  app.get("/tuits/:tuitId", findTuitById);
  app.post("/tuits", createTuit);
  app.put("/tuits/:tuitId", updateTuit);
  app.delete("/tuits/:tuitId", deleteTuit);
}

export default TuiterController;
