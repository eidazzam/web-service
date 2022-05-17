const express = require('express')
const router = express.Router()
const {
  suspendUser,
  unsuspendUser,
  createUser,
} = require('../controllers/user')

router.route('/').post(createUser)
router.route('/:id/suspend').post(suspendUser)
router.route('/:id/unsuspend').post(unsuspendUser)

module.exports = router
