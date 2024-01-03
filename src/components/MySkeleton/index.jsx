import { Grid, Skeleton } from "@mui/material";
import Spinner from "../Spinner";

const MySkeleton = () => {
  return (
    <>
      <Spinner />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rectangular" width="100%" height={250} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rectangular" width="100%" height={250} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rectangular" width="100%" height={250} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rectangular" width="100%" height={250} />
        </Grid>
      </Grid>
    </>
  );
};

export default MySkeleton;
