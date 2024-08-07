const headers = {
  Term: "Term 1",
  Categories: [
    {
      name: "Homework",
      subcategories: [
        {
          name: "Homework 1",
          fields: ["Marks", "Comment"],
        },
        {
          name: "Total",
          fields: ["Score"],
        },
      ],
    },
    {
      name: "Classwork",
      subcategories: [
        {
          name: "Classwork 1",
          fields: ["Marks", "Comment"],
        },
        {
          name: "Total",
          fields: ["Score"],
        },
      ],
    },
    {
      name: "Final Assessment",
      subcategories: [
        {
          name: "Final Assessment 1",
          fields: ["Marks", "Comment"],
        },
        {
          name: "Total",
          fields: ["Score"],
        },
      ],
    },
    {
      name: "Total",
      fields: ["Score", "Grade"],
    },
  ],
};

const students = [
  {
    name: "Ari Nolan",
    homework: {
      homework1: { marks: 50, comment: "Great job" },
      total: { score: 90 },
    },
    classwork: {
      classwork1: { marks: 50, comment: "Great job" },
      total: { score: 90 },
    },
    finalAssessment: {
      finalAssessment1: { marks: 50, comment: "Great job" },
      total: { score: 90 },
    },
    total: { score: 90, grade: "A" },
  },
  {
    name: "Brendan Rogers",
    homework: {
      homework1: { marks: 50, comment: "Great job" },
      total: { score: 90 },
    },
    classwork: {
      classwork1: { marks: 50, comment: "Great job" },
      total: { score: 90 },
    },
    finalAssessment: {
      finalAssessment1: { marks: 50, comment: "Great job" },
      total: { score: 90 },
    },
    total: { score: 90, grade: "A" },
  },
];
