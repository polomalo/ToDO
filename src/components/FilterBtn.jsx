import { ButtonGroup, Button } from "@mui/material";

const FilterBtn = ({ handleFilterTasks }) => {
    return (
        <>
            <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button key="allTasks" onClick={() => handleFilterTasks("allTasks")}>Все</Button>
                <Button key="activeTasks" onClick={() => handleFilterTasks("activeTasks")}>Активные</Button>
                <Button key="doneTasks" onClick={() => handleFilterTasks("doneTasks")}>Готовые</Button>
            </ButtonGroup>
        </>
    );
};

export default FilterBtn;