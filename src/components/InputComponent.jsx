import React, { useState } from "react";
import { Grid, TextField, Button, FormHelperText } from "@mui/material";
import { useDispatch } from 'react-redux';
import { addNewTask } from "../redux/actions/tasksActions";

const InputComponent = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setText(e.target.value);
    setError("")
  };
  const handleClick = () => {
    if (text !== "") {
      dispatch(addNewTask({ id: crypto.randomUUID(), title: text, isDone: false }))
      setText("");
    } else {
      setError('Нельзя добавить пустую задачу')
    }
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={8}>
          <TextField
            id="outlined-basic"
            label="Введите задачу"
            variant="outlined"
            value={text}
            onChange={handleChange}
            error={!!error}
            size="small"
          />
        </Grid>
        <Grid size={4} sx={{position: 'relative'}}>
          <Button variant="contained" onClick={handleClick} disabled={!!error} sx={{paddingLeft: '10px', paddingRight: '10px', position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
            Добавить
          </Button>
        </Grid>
      </Grid>
      {error && (
        <FormHelperText error sx={{ textAlign: 'center', mt: 1 }}>
          {error}
        </FormHelperText>
      )}
    </>
  );
};

export default InputComponent;
