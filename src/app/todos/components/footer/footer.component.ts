import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodosService} from '../../services/todos.service';
import {FilterEnum} from '../../types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FooterComponent {
  filterEnum = FilterEnum
  todosService = inject(TodosService)
  filterSig = this.todosService.filterSig
  activeCount = computed(() => {
    const allTodos = this.todosService.todosSig();
    const activeTodosList = allTodos.filter((todoItem) => !todoItem.isCompleted)
    return activeTodosList.length
  })
  noTodosClass = this.todosService.noTodosClass

  itemsLeftText = computed(() => {
    return `item${this.todosService.todosSig().length !== 1 ? 's' : ''} left`;
  })

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todosService.setFilter(filterName)
  }

}
