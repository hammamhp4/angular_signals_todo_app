import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoComponent} from '../todo/todo.component';
import {TodosService} from "../../services/todos.service";
import {FilterEnum} from "../../types/filter.enum";
import {TodoInterface} from "../../types/todo.interface";

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [CommonModule, TodoComponent],
})

export class MainComponent {
  todosService = inject(TodosService)
  editingId : string| null = null
  isCompletedAll = computed( ()=>{
    return this.todosService.todosSig().every((todoItem)=> todoItem.isCompleted);
  });

  visibleTodosSig = computed(() => {
    const fullTodosList: TodoInterface[] = this.todosService.todosSig()
    const todosListFilter = this.todosService.filterSig()
    if (todosListFilter === FilterEnum.active) {
      return fullTodosList.filter(todoItem => !todoItem.isCompleted)
    } else if (todosListFilter === FilterEnum.completed) {
      return fullTodosList.filter(todoItem => todoItem.isCompleted)
    } else {
      return fullTodosList
    }
  })
  noTodosClass =  this.todosService.noTodosClass

  setEditingId(id: string | null):void {
    this.editingId = id;
  }
  toggleAllTodos(event:Event):void {
    const target = event.target as HTMLInputElement
    this.todosService.toggleAll(target.checked)
  }
}

