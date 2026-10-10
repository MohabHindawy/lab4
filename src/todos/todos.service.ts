import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  private todos = [];
  private id = 1;

  getAll() {
    return this.todos;
  }

  getOne(id: number) {
    return this.todos.find((todo) => todo.id === id);
  }

  update(id: number, updateTodo: any) {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      return { message: 'Todo not found' };
    }

    if (updateTodo.title !== undefined) {
      todo.title = updateTodo.title;
    }

    if (updateTodo.done !== undefined) {
      todo.done = updateTodo.done;
    }
    return todo;
  }

  create(todo: any) {
    const newTodo = {
      id: this.id++,
      title: todo.title || 'Untitled',
      done: todo.done || false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  delete(id: number) {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      return { message: 'Todo deleted' };
    }
    return { message: 'Todo not found' };
  }
}
