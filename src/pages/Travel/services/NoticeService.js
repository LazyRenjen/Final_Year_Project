import Notice from '../models/Notice.js';

// ✅ Get all notices
export const getAll = async () => {
  return await Notice.find().select('-pdf').sort({ uploadDate: -1 });
};

// ✅ Create a new notice
export const create = async (title, description, pdfBuffer, contentType) => {
  const newNotice = new Notice({
    title,
    description,
    pdf: pdfBuffer,
    contentType
  });
  return await newNotice.save();
};

// ✅ Update an existing notice
export const update = async (id, title, description, pdfBuffer, contentType) => {
  const notice = await Notice.findById(id);
  if (!notice) throw new Error('Notice not found');

  notice.title = title;
  notice.description = description;
  if (pdfBuffer) {
    notice.pdf = pdfBuffer;
    notice.contentType = contentType;
  }
  return await notice.save();
};

// ✅ Delete a notice
export const deleteNotice = async (id) => {
  return await Notice.findByIdAndDelete(id);
};

// ✅ Download notice PDF
export const download = async (id) => {
  const notice = await Notice.findById(id).select('pdf contentType');
  if (!notice) throw new Error('Notice not found');
  return { buffer: notice.pdf, contentType: notice.contentType };
};
