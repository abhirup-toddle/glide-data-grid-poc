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
  generateSchoolObject,
  getCellsInRange,
  sortData,
} from "./utils/mockGenerator";
import { _columns, _data, _scoreColumns } from "./utils/starterData";
import { useLayer } from "react-laag";

const zeroBounds = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  bottom: 0,
  right: 0,
};

function App() {
  const [tooltip, setTooltip] = useState();
  const timeoutRef = useRef(0);
  // const [data, setData] = useState(_data);
  const dataEditorRef = useRef(null);
  const [data, setData] = useState(() => generateRandomObjectsArray(20));
  // const [data, setData] = useState(() =>
  //   generateRandomObjectsArray(20, generateSchoolObject)
  // );
  // const [data, setData] = useState(_data);
  // const [columns, setColumns] = useState(_columns);
  const [columns, setColumns] = useState(_scoreColumns);
  const [currentSelection, setCurrentSelection] = useState(null);

  const [selection, setSelection] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
  });

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
    // console.log(selection.columns.items);

    //get the first index of every array in items

    const result = selection.columns.items.map((item) => {
      return item[0];
    });
    // console.log("[cols] result: ", result);
    return result;
  }

  function extractSelectedRows(selection) {
    if (!selection.rows) return [];
    // console.log(
    //   "[extract selectedRows] selection.rows.items: ",
    //   selection.rows.items
    // );

    //get the first index of every array in items

    const result = selection.rows.items.map((item) => {
      return item[0];
    });
    // console.log("[rows] result: ", result);
    return result;
  }

  function bulkUpdateRows(value) {
    // const selectedRows = extractSelectedRows(selection);
    // console.log("selectedRows: ", selectedRows);

    const selectedRows = getSelectionRange(selection, "rows");

    selectedRows.forEach((row) => {
      const indexes = ["name", "company", "email", "phone"];
      indexes.forEach((key) => {
        data[row][key] = value ?? "bulk row update";
      });
    });

    const cellsIndexesUpdated = selectedRows.map((row) => {
      return [row, 0];
    });
    // console.log("[row] cellsIndexesUpdated: ", cellsIndexesUpdated);
    setData([...data]);
  }

  function getCombinedCells() {
    const selectedCells = extractXY(selection);
    const cellsInRect = getCellsInRange(selection);
    const combinedCells = [...selectedCells, ...cellsInRect];
    console.log("[mixed] combinedCells: ", combinedCells);
    return combinedCells;
  }

  function bulkUpdate(value) {
    console.log("[bulkUpdate] value: ", value);
    // const selectedCells = extractXY(selection);
    // const cellsInRect = getCellsInRange(selection);

    // const combinedCells = [...selectedCells, ...cellsInRect];
    const combinedCells = getCombinedCells();

    combinedCells.forEach((cell) => {
      const { x, y } = cell;
      const indexes = ["name", "company", "email", "phone"];
      const key = indexes[x];
      data[y][key] = value ?? "bulk update";
    });
    const cellsIndexesUpdated = combinedCells.map((cell) => {
      return [cell.y, cell.x];
    });
    // console.log("[mixed] cellsIndexesUpdated: ", cellsIndexesUpdated);

    setData([...data]);
  }

  function bulkUpdateColumns(value) {
    const selectedColumns = getSelectionRange(selection, "columns");
    selectedColumns.forEach((col) => {
      const indexes = ["name", "company", "email", "phone"];
      data.forEach((row, i) => {
        row[indexes[col]] = value ?? "bulk col update";
      });

      const cellsIndexesUpdated = data.map((row, i) => {
        return [i, col];
      });
      // console.log("[col] cellsIndexesUpdated: ", cellsIndexesUpdated);

      setData([...data]);
    });
  }

  const getSelectedCells = useCallback(() => {
    // console.log("[getSelectedCells] selection: ", selection);
    if (selection.columns.items.length) {
      // console.log("selected columns: ", selection.columns.items);
      const selectedColumns = getSelectionRange(selection, "columns");
      console.log("selected columns: ", selectedColumns);
      setCurrentSelection(selection.columns.items);
      // setCurrentSelection(selection.columns.items);
      return selection.columns.items;
    } else if (selection.rows.items.length) {
      // console.log("selected rows: ", selection.rows.items);
      setCurrentSelection(selection.rows.items);
      return selection.rows.items;
    } else if (selection.current.range) {
      // console.log("selected cells: ", selection.current.range);
      const combinedCells = getCombinedCells();
      setCurrentSelection(combinedCells);
      return combinedCells;
    }
    return [];

    // const selectedColumns = getSelectionRange(selection, "columns");
    // const selectedRows = getSelectionRange(selection, "rows");

    //if columns are selected, only check for columns
    //if rows are selected, only check for rows
    //if cells are selected, check for cells
  }, [selection, currentSelection, getCombinedCells]);

  const getCellBackground = (d) => {
    if (Number.isNaN(d)) return "";
    //over 90, green
    //over 70, yellow
    //over 30, orange
    //30 or less, red

    if (d > 90) return "green";
    else if (d > 70) return "yellow";
    else if (d > 30) return "orange";
    else return "red";
  };

  const getCellContent = useCallback(
    (cell) => {
      const [col, row] = cell;
      const dataRow = data[row];

      // dumb but simple way to do this
      const indexes = ["name", "company", "email", "phone"];
      const _col = columns[col].id;
      const d = dataRow[indexes[col]];

      return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        displayData: d,
        data: d.toString(),
        readonly: false,
        themeOverride: {
          // bgCell: d === "ProTech" ? "red" : "",
          bgCell: _col === "score" ? getCellBackground(d) : "",
          // borderColor: "pink",
          // drilldownBorder: "blue",
        },
        // cursor: "pointer",
        // faded: true,
        // copyData: d,
      };
    },
    [data, columns]
  );

  const getCellData = useCallback(
    (cell) => {
      const [col, row] = cell;
      const dataRow = data[row];
      const indexes = ["name", "company", "email", "phone"];
      return dataRow[indexes[col]];
    },
    [data]
  );

  const onCellEdited = useCallback(
    (cell, newValue) => {
      if (newValue.kind !== GridCellKind.Text) {
        return;
      }

      const indexes = ["name", "company", "email", "phone"];
      const [col, row] = cell;
      const key = indexes[col];
      data[row][key] = newValue.data;

      // console.log("data: ", data[row][key]);
      // console.log("[onCellEdited] [row, col]: ", [row, col]);
      // console.log("[onCellEdited] new data: ", newValue.data);
      setData([...data]);
    },
    [data]
  );

  const handleColumnHeaderClick = useCallback(
    (colIndex, e) => {
      const col = columns[colIndex].id;
      setData((prevData) => sortData(prevData, col));
    },
    [columns]
  );

  const updateCells = (value) => {
    console.log("[updateCells] value: ", value);
    const selectedCells = extractXY(selection);
    const selectedColumns = extractSelectedColumns(selection);
    const selectedRows = extractSelectedRows(selection);

    if (selectedCells.length) {
      bulkUpdate(value);
    } else if (selectedColumns.length) {
      bulkUpdateColumns(value);
    } else if (selectedRows.length) {
      bulkUpdateRows(value);
    }
  };

  useEffect(() => {
    // check for paste event

    const handlePaste = (e) => {
      const selectedCols = getSelectionRange(selection, "columns");
      const selectedRows = getSelectionRange(selection, "rows");

      // console.log("selectedCols: ", selectedCols);
      // console.log("selectedRows: ", selectedRows);
      // console.log("cliboardData", e.clipboardData.getData("text"));
      const clipboardData = e.clipboardData.getData("text");

      if (selectedCols.length > 1) {
        // console.log("paste event: ", e);
        // console.log("handle paste here");
        bulkUpdateColumns(clipboardData);
      } else if (selectedRows.length > 1) {
        bulkUpdateRows(clipboardData);
        // console.log("paste event: ", e);
        // console.log("handle paste here");
      }
    };

    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [selection]);

  const onItemHovered = useCallback((args) => {
    if (args.kind === "cell") {
      window.clearTimeout(timeoutRef.current);
      setTooltip(undefined);
      timeoutRef.current = window.setTimeout(() => {
        setTooltip({
          // val: `Tooltip for ${args.location[0]}, ${args.location[1]}`,
          val: `${getCellData(args.location)} some more text here`,
          bounds: {
            // translate to react-laag types
            left: args.bounds.x,
            top: args.bounds.y,
            width: args.bounds.width,
            height: args.bounds.height,
            right: args.bounds.x + args.bounds.width,
            bottom: args.bounds.y + args.bounds.height,
          },
        });
      }, 400);
    } else {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = 0;
      setTooltip(undefined);
    }
  }, []);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const isOpen = tooltip !== undefined;
  const { renderLayer, layerProps } = useLayer({
    isOpen,
    triggerOffset: 4,
    auto: true,
    container: "portal",
    trigger: {
      getBounds: () => tooltip?.bounds ?? zeroBounds,
    },
  });

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div>
        <button className="poc-btn colourful-1" onClick={() => updateCells()}>
          Update Cells
        </button>
        <button className="poc-btn" onClick={getSelectedCells}>
          Get Selected Cells
        </button>
      </div>
      <DataEditor
        ref={dataEditorRef}
        rowMarkers="checkbox"
        getCellContent={getCellContent}
        onCellEdited={onCellEdited}
        columns={columns}
        rows={data.length}
        rangeSelect={"multi-rect"}
        gridSelection={selection}
        onGridSelectionChange={setSelection}
        getCellsForSelection={true}
        // onRowMoved={(s, e) => {}}
        // onColumnMoved={(s, e) => {}}
        // onPaste={true}
        onFillPattern={(e) => {
          console.log("fill pattern: ", e);
          const cellData = getCellData([e.patternSource.x, e.patternSource.y]);
          console.log("cellData: ", cellData);
        }}
        onPaste={(target, value) => {
          console.log("get combined cells: ", getSelectedCells());
          const selectedCellsLength = getSelectedCells().length;
          const _value = value.pop()[0];

          if (selection.columns.items.length) {
            bulkUpdateColumns(_value);
            return false;
          } else if (selection.rows.items.length) {
            bulkUpdateRows(_value);
            return false;
          } else if (selectedCellsLength > 1) {
            updateCells(_value);
            return false;
          }

          return true;
        }}
        onHeaderClicked={handleColumnHeaderClick}
        fillHandle={true}
        // onItemHovered={(e) => {
        //   if (e.kind === "cell" || e.kind === "header") {
        //     console.log("[hovered] : ", e);
        //   }
        // }}
        onItemHovered={onItemHovered}
      />
      {isOpen &&
        renderLayer(
          <div
            {...layerProps}
            style={{
              ...layerProps.style,
              padding: "8px 12px",
              color: "white",
              font: "500 13px Inter",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              borderRadius: "4px",
              fontFamily: "Roboto",
            }}
          >
            {tooltip.val}
          </div>
        )}
    </div>
  );
}

export default App;
