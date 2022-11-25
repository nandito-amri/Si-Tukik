import KonservasiDbSource from '../../data/konservasidb-source';

const PatroliPage = {
  async render() {
    return `
    <div class="modal fade" id="tambahSarangModal" tabindex="-1" aria-labelledby="tambahSarangModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 w-100 text-center" id="exampleModalLabel">Tambah Sarang Penyu</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="text-center pb-2">Isikan data berikut ketika menemukan sarang penyu baru</p>
          
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
              <label for="exampleInputDate" class="form-label">Perkiraan Tanggal Peneluran</label>
              <input type="date" class="form-control" id="exampleInputDate" aria-describedby="dateHelp">
            </div>
            </div>
          </div>
        </div>
            
            <div class="container my-3">
              <p class="">Kondisi Sarang</p>
          <div class="row row-cols-2">
            <div class="col">
              <div class="mb-3">
              <label for="inputKetebalanPenutup" class="form-label">Ketebalan Penutup</label>
              <input type="number" class="form-control" id="inputKetebalanPenutup" aria-describedby="dateHelp" placeholder="cm">
            </div>
            </div>
            <div class="col">
              <div class="mb-3">
              <label for="inputKedalamanDasar" class="form-label">Kedalaman Dasar</label>
              <input type="number" class="form-control" id="inputKedalamanDasar" aria-describedby="dateHelp" placeholder="cm">
            </div>
          </form>
        </div>
            </div>
          </div>
          
           <div class="container my-3">
               <p class="">Kondisi Sarang</p>
            <div class="row row-cols-2">
              <div class="col">
               <div class="mb-3">
                <label for="inputJumlahTelur" class="form-label">Jumlah Telur</label>
                <input type="number" class="form-control" id="inputJumlahTelur" aria-describedby="dateHelp" placeholder="butir">
               </div>
              </div>
              <div class="col">
               <div class="mb-3">
                <label for="inputJenisPenyu01" class="form-label">Jenis Penyu</label>
            <div class="input-group mb-3">
              <select class="form-select" id="inputJenisPenyu01">
                <option selected>Jenis Penyu</option>
                <option value="1">Lekang</option>
                <option value="2">Sisik</option>
              </select>
            </div>
               </div>
              </div>
            </div>
             
          <div class="row row-cols-2">
            <div class="col">
              <div class="mb-3">
              <label for="inputTelurBaik" class="form-label">Telur Baik</label>
              <input type="number" class="form-control" id="inputTelurBaik" aria-describedby="dateHelp" placeholder="butir">
            </div>
            </div>
            <div class="col">
              <div class="mb-3">
              <label for="inputTelurRusak" class="form-label">Telur Rusak</label>
              <input type="number" class="form-control" id="inputTelurRusak" aria-describedby="dateHelp" placeholder="butir">
            </div>
          </form>
        </div>
            </div>
          
          <div class="row row-cols-2">
            <div class="col">
              <div class="mb-3">
              <label for="inputTelurMati" class="form-label">Telur Mati</label>
              <input type="number" class="form-control" id="inputTelurMati" aria-describedby="dateHelp" placeholder="butir">
            </div>
            </div>
            <div class="col">
              <div class="mb-3">
              <label for="inputTelurAbnormal" class="form-label">Telur Abnormal</label>
              <input type="number" class="form-control" id="inputTelurAbnormal" aria-describedby="dateHelp" placeholder="butir">
            </div>
          </form>
        </div>
      </div>
          
    </div>
  </div>
            
        <div class="modal-footer">
          <button type="button" class="btn btn-primary text-center mx-auto">Tambah Sarang</button>
        </div>
      </div>
    </div>
  </div>

        <div class ="content">
        <h1 class="ms-5 judul">Halaman Pendataan</h1>
        <nav aria-label="Page navigation example" class="ms-5">
        <ul class="pagination flex-wrap">
            <li class="page-item"><a class="page-link rounded-0 active" href="#/patroli">Patroli</a></li>
            <li class="page-item"><a class="page-link" href="#/inkubasi">Inkubasi</a></li>
            <li class="page-item"><a class="page-link" href="#/penangkaran">Penangkaran</a></li>
            <li class="page-item"><a class="page-link rounded-0" href="#/perilisan">Perilisan</a></li>
        </ul>
        </nav>

        <div class="row row-cols-1 row-cols-md-2 g-3 mx-5 my-2 ">
        <div class="col ">
            <h2 class="text-left">Data Penemuan Sarang Selama Patroli</h2>
        </div>
        <div class="col">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn filled-button me-4 px-4 rounded-4" data-bs-toggle="modal" data-bs-target="#tambahSarangModal" type="submit">+ Tambah Sarang</button>
            </div>
        </div>
        </div>

        <div class="table-responsive mx-5 my-4">
        <table class="table table-striped border">
        <thead>
            <tr>
            <th scope="col">No.</th>
            <th scope="col">ID Sarang</th>
            <th scope="col">Tanggal Penemuan</th>
            <th scope="col">Waktu Ditemukan</th>
            <th scope="col">Tanggal Peneluran Sesungguhnya</th>
            <th scope="col">Tanggal Perkiraan Tanggal Peneluran</th>
            <th scope="col">Aksi</th>
            </tr>
        </thead>
        <tbody id="tabel_patroli"></tbody>
        </table>
        </div>
        </div>
        `;
  },

  async afterRender() {
    // const sarang;
    // const tabelPatroli = document.querySelector('#tabel_patroli');
    // sarang.forEach((s) => {

    // })
  },
};

export default PatroliPage;
