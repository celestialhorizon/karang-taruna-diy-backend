import express from 'express';
import { getCloudinary } from '../config/cloudinary.js';
import upload from '../middleware/upload.js';
import { protect as auth } from '../middleware/auth.js';
import streamifier from 'streamifier';

const router = express.Router();

// Upload image to Cloudinary
router.post('/image', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Tidak ada file yang diupload' });
    }

    const cloudinary = getCloudinary();

    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'tutorials/images',
        resource_type: 'image',
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Gagal upload gambar', error: error.message });
        }

        res.json({
          success: true,
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
          width: result.width,
          height: result.height
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

// Upload video to Cloudinary
router.post('/video', auth, upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Tidak ada file yang diupload' });
    }

    const cloudinary = getCloudinary();

    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'tutorials/videos',
        resource_type: 'video',
        chunk_size: 6000000, // 6MB chunks for large files
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Gagal upload video', error: error.message });
        }

        res.json({
          success: true,
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
          duration: result.duration,
          width: result.width,
          height: result.height
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

  } catch (error) {
    console.error('Upload video error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

// Delete media from Cloudinary
router.delete('/:publicId', auth, async (req, res) => {
  try {
    const { publicId } = req.params;
    const { resourceType = 'image' } = req.query;

    const cloudinary = getCloudinary();

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });

    if (result.result === 'ok') {
      res.json({ success: true, message: 'Media berhasil dihapus' });
    } else {
      res.status(400).json({ success: false, message: 'Gagal menghapus media' });
    }
  } catch (error) {
    console.error('Delete media error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

// Get upload signature for direct upload (frontend/mobile)
router.get('/signature', auth, (req, res) => {
  try {
    const timestamp = Math.round((new Date).getTime() / 1000);
    
    const cloudinary = getCloudinary();

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: 'tutorials'
      },
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      signature,
      timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY
    });
  } catch (error) {
    console.error('Generate signature error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

export default router;
