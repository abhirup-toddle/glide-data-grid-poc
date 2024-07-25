// /* eslint-disable sonarjs/no-identical-functions */
// import * as React from "react";

// // import {
// //   type EditableGridCell,
// //   type GridCell,
// //   GridCellKind,
// //   type GridColumn,
// //   GridColumnIcon,
// //   isEditableGridCell,
// //   isTextEditableGridCell,
// //   type Item,
// // } from "../../internal/data-grid/data-grid-types.js";

// import { faker } from "@faker-js/faker";
// // import { styled } from "@linaria/react";
// // import isArray from "lodash/isArray.js";
// // import { assertNever } from "../../common/support.js";
// // import { browserIsFirefox } from "../../common/browser-detect.js";
// // import { useResizeDetector } from "react-resize-detector";
// // import type { DataEditorProps } from "../data-editor.js";
// // import noop from "lodash/noop.js";

// faker.seed(1337);
// export function useMockDataGenerator(
//   numCols: number,
//   readonly: boolean = true,
//   group: boolean = false
// ) {
//   const cache = React.useRef(new ContentCache());

//   const [colsMap, setColsMap] = React.useState(() =>
//     getResizableColumns(numCols, group)
//   );

//   React.useEffect(() => {
//     setColsMap(getResizableColumns(numCols, group));
//   }, [group, numCols]);

//   const onColumnResize = React.useCallback(
//     (column: GridColumn, newSize: number) => {
//       setColsMap((prevColsMap) => {
//         const index = prevColsMap.findIndex((ci) => ci.title === column.title);
//         const newArray = [...prevColsMap];
//         newArray.splice(index, 1, {
//           ...prevColsMap[index],
//           width: newSize,
//         });
//         return newArray;
//       });
//     },
//     []
//   );

//   const cols = React.useMemo(() => {
//     return colsMap.map(getGridColumn);
//   }, [colsMap]);

//   const colsMapRef = React.useRef(colsMap);
//   colsMapRef.current = colsMap;
//   const getCellContent = React.useCallback(
//     ([col, row]: Item): GridCell => {
//       let val = cache.current.get(col, row);
//       if (val === undefined) {
//         val = colsMapRef.current[col].getContent();
//         if (!readonly && isTextEditableGridCell(val)) {
//           val = { ...val, readonly };
//         }
//         cache.current.set(col, row, val);
//       }
//       return val;
//     },
//     [readonly]
//   );

//   const setCellValueRaw = React.useCallback(
//     ([col, row]: Item, val: GridCell): void => {
//       cache.current.set(col, row, val);
//     },
//     []
//   );

//   const setCellValue = React.useCallback(
//     ([col, row]: Item, val: GridCell): void => {
//       let current = cache.current.get(col, row);
//       if (current === undefined) {
//         current = colsMap[col].getContent();
//       }
//       if (isEditableGridCell(val) && isEditableGridCell(current)) {
//         const copied = lossyCopyData(val, current);
//         cache.current.set(col, row, {
//           ...copied,
//           displayData:
//             typeof copied.data === "string"
//               ? copied.data
//               : (copied as any).displayData,
//           lastUpdated: performance.now(),
//         } as any);
//       }
//     },
//     [colsMap]
//   );

//   return {
//     cols,
//     getCellContent,
//     onColumnResize,
//     setCellValue,
//     setCellValueRaw,
//   };
// }
