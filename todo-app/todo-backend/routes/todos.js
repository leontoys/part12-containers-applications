const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const {getAsync,setAsync} = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  console.log('reached here POST request')
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  //add count
  const count = await getAsync('added_todos')
  console.log("count",count)
  const newCount = count ? Number(count) + 1 : 1
  console.log("new count",newCount)
  await setAsync('added_todos', newCount)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  console.log("FIND BY ID MIDDLEWARE")
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/*STATISTICS*/
router.get('/statistics', async (req, res) => {
  const count = await getAsync('added_todos')
  console.log("count",count)
  res.json({
    added_todos : Number(count) || 0
  })
})

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo); // done
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  console.log("PUT" ,req.todo,req.body)
  const updatedTodo = await Todo.findByIdAndUpdate(req.todo.id, req.body, {
    new:true
  });
  console.log(updatedTodo)

  res.send(updatedTodo)//done
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
