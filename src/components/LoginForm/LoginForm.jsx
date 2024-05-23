import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import { selectIsLoading } from "../../redux/auth/selectors";
import Loader from "../Loader/Loader";

const initialValue = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("Successfully logged in");
      })
      .catch(() => {
        toast.error("Incorrect email or password");
      });
    actions.resetForm();
  };
  return (
    <>
      <Formik initialValues={initialValue} onSubmit={handleSubmit}>
        <Form>
          <label>
            Email
            <Field type="email" name="email" placeholder="Please enter your email" />
          </label>
          <label>
            Password
            <Field type="password" name="password" placeholder="Please enter your password" />
          </label>
          <button type="submit">{isLoading ? <Loader /> : "Log in"}</button>
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
