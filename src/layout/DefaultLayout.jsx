import { Box } from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box sx={{ width: "90%", margin: "15px auto" }}>{children}</Box>
      <Footer />
    </>
  );
};
export default DefaultLayout;
