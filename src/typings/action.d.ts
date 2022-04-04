declare namespace App {
  interface Action {
    type: string;
    [otherProps: string]: any;
  }
}
