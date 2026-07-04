import express from 'express'
import EquipamentController from '../controllers/EquipamentController.js'
import CityController from '../controllers/CityController.js'
import WorkerController from '../controllers/WorkerController.js'
import ServiceWorkController from '../controllers/ServiceWorkController.js'

const router = express.Router()

// ─── Equipaments ─────────────────────────────────────────
router.get('/equipaments', EquipamentController.list)
router.get('/equipaments/:id', EquipamentController.findById)
router.post('/equipaments', EquipamentController.create)
router.put('/equipaments/:id', EquipamentController.update)
router.delete('/equipaments/:id', EquipamentController.delete)

// ─── Cities ──────────────────────────────────────────────
router.get('/cities', CityController.list)
router.get('/cities/:id', CityController.findById)
router.post('/cities', CityController.create)
router.put('/cities/:id', CityController.update)
router.delete('/cities/:id', CityController.delete)

// ─── Workers ─────────────────────────────────────────────
router.get('/workers', WorkerController.list)
router.get('/workers/:cpf', WorkerController.findById)
router.post('/workers', WorkerController.create)
router.put('/workers/:cpf', WorkerController.update)
router.delete('/workers/:cpf', WorkerController.delete)

// ─── Service Works ────────────────────────────────────────
router.get('/service-works', ServiceWorkController.list)
router.get('/service-works/:id', ServiceWorkController.findById)
router.post('/service-works', ServiceWorkController.create)
router.put('/service-works/:id', ServiceWorkController.update)
router.delete('/service-works/:id', ServiceWorkController.delete)

export default router