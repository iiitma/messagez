import ChatList from './components/ChatList';
import SideBar from './components/SideBar';
import StartApp from './engine/StartApp';






function App() {
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


