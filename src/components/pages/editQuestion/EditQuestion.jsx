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
    editDate: new Date().toISOString().split("T")[0]
  });

  useEffect(() => {
    fetch(`http://localhost:8080/questions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.name) {
          navigate("/");
        }
        setFormValues({
          ...data
        });
      });
  }, [id]); // Užtikrina, kad useEffect bus paleistas kai keičiasi id

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "Minimum length 5 symbols")
      .max(20, "Maximum length 20 symbols")
      .required("This field must be filled")
      .trim(),
    description: Yup.string()
      .min(20, "Minimum length 20 symbols")
      .required("This field must be filled")
      .trim()
  });

  return (
    <StyledEditFormPage>
      <h1>Edit Question</h1>
      {/*  */}
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          const finalValues = {
            ...values,
            edit: true,
            editDate: new Date().toISOString().slice(0, 10)
          };
          setQuestions({
            type: QuestionsActionTypes.edit,
            id: id,
            data: finalValues
          });

          navigate(`/questions/${id}`, { replace: true });
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <FormikInput type="text" name="title" formik={props} />
            <FormikInput type="text" name="description" formik={props} />
            <button type="submit">Edit Question</button>
          </form>
        )}
      </Formik>
    </StyledEditFormPage>
  );
};

export default EditQuestion;
