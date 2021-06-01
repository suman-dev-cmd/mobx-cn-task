import React from 'react'
import logo from './logo.svg';
import './App.css';
import {useLocalStore,useObserver} from 'mobx-react';
const StoreContext = React.createContext();
const StoreProvider = ({children})=>{
  const store = useLocalStore(()=>({
    bugs:["Centipade"],
    addBug: bug=>{
      store.bugs.push(bug);
    },
    get bugsCount(){
      return store.bugs.length;
    }
  }));
  return (<StoreContext.Provider value={store}>{children}</StoreContext.Provider>);
}
const BugHeader =()=>{
  const store = React.useContext(StoreContext);
  return useObserver(()=>(
    <h1>{store.bugsCount} Bugs!</h1>
  ))
}
const BugList =()=>{
  const store = React.useContext(StoreContext);
  return useObserver(()=>(
    <ul>
      {store.bugs.map((item,i)=>(
        <li key={i}>{item}</li>
      ))}
    </ul>
  ));
}
const BugForm =()=>{
  const store = React.useContext(StoreContext);
  console.log()
  const [bug,setBug] = React.useState('');
  const addBugs=e=>{
    store.addBug(bug);
    setBug("");
    e.preventDefault();

  }
  return(
    <form onSubmit={addBugs}>
      <input type="text" value={bug} onChange={e=>setBug(e.target.value)}/>
      <button type="submit">submit</button>
    </form>
  )
}
function App() {
  return (
    <StoreProvider>
      <main>
        <BugHeader />
        <BugForm />
        <BugList />
      </main>
    </StoreProvider>
   
  );
}

export default App;
