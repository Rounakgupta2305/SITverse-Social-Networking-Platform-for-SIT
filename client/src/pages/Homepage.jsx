import Navbar from '../components/Navbar';
import Userwidget from '../widgets/Userwidget';
import { useSelector } from 'react-redux';
import { Box, useMediaQuery } from "@mui/material";
import Friendwidget from '../widgets/Friendwidget';
import Mypostwidget from '../widgets/Mypostwidget';
import Postswidget from '../widgets/Postswidget';

function Homepage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      {/* Top navbar */}
      <Navbar/>
      {/* Bottom part */}
      <Box width="100%" padding="2rem 6%" display={isNonMobileScreens ? "flex" : "block"} gap="0.5rem" justifyContent="space-between">
        {/* left part */}
        <Box flexBasis={isNonMobileScreens ? "33%" : undefined}>
          <Userwidget userId={_id} picturePath={picturePath} />
          <Friendwidget userId={_id}/>
        </Box>
        {/* right part */}
        <Box flexBasis={isNonMobileScreens ? "63%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"}>
          <Mypostwidget picturePath={picturePath} />
          <Postswidget userId={_id}/>
        </Box>
      </Box>
    </Box>
  )
}

export default Homepage