const PenangkaranPage = {
  async render() {
    return `
      <div class="content">
        <h1 class="ms-5 judul">Halaman Pendataan</h1>
        <nav aria-label="Page navigation example" class="ms-5">
        <ul class="pagination flex-wrap">
            <li class="page-item"><a class="page-link rounded-0" href="#/patroli">Patroli</a></li>
            <li class="page-item"><a class="page-link" href="#/inkubasi">Inkubasi</a></li>
            <li class="page-item"><a class="page-link active" href="#/penangkaran">Penangkaran</a></li>
            <li class="page-item"><a class="page-link rounded-0" href="#/perilisan">Perilisan</a></li>
        </ul>
        </nav>

        <h2 class="mx-5 my-4">Data Telur Penyu dalam Penangkaran</h2>

        <h3 class="text-center mt-5">Penyu Lekang</h3>
        <div class="row row-cols-1 row-cols-md-2 g-4" id="penangkaranPenyuLekang">
          <div class="col">
            <div class="card text-bg-light text-center mx-auto statistic-card rounded-4" style="max-width: 18rem;">
              <div class="card-header">Total Tukik dalam Penangakran</div>
              <div class="card-body">
                <h5 class="card-title">1235</h5>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card text-bg-light text-center mx-auto statistic-card rounded-4" style="max-width: 18rem;">
              <div class="card-header">Mati dalam Penangkaran</div>
              <div class="card-body">
                <h5 class="card-title">65</h5>
              </div>
            </div>
          </div>
          </div>
        </div>    
          
        <h3 class="text-center mt-5">Penyu Sisik</h3>
        <div class="row row-cols-1 row-cols-md-2 g-4 " id="penangkaranPenyuSisik">
          <div class="col">
            <div class="card text-bg-light text-center mx-auto statistic-card rounded-4" style="max-width: 18rem;">
              <div class="card-header">Total Tukik dalam Penangkaran</div>
              <div class="card-body">
                <h5 class="card-title">1235</h5>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card text-bg-light text-center mx-auto statistic-card rounded-4" style="max-width: 18rem;">
              <div class="card-header">Mati dalam Penangkaran</div>
              <div class="card-body">
                <h5 class="card-title">65</h5>
              </div>
            </div>
          </div>
          </div>
        </div>

        <div class="text-center my-5">
          <button type="button" class="btn btn-warning mx-4 text-white" data-bs-toggle="modal" data-bs-target="#editDataPenangkaran"><i class="bi bi-pencil-square"></i> Edit Data</button>
          <button type="button" class="btn btn-success mx-4" data-bs-toggle="modal" data-bs-target="#rilisTukikModal"><i class="bi bi-water"></i> Rilis Tukik</button>
        </div>
      </div>
    `;
  },

  async afterRender() {
    // FUngsi dipanggil setelah render()
  },
};

export default PenangkaranPage;
