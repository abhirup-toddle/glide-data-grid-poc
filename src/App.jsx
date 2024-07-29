import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import "@glideapps/glide-data-grid/dist/index.css";
import {
  CompactSelection,
  DataEditor,
  GridCellKind,
} from "@glideapps/glide-data-grid";
import {
  generateRandomObjectsArray,
  // getSortDirection,
  isSorted,
  sortData,
  toggleSortDirection,
} from "./utils/mockGenerator";
import { _columns } from "./utils/starterData";

function App() {
  // const [data, setData] = useState(_data);
  const dataEditorRef = useRef(null);
  const [data, setData] = useState(() => generateRandomObjectsArray(20));
  const [columns, setColumns] = useState(_columns);
  const [selection, setSelection] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
  });
  const [isMetaKeyPressed, setIsMetaKeyPressed] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);

  function getSelectionRange(selection, type) {
    if (!selection[type]) return [];

    let result = [];
    const arr = type === "columns" ? selection.columns : selection.rows;

    arr.items.forEach((item) => {
      if (item[1] - item[0] > 1) {
        for (let i = item[0]; i < item[1]; i++) {
          result.push(i);
        }
      } else {
        result.push(item[0]);
      }
    });
    return result;
  }

  function extractXY(obj) {
    //perform height width check, if they exceed 1, 1 then return empty array
    if (!obj.current) return [];
    const result = [];
    const range = obj.current.range;
    const rangeStack = obj.current.rangeStack;
    result.push({ x: range.x, y: range.y });
    rangeStack.forEach((item) => {
      result.push({ x: item.x, y: item.y });
    });
    return result;
  }

  function extractSelectedColumns(selection) {
    // if(!obj.) return [];
    if (!selection.columns) return [];
    console.log(selection.columns.items);

    //get the first index of every array in items

    const result = selection.columns.items.map((item) => {
      return item[0];
    });
    // console.log("[cols] result: ", result);
    return result;
  }

  function extractSelectedRows(selection) {
    if (!selection.rows) return [];
    console.log(
      "[extract selectedRows] selection.rows.items: ",
      selection.rows.items
    );

    //get the first index of every array in items

    const result = selection.rows.items.map((item) => {
      return item[0];
    });
    // console.log("[rows] result: ", result);
    return result;
  }

  function bulkUpdateRows() {
    // const selectedRows = extractSelectedRows(selection);
    // console.log("selectedRows: ", selectedRows);

    const selectedRows = getSelectionRange(selection, "rows");

    selectedRows.forEach((row) => {
      const indexes = ["name", "company", "email", "phone"];
      indexes.forEach((key) => {
        data[row][key] = "bulk row update";
      });
    });
    setData([...data]);
  }

  function bulkUpdate() {
    const selectedCells = extractXY(selection);
    console.log("selectedCells: ", selectedCells);
    selectedCells.forEach((cell) => {
      const { x, y } = cell;
      const indexes = ["name", "company", "email", "phone"];
      console.log("x, y: ", x, y);
      const key = indexes[x];
      data[y][key] = "bulk update";
      // console.log("cell: ", cell);
    });
    setData([...data]);
  }

  function bulkUpdateColumns() {
    // const selectedColumns = extractSelectedColumns(selection);
    const selectedColumns = getSelectionRange(selection, "columns");
    console.log("selectedColumns: ", selectedColumns);

    selectedColumns.forEach((col) => {
      const indexes = ["name", "company", "email", "phone"];
      data.forEach((row, i) => {
        row[indexes[col]] = "bulk col update";
      });

      setData([...data]);
    });
  }

  const getSelectedCells = useCallback(() => {
    console.log("selection: ", selection);
    // const cols = extractSelectedColumns(selection);
    // console.log("cols: ", cols);
    // if (cols.length === 0) {
    //   console.log("selected Cells: ", extractXY(selection));
    // } else {
    //   // if columns are selected
    //   console.log("selected columns: ", cols);
    //   // const numRows = data.length;
    //   bulkUpdateColumn();
    // }
  }, [selection]);

  const getCellContent = useCallback(
    (cell) => {
      const [col, row] = cell;
      const dataRow = data[row];

      // dumb but simple way to do this
      const indexes = ["name", "company", "email", "phone"];
      const d = dataRow[indexes[col]];
      return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        displayData: d,
        data: d,
        readonly: false,
        // cursor: "pointer",
        // faded: true,
        // copyData: d,
      };
    },
    [data]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Meta" || e.key === "Control") {
        // console.log("Control key pressed");
        setIsMetaKeyPressed(true);
      } else {
        setIsMetaKeyPressed(false);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "Meta" || e.key === "Control") {
        setIsMetaKeyPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const onCellEdited = useCallback((cell, newValue) => {
    console.log("onCellEdited ran ... ");

    if (newValue.kind !== GridCellKind.Text) {
      // we only have text cells, might as well just die here.
      return;
    }

    const indexes = ["name", "company", "email", "phone"];
    const [col, row] = cell;
    const key = indexes[col];
    data[row][key] = newValue.data;

    console.log("data: ", data[row][key]);
    console.log("newValue.data: ", newValue.data);
    setData([...data]);
  }, []);

  const handleColumnHeaderClick = useCallback(
    (colIndex, e) => {
      console.log("click registered");
      const col = columns[colIndex].id;
      const _isSorted = isSorted(data, col);

      console.log("isSorted: ", _isSorted);
      let direction = _isSorted ? toggleSortDirection(_isSorted) : "asc";

      // const toggledDirection = direction === "asc" ? "desc" : "asc";

      // const directionToSet = isSorted ? toggledDirection : direction;
      // console.log("[headerClick] columns[colIndex]: ", columns[colIndex].id);
      // console.log("[headerClick] colIndex: ", colIndex);
      // console.log("[headerClick] e: ", e);
      setData((prevData) => sortData(prevData, col));
      // setData(sortData(data, col, "desc"));
      // console.log("cols: ", columns);
    },
    [data, columns]
  );

  const updateCells = () => {
    const selectedCells = extractXY(selection);
    // console.log("selectedCells: ", selectedCells);

    const selectedColumns = extractSelectedColumns(selection);
    // console.log("selectedColumns: ", selectedColumns);

    const selectedRows = extractSelectedRows(selection);
    // console.log("selectedRows: ", selectedRows);

    if (selectedCells.length) {
      bulkUpdate();
    } else if (selectedColumns.length) {
      bulkUpdateColumns();
    } else if (selectedRows.length) {
      bulkUpdateRows();
    }
  };

  return (
    <div
      style={{
        position: "relative",
        // width: 400,
        // height: 900,
        // overflow: "auto",
      }}
    >
      <div>
        {/* <button
          className="poc-btn"
          onClick={() => {
            // console.log("dataEditorRef?.current: ", dataEditorRef?.current);
            dataEditorRef?.current?.scrollTo(0, 10, "both", "start", "start");
            dataEditorRef?.current?.appendRow(data.length, false);

            // dataEditorRef?.current?.focus();
          }}
        >
          Scroll to x
        </button> */}
        {/* <button className="poc-btn" onClick={setCellValue}>
          Update Value
        </button> */}
        <button className="poc-btn colourful-1" onClick={updateCells}>
          Update Cells
        </button>
        <button
          className="poc-btn"
          onClick={() => {
            // dataEditorRef.current.updateCells([{ cell: [1, 1] }]);
            // dataEditorRef?.current?.focus([2, 2]);
            getSelectedCells();
          }}
        >
          Get Selected Cells
        </button>
      </div>
      <DataEditor
        ref={dataEditorRef}
        // height={500}
        // rowHeight={30}
        // minColumnWidth={200}
        rowMarkers="checkbox"
        getCellContent={getCellContent}
        onCellEdited={onCellEdited}
        columns={columns}
        rows={data.length}
        rangeSelect={isMetaKeyPressed ? "multi-cell" : "rect"}
        gridSelection={selection}
        onGridSelectionChange={setSelection}
        getCellsForSelection={true}
        // onRowMoved={(s, e) => {}}
        // onColumnMoved={(s, e) => {}}
        // onPaste={true}
        onPaste={(target, value) => {
          return true;
        }}
        isOutsideClick={() => console.log("Outside click")}
        onHeaderClicked={handleColumnHeaderClick}
      />
    </div>
  );
}

export default App;
