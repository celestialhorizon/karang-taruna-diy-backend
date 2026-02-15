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
        interests: ['Pertukangan Kayu', 'Listrik'],
        skillLevel: 'Mahir',
        peranAnggota: 'Ketua Umum',
        role: 'admin',
        isActive: true,
      });
    } else {
      console.log('Admin user already exists. Skipping.');
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
        interests: ['Pengecatan', 'Perawatan'],
        skillLevel: 'Menengah',
        peranAnggota: 'Anggota Aktif',
        role: 'user',
        isActive: true,
      });
    } else {
      console.log('Regular user already exists. Skipping.');
    }
    
    if (usersToInsert.length > 0) {
      await User.insertMany(usersToInsert);
      console.log('Users seeded successfully');
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
};

const seedTutorials = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for tutorials');

    const tutorials = [
      {
        title: 'Cara Memperbaiki Keran Air yang Bocor',
        description: 'Panduan lengkap memperbaiki keran air yang bocor atau menetes. Tutorial ini cocok untuk pemula yang ingin belajar perbaikan dasar plambing rumah tangga tanpa perlu memanggil tukang.',
        category: 'Plambing',
        difficulty: 'Pemula',
        duration: 20,
        imageUrl: 'https://images.unsplash.com/photo-1681249537103-9e0c7316d91e?w=800',
        materials: [
          { name: 'Kunci inggris ukuran 10-12 inch', quantity: '1 buah', notes: 'Untuk membuka mur keran' },
          { name: 'Karet seal/washer keran', quantity: '2-3 buah', notes: 'Cadangan jika ada yang rusak' },
          { name: 'Teflon tape/seal tape', quantity: '1 roll', notes: 'Untuk melapisi ulir' },
          { name: 'Obeng set (plus dan minus)', quantity: '1 set', notes: 'Untuk membuka handle keran' },
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
        title: 'Instalasi Stop Kontak Listrik yang Aman',
        description: 'Panduan lengkap instalasi stop kontak listrik yang aman untuk rumah. Pelajari cara memasang stop kontak dengan benar sesuai standar kelistrikan Indonesia (SNI) untuk menghindari bahaya korsleting dan kebakaran.',
        category: 'Listrik',
        difficulty: 'Menengah',
        duration: 35,
        imageUrl: 'https://images.unsplash.com/photo-1767514536575-82aaf8b0afc4?w=800',
        materials: [
          { name: 'Stop kontak (outlet) standar SNI', quantity: '1 buah', notes: 'Pilih yang berkualitas baik dengan grounding' },
          { name: 'Kabel NYM 2x2.5mm²', quantity: '3 meter', notes: 'Sesuaikan dengan jarak ke sumber listrik' },
          { name: 'Junction box/kotak sambungan', quantity: '1 buah', notes: 'Untuk melindungi sambungan kabel' },
          { name: 'Tang potong dan kupas kabel', quantity: '1 set', notes: 'Untuk memotong dan mengupas kabel' },
          { name: 'Obeng tester/testpen', quantity: '1 buah', notes: 'Untuk mengecek aliran listrik' },
          { name: 'Obeng plus dan minus', quantity: '1 set', notes: 'Untuk memasang stop kontak' },
          { name: 'Isolasi listrik', quantity: '1 roll', notes: 'Untuk melindungi sambungan' },
          { name: 'Bor listrik dan mata bor beton', quantity: '1 set', notes: 'Jika perlu membuat lubang di dinding' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Matikan Listrik di MCB dan Persiapan',
            description: 'Langkah pertama dan terpenting adalah mematikan listrik di MCB (Miniature Circuit Breaker) untuk area yang akan dikerjakan. Turunkan tuas MCB ke posisi OFF. Gunakan testpen untuk memastikan tidak ada aliran listrik di kabel yang akan disambung. Siapkan semua alat dan bahan di area kerja. Pastikan area kerja cukup terang dengan menggunakan lampu emergency atau senter.',
            imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800',
            safetyNote: 'WAJIB matikan MCB sebelum memulai pekerjaan listrik. Gunakan testpen untuk memastikan tidak ada arus listrik. Jangan pernah bekerja dengan listrik dalam keadaan hidup.'
          },
          {
            stepNumber: 2,
            title: 'Tentukan Lokasi dan Pasang Junction Box',
            description: 'Tentukan lokasi pemasangan stop kontak dengan ketinggian standar 30-40 cm dari lantai untuk stop kontak biasa, atau 120-150 cm untuk stop kontak khusus (AC, water heater). Tandai posisi junction box di dinding. Bor lubang untuk paku beton sesuai lubang pada junction box. Pasang fischer dan kencangkan junction box ke dinding menggunakan sekrup. Pastikan junction box terpasang kuat dan rata dengan dinding.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 3,
            title: 'Siapkan dan Kupas Kabel',
            description: 'Ukur panjang kabel yang dibutuhkan dari sumber listrik ke lokasi stop kontak baru, tambahkan 30-40 cm untuk cadangan. Potong kabel NYM sesuai ukuran. Kupas bagian luar kabel NYM sepanjang 10 cm di kedua ujung untuk mengakses kabel fase (hitam/merah), netral (biru), dan ground (kuning-hijau). Kupas ujung masing-masing kabel dalam sepanjang 1-1.5 cm menggunakan tang kupas kabel.',
            imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800',
            safetyNote: 'Saat mengupas kabel, jangan sampai melukai inti tembaga karena bisa menyebabkan kabel mudah putus.'
          },
          {
            stepNumber: 4,
            title: 'Sambungkan Kabel ke Sumber Listrik',
            description: 'Buka penutup stop kontak atau junction box sumber listrik. Identifikasi kabel fase (biasanya hitam/merah/coklat), netral (biru), dan ground (kuning-hijau). Sambungkan kabel baru ke kabel sumber dengan cara: kabel fase ke fase, netral ke netral, ground ke ground. Gunakan connector kabel atau metode puntir dan isolasi yang rapi. Pastikan sambungan kuat dan tidak ada tembaga yang terlihat.',
            imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
            safetyNote: 'Pastikan sambungan kuat dan tidak ada kabel yang terkelupas. Sambungan yang longgar bisa menyebabkan panas berlebih dan kebakaran.'
          },
          {
            stepNumber: 5,
            title: 'Pasang Kabel ke Stop Kontak Baru',
            description: 'Masukkan ujung kabel yang lain ke dalam junction box stop kontak baru. Buka bagian belakang stop kontak - Anda akan melihat 3 terminal: L (Line/Fase), N (Neutral), dan simbol ground. Masukkan kabel fase ke terminal L, kabel netral ke terminal N, dan kabel ground ke terminal ground. Kencangkan sekrup terminal dengan kuat. Tarik sedikit kabel untuk memastikan sudah terpasang dengan kuat.',
            imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800'
          },
          {
            stepNumber: 6,
            title: 'Pasang Stop Kontak ke Junction Box',
            description: 'Rapikan kabel di dalam junction box dengan melipat secara rapi. Masukkan stop kontak ke dalam junction box dengan hati-hati, pastikan tidak ada kabel yang terjepit. Kencangkan stop kontak ke junction box menggunakan sekrup yang tersedia. Pastikan stop kontak terpasang rata dan kuat, tidak goyang. Pasang cover/penutup stop kontak dan kencangkan sekrupnya.',
            imageUrl: 'https://images.unsplash.com/photo-1621905252472-8d0f1c9d7d8e?w=800'
          },
          {
            stepNumber: 7,
            title: 'Test Instalasi dan Keamanan',
            description: 'Sebelum menghidupkan MCB, periksa kembali semua sambungan. Nyalakan MCB secara perlahan. Gunakan testpen untuk mengecek apakah ada arus listrik di stop kontak baru. Colokkan alat elektronik sederhana (seperti lampu kecil atau charger HP) untuk test. Periksa apakah ada percikan api, bau terbakar, atau panas berlebih. Jika semua normal, instalasi berhasil.',
            imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800',
            safetyNote: 'Jika ada percikan api, bau terbakar, atau MCB trip, SEGERA matikan MCB dan periksa kembali semua sambungan.'
          }
        ],
        author: 'Ahmad Fauzi',
        rating: 4.7,
        viewsCount: 892,
        isActive: true,
        tags: ['stop kontak', 'instalasi', 'listrik', 'MCB', 'kelistrikan', 'outlet']
      },
      {
        title: 'Teknik Mengecat Dinding Rumah dengan Rapi',
        description: 'Tips dan trik mengecat dinding rumah agar hasilnya profesional dan tahan lama. Pelajari teknik pengecatan yang benar, pemilihan cat yang tepat, dan cara mendapatkan hasil akhir yang halus dan rata tanpa bekas kuas atau roller.',
        category: 'Pengecatan',
        difficulty: 'Pemula',
        duration: 30,
        imageUrl: 'https://images.unsplash.com/photo-1523250217488-ab35967e9840?w=800',
        materials: [
          { name: 'Cat tembok interior/eksterior', quantity: '1-2 kaleng (5 liter)', notes: 'Sesuaikan dengan luas dinding' },
          { name: 'Primer/cat dasar', quantity: '1 kaleng', notes: 'Untuk dinding baru atau yang bermasalah' },
          { name: 'Kuas cat ukuran 2-3 inch', quantity: '2 buah', notes: 'Untuk sudut dan detail' },
          { name: 'Roller bulu pendek + handle', quantity: '1 set', notes: 'Untuk permukaan luas' },
          { name: 'Baki cat/paint tray', quantity: '1 buah', notes: 'Tempat menuang cat' },
          { name: 'Masking tape/lakban kertas', quantity: '2 roll', notes: 'Untuk melindungi area yang tidak dicat' },
          { name: 'Plastik penutup/koran bekas', quantity: 'secukupnya', notes: 'Melindungi lantai dan furniture' },
          { name: 'Amplas halus (grit 180-220)', quantity: '5 lembar', notes: 'Untuk menghaluskan dinding' },
          { name: 'Dempul tembok', quantity: '1 kg', notes: 'Untuk menutup lubang atau retak' },
          { name: 'Spatula/pisau dempul', quantity: '1 buah', notes: 'Untuk mengaplikasikan dempul' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Persiapan Ruangan dan Perlindungan',
            description: 'Kosongkan ruangan sebisa mungkin atau pindahkan furniture ke tengah ruangan dan tutup dengan plastik. Lepaskan semua aksesori dinding seperti bingkai foto, jam dinding, dan stop kontak cover. Tutup lantai dengan plastik atau koran bekas, rekatkan dengan lakban agar tidak bergeser. Buka jendela untuk ventilasi yang baik. Gunakan masking tape untuk melindungi tepi plafon, kusen pintu/jendela, dan saklar listrik.',
            imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800',
            safetyNote: 'Pastikan ruangan memiliki ventilasi yang baik untuk menghindari menghirup uap cat berlebihan. Gunakan masker jika perlu.'
          },
          {
            stepNumber: 2,
            title: 'Bersihkan dan Perbaiki Permukaan Dinding',
            description: 'Bersihkan dinding dari debu, kotoran, dan sarang laba-laba menggunakan kemoceng atau kain lap. Periksa seluruh permukaan dinding untuk mencari lubang paku, retak, atau bagian yang tidak rata. Aplikasikan dempul tembok pada area yang bermasalah menggunakan spatula. Ratakan dempul hingga sejajar dengan permukaan dinding. Biarkan dempul mengering selama 2-4 jam (sesuai petunjuk kemasan). Setelah kering, amplas permukaan dempul hingga halus dan rata dengan dinding. Bersihkan debu hasil amplas dengan kain lap kering.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 3,
            title: 'Aplikasikan Primer/Cat Dasar',
            description: 'Jika dinding baru atau memiliki masalah (jamur, noda, atau warna gelap), aplikasikan primer terlebih dahulu. Aduk primer hingga rata. Tuang primer ke baki cat secukupnya. Gunakan kuas untuk mengecattepi dan sudut dinding terlebih dahulu (teknik "cutting in"). Kemudian gunakan roller untuk area luas dengan gerakan W atau M untuk distribusi yang merata. Aplikasikan primer dengan tipis dan rata. Biarkan primer mengering sempurna selama 4-6 jam atau sesuai petunjuk kemasan sebelum melanjutkan ke cat warna.',
            imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800'
          },
          {
            stepNumber: 4,
            title: 'Aplikasikan Lapisan Cat Pertama',
            description: 'Buka kaleng cat dan aduk perlahan hingga rata menggunakan tongkat pengaduk. Jangan mengaduk terlalu cepat karena bisa menimbulkan gelembung udara. Tuang cat ke baki cat secukupnya. Mulai dengan "cutting in" - gunakan kuas untuk mengecat tepi plafon, sudut ruangan, dan area sekitar kusen dengan hati-hati. Buat garis lurus sepanjang 5-7 cm dari tepi. Setelah cutting in selesai, gunakan roller untuk area luas. Celupkan roller ke cat, gulung di bagian miring baki untuk menghilangkan kelebihan cat. Cat dinding dengan pola W atau M, kemudian ratakan dengan gerakan vertikal dari atas ke bawah. Jaga tekanan roller tetap konsisten untuk hasil yang rata. Aplikasikan cat dengan tipis dan merata, jangan terlalu tebal. Biarkan lapisan pertama mengering sempurna selama 2-4 jam.',
            imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800'
          },
          {
            stepNumber: 5,
            title: 'Aplikasikan Lapisan Cat Kedua',
            description: 'Setelah lapisan pertama benar-benar kering (test dengan menyentuh area yang tidak terlihat), aplikasikan lapisan kedua dengan cara yang sama. Lapisan kedua akan memberikan warna yang lebih solid dan menutup area yang mungkin masih terlihat tidak rata. Perhatikan area yang mungkin terlewat atau kurang rata pada lapisan pertama. Aplikasikan cat dengan arah yang berbeda dari lapisan pertama untuk hasil yang lebih merata (jika lapisan pertama vertikal, lapisan kedua horizontal). Pastikan tidak ada bekas roller atau kuas yang terlihat.',
            imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800'
          },
          {
            stepNumber: 6,
            title: 'Lepaskan Masking Tape dan Finishing',
            description: 'Setelah lapisan terakhir diaplikasikan dan cat masih sedikit basah (tidak sepenuhnya kering), lepaskan masking tape dengan hati-hati. Tarik tape dengan sudut 45 derajat secara perlahan untuk menghindari cat ikut terkelupas. Jika ada cat yang menetes atau tidak rapi di tepi, perbaiki dengan kuas kecil. Biarkan cat mengering sempurna selama 24 jam sebelum mengembalikan furniture atau memasang aksesori dinding. Periksa hasil akhir di bawah cahaya yang baik untuk memastikan tidak ada area yang terlewat.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 7,
            title: 'Pembersihan Alat dan Perawatan',
            description: 'Bersihkan semua alat cat segera setelah selesai. Untuk cat water-based, cuci kuas dan roller dengan air sabun hingga bersih. Untuk cat oil-based, gunakan thinner. Peras dan keringkan roller, bentuk bulu kuas agar tetap rapi. Simpan sisa cat dalam kaleng tertutup rapat di tempat sejuk dan kering untuk touch-up di kemudian hari. Buang plastik penutup dan sampah cat dengan benar. Buka jendela untuk ventilasi hingga bau cat hilang sepenuhnya.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
            safetyNote: 'Jangan membuang sisa cat atau thinner ke saluran air. Buang sesuai peraturan limbah B3 di daerah Anda.'
          }
        ],
        author: 'Rina Wijaya',
        rating: 4.8,
        viewsCount: 1563,
        isActive: true,
        tags: ['cat', 'dinding', 'pengecatan', 'roller', 'kuas', 'primer', 'interior']
      },
      {
        title: 'Membuat Rak Dinding Kayu Sederhana',
        description: 'Proyek DIY membuat rak dinding kayu multifungsi untuk penyimpanan buku, dekorasi, atau barang-barang kecil. Tutorial ini cocok untuk pemula yang ingin belajar pertukangan kayu dasar dengan hasil yang fungsional dan estetis.',
        category: 'Pertukangan Kayu',
        difficulty: 'Menengah',
        duration: 60,
        imageUrl: 'https://images.unsplash.com/flagged/photo-1596715932857-56e359217a94?w=800',
        materials: [
          { name: 'Papan kayu pinus/jati ukuran 20x120 cm', quantity: '3 lembar', notes: 'Untuk rak utama, ketebalan 2 cm' },
          { name: 'Papan kayu untuk penyangga 5x120 cm', quantity: '2 lembar', notes: 'Untuk sisi kanan dan kiri' },
          { name: 'Sekrup kayu 4x40mm', quantity: '24 buah', notes: 'Untuk menyambung papan' },
          { name: 'Bracket/siku penyangga L', quantity: '6 buah', notes: 'Untuk menguatkan sambungan' },
          { name: 'Fischer dan sekrup dinding', quantity: '4 set', notes: 'Untuk memasang ke dinding' },
          { name: 'Lem kayu', quantity: '1 botol', notes: 'Untuk memperkuat sambungan' },
          { name: 'Cat/finishing kayu (opsional)', quantity: '1 kaleng kecil', notes: 'Sesuai selera warna' },
          { name: 'Amplas kayu grit 120 dan 220', quantity: '5 lembar', notes: 'Untuk menghaluskan permukaan' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Persiapan dan Ukur Kayu',
            description: 'Tentukan ukuran rak yang diinginkan sesuai dengan ruang yang tersedia. Ukuran standar yang umum adalah lebar 80-100 cm, tinggi 80-100 cm, dan kedalaman rak 20-25 cm. Ukur dan tandai semua potongan kayu yang dibutuhkan menggunakan pensil dan penggaris/meteran. Untuk rak 3 tingkat, Anda membutuhkan: 3 papan horizontal untuk rak (masing-masing 100 cm), 2 papan vertikal untuk sisi (masing-masing 80 cm). Periksa kembali semua ukuran sebelum memotong.',
            imageUrl: 'https://images.unsplash.com/photo-1603712725038-c1a92a3c74f6?w=800',
            safetyNote: 'Gunakan kacamata pelindung saat memotong kayu untuk melindungi mata dari serpihan.'
          },
          {
            stepNumber: 2,
            title: 'Potong Kayu Sesuai Ukuran',
            description: 'Gunakan gergaji tangan atau gergaji listrik untuk memotong kayu sesuai ukuran yang sudah ditandai. Pastikan potongan lurus dan rata dengan menggunakan penggaris sebagai panduan. Untuk hasil yang lebih presisi, gunakan meja gergaji atau minta bantuan toko kayu untuk memotongkan. Setelah dipotong, periksa semua potongan dan pastikan ukurannya sesuai. Tandai setiap potongan dengan pensil untuk memudahkan perakitan (misalnya: "rak atas", "sisi kanan", dll).',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 3,
            title: 'Haluskan Permukaan Kayu',
            description: 'Amplas semua permukaan kayu menggunakan amplas grit 120 terlebih dahulu untuk menghilangkan serat kayu yang kasar dan ketidakrataan. Amplas searah dengan serat kayu, bukan melawan serat. Setelah itu, lanjutkan dengan amplas grit 220 untuk hasil yang lebih halus. Perhatikan terutama pada bagian tepi dan sudut kayu yang biasanya lebih kasar. Bersihkan debu hasil amplas menggunakan kain lap atau kuas. Permukaan yang halus akan memudahkan proses finishing dan menghasilkan tampilan yang lebih profesional.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 4,
            title: 'Tandai Posisi Lubang Sekrup',
            description: 'Letakkan papan vertikal (sisi) di permukaan datar. Tandai posisi di mana papan horizontal (rak) akan dipasang. Untuk rak 3 tingkat dengan tinggi total 80 cm, buat tanda di ketinggian 0 cm (bawah), 40 cm (tengah), dan 80 cm (atas). Pada setiap tanda, buat 2-3 titik untuk lubang sekrup dengan jarak 3-4 cm dari tepi. Gunakan siku/penggaris untuk memastikan tanda sejajar dan lurus. Ulangi proses ini untuk papan vertikal yang satunya lagi.',
            imageUrl: 'https://images.unsplash.com/photo-1603712725038-c1a92a3c74f6?w=800'
          },
          {
            stepNumber: 5,
            title: 'Bor Lubang Pilot',
            description: 'Gunakan bor listrik dengan mata bor yang sedikit lebih kecil dari diameter sekrup (untuk sekrup 4mm, gunakan mata bor 3mm) untuk membuat lubang pilot. Lubang pilot ini mencegah kayu pecah saat sekrup dikencangkan. Bor lubang pada semua titik yang sudah ditandai dengan kedalaman sekitar 2/3 panjang sekrup. Pastikan bor tegak lurus dengan permukaan kayu. Bersihkan serbuk kayu dari lubang menggunakan kuas atau hembusan udara.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
            safetyNote: 'Pegang bor dengan kuat dan stabil. Jangan memaksa bor terlalu cepat agar tidak merusak kayu.'
          },
          {
            stepNumber: 6,
            title: 'Rakit Rangka Rak',
            description: 'Mulai merakit rak dengan meletakkan satu papan vertikal di permukaan datar. Aplikasikan lem kayu pada ujung papan horizontal yang akan disambung. Posisikan papan horizontal pada tanda yang sudah dibuat, pastikan rata dan sejajar. Kencangkan dengan sekrup melalui lubang pilot yang sudah dibuat. Gunakan obeng listrik dengan torsi yang tepat - jangan terlalu kencang agar kayu tidak pecah. Pasang semua 3 papan horizontal pada satu sisi terlebih dahulu. Setelah itu, pasang papan vertikal satunya pada ujung yang berlawanan dengan cara yang sama. Periksa dengan waterpass untuk memastikan rak rata dan tidak miring.',
            imageUrl: 'https://images.unsplash.com/photo-1603712725038-c1a92a3c74f6?w=800'
          },
          {
            stepNumber: 7,
            title: 'Pasang Bracket Penguat',
            description: 'Untuk menguatkan sambungan dan mencegah rak goyang, pasang bracket siku L di setiap sambungan antara papan horizontal dan vertikal. Posisikan bracket di bagian bawah rak (tidak terlihat dari depan). Tandai posisi lubang sekrup bracket pada kayu, bor lubang pilot kecil, lalu kencangkan bracket dengan sekrup. Pasang total 6 bracket (2 untuk setiap tingkat rak). Bracket ini sangat penting untuk kekuatan struktur, terutama jika rak akan menahan beban berat.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 8,
            title: 'Finishing dan Pengecatan (Opsional)',
            description: 'Jika menginginkan tampilan yang lebih menarik, aplikasikan finishing pada rak. Pilihan finishing antara lain: cat kayu (untuk warna solid), wood stain (untuk mempertahankan tekstur kayu), atau clear varnish (untuk tampilan natural). Amplas lagi permukaan dengan amplas halus grit 220 sebelum finishing. Aplikasikan finishing dengan kuas atau roller sesuai petunjuk produk. Biasanya membutuhkan 2-3 lapis dengan jeda pengeringan 2-4 jam antar lapis. Amplas halus antar lapis untuk hasil yang lebih smooth. Biarkan rak mengering sempurna selama 24 jam sebelum dipasang ke dinding.',
            imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800'
          },
          {
            stepNumber: 9,
            title: 'Pasang Rak ke Dinding',
            description: 'Tentukan posisi rak di dinding dengan menggunakan waterpass untuk memastikan rak horizontal. Tandai posisi lubang untuk fischer pada dinding. Bor dinding menggunakan bor beton dengan ukuran yang sesuai dengan fischer (biasanya 8-10mm). Masukkan fischer ke dalam lubang. Minta bantuan orang lain untuk menahan rak saat Anda mengencangkan sekrup fischer ke dinding melalui papan vertikal rak. Pasang minimal 2 titik pengait di setiap sisi (total 4 titik). Pastikan rak terpasang kuat dan tidak goyang. Test dengan memberikan beban bertahap.',
            imageUrl: 'https://images.unsplash.com/photo-1603712725038-c1a92a3c74f6?w=800',
            safetyNote: 'Pastikan rak dipasang pada dinding yang kuat (bukan gypsum tipis). Untuk dinding gypsum, gunakan anchor khusus gypsum atau pasang pada rangka kayu di balik gypsum.'
          },
          {
            stepNumber: 10,
            title: 'Pemeriksaan Akhir dan Perawatan',
            description: 'Setelah rak terpasang, lakukan pemeriksaan menyeluruh. Periksa semua sekrup apakah sudah kencang. Test kekuatan rak dengan memberikan beban secara bertahap. Bersihkan rak dari debu dan sisa pekerjaan. Untuk perawatan jangka panjang, bersihkan rak secara rutin dengan lap kering atau sedikit lembab. Hindari membebani rak melebihi kapasitas (maksimal 5-10 kg per tingkat untuk rak kayu standar). Periksa sekrup dinding setiap 6 bulan dan kencangkan jika ada yang longgar.',
            imageUrl: 'https://images.unsplash.com/photo-1603712725038-c1a92a3c74f6?w=800'
          }
        ],
        author: 'Budi Santoso',
        rating: 4.9,
        viewsCount: 2134,
        isActive: true,
        tags: ['rak', 'kayu', 'DIY', 'penyimpanan', 'furniture', 'pertukangan']
      },
      {
        title: 'Mengatasi Saluran Air Tersumbat',
        description: 'Panduan praktis mengatasi saluran air wastafel atau bak cuci yang tersumbat. Pelajari berbagai metode dari yang paling sederhana hingga yang membutuhkan alat khusus untuk membersihkan penyumbatan tanpa perlu memanggil tukang.',
        category: 'Plambing',
        difficulty: 'Pemula',
        duration: 25,
        imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800',
        materials: [
          { name: 'Plunger/pompa sedot', quantity: '1 buah', notes: 'Untuk menyedot penyumbatan' },
          { name: 'Soda kue/baking soda', quantity: '1/2 cup', notes: 'Pembersih alami' },
          { name: 'Cuka putih', quantity: '1/2 cup', notes: 'Reaksi dengan soda kue' },
          { name: 'Air panas', quantity: '1 liter', notes: 'Untuk membilas' },
          { name: 'Kawat pembersih saluran/snake drain', quantity: '1 buah', notes: 'Untuk penyumbatan dalam' },
          { name: 'Sarung tangan karet', quantity: '1 pasang', notes: 'Melindungi tangan' },
          { name: 'Ember', quantity: '1 buah', notes: 'Menampung air kotor' },
          { name: 'Kunci pipa (opsional)', quantity: '1 buah', notes: 'Jika perlu membuka siphon' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Identifikasi Penyebab Penyumbatan',
            description: 'Periksa gejala penyumbatan: apakah air mengalir sangat lambat, sama sekali tidak mengalir, atau ada bau tidak sedap. Lihat ke dalam lubang saluran dengan senter untuk melihat apakah ada benda asing yang terlihat (rambut, sisa makanan, dll). Periksa juga apakah penyumbatan hanya terjadi di satu wastafel atau di beberapa tempat (ini menandakan masalah pada pipa utama). Kenakan sarung tangan karet sebelum memulai pekerjaan.',
            imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800'
          },
          {
            stepNumber: 2,
            title: 'Metode 1: Bersihkan Saringan dan Stopper',
            description: 'Lepaskan saringan atau stopper yang ada di lubang saluran. Biasanya bisa diputar atau ditarik ke atas. Bersihkan rambut, sabun, atau kotoran yang menempel pada saringan. Gunakan sikat gigi bekas atau sikat kecil untuk membersihkan kotoran yang lengket. Bilas saringan dengan air panas. Pasang kembali saringan dan test apakah air sudah lancar. Metode ini efektif untuk penyumbatan ringan di permukaan.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 3,
            title: 'Metode 2: Gunakan Plunger',
            description: 'Jika air masih tersumbat, gunakan plunger. Tutup lubang overflow (lubang kecil di bagian atas wastafel) dengan lap basah agar tekanan tidak bocor. Isi wastafel dengan air secukupnya hingga menutupi bagian karet plunger (sekitar 5-10 cm). Letakkan plunger tepat di atas lubang saluran, pastikan menutupi sempurna. Pompa plunger dengan gerakan naik-turun yang kuat dan cepat sebanyak 15-20 kali. Jaga agar plunger tetap menempel rapat pada permukaan. Angkat plunger dengan cepat pada pompaan terakhir. Jika air mulai mengalir, ulangi proses ini 2-3 kali untuk memastikan penyumbatan benar-benar terangkat.',
            imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800',
            safetyNote: 'Jangan gunakan plunger jika baru saja menuangkan cairan pembersih kimia karena bisa memercik dan berbahaya.'
          },
          {
            stepNumber: 4,
            title: 'Metode 3: Soda Kue dan Cuka',
            description: 'Untuk penyumbatan yang disebabkan oleh lemak atau sabun, gunakan metode alami ini. Pastikan tidak ada air yang menggenang di wastafel (buang dulu jika ada). Tuangkan 1/2 cup soda kue ke dalam lubang saluran. Tuangkan 1/2 cup cuka putih ke dalam lubang yang sama. Akan terjadi reaksi berbusa - ini normal dan membantu mengangkat kotoran. Tutup lubang saluran dengan penutup atau lap basah selama 30 menit agar reaksi bekerja maksimal. Setelah 30 menit, siram dengan air panas (1-2 liter) secara perlahan. Ulangi proses ini jika perlu. Metode ini aman untuk pipa dan ramah lingkungan.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 5,
            title: 'Metode 4: Gunakan Snake Drain/Kawat Pembersih',
            description: 'Jika metode sebelumnya tidak berhasil, gunakan snake drain (kawat fleksibel pembersih saluran). Masukkan ujung kawat ke dalam lubang saluran secara perlahan. Putar handle kawat searah jarum jam sambil terus mendorong masuk. Jika terasa ada hambatan, putar kawat beberapa kali untuk menembus atau mengait penyumbatan. Setelah melewati penyumbatan atau mencapai kedalaman maksimal (biasanya 1-2 meter), tarik kawat keluar secara perlahan sambil tetap diputar. Bersihkan kotoran yang terangkat pada kawat. Ulangi proses ini 2-3 kali. Siram dengan air panas untuk membersihkan sisa kotoran.',
            imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800'
          },
          {
            stepNumber: 6,
            title: 'Metode 5: Buka dan Bersihkan Siphon',
            description: 'Jika semua metode di atas tidak berhasil, kemungkinan penyumbatan ada di siphon (pipa berbentuk U di bawah wastafel). Letakkan ember di bawah siphon untuk menampung air. Gunakan kunci pipa atau tangan (jika mur cukup longgar) untuk membuka mur pengikat siphon. Lepaskan siphon dengan hati-hati - akan ada air yang tumpah. Bersihkan isi siphon dari kotoran, rambut, atau benda asing. Bilas siphon dengan air bersih. Periksa juga pipa yang terhubung ke siphon. Pasang kembali siphon dan kencangkan mur dengan tangan, lalu kencangkan sedikit dengan kunci pipa (jangan terlalu kencang). Test apakah ada kebocoran dengan mengalirkan air.',
            imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800',
            safetyNote: 'Siapkan ember dan lap karena akan ada air kotor yang tumpah. Jangan kencangkan mur terlalu keras karena bisa merusak ulir.'
          },
          {
            stepNumber: 7,
            title: 'Pencegahan dan Perawatan Rutin',
            description: 'Untuk mencegah penyumbatan di masa depan, lakukan perawatan rutin: Pasang saringan rambut di lubang saluran. Buang sisa makanan ke tempat sampah, bukan ke wastafel. Siram saluran dengan air panas seminggu sekali. Gunakan metode soda kue + cuka sebulan sekali sebagai pembersih preventif. Hindari membuang minyak atau lemak ke saluran air. Bersihkan saringan secara rutin setiap minggu. Jika ada rambut panjang di rumah, bersihkan saringan lebih sering.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          }
        ],
        author: 'Dewi Lestari',
        rating: 4.6,
        viewsCount: 1876,
        isActive: true,
        tags: ['saluran', 'tersumbat', 'plambing', 'wastafel', 'perbaikan', 'drain']
      },
      {
        title: 'Mengganti Saklar Lampu yang Rusak',
        description: 'Tutorial lengkap mengganti saklar lampu yang rusak atau tidak berfungsi dengan baik. Pelajari cara membongkar saklar lama dan memasang saklar baru dengan aman sesuai standar kelistrikan.',
        category: 'Listrik',
        difficulty: 'Pemula',
        duration: 15,
        imageUrl: 'https://images.unsplash.com/photo-1623707430101-9e74cefe05e2?w=800',
        materials: [
          { name: 'Saklar lampu baru', quantity: '1 buah', notes: 'Pilih yang sesuai dengan tipe lama' },
          { name: 'Obeng tester/testpen', quantity: '1 buah', notes: 'Untuk mengecek arus listrik' },
          { name: 'Obeng plus dan minus', quantity: '1 set', notes: 'Untuk membuka saklar' },
          { name: 'Tang potong kecil', quantity: '1 buah', notes: 'Jika perlu memotong kabel' },
          { name: 'Isolasi listrik', quantity: '1 roll', notes: 'Untuk melindungi sambungan' },
          { name: 'Senter/lampu emergency', quantity: '1 buah', notes: 'Penerangan saat listrik mati' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Matikan Listrik dan Persiapan',
            description: 'Matikan MCB untuk area saklar yang akan diganti. Gunakan testpen untuk memastikan tidak ada arus listrik di saklar. Siapkan senter atau lampu emergency untuk penerangan. Foto posisi saklar lama sebelum dibongkar untuk referensi pemasangan. Siapkan semua alat dan saklar baru di dekat area kerja.',
            imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800',
            safetyNote: 'WAJIB matikan MCB dan pastikan tidak ada arus listrik dengan testpen sebelum menyentuh kabel.'
          },
          {
            stepNumber: 2,
            title: 'Lepaskan Cover Saklar',
            description: 'Lepaskan cover/penutup saklar dengan obeng. Biasanya ada 1-2 sekrup di bagian atas dan bawah. Simpan sekrup di tempat aman. Setelah cover terlepas, Anda akan melihat badan saklar yang terpasang di junction box.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 3,
            title: 'Lepaskan Saklar dari Junction Box',
            description: 'Lepaskan sekrup yang menahan saklar ke junction box (biasanya 2 sekrup di atas dan bawah). Tarik saklar keluar dengan hati-hati. Periksa kabel yang terhubung - biasanya ada 2 kabel (fase masuk dan fase keluar ke lampu). Catat posisi kabel atau foto untuk referensi.',
            imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800'
          },
          {
            stepNumber: 4,
            title: 'Lepaskan Kabel dari Saklar Lama',
            description: 'Kendurkan sekrup terminal pada saklar lama. Lepaskan kabel satu per satu dengan hati-hati. Jangan sampai kabel terlepas masuk ke dalam dinding. Periksa kondisi ujung kabel - jika sudah hitam atau rusak, potong sedikit dan kupas ulang.',
            imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800'
          },
          {
            stepNumber: 5,
            title: 'Pasang Kabel ke Saklar Baru',
            description: 'Masukkan ujung kabel ke terminal saklar baru sesuai posisi aslinya. Kencangkan sekrup terminal dengan kuat. Pastikan tidak ada bagian tembaga yang terlihat di luar terminal. Tarik sedikit kabel untuk memastikan sudah terpasang kuat.',
            imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800'
          },
          {
            stepNumber: 6,
            title: 'Pasang Saklar ke Junction Box dan Test',
            description: 'Masukkan saklar ke junction box dengan hati-hati. Kencangkan sekrup penahan saklar. Pasang kembali cover saklar. Nyalakan MCB dan test saklar apakah berfungsi dengan baik. Jika lampu menyala dan mati dengan normal, instalasi berhasil.',
            imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800',
            safetyNote: 'Jika saklar panas atau ada percikan saat dinyalakan, segera matikan MCB dan periksa kembali sambungan.'
          }
        ],
        author: 'Ahmad Fauzi',
        rating: 4.4,
        viewsCount: 1342,
        isActive: true,
        tags: ['saklar', 'listrik', 'lampu', 'perbaikan', 'switch']
      },
      {
        title: 'Merawat dan Mengasah Pisau Dapur',
        description: 'Panduan lengkap merawat dan mengasah pisau dapur agar tetap tajam dan awet. Pelajari teknik mengasah yang benar menggunakan batu asah dan cara perawatan rutin untuk menjaga ketajaman pisau.',
        category: 'Perawatan',
        difficulty: 'Pemula',
        duration: 20,
        imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800',
        materials: [
          { name: 'Batu asah (whetstone) grit 1000 dan 3000', quantity: '1 set', notes: 'Untuk mengasah pisau' },
          { name: 'Wadah air', quantity: '1 buah', notes: 'Untuk merendam batu asah' },
          { name: 'Handuk kecil', quantity: '2 buah', notes: 'Alas dan lap pisau' },
          { name: 'Kertas koran', quantity: 'beberapa lembar', notes: 'Untuk test ketajaman' },
          { name: 'Minyak mineral (opsional)', quantity: '1 botol kecil', notes: 'Untuk perawatan pisau' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Persiapan Batu Asah',
            description: 'Rendam batu asah dalam air bersih selama 10-15 menit hingga tidak ada gelembung udara yang keluar. Ini penting agar batu asah bekerja optimal. Letakkan handuk di meja sebagai alas agar batu asah tidak bergeser. Letakkan batu asah di atas handuk dengan sisi grit 1000 di atas (untuk pengasahan kasar terlebih dahulu).',
            imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800'
          },
          {
            stepNumber: 2,
            title: 'Tentukan Sudut Pengasahan',
            description: 'Sudut pengasahan yang ideal untuk pisau dapur adalah 15-20 derajat. Untuk pemula, bayangkan sudut sekitar 3 jari atau gunakan panduan: letakkan 2 koin di bawah punggung pisau untuk mendapatkan sudut yang tepat. Pegang pisau dengan tangan dominan dan stabilkan dengan tangan lainnya.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 3,
            title: 'Asah Sisi Pertama Pisau',
            description: 'Basahi permukaan batu asah dengan air. Letakkan pisau pada batu dengan sudut yang sudah ditentukan. Dorong pisau menjauhi tubuh dengan gerakan melengkung mengikuti bentuk mata pisau, dari pangkal hingga ujung. Berikan tekanan sedang dan konsisten. Ulangi gerakan ini 10-15 kali. Akan terbentuk bubur abu-abu di permukaan batu - ini normal dan membantu proses pengasahan. Tambahkan air jika batu mulai kering.',
            imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800',
            safetyNote: 'Selalu dorong pisau menjauhi tubuh, bukan ke arah tubuh. Jaga jari-jari agar tidak berada di jalur mata pisau.'
          },
          {
            stepNumber: 4,
            title: 'Asah Sisi Kedua Pisau',
            description: 'Balik pisau dan ulangi proses yang sama pada sisi lainnya dengan sudut yang sama. Pastikan jumlah gerakan sama dengan sisi pertama untuk hasil yang seimbang. Periksa ketajaman dengan hati-hati menyentuh mata pisau (jangan ditekan). Jika sudah terasa lebih tajam, lanjut ke langkah berikutnya.',
            imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800'
          },
          {
            stepNumber: 5,
            title: 'Finishing dengan Batu Halus',
            description: 'Balik batu asah ke sisi grit 3000 (sisi halus). Basahi permukaan dengan air. Ulangi proses pengasahan yang sama seperti sebelumnya, tetapi dengan tekanan lebih ringan. Lakukan 5-10 gerakan per sisi. Proses ini akan membuat mata pisau lebih halus dan tajam. Bilas pisau dengan air bersih dan keringkan.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 6,
            title: 'Test Ketajaman dan Perawatan',
            description: 'Test ketajaman pisau dengan memotong kertas koran secara vertikal - pisau yang tajam akan memotong dengan mulus tanpa merobek. Atau test dengan memotong tomat tanpa menekan - pisau tajam akan memotong kulit tomat dengan mudah. Setelah mengasah, cuci pisau dengan sabun dan air, keringkan segera. Simpan pisau di tempat yang aman (magnetic strip atau block pisau). Untuk perawatan, aplikasikan sedikit minyak mineral pada mata pisau jika tidak akan digunakan dalam waktu lama.',
            imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800'
          }
        ],
        author: 'Dewi Lestari',
        rating: 4.7,
        viewsCount: 2341,
        isActive: true,
        tags: ['pisau', 'dapur', 'perawatan', 'mengasah', 'maintenance', 'kitchen']
      },
      {
        title: 'Membuat Meja Lipat Dinding Sederhana',
        description: 'Proyek DIY membuat meja lipat yang menempel di dinding, cocok untuk ruangan kecil atau sebagai meja kerja tambahan. Meja ini bisa dilipat saat tidak digunakan untuk menghemat ruang.',
        category: 'Pertukangan Kayu',
        difficulty: 'Menengah',
        duration: 90,
        imageUrl: 'https://images.unsplash.com/photo-1698770531036-c627d35188f2?w=800',
        materials: [
          { name: 'Papan kayu multiplek 18mm ukuran 60x80cm', quantity: '1 lembar', notes: 'Untuk top meja' },
          { name: 'Papan kayu 5x10cm panjang 60cm', quantity: '2 batang', notes: 'Untuk penyangga dinding' },
          { name: 'Engsel pintu besar (heavy duty)', quantity: '2 buah', notes: 'Untuk mekanisme lipat' },
          { name: 'Rantai pengaman/stopper', quantity: '2 set', notes: 'Untuk menahan meja saat terbuka' },
          { name: 'Bracket lipat/folding bracket', quantity: '2 buah', notes: 'Penyangga kaki meja' },
          { name: 'Sekrup kayu 5x50mm', quantity: '20 buah', notes: 'Untuk sambungan' },
          { name: 'Fischer dan sekrup dinding 8mm', quantity: '8 set', notes: 'Untuk pasang ke dinding' },
          { name: 'Amplas dan cat/finishing', quantity: 'secukupnya', notes: 'Untuk finishing' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Ukur dan Potong Kayu',
            description: 'Tentukan ukuran meja sesuai kebutuhan (standar 60x80cm atau 70x90cm). Potong papan multiplek sesuai ukuran untuk top meja. Potong 2 batang kayu 5x10cm sepanjang lebar meja untuk penyangga dinding. Amplas semua permukaan dan tepi kayu hingga halus. Bulatkan sudut-sudut meja agar lebih aman.',
            imageUrl: 'https://images.unsplash.com/photo-1603712725038-c1a92a3c74f6?w=800',
            safetyNote: 'Gunakan kacamata pelindung saat memotong dan mengamplas kayu.'
          },
          {
            stepNumber: 2,
            title: 'Pasang Penyangga Dinding',
            description: 'Tandai posisi penyangga di dinding dengan ketinggian yang nyaman (biasanya 75-80cm dari lantai untuk meja kerja). Gunakan waterpass untuk memastikan penyangga horizontal. Bor lubang untuk fischer pada dinding. Pasang fischer dan kencangkan penyangga pertama ke dinding dengan sekrup. Pasang penyangga kedua di bawahnya dengan jarak sekitar 15-20cm. Pastikan kedua penyangga kuat dan tidak goyang.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 3,
            title: 'Pasang Engsel pada Top Meja',
            description: 'Letakkan top meja dengan posisi terbalik. Tandai posisi engsel di tepi belakang meja (yang akan menempel di dinding). Pasang 2 engsel dengan jarak sekitar 15-20cm dari tepi kanan dan kiri. Bor lubang pilot terlebih dahulu agar kayu tidak pecah. Kencangkan engsel dengan sekrup yang kuat.',
            imageUrl: 'https://images.unsplash.com/photo-1603712725038-c1a92a3c74f6?w=800'
          },
          {
            stepNumber: 4,
            title: 'Pasang Meja ke Penyangga Dinding',
            description: 'Minta bantuan orang lain untuk menahan meja. Posisikan meja dengan engsel menempel pada penyangga dinding atas. Tandai posisi lubang engsel pada penyangga. Bor lubang pilot dan kencangkan engsel ke penyangga dengan sekrup. Test mekanisme lipat - meja harus bisa dilipat ke atas dan ke bawah dengan smooth.',
            imageUrl: 'https://images.unsplash.com/photo-1603712725038-c1a92a3c74f6?w=800'
          },
          {
            stepNumber: 5,
            title: 'Pasang Bracket Penyangga Kaki',
            description: 'Pasang folding bracket di bagian bawah meja, sekitar 10-15cm dari tepi depan. Bracket ini akan menjadi kaki penyangga saat meja dibuka. Pasang 2 bracket dengan jarak yang sama dari tepi kanan dan kiri. Pastikan bracket bisa dilipat dengan baik dan mengunci saat dibuka penuh.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 6,
            title: 'Pasang Rantai Pengaman',
            description: 'Pasang rantai pengaman di kedua sisi meja untuk membatasi sudut buka dan mencegah meja terbuka terlalu jauh. Satu ujung rantai dipasang di bagian bawah meja, ujung lainnya di penyangga dinding bawah. Atur panjang rantai agar meja terbuka pada sudut 90 derajat (horizontal). Rantai ini juga berfungsi sebagai pengaman tambahan jika bracket gagal.',
            imageUrl: 'https://images.unsplash.com/photo-1603712725038-c1a92a3c74f6?w=800',
            safetyNote: 'Rantai pengaman sangat penting untuk keamanan. Pastikan terpasang kuat dan tidak mudah lepas.'
          },
          {
            stepNumber: 7,
            title: 'Finishing dan Test Beban',
            description: 'Amplas seluruh permukaan meja sekali lagi. Aplikasikan cat atau finishing sesuai selera (cat, wood stain, atau varnish). Biarkan kering sempurna selama 24 jam. Test mekanisme lipat beberapa kali. Test beban meja secara bertahap - mulai dari 5kg, 10kg, hingga maksimal 20-25kg. Periksa semua sekrup dan pastikan tidak ada yang longgar. Meja lipat siap digunakan!',
            imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800'
          }
        ],
        author: 'Budi Santoso',
        rating: 4.8,
        viewsCount: 1789,
        isActive: true,
        tags: ['meja', 'lipat', 'kayu', 'DIY', 'space-saving', 'furniture']
      },
      {
        title: 'Mengecat Ulang Pagar Besi yang Berkarat',
        description: 'Panduan lengkap mengecat ulang pagar besi yang sudah berkarat agar tampak baru kembali. Pelajari teknik menghilangkan karat, priming, dan pengecatan yang benar untuk hasil tahan lama.',
        category: 'Pengecatan',
        difficulty: 'Menengah',
        duration: 45,
        imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800',
        materials: [
          { name: 'Sikat kawat/wire brush', quantity: '1 buah', notes: 'Untuk menghilangkan karat' },
          { name: 'Amplas besi grit 80 dan 120', quantity: '10 lembar', notes: 'Untuk menghaluskan permukaan' },
          { name: 'Cairan penghilang karat/rust remover', quantity: '1 botol', notes: 'Untuk karat yang membandel' },
          { name: 'Cat primer anti karat', quantity: '1 kaleng', notes: 'Lapisan dasar pelindung' },
          { name: 'Cat besi/metal paint', quantity: '2 kaleng', notes: 'Sesuai warna yang diinginkan' },
          { name: 'Kuas cat 2-3 inch', quantity: '2 buah', notes: 'Untuk aplikasi cat' },
          { name: 'Thinner', quantity: '1 liter', notes: 'Untuk membersihkan kuas' },
          { name: 'Kain lap dan sarung tangan', quantity: 'secukupnya', notes: 'Perlindungan dan pembersihan' },
          { name: 'Masker dan kacamata', quantity: '1 set', notes: 'Perlindungan diri' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Bersihkan dan Hilangkan Karat',
            description: 'Gunakan sikat kawat untuk menggosok seluruh permukaan pagar yang berkarat. Gosok dengan kuat hingga karat terkelupas. Untuk karat yang membandel, aplikasikan cairan penghilang karat, diamkan 10-15 menit, lalu gosok kembali. Bersihkan debu dan serpihan karat dengan lap kering. Untuk hasil maksimal, gunakan amplas grit 80 untuk mengamplas area yang masih kasar.',
            imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800',
            safetyNote: 'Gunakan masker dan kacamata untuk melindungi dari debu karat yang berbahaya jika terhirup.'
          },
          {
            stepNumber: 2,
            title: 'Haluskan Permukaan',
            description: 'Setelah karat hilang, amplas seluruh permukaan pagar dengan amplas grit 120 untuk menghaluskan. Fokus pada area yang tidak rata atau masih kasar. Bersihkan debu hasil amplas dengan lap basah, lalu keringkan sempurna. Permukaan harus benar-benar bersih dan kering sebelum dicat.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 3,
            title: 'Aplikasikan Primer Anti Karat',
            description: 'Aduk cat primer hingga rata. Aplikasikan primer dengan kuas pada seluruh permukaan pagar. Pastikan semua bagian terlapisi, terutama area yang sebelumnya berkarat. Aplikasikan dengan tipis dan merata. Primer berfungsi sebagai pelindung dan membantu cat menempel lebih baik. Biarkan primer mengering sempurna selama 4-6 jam atau sesuai petunjuk kemasan.',
            imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800'
          },
          {
            stepNumber: 4,
            title: 'Aplikasikan Cat Lapisan Pertama',
            description: 'Setelah primer kering, aduk cat besi hingga rata. Aplikasikan cat lapisan pertama dengan kuas. Gunakan gerakan searah untuk hasil yang rapi. Pastikan semua bagian terlapisi, termasuk sudut dan celah. Jangan aplikasikan terlalu tebal agar tidak menetes. Biarkan mengering selama 6-8 jam.',
            imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800'
          },
          {
            stepNumber: 5,
            title: 'Aplikasikan Cat Lapisan Kedua',
            description: 'Setelah lapisan pertama kering, amplas halus dengan amplas grit 220 untuk hasil yang lebih smooth. Bersihkan debu. Aplikasikan lapisan cat kedua dengan cara yang sama. Lapisan kedua akan memberikan warna yang lebih solid dan perlindungan ekstra. Biarkan mengering sempurna selama 24 jam sebelum pagar digunakan.',
            imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800'
          },
          {
            stepNumber: 6,
            title: 'Finishing dan Perawatan',
            description: 'Periksa hasil akhir di bawah cahaya yang baik. Jika ada area yang kurang rata, aplikasikan touch-up cat. Bersihkan semua alat dengan thinner. Untuk perawatan, bersihkan pagar secara rutin dan periksa kondisi cat setiap 6 bulan. Jika ada karat baru, segera bersihkan dan cat ulang area tersebut sebelum menyebar.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          }
        ],
        author: 'Rina Wijaya',
        rating: 4.5,
        viewsCount: 1456,
        isActive: true,
        tags: ['cat', 'pagar', 'besi', 'karat', 'pengecatan', 'metal']
      },
      {
        title: 'Membersihkan dan Merawat AC Split',
        description: 'Tutorial perawatan rutin AC split agar tetap dingin dan hemat listrik. Pelajari cara membersihkan filter, evaporator, dan komponen lainnya untuk performa optimal AC.',
        category: 'Perawatan',
        difficulty: 'Pemula',
        duration: 30,
        imageUrl: 'https://images.unsplash.com/photo-1762341123870-d706f257a12e?w=800',
        materials: [
          { name: 'Obeng plus dan minus', quantity: '1 set', notes: 'Untuk membuka cover AC' },
          { name: 'Sikat halus/kuas cat', quantity: '2 buah', notes: 'Untuk membersihkan filter' },
          { name: 'Vacuum cleaner', quantity: '1 buah', notes: 'Untuk menyedot debu' },
          { name: 'Spray pembersih AC/AC cleaner', quantity: '1 botol', notes: 'Untuk membersihkan evaporator' },
          { name: 'Lap microfiber', quantity: '3 buah', notes: 'Untuk membersihkan body AC' },
          { name: 'Air sabun', quantity: 'secukupnya', notes: 'Untuk mencuci filter' },
          { name: 'Tangga lipat', quantity: '1 buah', notes: 'Untuk menjangkau AC' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Matikan AC dan Persiapan',
            description: 'Matikan AC dan cabut kabel power dari stop kontak untuk keamanan. Tunggu 5-10 menit agar komponen AC tidak panas. Siapkan tangga lipat untuk menjangkau unit indoor AC. Siapkan semua alat dan bahan di dekat area kerja. Letakkan koran atau plastik di bawah AC untuk menampung kotoran yang jatuh.',
            imageUrl: 'https://images.unsplash.com/photo-1631545806609-7e7c0c3f0c7e?w=800',
            safetyNote: 'Pastikan AC benar-benar mati dan kabel tercabut sebelum membuka cover untuk menghindari sengatan listrik.'
          },
          {
            stepNumber: 2,
            title: 'Buka Cover dan Lepaskan Filter',
            description: 'Buka cover depan AC dengan mengangkat ke atas atau sesuai petunjuk model AC. Lepaskan filter udara yang biasanya berbentuk jaring plastik. Kebanyakan filter bisa dilepas dengan menarik ke bawah atau ke depan. Jika ada 2 filter, lepaskan keduanya. Periksa kondisi filter - jika sangat kotor atau rusak, pertimbangkan untuk mengganti dengan yang baru.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 3,
            title: 'Bersihkan Filter',
            description: 'Bawa filter ke luar atau kamar mandi. Gunakan vacuum cleaner untuk menyedot debu kasar terlebih dahulu. Cuci filter dengan air mengalir dan sabun. Gunakan sikat halus untuk menggosok kotoran yang membandel. Bilas hingga bersih. Keringkan filter dengan cara diangin-anginkan (jangan dijemur langsung di bawah matahari). Pastikan filter benar-benar kering sebelum dipasang kembali.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 4,
            title: 'Bersihkan Evaporator/Cooling Coil',
            description: 'Setelah filter dilepas, Anda akan melihat evaporator (sirip-sirip logam). Gunakan vacuum cleaner dengan attachment brush untuk menyedot debu di sela-sela sirip. Semprotkan AC cleaner pada evaporator secara merata. Biarkan selama 10-15 menit agar cairan pembersih bekerja melarutkan kotoran. Cairan akan menetes ke drain pan dan keluar melalui selang pembuangan. Jangan dibilas dengan air.',
            imageUrl: 'https://images.unsplash.com/photo-1631545806609-7e7c0c3f0c7e?w=800'
          },
          {
            stepNumber: 5,
            title: 'Bersihkan Body dan Komponen Lain',
            description: 'Lap body AC bagian dalam dan luar dengan lap microfiber yang sedikit lembab. Bersihkan kipas blower (jika terlihat) dengan kuas halus. Bersihkan sensor suhu dan remote sensor. Periksa drain pan (bak penampung air) di bagian bawah - jika ada air menggenang atau lumut, bersihkan dengan lap. Periksa selang pembuangan apakah tersumbat.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 6,
            title: 'Pasang Kembali dan Test',
            description: 'Setelah filter benar-benar kering, pasang kembali filter ke posisi semula. Pastikan terpasang dengan benar dan tidak miring. Tutup cover AC hingga terkunci dengan baik. Colokkan kembali kabel power. Nyalakan AC dan test apakah berfungsi normal. Periksa apakah udara yang keluar lebih dingin dan segar. Periksa apakah ada suara aneh atau bau tidak sedap.',
            imageUrl: 'https://images.unsplash.com/photo-1631545806609-7e7c0c3f0c7e?w=800'
          },
          {
            stepNumber: 7,
            title: 'Jadwal Perawatan Rutin',
            description: 'Untuk performa optimal, bersihkan filter AC setiap 2 minggu sekali (lebih sering jika lingkungan berdebu). Bersihkan evaporator setiap 1-2 bulan. Panggil teknisi profesional untuk service lengkap setiap 6 bulan sekali, termasuk pengecekan freon, pembersihan outdoor unit, dan pengecekan komponen elektrik. Catat jadwal perawatan untuk reminder.',
            imageUrl: 'https://images.unsplash.com/photo-1631545806609-7e7c0c3f0c7e?w=800'
          }
        ],
        author: 'Dewi Lestari',
        rating: 4.8,
        viewsCount: 3124,
        isActive: true,
        tags: ['AC', 'perawatan', 'maintenance', 'filter', 'cleaning']
      },
      {
        title: 'Memasang Gantungan Dinding untuk TV',
        description: 'Panduan lengkap memasang bracket TV di dinding dengan aman. Pelajari cara memilih bracket yang tepat, menemukan titik kuat di dinding, dan memasang TV dengan aman.',
        category: 'Pertukangan Kayu',
        difficulty: 'Menengah',
        duration: 40,
        imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800',
        materials: [
          { name: 'Bracket/mounting TV sesuai ukuran TV', quantity: '1 set', notes: 'Pilih yang sesuai VESA TV' },
          { name: 'Bor listrik dan mata bor beton 10mm', quantity: '1 set', notes: 'Untuk membuat lubang di dinding' },
          { name: 'Fischer/anchor dinding 10mm', quantity: '4-6 buah', notes: 'Sesuai jumlah lubang bracket' },
          { name: 'Sekrup beton', quantity: '4-6 buah', notes: 'Untuk mengencangkan bracket' },
          { name: 'Waterpass/level', quantity: '1 buah', notes: 'Memastikan bracket horizontal' },
          { name: 'Meteran dan pensil', quantity: '1 set', notes: 'Untuk mengukur dan menandai' },
          { name: 'Kunci pas dan obeng', quantity: '1 set', notes: 'Untuk memasang bracket ke TV' },
          { name: 'Stud finder (opsional)', quantity: '1 buah', notes: 'Mencari rangka dinding' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Pilih Lokasi dan Ukur',
            description: 'Tentukan lokasi pemasangan TV dengan mempertimbangkan: jarak pandang (idealnya 1.5-2x diagonal TV), ketinggian (bagian tengah TV sejajar mata saat duduk, sekitar 100-120cm dari lantai), dan akses ke stop kontak dan port kabel. Gunakan stud finder untuk mencari rangka dinding atau tiang beton - ini adalah titik terkuat untuk menahan beban TV. Tandai posisi bracket dengan pensil.',
            imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800',
            safetyNote: 'Pastikan dinding cukup kuat untuk menahan berat TV. Dinding gypsum tipis tidak cocok tanpa rangka penguat.'
          },
          {
            stepNumber: 2,
            title: 'Tandai Posisi Lubang Bor',
            description: 'Tempelkan bracket dinding pada posisi yang sudah ditentukan. Gunakan waterpass untuk memastikan bracket benar-benar horizontal. Minta bantuan orang lain untuk menahan bracket. Tandai posisi semua lubang bor dengan pensil. Lepaskan bracket dan periksa kembali tanda - pastikan semuanya sejajar dan simetris.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 3,
            title: 'Bor Lubang di Dinding',
            description: 'Gunakan bor beton dengan mata bor 10mm (sesuai ukuran fischer). Bor lubang pada setiap tanda dengan kedalaman sekitar 6-8cm. Pastikan bor tegak lurus dengan dinding. Bersihkan debu dari lubang menggunakan vacuum cleaner atau hembusan udara. Masukkan fischer ke dalam setiap lubang hingga rata dengan permukaan dinding. Ketuk dengan palu jika perlu.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
            safetyNote: 'Gunakan kacamata pelindung saat mengebor untuk melindungi mata dari debu dan serpihan.'
          },
          {
            stepNumber: 4,
            title: 'Pasang Bracket ke Dinding',
            description: 'Posisikan bracket dinding pada lubang yang sudah dibuat. Minta bantuan orang lain untuk menahan bracket. Masukkan sekrup beton ke setiap lubang dan kencangkan secara bertahap - jangan kencangkan satu sekrup penuh terlebih dahulu, tapi kencangkan semua secara bergantian agar bracket rata. Setelah semua sekrup terpasang, kencangkan dengan kuat. Periksa dengan waterpass sekali lagi. Test kekuatan bracket dengan menarik - harus benar-benar kuat dan tidak goyang.',
            imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800'
          },
          {
            stepNumber: 5,
            title: 'Pasang Bracket ke TV',
            description: 'Letakkan TV dengan layar menghadap ke bawah di atas permukaan yang lembut (kasur atau sofa dengan selimut) untuk melindungi layar. Cari lubang VESA di bagian belakang TV (biasanya berbentuk persegi dengan 4 lubang). Pasang bracket arm ke TV menggunakan sekrup yang disediakan dalam paket bracket. Kencangkan dengan kuat tetapi jangan terlalu keras. Pastikan bracket terpasang rata dan kuat.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 6,
            title: 'Gantung TV ke Bracket Dinding',
            description: 'Ini langkah yang memerlukan 2-3 orang. Angkat TV dengan hati-hati. Kaitkan bracket arm TV ke bracket dinding. Biasanya ada sistem hook atau sliding yang perlu dikaitkan dengan benar. Dengarkan bunyi "klik" yang menandakan TV sudah terkunci. Pastikan TV tergantung dengan aman sebelum melepaskan pegangan. Atur sudut TV jika bracket memiliki fitur tilt atau swivel.',
            imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800',
            safetyNote: 'Jangan melepaskan TV sebelum benar-benar yakin sudah terkunci dengan aman. Minta bantuan minimal 2 orang untuk TV di atas 40 inch.'
          },
          {
            stepNumber: 7,
            title: 'Rapikan Kabel dan Test Final',
            description: 'Sambungkan semua kabel (power, HDMI, antena) ke TV. Gunakan cable management atau klip kabel untuk merapikan kabel agar tidak menggantung. Nyalakan TV dan test apakah berfungsi normal. Periksa apakah TV terpasang dengan kuat - coba goyang sedikit (hati-hati). Periksa apakah sudut pandang sudah sesuai. Bersihkan area kerja dari debu dan sisa bor.',
            imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800'
          }
        ],
        author: 'Budi Santoso',
        rating: 4.9,
        viewsCount: 2876,
        isActive: true,
        tags: ['TV', 'bracket', 'mounting', 'dinding', 'instalasi']
      },
      {
        title: 'Memperbaiki Toilet yang Terus Mengalir',
        description: 'Panduan mengatasi masalah toilet yang terus mengalir atau bocor. Pelajari cara memperbaiki flush valve, fill valve, dan flapper untuk menghemat air dan tagihan.',
        category: 'Plambing',
        difficulty: 'Pemula',
        duration: 30,
        imageUrl: 'https://images.unsplash.com/photo-1656646523710-eec180420c2f?w=800',
        materials: [
          { name: 'Flapper/karet penutup flush valve baru', quantity: '1 buah', notes: 'Sesuai model toilet' },
          { name: 'Fill valve baru (jika perlu)', quantity: '1 buah', notes: 'Cadangan jika rusak' },
          { name: 'Tang adjustable', quantity: '1 buah', notes: 'Untuk membuka mur' },
          { name: 'Obeng plus dan minus', quantity: '1 set', notes: 'Untuk adjustment' },
          { name: 'Spons dan lap', quantity: '2 buah', notes: 'Untuk membersihkan' },
          { name: 'Ember', quantity: '1 buah', notes: 'Menampung air' },
          { name: 'Sikat kecil', quantity: '1 buah', notes: 'Membersihkan komponen' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Identifikasi Masalah',
            description: 'Buka tutup tangki toilet. Periksa apakah air terus mengalir ke dalam bowl atau terus mengisi tangki. Jika air terus mengalir ke bowl, masalahnya ada di flapper atau flush valve. Jika tangki terus terisi dan air keluar melalui overflow tube, masalahnya ada di fill valve atau float. Dengarkan suara air mengalir untuk membantu identifikasi.',
            imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800'
          },
          {
            stepNumber: 2,
            title: 'Matikan Air dan Kuras Tangki',
            description: 'Putar katup air di belakang toilet searah jarum jam untuk menutup. Flush toilet untuk mengosongkan air di tangki. Gunakan spons untuk menyerap sisa air yang tidak bisa dikuras. Bersihkan bagian dalam tangki dari kotoran atau kerak.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 3,
            title: 'Periksa dan Ganti Flapper',
            description: 'Periksa flapper (karet penutup di dasar tangki). Jika sudah keras, retak, atau tidak menutup rapat, ganti dengan yang baru. Lepaskan flapper lama dari chain dan dari pin di sisi flush valve. Bersihkan area flush valve seat dari kotoran. Pasang flapper baru dengan mengaitkan ke pin dan sambungkan chain. Atur panjang chain agar tidak terlalu kendur atau tegang - sisakan sedikit slack sekitar 1-2cm.',
            imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800'
          },
          {
            stepNumber: 4,
            title: 'Adjust Fill Valve dan Float',
            description: 'Periksa fill valve (komponen yang mengisi air ke tangki). Atur ketinggian float agar water level berhenti sekitar 2-3cm di bawah overflow tube. Cara adjust berbeda per model: ada yang diputar, ada yang dipencet dan digeser. Pastikan float bergerak bebas dan tidak tersangkut. Jika fill valve rusak atau bocor, ganti dengan yang baru.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 5,
            title: 'Test dan Fine Tuning',
            description: 'Buka kembali katup air perlahan. Biarkan tangki terisi. Perhatikan apakah air berhenti saat mencapai level yang tepat. Flush toilet dan perhatikan apakah flapper menutup dengan baik setelah flush. Jika masih ada masalah, adjust kembali chain atau float. Periksa apakah ada kebocoran di sambungan.',
            imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800'
          },
          {
            stepNumber: 6,
            title: 'Pemeriksaan Akhir',
            description: 'Tutup kembali tangki toilet. Test flush beberapa kali untuk memastikan berfungsi normal. Periksa apakah ada suara air mengalir setelah tangki penuh - jika tidak ada, perbaikan berhasil. Bersihkan area kerja. Catat tanggal perbaikan untuk referensi maintenance di masa depan.',
            imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800'
          }
        ],
        author: 'Dewi Lestari',
        rating: 4.6,
        viewsCount: 2145,
        isActive: true,
        tags: ['toilet', 'plambing', 'bocor', 'flush', 'perbaikan']
      },
      {
        title: 'Mengganti Lampu LED Plafon',
        description: 'Tutorial mengganti lampu LED plafon yang mati atau redup. Pelajari cara melepas lampu lama dan memasang lampu LED baru dengan aman.',
        category: 'Listrik',
        difficulty: 'Pemula',
        duration: 15,
        imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800',
        materials: [
          { name: 'Lampu LED plafon baru', quantity: '1 buah', notes: 'Sesuai ukuran dan watt yang dibutuhkan' },
          { name: 'Tangga lipat', quantity: '1 buah', notes: 'Untuk menjangkau plafon' },
          { name: 'Obeng plus dan minus', quantity: '1 set', notes: 'Untuk membuka fitting' },
          { name: 'Testpen', quantity: '1 buah', notes: 'Mengecek arus listrik' },
          { name: 'Sarung tangan karet', quantity: '1 pasang', notes: 'Perlindungan' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Matikan Listrik dan Persiapan',
            description: 'Matikan saklar lampu dan MCB untuk area tersebut. Tunggu beberapa menit agar lampu tidak panas. Siapkan tangga lipat di bawah lampu. Gunakan testpen untuk memastikan tidak ada arus listrik di fitting lampu.',
            imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800',
            safetyNote: 'Pastikan MCB benar-benar mati dan tidak ada arus listrik sebelum menyentuh fitting lampu.'
          },
          {
            stepNumber: 2,
            title: 'Lepaskan Lampu Lama',
            description: 'Untuk lampu LED panel: lepaskan cover/diffuser dengan menekan klip pengait atau memutar sesuai model. Lepaskan lampu dari fitting dengan memutar atau menarik konektor. Untuk lampu LED downlight: putar lampu berlawanan arah jarum jam atau tekan klip pegas untuk melepaskan. Turunkan lampu dengan hati-hati.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 3,
            title: 'Periksa Fitting dan Kabel',
            description: 'Periksa kondisi fitting dan kabel. Jika ada kabel yang terkelupas atau fitting yang rusak, perbaiki terlebih dahulu. Bersihkan fitting dari debu. Periksa apakah ada tanda-tanda terbakar atau korsleting.',
            imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800'
          },
          {
            stepNumber: 4,
            title: 'Pasang Lampu LED Baru',
            description: 'Sambungkan konektor lampu LED baru ke fitting. Pastikan terpasang dengan kuat. Untuk downlight, masukkan lampu ke lubang plafon dan tekan klip pegas hingga terkunci. Untuk panel LED, pasang lampu ke bracket lalu pasang kembali cover/diffuser.',
            imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800'
          },
          {
            stepNumber: 5,
            title: 'Test Lampu',
            description: 'Nyalakan kembali MCB dan saklar lampu. Test apakah lampu menyala dengan normal. Periksa apakah ada kedipan atau suara aneh. Jika lampu tidak menyala, matikan kembali MCrik dan periksa sambungan. Jika sudah menyala normal, perbaikan selesai.',
            imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800'
          }
        ],
        author: 'Ahmad Fauzi',
        rating: 4.3,
        viewsCount: 1678,
        isActive: true,
        tags: ['lampu', 'LED', 'listrik', 'plafon', 'ganti']
      },
      {
        title: 'Membuat Kotak Penyimpanan dari Kayu Palet',
        description: 'Proyek DIY membuat kotak penyimpanan multifungsi dari kayu palet bekas. Ramah lingkungan, murah, dan bisa disesuaikan dengan kebutuhan.',
        category: 'Pertukangan Kayu',
        difficulty: 'Pemula',
        duration: 50,
        imageUrl: 'https://images.unsplash.com/photo-1607437817193-3b3b029b5b75?w=800',
        materials: [
          { name: 'Kayu palet bekas', quantity: '2-3 buah', notes: 'Pilih yang masih kuat dan tidak lapuk' },
          { name: 'Paku atau sekrup kayu', quantity: '50 buah', notes: 'Untuk menyambung kayu' },
          { name: 'Lem kayu', quantity: '1 botol', notes: 'Memperkuat sambungan' },
          { name: 'Amplas kayu grit 80 dan 120', quantity: '10 lembar', notes: 'Menghaluskan kayu' },
          { name: 'Cat atau wood stain (opsional)', quantity: '1 kaleng kecil', notes: 'Untuk finishing' },
          { name: 'Roda furniture (opsional)', quantity: '4 buah', notes: 'Agar mudah dipindah' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Bongkar dan Pilah Kayu Palet',
            description: 'Bongkar kayu palet dengan hati-hati menggunakan palu dan linggis. Pisahkan papan-papan kayu yang masih bagus. Buang papan yang retak atau lapuk. Cabut semua paku yang tersisa menggunakan tang. Pilih papan dengan ukuran yang seragam untuk memudahkan pembuatan kotak.',
            imageUrl: 'https://images.unsplash.com/photo-1603712725038-c1a92a3c74f6?w=800',
            safetyNote: 'Gunakan sarung tangan saat membongkar palet untuk melindungi tangan dari serpihan dan paku.'
          },
          {
            stepNumber: 2,
            title: 'Bersihkan dan Amplas Kayu',
            description: 'Bersihkan semua papan kayu dari kotoran dan debu. Amplas seluruh permukaan kayu dengan amplas grit 80 untuk menghilangkan bagian yang kasar. Lanjutkan dengan amplas grit 120 untuk hasil yang lebih halus. Fokus pada tepi dan sudut yang tajam. Bersihkan debu hasil amplas.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 3,
            title: 'Ukur dan Potong Kayu',
            description: 'Tentukan ukuran kotak yang diinginkan (contoh: 50x40x30cm). Ukur dan tandai kayu untuk: 2 papan untuk sisi panjang, 2 papan untuk sisi pendek, beberapa papan untuk dasar, dan beberapa papan untuk sisi (vertikal). Potong kayu sesuai ukuran menggunakan gergaji. Pastikan potongan rata dan siku.',
            imageUrl: 'https://images.unsplash.com/photo-1603712725038-c1a92a3c74f6?w=800'
          },
          {
            stepNumber: 4,
            title: 'Rakit Dasar Kotak',
            description: 'Susun papan-papan untuk dasar kotak secara berdampingan. Sambungkan dengan 2 batang kayu melintang di bagian bawah sebagai penguat. Gunakan lem kayu dan paku/sekrup untuk menyambung. Pastikan dasar rata dan kuat.',
            imageUrl: 'https://images.unsplash.com/photo-1603712725038-c1a92a3c74f6?w=800'
          },
          {
            stepNumber: 5,
            title: 'Pasang Sisi Kotak',
            description: 'Pasang papan sisi panjang di kedua sisi dasar. Kencangkan dengan paku/sekrup dan lem kayu. Pasang papan sisi pendek di kedua ujung. Pastikan semua sudut siku 90 derajat. Tambahkan papan vertikal di keempat sudut untuk memperkuat struktur.',
            imageUrl: 'https://images.unsplash.com/photo-1603712725038-c1a92a3c74f6?w=800'
          },
          {
            stepNumber: 6,
            title: 'Finishing dan Tambahan',
            description: 'Amplas kembali seluruh permukaan kotak. Aplikasikan cat atau wood stain sesuai selera. Biarkan kering sempurna. Jika ingin menambahkan roda, pasang di keempat sudut bagian bawah. Kotak penyimpanan siap digunakan untuk mainan, buku, atau barang lainnya.',
            imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800'
          }
        ],
        author: 'Budi Santoso',
        rating: 4.7,
        viewsCount: 1923,
        isActive: true,
        tags: ['kotak', 'palet', 'kayu', 'DIY', 'penyimpanan', 'recycle']
      },
      {
        title: 'Perawatan Rutin Alat Pertukangan',
        description: 'Panduan lengkap merawat alat-alat pertukangan agar awet dan siap pakai. Pelajari cara membersihkan, melumasi, dan menyimpan berbagai jenis alat dengan benar.',
        category: 'Perawatan',
        difficulty: 'Pemula',
        duration: 25,
        imageUrl: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800',
        materials: [
          { name: 'Minyak pelumas/WD-40', quantity: '1 botol', notes: 'Untuk melumasi alat logam' },
          { name: 'Lap bersih', quantity: '5 buah', notes: 'Untuk membersihkan' },
          { name: 'Sikat kawat kecil', quantity: '1 buah', notes: 'Membersihkan karat' },
          { name: 'Kotak penyimpanan/tool box', quantity: '1 buah', notes: 'Tempat menyimpan alat' },
          { name: 'Silica gel (opsional)', quantity: 'beberapa pack', notes: 'Menyerap kelembaban' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Bersihkan Alat Setelah Digunakan',
            description: 'Setelah selesai menggunakan alat, bersihkan segera dari debu, serbuk kayu, atau sisa material. Gunakan lap kering atau sikat untuk membersihkan. Untuk alat yang terkena cat atau lem, bersihkan dengan thinner atau air sabun sebelum mengering. Keringkan sempurna sebelum disimpan.',
            imageUrl: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800'
          },
          {
            stepNumber: 2,
            title: 'Periksa Kondisi Alat',
            description: 'Periksa setiap alat secara rutin. Cek apakah ada bagian yang rusak, longgar, atau berkarat. Untuk alat dengan mata pisau (gergaji, pahat), periksa ketajamannya. Untuk alat listrik, periksa kabel dan switch. Catat alat yang perlu diperbaiki atau diganti.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 3,
            title: 'Hilangkan Karat',
            description: 'Jika ada alat yang berkarat, bersihkan dengan sikat kawat. Untuk karat ringan, gunakan amplas halus. Untuk karat yang membandel, gunakan cairan penghilang karat. Setelah bersih, lap kering dan aplikasikan minyak pelumas tipis untuk mencegah karat kembali.',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
          },
          {
            stepNumber: 4,
            title: 'Lumasi Bagian yang Bergerak',
            description: 'Aplikasikan minyak pelumas pada bagian alat yang bergerak atau bergesekan: engsel tang, ulir kunci pas, roda gergaji, dll. Jangan berlebihan - cukup tipis saja. Gerakkan bagian tersebut beberapa kali agar pelumas merata. Lap kelebihan pelumas.',
            imageUrl: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800'
          },
          {
            stepNumber: 5,
            title: 'Simpan dengan Benar',
            description: 'Simpan alat di tempat yang kering dan tidak lembab. Gunakan tool box atau rak alat. Gantung alat besar seperti gergaji dan palu. Simpan alat tajam dengan pelindung atau terpisah agar tidak melukai. Jangan menumpuk alat secara sembarangan. Tambahkan silica gel di tool box untuk menyerap kelembaban.',
            imageUrl: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800'
          },
          {
            stepNumber: 6,
            title: 'Jadwal Perawatan Berkala',
            description: 'Buat jadwal perawatan rutin: pembersihan setelah setiap penggunaan, pemeriksaan menyeluruh setiap bulan, pelumasan setiap 3 bulan, dan pengecekan alat listrik setiap 6 bulan. Asah alat tajam saat mulai tumpul. Ganti komponen yang rusak segera. Dengan perawatan yang baik, alat akan awet dan selalu siap pakai.',
            imageUrl: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800'
          }
        ],
        author: 'Dewi Lestari',
        rating: 4.5,
        viewsCount: 1534,
        isActive: true,
        tags: ['perawatan', 'tools', 'maintenance', 'alat', 'pertukangan']
      }
    ];

    let insertedCount = 0;
    let skippedCount = 0;

    for (const tutorial of tutorials) {
      const existingTutorial = await Tutorial.findOne({ title: tutorial.title });
      
      if (!existingTutorial) {
        await Tutorial.create(tutorial);
        console.log(`✓ Created: ${tutorial.title}`);
        insertedCount++;
      } else {
        console.log(`- Skipped: ${tutorial.title}`);
        skippedCount++;
      }
    }

    console.log(`\nTutorials seeded: ${insertedCount} created, ${skippedCount} skipped`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding tutorials:', error);
    throw error;
  }
};

const seedAll = async () => {
  try {
    await seedUsers();
    await seedTutorials();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedAll();
