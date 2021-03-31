import multer from 'multer';
import path from 'path';
import fs from 'fs';

const dirAvatar = path.join(__dirname, '../uploads/avatar');
const dirVideo = path.join(__dirname, '../uploads/video');
const dirTemp = path.join(__dirname, '../uploads/photo');

function ensureExists(path, mask, cb) {
  if (typeof mask == 'function') {
    // allow the `mask` parameter to be optional
    cb = mask;
    mask = 0o777;
  }
  fs.mkdir(path, mask, function (err) {
    if (err) {
      if (err.code == 'EEXIST') cb(null);
      else cb(err); // something else went wrong
    } else cb(null); // successfully created folder
  });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fieldname = file.fieldname;
    if (fieldname === 'avatar') {
      ensureExists(dirAvatar, 0o744, function (err) {
        if (err) {
          console.log(err);
        } else {
          cb(null, path.join(dirAvatar));
        }
      });
    } else if (fieldname === 'video') {
      ensureExists(dirVideo, 0o744, function (err) {
        if (err) {
          console.log(err);
        } else {
          cb(null, path.join(dirAvatar));
        }
      });
    } else {
      ensureExists(dirTemp, 0o744, function (err) {
        if (err) {
          console.log(err);
        } else {
          cb(null, path.join(dirTemp));
        }
      });
    }
  },
  filename: function (req, file, cb) {
    const user = req.user?.id;
    if (file.fieldname === 'avatar' || file.fieldname === 'video') {
      const typeImage = file.originalname.split('.')[1];
      fs.readdirSync(path.join(__dirname, `../uploads/${file.fieldname}`))
        ?.filter((file) => {
          const f = file.split('.');
          return f[0];
        })
        .forEach((existFile) => {
          if (existFile.split('.')[0] === `${user + file.fieldname}`) {
            fs.unlinkSync(
              path.join(__dirname, `../uploads/${file.fieldname}/${existFile}`),
            );
          }
        });
      const uniqueSuffix = '.' + typeImage;
      cb(null, user + file.fieldname + uniqueSuffix);
    } else {
      cb(null, user + file.fieldname + file.originalname);
    }
  },
});

const upload = multer({ storage: storage });

export default upload;
