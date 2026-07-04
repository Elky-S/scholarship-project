// // import { LayOut } from './form/main';
// // import {Main} from"./l11/Main1";
// // import {Guess}from'./l2/geuss';
// // import { Main } from "./calander/main";
// // import{Clothing}from './l2/Cmain'
// // import {Mdain} from './sign/Dmain';

import "./App.css";
import { Main } from "./project/Main1";
import { Provider } from "react-redux";
import store from "./project/store"; // ודאי שהנתיב לסטור שלך תקין

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
