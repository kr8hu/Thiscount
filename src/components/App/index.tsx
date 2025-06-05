//React
import { useEffect } from "react";

//Redux
import { Provider } from "react-redux";
import { store } from "../../store";

//Context
import { AppProvider } from "../../context/App";

//Onsen UI
import ons from "onsenui";

//Components
import Navigator from "./Navigator";


/**
 * App
 * 
 * @returns 
 */
function App() {
  /**
   * useEffect
   * 
   */
  useEffect(() => {
    ons.ready(() => {
      ons.disableDeviceBackButtonHandler();
    });

  }, []);


  return (
    <Provider store={store}>
      <AppProvider>
        <Navigator />
      </AppProvider>
    </Provider>
  );
}

export default App;
