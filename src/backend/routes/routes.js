import express from 'express'

import Project from '../models/Project.js'

import Milestone from '../models/Milestone.js'

//Import models
//import Example from '../models/example.js'

let router = express.Router()

// Express routes
router.get('/example', (req, res, next) => { })

router.get('/proyectos', (req, res, next) => {
  Project.find()
    .then(proyectos => res.json(proyectos))
    .catch(next)
})

router.param('proyecto', (req, res, next, value) => {
  Project.findById(value)
    .then(project => {
      if (! project ) {
        throw new Error(`Proyecto no encontrada ${value}`)
      }
      req.project = project
      next()
    })
    .catch(next)
})

router.get('/proyectos/:proyecto', (req, res, next) => {
	req.project.populate('milestones').execPopulate()
		.then(completeProject => res.json(completeProject))
		.catch(next)
})

router.post('/proyectos', (req, res, next) => {
  const proyecto = new Project(req.body)
  proyecto.save()
  .then(proyecto => res.json(proyecto))
  .catch(next)
})

export default router