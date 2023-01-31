import { useState } from "react";
import Topbar from "./user/scenes/global/Topbar";
import Sidebar from "./user/scenes/global/Sidebar";
import UserRouter from "./UserRouter";
import { CssBaseline, ThemeProvider, StyledEngineProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";


const token = localStorage.getItem('token'); 
const userToken = JSON.parse(token);
export const employeeId = userToken.employee_id
export const userId = userToken.token

const UserApp = () => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (
    <ColorModeContext.Provider value={colorMode}>
            <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                <Sidebar isSidebar={isSidebar} />
                <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <UserRouter/>
                </main>
                </div>
            </ThemeProvider>
            </StyledEngineProvider>
        </ColorModeContext.Provider>
    )
}

export default UserApp