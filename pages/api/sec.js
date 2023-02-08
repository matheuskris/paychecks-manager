import { PdfReader } from "pdfreader";

function readPDFPages(file) {
  return new Promise((resolve, reject) => {
    let pages = [];

    const reader = new PdfReader();

    reader.parseBuffer(file, (err, item) => {
      if (err) reject(err);
      else if (!item) resolve(pages);
      else if (item.page) pages.push({});
      else if (item.text) {
        const row = pages[pages.length - 1][item.y] || [];
        row.push(item.text);
        pages[pages.length - 1][item.y] = row;
      }
    });
  });
}

function parseToddPDF(pages) {
  const page = pages[0]; // We know there's only going to be one page

  // Declarative map of PDF data that we expect, based on Todd's structure
  const fields = {
    competence: { row: "3.51", index: 0 },
    workerId: { row: "5.695", index: 0 },
    workerName: { row: "5.695", index: 1 },
    valueInCents: { row: "45.743", index: 1 },
  };

  const data = {};

  // Assign the page data to an object we can return, as per
  // our field specification
  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    const val = page[field.row][field.index];

    // We don't want to lose leading zeros here, and can trust
    // any backend / data handling to worry about that. This is
    // why we don't coerce to Number.
    data[key] = val;
  });

  // Manually fixing up some text fields so theyre usable
  // data.reqID = data.reqID.slice("Requsition ID: ".length);
  // data.date = data.date.slice("Date: ".length);

  return data;
}

async function parsePdf(file) {
  const data = await readPDFPages(file);
  //console.log({'beforeParse': data});
  const parsedData = parseToddPDF(data);
  //return data;
  return parsedData;
}

async function apiHandler(req, res) {
  if (req.method === "POST") {
    // const { formData } = req;
    const { message, formData } = req.body.body;
    const pdfInfo = await parsePdf(formData[0]);

    console.log(message);

    res.status(200).json({ pdfInfo, message });
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}

export default apiHandler;

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
