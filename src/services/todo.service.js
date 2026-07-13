const TodoRepository = require('../repositories/todo.repository');

class TodoService {
    validateTodoData(data) {
        const errors = [];

        if (!data.title) {
            errors.push("Başlık (title) alanı zorunludur.");
        } else if (data.title.length < 3 || data.title.length > 80) {
            errors.push("Başlık uzunluğu 3 ile 80 karakter arasında olmalıdır.");
        }

        if (data.description && data.description.length > 300) {
            errors.push("Açıklama (description) en fazla 300 karakter olabilir.");
        }

        if (data.priority && !['LOW', 'MEDIUM', 'HIGH'].includes(data.priority)) {
            errors.push("Öncelik (priority) alanı sadece 'LOW', 'MEDIUM' veya 'HIGH' değerlerini alabilir.");
        }

        return errors;
    }

    getAllTodos(filters = {}) {
        let todos = TodoRepository.findAll();

        if (filters.status) {
            const isCompleted = filters.status === 'completed';
            todos = todos.filter(todo => todo.isCompleted === isCompleted);
        }

        if (filters.priority) {
            todos = todos.filter(todo => todo.priority === filters.priority);
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            todos = todos.filter(todo => todo.title.toLowerCase().includes(searchTerm));
        }

        if (filters.sortBy) {
            const order = filters.sortOrder === 'desc' ? -1 : 1;
            
            todos.sort((a, b) => {
                if (filters.sortBy === 'priority') {
                    const priorityValues = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3 };
                    return (priorityValues[a.priority] - priorityValues[b.priority]) * order;
                } else if (filters.sortBy === 'createdAt') {
                    return (new Date(a.createdAt) - new Date(b.createdAt)) * order;
                }
                return 0;
            });
        }

        if (filters.page && filters.limit) {
            const page = parseInt(filters.page, 10);
            const limit = parseInt(filters.limit, 10);
            
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            
            todos = todos.slice(startIndex, endIndex);
        }

        return todos;
    }

    getTodoById(id) {
        const todo = TodoRepository.findById(id);
        if (!todo) {
            throw new Error('NOT_FOUND');
        }
        return todo;
    }

    createTodo(data) {
        const errors = this.validateTodoData(data);
        if (errors.length > 0) {
            throw { message: 'VALIDATION_ERROR', errors }; 
        }

        const newTodo = {
            id: Date.now(),
            title: data.title,
            description: data.description || "",
            isCompleted: false,
            priority: data.priority || "MEDIUM",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        return TodoRepository.create(newTodo);
    }

    updateTodo(id, data) {
        const todo = TodoRepository.findById(id);
        if (!todo) {
            throw new Error('NOT_FOUND');
        }

        data.updatedAt = new Date().toISOString();
        return TodoRepository.update(id, data);
    }

    deleteTodo(id) {
        const isDeleted = TodoRepository.delete(id);
        if (!isDeleted) {
            throw new Error('NOT_FOUND');
        }
        return true;
    }

    toggleTodo(id) {
        const todo = TodoRepository.findById(id);
        if (!todo) {
            throw new Error('NOT_FOUND');
        }

        return TodoRepository.update(id, {
            isCompleted: !todo.isCompleted,
            updatedAt: new Date().toISOString()
        });
    }
}

module.exports = new TodoService();