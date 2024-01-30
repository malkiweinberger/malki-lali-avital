import React from 'react';
import './App.scss';
import UserList from './components/User-List/User-List';
import UserDetails from './components/User-Details/User-Details';



function App() {
  const dummyUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
  return (
    <div className="App">
      <h1>React User List App</h1>
      <UserList {...dummyUser} />
   
    </div>
  );
}

export default App;
