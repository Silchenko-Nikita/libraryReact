import {useId, useState} from 'react';
import TodoListForm from "./TodoListForm.jsx";

function TodoList() {
    const id = useId()
    const [todos, setTodos] = useState([]);

    return (
        <div>
            <div>
                <h1>Todo List</h1>
                {todos.length > 0 ? (
                    <ul>
                        {todos.map((todo) => (
                            <li key={id}>
                                <strong>{todo}</strong>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No todos.</p>
                )}
            </div>
            <div>
                <TodoListForm todos={ todos } setTodos={ setTodos }/>
            </div>
        </div>
    );
}

export default TodoList;
