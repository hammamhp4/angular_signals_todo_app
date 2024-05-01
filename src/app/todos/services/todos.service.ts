import {computed, Injectable, signal} from '@angular/core';
import {TodoInterface} from '../types/todo.interface';
import {FilterEnum} from '../types/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todosSig = signal<TodoInterface[]>([])
  filterSig = signal<FilterEnum>(FilterEnum.all)

  addTodo(totoItemText: string): void {
    const totoItem: TodoInterface = {
      text: totoItemText,
      isCompleted: false,
      id: Math.random().toString(16)
    }
    this.todosSig.update((oldTodos) => [...oldTodos, totoItem])
  }

  removeTodo(todoId: string): void {
    this.todosSig.update((oldTodos) => oldTodos.filter(todo => todo.id != todoId))
  }

  updateTodo(id: string, text: string): void {
    this.todosSig.update((oldTodos) => oldTodos.map((todoItem) => {
      if (todoItem.id == id) {
        return {...todoItem, text}
      } else {
        return todoItem
      }
    }))
  }

  setFilter(filterName: FilterEnum): void {
    this.filterSig.set(filterName)
  }

  toggleTodo(id: string): void {
    this.todosSig.update((oldTodos) => oldTodos.map((todoItem) => {
      if (todoItem.id == id) {
        return {...todoItem, isCompleted: !todoItem.isCompleted}
      } else {
        return todoItem
      }
    }))
  }

  noTodosClass = computed(()=> {
    return this.todosSig().length == 0;
  })
  toggleAll(isCompleted: boolean): void {
    this.todosSig.update((oldTodos) => oldTodos.map(todoItem => ({
        ...todoItem,
        isCompleted
      })
    ))
  }
}
