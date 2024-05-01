import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import {TodoInterface} from '../../types/todo.interface';
import {CommonModule} from '@angular/common';
import {TodosService} from '../../services/todos.service';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class TodoComponent implements OnInit, OnChanges {
  todoService = inject(TodosService)
  @Input({required: true}) todo!: TodoInterface;
  @Input({required: true}) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter<string | null>();
  @ViewChild('textInput') textInput?: ElementRef
  editingText: string = '';

  setEditingText(newTodoText: Event) {
    const target = newTodoText.target as HTMLInputElement
    this.editingText = target.value;

  }

  changeTodo() {
    this.todoService.updateTodo(this.todo.id, this.editingText)
    this.setEditingId.emit(null)
  }

  setSelectedTodo() {
    this.setEditingId.emit(this.todo.id)
  }

  removeTodo() {
    this.todoService.removeTodo(this.todo.id)
  }

  ngOnInit(): void {
    this.editingText = this.todo.text
  }

  toggleTodo(): void {
    this.todoService.toggleTodo(this.todo.id)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus()
        // this to make sure that after the double click you will directly type teh new value without additional click on the field
      }, 0)
    }
  }

}
