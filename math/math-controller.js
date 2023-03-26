const MathController = (app) => {
  const add = (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.send((a + b).toString());
  };

  const subtract = (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.send((a - b).toString());
  };

  app.get("/add/:a/:b", add);
  app.get("/subtract/:a/:b", subtract);

  app.get("/multiply/:a/:b", (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.send((a * b).toString());
  });

  app.get("/divide/:a/:b", (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.send((a / b).toString());
  });
};

export default MathController;
