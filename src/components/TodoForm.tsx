import { FormEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";

interface Props {
  addingNewTodo: (newTodoText: string) => void
}

const TodoForm: React.FC<Props> = ({ addingNewTodo }) => {

  const [todoText, setTodoText] = useState('');
  const [btnEnabled, setBtnEnabled] = useState(true);

  const submitNewTodo = (e: FormEvent) => {
    e.preventDefault();
    if (!todoText) return;
    addingNewTodo('Great WORK !!! ' + todoText);
    setTodoText('');
    setBtnEnabled(true);
  }

  const textNewTodo = (text: string) => {

    if (text.length > 3) {
      setBtnEnabled(false);
    } else {
      setBtnEnabled(true);
    }

    setTodoText(text);
  }

  return (
    <>
      <Form onSubmit={(e) => submitNewTodo(e)}>
        <div>
          <Form.Group>
            <Form.Label><b>Add Todo</b></Form.Label>
            <Form.Control type="text" className="input" value={todoText} onChange={e => textNewTodo(e.target.value)} placeholder="Add new todo" />
          </Form.Group>
          <div>
            <Button disabled={btnEnabled} type='submit' variant="primary mt-3 mb-3" title='SUBMIT' value='SUBMIT' >CREATE</Button>
          </div>
        </div>
      </Form>
    </>
  );
}

export default TodoForm;