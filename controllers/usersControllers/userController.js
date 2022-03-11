const router = require("express").Router()
const UserModel = require("../../models/UserModels")
const { HttpError } = require("../../utils/utils");

//middleware?

router.post("/", async (req, res, next)=>{

  let name = req.body.name.split("").reverse().join("")

  try {
    const user = await UserModel.create({
      name: name,     
      age: req.body.age
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.get("/:id",  async (req, res, next)=>{
  try {
    const result = await UserModel.findById(req.params.id)

    if(!result){
      return next(new HttpError(404, "User not found"))
    }

    res.json(result)

  } catch (error) {
      next(error)
  }
})

module.exports = router