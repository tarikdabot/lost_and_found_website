import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OAthu from "../components/OAthu";
import { clearError, signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";

const Signins = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error: errorMessage } = useSelector((state) => state.user);

  useEffect(() => {
    // Clear the error message when the component is mounted
    dispatch(clearError());
  }, [dispatch]);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Clear the error before making a new request
    dispatch(clearError());

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("http://localhost:4000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="m-8 mx-auto justify-center px-5 py-3 rounded-lg shadow dark:border sm:max-w-md">
      <h1 className="text-xl font-bold text-center mb-3 tracking-tight text-gray-900 md:text-2xl dark:text-white">
      You can sign in with your email and password or with Google.
      </h1>
      <form className="flex flex-col border-gray-400 gap-3" onSubmit={submitHandler}>
        <div>
          <Label value="Your email" />
          <TextInput
            type="text"
            placeholder="your email"
            id="email"
            name="email"
            required
            onChange={changeHandler}
          />
        </div>
        <div>
          <Label value="Password" />
          <TextInput
            type="password"
            placeholder="password"
            id="password"
            name="password"
            required
            onChange={changeHandler}
          />
        </div>
        <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" />
              <span>Loading ...</span>
            </>
          ) : (
            "Login"
          )}
        </Button>
        <OAthu/>
        {errorMessage && (
          <Alert className="mt-4" color="failure">
            {errorMessage}
          </Alert>
        )}
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signins;
