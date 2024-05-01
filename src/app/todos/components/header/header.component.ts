import {Component, inject} from '@angular/core';
import {TodosService} from "../../services/todos.service";

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
  standalone: true
})
export class HeaderComponent {
  public text: string = ""
  todosService = inject(TodosService)

  changeText(todoTitle: Event) {
    const target = todoTitle.target as HTMLInputElement
    this.text = target.value;
  }

  addTodo() {
    this.todosService.addTodo(this.text)
    this.text =  ""
  }
}
