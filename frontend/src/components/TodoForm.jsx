import { useState } from "react";
import axios from "axios";

// backend api (same env used in App.jsx)
const API = import.meta.env.VITE_API_URL + "/api/todos";

function TodoForm({ fetchTodos }) {
    const [text, setText] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        try {
            await axios.post(API, { text });
            setText("");
            fetchTodos(); // refresh list from backend
        } catch (err) {
            console.error("Error adding todo:", err);
        }
    };

    return (
        <form className="todo-form" onSubmit={submitHandler}>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add todo"
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default TodoForm;
