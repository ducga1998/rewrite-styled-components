import React from 'react';

import styled from './styled-components'
import {ThemeProvider} from './styled-components'
const theme  =  {
  'mauden' : 'red'
}
function App() {
  console.log("ButtonDuc",ButtonDuc)
  return <ThemeProvider value = {theme}>
    <div className="App">
      <header className="App-header">
       <ButtonDuc isGray color ="green">DUc</ButtonDuc>
      </header>
    </div>
  </ThemeProvider>
}
const ButtonDuc = styled.div`
  height : 200px;
  border-radius : 50px;
  background : ${props => props.isGray ? 'gray' : 'white'};
  color  : ${props => props.theme.mauden};
  display : flex;
  justify-content : center;
  align-items  : center;
`

export default App;
