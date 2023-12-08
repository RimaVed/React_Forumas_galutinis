import { Link, NavLink } from "react-router-dom";
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

  > div:last-child {
    display: flex;
    gap: 10px;
    justify-content: flex-end;

    > button {
      background-color: #3498db;
      color: #fff;
      padding: 8px 16px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #2980b9;
      }

      > a {
        text-decoration: none;
        color: inherit;
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
      <div>
        <button>
          <NavLink to="/signin">SignIn</NavLink>
        </button>
        <button>
          <NavLink to="/signup">SignUp</NavLink>
        </button>
      </div>
    </StyledHeader>
  );
};

export default Header;