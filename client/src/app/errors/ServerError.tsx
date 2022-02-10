import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";

export default function ServerError() {
    const history = useHistory();
    const location = useLocation();
    console.log(location);
    return (
        <Container component={Paper}>
            {location.state?.error ? (
                <>
                
                <Typography variant="h5" gutterBottom>Server error123</Typography>
                <Divider />
                <Typography>{location.error.detail || 'Internal server error'}</Typography>
                </>
            ) : (
                <Typography variant="h5" gutterBottom>Server error11</Typography>
            )}
            <Button onClick={() => history.push('/catalog')}>Go back to catalog</Button>
            
        </Container>
    )
}