import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 0 20px;
  border-bottom: 3px solid black;
  height: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  a.active {
    color: green;
  }

  > div {
    display: flex;
    align-items: center;

    > img {
      height: 60px;
    }
    > span {
      font-size: 1.5rem;
    }
  }

  > nav {
    margin-right: auto;
    > ul {
      margin: 0;
      padding: 0;
      list-style-type: none;

      display: flex;
      gap: 10px;

      > li {
        > a {
          font-weight: bold;
          font-size: 1.3rem;
          text-decoration: none;
        }
      }
    }
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <div>
        <img
          src="https://dypdvfcjkqkg2.cloudfront.net/large/3673178-7086.png"
          alt=" forum logo"
        />
        <span>Best Forum Page</span>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/questions">Questions</Link>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;
