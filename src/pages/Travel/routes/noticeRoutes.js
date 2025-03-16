import express from 'express';
import * as NoticeService from '../services/NoticeService.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Get all notices
router.get('/', async (req, res) => {
  try {
    const notices = await NoticeService.getAll();
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new notice
router.post('/', upload.single('pdfFile'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ message: 'PDF file is required' });
    }
    
    const newNotice = await NoticeService.create(
      title,
      description,
      file.buffer,
      file.mimetype
    );
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update notice
router.put('/:id', upload.single('pdfFile'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const file = req.file;
    
    let pdfBuffer, contentType;
    if (file) {
      pdfBuffer = file.buffer;
      contentType = file.mimetype;
    }
    
    const updatedNotice = await NoticeService.update(
      id,
      title,
      description,
      pdfBuffer,
      contentType
    );
    res.json(updatedNotice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete notice
router.delete('/:id', async (req, res) => {
  try {
    await NoticeService.deleteNotice(req.params.id);
    res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Download PDF
router.get('/download/:id', async (req, res) => {
  try {
    const { buffer, contentType } = await NoticeService.download(req.params.id);
    res.set('Content-Type', contentType);
    res.set('Content-Disposition', 'attachment; filename="document.pdf"');
    res.send(buffer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;