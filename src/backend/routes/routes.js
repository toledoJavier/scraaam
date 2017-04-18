import express from 'express'

import Project from '../models/Project.js'
import Milestone from '../models/Milestone.js'
import Epic from '../models/Epic.js'


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

router.param('milestone', (req, res, next, value) => {
  Milestone.findById(value)
    .then(milestone => {
      if (! milestone ) {
        throw new Error(`Proyecto no encontrada ${value}`)
      }
      req.milestone = milestone
      next()
    })
    .catch(next)
})

router.get('/milestones/:milestone', (req, res, next) => {
  req.milestone.populate('epics').execPopulate()
    .then(completeMilestone => {
      console.log(completeMilestone)
      res.json(completeMilestone)})
    .catch(next)
})

router.post('/milestones/:milestone/epics', (req, res, next) => {
  const milestone = req.milestone
  const epic = new Epic(req.body)
  epic.milestone = milestone
  console.log("aca")
  epic.save()
    .then(savedEpic => {
      milestone.epics.push(savedEpic)

      milestone.save()
        .then(savedMilestone => {
          savedMilestone.populate('epics').execPopulate()
            .then(completeMilestone => res.json(completeMilestone))
            .catch(next)})
        .catch(next)
  })
})

export default router