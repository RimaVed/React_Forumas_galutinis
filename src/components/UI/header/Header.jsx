import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import UsersContext from "../../../contexts/UsersContext";
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

    .userLink {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: inherit;

      > img {
        height: 40px; /* Pasirinktinai nustatykite nuotraukos aukštį */
      }

      > span {
        font-size: 1.2rem; /* Pasirinktinai nustatykite vardo šrifto dydį */
      }
    }
  }
`;

const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UsersContext);
  const navigate = useNavigate();
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
      {!loggedInUser ? (
        <div>
          <button>
            <NavLink to="/user/login">SignIn</NavLink>
          </button>
          <button>
            <NavLink to="/user/register">SignUp</NavLink>
          </button>
        </div>
      ) : (
        <div>
          <Link to="/user/page" className="userLink">
            <img
              src={loggedInUser.profilePicture}
              alt={loggedInUser.userName} // Atnaujinta - pakeista į loggedInUser.userName
            />
            <span>{loggedInUser.userName}</span>{" "}
            {/* Įdedama vartotojo vardas */}
          </Link>

          <button
            onClick={() => {
              setLoggedInUser("");
              navigate("/");
            }}
          >
            LogOut
          </button>
        </div>
      )}
    </StyledHeader>
  );
};

export default Header;
