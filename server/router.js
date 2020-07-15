const router = require('express').Router()
const { Trash } = require("./models/TrashSchema");


//Set up routes


router.post('/trash/', (req, res, next) => {
  //send back error if all product info is not completed
  // if (!req.body.category || !req.body.name || !req.body.price || !req.body.image) {
  //   res.writeHead(404, "Not enough product information");
  //   return res.end();
  // }
  
  let trash = new Trash()

  trash.reporterName = req.body.reporterName
  trash.phoneNumber = req.body.phoneNumber
  trash.email = req.body.email
  trash.trashImage = req.body.trashImage
  trash.trashQuantity = req.body.trashQuantity
  trash.hazardnessLevel = req.body.hazardnessLevel
  trash.longitude = req.body.longitude
  trash.latitude = req.body.latitude

  trash.save((err) => {
    if (err) throw err
  })

  res.send(`Added New Trash by: ${trash.reporterName}`)
});

module.exports = router
