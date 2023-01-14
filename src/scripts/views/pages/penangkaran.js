import { initializeApp } from 'firebase/app';
import swal from 'sweetalert';
import {
  addDoc,
  getFirestore,
  collection,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import firebaseConfig from '../../globals/firebase-config';

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
              <div class="card-header">Total Tukik dalam Penangkaran</div>
              <div class="card-body">
                <h5 class="card-title" id="jumlahLekang"></h5>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card text-bg-light text-center mx-auto statistic-card rounded-4" style="max-width: 18rem;">
              <div class="card-header">Mati dalam Penangkaran</div>
              <div class="card-body">
                <h5 class="card-title" id="lekangMati"></h5>
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
                <h5 class="card-title" id="jumlahSisik"></h5>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card text-bg-light text-center mx-auto statistic-card rounded-4" style="max-width: 18rem;">
              <div class="card-header">Mati dalam Penangkaran</div>
              <div class="card-body">
                <h5 class="card-title" id="sisikMati"></h5>
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

      <!--  ================================= MODAL EDIT DATA PENANGKARAN   -->
      <div class="modal fade" id="editDataPenangkaran" tabindex="-1" aria-labelledby="editDataPenangkaranLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 w-100 text-center" id="exampleModalLabel">Edit Data Penangkaran</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="text-center pb-2">Isikan data berikut ketika ingin data tukik di penangkaran</p>
              
              <form>
                <div class="container my-3">
              <div class="row row-cols-2">
                <div class="col">
                  <div class="mb-3">
                    <label for="inputJenisPenyu" class="form-label">Jenis Penyu</label>
                <div class="input-group mb-3">
                  <select class="form-select" id="inputJenisPenyu">
                    <option selected>Jenis Penyu</option>
                    <option value="Lekang">Lekang</option>
                    <option value="Sisik">Sisik</option>
                  </select>
                </div>
                  </div>
                  </div>
                <div class="col">
                  <div class="mb-3">
                  <label for="jumlahTukikMati" class="form-label">Jumlah Tukik Mati</label>
                  <input type="number" class="form-control" id="jumlahTukikMati" aria-describedby="dateHelp">
                </div>
            </div>
                </div>
              </div>
              </form>
      </div>
            <div class="modal-footer mx-auto">
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Batal</button>
              <button type="button" class="btn btn-primary" id="save">Simpan</button>
            </div>
          </div>
        </div>
      </div>
          
      <!-- ================================= MODAL RILIS TUKIK -->
      <div class="modal fade" id="rilisTukikModal" tabindex="-1" aria-labelledby="rilisTukikModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 w-100 text-center" id="exampleModalLabel">Rilis Tukik Dari Penangkaran</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="text-center pb-2">Isikan data berikut ketika akan melakukan perilisan tukik</p>
              
              <form class="addrilis">
                <div class="container my-3">
              <div class="row row-cols-2">
                <div class="col">
                  <div class="mb-3">
                  <label for="exampleInputDate" class="form-label">Tanggal Perilisan</label>
                  <input type="date" class="form-control" id="tglPerilisan" aria-describedby="dateHelp">
                </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                  <label for="exampleInputDate" class="form-label">Waktu Perilisan</label>
                  <input type="time" class="form-control" id="waktuPerilisan" aria-describedby="dateHelp">
                </div>
                </div>
                <div class="container my-3">
                <div class="col">
                  <div class="mb-3">
                  <label for="exampleInputWeather" class="form-label">Cuaca</label>
                <div class="input-group mb-3">
                  <select class="form-select" id="cuaca">
                    <option selected>Kondisi Cuaca...</option>
                    <option value="Cerah">Cerah</option>
                    <option value="Mendung">Mendung</option>
                    <option value="Hujan">Hujan</option>
                  </select>
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
                  <select class="form-select" id="jenisPenyu">
                    <option selected>Jenis Penyu</option>
                    <option value="Lekang">Lekang</option>
                    <option value="Sisik">Sisik</option>
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
            <button type="button" class="btn ghost-button" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn filled-button" data-bs-dismiss="modal" id="rilisBtn">Rilis</button>
    
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
    const app = initializeApp(firebaseConfig);
    const database = getFirestore(app);

    const penyuLekang = await getDoc(doc(database, 'penangkaran', 'Lekang'));
    const penyuSisik = await getDoc(doc(database, 'penangkaran', 'Sisik'));

    const editDataPenangkaran = async () => {
      const jenisPenyu = document.getElementById('inputJenisPenyu').value;
      const jumlahTukikMati = Number(document.getElementById('jumlahTukikMati').value);
      console.log(jenisPenyu);

      if (jenisPenyu === 'Lekang') {
        let updateTukikDalamPenangkaran = penyuLekang.data().jumlahTukikDalamPenangkaran;
        updateTukikDalamPenangkaran -= jumlahTukikMati;

        let updateTukikMati = penyuLekang.data().jumlahTukikMati;
        updateTukikMati += jumlahTukikMati;

        const updatePenangkaran = {
          jumlahTukikDalamPenangkaran: updateTukikDalamPenangkaran,
          jumlahTukikMati: updateTukikMati,
        };

        await updateDoc(doc(database, 'penangkaran', 'Lekang'), updatePenangkaran);

        document.dispatchEvent(new Event(RENDER_EVENT));
        swal('Sukses', 'Data berhasil diupdate', 'success');
      } else if (jenisPenyu === 'Sisik') {
        let updateTukikDalamPenangkaran = penyuSisik.data().jumlahTukikDalamPenangkaran;
        updateTukikDalamPenangkaran -= jumlahTukikMati;

        let updateTukikMati = penyuSisik.data().jumlahTukikMati;
        updateTukikMati += jumlahTukikMati;

        const updatePenangkaran = {
          jumlahTukikDalamPenangkaran: updateTukikDalamPenangkaran,
          jumlahTukikMati: updateTukikMati,
        };

        await updateDoc(doc(database, 'penangkaran', 'Sisik'), updatePenangkaran);

        document.dispatchEvent(new Event(RENDER_EVENT));
        swal('Sukses', 'Data berhasil diupdate', 'success');
      } else {
        swal('Jenis Penyu Tidak Ditemukan', '', 'warning');
      }
    };

    const rilisTukik = async () => {
      const addRilisForm = document.querySelector('.addrilis');

      const jenisPenyu = addRilisForm.jenisPenyu.value;
      const jumlahTukikDirilis = Number(addRilisForm.jumlahTukikRilis.value);

      if (jenisPenyu === 'Lekang') {
        let updateTukikDalamPenangkaran = penyuLekang.data().jumlahTukikDalamPenangkaran;
        console.log(updateTukikDalamPenangkaran);
        if (jumlahTukikDirilis > updateTukikDalamPenangkaran) {
          swal('Jumlah Tukik kurang', '', 'warning');
        } else {
          updateTukikDalamPenangkaran -= jumlahTukikDirilis;

          const updatePenangkaran = {
            jumlahTukikDalamPenangkaran: updateTukikDalamPenangkaran,
          };

          await updateDoc(doc(database, 'penangkaran', 'Lekang'), updatePenangkaran);

          const newRilis = {
            tglPerilisan: addRilisForm.tglPerilisan.value,
            waktuPerilisan: addRilisForm.waktuPerilisan.value,
            cuaca: addRilisForm.cuaca.value,
            jenisPenyu: addRilisForm.jenisPenyu.value,
            jumlahTukikRilis: addRilisForm.jumlahTukikRilis.value,
          };

          await addDoc(collection(database, 'rilis'), newRilis);
        }
      } else if (jenisPenyu === 'Sisik') {
        let updateTukikDalamPenangkaran = penyuSisik.data().jumlahTukikDalamPenangkaran;
        if (jumlahTukikDirilis > updateTukikDalamPenangkaran) {
          swal('Jumlah Tukik kurang', '', 'warning');
        } else {
          updateTukikDalamPenangkaran -= jumlahTukikDirilis;

          const updatePenangkaran = {
            jumlahTukikDalamPenangkaran: updateTukikDalamPenangkaran,
          };

          await updateDoc(doc(database, 'penangkaran', 'Sisik'), updatePenangkaran);

          const newRilis = {
            tglPerilisan: addRilisForm.tglPerilisan.value,
            waktuPerilisan: addRilisForm.waktuPerilisan.value,
            cuaca: addRilisForm.cuaca.value,
            jenisPenyu: addRilisForm.jenisPenyu.value,
            jumlahTukikRilis: addRilisForm.jumlahTukikRilis.value,
          };

          await addDoc(collection(database, 'rilis'), newRilis);
        }
      }

      document.dispatchEvent(new Event(RENDER_EVENT));
      swal('Berhasil', '', 'success');
    };

    document.addEventListener(RENDER_EVENT, async () => {
      const jumlahLekang = document.getElementById('jumlahLekang');
      const jumlahSisik = document.getElementById('jumlahSisik');
      const lekangMati = document.getElementById('lekangMati');
      const sisikMati = document.getElementById('sisikMati');

      jumlahLekang.innerHTML = '';
      jumlahSisik.innerHTML = '';
      lekangMati.innerHTML = '';
      sisikMati.innerHTML = '';

      jumlahLekang.innerHTML += penyuLekang.data().jumlahTukikDalamPenangkaran;
      jumlahSisik.innerHTML += penyuSisik.data().jumlahTukikDalamPenangkaran;
      lekangMati.innerHTML += penyuLekang.data().jumlahTukikMati;
      sisikMati.innerHTML += penyuSisik.data().jumlahTukikMati;

      const editButton = document.getElementById('save');
      editButton.addEventListener('click', (event) => {
        event.preventDefault();
        editDataPenangkaran();
      });

      const rilisButton = document.getElementById('rilisBtn');
      rilisButton.addEventListener('click', (event) => {
        event.preventDefault();
        rilisTukik();
      });
    });

    document.dispatchEvent(new Event(RENDER_EVENT));
  },
};

export default PenangkaranPage;
