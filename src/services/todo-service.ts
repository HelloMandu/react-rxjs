import { BehaviorSubject, Observable } from 'rxjs';

export interface TodoProps {
  id: number;
  content: string;
  done: boolean;
}

export class TodoServiceController {
  private nextId = 3;
  private TodoInitData: TodoProps[] = [
    { id: 1, content: 'Learn React', done: false },
    { id: 2, content: 'Learn Angular', done: true },
  ];

  private static _instance: TodoServiceController;

  static getInstance(): TodoServiceController {
    if (!this._instance) {
      this._instance = new TodoServiceController();
    }
    return this._instance;
  }

  private _data$: BehaviorSubject<TodoProps[]> = new BehaviorSubject<
    TodoProps[]
  >(this.TodoInitData);
  readonly todoData$: Observable<TodoProps[]> = this._data$.asObservable();

  addTodo(content: string): void {
    this.TodoInitData = this.TodoInitData.concat({
      content,
      id: this.nextId++,
      done: false,
    });
    this._data$.next(this.TodoInitData);
  }

  deleteTodo(id: number): void {
    this.TodoInitData = this.TodoInitData.filter((v) => v.id !== id);
    this._data$.next(this.TodoInitData);
  }

  toggleTodo(id: number): void {
    this.TodoInitData = this.TodoInitData.map((v) =>
      v.id !== id ? v : { ...v, done: !v.done }
    );
    this._data$.next(this.TodoInitData);
  }

  dispose(): void {
    this._data$.complete();
  }
}

export const TodoService = new TodoServiceController();
