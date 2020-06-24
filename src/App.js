import React from "react";

import styled from "./styled-components";
import { ThemeProvider } from "./styled-components";
const theme = {
  mauden: "red",
  backgroundWrapper : "red"
};
function App() {
  const [isCenter, setCenter] = React.useState(false);
  return (
    <>
    
      <ThemeProvider value={theme}>
  
        <Wrapper className="App">
       <h1> Component  ThemeProvider</h1>
          <button onClick={() => setCenter(!isCenter)}> center </button>
          <br />
          <ButtonDuc isGray isCenter={isCenter}>
            Test Style component
          </ButtonDuc>
          <ButtonDuc> Test Style component</ButtonDuc>
        </Wrapper>
      </ThemeProvider>

      <Wrapper>
        <h1>Component not ThemeProvider</h1>
        <button onClick={() => setCenter(!isCenter)}> center </button>
          <br />
          <ButtonDuc isGray isCenter={isCenter}>
            Test Style component
          </ButtonDuc>
          <ButtonDuc> Test Style component</ButtonDuc>
      </Wrapper>
    </>
  );
}
const ButtonDuc = styled.div`
  height: 200px;
  background: ${(props) => (props.isGray ? "gray" : "white")};
  color: ${(props) => props.theme.mauden};
  display: flex;
  font-size: 16px;
  font-weight: 600;
  border: 3px dashed black;
  ${(props) =>
    props.isCenter ? `align-items  : center; justify-content : center;` : ""};
`;
const Wrapper = styled.div`
  padding: 50px;
  margin: 20px;
  background: ${props => props.theme.backgroundWrapper ?  props.theme.backgroundWrapper : 'gray' } ;
`;
export default App;
