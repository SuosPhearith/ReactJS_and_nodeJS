const customerController = require("../controllers/customer.controller")
const customer = (app) => {
    app.get("/api/customer/getList",customerController.getList)
    app.post("/api/customer/create",customerController.create)
    app.post("/api/customer/login",customerController.login)
    app.put("/api/customer/update",customerController.update)
    app.get("/api/customer/get-cart",customerController.getCart)
    app.delete("/api/customer/delete/:id",customerController.remove)
}


module.exports = customer