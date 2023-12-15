import styled from "styled-components";

const StyledFormikInput = styled.div`
  margin-bottom: 15px;

  label {
    font-size: 16px;
    margin-bottom: 8px;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    width: 95%;
  }
  p {
    color: red;
    margin-top: 5px;
  }
`;

const FormikInput = ({ type, name, formik, placeholder }) => {
  return (
    <StyledFormikInput>
      <label htmlFor={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}:
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder ? placeholder : ""}
      />
      {formik.touched[name] && formik.errors[name] && (
        <p style={{ color: "red" }}>{formik.errors[name]}</p>
      )}
    </StyledFormikInput>
  );
};

export default FormikInput;
