import {useEffect} from 'react';
import ChatList from './components/ChatList';
import SideBar from './components/SideBar';
import StartApp from './engine/StartApp';






function App() {

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = 'https://www.colorhexa.com/606af3.png';
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


