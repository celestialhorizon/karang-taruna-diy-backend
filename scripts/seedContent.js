import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tutorial from '../models/Tutorial.js';

dotenv.config();

const seedContent = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing content
    await Tutorial.deleteMany({});
    console.log('Cleared existing tutorials');

    // Seed Tutorials
    const tutorials = [
      {
        title: 'Cara Memperbaiki Keran Air yang Bocor',
        description: 'Pelajari teknik dasar memperbaiki keran air yang bocor dengan mudah dan cepat.',
        category: 'Plambing',
        difficulty: 'Pemula',
        duration: 15,
        imageUrl: 'https://images.unsplash.com/photo-1681249537103-9e0c7316d91e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHJlcGFpciUyMHR1dG9yaWFsfGVufDF8fHx8MTc3MDY2MDMxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
        videoUrl: 'https://example.com/video1.mp4',
        materials: [
          { name: 'Kunci inggris', quantity: '1 buah' },
          { name: 'Karet ganti keran', quantity: '1 buah' },
          { name: 'Teflon tape', quantity: '1 roll' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Matikan Sumber Air',
            description: 'Tutup katup air utama sebelum memulai perbaikan.',
            safetyNote: 'Pastikan tidak ada air yang mengalir saat membuka keran.'
          },
          {
            stepNumber: 2,
            title: 'Buka Bagian Keran',
            description: 'Gunakan kunci inggris untuk membuka bagian atas keran secara perlahan.'
          },
          {
            stepNumber: 3,
            title: 'Ganti Karet Rusak',
            description: 'Lepaskan karet lama dan ganti dengan yang baru.'
          },
          {
            stepNumber: 4,
            title: 'Pasang Kembali Keran',
            description: 'Pasang kembali semua bagian keran dengan rapat.'
          }
        ],
        author: 'Budi Santoso',
        rating: 4.5,
        viewsCount: 234,
        tags: ['keran', 'bocor', 'plambing', 'perbaikan']
      },
      {
        title: 'Instalasi Stop Kontak Listrik',
        description: 'Panduan lengkap instalasi stop kontak listrik yang aman untuk rumah.',
        category: 'Listrik',
        difficulty: 'Menengah',
        duration: 25,
        imageUrl: 'https://images.unsplash.com/photo-1767514536575-82aaf8b0afc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyaW5nJTIwcmVwYWlyfGVufDF8fHx8MTc3MDY2MDMxNHww&ixlib=rb-4.1.0&q=80&w=1080',
        videoUrl: 'https://example.com/video2.mp4',
        materials: [
          { name: 'Stop kontak', quantity: '1 buah' },
          { name: 'Kabel listrik', quantity: '2 meter' },
          { name: 'Tang', quantity: '1 buah' },
          { name: 'Obeng', quantity: '1 buah' },
          { name: 'Isolasi', quantity: '1 roll' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Matikan Listrik',
            description: 'Matikan daya listrik di MCB sebelum memulai instalasi.',
            safetyNote: 'Gunakan tester listrik untuk memastikan tidak ada aliran listrik.'
          },
          {
            stepNumber: 2,
            title: 'Siapkan Kabel',
            description: 'Potong kabel sesuai panjang yang dibutuhkan dan kupas ujungnya.'
          },
          {
            stepNumber: 3,
            title: 'Pasang Stop Kontak',
            description: 'Sambungkan kabel ke terminal stop kontak sesuai warna.'
          },
          {
            stepNumber: 4,
            title: 'Test Koneksi',
            description: 'Nyalakan kembali listrik dan test stop kontak dengan tester.'
          }
        ],
        author: 'Ahmad Fauzi',
        rating: 4.7,
        viewsCount: 189,
        tags: ['stop kontak', 'instalasi', 'listrik', 'MCB']
      },
      {
        title: 'Teknik Mengecat Dinding dengan Rapi',
        description: 'Tips dan trik mengecat dinding rumah agar hasilnya profesional dan tahan lama.',
        category: 'Pengecatan',
        difficulty: 'Pemula',
        duration: 20,
        imageUrl: 'https://images.unsplash.com/photo-1523250217488-ab35967e9840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGluZyUyMHdhbGwlMjBob21lfGVufDF8fHx8MTc3MDY2MDMxNHww&ixlib=rb-4.1.0&q=80&w=1080',
        videoUrl: 'https://example.com/video3.mp4',
        materials: [
          { name: 'Cat tembok', quantity: '1 kaleng' },
          { name: 'Kuas', quantity: '2 buah' },
          { name: 'Roller', quantity: '1 buah' },
          { name: 'Masking tape', quantity: '1 roll' },
          { name: 'Plastik pelindung', quantity: '1 roll' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Persiapkan Permukaan',
            description: 'Bersihkan dinding dari debu dan kotoran, tutup area yang tidak dicat.'
          },
          {
            stepNumber: 2,
            title: 'Aplikasikan Primer',
            description: 'Gunakan primer untuk hasil cat yang lebih baik dan tahan lama.'
          },
          {
            stepNumber: 3,
            title: 'Mulai Mengecat',
            description: 'Aplikasikan cat dengan kuas di sudut dan roller di permukaan luas.'
          },
          {
            stepNumber: 4,
            title: 'Kedua Lapisan',
            description: 'Tunggu lapisan pertama kering, lalu aplikasikan lapisan kedua.'
          }
        ],
        author: 'Rina Wijaya',
        rating: 4.8,
        viewsCount: 312,
        tags: ['dinding', 'cat', 'roller', 'kuas']
      },
      {
        title: 'Membuat Rak Kayu Sederhana',
        description: 'Proyek DIY membuat rak kayu multifungsi untuk penyimpanan di rumah.',
        category: 'Pertukangan Kayu',
        difficulty: 'Menengah',
        duration: 45,
        imageUrl: 'https://images.unsplash.com/flagged/photo-1596715932857-56e359217a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kd29ya2luZyUyMGNyYWZ0c21hbnNoaXB8ZW58MXx8fHwxNzcwNjM2ODczfDA&ixlib=rb-4.1.0&q=80&w=1080',
        videoUrl: 'https://example.com/video4.mp4',
        materials: [
          { name: 'Kayu papan', quantity: '3 lembar' },
          { name: 'Sekrup', quantity: '24 buah' },
          { name: 'Gergaji', quantity: '1 buah' },
          { name: 'Bor', quantity: '1 buah' },
          { name: 'Penggaris', quantity: '1 buah' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Ukur dan Potong Kayu',
            description: 'Ukur kayu sesuai ukuran rak yang diinginkan, lalu potong dengan presisi.'
          },
          {
            stepNumber: 2,
            title: 'Buat Lubang Sekrup',
            description: 'Tandai posisi lubang dan bor dengan hati-hati untuk menghindari retak.'
          },
          {
            stepNumber: 3,
            title: 'Rakit Rangka',
            description: 'Pasang sisi samping rak dengan papan atas dan bawah.'
          },
          {
            stepNumber: 4,
            title: 'Pasang Shelving',
            description: 'Tambahkan papan shelving pada posisi yang diinginkan.'
          },
          {
            stepNumber: 5,
            title: 'Finishing',
            description: 'Amplifikasi halus dan aplikasikan finish jika diinginkan.'
          }
        ],
        author: 'Budi Santoso',
        rating: 4.9,
        viewsCount: 428,
        tags: ['rak', 'kayu', 'DIY', 'penyimpanan']
      },
      {
        title: 'Perawatan Alat-Alat Pertukangan',
        description: 'Cara merawat dan menyimpan alat pertukangan agar awet dan siap pakai.',
        category: 'Perawatan',
        difficulty: 'Pemula',
        duration: 10,
        imageUrl: 'https://images.unsplash.com/photo-1765518440022-10242cc86895?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwbWFpbnRlbmFuY2UlMjB0b29sc3xlbnwxfHx8fDE3NzA2NTY3Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        videoUrl: 'https://example.com/video5.mp4',
        materials: [
          { name: 'Minyak pelumas', quantity: '1 botol' },
          { name: 'Lap bersih', quantity: '2 buah' },
          { name: 'Kotak penyimpanan', quantity: 'sesuai kebutuhan' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Bersihkan Alat',
            description: 'Bersihkan alat dari debu dan sisa material setiap kali selesai digunakan.'
          },
          {
            stepNumber: 2,
            title: 'Lindungi dari Karat',
            description: 'Aplikasikan minyak pelumas pada bagian logam untuk mencegah karat.'
          },
          {
            stepNumber: 3,
            title: 'Simpan dengan Rapi',
            description: 'Simpan alat di tempat kering dan mudah dijangkau.'
          }
        ],
        author: 'Dewi Lestari',
        rating: 4.4,
        viewsCount: 156,
        tags: ['perawatan', 'tools', 'maintenance', 'organisasi']
      },
      {
        title: 'Dasar-Dasar Penggunaan Alat Pertukangan',
        description: 'Kenali berbagai jenis alat pertukangan dan cara penggunaannya yang benar.',
        category: 'Pertukangan Kayu',
        difficulty: 'Pemula',
        duration: 30,
        imageUrl: 'https://images.unsplash.com/photo-1683115098652-db9813ecf284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJwZW50cnklMjB0b29scyUyMHdvcmtzaG9wfGVufDF8fHx8MTc3MDY2MDMxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
        videoUrl: 'https://example.com/video6.mp4',
        materials: [
          { name: 'Palu', quantity: '1 buah' },
          { name: 'Obeng', quantity: '2 buah' },
          { name: 'Kunci pas', quantity: '1 set' },
          { name: 'Gergaji', quantity: '1 buah' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Kenali Jenis Palu',
            description: 'Pelajari berbagai jenis palu dan fungsinya masing-masing.'
          },
          {
            stepNumber: 2,
            title: 'Teknik Memegang Palu',
            description: 'Pegang palu dengan erat di bagian gagang untuk hasil maksimal.'
          },
          {
            stepNumber: 3,
            title: 'Penggunaan Obeng',
            description: 'Pahami perbedaan obeng plus dan minus serta cara penggunaannya.'
          },
          {
            stepNumber: 4,
            title: 'Keselamatan Kerja',
            description: 'Selalu gunakan APD dan ikuti prosedur keselamatan saat menggunakan alat.'
          }
        ],
        author: 'Budi Santoso',
        rating: 4.6,
        viewsCount: 278,
        tags: ['tools', 'dasar', 'safety', 'palu', 'obeng']
      }
    ];

    await Tutorial.insertMany(tutorials);
    console.log('Tutorials seeded successfully');
    console.log(`Created ${courses.length} courses and ${tutorials.length} tutorials`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding content:', error);
    process.exit(1);
  }
};

seedContent();
