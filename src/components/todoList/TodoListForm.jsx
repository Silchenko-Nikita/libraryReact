import styles from './TodoListForm.module.css';
import {useState} from "react"; // Importing CSS Module

function TodoListForm({todos, setTodos}) {
    const [todo, setTodo] = useState("");

    return (
        <form onSubmit={event => {event.preventDefault(); setTodos([... todos, todo])}} className={styles.bookForm}>
            <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Todo</label>
                <input
                    type="text"
                    id="todoInput"
                    value={todo}
                    onChange={event => {setTodo(event.target.value)}}
                    className={styles.input}
                    placeholder="Enter todo"
                    required
                />
            </div>
            <button type="submit" className={styles.submitBtn}>Add Todo</button>
        </form>
    );
}

export default TodoListForm;
