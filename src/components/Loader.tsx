import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const Loader = ({ loading }: { loading: boolean }) => {
    return (
        <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loader;