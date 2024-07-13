import {Box,IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery} from "@mui/material";
import {Search, DarkMode, LightMode, Menu, Close} from "@mui/icons-material";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { setMode, setLogout } from "../toolkit";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./Flex";


function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  
  //theme configuration
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      {/* This part will be common. Sitverse will always be visible and serach bar will be visible when it is opened on desktop  */}
      <FlexBetween gap="1.75rem">
        <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)" color="primary" onClick={() => navigate("/home")} sx={{ "&:hover": { color: primaryLight, cursor: "pointer" }, "textWrap": "nowrap" }}>
          SIT Verse
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* if the site is opened on desktop then multiple options will be visible but if not then there will be a menu icon */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? ( <DarkMode sx={{ fontSize: "25px" }} />) : (<LightMode sx={{ color: dark, fontSize: "25px" }} />)}
          </IconButton>
          <FormControl variant="standard" value={fullName}>
            <Select value={fullName} sx={{ backgroundColor: neutralLight, width: "150px", borderRadius: "0.25rem", p: "0.25rem 1rem", "& .MuiSvgIcon-root": { pr: "0.25rem", width: "3rem" }, "& .MuiSelect-select:focus": { backgroundColor: neutralLight } }} input={<InputBase />} >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
        ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu />
        </IconButton>
      )} 

      {/*  mobile navbar */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box position="fixed" right="0" bottom="0" height="100%" zIndex="10" maxWidth="500px" minWidth="300px" backgroundColor={background}>

          {/* convert the menu icon into close icon when the menu options are open */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close />
            </IconButton>
          </Box>

          {/* Menu options same as that of in desktop. */}
          <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
            <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: "25px" }}>
              {theme.palette.mode === "dark" ? (<DarkMode sx={{ fontSize: "25px" }} />):(<LightMode sx={{ color: dark, fontSize: "25px" }} />)}
            </IconButton>
            <FormControl variant="standard" value={fullName}>
              <Select value={fullName} sx={{ backgroundColor: neutralLight, width: "150px", borderRadius: "0.25rem", p: "0.25rem 1rem", "& .MuiSvgIcon-root": { pr: "0.25rem", width: "3rem" }, "& .MuiSelect-select:focus": { backgroundColor: neutralLight } }} input={<InputBase />} >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}

    </FlexBetween>
  );
}

export default Navbar