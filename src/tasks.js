let tasks = [
    {
        id: 1,
        title: "Learn CI/CD",
        completed: false
    }
];

export function getTasks() {
    return tasks;
}

export function getTaskById(id) {
    return tasks.find(task => task.id === id);
}

export function createTask(title) {
    const task = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title,
        completed: false
    };

    tasks.push(task);

    return task;
}

export function updateTask(id, title, completed) {
    const task = getTaskById(id);

    if (!task) {
        return null;
    }

    if (title !== undefined) {
        task.title = title;
    }

    if (completed !== undefined) {
        task.completed = completed;
    }

    return task;
}

export function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return false;
    }

    tasks.splice(index, 1);

    return true;
}