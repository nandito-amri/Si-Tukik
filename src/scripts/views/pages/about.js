const AboutUs = {
  async render() {
    return `
        <h2 class="text-center mt-5" id="about">About Us</h2>
        <p class="text-center">Konservasi Penyu Pantai Pelangi - 4K Yogyakarta</p>
        <div class="row row-cols-1 row-cols-md-2 g-4 mx-5 my-2">
        <div class="col">
            <div class="mx-auto text-center">
            <img src="https://i.ibb.co/6b3dGzZ/Penyu-Sisik.jpg" alt="Penyu-Sisik" border="0" class="img-fluid rounded-4" style="width: 25rem">
            </div>
        </div>
        <div >
            <p>Konservasi Penyu Pantai Pelangi merupakan sebuah konservasi penyu yang berlokasi di Pantai Pelangi, Parangtritis, Kabupaten Bantul, Daerah Istimewa Yogyakarta. Berdirinya konservasi penyu ini didasari dari keinginan Bapak Sarwidi untuk dapat melestarikan kehidupan penyu, khususnya di wilayah Provinsi Daerah Istimewa Yogyakarta. Selanjutnya konservasi ini dikelola bersama dengan komunitas <a href="https://www.instagram.com/4k.yogyakarta/?hl=en">4K Yogyakarta.</a></p>
            <p>Penyu telah dikategorikan sebagai hewan langka yang mendekati kepunahan karena banyaknya perburuan manusia serta kerusakan habitat yang dimilikinya. Di Pantai Pelangi terdapat dua jenis penyu yang dapat ditemukan, yaitu penyu lekang dan penyu sisik. </p>
        </div>
        </div>
        `;
  },

  async afterRender() {
    // FUngsi dipanggil setelah render()
  },
};

export default AboutUs;
