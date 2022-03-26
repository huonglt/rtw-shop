declare namespace App {
  interface Action<T = any> {
    type: T;
  }

  export interface AnyAction extends Action {
    [extraProps: string]: any;
  }
}
