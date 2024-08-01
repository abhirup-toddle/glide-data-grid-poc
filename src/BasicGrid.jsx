import "./BasicGrid.css";
import "@glideapps/glide-data-grid/dist/index.css";
import { DataEditor, GridCellKind } from "@glideapps/glide-data-grid";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  basic_columns,
  basic_columns_2,
  basic_columns_3,
  generateStudentData,
  studentDataIndexes,
} from "./utils/starterData";

const BasicGrid = () => {
  const [data, setData] = useState(() => generateStudentData(50));
  const [columns, setColumns] = useState(basic_columns);
  const [dataGridScrollXOffset, setDataGridScrollXOffset] = useState(0);
  const [syncedHeaderScrollXOffset, setSyncedHeaderScrollXOffset] = useState(0);
  const [xOffset, setXOffset] = useState(0);
  // const dataGridScrollXOffsetRef = useState(0);
  const isHoveringDataGrid = useRef(false);
  const isHoveringSyncedHeader = useRef(false);
  const [elementToFollow, setElementToFollow] = useState(null);
  const scrollXBy = useRef(0);

  const gridRef = useRef(null);
  console.log("gridRef", gridRef.current);
  // const containerRef = useRef(null);
  const syncedHeaderRef = useRef(null);
  const syncedHeaderRef2 = useRef(null);

  const [columnWidths, setColumnWidths] = useState(Array(columns).fill(100));

  const handleResize = (index, newWidth) => {
    const newColumnWidths = [...columnWidths];
    newColumnWidths[index] = newWidth;
    setColumnWidths(newColumnWidths);
  };

  const synchronizeScroll = (source, target) => {
    target.scrollLeft = source.scrollLeft;
  };

  // if (isHoveringDataGrid.current) {
  //   console.log("following: data grid");
  // } else if (isHoveringSyncedHeader.current) {
  //   console.log("following: synced header");
  // }

  // useEffect(() => {
  //   if (elementToFollow === "data grid") {
  //     setXOffset(dataGridScrollXOffset);
  //   } else if (elementToFollow === "synced header") {
  //     setXOffset(syncedHeaderScrollXOffset);
  //   }
  // }, [elementToFollow, dataGridScrollXOffset, syncedHeaderScrollXOffset]);

  // useEffect(() => {
  //   console.log("xOffset check: ", xOffset);
  // }, [xOffset]);

  // console.log("isHoveringDataGrid.current", isHoveringDataGrid.current);
  // console.log("isHoveringSyncedHeader.current", isHoveringSyncedHeader.current);
  // useLayoutEffect(() => {
  useEffect(() => {
    const handleSyncedHeaderScroll = (e) => {
      // console.log("synced header scroll");
      // if (isHoveringDataGrid.current) {
      // const scrollXOffset = syncedHeaderRef.current.scrollLeft;
      // console.log("scrollXOffset", scrollXOffset);
      // setDataGridScrollXOffset(scrollXOffset);
      // scrollXBy.current = scrollXOffset;
      // }
      // only scroll in multiple of 150
      // setDataGridScrollXOffset(syncedHeaderRef.current.scrollLeft);
      // Apply smooth scroll behavior
      console.log(
        "syncedHeaderRef.current.scrollLeft",
        syncedHeaderRef.current.scrollLeft
      );
      setSyncedHeaderScrollXOffset(syncedHeaderRef.current.scrollLeft);
      // const scrollLeft = syncedHeaderRef.current.scrollLeft;
      // const snapPosition = Math.round(scrollLeft / 150) * 150;
      // setSyncedHeaderScrollXOffset(snapPosition);
    };

    const handleSyncedHeaderMouseEnter = (e) => {
      // console.log("entered synced header");
      // isHoveringSyncedHeader.current = true;
      // isHoveringDataGrid.current = false;
      setElementToFollow("synced header");

      syncedHeaderRef.current.addEventListener(
        "mouseleave",
        handleSyncedHeaderMouseLeave
      );
    };

    const handleSyncedHeaderMouseLeave = (e) => {
      // console.log("exited synced header");
      isHoveringSyncedHeader.current = false;
      setElementToFollow(null);

      syncedHeaderRef.current.removeEventListener(
        "mouseleave",
        handleSyncedHeaderMouseLeave
      );
    };

    if (syncedHeaderRef.current) {
      syncedHeaderRef.current.addEventListener(
        "scroll",
        handleSyncedHeaderScroll
      );

      syncedHeaderRef.current.addEventListener(
        "mouseenter",
        handleSyncedHeaderMouseEnter
      );
    }

    return () => {
      if (syncedHeaderRef.current) {
        syncedHeaderRef.current.removeEventListener(
          "scroll",
          handleSyncedHeaderScroll
        );
      }
    };
  }, []);

  const getCellContent = useCallback(
    (cell) => {
      const [col, row] = cell;
      const dataRow = data[row];

      const indexes = studentDataIndexes;

      const d = dataRow[indexes[col]];
      return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        readOnly: false,
        displayData: d,
        data: d,
      };
    },
    [data]
  );

  const onColumnResize = useCallback((cell, width) => {
    //get all the ancestors of the cell
    //calculate the new width of the column
    //get the delta of the new width and the old width
    //add the delta to the width of the ancestors

    setColumns((prev) => {
      return prev.map((col) => {
        if (col.id === cell.id) {
          return { ...col, width };
        }
        return col;
      });
    });
  }, []);

  const onCellEdited = useCallback(
    (cell, newValue) => {
      const [col, row] = cell;
      const tempData = [...data];
      const dataRow = tempData[row];
      dataRow[studentDataIndexes[col]] = newValue.data;
      setData([...tempData]);
    },
    [data]
  );

  // console.log("following", elementToFollow);
  // console.log("scrollXBy.current", scrollXBy.current);
  console.log("dataGridScrollXOffset", dataGridScrollXOffset);
  console.log("syncedHeaderScrollXOffset", syncedHeaderScrollXOffset);

  return (
    <div className="main-container">
      <h1>Basic Grid</h1>

      <h2>Synced Header</h2>
      <div className="synced-header top" ref={syncedHeaderRef2}>
        {basic_columns_3.map((col) => (
          <div
            key={col.title}
            style={{
              minWidth: col.width ?? 600,
              // scrollSnapType: "x mandatory",
              // scrollSnapMarginLeft: "150px",
            }}
            className="header-item"
          >
            {col.title}
          </div>
        ))}
      </div>
      <div className="synced-header" ref={syncedHeaderRef}>
        {basic_columns_2.map((col) => (
          <div
            key={col.title}
            style={{
              minWidth: col.width ?? 300,
              // scrollSnapType: "x mandatory",
              // scrollSnapMarginLeft: "150px",
            }}
            className="header-item"
          >
            {col.title}
          </div>
        ))}
      </div>

      <div className="basic-grid-container">
        {/* <div
          style={{
            height: "100%",
            overflow: "auto",
            overflowX: "scroll",
            overflowY: "scroll",
          }}
        > */}
        {/* <div
            style={{
              height: "1000px",
              width: "1000px",
              background: "linear-gradient(to right, #e66465, #9198e5)",
            }}
          ></div> */}
        {/* </div> */}
        <DataEditor
          ref={gridRef}
          // rowMarkers="number"
          headerHeight={30}
          columns={columns}
          // smoothScrollX={isHoveringDataGrid.current ? false : true}
          // smoothScrollX={true}
          smoothScrollY={true}
          getCellContent={getCellContent}
          onCellEdited={onCellEdited}
          onColumnResize={onColumnResize}
          rows={data.length}
          onVisibleRegionChanged={(range, tx, ty, extras) => {
            // syncedHeaderRef.current.scrollLeft = -tx;

            // console.log("currentHeaderScrollX", currentHeaderScrollX);
            if (elementToFollow === "data grid") {
              syncedHeaderRef.current.scrollLeft = range.x * 150;
              syncedHeaderRef2.current.scrollLeft = range.x * 150;
            }

            // syncedHeaderRef.current.scrollLeft -= tx;
            // setSyncedHeaderScrollXOffset(-tx);
            // init = init + tx;
            // console.log("init", init);
            console.log("range", range);
            // console.log("[tx, ty]", [tx, ty]);

            // console.log("[tx]", tx);
            // setDataGridScrollXOffset(tx);
            // dataGridScrollXOffsetRef.current = tx;
            // console.log("extras", extras);
            // scrollXBy.current = tx;
          }}
          // scrollOffsetX={syncedHeaderScrollXOffset}
          // scrollOffsetX={
          //   elementToFollow === "synced header" && syncedHeaderScrollXOffset
          // }
          onItemHovered={(item) => {
            // console.log("hovered", item);
            if (item.kind !== "out-of-bounds") {
              isHoveringDataGrid.current = true;
              setElementToFollow("data grid");
              // isHoveringSyncedHeader.current = false;
              // console.log("entered data grid");
            } else {
              // setElementToFollow(null);
              isHoveringDataGrid.current = false;
              // console.log("exited data grid");
            }
          }}
        />
      </div>
    </div>
  );
};

export default BasicGrid;
