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

export const basic_columns = [
  {
    title: "Name",
    id: "name",
  },
  {
    title: "Marks",
    id: "marks",
  },
  {
    title: "Age",
    id: "age",
  },
  {
    title: "Gender",
    id: "gender",
  },
  {
    title: "Grade",
    id: "grade",
  },
  {
    title: "Subject",
    id: "subject",
  },
  {
    title: "Teacher",
    id: "teacher",
  },
  {
    title: "School",
    id: "school",
  },
  {
    title: "City",
    id: "city",
  },
  {
    title: "Country",
    id: "country",
  },
  {
    title: "Enrollment Date",
    id: "enrollment_date",
  },
  {
    title: "Graduation Date",
    id: "graduation_date",
  },
];

export const studentDataIndexes = [
  "name",
  "marks",
  "age",
  "gender",
  "grade",
  "subject",
  "teacher",
  "school",
  "city",
  "country",
  "enrollment_date",
  "graduation_date",
];

export const firstNames = [
  "Hines",
  "Coffey",
  "Mcmillan",
  "Lowe",
  "Alfred",
  "Petra",
  "Sara",
  "Kyle",
  "Tara",
  "Lucas",
  "Wendy",
  "Aaron",
  "Nancy",
  "Brenda",
  "Philip",
  "Julia",
  "Kevin",
  "Olivia",
  "Peter",
  "Monica",
  "Jeremy",
  "Lauren",
  "Cameron",
  "Victoria",
  "Ryan",
  "Zoe",
  "Ethan",
  "Sophia",
  "Mason",
  "Grace",
  "Michael",
  "Ella",
];
export const lastNames = [
  "Fowler",
  "Hayes",
  "Mcbride",
  "Mcguire",
  "Mcbride",
  "Rogers",
  "Summers",
  "Jenkins",
  "Palmer",
  "King",
  "Clark",
  "Adams",
  "Bates",
  "Scott",
  "Powell",
  "Sanders",
  "Morgan",
  "Blake",
  "Lewis",
  "Foster",
  "Cox",
  "Reed",
  "Diaz",
  "Brooks",
  "Evans",
  "Baker",
  "Lee",
  "Young",
  "Hill",
  "Green",
  "Nelson",
];
export const subjects = [
  "Math",
  "English",
  "Science",
  "History",
  "Geography",
  "Art",
  "Music",
  "Physical Education",
];
export const grades = ["A", "B", "C", "D", "E", "F"];
export const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];
export const countries = [
  "USA",
  "Canada",
  "UK",
  "Australia",
  "India",
  "Germany",
  "France",
  "China",
  "Japan",
  "Brazil",
];

export function generateStudentData(num) {
  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const students = [];

  for (let i = 0; i < num; i++) {
    const student = {
      name: `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`,
      marks: getRandomInt(50, 100).toString(),
      age: getRandomInt(14, 18).toString(),
      gender: getRandomElement(["Male", "Female"]),
      grade: getRandomElement(grades),
      subject: getRandomElement(subjects),
      teacher: `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`,
      school: `${getRandomElement(firstNames)} High School`,
      city: getRandomElement(cities),
      country: getRandomElement(countries),
      enrollment_date: `${getRandomInt(2010, 2020)}-${getRandomInt(1, 12)
        .toString()
        .padStart(2, "0")}-${getRandomInt(1, 28).toString().padStart(2, "0")}`,
      graduation_date: `${getRandomInt(2021, 2024)}-${getRandomInt(1, 12)
        .toString()
        .padStart(2, "0")}-${getRandomInt(1, 28).toString().padStart(2, "0")}`,
    };

    students.push(student);
  }

  return students;
}
