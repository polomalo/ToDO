import { TextField, Stack, Button, Link, Alert } from "@mui/material";
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router"
import { loginUser } from "@redux/slices/authSlice";
import { ROUTES } from "@constants/routes";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm({
    defaultValues: {
        email: "",
        password: ""
    }
  })

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate(ROUTES.TODO); 
    } catch (err) {
      setError("root", { message: err || "Ошибка входа" });
    }
  }

  const handleSignUpClick = (e) => {
    e.preventDefault()
    navigate(ROUTES.SIGNUP)
  }

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <h1>Вход в аккаунт</h1>
              <TextField
                  id="outlined-basic"
                  label="Введите email"
                  variant="outlined"
                  type="email"
                  error={!!errors.email || !!errors.root?.message}
                  helperText={errors.email?.message || errors.root?.message}
                  size="small"
                  {...register("email", {
                      required: "Email обязателен",
                      pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Неверный формат email"
                      }
                  })}
              />
              <TextField
                  id="outlined-basic"
                  label="Введите пароль"
                  variant="outlined"
                  type="password"
                  error={!!errors.password || !!errors.root?.message}
                  helperText={errors.password?.message || errors.root?.message}
                  size="small"
                  {...register("password", {
                      required: "Пароль обязателен",
                      minLength: { value: 6, message: "Минимум 6 символов" }
                  })}
              />
              <Button variant="contained" type="submit">Войти</Button>
              <Link onClick={handleSignUpClick} style={{cursor: "pointer"}}>Нет аккаунта?</Link>
            </Stack>
            {errors.root && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errors.root.message}
                </Alert>
            )}
        </form>
    </>
  );
};

export default Login;
