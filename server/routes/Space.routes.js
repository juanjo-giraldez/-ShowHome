const express = require('express')
const router = express.Router()
const Space = require('../models/Spaces.model')
const upload = require('../configs/cloudinary.config')



router.get('/getAllSpaces', (req, res) => {
  Space.find()
    .then(allSpaces => res.json(allSpaces))
    .catch(err => console.log('DB error', err))

})

router.post('/newSpace', (req, res) => {
  const space = req.body
  Space.create(space)
    .then(theNewSpace => res.json(theNewSpace))
    .catch(err => console.log('DB error', err))
})

router.post("/edit", (req, res) => {
    const {
      hostedEvent,
      nameSpace,
      place,
      rating,
      surface,
      capacityPlace,
      description,
      town
    } = req.body.space
  Space.findByIdAndUpdate(req.body.spaceID, { hostedEvent, nameSpace, place, rating, surface, capacityPlace, description, town}, { new: true })
    .then(theNewUpdatedSpace => res.json(theNewUpdatedSpace))
        .catch(err => console.log('error!!', err))
})

router.get("/delete/:id", (req, res) => {
  Space.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'delete ok' }))
        .catch(err => console.log(err));
});

router.get("/:id", (req, res) => {
  const spacesId = req.params.id
  Space.findById(spacesId)
    .then(theSpaces => res.json(theSpaces))
    .catch(err => console.log('DB error', err))
})

router.post("/fileUpload", upload.single("imgUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({
    secure_url: req.file.secure_url
  });
});

module.exports = router