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
	get(req.project, res, 'milestones', next)
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
  saveParentAndChild(project, 'milestones', milestone, 'milestones', res, next)
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
  get(req.milestone, res, 'epics', next)
})

router.post('/milestones/:milestone/epics', (req, res, next) => {
  const milestone = req.milestone
  const epic = new Epic(req.body)
  epic.milestone = milestone
  saveParentAndChild(milestone, 'epics', epic, 'epics', res, next)
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
  get(req.epic, res, 'tasks comments, next')
})

router.post('/epics/:epic/comments', (req, res, next) => {
  const epic = req.epic
  const comment = new Comment(req.body)
  comment.epic = epic
  saveParentAndChild(epic, 'comments', comment, 'tasks comments', res, next)
})

router.post('/epics/:epic/tasks', (req, res, next) => {
  const epic = req.epic
  const task = new Task(req.body)
  task.epic = epic
  saveParentAndChild(epic, 'tasks', task, 'tasks comments', res, next)
})

function get(object, res, populateProperty, next) {
  object.populate(populateProperty).execPopulate()
    .then(completeObject => res.json(completeObject))
    .catch(next)
}

function saveParentAndChild(parent, parentProperty, child, populateProperty, res, next) {
  child.save()
    .then(savedChild => {
      parent[parentProperty].push(savedChild)

      parent.save()
        .then(savedParent => get(savedParent, res, populateProperty, next))
        .catch(next)
    })
}

export default router