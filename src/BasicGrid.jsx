import "./BasicGrid.css";
import "@glideapps/glide-data-grid/dist/index.css";
import { DataEditor, GridCellKind } from "@glideapps/glide-data-grid";
import { useCallback, useRef, useState } from "react";
import {
  basic_columns,
  generateStudentData,
  studentDataIndexes,
} from "./utils/starterData";

const BasicGrid = () => {
  const [data, setData] = useState(() => generateStudentData(50));
  const [columns, setColumns] = useState(basic_columns);
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const getCellContent = useCallback((cell) => {
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
  }, []);

  const onColumnResize = useCallback((cell, width) => {
    console.log("col resized: ", cell.title, width);
  }, []);

  return (
    <div className="main-container">
      <h1>Basic Grid</h1>
      <div className="synced-header">
        {columns.map((col) => (
          <div
            key={col.title}
            style={{ width: col.width }}
            className="header-item"
          >
            {col.title}
          </div>
        ))}
      </div>
      <div className="basic-grid-container" ref={containerRef}>
        <DataEditor
          ref={gridRef}
          rowMarkers="number"
          headerHeight={30}
          columns={columns}
          // minColumnWidth={500}
          getCellContent={getCellContent}
          // getCellContent={getData}
          onColumnResize={onColumnResize}
          rows={data.length}
        />
      </div>
    </div>
  );
};

export default BasicGrid;
