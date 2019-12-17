const express = require('express')
const router = express.Router()
const Space = require('../models/Spaces.model')




router.get('/getAllSpaces', (req, res) => {
  Space.find()
    .then(allSpaces => res.json(allSpaces))
    .catch(err => console.log('DB error', err))

})

router.get('/:id', (req, res) => {
  const spacesId = req.params.id
  Space.findById(spacesId)
    .then(theSpaces => res.json(theSpaces))
    .catch(err => console.log('DB error', err))
})


router.post('/newSpace', (req, res) => {
  const space = req.body
  Space.create(space)
    .then(theNewSpace => res.json(theNewSpace))
    .catch(err => console.log('DB error', err))
})

router.post('/edit', (req, res) => {
    const {
      nameSpace,
      place,
      rating,
      capacityPlace,
      description,
      town
    } = req.body.space
  Space.findByIdAndUpdate(req.body.spaceId, { /*elementos del model*/ }, { new: true })
        .then(space => {res.json(space)})
        .catch(err => console.log('error!!', err))
})
router.get("/delete/:id", (req, res) => {
  Space.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'delete ok' }))
        .catch(err => console.log(err));
});

module.exports = router