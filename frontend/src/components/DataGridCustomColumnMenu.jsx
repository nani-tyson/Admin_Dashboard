import { GridColumnMenuContainer } from "@mui/x-data-grid";
import { MenuItem } from "@mui/material";

const CustomColumnMenu = (props) => {
    const { hideMenu, currentColumn, open } = props;

    const handleHideColumn = () => {
        console.log(`Hiding column: ${currentColumn.field}`);
        hideMenu();
    };

    const handleFilterColumn = () => {
        console.log(`Filtering column: ${currentColumn.field}`);
        hideMenu();
    };

    return (
        <GridColumnMenuContainer
            hideMenu={hideMenu}
            currentColumn={currentColumn}
            open={open}
        >
            <MenuItem onClick={handleHideColumn}>Hide Column</MenuItem>
            <MenuItem onClick={handleFilterColumn}>Filter Column</MenuItem>
        </GridColumnMenuContainer>
    );
};

export default CustomColumnMenu;