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
interface Column {
  id: "name" | "code" | "population" | "actions";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "POSTS" },
  { id: "code", label: "ID" },
  
  { id: "actions", label: "Actions" },
];





function CustomPaginationActionsTable(props:any) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows:any[]= props.rows
//   const rows = [
    
//   ].sort((a, b) => (a < b ? -1 : 1));

  // Avoid a layout jump when reaching the last page with empty rows.
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

  const deleteById = (id:number)=>{
    props.deleteById(id)
  }




  return (
    <TableContainer sx={{ maxHeight: 700 }} component={Paper}>
      <Table
        stickyHeader
        sx={{ minWidth: 500 }}
        aria-label="custom pagination table"
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column.id}>{column.label}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0&& rows!=undefined && rows.length>0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row:any) => (
            <TableRow key={row.id}>
              <TableCell sx={{ maxWidth: 500 }}  component="th" scope="row">
                <h5>{row.title.toUpperCase()}</h5>
                <p>{row.body}</p>
                
              </TableCell>
              <TableCell >{row.id}</TableCell>
              
              <TableCell >
              <Stack direction="row" spacing={1}>
                <IconButton 
                onClick={()=>deleteById(row.id)}    
                aria-label="delete">
                  <DeleteIcon color="error" />
                </IconButton>
                <IconButton aria-label="delete">
                  <EditIcon color='success' />
                </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
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
    </TableContainer>
  );
}
export default CustomPaginationActionsTable;
