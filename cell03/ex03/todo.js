const ftList = document.getElementById('ft_list');

function addTodo(text) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.textContent = text;

    todoDiv.addEventListener('click', () => {
        if (confirm('Do you want to remove this TO DO?')) {
            ftList.removeChild(todoDiv);
            saveTodos();
        }
    });

    ftList.insertBefore(todoDiv, ftList.firstChild);
    saveTodos();
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll('.todo').forEach(todo => {
        todos.push(todo.textContent);
    });
    document.cookie = `todos=${JSON.stringify(todos)};path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

function loadTodos() {
    const cookies = document.cookie.split(';');
    let todosCookie = cookies.find(cookie => cookie.trim().startsWith('todos='));
    if (todosCookie) {
        todosCookie = todosCookie.split('=')[1];
        const todos = JSON.parse(todosCookie);
        todos.forEach(todo => {
            addTodo(todo);
        });
    }
}

document.getElementById('newButton').addEventListener('click', () => {
    const todoText = prompt('Enter a new TO DO:');
    if (todoText && todoText.trim() !== '') {
        addTodo(todoText);
    } else {
        alert('The TO DO cannot be empty.');
    }
});

window.onload = () => {
    loadTodos();
};