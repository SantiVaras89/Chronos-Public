import { useState } from "react";
import Topbar from "./admin/scenes/global/Topbar";
import Sidebar from "./admin/scenes/global/Sidebar";
import AdminRouter from "./AdminRouter";
import { CssBaseline, ThemeProvider, StyledEngineProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

const token = localStorage.getItem('token'); 
const userToken = JSON.parse(token);
export const employeeId = userToken.employee_id
export const userId = userToken.token

const AdminApp = () => {
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
                    <AdminRouter/>
                </main>
                </div>
            </ThemeProvider>
            </StyledEngineProvider>
        </ColorModeContext.Provider>
    )
}

export default AdminApp