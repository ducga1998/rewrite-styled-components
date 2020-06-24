import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from './styled-components'
function App() {
  console.log("ButtonDuc",ButtonDuc)
  return (
    <div className="App">
      <header className="App-header">
       <ButtonDuc >Duc nguyen minh duc</ButtonDuc>
      </header>
    </div>
  );
}

const ButtonDuc = styled.button`
width : 100%;
height : 300px;
`
export default App;
