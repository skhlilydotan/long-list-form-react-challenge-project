import {useUsersContext} from "../../../context/usersContext.jsx";
import {Box, CircularProgress} from "@mui/material";

export const UsersListLoading = () => {
    const {loading} = useUsersContext();
    if (!loading) {
        return null;
    }
    return (
        <Box justifyContent='center' textAlign='center'>
            <CircularProgress/>
        </Box>
    )
}
