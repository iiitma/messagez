import {useEffect} from 'react';
import ChatList from './components/ChatList';
import SideBar from './components/SideBar';
import StartApp from './engine/StartApp';






function App() {

  useEffect(() => {
    document.querySelector("link[rel~='icon']").href ='https://www.colorhexa.com/606af3.png';
    document.querySelector('meta[name="viewport"]').setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
    document.querySelector('meta[name="theme-color"').setAttribute("content", "#6076f3")
  }, [])

  StartApp();
  return (
    <div className="App">
       <main className="g-0 max-height-vh-100 row vh-100">
        <SideBar/>
        <ChatList/>
      {/* <Conversation/> */}
      {/* <ChatOptions/> */}
        </main>
    </div>
  );
}

export default App;


