import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { StatusResponse } from 'src/common/enums/StatusResponse.enum';
export const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const extension = extname(file.originalname);
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `${randomName}${extension}`);
  },
});
export const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(xls|xlsx)$/)) {
    return cb(
      new HttpException(
        {
          status: StatusResponse.FILE_UPLOAD_NOT_VALID,
          message: 'Only image files are allowed!',
        },
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  cb(null, true);
};

export const storageTemplateMessage = diskStorage({
  destination: './uploads/template-message',
  filename: (req, file, cb) => {
    const extension = extname(file.originalname);
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `${randomName}${extension}`);
  },
});
export const fileFilterTemplateMessage = (req, file, cb) => {
  if (!file.mimetype.match(/^image\/(jpeg|png)$/)) {
    return cb(
      new HttpException(
        {
          status: StatusResponse.FILE_UPLOAD_NOT_VALID,
          message: 'Only JPEG and PNG image files are allowed!',
        },
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  cb(null, true);
};
