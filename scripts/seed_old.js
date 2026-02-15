import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Tutorial from '../models/Tutorial.js';

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    // Check if specific usernames already exist
    const existingAdmin = await User.findOne({ username: 'admin' });
    const existingUser = await User.findOne({ username: 'user' });
    
    const usersToInsert = [];
    
    if (!existingAdmin) {
      usersToInsert.push({
        name: 'Administrator',
        username: 'admin',
        email: 'admin@email.com',
        password: adminPassword,
        karangTarunaName: 'Karang Taruna Indonesia',
        provinsi: 'DKI Jakarta',
        kabupatenKota: 'Jakarta Pusat',
        kecamatan: 'Menteng',
        jalan: 'Jl. Menteng Raya No. 1',
        phone: '08123456789',
        interests: ['Pengembangan Masyarakat', 'Kepemimpinan'],
        skillLevel: 'Mahir',
        peranAnggota: 'Ketua Umum',
        role: 'admin',
        isActive: true,
      });
    } else {
      console.log('Admin user already exists. Skipping admin user creation.');
    }
    
    if (!existingUser) {
      usersToInsert.push({
        name: 'User Biasa',
        username: 'user',
        email: 'user@email.com',
        password: userPassword,
        karangTarunaName: 'Karang Taruna Setia',
        provinsi: 'Jawa Barat',
        kabupatenKota: 'Bandung',
        kecamatan: 'Coblong',
        jalan: 'Jl. Dago No. 25',
        phone: '08234567890',
        interests: ['Olahraga', 'Seni', 'Pendidikan'],
        skillLevel: 'Menengah',
        peranAnggota: 'Anggota Aktif',
        role: 'user',
        isActive: true,
      });
    } else {
      console.log('Regular user already exists. Skipping regular user creation.');
    }
    
    if (usersToInsert.length === 0) {
      console.log('All users already exist. No users to seed.');
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
      process.exit(0);
    }

    await User.insertMany(usersToInsert);
    console.log('Users seeded successfully:');
    
    if (!existingAdmin) {
      console.log('- Admin: admin@email.com / admin123');
    }
    if (!existingUser) {
      console.log('- User: user@email.com / user123');
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();

const seedTutorials = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Seed Tutorials - check by title
    const tutorials = [
      {
        title: 'Cara Memperbaiki Keran Air yang Bocor',
        description: 'Panduan lengkap memperbaiki keran air yang bocor atau menetes. Tutorial ini cocok untuk pemula yang ingin belajar perbaikan dasar plambing rumah tangga tanpa perlu memanggil tukang.',
        category: 'Plambing',
        difficulty: 'Pemula',
        duration: 20,
        imageUrl: 'https://images.unsplash.com/photo-1681249537103-9e0c7316d91e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHJlcGFpciUyMHR1dG9yaWFsfGVufDF8fHx8MTc3MDY2MDMxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
        materials: [
          { name: 'Kunci inggris ukuran 10-12 inch', quantity: '1 buah', notes: 'Untuk membuka mur keran' },
          { name: 'Karet seal/washer keran', quantity: '2-3 buah', notes: 'Cadangan jika ada yang rusak' },
          { name: 'Teflon tape/seal tape', quantity: '1 roll', notes: 'Untuk melapisi ulir' },
          { name: 'Lap kering', quantity: '2 buah', notes: 'Untuk membersihkan area kerja' },
          { name: 'Ember kecil', quantity: '1 buah', notes: 'Menampung air sisa' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Persiapan dan Matikan Sumber Air',
            description: 'Langkah pertama adalah mematikan sumber air utama. Cari katup air utama di rumah Anda (biasanya di dekat meteran air atau di bawah wastafel). Putar katup searah jarum jam hingga tertutup rapat. Setelah itu, buka keran yang bocor untuk memastikan tidak ada air yang tersisa di dalam pipa. Siapkan ember di bawah keran untuk menampung air yang mungkin masih keluar.',
            imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800',
            safetyNote: 'Pastikan katup air benar-benar tertutup sebelum membongkar keran. Periksa dengan membuka keran - jika tidak ada air keluar, berarti sudah aman.'
          },
          {
            stepNumber: 2,
            title: 'Buka Tutup dan Handle Keran',
            description: 'Lepaskan tutup dekoratif pada handle keran menggunakan obeng minus kecil. Di bawah tutup tersebut, Anda akan menemukan sekrup yang menahan handle. Lepaskan sekrup ini dengan obeng plus, lalu angkat handle keran ke atas. Jika handle lengket, goyang perlahan sambil ditarik ke atas. Simpan sekrup di tempat aman agar tidak hilang.',
            imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800'
          },
          {
            stepNumber: 3,
            title: 'Lepaskan Mur Penahan (Packing Nut)',
            description: 'Setelah handle terangkat, Anda akan melihat mur penahan (packing nut) yang berbentuk segi enam. Gunakan kunci inggris untuk memutar mur ini berlawanan arah jarum jam. Putar dengan hati-hati agar tidak merusak ulir. Setelah mur terlepas, angkat batang katup (stem) dari dalam badan keran. Perhatikan urutan komponen agar mudah saat memasang kembali.',
            imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800',
            safetyNote: 'Jangan memaksa jika mur sulit dibuka. Semprotkan sedikit pelumas (WD-40) dan tunggu 5-10 menit sebelum mencoba lagi.'
          },
          {
            stepNumber: 4,
            title: 'Periksa dan Ganti Karet Seal',
            description: 'Di bagian bawah batang katup, Anda akan menemukan karet seal (washer) yang biasanya sudah aus atau rusak. Lepaskan sekrup kecil yang menahan karet tersebut, lalu ganti dengan karet seal baru yang ukurannya sama. Pastikan karet terpasang dengan benar dan sekrup dikencangkan dengan pas - jangan terlalu kencang karena bisa merusak karet. Bersihkan juga area dudukan karet dari kotoran atau kerak.',
            imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800'
          },
          {
            stepNumber: 5,
            title: 'Bersihkan Komponen dan Periksa Ulir',
            description: 'Bersihkan semua komponen keran dengan lap kering. Periksa ulir pada batang katup dan badan keran - jika ada kerak atau kotoran, bersihkan dengan sikat kawat halus. Periksa juga kondisi O-ring (karet cincin) pada batang katup. Jika ada yang rusak atau mengeras, ganti dengan yang baru. Lapisi ulir dengan teflon tape dengan cara melilit searah jarum jam sebanyak 3-4 putaran.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 6,
            title: 'Pasang Kembali Semua Komponen',
            description: 'Masukkan kembali batang katup ke dalam badan keran. Pastikan posisinya tepat dan masuk dengan mulus. Pasang mur penahan dan kencangkan dengan kunci inggris - putar searah jarum jam hingga kencang tapi jangan terlalu keras. Pasang kembali handle keran dan kencangkan sekrupnya. Terakhir, pasang tutup dekoratif pada handle.',
            imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800'
          },
          {
            stepNumber: 7,
            title: 'Test dan Periksa Kebocoran',
            description: 'Buka kembali katup air utama secara perlahan. Biarkan air mengalir ke dalam pipa selama beberapa detik. Tutup keran yang baru diperbaiki dan periksa apakah masih ada kebocoran atau tetesan air. Jika masih bocor, kencangkan sedikit mur penahan. Jika tetap bocor, mungkin perlu mengganti komponen lain atau karet seal belum terpasang dengan benar. Buka dan tutup keran beberapa kali untuk memastikan berfungsi dengan baik.',
            safetyNote: 'Periksa area sekitar keran apakah ada rembesan air. Biarkan selama 10-15 menit dan cek kembali untuk memastikan tidak ada kebocoran.'
          }
        ],
        author: 'Budi Santoso',
        rating: 4.5,
        viewsCount: 1247,
        isActive: true,
        tags: ['keran', 'bocor', 'plambing', 'perbaikan', 'wastafel', 'air']
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
          { name: 'Stop kontak', quantity: '1 buah', notes: '' },
          { name: 'Kabel listrik', quantity: '2 meter', notes: '' },
          { name: 'Tang', quantity: '1 buah', notes: '' },
          { name: 'Obeng', quantity: '1 buah', notes: '' },
          { name: 'Isolasi', quantity: '1 roll', notes: '' }
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
        isActive: true,
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
          { name: 'Cat tembok', quantity: '1 kaleng', notes: '' },
          { name: 'Kuas', quantity: '2 buah', notes: '' },
          { name: 'Roller', quantity: '1 buah', notes: '' },
          { name: 'Masking tape', quantity: '1 roll', notes: '' },
          { name: 'Plastik pelindung', quantity: '1 roll', notes: '' }
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
        isActive: true,
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
          { name: 'Kayu papan', quantity: '3 lembar', notes: '' },
          { name: 'Sekrup', quantity: '24 buah', notes: '' },
          { name: 'Gergaji', quantity: '1 buah', notes: '' },
          { name: 'Bor', quantity: '1 buah', notes: '' },
          { name: 'Penggaris', quantity: '1 buah', notes: '' }
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
        isActive: true,
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
          { name: 'Minyak pelumas', quantity: '1 botol', notes: '' },
          { name: 'Lap bersih', quantity: '2 buah', notes: '' },
          { name: 'Kotak penyimpanan', quantity: 'sesuai kebutuhan', notes: '' }
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
        isActive: true,
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
          { name: 'Palu', quantity: '1 buah', notes: '' },
          { name: 'Obeng', quantity: '2 buah', notes: '' },
          { name: 'Kunci pas', quantity: '1 set', notes: '' },
          { name: 'Gergaji', quantity: '1 buah', notes: '' }
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
        isActive: true,
        tags: ['tools', 'dasar', 'safety', 'palu', 'obeng']
      }
    ];

    // Check each tutorial by title and only insert if not exists
    let insertedCount = 0;
    let skippedCount = 0;

    for (const tutorial of tutorials) {
      const existingTutorial = await Tutorial.findOne({ title: tutorial.title });
      
      if (!existingTutorial) {
        await Tutorial.create(tutorial);
        console.log(`Created tutorial: ${tutorial.title}`);
        insertedCount++;
      } else {
        console.log(`Skipped tutorial (already exists): ${tutorial.title}`);
        skippedCount++;
      }
    }

    console.log(`Tutorials seeded: ${insertedCount} created, ${skippedCount} skipped`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding tutorials:', error);
    process.exit(1);
  }
};

// Run both seed functions
const seedAll = async () => {
  await seedUsers();
  await seedTutorials();
};

seedAll();
