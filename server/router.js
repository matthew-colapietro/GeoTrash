const router = require('express').Router()
const { Trash } = require("./models/TrashSchema");

//Set up routes

module.exports = function (router) {
  
  router.post('/trash/', (req, res, next) => {
    
    console.log(req.body.submissionDate)
    
    let trash = new Trash()
  
    trash.reporterName = req.body.reporterName
    trash.phoneNumber = req.body.phoneNumber
    trash.email = req.body.email
    trash.trashImage = req.body.trashImage
    trash.trashQuantity = req.body.trashQuantity
    trash.hazardnessLevel = req.body.hazardnessLevel
    trash.longitude = req.body.longitude
    trash.latitude = req.body.latitude
    trash.submissionDate = req.body.submissionDate
    trash.status = req.body.status
  
    trash.save((err) => {
      if (err) throw err
    })
  
    res.send(`Added New Trash by: ${trash.reporterName}, ${trash.submissionDate}`)
  });
  
  router.get('/trash/', (req, res, next) => {
    //variables for trash search parameter setup
    let hazardnessLevel = {};
    let trashQuantity = {};
    let reporterName = {};
    let status = {};
  
    //Applying to the hazardnessLevel variable the value in the request query
    //for use in Trash.find() 
    if (req.query.hazardnessLevel) {
      hazardnessLevel = {hazardnessLevel: req.query.hazardnessLevel}
    }
  
    //Applying to the trashQuantity variable the value in the request query
    //for use in Trash.find() 
    if (req.query.trashQuantity) {
      trashQuantity = {trashQuantity: req.query.trashQuantity}
    }
  
    //Applying to the query variable the value in the request query
    //for use in Product.find() 
    if (req.query.reporterName) {
      reporterName = {"reporterName": { "$regex": req.query.reporterName, "$options": "i"} }
    }

    //Applying to the status variable the value in the request query
    //for use in Product.find() 
    if (req.query.status) {
      status = {status: req.query.status}
    }

    Trash
      .find(hazardnessLevel)
      .find(trashQuantity)
      .find(reporterName)
      .find(status)
      .exec((err, trashes) => {
        if (err) return next(err)
  
        res.send({trashes})
      })
  })
};
