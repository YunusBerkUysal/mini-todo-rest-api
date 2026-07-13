const todos = require('../data/todos');

class TodoRepository {
    findAll() {
        return todos;
    }

    findById(id) {
        return todos.find(todo => String(todo.id) === String(id));
    }

    create(newTodo) {
        todos.push(newTodo);
        return newTodo;
    }

    update(id, updatedData) {
        const index = todos.findIndex(todo => String(todo.id) === String(id));
        
        if (index !== -1) {
            todos[index] = { ...todos[index], ...updatedData };
            return todos[index];
        }
        return null;
    }

    delete(id) {
        const index = todos.findIndex(todo => String(todo.id) === String(id));
        
        if (index !== -1) {
            todos.splice(index, 1);
            return true; 
        }
        return false; 
    }
}

module.exports = new TodoRepository();