const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/todos.json');

class TodoRepository {
    _readData() {
        try {
            const fileContent = fs.readFileSync(dataPath, 'utf8');
            return JSON.parse(fileContent);
        } catch (error) {
            return [];
        }
    }

    _writeData(data) {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
    }

    findAll() {
        return this._readData();
    }

    findById(id) {
        const todos = this._readData();
        return todos.find(todo => String(todo.id) === String(id));
    }

    create(newTodo) {
        const todos = this._readData();
        todos.push(newTodo);
        this._writeData(todos);
        return newTodo;
    }

    update(id, updatedData) {
        const todos = this._readData();
        const index = todos.findIndex(todo => String(todo.id) === String(id));
        
        if (index !== -1) {
            todos[index] = { ...todos[index], ...updatedData };
            this._writeData(todos);
            return todos[index];
        }
        return null;
    }

    delete(id) {
        const todos = this._readData();
        const index = todos.findIndex(todo => String(todo.id) === String(id));
        
        if (index !== -1) {
            todos.splice(index, 1);
            this._writeData(todos);
            return true; 
        }
        return false; 
    }
}

module.exports = new TodoRepository();