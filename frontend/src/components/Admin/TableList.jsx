import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useMemo } from "react";

export default function TableList({ rows, headers }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = Math.max(
    0,
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)
  );

  const visibleRows = useMemo(
    () => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, rows]
  );

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <TableHead className="nav-color">
              <TableRow>
                <TableCell
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  {headers.value1}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  {headers.value2}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  {headers.value3}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  {headers.value4}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  {headers.value5}
                </TableCell>
              </TableRow>
            </TableHead>
            {rows?.length > 0 && (
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow key={row.value1} sx={{ width: "100%" }}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: "600",
                        fontSize: { lg: "0.9rem", sm: "0.7rem", xs: "0.75rem" },
                      }}
                    >
                      {row?.value1}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontWeight: "600",
                        fontSize: { lg: "0.9rem", sm: "0.7rem", xs: "0.75rem" },
                      }}
                    >
                      {row?.value2}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontWeight: "600",
                        fontSize: { lg: "0.9rem", sm: "0.7rem", xs: "0.75rem" },
                      }}
                    >
                      {row?.value3}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontWeight: "600",
                        fontSize: { lg: "0.9rem", sm: "0.7rem", xs: "0.75rem" },
                      }}
                    >
                      {row?.value4}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontWeight: "600",
                        fontSize: { lg: "0.9rem", sm: "0.7rem", xs: "0.75rem" },
                      }}
                    >
                      {row?.value5}
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
          {!rows.length>0 && (
            <Box sx={{display: "flex", justifyContent: "center", alignItems:"center"}}>
              <Typography sx={{fontSize: "1.2rem", margin: "2rem 0", fontWeight: "bold", wordSpacing: "5px"}}>No Data Present</Typography>
            </Box>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
