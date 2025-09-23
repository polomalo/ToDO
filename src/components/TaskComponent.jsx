import React, { useState } from "react";
import { Grid, Checkbox, TextField, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

const TaskComponent = ({ task, deleteTask, checkTask, editTask }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTextTask, setEditTextTask] = useState(task.title);
  const [error, setError] = useState("")
  const handleEditTask = () => {
    if (editTextTask !== "") {
      editTask(task.id, editTextTask);
      setIsEdit(false);
      setError("");
    } else {
      setError("Необходимо заполнить");
    }
  };
  const handleTextChange = (e) => {
    setEditTextTask(e.target.value);
    if (error) setError("");
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={2}>
          <Checkbox
            className="taskCheckBox"
            checked={task.isCompleted}
            onChange={() => checkTask(task.id)}
          />
        </Grid>
        <Grid size={6}>
          {!isEdit ? (
            <p className={`${task.isCompleted ? "checked" : ""} taskTitle `}>
              {task.title}
            </p>
          ) : (
            <Tooltip title={error} open={!!error} placement="top" arrow>
              <TextField
                variant="outlined"
                value={editTextTask}
                onChange={handleTextChange}
                error={!!error}
                size="small"
              />
            </Tooltip>
          )}
        </Grid>
        <Grid container size={4} spacing={1}>
          <Grid size={6}>
            <IconButton
              className="taskBtn"
              size="small"
              onClick={
                !isEdit ? () => setIsEdit((isEdit) => !isEdit) : handleEditTask
              }
            >
              {!isEdit ? <EditIcon size="small" /> : <CheckIcon />}
            </IconButton>
          </Grid>
          <Grid size={6}>
            <IconButton
              className="taskBtn"
              size="small"
              onClick={() => deleteTask(task.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TaskComponent;
