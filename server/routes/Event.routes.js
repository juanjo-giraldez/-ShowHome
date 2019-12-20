const express = require("express");
const router = express.Router();
const Event = require("../models/Events.model");

const upload = require('../configs/cloudinary.config')
 


router.get("/getAllEvents", (req, res) => {
  Event.find()
    .then(allEvents => res.json(allEvents))
    .catch(err => console.log("DB error", err));
});



router.post("/newEvent", (req, res) => {
  const event = req.body;
  Event.create(event)
    .then(theNewEvent => res.json(theNewEvent))
    .catch(err => console.log("DB error", err));
});

router.post("/edit", (req, res) => {
  const {
    participant,
    nameEvent,
    category,
    email,
    town,
    capacityPlace,
    description
  } = req.body.event;
  Event.findByIdAndUpdate(
    req.body.eventID,
    { participant,nameEvent, category, email, town, capacityPlace, description },
    { new: true }
  )
    .then(theNewUpdatedEvent => res.json(theNewUpdatedEvent))
    .catch(err => console.log("error!!", err));
});

router.post("/selectEvent", (req, res) => {
  const userId = req.body.id
  // console.log('----------------------', userId)
  Event.find({participant: {$in: userId}})
    .then(allTheEvents => res.json(allTheEvents))
    .catch(err => console.log("DB error", err));
})
 
router.get("/delete/:id", (req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "delete ok" }))
    .catch(err => console.log(err));
});




router.post("/exitEvent", (req, res) => {
  const {idUser,idEvent} = req.body
  Event.findByIdAndUpdate(idEvent, {$pull: {participant: idUser}})
    .then(exitEvent => res.json(exitEvent))
    .catch(err => console.log(err));
});


router.post("/join", (req, res) => {
  const {idUser, idEvent} = req.body
  Event.findByIdAndUpdate(idEvent, {$push: {participant: idUser}})
    .then(newJoin => res.json(newJoin))
    .catch(err => console.log(err));
});


router.get("/:id", (req, res) => {
  const eventsId = req.params.id;
  Event.findById(eventsId)
    .then(theEvents => res.json(theEvents))
    .catch(err => console.log("DB error", err));
});

router.post("/fileUpload", upload.single("imgUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({
    secure_url: req.file.secure_url
  });
});



module.exports = router;
