const TodoService = require('../services/todo.service');

class TodoController {
    getAllTodos(req, res) {
        try {
            const filters = req.query; 
            const todos = TodoService.getAllTodos(filters);
            
            res.status(200).json(todos);
        } catch (error) {
            res.status(500).json({ message: "Sunucu hatası oluştu." });
        }
    }

    getTodoById(req, res) {
        try {
            const id = req.params.id;
            const todo = TodoService.getTodoById(id);
            
            res.status(200).json(todo);
        } catch (error) {
            if (error.message === 'NOT_FOUND') {
                return res.status(404).json({ message: "Belirtilen ID ile eşleşen bir görev bulunamadı." });
            }
            res.status(500).json({ message: "Sunucu hatası oluştu." });
        }
    }

    createTodo(req, res) {
        try {
            const data = req.body;
            const newTodo = TodoService.createTodo(data);
            
            res.status(201).json(newTodo);
        } catch (error) {
            if (error.message === 'VALIDATION_ERROR') {
                return res.status(400).json({ message: "Doğrulama hatası", errors: error.errors });
            }
            res.status(500).json({ message: "Sunucu hatası oluştu." });
        }
    }

    updateTodo(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            const updatedTodo = TodoService.updateTodo(id, data);
            
            res.status(200).json(updatedTodo);
        } catch (error) {
            if (error.message === 'NOT_FOUND') {
                return res.status(404).json({ message: "Güncellenmek istenen görev bulunamadı." });
            }
            res.status(500).json({ message: "Sunucu hatası oluştu." });
        }
    }

    deleteTodo(req, res) {
        try {
            const id = req.params.id;
            TodoService.deleteTodo(id);
            
            res.status(200).json({ message: "Görev başarıyla silindi." });
        } catch (error) {
            if (error.message === 'NOT_FOUND') {
                return res.status(404).json({ message: "Silinmek istenen görev bulunamadı." });
            }
            res.status(500).json({ message: "Sunucu hatası oluştu." });
        }
    }

    toggleTodo(req, res) {
        try {
            const id = req.params.id;
            const updatedTodo = TodoService.toggleTodo(id);
            
            res.status(200).json(updatedTodo);
        } catch (error) {
            if (error.message === 'NOT_FOUND') {
                return res.status(404).json({ message: "İşlem yapılmak istenen görev bulunamadı." });
            }
            res.status(500).json({ message: "Sunucu hatası oluştu." });
        }
    }
}

module.exports = new TodoController();