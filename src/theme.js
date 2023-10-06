import {createTheme} from "@mui/material";

export const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        height: '40px',
                        boxShadow: 'none',
                        textTransform: 'none',
                        backgroundColor: '#909196',
                        borderRadius: '4px',
                    }
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        paddingTop: 0,
                        paddingBottom: 0,
                    }
                }
            }
        }
    }
});
