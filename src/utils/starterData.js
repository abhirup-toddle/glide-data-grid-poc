import { GridColumnIcon } from "@glideapps/glide-data-grid";

export const _data = [
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

export const _columns = [
  {
    title: "Name",
    id: "name",
    themeOverride: {
      bgIconHeader: "#00967d",
      textDark: "#00c5a4",
      textHeader: "#00c5a4",
      // bgCell: "pink",
    },
  },
  {
    title: "Company",
    id: "company",
    icon: GridColumnIcon.HeaderImage,
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

export const _scoreData = [
  {
    name: "Hines Fowler",
    project: "Photosynthesis",
    score: 100,
    attendance: "70%",
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

export const _scoreColumns = [
  {
    title: "Name",
    id: "name",
    themeOverride: {
      bgIconHeader: "#00967d",
      textDark: "#00c5a4",
      textHeader: "#00c5a4",
      // bgCell: "pink",
    },
  },
  {
    title: "Score",
    id: "score",
    icon: GridColumnIcon.HeaderImage,
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
