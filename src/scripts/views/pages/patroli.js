import { initializeApp } from 'firebase/app';
// eslint-disable-next-line import/no-unresolved
import swal from 'sweetalert';
import {
  addDoc,
  getFirestore,
  collection,
  doc,
  getDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
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
              <label for="tglPenemuan" class="form-label">Tanggal Penemuan</label>
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
              <label for="tglPeneluran" class="form-label">Tanggal Peneluran</label>
              <input type="date" class="form-control" id="tglPeneluran" aria-describedby="dateHelp">
            </div>
            </div>
            <div class="col">
              <div class="mb-3">
              <label for="perkiraanTglPeneluran" class="form-label">Perkiraan Tanggal Peneluran</label>
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
          <button type="button" id ="add-btn" class="btn btn-primary text-center mx-auto">Tambah Sarang</button>
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
            <th scope="col"><center>No.</center></th>
            <th scope="col"><center>Tanggal Penemuan</center></th>
            <th scope="col"><center>Waktu Ditemukan</center></th>
            <th scope="col"><center>Tanggal Peneluran Sesungguhnya</center></th>
            <th scope="col"><center>Perkiraan Tanggal Peneluran</center></th>
            <th scope="col"><center>Aksi</center></th>
            </tr>
        </thead>
        <tbody id="tabel_patroli"></tbody>
        </table>
        </div>
      </div>

      <div class="modal fade modal-lg" id="modalViewData" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="modalViewData" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">DETAIL PATROLI</h5>
          <button type="button" id="view-btn" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <div>
                <label class="fw-bold">Tanggal Penemuan :</label>
                <p id="viewtglPenemuan"></p>
              </div>
              <div>
                <label class="fw-bold">Watu Ditemukan :</label>
                <p id="viewwaktuDitemukan"></p>
              </div>
              <div>
                <label class="fw-bold">Tanggal Peneluran :</label>
                <p id="viewtglPeneluran"></p>
              </div>
              <div>
                <label class="fw-bold">Perkiraan Tanggal Peneluran :</label>
                <p id="viewperkiraanTglPeneluran"></p>
              </div>
            </div>
    
            <div class="col">
              <div>
                <label class="fw-bold">Ketebalan Penutup :</label>
                <p id="viewKetebalanPenutup"></p>
              </div>
              <div>
                <label class="fw-bold">Kedalaman Dasar :</label>
                <p id="viewKedalamanDasar"></p>
              </div>
              <div>
                <label class="fw-bold">Jumlah Telur :</label>
                <p id="viewJumlahTelur"></p>
              </div>
              <div>
                <label class="fw-bold">Jenis Penyu :</label>
                <p id="viewJenisPenyu01"></p>
              </div>
            </div>
            <div class="col">
              <div>
                <label class="fw-bold">Telur Baik :</label>
                <p id="viewTelurBaik"></p>
              </div>
              <div>
                <label class="fw-bold">Telur Rusak :</label>
                <p id="viewTelurRusak"></p>
              </div>
              <div>
                <label class="fw-bold">Telur Mati :</label>
                <p id="viewTelurMati"></p>
              </div>
              <div>
                <label class="fw-bold">Telur Abnormal :</label>
                <p id="viewTelurAbnormal"></p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modalUpdateData" tabindex="-1" aria-labelledby="modalUpdateData" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 w-100 text-center" id="exampleModalLabel">Update Sarang Penyu</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="text-center pb-2">Isikan data berikut ketika menemukan sarang penyu baru</p>
            <div class="container my-3">
            <div class="row row-cols-2">
            <div class="col">
              <div class="mb-3">
              <label for="update-tglPenemuan" class="form-label fw-bold">Tanggal Penemuan</label>
              <input type="date" class="form-control" id="update-tglPenemuan" aria-describedby="dateHelp" autocomplete="off">
            </div>
            </div>
            <div class="col">
              <div class="mb-3">
              <label for="update-waktuDitemukan" class="form-label fw-bold">Waktu Ditemukan</label>
              <input type="time" class="form-control" id="update-waktuDitemukan" aria-describedby="dateHelp" autocomplete="off">
            </div>
            </div>
            <div class="col">
              <div class="mb-3">
              <label for="update-tglPeneluran" class="form-label fw-bold">Tanggal Peneluran</label>
              <input type="date" class="form-control" id="update-tglPeneluran" aria-describedby="dateHelp" autocomplete="off">
            </div>
            </div>
            <div class="col">
              <div class="mb-3">
              <label for="update-perkiraanTglPeneluran" class="form-label fw-bold">Perkiraan Tanggal Peneluran</label>
              <input type="date" class="form-control" id="update-perkiraanTglPeneluran" aria-describedby="dateHelp" autocomplete="off">
            </div>
            </div>
          </div>
        </div>
            
        <div class="container my-3">
          <p class="">Kondisi Sarang</p>
          <div class="row row-cols-2">
            <div class="col">
              <div class="mb-3">
              <label for="update-KetebalanPenutup" class="form-label fw-bold">Ketebalan Penutup</label>
              <input type="number" class="form-control" id="update-KetebalanPenutup" aria-describedby="dateHelp" placeholder="cm" autocomplete="off">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
              <label for="update-KedalamanDasar" class="form-label fw-bold">Kedalaman Dasar</label>
              <input type="number" class="form-control" id="update-KedalamanDasar" aria-describedby="dateHelp" placeholder="cm" autocomplete="off">
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
                <label for="update-JumlahTelur" class="form-label fw-bold">Jumlah Telur</label>
                <input type="number" class="form-control" id="update-JumlahTelur" aria-describedby="dateHelp" placeholder="butir" autocomplete="off">
               </div>
              </div>
              <div class="col">
               <div class="mb-3">
                <label for="update-JenisPenyu01" class="form-label fw-bold d-block">Jenis Penyu</label>
               <div class="input-group mb-3">
              <select class="form-select" id="update-JenisPenyu01">
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
              <label for="update-TelurBaik" class="form-label fw-bold">Telur Baik</label>
              <input type="number" class="form-control" id="update-TelurBaik" aria-describedby="dateHelp" placeholder="butir" autocomplete="off">
            </div>
            </div>
            <div class="col">
              <div class="mb-3">
              <label for="update-TelurRusak" class="form-label fw-bold">Telur Rusak</label>
              <input type="number" class="form-control" id="update-TelurRusak" aria-describedby="dateHelp" placeholder="butir" autocomplete="off">
            </div>
          </form>
        </div>
          </div>
          <div class="row row-cols-2">
            <div class="col">
              <div class="mb-3">
              <label for="update-TelurMati" class="form-label fw-bold">Telur Mati</label>
              <input type="number" class="form-control" id="update-TelurMati" aria-describedby="dateHelp" placeholder="butir" autocomplete="off">
            </div>
            </div>
            <div class="col">
              <div class="mb-3">
              <label for="update-TelurAbnormal" class="form-label fw-bold">Telur Abnormal</label>
              <input type="number" class="form-control" id="update-TelurAbnormal" aria-describedby="dateHelp" placeholder="butir" autocomplete="off">
            </div>
          </form>
        </div>
      </div>     
    </div>
  </div>
            
        <div class="modal-footer mx-auto">
            <button type="button" class="btn ghost-button" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn filled-button updateBtn" data-bs-dismiss="modal">Update</button>
        </div>
      </div>
    </div>
  </div>
        `;
  },

  async afterRender() {
    // Get Element
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

    // Get Element for set
    const addPatroli = document.getElementById('add-btn');

    const updatetglPenemuan = document.getElementById('update-tglPenemuan');
    const updatewaktuDitemukan = document.getElementById('update-waktuDitemukan');
    const updatetglPeneluran = document.getElementById('update-tglPeneluran');
    const updateperkiraanTglPeneluran = document.getElementById('update-perkiraanTglPeneluran');
    const updateKetebalanPenutup = document.getElementById('update-KetebalanPenutup');
    const updateKedalamanDasar = document.getElementById('update-KedalamanDasar');
    const updateJumlahTelur = document.getElementById('update-JumlahTelur');
    const updateJenisPenyu01 = document.getElementById('update-JenisPenyu01');
    const updateTelurBaik = document.getElementById('update-TelurBaik');
    const updateTelurRusak = document.getElementById('update-TelurRusak');
    const updateTelurMati = document.getElementById('update-TelurMati');
    const updateTelurAbnormal = document.getElementById('update-TelurAbnormal');
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
      } catch (error) {
        console.error('Error adding document: ', error);
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
              <button type="button" class="btn btn-warning px-2 rounded-4 update-btn" data-bs-toggle="modal" data-bs-target="#modalUpdateData" title="Ubah Data" id=${doc.id}><i class="bi bi-pencil-square action-btn"></i></button>
              <button type="button" class="btn btn-danger px-2 rounded-4 delete-btn" title="Hapus Data" id=${doc.id}><i class="bi bi-trash-fill"></i></button>
                <button type="button" class="btn btn-success px-2 rounded-4 view-btn" data-bs-toggle="modal" data-bs-target="#modalViewData" title="Detail" id=${doc.id}>•••</button>
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
      const updateButton = document.querySelectorAll('.update-btn');
      updateButton.forEach((updateBtn) => {
        // eslint-disable-next-line no-undef, no-use-before-define
        updateBtn.addEventListener('click', updateData);
      });
      const detailButton = document.querySelectorAll('.view-btn');
      detailButton.forEach((detailBtn) => {
        // eslint-disable-next-line no-use-before-define
        detailBtn.addEventListener('click', viewData);
      });
    });

    // View One Data
    const viewData = async (event) => {
      const { id } = event.target;

      const docSnap = await getDoc(doc(db, 'patroli', id));

      if (docSnap.exists()) {
        // get element view

        document.getElementById('viewtglPenemuan').innerHTML = docSnap.data().tglPenemuan;
        document.getElementById('viewwaktuDitemukan').innerHTML = docSnap.data().waktuDitemukan;
        document.getElementById('viewtglPeneluran').innerHTML = docSnap.data().tglPeneluran;
        document.getElementById('viewperkiraanTglPeneluran').innerHTML = docSnap.data().perkiraanTglPeneluran;
        document.getElementById('viewKetebalanPenutup').innerHTML = docSnap.data().inputKetebalanPenutup;
        document.getElementById('viewKedalamanDasar').innerHTML = docSnap.data().inputKedalamanDasar;
        document.getElementById('viewJumlahTelur').innerHTML = docSnap.data().inputJumlahTelur;
        document.getElementById('viewJenisPenyu01').innerHTML = docSnap.data().inputJenisPenyu01;
        document.getElementById('viewTelurBaik').innerHTML = docSnap.data().inputTelurBaik;
        document.getElementById('viewTelurRusak').innerHTML = docSnap.data().inputTelurRusak;
        document.getElementById('viewTelurMati').innerHTML = docSnap.data().inputTelurMati;
        document.getElementById('viewTelurAbnormal').innerHTML = docSnap.data().inputTelurAbnormal;
      } else {
        console.log('No such document!');
      }
    };
    // Delete Data
    const removeData = async (event) => {
      const { id } = event.target;

      // Delete data collection
      const text = 'Yakin ingin menghapus data?';
      if (confirm(text) === true) {
        await deleteDoc(doc(db, 'patroli', id));
        swal('Berhasil Menghapus data', '', 'success');
      }
    };

    // Update Data
    const updateData = async (event) => {
      const { id } = event.target;

      // get data
      const docSnap = await getDoc(doc(db, 'patroli', id));

      if (docSnap.exists()) {
        updatetglPenemuan.value = docSnap.data().tglPenemuan;
        updatewaktuDitemukan.value = docSnap.data().waktuDitemukan;
        updatetglPeneluran.value = docSnap.data().tglPeneluran;
        updateperkiraanTglPeneluran.value = docSnap.data().perkiraanTglPeneluran;
        updateKetebalanPenutup.value = docSnap.data().inputKetebalanPenutup;
        updateKedalamanDasar.value = docSnap.data().inputKedalamanDasar;
        updateJumlahTelur.value = docSnap.data().inputJumlahTelur;
        updateJenisPenyu01.value = docSnap.data().inputJenisPenyu01;
        updateTelurBaik.value = docSnap.data().inputTelurBaik;
        updateTelurRusak.value = docSnap.data().inputTelurRusak;
        updateTelurMati.value = docSnap.data().inputTelurMati;
        updateTelurAbnormal.value = docSnap.data().inputTelurAbnormal;

        const updatePatroli = document.querySelector('.updateBtn');
        // eslint-disable-next-line no-use-before-define
        updatePatroli.addEventListener('click', simpanUpdateData);
        updatePatroli.setAttribute('id', id);
      } else {
        console.log('No such document!');
      }
    };

    // save update data
    const simpanUpdateData = async (e) => {
      const { id } = e.target;
      const updatePatroli = {
        tglPenemuan: updatetglPenemuan.value,
        waktuDitemukan: updatewaktuDitemukan.value,
        tglPeneluran: updatetglPeneluran.value,
        perkiraanTglPeneluran: updateperkiraanTglPeneluran.value,
        inputKetebalanPenutup: updateKetebalanPenutup.value,
        inputKedalamanDasar: updateKedalamanDasar.value,
        inputJumlahTelur: updateJumlahTelur.value,
        inputJenisPenyu01: updateJenisPenyu01.value,
        inputTelurBaik: updateTelurBaik.value,
        inputTelurRusak: updateTelurRusak.value,
        inputTelurMati: updateTelurMati.value,
        inputTelurAbnormal: updateTelurAbnormal.value,
      };

      await updateDoc(doc(db, 'patroli', id), updatePatroli);
      swal('Sukses', 'Data berhasil diupdate', 'success');
    };

    // Event Listener
    addPatroli.addEventListener('click', addData);
  },
};

export default PatroliPage;
