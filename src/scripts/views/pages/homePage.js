// Halaman untuk landing pertama bagi masyarakat

const HomePage = {
  async render() {
    return `
    <div class="row row-cols-1 row-cols-md-2 g-4 mx-5 my-5" id="home">
      <div class="col">
        <div class="mx-auto">
          <h1 style="color: #61764B" class="fw-bold">Si Tukik</h1>
          <h2>Penyelamat Penyu</h2>
          <p>Selamat datang di aplikasi <span class="fw-bold">Si Tukik!</span> Aplikasi <span class="fw-bold">Si Tukik</span> adalah aplikasi pendataan penyu yang digunakan pada konservasi penyu Pantai Pelangi Yogyakarta. Melalui aplikasi ini konservator bisa melakukan pendataan dan kamu sebagai masyarakat umum bisa melihat statistik datanya.</p>
          
          <div class="row row-cols-1 row-cols-md-2 g-4 mx-2 my-2 ">
            <div class="col text-center">
              <button type="button" class="btn filled-button px-5 rounded-4"><a href="#/statistik" class="linkButton">Mulai</a></button>
            </div>
            <div class="col text-center">
              <button type="button" class="btn ghost-button px-5 rounded-4"><a href="#/about" class="linkButtonGhost">Informasi</a></button>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="mx-auto text-center">
          <img src="https://i.ibb.co/r27qZbZ/giorgia-doglioni-3-Ggb-Jx7hg14-unsplash.jpg" alt="Penyu-Sisik" border="0" class="img-fluid rounded-4" style="width: 25rem">
        </div>
      </div>
    </div>
    `;
  },

  async afterRender() {
    // FUngsi dipanggil setelah render()
  },
};

export default HomePage;
