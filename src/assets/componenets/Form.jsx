import sideImage from "../../assets/img1.jpg";
import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // Reset the form after successful submission
    reset();
  };

  //console.log(watch("password"));
  // Watch the "password" and "confirmPsw" fields to trigger validation
  const password = watch("password");
  //const confirmPassword = watch('confirmPsw');
  return (
    <section>
      <div className="register">
        <div className="col-1">
          <h2>Sign in</h2>
          <span>register and enjoy service</span>

          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("username", {
                required: "Username is required",
              })}
              placeholder="username"
            />
            {errors.username && <p>{errors.username.message}</p>}

            <input
              type="tel"
              {...register("mobilenumber", {
                required: "Mobile number is required",
                maxLength: {
                  value: 13, // +994 and 10 digits
                  message: "Invalid mobile number",
                },
                pattern: {
                  value: /^\+994\d{9}$/,
                  message:
                    "Mobile number must start with +994 and have 10 digits",
                },
              })}
              placeholder="mobile number"
            />
            {errors.mobilenumber?.message && (
              <p>{errors.mobilenumber.message}</p>
            )}
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  message:
                    "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character",
                },
              })}
              placeholder="password"
            />
            {errors.password && <p>{errors.password.message}</p>}

            <input
              type="password"
              {...register("confirmPsw", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="confirm password"
            />
            {errors.confirmPsw && <p>{errors.confirmPsw.message}</p>}

            <button className="btn">Sign in</button>
          </form>
        </div>
        <div className="col-2">
          <img src={sideImage} alt="image" />
        </div>
      </div>
    </section>
  );
};

export default Form;
