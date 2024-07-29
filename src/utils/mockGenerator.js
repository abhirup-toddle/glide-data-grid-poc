const names = [
  "John Doe",
  "Jane Smith",
  "Alice Johnson",
  "Bob Brown",
  "Charlie Davis",
  "Dave Evans",
  "Eve Foster",
  "Grace Green",
  "Hank Harris",
  "Ivy Ingram",
  "Jack Jones",
  "Kelly King",
  "Leo Lee",
  "Molly Moore",
  "Nina Nelson",
  "Oscar Owens",
  "Paul Parker",
  "Quinn Quinn",
  "Rita Ross",
  "Sam Scott",
  "Tina Turner",
  "Uma Underwood",
  "Vince Vaughn",
  "Wendy White",
  "Xander Xavier",
];

const companies = [
  "TechCorp",
  "InnovateX",
  "Global Solutions",
  "DataMinds",
  "CyberNet",
  "AlphaOmega",
  "NextGen",
  "FutureWorks",
  "InnoVentures",
  "EcoSystems",
  "CloudWare",
  "InfoTech",
  "NexTech",
  "BlueWave",
  "DigitalEra",
  "CoreLogic",
  "GreenEnergy",
  "SmartSystems",
  "ProTech",
  "QuantumLeap",
  "Synapse",
  "TechWave",
  "Visionary",
  "AlphaTech",
  "BetaDynamics",
];

const emailProviders = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "protonmail.com",
  "zoho.com",
  "mail.com",
  "yandex.com",
  "gmx.com",
  "fastmail.com",
  "hushmail.com",
  "live.com",
  "inbox.com",
  "me.com",
  "yahoo.co.uk",
  "mail.ru",
  "rediffmail.com",
  "comcast.net",
  "verizon.net",
  "att.net",
  "cox.net",
  "sbcglobal.net",
  "bellsouth.net",
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomArray(count, generatorFunction) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(generatorFunction());
  }
  return result;
}

function generateRandomName() {
  return getRandomElement(names);
}

function generateRandomCompany() {
  return getRandomElement(companies);
}

function generateRandomEmailProvider() {
  return getRandomElement(emailProviders);
}

function generateRandomPhoneNumber() {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const exchangeCode = Math.floor(Math.random() * 900) + 100;
  const lineNumber = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `+1 (${areaCode}) ${exchangeCode}-${lineNumber}`;
}

function generateRandomObject() {
  const name = generateRandomName();
  const company = generateRandomCompany();
  const emailProvider = generateRandomEmailProvider();
  const email = `${name.split(" ").join("").toLowerCase()}@${emailProvider}`;
  const phone = generateRandomPhoneNumber();

  return {
    name,
    company,
    email,
    phone,
  };
}

export function generateRandomObjectsArray(count) {
  return generateRandomArray(count, generateRandomObject);
}

// const randomObjectsArray = generateRandomObjectsArray(5);
export function sortData(arr, property, direction = "asc") {
  // console.log("sortData: ", arr, property, direction);

  // direction = toggleSortDirection(direction);

  // const isAlreadySorted = isSorted(arr, property);
  // // console.log("isAlreadySorted: ", isAlreadySorted);
  // if (isAlreadySorted) {
  //   direction = toggleSortDirection(direction);
  // }

  return arr.sort((a, b) => {
    let valueA = a[property];
    let valueB = b[property];

    // Handle empty strings or undefined values
    if (valueA === "" || valueA === undefined)
      valueA = direction === "asc" ? "\uffff" : "";
    if (valueB === "" || valueB === undefined)
      valueB = direction === "asc" ? "\uffff" : "";

    if (valueA < valueB) return direction === "asc" ? -1 : 1;
    if (valueA > valueB) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

// export function isSorted(arr, property) {
//   for (let i = 0; i < arr.length - 1; i++) {
//     if (arr[i][property] > arr[i + 1][property]) return false;
//   }
//   return true;
// }

export function isSorted(arr, property) {
  if (arr.length <= 1) return "asc"; // Arrays of 0 or 1 element are considered sorted ascending

  let ascending = null;

  for (let i = 0; i < arr.length - 1; i++) {
    const current = arr[i][property];
    const next = arr[i + 1][property];

    if (current !== next) {
      if (ascending === null) {
        ascending = current < next;
      } else {
        if ((ascending && current > next) || (!ascending && current < next)) {
          return false; // Not sorted
        }
      }
    }
  }

  return ascending ? "asc" : "desc";
}

// check if sorted in either direction

// export function isSortedInEitherDirection(arr, property) {
//   return isSorted(arr, property) || isSorted(arr, property, "desc");
// }

// get sort direction
// export function getSortDirection(arr, property) {
//   if (isSorted(arr, property)) {
//     return "asc";
//   }
//   return "desc";
// }

export function toggleSortDirection(direction) {
  return direction === "asc" ? "desc" : "asc";
}

export function getRectRange(range) {
  if (!range) {
    return [];
  }
  const { x, y, width, height } = range;
  if (width > 1 || height > 1) {
    return [
      [x, x + width - 1],
      [y, y + height - 1],
    ];
  }
  return [];
}
// export function getRectRange(selection) {
//   if (!selection.current.range) {
//     return [];
//   }
//   const { x, y, width, height } = selection.current.range;
//   if (width > 1 || height > 1) {
//     return [
//       [x, x + width - 1],
//       [y, y + height - 1],
//     ];
//   }
//   return [];
// }

// export function getCellsInRange(selection) {
//   const range = getRectRange(selection?.current?.range);

//   if (!range.length) {
//     return [];
//   }
//   const result = [];
//   for (let i = range[0][0]; i <= range[0][1]; i++) {
//     for (let j = range[1][0]; j <= range[1][1]; j++) {
//       result.push([i, j]);
//     }
//   }
//   return result;
// }
export function getCellsInRange(selection) {
  const range = getRectRange(selection?.current?.range);

  const ranges = selection?.current?.rangeStack.map((range) => {
    return getRectRange(range);
  });

  // console.log("ranges: ", ranges);

  const result = [];

  const combinedRanges = [range, ...ranges].filter((r) => r.length);

  if (!combinedRanges.length) {
    return [];
  }

  combinedRanges.forEach((range) => {
    for (let i = range[0][0]; i <= range[0][1]; i++) {
      for (let j = range[1][0]; j <= range[1][1]; j++) {
        // result.push([i, j]);
        result.push({ x: i, y: j });
      }
    }
  });
  return result;
}

// if (!range.length) {
//   return [];
// }
// const result = [];
// for (let i = range[0][0]; i <= range[0][1]; i++) {
//   for (let j = range[1][0]; j <= range[1][1]; j++) {
//     result.push([i, j]);
//   }
// }
// return result;
// }
