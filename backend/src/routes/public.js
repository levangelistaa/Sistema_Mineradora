import express from 'express'
import EquipamentController from '../controllers/EquipamentController.js'

const router = express.Router()

router.get('/equipaments', EquipamentController.list)

router.get('/equipaments/:id', EquipamentController.findById)

router.post('/equipaments', EquipamentController.create)

router.put('/equipaments/:id', EquipamentController.update)

router.delete('/equipaments/:id', EquipamentController.delete)

export default router