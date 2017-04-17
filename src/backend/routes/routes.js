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

router.post('/proyectos/:proyecto/milestones', (req, res, next) => {
  const project = req.project
  const milestone = new Milestone(req.body)
  milestone.project = project

  milestone.save()
    .then(savedMilestone => {
      project.milestones.push(savedMilestone)

      project.save()
        .then(savedProject => {
          savedProject.populate('milestones').execPopulate()
            .then(completeProject => res.json(completeProject))
            .catch(next)})
        .catch(next)
  })
})

export default router