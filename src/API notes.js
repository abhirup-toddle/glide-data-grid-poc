//display name is optional, if not provided, name will be used, if provided and empty, no name will be used,
//icon is optional, if not provided, name will be used,
//if provided and empty, no name will be used

const gradebookHeaders = [
  {
    name: "Student name", // or id
    displayName: "Student name", // optional, in the absence of displayName, name will be used
    options: [{ sort: ["asc", "desc"] }],
    children: [],
  },
  {
    name: "Term 1", // or id
    children: [
      {
        name: "Homework", // or id
        // displayName: 'Homework', // optional, in the absence of displayName, name will be used
        children: [
          {
            name: "Classwork 1", // or id
            tag: <Tag />,
            subscript: {
              items: [],
              separator: "",
            },
          },
          {
            name: "Total", // or id
            tag: {},
            subscript: {
              items: [],
              separator: "",
            },
            children: [
              {
                name: "evaluation status", // or id
                displayName: "", //is displayName is is provided and empty icon is required,
                icon: <Icon />,
                children: [
                  {
                    name: "/50", //if name is empty, icon has to be provided
                    children: [],
                  },
                  {
                    name: "Comment", // or id
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
