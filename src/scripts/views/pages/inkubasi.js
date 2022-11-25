const InkubasiPage = {
  async render() {
    console.log('Inkubasi Page');
    return `
      <div class="content">
        <h1 class="ms-5 judul">Halaman Pendataan</h1>
        <nav aria-label="Page navigation example" class="ms-5">
        <ul class="pagination flex-wrap">
            <li class="page-item"><a class="page-link rounded-0" href="#/patroli">Patroli</a></li>
            <li class="page-item"><a class="page-link active" href="#/inkubasi">Inkubasi</a></li>
            <li class="page-item"><a class="page-link" href="#/penangkaran">Penangkaran</a></li>
            <li class="page-item"><a class="page-link rounded-0" href="#/perilisan">Perilisan</a></li>
        </ul>
        </nav>

        <h2 class="mx-5 my-4">Data Telur Penyu dalam Inkubasi</h2>

        <div class="table-responsive mx-5 my-4">
          <table class="table table-striped border">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Jenis Penyu</th>
                <th scope="col">Tanggal Ditemukan</th>
                <th scope="col">Tanggal Bertelur</th>
                <th scope="col">Jumlah Telur</th>
                <th scope="col">Perkiraan Tanggal Menetas</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    `;
  },

  async afterRender() {
    // FUngsi dipanggil setelah render()
  },
};

export default InkubasiPage;
