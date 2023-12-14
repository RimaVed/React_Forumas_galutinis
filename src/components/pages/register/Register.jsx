import { useContext, useState } from "react";
import { useFormik } from "formik";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import UsersContext from "../../../contexts/UsersContext";
import FormikInput from "../../UI/input/FormikInput";

const StyledRegisterPage = styled.main`
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
    width: 600px;
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
    background-color: greenyellow;
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
const Register = () => {
  //1
  const navigate = useNavigate();
  const { users, setUsers, UsersActionTypes, setLoggedInUser } =
    useContext(UsersContext);
  const [failedToRegister, setFailedToRegister] = useState({
    email: "",
    name: ""
  });

  // 2
  const formValues = {
    userName: "",
    email: "",
    password: "",
    passwordRepeat: "",
    age: "",
    profilePicture: ""
  };
  // 3
  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(5, "Username minimum length is 5 symbols")
      .max(20, "Username maximum length is 20 symbols")
      .required("Field must be filled")
      .trim(),
    email: Yup.string()
      .email("Field must be a valid email")
      .required("Field must be filled")
      .trim(),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/,
        "Password must be 5-20 length, contain at least one uppercase, one lowercase, one number and one special symbol"
      )
      .required("Field must be filled")
      .trim(),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Field must be filled")
      .trim(),
    age: Yup.number()
      .moreThan(15, "You must be older than 15 to make an account")
      .required("Field must be filled"),
    profilePicture: Yup.string()
      .url("Field must be a valid URL")
      .required("Field must be filled")
      .trim()
  });

  //   2
  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      if (users.find((user) => user.userName === values.userName)) {
        // console.log('name err');
        setFailedToRegister((prevState) => {
          return {
            ...prevState,
            name: "User with such name already exists"
          };
        });
      } else {
        setFailedToRegister((prevState) => {
          return {
            ...prevState,
            name: ""
          };
        });
      }
      if (users.find((user) => user.email === values.email)) {
        // console.log('email err');
        setFailedToRegister((prevState) => {
          return {
            ...prevState,
            email: "User with such email already exists"
          };
        });
      } else {
        setFailedToRegister((prevState) => {
          return {
            ...prevState,
            email: ""
          };
        });
      }
      //prijungti naują user
      if (
        !users.find((user) => user.userName === values.userName) &&
        !users.find((user) => user.email === values.email)
      ) {
        const workingUser = {
          id: uuid(),
          userName: values.userName,
          email: values.email,
          password: values.password,
          age: values.age,
          registerDate: new Date().toISOString().slice(0, 10),
          profilePicture: values.profilePicture
        };
        setUsers({
          type: UsersActionTypes.add,
          data: workingUser
        });
        setLoggedInUser(workingUser);
        navigate("/");
      }
    }
  });

  return (
    <StyledRegisterPage>
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormikInput
          type="text"
          name="userName"
          formik={formik}
          placeholder="Create a user name..."
        />
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
        <FormikInput
          type="password"
          name="passwordRepeat"
          formik={formik}
          placeholder="Repeat a password"
        />
        <FormikInput
          type="number"
          name="age"
          formik={formik}
          placeholder="Enter your age..."
        />
        <FormikInput
          type="url"
          name="profilePicture"
          formik={formik}
          placeholder="Add your avatar picture URL..."
        />
        <button type="submit">Register</button>
      </form>
      {failedToRegister.name && <p>{failedToRegister.name}</p>}
      {failedToRegister.email && <p>{failedToRegister.email}</p>}
    </StyledRegisterPage>
  );
};

export default Register;
