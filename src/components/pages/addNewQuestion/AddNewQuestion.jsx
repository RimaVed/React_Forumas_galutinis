import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormikInput from "../../UI/input/FormikInput";
import QuestionsContext from "../../../contexts/QuestionsContext";
import UsersContext from "../../../contexts/UsersContext";

const StyledAddFormPage = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fef9e7;

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
  const { setQuestions, QuestionsActionTypes } = useContext(QuestionsContext);
  const { loggedInUser } = useContext(UsersContext);
  const navigate = useNavigate();
  const values = {
    title: "",
    description: "",
    releaseDate: new Date().toISOString().split("T")[0]
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "Minimum length 5 symbols")
      .max(30, "Maximum length 30 symbols")
      .required("This field must be filled")
      .trim(),
    description: Yup.string()
      .min(10, "Minimum length 10 symbols")
      .required("This field must be filled")
      .trim()
  });
  const formik = useFormik({
    initialValues: values,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const finalValues = {
        id: uuid(),
        userId: loggedInUser.id,
        ...values
      };
      setQuestions({
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
        <button type="Submit">New Question</button>
      </form>
    </StyledAddFormPage>
  );
};
export default AddNewQuestion;
