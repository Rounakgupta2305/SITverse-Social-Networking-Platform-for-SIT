import Dropzone from 'react-dropzone';
import Userimage from '../components/Userimage';
import WidgetLayout from '../components/WidgetLayout';
import FlexBetween from '../components/Flex';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../toolkit/index';
import {EditOutlined, DeleteOutlined} from "@mui/icons-material";
import { Box, Divider, Typography, InputBase, useTheme, Button, IconButton } from "@mui/material";

const Mypostwidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <WidgetLayout>
      <FlexBetween gap="1.5rem">
        <Userimage image={picturePath} />
        <InputBase placeholder="What's on your mind..." onChange={(e) => setPost(e.target.value)}value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      <Box border={`1px solid ${medium}`} borderRadius="5px" mt="12px" p="1rem">
        <Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false} onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <FlexBetween>
              <Box {...getRootProps()} border={`2px dashed ${palette.primary.main}`} p="1rem" width="100%" sx={{ "&:hover": { cursor: "pointer" } }}>
                <input {...getInputProps()} />
                {!image ? (<p>Add Image Here</p>) : (
                  <FlexBetween>
                    <Typography>{image.name}</Typography>
                    <EditOutlined />
                  </FlexBetween>
                )}
              </Box>
              {image && (
                <IconButton onClick={() => setImage(null)} sx={{ width: "15%" }}>
                  <DeleteOutlined />
                </IconButton>
              )}
            </FlexBetween>
          )}
        </Dropzone>
      </Box>
      <Divider sx={{ margin: "1.13rem 0" }} />
      <FlexBetween>
       
        <Button disabled={!post}  onClick={handlePost}sx={{ color: palette.background.alt,backgroundColor: palette.primary.main, borderRadius: "3rem", }}>
          POST
        </Button>
      </FlexBetween>
    </WidgetLayout>
  )
}

export default Mypostwidget