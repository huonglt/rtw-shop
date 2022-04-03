import * as React from 'react';

interface AppContextInterface {
  name: string;
  author: string;
  url: string;
}

export function createCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;

  const defaultUpdate: UpdateType = () => defaultValue;

  const ctx = React.createContext({
    state: defaultValue,
    update: defaultUpdate
  });

  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, update] = React.useState(defaultValue);
    const { children, ...rest } = props;
    return (
      <ctx.Provider value={{ state, update }} {...rest}>
        {children}
      </ctx.Provider>
    );
  }

  return [ctx, Provider] as const;
}

const [ctx, TextProvider] = createCtx('someText');
export const TextContext = ctx;

const Component = () => {
  const { state, update } = React.useContext(TextContext);
  return (
    <label>
      {state}
      <input type="text" onChange={(e) => update(e.target.value)} />
    </label>
  );
};
const App = () => {
  return (
    <TextProvider>
      <Component />
    </TextProvider>
  );
};
/*const AppCtx = React.createContext<AppContextInterface | null>(null);

const sampleAppContext: AppContextInterface = {
  name: 'Using React Context in Typescript app',
  author: 'me',
  url: 'http://www.example.com'
};

const PostInfo = () => {
  const appContext = React.useContext(AppCtx);
  return (
    <div>
      Name: {appContext?.name}, Author: {appContext?.author}, url: ${appContext?.url}
    </div>
  );
};
const App = () => {
  return (
    <AppCtx.Provider value={sampleAppContext}>
      <PostInfo />
    </AppCtx.Provider>
  );
};*/

export default App;
