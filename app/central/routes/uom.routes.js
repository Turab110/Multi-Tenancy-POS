const controller = require("../controllers/uom.controller");
const { authJwt } = require("../../middleware/index");


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
   // Create a new Note
app.post("/add_uom", [authJwt.verifyToken], controller.create);

// Get all Notes
app.get("/all_uom", [authJwt.verifyToken], controller.findAll);

// Get Note by Id
app.get("/e_uom/:id", [authJwt.verifyToken], controller.findOne);

// Modify existing Note
app.put("/u_uom/:id", [authJwt.verifyToken], controller.update);

// Delete Note by Id
app.delete("/d_uom/:id", [authJwt.verifyToken], controller.delete);
  };