import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TablePaginationActions from "./TablePaginationActions";
import { TableHead } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Column, Row } from "./types/model";
import { UpdatedObject } from "./types/model";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const columns: readonly Column[] = [
  { id: "name", label: "POSTS" },
  { id: "code", label: "ID" },
  { id: "actions", label: "Actions" },
  { id: "update", label: "Created At" }
];

function CustomPaginationActionsTable(props: any) {

  const notify = () => {
    toast.success('Post is updated', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    
  }
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows: Row[] = props.rows;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  }));

  const deleteById = (id: number) => {
    props.deleteById(id);
  };

  const patchById = (id: number, data: UpdatedObject) => {
    
    props.patchById(id, data);
    handleClose();
  };

  const [patchedData, setpatchedData] = useState({} as UpdatedObject);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rowId, setrowId] = useState(0);

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

  return (
    <TableContainer sx={{ maxHeight: 700 }} component={Paper} >
      <Table
        stickyHeader={true}
        sx={{ minWidth: 500}}
        aria-label="custom pagination table"
        
      >
        <TableHead className="tableHead" >
          <TableRow>
            
            {columns.map((column) => (
              <StyledTableCell key={column.id}>{column.label}</StyledTableCell>
            ))}
            
          </TableRow>
          
        </TableHead>
        <TableBody  >
          {(rowsPerPage > 0 && rows !== undefined && rows.length > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row: Row) => (
            <TableRow key={row.id}>
              
              <TableCell sx={{ maxWidth: 700 }} component="th" scope="row">
                <h5>{row.title.toUpperCase()}</h5>
                <p>{row.body}</p>
              </TableCell>
              <TableCell>{row.id}</TableCell>

              <TableCell>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    onClick={() => deleteById(row.id)}
                    aria-label="delete"
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                  <IconButton
                    aria-label="patch"
                    onClick={() => {
                      handleOpen();
                      setrowId(row.id);
                    }}
                  >
                    <EditIcon color="success" />
                  </IconButton>
                </Stack>
              </TableCell>
              <TableCell>{row.date !== undefined && row.date}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="tablefooter" >
          <TableRow >
            <TablePagination
              className="tablerow" 
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Update the post
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
                  setpatchedData({
                    title: e.target.value,
                    body: patchedData.body,
                  })
                }
                multiline
                maxRows={4}
              />

              <TextField
                id="outlined-multiline-static"
                label="Body"
                onChange={(e) =>
                  setpatchedData({
                    title: patchedData.title,
                    body: e.target.value,
                  })
                }
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  patchById(rowId, patchedData);
                  setOpen(false);
                  notify()
                }}
              >
                Save
              </Button>
              
            </div>
          </Box>
        </Box>
      </Modal>
      <ToastContainer />
    </TableContainer>
  );
}
export default CustomPaginationActionsTable;
