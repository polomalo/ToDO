import { TextField, Stack, Button, Link, Select, MenuItem, FormControl, InputLabel, FormHelperText, Alert } from "@mui/material";
import { useDispatch } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router"
import { signUpUser } from "@redux/slices/regSlice";
import { ROUTES } from "@constants/routes";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
        username: "",
        email: "",
        password: "",
        gender: "",
        age: ""
    }
  })

  const onSubmit = async (data) => {
    try {
      await dispatch(signUpUser(data)).unwrap();
      navigate(ROUTES.LOGIN); 
    } catch (err) {
        const message = typeof err === 'string' ? err : "Ошибка сервера";
        setError("root", { message });
    }
  }

  const handleSignInClick = (e) => {
    e.preventDefault()
    navigate(ROUTES.LOGIN)
  }

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <h1>Регистрация</h1>
                <TextField
                    id="outlined-basic"
                    label="Имя пользователя"
                    variant="outlined"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    size="small"
                    {...register("username", {
                        required: "Имя пользователя обязательно"
                    })}
                />
                <TextField
                    id="outlined-basic"
                    label="Email"
                    type="email"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    size="small"
                    {...register("email", { 
                        required: "Email обязателен", 
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Неверный формат email"
                    }})}
                />
                <TextField
                    id="outlined-basic"
                    label="Пароль"
                    variant="outlined"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    size="small"
                    {...register("password", { 
                        required: "Пароль обязателен",
                        minLength: { value: 6, message: "Минимум 6 символов" }
                    })}
                />
                <FormControl fullWidth error={!!errors.gender} size="small">
                    <InputLabel id="gender-select-label">Пол</InputLabel>
                    <Controller
                        name="gender"
                        control={control}
                        rules={{ required: "Пол обязателен" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="gender-select-label"
                                id="gender-select"
                                label="Пол"
                                value={field.value ?? ""}
                            >
                                <MenuItem value="">Не выбрано</MenuItem>
                                <MenuItem value="male">Мужской</MenuItem>
                                <MenuItem value="female">Женский</MenuItem>
                            </Select>
                        )}
                    />
                    <FormHelperText>{errors.gender?.message}</FormHelperText>
                </FormControl>
                <TextField
                    id="outlined-basic"
                    label="Возраст"
                    variant="outlined"
                    error={!!errors.age}
                    helperText={errors.age?.message}
                    size="small"
                    {...register("age", { 
                        valueAsNumber: true,
                        required: "Возраст обязателен",
                        min: { value: 1, message: "Возраст должен быть больше 0" },
                        max: { value: 150, message: "Возраст должен быть меньше 150" },
                        validate: {
                            isNumber: (value) => 
                                !isNaN(value) && isFinite(value) || "Должно быть числом",
                            isInteger: (value) => 
                                Number.isInteger(value) || "Должно быть целым числом"
                        }
                    })}
                />
                <Button variant="contained" type="submit">Создать</Button>
                <Link onClick={handleSignInClick} style={{cursor: "pointer"}}>Уже есть аккаунт</Link>
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

export default SignUp;
