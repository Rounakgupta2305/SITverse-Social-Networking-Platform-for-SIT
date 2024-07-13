import {LocationOnOutlined} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import Userimage from '../components/Userimage';
import FlexBetween from '../components/Flex';
import WidgetLayout from '../components/WidgetLayout';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import InfoIcon from '@mui/icons-material/Info';
import AddReactionIcon from '@mui/icons-material/AddReaction';
const Userwidget = ({ userId, picturePath }) => {

  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUserInfo = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUserInfo();
  }, [])

  if (!user) {
    return null;
  }
  
  const {firstName, lastName, location, branch, interest, about, viewedProfile, impressions, friends} = user;

  return (
    <WidgetLayout>

      {/* name with photo */}
      <FlexBetween gap="0.5rem" pb="1.1rem" onClick={() => navigate(`/profile/${userId}`)}>
        <FlexBetween gap="1rem">
          <Userimage image={picturePath} />
          <Box>
            <Typography variant="h4" color={dark} fontWeight="500" sx={{ "&:hover": { color: palette.primary.light, cursor: "pointer"}}}>
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Divider />

      {/*location and branch */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <InfoIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{about}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <EngineeringOutlinedIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{branch}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <AddReactionIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{interest}</Typography>
        </Box>
      </Box>

      <Divider />

      {/*viewed count and Impressions */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
          <Typography color={medium}>Have viewed your profile</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
          <Typography color={medium}>Impressions</Typography>
        </Box>
      </Box>
    </WidgetLayout>
  )
}

export default Userwidget 