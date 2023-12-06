import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledTheQuestion = styled.div`
  border: 1px solid #e0e0e0;
  background-color: #ffefd5;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h1 {
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    color: #555;
    margin-bottom: 8px;
  }

  button {
    background-color: #3498db;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2980b9;
    }

    a {
      text-decoration: none;
      color: inherit;
    }
  }
`;

const TheQuestion = ({ data }) => {
  return (
    <StyledTheQuestion>
      <h1>{data.title}</h1>
      <button>
        <Link to={`${data.id}`}>Plačiau</Link>
      </button>
    </StyledTheQuestion>
  );
};
export default TheQuestion;
