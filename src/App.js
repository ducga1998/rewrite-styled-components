import React from "react";

import styled from "./styled-components";
import { ThemeProvider } from "./styled-components";
const theme = {
  maudo: "red",
  backgroundWrapper : "red"
};
function App() {
  const ref  = React.useRef()
  const [isCenter, setCenter] = React.useState(false);
  React.useEffect(() => {
    console.log("run good ",ref.current)
  },[])
  return (
    <>
      <ThemeProvider value={theme}>
        <Wrapper className="App">
       <h1> Component  ThemeProvider</h1>
          <button onClick={() => setCenter(!isCenter)}> center </button>
          <br />
          <ButtonDuc ref={ref} isGray isCenter={isCenter}>
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
  height: 100px;
  background: ${(props) => (props.isGray ? "gray" : "white")};
  color: ${(props) => props.theme.maudo};
  display: flex;
  font-size: 16px;
  font-weight: 600;
  border: 3px dashed black;
  ${(props) =>
    props.isCenter ? `align-items  : center; justify-content : center;` : ""};
`;
const Wrapper = styled.div`
  padding: 30px;
  margin: 20px;
  background: ${props => props.theme.backgroundWrapper ?  props.theme.backgroundWrapper : 'gray' } ;
`;
export default App;
