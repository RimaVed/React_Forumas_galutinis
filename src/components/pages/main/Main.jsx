import styled from "styled-components";

const StyledMain = styled.section`
  box-sizing: border-box;
  height: calc(100vh - 200px);
  border: 3px solid black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #e3e3fa81;
  background-blend-mode: overlay;
  background-image: url("https://vegsoc.org/wp-content/uploads/2019/04/people-speech-bubbles.jpg");
  background-size: cover;
  background-position: center;

  > h1 {
    font-size: 3.5rem;
  }
  > p {
    font-size: 1.5rem;
    width: 600px;
  }
`;
const Main = () => {
  return (
    <StyledMain>
      <h1>Welcome to Forum !!!</h1>
      <p>
        Welcome to Our Extraordinary Forum! It's a place to communicate, share
        ideas and build an amazing community together. We believe that everyone
        has something to say, so we invite you to feel free to ask questions,
        share your experiences and engage others in interesting conversations.
      </p>
    </StyledMain>
  );
};
export default Main;
