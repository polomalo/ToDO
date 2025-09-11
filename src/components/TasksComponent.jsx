import React, { useState } from "react";
import { Grid, ToggleButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TasksComponent = ({ tasks, setTasks }) => {
  const [id, setId] = useState("");
  const handleDelete = (id) => {
    console.log("!!!", id);
  };

  return (
    <>
      <ul>
        {tasks.map(({ id, title }) => (
          <li key={id}>
            <Grid container spacing={2}>
              <Grid size={2}>
                <ToggleButton value="check"></ToggleButton>
              </Grid>
              <Grid size={8}>{title}</Grid>
              <Grid size={2}>
                <ToggleButton onClick={() => handleDelete(id)}>
                  <CloseIcon />
                </ToggleButton>
              </Grid>
            </Grid>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TasksComponent;
