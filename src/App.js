// import logo from "./logo.svg";
import "./App.css";
import Map from "./Components/Map/Map";
import Styled from "styled-components";
import Header from "./Components/Header/Header";

function App() {
  return (
    <Container className="App">
      <Header />
      <SubContainer>
        <Text>
          <p className="tag-line">
            Let's calculate
            <span style={{ fontWeight: "bold" }}> distance </span>
            from Google maps
          </p>
        </Text>
        <Map className="map" />
      </SubContainer>
    </Container>
  );
}

export default App;

const Container = Styled.div``;
const SubContainer = Styled.div`
background-color: #F4F8FA; 
height : 100vh; 
`;
const Text = Styled.div`

`;
