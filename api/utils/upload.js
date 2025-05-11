// middleware/upload.js
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const vendorId = req.body.vendorId || req.params.id;
    const dir = `uploads/vendors/${vendorId}`;
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname === "vendorImage" ? "vendor" : "banner";
    cb(null, `${name}${ext}`);
  }
});

const upload = multer({ storage });
export default upload;
