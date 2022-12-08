const PerilisanPage = {
  async render() {
    return `
      <div class="content">
        <h1 class="ms-5 judul">Halaman Pendataan</h1>
        <nav aria-label="Page navigation example" class="ms-5">
        <ul class="pagination flex-wrap">
            <li class="page-item"><a class="page-link rounded-0" href="#/patroli">Patroli</a></li>
            <li class="page-item"><a class="page-link" href="#/inkubasi">Inkubasi</a></li>
            <li class="page-item"><a class="page-link" href="#/penangkaran">Penangkaran</a></li>
            <li class="page-item"><a class="page-link rounded-0 active" href="#/perilisan">Perilisan</a></li>
        </ul>
        </nav>

        <h2 class="mx-5 my-4">Data Telur Penyu dalam Inkubasi</h2>

        
        <div class="table-responsive mx-5 my-4">
        <table class="table table-striped border">
        <thead>
            <tr>
            <th scope="col">No.</th>
            <th scope="col">Jenis Penyu</th>
            <th scope="col">Tanggal Perilisan</th>
            <th scope="col">Waktu Perilisan</th>
            <th scope="col">Cuaca Perilisan</th>
            <th scope="col">Jumlah Dirilis</th>
            <th scope="col">Aksi</th>
            </tr>
        </thead>
        <tbody id="tabel_periisan"></tbody>
        </table>
        </div>
      </div>

      <!-- ================================= MODAL UBAH DATA PERILISAN -->
      <div class="modal fade" id="ubahRilisModal" tabindex="-1" aria-labelledby="ubahRilisModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 w-100 text-center" id="exampleModalLabel">Ubah data perilisan tukik</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="text-center pb-2">Isikan data berikut ketika ingin mengubah data perilisan tukik</p>
              
              <form>
                <div class="container my-3">
              <div class="row row-cols-2">
                <div class="col">
                  <div class="mb-3">
                  <label for="exampleInputDate" class="form-label">Tanggal Peneluran</label>
                  <input type="date" class="form-control" id="exampleInputDate" aria-describedby="dateHelp">
                </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                  <label for="exampleInputWeather" class="form-label">Cuaca</label>
                <div class="input-group mb-3">
                  <select class="form-select" id="inputGroupSelect01">
                    <option selected>Kondisi Cuaca...</option>
                    <option value="1">Cerah</option>
                    <option value="2">Mendung</option>
                    <option value="3">Hujan</option>
                  </select>
                </div>
                </div>
                </div>
              </div>
            </div>
                
                <div class="container my-3">
              <div class="row row-cols-2">
                <div class="col">
                  <div class="mb-3">
                    <label for="inputJenisPenyu" class="form-label">Jenis Penyu</label>
                <div class="input-group mb-3">
                  <select class="form-select" id="inputJenisPenyu">
                    <option selected>Jenis Penyu</option>
                    <option value="1">Lekang</option>
                    <option value="2">Sisik</option>
                  </select>
                </div>
                  </div>
                  </div>
                <div class="col">
                  <div class="mb-3">
                  <label for="jumlahTukikRilis" class="form-label">Jumlah Tukik </label>
                  <input type="number" class="form-control" id="jumlahTukikRilis" aria-describedby="dateHelp" placeholder="ekor">
                </div>
            </div>
                </div>
              </div>
              </form>
      </div>
            <div class="modal-footer mx-auto">
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Batal</button>
              <button type="button" class="btn btn-primary">Simpan</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    // FUngsi dipanggil setelah render()
  },
};

export default PerilisanPage;
