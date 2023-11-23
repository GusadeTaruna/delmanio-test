import { Box } from "@chakra-ui/react";
import React from "react";
import { useTable, useBlockLayout, useResizeColumns } from "react-table";
import { AutoSizer } from "react-virtualized";
import { VariableSizeGrid as Grid } from "react-window";

const TableList = ({ columns, data }) => {
  const columnWidths = columns.map(() => 150);
  const getColumnWidth = (index) => columnWidths[index];

  const { getTableProps, headerGroups, rows, prepareRow, totalColumnsWidth } =
    useTable(
      {
        columns,
        data,
      },
      useBlockLayout,
      useResizeColumns
    );

  const renderCell = ({ columnIndex, rowIndex, style }) => {
    const column = columns[columnIndex];
    const rowData = data[rowIndex];
    return (
      <div
        style={{
          ...style,
          border: "1px solid gray",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {rowData[column.accessor]}
      </div>
    );
  };

  return (
    <Box height="100vh">
      <div
        {...getTableProps()}
        style={{ width: totalColumnsWidth, height: "100%" }}
      >
        <div>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <div
                  key={column.id}
                  {...column.getHeaderProps(column.getResizerProps())}
                  style={{
                    width: column.width,
                    border: "1px solid gray",
                    boxSizing: "border-box",
                    display: "inline-block",
                  }}
                >
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>
        <AutoSizer>
          {({ height, width }) => (
            <Grid
              columnCount={columns.length}
              columnWidth={(index) => getColumnWidth(index)}
              height={height}
              rowCount={data.length}
              rowHeight={() => 35}
              width={width}
            >
              {renderCell}
            </Grid>
          )}
        </AutoSizer>
      </div>
    </Box>
  );
};

export default TableList;
