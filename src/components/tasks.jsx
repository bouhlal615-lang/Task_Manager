
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addTask,
    deleteTask,
    toggleStatus
} from "../features/taskSlice";

function Tasks() {
    const [title, setTitle] = useState("");

    const tasks = useSelector(state => state.tasks.tasks);
    const dispatch = useDispatch();

    const handleAdd = () => {
        if (title.trim() !== "") {
            dispatch(addTask({
                id: Date.now(),
                title: title,
                completed: false
            }));

            setTitle("");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h1 className="text-center text-primary mb-4">
                    <i className="bi bi-list-check"></i> Task Manager
                </h1>

                <div className="input-group mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Entrer une tâche..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <button
                        className="btn btn-primary"
                        onClick={handleAdd}
                    >
                        <i className="bi bi-plus-lg"></i> Ajouter
                    </button>
                </div>

                <h4 className="mb-3">Liste des tâches</h4>

                {tasks.length === 0 ? (
                    <div className="alert alert-info">
                        Aucune tâche disponible.
                    </div>
                ) : (
                    tasks.map(task => (
                        <div
                            key={task.id}
                            className="d-flex justify-content-between align-items-center border rounded p-3 mb-2"
                        >
                            <div>
                                <span className={
                                    task.completed
                                    ? "text-decoration-line-through text-secondary"
                                    : ""
                                }>
                                    {task.title}
                                </span>

                                <span className={`badge ms-2 ${
                                    task.completed
                                    ? "bg-success"
                                    : "bg-warning text-dark"
                                }`}>
                                    {task.completed ? "Terminée" : "En cours"}
                                </span>
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-sm btn-success"
                                    onClick={() => dispatch(toggleStatus(task.id))}
                                >
                                    <i className="bi bi-check-lg"></i>
                                </button>

                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => dispatch(deleteTask(task.id))}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Tasks;
