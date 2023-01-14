/* eslint-disable max-len */
import { initializeApp } from 'firebase/app';
import swal from 'sweetalert';
import {
  addDoc,
  getFirestore,
  collection,
  where,
  doc,
  getDoc,
  query,
  getDocs,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import firebaseConfig from '../../globals/firebase-config';

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
      
                <option value="Lekang">Lekang</option>
                <option value="Sisik">Sisik</option>
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
                
                <option value="Lekang">Lekang</option>
                <option value="Sisik">Sisik</option>
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
    onAuthStateChanged(getAuth(), (user) => {
      if (!user) {
        location.href = '#/';
        console.log('Login Required');
      }
    });
    const RENDER_EVENT = 'render-event';
    const tableContainer = document.getElementById('tabel_patroli');
    tableContainer.innerHTML = '';

    // Get database from firestore
    const app = initializeApp(firebaseConfig);
    const database = getFirestore(app);
    const coll = collection(database, 'patroli');

    // Add data (menambahkan sarang)
    const addSarang = async () => {
      const tglPenemuan = document.getElementById('tglPenemuan').value;
      const waktuDitemukan = document.getElementById('waktuDitemukan').value;
      const tglPeneluran = document.getElementById('tglPeneluran').value;
      const perkiraanTglPeneluran = document.getElementById('perkiraanTglPeneluran').value;
      const inputKetebalanPenutup = document.getElementById('inputKetebalanPenutup').value;
      const inputKedalamanDasar = document.getElementById('inputKedalamanDasar').value;
      const inputJumlahTelur = Number(document.getElementById('inputJumlahTelur').value);
      const inputJenisPenyu01 = document.getElementById('inputJenisPenyu01').value;
      const inputTelurBaik = Number(document.getElementById('inputTelurBaik').value);
      const inputTelurRusak = Number(document.getElementById('inputTelurRusak').value);
      const inputTelurMati = Number(document.getElementById('inputTelurMati').value);
      const inputTelurAbnormal = Number(document.getElementById('inputTelurAbnormal').value);
      const jumlahTelurMenetas = 0;
      const jumlahMatiMenetas = 0;
      let jumlahTelurGagal = 0;
      const createdAt = serverTimestamp();
      if (
        tglPenemuan === ''
      || waktuDitemukan === ''
      || tglPeneluran === ''
      || perkiraanTglPeneluran === ''
      || inputKetebalanPenutup === ''
      || inputKedalamanDasar === ''
      || inputJumlahTelur === ''
      || inputJenisPenyu01 === ''
      || inputTelurBaik === ''
      || inputTelurRusak === ''
      || inputTelurMati === ''
      || inputTelurAbnormal === ''
      ) {
        swal('Harap isi kolom yang kosong', '', 'warning');
      } else {
        jumlahTelurGagal = Number(inputTelurAbnormal) + Number(inputTelurMati) + Number(inputTelurRusak);
        const newPatroli = {
          tglPenemuan,
          waktuDitemukan,
          tglPeneluran,
          perkiraanTglPeneluran,
          inputKetebalanPenutup,
          inputKedalamanDasar,
          inputJumlahTelur,
          inputJenisPenyu01,
          inputTelurBaik,
          inputTelurRusak,
          inputTelurMati,
          inputTelurAbnormal,
          jumlahTelurMenetas,
          jumlahTelurGagal,
          jumlahMatiMenetas,
          createdAt,
        };

        try {
          await addDoc(collection(database, 'patroli'), newPatroli);
          swal('Berhasil Menambahkan data', '', 'success');
        } catch (error) {
          console.error('Error adding document: ', error);
        }
      }

      document.dispatchEvent(new Event(RENDER_EVENT));
    };

    // Edit Data (mengubah data sarang)
    const updateSarang = async (id) => {
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

      const docSnap = await getDoc(doc(database, 'patroli', id));

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

        const confirmUpdatingSarangButton = document.querySelector('.updateBtn');
        confirmUpdatingSarangButton.addEventListener('click', async () => {
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

          await updateDoc(doc(database, 'patroli', id), updatePatroli);
          document.dispatchEvent(new Event(RENDER_EVENT));
          swal('Sukses', 'Data berhasil diupdate', 'success');
        });
        confirmUpdatingSarangButton.setAttribute('id', id);
      } else {
        console.log('No such document!');
      }
    };

    // View Detail Data (melihat data sarang secara detail)
    const viewSarang = async (id) => {
      const docSnap = await getDoc(doc(database, 'patroli', id));

      if (docSnap.exists()) {
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

    // Delete Data (menghapus data sarang)
    const deleteSarang = async (id) => {
      const text = 'Yakin ingin menghapus data?';
      if (confirm(text) === true) {
        await deleteDoc(doc(database, 'patroli', id));
        swal('Berhasil Menghapus data', '', 'success');
      }

      document.dispatchEvent(new Event(RENDER_EVENT));
    };

    document.addEventListener(RENDER_EVENT, async () => {
      tableContainer.innerHTML = '';
      const q = query(coll, where('inputTelurBaik', '!=', 0));
      const querySnapshot = await getDocs(q);
      let index = 1;
      querySnapshot.docs.reverse().forEach((item) => {
        const sarangElement = document.createElement('tr');
        sarangElement.innerHTML += `
            <th scope="row" class="text-center">${index}</th>
            <td>${item._document.data.value.mapValue.fields.tglPenemuan.stringValue}</td>
            <td class="text-center">${item._document.data.value.mapValue.fields.waktuDitemukan.stringValue}</td>
            <td class="text-center">${item._document.data.value.mapValue.fields.tglPeneluran.stringValue}</td> 
            <td class="text-center">${item._document.data.value.mapValue.fields.perkiraanTglPeneluran.stringValue}</td>
            <td class="text-center">
              <button type="button" class="btn btn-warning px-2 rounded-4 update-btn" data-bs-toggle="modal" data-bs-target="#modalUpdateData" title="Ubah Data" id=${item.id}><i class="bi bi-pencil-square action-btn"></i></button>
              <button type="button" class="btn btn-danger px-2 rounded-4 delete-btn" title="Hapus Data" id=${item.id}><i class="bi bi-trash-fill"></i></button>
              <button type="button" class="btn btn-success px-2 rounded-4 view-btn" data-bs-toggle="modal" data-bs-target="#modalViewData" title="Detail" id=${item.id}>•••</button>
            </td>
          `;

        tableContainer.appendChild(sarangElement);
        index += 1;
      });

      const deleteSarangButtons = document.querySelectorAll('.delete-btn');
      deleteSarangButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', (event) => {
          event.stopPropagation();
          const sarangId = event.currentTarget.id;

          deleteSarang(sarangId);
        });
      });

      const updateSarangButtons = document.querySelectorAll('.update-btn');
      updateSarangButtons.forEach((updateButton) => {
        updateButton.addEventListener('click', (event) => {
          event.stopPropagation();
          const sarangId = event.currentTarget.id;

          updateSarang(sarangId);
        });
      });

      const viewSarangButtons = document.querySelectorAll('.view-btn');
      viewSarangButtons.forEach((detailSarang) => {
        detailSarang.addEventListener('click', (event) => {
          event.stopPropagation();
          const sarangId = event.currentTarget.id;

          viewSarang(sarangId);
        });
      });
    });

    // Event Listener
    const addSarangButton = document.getElementById('add-btn');
    addSarangButton.addEventListener('click', async (event) => {
      event.preventDefault();
      addSarang();
    });

    document.dispatchEvent(new Event(RENDER_EVENT));
  },
};

export default PatroliPage;
