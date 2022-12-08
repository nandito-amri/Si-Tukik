const DokumentasiPage = {
  async render() {
    return `
        <h2 class="text-center mt-5" id="dokumentasi">Dokumentasi</h2>
        <div id="dokumentasiKonservasi" class="carousel slide mx-auto my-5" data-bs-ride="true" style="max-width: 70%">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#dokumentasiKonservasi" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#dokumentasiKonservasi" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#dokumentasiKonservasi" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#dokumentasiKonservasi" data-bs-slide-to="3" aria-label="Slide 4"></button>
            <button type="button" data-bs-target="#dokumentasiKonservasi" data-bs-slide-to="4" aria-label="Slide 5"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img src="https://i.ibb.co/njnsvjs/dokumentasi-1.jpg" class="d-block w-100" alt="1">
            </div>
            <div class="carousel-item">
            <img src="https://i.ibb.co/hyXRbS3/dokumentasi-2.jpg" class="d-block w-100" alt="2">
            </div>
            <div class="carousel-item">
            <img src="https://i.ibb.co/PMM4t6C/dokumentasi-3.jpg" class="d-block w-100" alt="3">
            </div>
            <div class="carousel-item">
            <img src="https://i.ibb.co/Nsxn0SR/dokumentasi-4.jpg" class="d-block w-100" alt="3">
            </div>
            <div class="carousel-item">
            <img src="https://i.ibb.co/M2zZH0m/dokumentasi-5.jpg" class="d-block w-100" alt="3">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#dokumentasiKonservasi" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#dokumentasiKonservasi" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div>
        `;
  },

  async afterRender() {
    // FUngsi dipanggil setelah render()
  },
};

export default DokumentasiPage;
