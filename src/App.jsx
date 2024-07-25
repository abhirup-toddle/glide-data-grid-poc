import { useCallback, useMemo, useState } from "react";
import "./App.css";
import "@glideapps/glide-data-grid/dist/index.css";
import {
  CompactSelection,
  DataEditor,
  GridCellKind,
} from "@glideapps/glide-data-grid";
import { range } from "lodash";

const _data = [
  {
    name: "Hines Fowler",
    company: "BUZZNESS",
    email: "hinesfowler@buzzness.com",
    phone: "+1 (869) 405-3127",
  },
  {
    name: "Mccray Mcleod",
    company: "ZOLARITY",
    email: "mcray",
    phone: "+1 (972) 546-3983",
  },
  {
    name: "Carmen Mcbride",
    company: "ZUVY",
    email: "",
    phone: "+1 (944) 546-3983",
  },
];

const _columns = [
  {
    title: "Name",
    id: "name",
  },
  {
    title: "Company",
    id: "company",
  },
  {
    title: "Email",
    id: "email",
  },
  {
    title: "Phone",
    id: "phone",
  },
];

function App() {
  const [data, setData] = useState(_data);
  const [columns, setColumns] = useState(_columns);
  const [selection, setSelection] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
  });

  const [sortableCols, setSortableCols] = useState(columns);

  // const [rowData, setRowData] = useState(() => {
  //   // return range(0, 50).map((x) => [`A: ${x}`, `B: ${x}`]);
  //   // return range(0, 50).map((x) => {
  //   return range(0, 3).map((x) => {
  //     return {
  //       name: `Name: ${x}`,
  //       company: `Company: ${x}`,
  //       email: `Email: ${x}`,
  //       phone: `Phone: ${x}`,
  //     };
  //   });
  // });
  const onColMoved = useCallback((startIndex, endIndex) => {
    setSortableCols((old) => {
      const newCols = [...old];
      const [toMove] = newCols.splice(startIndex, 1);
      newCols.splice(endIndex, 0, toMove);

      setColumns(newCols);
      setData((oldData) => {
        const newData = oldData.map((row) => {
          const newRow = {};
          newCols.forEach((col) => {
            newRow[col.id] = row[col.id];
          });
          return newRow;
        });
        return newData;
      });
      return newCols;
    });
  }, []);

  // const reorderRows = useCallback((from, to) => {
  //   setRowData((cv) => {
  //     const d = [...cv];
  //     const removed = d.splice(from, 1);
  //     d.splice(to, 0, ...removed);
  //     setData(d);
  //     return d;
  //   });
  // }, []);

  // console.log("rowData: ", rowData);

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

  const getCellContentMangled = useCallback(
    ([col, row]) => {
      const remappedCol = columns.findIndex(
        (c) => c.title === sortableCols[col].title
      );
      return getCellContent([remappedCol, row]);
    },
    [columns, getCellContent, sortableCols]
  );

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

  // const onColumnResize = useCallback((column, newSize) => {
  //   setColSizes((prevColSizes) => {
  //     return {
  //       ...prevColSizes,
  //       [column.title]: newSize,
  //     };
  //   });
  // }, []);

  // console.log("selection: ", selection);
  // console.log("getcellContent: ", getCellContent);
  // return (
  //   <div className="">
  //     <h1>Hello world</h1>
  //   </div>
  // );

  return (
    <DataEditor
      // rowHeight={30}
      // minColumnWidth={200}
      rowMarkers="checkbox"
      getCellContent={getCellContent}
      // getCellContent={getCellContentMangled}
      onCellEdited={onCellEdited}
      columns={columns}
      rows={data.length}
      // rows={5000}
      // rangeSelect="multi-cell"
      // onColumnResize={onColumnResize}
      gridSelection={selection}
      onGridSelectionChange={setSelection}
      getCellsForSelection={true}
      // onRowMoved={(s, e) => {}}
      // onColumnMoved={(s, e) => {}}
      onColumnMoved={onColMoved}
      // onDragStart={(e) => {
      //   e.setData("text/plain", "Drag data here!");
      // }}
      // onPaste={(target, values) => {
      //   console.log("[onPaste] target: ", target);
      //   console.log("[onPaste] values: ", values);

      //   // return false;
      //   return true;
      // }}
      // // onFinishedEditing={(cell, newValue) => {
      // //   console.log("onFinishedEditing ran ... ");
      // //   console.log("cell: ", cell);
      // //   console.log("newValue: ", newValue);
      // // }}
      // rightElement={
      //   // <ColumnAddButton>
      //   <button onClick={() => window.alert("Add a column!")}>+</button>
      //   // </ColumnAddButton>
      // }
      // rightElementProps={{
      //   fill: false,
      //   sticky: false,
      // }}
      // onCellContextMenu={(cell, e) => {
      //   console.log("[ctxMenu] cell: ", cell);
      //   console.log("[ctxMenu] e: ", e);
      //   console.log("[ctxMenu] data: ", getCellContent(cell).data);
      //   e.preventDefault();
      // }}
      // verticalBorder={true}
      // spanRangeBehavior="allow partial"
      // theme={(x) => {
      //   console.log("theme: ", x);
      //   return {
      //     bgCell: "pink",
      //   };
      // }}
    />
    // <DataEditor
    //   // {...defaultProps}
    //   getCellContent={getCellContent}
    //   columns={columns}
    //   rowMarkers="both"
    //   rows={5000}
    //   onRowMoved={(s, e) => window.alert(`Moved row ${s} to ${e}`)}
    //   onColumnMoved={(s, e) => window.alert(`Moved col ${s} to ${e}`)}
    //   // onColumnResize={onColumnResize}
    //   isDraggable={false}
    //   onDragStart={(e) => {
    //     e.setData("text/plain", "Drag data here!");
    //   }}
    // />
  );
}

export default App;
