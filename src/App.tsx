import React, { useEffect, useState } from 'react';
import { ButtonGroup, Card, ListGroup, ToggleButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './boonbaan/css/boonbaan.css';
import './App.css';
import TodoItem from './components/Todo';
import TodoForm from './components/TodoForm';
import { Counter } from './features/counter/Counter';

interface Todo {
  id: number,
  todoTask: string,
  isDone: boolean
}

// interface dataFormProps {
//   createCard: () => void
// }

// 1. Explicitly declare the type
var TodoObject: Todo[] = [];

// // 2. Via type assertion
// var arr2 = <Todo[]>[];
// var arr3 = [] as Todo[];

// // 3. Using the Array constructor
// var arr4 = new Array<Todo>();
// let employees: Array<Todo> = [];

function App() {

  // const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState(TodoObject);
  const [filterTodos, setFilterTodos] = useState(TodoObject);
  const [filterValue, setFilterValue] = useState('all');

  useEffect(() => {
    console.log("Mounting ==> ");
    // getFilterTodoList('useEffect');

    return () => console.log("Unmounting <<==");
  }, [todos, filterValue]);

  const radios = [
    { name: 'All', value: 'all', variant: 'outline-primary' },
    { name: 'Active', value: 'active', variant: 'outline-success' },
    { name: 'Inactive', value: 'inactive', variant: 'outline-danger' },
  ];

  enum filterAvailable {
    All = 'all',
    Active = 'active',
    Inactive = 'inactive'
  }

  const addingNewTodo = (newTodoText: string) => {

    let newTodo = {
      id: Date.now(),
      todoTask: newTodoText,
      isDone: false
    };

    let newTodos = [...todos, newTodo];

    setTodos(newTodos);
    // setTodoText('');
  }

  const markTodo = (id: number) => {
    const newTodos = [...todos];

    let index = todos.findIndex(td => td.id === id);

    newTodos[index].isDone = !newTodos[index].isDone;
    setTodos(newTodos);
    // getFilterTodoList('markTodo');
  }

  const removeTodo = (id: number) => {
    const newTodos = todos.filter(td => td.id !== id);
    // newTodos.splice(index, 1);
    setTodos(newTodos);
    // getFilterTodoList('removeTodo');
  }

  const changingFilterTodos = (selectedValue: string) => {
    setFilterValue(selectedValue);
  }

  const getFilterTodoList = (loading: string) => {

    console.log('loading => ' + loading);

    if (filterValue === filterAvailable.All) {

      let todosFiltered = [...todos];
      setFilterTodos(todosFiltered);
    } else if (filterValue === filterAvailable.Active) {

      let todosFiltered = todos.filter(td => td.isDone === false);
      setFilterTodos(todosFiltered);
    } else if (filterValue === filterAvailable.Inactive) {

      let todosFiltered = todos.filter(td => td.isDone === true);
      setFilterTodos(todosFiltered);
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header className="App-header">
          <Counter />
          <hr />
          <h2>REACTJS + TYPESCRIPTS = TODO-APP</h2>
          <br />

          <ButtonGroup className='mr-4'>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={radio.variant}
                name="radio"
                value={radio.value}
                checked={filterValue === radio.value}
                onChange={(e) => changingFilterTodos(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          <hr />
        </header>
        <Card>
          <Card.Body>
            <TodoForm addingNewTodo={addingNewTodo} />
            <ListGroup variant="flush">
              {filterTodos.map((todo, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
                  <TodoItem todoId={todo.id} todoTask={todo.todoTask} isDone={todo.isDone} markTodo={markTodo} removeTodo={removeTodo} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default App;
