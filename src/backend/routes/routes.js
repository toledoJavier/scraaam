import express from 'express'

import Project from '../models/Project.js'
import Milestone from '../models/Milestone.js'
import Epic from '../models/Epic.js'
import Comment from '../models/Comment.js'
import Task from '../models/Task.js'

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
        throw new Error(`Milestone no encontrada ${value}`)
      }
      req.milestone = milestone
      next()
    })
    .catch(next)
})

router.get('/milestones/:milestone', (req, res, next) => {
  req.milestone.populate('epics').execPopulate()
    .then(completeMilestone => res.json(completeMilestone))
    .catch(next)
})

router.post('/milestones/:milestone/epics', (req, res, next) => {
  const milestone = req.milestone
  const epic = new Epic(req.body)
  epic.milestone = milestone
  
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

router.param('epic', (req, res, next, value) => {
  Epic.findById(value)
    .then(epic => {
      if (! epic ) {
        throw new Error(`Epic no encontrado ${value}`)
      }
      req.epic = epic
      next()
    })
    .catch(next)
})

router.get('/epics/:epic', (req, res, next) => {
  
  req.epic.populate('tasks').populate('comments').execPopulate()
    .then(completeEpic => res.json(completeEpic))
    .catch(next)
})

router.post('/epics/:epic/comments', (req, res, next) => {
  const epic = req.epic
  const comment = new Comment(req.body)
  comment.epic = epic
  
  comment.save()
    .then(savedComment => {
      epic.comments.push(savedComment)

      epic.save()
        .then(savedEpic => {
          savedEpic.populate('tasks').populate('comments').execPopulate()
            .then(completeEpic => res.json(completeEpic))
            .catch(next)})
        .catch(next)
  })
})

router.post('/epics/:epic/tasks', (req, res, next) => {
  const epic = req.epic
  const task = new Task(req.body)
  task.epic = epic
  
  task.save()
    .then(savedTask => {
      epic.tasks.push(savedTask)

      epic.save()
        .then(savedEpic => {
          savedEpic.populate('tasks').populate('comments').execPopulate()
            .then(completeEpic => res.json(completeEpic))
            .catch(next)})
        .catch(next)
  })
})

export default router