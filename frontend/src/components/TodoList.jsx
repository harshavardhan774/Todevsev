import axios from "axios";

const API = "http://localhost:5000/api/todos";

function TodoList({ todos, fetchTodos }) {
    const toggleTodo = async id => {
        await axios.put(`${API}/${id}`);
        fetchTodos();
    };

    const deleteTodo = async id => {
        await axios.delete(`${API}/${id}`);
        fetchTodos();
    };

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li key={todo.id} className="todo-item">
                    <span
                        className={`todo-text ${todo.completed ? "completed" : ""}`}
                        onClick={() => toggleTodo(todo.id)}
                    >
                        {todo.text}
                    </span>
                    <button
                        className="delete-btn"
                        onClick={() => deleteTodo(todo.id)}
                    >
                        x
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default TodoList;
