import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        height: '40px',
                        boxShadow: 'none',
                        textTransform: 'none',
                        backgroundColor: '#909196',
                        color: 'black',
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
