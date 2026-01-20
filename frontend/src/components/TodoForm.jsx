import { useState } from "react";
import axios from "axios";

// backend api from env
const API = import.meta.env.VITE_API_URL + "/api/todos";

function TodoForm({ fetchTodos }) {
    const [text, setText] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        try {
            await axios.post(API, { text });
            setText("");
            fetchTodos(); // refresh list
        } catch (err) {
            console.error("Error adding todo:", err);
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <input
                type="text"
                placeholder="Add todo"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default TodoForm;
