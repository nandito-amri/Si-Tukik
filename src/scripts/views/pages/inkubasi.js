import { initializeApp } from 'firebase/app';
// eslint-disable-next-line import/no-unresolved
import swal from 'sweetalert';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  addDoc,
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
                <th scope="col"><center>Aksi</center></th>
              </tr>
            </thead>
            <tbody id="tabel_inkubasi"></tbody>
          </table>
        </div>
      </div>

      <!--  ================================= MODAL CATAT TELUR MENETAS   -->
<div class="modal fade" id="catatPenetasanModal" tabindex="-1" aria-labelledby="catatPenetasanModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 w-100 text-center" id="exampleModalLabel">Data Sarang Penyu</h1>
        <button type="button" id="view-btn" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p class="text-center">Isikan data berikut ketika telur menetas!</p>
        
        <div class="detailPenyuMenetas mb-5">
          <p>Jenis Penyu : <span id="viewJenisPenyu01"></span></p>
          <p>Tanggal Ditemukan : <span id="viewtglPenemuan"></span></p>
          <p>Waktu Penemuan : <span id="viewwaktuDitemukan"></span></p>
          <p>Jumlah Telur : <span id="viewJumlahTelur"></span></p>
          <p>Telur Baik : <span id="viewTelurBaik"></span></p>
        </div>
        
        <form id ="addKondisiTelur">
          <p class="fw-semibold">Kondisi Telur Menetas</p>
          <div class="mb-3">
            <label for="jumlahTelurMenetas" class="form-label">Telur Menetas</label>
            <input type="number" class="form-control" id="jumlahTelurMenetas" aria-describedby="telurMenetas">
          </div>
          <div class="mb-3">
            <label for="jumlahTelurGagal" class="form-label">Telur Gagal</label>
            <input type="number" class="form-control" id="jumlahTelurGagal" aria-describedby="telurGagal">
          </div>
           <div class="mb-3">
            <label for="jumlahMatiMenetas" class="form-label">Mati Ketika Menetas</label>
            <input type="number" class="form-control" id="jumlahMatiMenetas" aria-describedby="matiMenetas">
          </div>
        </form>
      </div>
      <div class="modal-footer mx-auto">
        <button type="button" class="btn btn-outline-primary">Batal</button>
        <button type="button" id="updateBtn" class="btn btn-primary">Simpan</button>
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
              <button type="button" id="detail-btn" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row row-cols-1 row-cols-md-2 g-4 mx-4 my-2">
                <div class="col">
                  <h4>Data Penemuan</h4>
                  <div class="my-3">
                  <p>ID Sarang : <span>#001</span></p>
                  <p>Jenis Penyu : <span id="viewjenisPenyu2">Lekang</span></p>
                  <p>Tanggal Penemuan : <span id="viewtglpenemuan2">8 November 2022</span></p>
                  <p>Waktu Penemuan : <span id="viewwaktuditemukan2">08 : 21 : 34 PM</span></p>
                  <p>Tanggal Peneluran : <span id="viewtglpeneluran2">7 November 2022</span></p>
                  <p>Perkiraan Tanggal Peneluran : <span id="viewperkiraantglpeneluran2">8 November 2022</span></p>
                  </div>
                </div>
                
                <div class="col">
                  <h4>Data Kondisi Telur dan Sarang</h4>
                  <div class="my-3">
                  <p>Jumlah Telur : <span id="viewjumlahtelur2">260</span></p>
                  <p>Telur Baik : <span id="viewtelurbaik2">240</span></p>
                  <p>Telur Dirusak : <span id="viewtelurrusak2">2</span></p>
                  <p>Telur Mati : <span id="viewtelurmati2">8</span></p>
                  <p>Telur Abnormal : <span id="viewtelurabnormal2">10</span></p>
                  <p>Ketebalan Penutup : <span id="viewketebalanpenutup2">8 cm</span></p>
                  <p>Kedalaman Dasar : <span id="viewkedalamandasar2">20 cm</span></p>
                  </div>
                </div>
                
                <div class="col">
                  <h4>Data Kondisi Menetas</h4>
                  <div class="my-3">
                  <p>Telur Berhasil Menetas : <span id="jumlahTelurMenetas2"></span></p>
                  <p>Telur Gagal Menetas : <span id="jumlahTelurGagal2"></span></p>
                  <p>Mati Saat Baru Menetas : <span id="jumlahMatiMenetas2"></span></p>
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

    // View Detail Data (melihat data sarang secara detail)
    const viewinkubasi = async (id) => {
      const docSnap = await getDoc(doc(database, 'patroli', id));
      const inputjumlahTelurMenetas = document.getElementById('jumlahTelurMenetas');
      const inputjumlahTelurGagal = document.getElementById('jumlahTelurGagal');
      const inputjumlahMatiMenetas = document.getElementById('jumlahMatiMenetas');
      if (docSnap.exists()) {
        console.log('initest', docSnap.data().inputTelurBaik);
        document.getElementById('viewJenisPenyu01').innerHTML = docSnap.data().inputJenisPenyu01;
        document.getElementById('viewtglPenemuan').innerHTML = docSnap.data().tglPenemuan;
        document.getElementById('viewwaktuDitemukan').innerHTML = docSnap.data().waktuDitemukan;
        document.getElementById('viewJumlahTelur').innerHTML = docSnap.data().inputJumlahTelur;
        document.getElementById('viewTelurBaik').innerHTML = docSnap.data().inputTelurBaik;
        inputjumlahTelurMenetas.value = docSnap.data().jumlahTelurMenetas;
        inputjumlahTelurGagal.value = docSnap.data().jumlahTelurGagal;
        inputjumlahMatiMenetas.value = docSnap.data().jumlahMatiMenetas;
        const confirmUpdatingSarangButton = document.querySelector('#updateBtn');
        confirmUpdatingSarangButton.addEventListener('click', async () => {
          const updatePatroli = {
            jumlahTelurMenetas: inputjumlahTelurMenetas.value,
            jumlahTelurGagal: inputjumlahTelurGagal.value,
            jumlahMatiMenetas: inputjumlahMatiMenetas.value,
          };
          await updateDoc(doc(database, 'patroli', id), updatePatroli);
          document.dispatchEvent(new Event(RENDER_EVENT));
          swal('Sukses', 'Data berhasil diupdate', 'success');
        });
        confirmUpdatingSarangButton.setAttribute('id', id);
      } else {
        console.log('No such document!');
      }
    };

    const viewAllDetail = async (id) => {
      const docSnap = await getDoc(doc(database, 'patroli', id));
      if (docSnap.exists()) {
        document.getElementById('viewjenisPenyu2').innerHTML = docSnap.data().inputJenisPenyu01;
        document.getElementById('viewtglpenemuan2').innerHTML = docSnap.data().tglPenemuan;
        document.getElementById('viewwaktuditemukan2').innerHTML = docSnap.data().waktuDitemukan;
        document.getElementById('viewtglpeneluran2').innerHTML = docSnap.data().tglPeneluran;
        document.getElementById('viewperkiraantglpeneluran2').innerHTML = docSnap.data().perkiraanTglPeneluran;
        document.getElementById('viewketebalanpenutup2').innerHTML = docSnap.data().inputKetebalanPenutup;
        document.getElementById('viewkedalamandasar2').innerHTML = docSnap.data().inputKedalamanDasar;
        document.getElementById('viewjumlahtelur2').innerHTML = docSnap.data().inputJumlahTelur;
        document.getElementById('viewtelurbaik2').innerHTML = docSnap.data().inputTelurBaik;
        document.getElementById('viewtelurrusak2').innerHTML = docSnap.data().inputTelurRusak;
        document.getElementById('viewtelurmati2').innerHTML = docSnap.data().inputTelurMati;
        document.getElementById('viewtelurabnormal2').innerHTML = docSnap.data().inputTelurAbnormal;
        document.getElementById('jumlahTelurMenetas2').innerHTML = docSnap.data().jumlahTelurMenetas;
        document.getElementById('jumlahTelurGagal2').innerHTML = docSnap.data().jumlahTelurGagal;
        document.getElementById('jumlahMatiMenetas2').innerHTML = docSnap.data().jumlahMatiMenetas;
        console.log(docSnap.data().jumlahMatiMenetas);
      } else {
        console.log('No such document!');
      }
    };
    document.addEventListener(RENDER_EVENT, async () => {
      tableContainer.innerHTML = '';
      const q = query(collection(database, 'patroli'));

      const querySnapshot = await getDocs(q);
      let index = 1;
      querySnapshot.forEach((item) => {
        // console.log(item);
        const sarangElement = document.createElement('tr');
        sarangElement.innerHTML += `
        <th scope="row" class="text-center">${index}</th>
        <td class="text-center">${item.data().inputJenisPenyu01}</td>
        <td class="text-center">${item.data().tglPenemuan}</td>
        <td class="text-center">${item.data().tglPeneluran}</td>
        <td class="text-center">${item.data().inputJumlahTelur}</td>
        <td class="text-center">
        <button type="button" class="btn btn-warning px-2 rounded-4 view-btn" data-bs-toggle="modal" data-bs-target="#catatPenetasanModal"" title="Ubah Data" id=${item.id}><i class="bi bi-pencil-square action-btn"></i></button>
        <button type="button" class="btn btn-success px-2 rounded-4 detail-btn" data-bs-toggle="modal" data-bs-target="#detailInkubasi" title="Detail" id=${item.id}>•••</button>
        </td>
        `;

        tableContainer.appendChild(sarangElement);

        index += 1;
      });
      const viewInkubasiButtons = document.querySelectorAll('.view-btn');
      viewInkubasiButtons.forEach((detailinkubasi) => {
        detailinkubasi.addEventListener('click', (event) => {
          event.stopPropagation();
          const sarangId = event.currentTarget.id;

          viewinkubasi(sarangId);
          console.log(viewinkubasi(sarangId));
        });
      });
      const viewDetailButtons = document.querySelectorAll('.detail-btn');
      viewDetailButtons.forEach((detailinkubasi) => {
        detailinkubasi.addEventListener('click', (event) => {
          event.stopPropagation();
          const sarangId = event.currentTarget.id;

          viewAllDetail(sarangId);
          console.log(viewAllDetail(sarangId));
        });
      });
    });

    document.dispatchEvent(new Event(RENDER_EVENT));
  },
};

export default InkubasiPage;
