import { initializeApp } from 'firebase/app';
// eslint-disable-next-line import/no-unresolved
import swal from 'sweetalert';
import {
  getFirestore,
  collection,
  query,
  getDocs,
} from 'firebase/firestore';
import firebaseConfig from '../../globals/firebase-config';

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
                <th scope="col"><center>No.</center></th>
                <th scope="col"><center>Jenis Penyu</center></th>
                <th scope="col"><center>Tanggal Ditemukan</center></th>
                <th scope="col"><center>Tanggal Bertelur</center></th>
                <th scope="col"><center>Jumlah Telur</center></th>
              </tr>
            </thead>
            <tbody id="tabel_inkubasi"></tbody>
          </table>
        </div>
      </div>

      <!-- ============================ ========== TAMPILAN STATISTIK INKUBASI -->
      <div class="container my-5">
      <h3 class="text-center mt-5">Statistik Inkubasi</h3>
      <div class="row row-cols-1 row-cols-md-4 g-4 mx-5 my-2">
        <div class="col">
          <div class="card text-bg-light text-center statistic-card rounded-4" style="max-width: 18rem;">
            <div class="card-header">Telur Dalam Inkubasi</div>
            <div class="card-body">
              <h5 class="card-title">1235</h5>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card text-bg-light text-center statistic-card rounded-4" style="max-width: 18rem;">
            <div class="card-header">Telur Gagal Menetas</div>
            <div class="card-body">
              <h5 class="card-title">65</h5>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card text-bg-light text-center statistic-card rounded-4" style="max-width: 18rem;">
            <div class="card-header">Mati Saat Menetas</div>
            <div class="card-body">
              <h5 class="card-title">23</h5>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card text-bg-light text-center statistic-card rounded-4" style="max-width: 18rem;">
            <div class="card-header">Telur Berhasil Menetas</div>
            <div class="card-body">
              <h5 class="card-title">257</h5>
            </div>
          </div>
        </div>
      </div>
      </div>

      <!-- ================================= MODAL DETAIL INKUBASI -->
      <div class="modal modal-xl fade" id="detailInkubasi" tabindex="-1" aria-labelledby="detailInkubasiLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 w-100 text-center" id="exampleModalLabel">Detail Inkubasi</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row row-cols-1 row-cols-md-2 g-4 mx-4 my-2">
                <div class="col">
                  <h4>Data Penemuan</h4>
                  <div class="my-3">
                  <p>ID Sarang : <span>#001</span></p>
                  <p>Jenis Penyu : <span>Lekang</span></p>
                  <p>Tanggal Penemuan : <span>8 November 2022</span></p>
                  <p>Waktu Penemuan : <span>08 : 21 : 34 PM</span></p>
                  <p>Tanggal Peneluran Sesungguhnya : <span>7 November 2022</span></p>
                  <p>Perkiraan Tanggal Peneluran : <span>8 November 2022</span></p>
                  </div>
                </div>
                
                <div class="col">
                  <h4>Data Kondisi Telur dan Sarang</h4>
                  <div class="my-3">
                  <p>Jumlah Telur : <span>260</span></p>
                  <p>Telur Baik : <span>240</span></p>
                  <p>Telur Dirusak : <span>2</span></p>
                  <p>Telur Mati : <span>8</span></p>
                  <p>Telur Abnormal : <span>10</span></p>
                  <p>Ketebalan Sarang : <span>8 cm</span></p>
                  <p>Ketebalan Dasar : <span>20 cm</span></p>
                  </div>
                </div>
                
                <div class="col">
                  <h4>Data Kondisi Menetas</h4>
                  <div class="my-3">
                  <p>Telur Berhasil Menetas : <span>-</span></p>
                  <p>Telur Gagal Menetas : <span>-</span></p>
                  <p>Mati Saat Baru Menetas : <span>-</span></p>
                  </div>
                </div>
                
              </div>
            </div>
            <div class="modal-footer mx-auto">
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#catatPenetasanModal">Catat Telur Menetas</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    // FUngsi dipanggil setelah render()
    const RENDER_EVENT = 'render-event';
    const app = initializeApp(firebaseConfig);
    const database = getFirestore(app);
    const tableContainer = document.getElementById('tabel_inkubasi');

    document.addEventListener(RENDER_EVENT, async () => {
      tableContainer.innerHTML = '';
      const q = query(collection(database, 'patroli'));

      const querySnapshot = await getDocs(q);
      let index = 1;
      querySnapshot.forEach((item) => {
        console.log(item);
        const sarangElement = document.createElement('tr');
        sarangElement.innerHTML += `
        <th scope="row" class="text-center">${index}</th>
        <td class="text-center">${item.data().inputJenisPenyu01}</td>
        <td class="text-center">${item.data().tglPenemuan}</td>
        <td class="text-center">${item.data().tglPeneluran}</td>
        <td class="text-center">${item.data().inputJumlahTelur}</td>
        `;

        tableContainer.appendChild(sarangElement);
        index += 1;
      });
    });
    document.dispatchEvent(new Event(RENDER_EVENT));
  },
};

export default InkubasiPage;
