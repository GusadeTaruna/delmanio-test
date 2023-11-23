import { Box } from "@chakra-ui/react";
import React from "react";
import { useTable, useBlockLayout, useResizeColumns } from "react-table";
import { AutoSizer } from "react-virtualized";
import { VariableSizeGrid as Grid } from "react-window";

const TableList = ({ columns, data }) => {
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
    <Box px={4} height="70vh">
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            columnCount={columns.length}
            columnWidth={() => 150}
            height={height}
            rowCount={data.length}
            rowHeight={() => 35}
            width={width}
          >
            {renderCell}
          </Grid>
        )}
      </AutoSizer>
    </Box>
  );
};

export default TableList;
