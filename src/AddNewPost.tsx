import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { useState } from "react";
import { UpdatedObject } from "./types/model";
import { AddNewPostProps } from "./types/model";
import AddIcon from '@mui/icons-material/Add';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AddNewPost(props: AddNewPostProps) {
  const notify = () => 
  toast.success('Post is added', {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });;
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updatedObject, setupdatedObject] = useState({} as UpdatedObject);
  return (
    <div>
      <Button variant="contained" className="AddBtn" onClick={handleOpen}>
        Add New Post
        <AddIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
       
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Public a new post
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Title"
                onChange={(e) =>
                  setupdatedObject({
                    title: e.target.value,
                    body: updatedObject.body,
                  })
                }
                multiline
                maxRows={4}
              />

              <TextField
                id="outlined-multiline-static"
                label="Body"
                multiline
                rows={4}
                onChange={(e) =>
                  setupdatedObject({
                    title: updatedObject.body,
                    body: e.target.value,
                  })
                }
              />
              
              <Button variant="contained" color="success" onClick={() => {props.addnewpost(updatedObject); setOpen(false); notify()}}>
                Save
              </Button>
              
              
            </div>
          </Box>
        </Box>
      </Modal>
      
      <ToastContainer />
        
      
    </div>
    
  );
}

export default AddNewPost;
