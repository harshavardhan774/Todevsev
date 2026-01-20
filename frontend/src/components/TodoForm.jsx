import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/todos";

function TodoForm({ fetchTodos }) {
    const [text, setText] = useState("");

    const submitHandler = async e => {
        e.preventDefault();
        if (!text.trim()) return;

        await axios.post(API, { text });
        setText("");
        fetchTodos();
    };

    return (
        <form className="todo-form" onSubmit={submitHandler}>
            <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Add todo"
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default TodoForm;
