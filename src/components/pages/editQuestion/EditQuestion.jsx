import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormikInput from "../../UI/input/FormikInput";
import QuestionsContext from "../../../contexts/QuestionsContext";

const StyledEditFormPage = styled.main`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  button {
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
`;

const EditQuestion = () => {
  const { setQuestions, QuestionsActionTypes } = useContext(QuestionsContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    releaseDate: ""
  });

  useEffect(() => {
    fetch(`http://localhost:8080/questions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.name) {
          navigate("/");
        }
      });
  }, [id, navigate]);
  setFormValues({
    ...data
  });

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "Minimum length 5 symbols")
      .max(20, "Maximum length 20 symbols")
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

  return (
    <StyledEditFormPage>
      <h1>Edit Question</h1>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const finalValues = {
            ...values
          };
          setQuestions({
            type: QuestionsActionTypes.edit,
            id: id,
            data: finalValues
          });
          navigate(`/questions/${id}`);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <FormikInput type="text" name="title" />
            <FormikInput type="text" name="description" />
            <FormikInput type="date" name="releaseDate" />
            <button type="submit">Edit Question</button>
          </form>
        )}
      </Formik>
    </StyledEditFormPage>
  );
};

export default EditQuestion;
