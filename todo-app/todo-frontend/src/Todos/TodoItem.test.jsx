import { render, screen } from '@testing-library/react'
import TodoItem from './TodoItem'

test('renders content', () => {
  const todo = {
    text: 'Component testing is done with react-testing-library',
    done: false
  }

  render(<TodoItem todo={todo} deleteTodo={()=>{}} completeTodo={()=>{}} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})