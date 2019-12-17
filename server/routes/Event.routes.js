const express = require('express')
const router = express.Router()
const Event = require('../models/Events.model')




router.get('/getAllEvents', (req, res) => {
  Event.find()
    .then(allEvents => res.json(allEvents))
    .catch(err => console.log('DB error', err))

})

router.get('/:id', (req, res) => {
  const eventsId = req.params.id
  Event.findById(eventsId)
    .then(theEvents => res.json(theEvents))
    .catch(err => console.log('DB error', err))
})


router.post('/newEvent', (req, res) => {
  const event = req.body
  Event.create(event)
    .then(theNewEvent => res.json(theNewEvent))
    .catch(err => console.log('DB error', err))
})

router.post('/edit', (req, res) => {
  const { nameEvent, category, email, town, capacityPlace, description } = req.body.event;
  Event.findByIdAndUpdate(req.body.eventID, { nameEvent, category, email, town, capacityPlace, description}, {new: true})
    .then(theNewUpdatedEvent => res.json(theNewUpdatedEvent))
    .catch(err => console.log('error!!', err))
})
router.get("/delete/:id", (req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'delete ok' }))
    .catch(err => console.log(err));
});

module.exports = router


