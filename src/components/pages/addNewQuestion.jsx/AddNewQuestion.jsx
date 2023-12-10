import { useFormik } from "formik";

import * as Yup from "yup";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import FormikInput from "../../UI/input/FormikInput";
import QuestionsContext from "../../../contexts/QuestionsContext";
const StyledAddFormPage = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;

    button {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #0056b3;
    }
  }
`;

const AddNewQuestion = () => {
  const { setQuestions, QuestionsActionTypes } = useContext();
  const navigate = useNavigate();
  const values = {
    title: "",
    description: "",
    releaseDate: ""
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(15, "Minimum length 15 symbols")
      .max(30, "Maximum length 30 symbols")
      .required("This field must be filled")
      .trim(),
    description: Yup.string()
      .min(200, "Minimum length 200 symbols")
      .required("This field must be filled")
      .trim(),
    releaseDate: Yup.date()
      .min(new Date(0).toISOString(), "Date must be after 1970-01-01")
      .max(new Date().toISOString(), "Date must be before now")
      .required("This field must be filled")
  });
  const formik = useFormik({
    initialValues: values,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const finalValues = {
        id: uuid(),
        // userId: loggedInUser.id,
        ...values
      };
      setGames({
        type: QuestionsActionTypes.add,
        data: finalValues
      });
      navigate("/questions/questions");
    }
  });

  return (
    <StyledAddFormPage>
      <h1>Add New Question</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormikInput type="text" name="title" formik={formik} />
        <FormikInput type="text" name="description" formik={formik} />
        <FormikInput type="date" name="releaseDate" formik={formik} />
        <button type="Submit">New Game Question</button>
      </form>
    </StyledAddFormPage>
  );
};
export default AddNewQuestion;
