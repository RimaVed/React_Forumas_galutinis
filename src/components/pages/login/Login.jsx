import { useContext, useState } from "react";
import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import UsersContext from "../../../contexts/UsersContext";
import FormikInput from "../../UI/input/FormikInput";

const StyledLoginPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2rem;
    margin: 20px 0;
    color: #333;
  }

  form {
    width: 300px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #3d8b3d;
  }
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;
const Login = () => {
  const navigate = useNavigate();
  const { users, setLoggedInUser } = useContext(UsersContext);
  const [failedToLogin, setFailedToLogin] = useState(false);
  //   const [isBannedError, setIsBannedError] = useState("");

  // 1
  const formValues = {
    email: "",
    password: ""
  };
  // 3
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Field must be a valid email")
      .required("Field must be filled")
      .trim(),
    password: Yup.string().required("Field must be filled").trim()
  });
  let loggedInUser = false;
  //   2
  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //   console.log(values);
      console.log(users);

      const loggedInUser = users.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );
      console.log(loggedInUser);
      if (loggedInUser) {
        setLoggedInUser(loggedInUser);
        navigate("/"); //to Home page
      } else {
        setFailedToLogin(true);
      }
    }
  });

  return (
    <StyledLoginPage>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormikInput
          type="email"
          name="email"
          formik={formik}
          placeholder="Enter your account email"
        />
        <FormikInput
          type="password"
          name="password"
          formik={formik}
          placeholder="Enter your account password"
        />
        <button type="submit">Login</button>
      </form>
      {failedToLogin && <p>No user with such credentials</p>}
    </StyledLoginPage>
  );
};

export default Login;
