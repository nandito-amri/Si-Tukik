import { initializeApp } from 'firebase/app';
import swal from 'sweetalert';
import {
  addDoc,
  getFirestore,
  collection,
  doc,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../../globals/firebase-config';
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
          
          <form id="addPatroli">
            <div class="container my-3">
          <div class="row row-cols-2">
          <div class="col">
              <div class="mb-3">
              <label for="tglPeneluran" class="form-label">Tanggal Penemuan</label>
              <input type="date" class="form-control" id="tglPenemuan" aria-describedby="dateHelp">
            </div>
            </div>
            <div class="col">
              <div class="mb-3">
              <label for="waktuDitemukan" class="form-label">Waktu Ditemukan</label>
              <input type="time" class="form-control" id="waktuDitemukan" aria-describedby="dateHelp">
            </div>
            </div>
            <div class="col">
              <div class="mb-3">
              <label for="exampleInputDate" class="form-label">Tanggal Peneluran</label>
              <input type="date" class="form-control" id="tglPeneluran" aria-describedby="dateHelp">
            </div>
            </div>
            <div class="col">
              <div class="mb-3">
              <label for="exampleInputDate" class="form-label">Perkiraan Tanggal Peneluran</label>
              <input type="date" class="form-control" id="perkiraanTglPeneluran" aria-describedby="dateHelp">
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
          <button type="button" id="add-btn" class="btn btn-primary text-center mx-auto">Tambah Sarang</button>
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
    const tbody = document.getElementById('tabel_patroli');
    const tglPenemuan = document.getElementById('tglPenemuan');
    const waktuDitemukan = document.getElementById('waktuDitemukan');
    const tglPeneluran = document.getElementById('tglPeneluran');
    const perkiraanTglPeneluran = document.getElementById('perkiraanTglPeneluran');
    const inputKetebalanPenutup = document.getElementById('inputKetebalanPenutup');
    const inputKedalamanDasar = document.getElementById('inputKedalamanDasar');
    const inputJumlahTelur = document.getElementById('inputJumlahTelur');
    const inputJenisPenyu01 = document.getElementById('inputJenisPenyu01');
    const inputTelurBaik = document.getElementById('inputTelurBaik');
    const inputTelurRusak = document.getElementById('inputTelurRusak');
    const inputTelurMati = document.getElementById('inputTelurMati');
    const inputTelurAbnormal = document.getElementById('inputTelurAbnormal');

    const addPatroli = document.getElementById('add-btn');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const addData = async (e) => {
      e.preventDefault();
      swal('Berhasil Menambahkan data', '', 'success');

      const newPatroli = {
        tglPenemuan: tglPenemuan.value,
        waktuDitemukan: waktuDitemukan.value,
        tglPeneluran: tglPeneluran.value,
        perkiraanTglPeneluran: perkiraanTglPeneluran.value,
        inputKetebalanPenutup: inputKetebalanPenutup.value,
        inputKedalamanDasar: inputKedalamanDasar.value,
        inputJumlahTelur: inputJumlahTelur.value,
        inputJenisPenyu01: inputJenisPenyu01.value,
        inputTelurBaik: inputTelurBaik.value,
        inputTelurRusak: inputTelurRusak.value,
        inputTelurMati: inputTelurMati.value,
        inputTelurAbnormal: inputTelurAbnormal.value,
      };

      try {
        const docRef = await addDoc(collection(db, 'patroli'), newPatroli);

        tglPenemuan.value = '';
        waktuDitemukan.value = '';
        tglPeneluran.value = '';
        perkiraanTglPeneluran.value = '';
        inputKetebalanPenutup.value = '';
        inputKedalamanDasar.value = '';
        inputJumlahTelur.value = '';
        inputJenisPenyu01.value = '';
        inputTelurBaik.value = '';
        inputTelurRusak.value = '';
        inputTelurMati.value = '';
        inputTelurAbnormal.value = '';
      // eslint-disable-next-line no-shadow
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    };

    // Read Data
    const unsubscribe = onSnapshot(collection(db, 'patroli'), (querySnapshot) => {
      let table = '';
      let no = 1;

      // eslint-disable-next-line no-shadow
      querySnapshot.forEach((doc) => {
        table += `
            <tr>
              <th scope="row" class="text-center">${no}</th>
              <td>${doc.data().tglPenemuan}</td>
              <td class="text-center">${doc.data().waktuDitemukan}</td>
              <td class="text-center">${doc.data().tglPeneluran}</td>
              <td class="text-center">${doc.data().perkiraanTglPeneluran}</td>
              <td class="text-center">
                <button type="button" class="btn btn-danger delete-btn" id=${doc.id}>Delete</button>
              </td>
            </tr>
        `;

        // eslint-disable-next-line no-plusplus
        no++;
      });

      tbody.innerHTML = table;
      const deleteButton = document.querySelectorAll('.delete-btn');
      deleteButton.forEach((deleteBtn) => {
        // eslint-disable-next-line no-use-before-define
        deleteBtn.addEventListener('click', removeData);
      });
    });

    // Delete Data
    const removeData = async (e) => {
      const { id } = e.target;

      // Delete data collection
      await deleteDoc(doc(db, 'patroli', id));
      swal('Berhasil Menghapus data', '', 'success');
    };

    // Event Listener
    addPatroli.addEventListener('click', addData);
  },
};

export default PatroliPage;
