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
