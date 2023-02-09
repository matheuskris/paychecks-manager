import { PdfReader } from "pdfreader";
import fs from "fs";

import nextConnect from "next-connect";

import multer from "multer";
import crypto from "crypto";

const multerConfig = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public");
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    },
  }),
  // limits: {
  //   fileSize: 600 * 1024,
  // },
  // fileFilter: (req, file, cb) => {
  //   const allowedMimes = ["doc/pdf"];
  //   if (allowedMimes.includes(file.mimeType)) {
  //     cb(null, true);
  //   } else {
  //     cb(new Error("invalid file type."));
  //   }
  // },
};

const upload = multer(multerConfig);

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const uploadMiddleware = upload.array("theFiles");

apiRoute.use(uploadMiddleware);

apiRoute.post(async (req, res) => {
  const { files } = req;

  let jsonResponse = [];
  for (const file of files) {
    const pdfData = await parsePdf(`./public/uploads/${file.key}`);
    jsonResponse.push(pdfData);
    fs.unlinkSync(`./public/uploads/${file.key}`);
  }

  res.status(200).json({
    message: "Deu tudo certo",
    pdfData: jsonResponse,
  });
});

function readPDFPages(src) {
  return new Promise((resolve, reject) => {
    let pages = [];
    const reader = new PdfReader();

    reader.parseFileItems(src, (err, item) => {
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

  return data;
}

async function parsePdf(src) {
  const data = await readPDFPages(src);
  //console.log({'beforeParse': data});
  const parsedData = parseToddPDF(data);
  //return data;
  return parsedData;
}

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
