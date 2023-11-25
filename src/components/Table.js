// components/Table.js

import React, { useRef, useState } from "react";
import { AutoSizer } from "react-virtualized";
import { VariableSizeGrid as Grid } from "react-window";
import Draggable from "react-draggable";
import { FaGripLinesVertical } from "react-icons/fa";
import { IoIosArrowDroprightCircle, IoIosCloseCircle } from "react-icons/io";
import { Box } from "@chakra-ui/react";

function TableList({ data, columns }) {
  const gridRef = useRef();

  const initialColumnWidth = () => Array(columns.length).fill(250);
  const initialHeaderWidth = () =>
    initialColumnWidth().reduce((acc, w) => acc + w, 0);

  const [columnWidth, setColumnWidth] = useState(initialColumnWidth());
  const [headerWidth, setHeaderWidth] = useState(initialHeaderWidth);
  const [openedShowMore, setOpenedShowMore] = useState(null);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const refItem = useRef();
    const content = data[rowIndex][columns[columnIndex].accessor];

    return (
      <>
        <div
          style={{
            ...style,
            marginTop: "35px",
          }}
          className="cell-container"
          ref={refItem}
        >
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginRight: "25px",
            }}
          >
            {content}
          </div>
          {content.length * 10 > columnWidth[columnIndex] && (
            <IoIosArrowDroprightCircle
              size="24px"
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                color: "GrayText",
                cursor: "pointer",
              }}
              onClick={() => setOpenedShowMore(`${columnIndex},${rowIndex}`)}
            />
          )}
        </div>

        {openedShowMore == `${columnIndex},${rowIndex}` && (
          <div
            style={{
              ...style,
              height: "100px",
              background: "white",
              border: "cyan 1px solid",
              padding: "5px",
              zIndex: 999,
              fontWeight: "bold",
            }}
          >
            <Box
              bg="white"
              position="absolute"
              top={-13}
              right={-13}
              rounded="full"
            >
              <IoIosCloseCircle
                style={{
                  color: "GrayText",
                  cursor: "pointer",
                }}
                size="24px"
                onClick={() => setOpenedShowMore(null)}
              />
            </Box>
            {content}
          </div>
        )}
      </>
    );
  };

  return (
    <Box p={4} height={"70vh"}>
      {" "}
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            ref={gridRef}
            columnCount={columns.length}
            columnWidth={(index) => columnWidth[index]}
            height={height}
            rowCount={data.length}
            rowHeight={() => 35}
            width={width}
            innerElementType={({ children }) => (
              <Box
                className="table-container"
                style={{
                  height: data.length * 35,
                }}
              >
                <div className="header" style={{ width: headerWidth }}>
                  {columns.map((col, key) => (
                    <div
                      className="col"
                      key={`colHeader-${key}`}
                      style={{ width: columnWidth[key] }}
                    >
                      {col.Header}
                      <Draggable
                        axis="x"
                        onDrag={(event, { deltaX, deltaY }) => {
                          const prevWidths = [...columnWidth];
                          prevWidths[key] = prevWidths[key] + deltaX;
                        }}
                        onStop={(event, drag) => {
                          const prevWidths = [...columnWidth];
                          prevWidths[key] = 250 + drag.x;
                          setColumnWidth(prevWidths);
                          setHeaderWidth(
                            prevWidths.reduce((acc, w) => acc + w, 0)
                          );
                          gridRef.current.resetAfterColumnIndex(key);
                        }}
                      >
                        <div className="grid-draggable-handler">
                          <FaGripLinesVertical />
                        </div>
                      </Draggable>
                    </div>
                  ))}
                </div>
                <div>{children}</div>
              </Box>
            )}
          >
            {Cell}
          </Grid>
        )}
      </AutoSizer>
    </Box>
  );
}

export default TableList;
