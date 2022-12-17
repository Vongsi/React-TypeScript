import Button from "react-bootstrap/esm/Button";

// Define your component props
type TodoProps = {
    todoId: number,
    todoTask: string,
    isDone: boolean,
    markTodo: (todoId: number) => void,
    removeTodo: (todoId: number) => void
}

const TodoItem: React.FC<TodoProps> = ({ todoId, todoTask, isDone, markTodo, removeTodo }) => {

    const handleMarkTodo = (id: number) => {
        markTodo(id);
    }

    const handleRemoveTodo = (id: number) => {
        removeTodo(id);
    }

    return (
        <>
            <div>
                <span style={{ textDecoration: isDone ? "line-through" : "" }}>{todoId} - {todoTask}</span>
            </div>
            <div>
                <Button variant="outline-success" onClick={() => handleMarkTodo(todoId)}>✓</Button>{' '}
                <Button variant="outline-danger" onClick={() => handleRemoveTodo(todoId)}>✕</Button>
            </div>
        </>
    );
}

export default TodoItem;