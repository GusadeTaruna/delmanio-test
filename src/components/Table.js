import { Box } from "@chakra-ui/react";
import React from "react";
import { useTable, useBlockLayout, useResizeColumns } from "react-table";
import { VariableSizeList as List } from "react-window";

const TableList = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow, totalColumnsWidth } =
    useTable(
      {
        columns,
        data,
      },
      useBlockLayout,
      useResizeColumns
    );

  const RenderRow = ({ index, style }) => {
    const row = rows[index];
    prepareRow(row);
    return (
      <div {...row.getRowProps({ style })}>
        {row.cells.map((cell) => (
          <Box
            key={cell.column.id}
            borderWidth="1px"
            borderColor="gray"
            {...cell.getCellProps()}
          >
            {cell.render("Cell")}
          </Box>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div {...getTableProps()} style={{ width: totalColumnsWidth }}>
        <div>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <div
                  key={column.id}
                  {...column.getHeaderProps(column.getResizerProps())}
                  style={{
                    width: column.width,
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
        <List
          height={400}
          itemCount={rows.length}
          itemSize={() => 35}
          width={totalColumnsWidth}
        >
          {RenderRow}
        </List>
      </div>
    </div>
  );
};

export default TableList;
