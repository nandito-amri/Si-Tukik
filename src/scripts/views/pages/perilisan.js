import { initializeApp } from 'firebase/app';
import swal from 'sweetalert';
import {
  getFirestore,
  collection,
  doc,
  query,
  getDoc,
  deleteDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import firebaseConfig from '../../globals/firebase-config';

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
        <tbody id="tabel_perilisan"></tbody>
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
                  <label for="exampleInputDate" class="form-label">Tanggal Perilisan</label>
                  <input type="date" class="form-control" id="update-tglPerilisan" aria-describedby="dateHelp">
                </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                  <label for="exampleInputDate" class="form-label">Waktu Perilisan</label>
                  <input type="time" class="form-control" id="update-waktuPerilisan" aria-describedby="dateHelp">
                </div>
                </div> 
                <div class="col">
                  <div class="mb-3">
                  <label for="exampleInputWeather" class="form-la bel">Cuaca</label>
                <div class="input-group mb-3">
                  <select class="form-select" id="update-cuaca">
                    <option selected>Kondisi Cuaca...</option>
                    <option value="Cerah">Cerah</option>
                    <option value="Mendung">Mendung</option>
                    <option value="Hujan">Hujan</option>
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
                  <select class="form-select" id="update-JenisPenyu">
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
                  <input type="number" class="form-control" id="update-jumlahTukikRilis" aria-describedby="dateHelp" placeholder="ekor">
                </div>
            </div>
                </div>
              </div>
              </form>
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
    const RENDER_EVENT = 'render-event';
    const app = initializeApp(firebaseConfig);
    const database = getFirestore(app);

    const tableContainer = document.getElementById('tabel_perilisan');

    const deleteRilis = async (id) => {
      const text = 'Yakin ingin menghapus data?';
      if (confirm(text) === true) {
        await deleteDoc(doc(database, 'rilis', id));
        console.log('deleteing is succeess');
        swal('Berhasil Menghapus data', '', 'success');
      }

      document.dispatchEvent(new Event(RENDER_EVENT));
    };

    const updateRilis = async (id) => {
      const updatetglPerilisan = document.getElementById('update-tglPerilisan');
      const updatewaktuPerilisan = document.getElementById('update-waktuPerilisan');
      const updateCuaca = document.getElementById('update-cuaca');
      const updatejenisPenyu = document.getElementById('update-JenisPenyu');
      const updatejumlahTukikRilis = document.getElementById('update-jumlahTukikRilis');

      const docSnap = await getDoc(doc(database, 'rilis', id));
      if (docSnap.exists()) {
        updatetglPerilisan.value = docSnap.data().tglPerilisan;
        updatewaktuPerilisan.value = docSnap.data().waktuPerilisan;
        updateCuaca.value = docSnap.data().cuaca;
        updatejenisPenyu.value = docSnap.data().jenisPenyu;
        updatejumlahTukikRilis.value = docSnap.data().jumlahTukikRilis;

        const confirmUpdatingRilisButton = document.querySelector('.updateBtn');
        confirmUpdatingRilisButton.addEventListener('click', async () => {
          // eslint-disable-next-line no-shadow
          const updateRilis = {
            tglPerilisan: updatetglPerilisan.value,
            waktuPerilisan: updatewaktuPerilisan.value,
            cuaca: updateCuaca.value,
            jenisPenyu: updatejenisPenyu.value,
            jumlahTukikRilis: updatejumlahTukikRilis.value,
          };

          await updateDoc(doc(database, 'rilis', id), updateRilis);
          document.dispatchEvent(new Event(RENDER_EVENT));
          swal('Sukses', 'Data berhasil diupdate', 'success');
        });
        confirmUpdatingRilisButton.setAttribute('id', id);
      } else {
        console.log('No such document!');
      }
    };

    document.addEventListener(RENDER_EVENT, async () => {
      tableContainer.innerHTML = '';
      const q = query(collection(database, 'rilis'));

      const querySnapshot = await getDocs(q);
      let index = 1;
      querySnapshot.forEach((item) => {
        const sarangElement = document.createElement('tr');
        sarangElement.innerHTML += `
          <th scope="row" class="text-center">${index}</th>
          <td class="text-center">${item.data().tglPerilisan}</td>
          <td class="text-center">${item.data().waktuPerilisan}</td>
          <td class="text-center">${item.data().cuaca}</td>
          <td class="text-center">${item.data().jenisPenyu}</td>
          <td class="text-center">${item.data().jumlahTukikRilis}</td>
          <td class="text-center">
            <button type="button" class="btn btn-warning px-2 rounded-4 update-btn" data-bs-toggle="modal" data-bs-target="#ubahRilisModal" title="Ubah Data" id=${item.id}><i class="bi bi-pencil-square action-btn"></i></button>
            <button type="button" class="btn btn-danger px-2 rounded-4 delete-btn" title="Hapus Data" id=${item.id}><i class="bi bi-trash-fill"></i></button>
          </td> 
        `;

        tableContainer.appendChild(sarangElement);
        index += 1;
      });

      const deleteRilisButtons = document.querySelectorAll('.delete-btn');
      deleteRilisButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', (event) => {
          event.stopPropagation();
          const sarangId = event.currentTarget.id;

          deleteRilis(sarangId);
        });
      });

      const updateRilisButtons = document.querySelectorAll('.update-btn');
      updateRilisButtons.forEach((updateButton) => {
        updateButton.addEventListener('click', (event) => {
          event.stopPropagation();
          const sarangId = event.currentTarget.id;
          
          updateRilis(sarangId);
        });
      });
    });

    document.dispatchEvent(new Event(RENDER_EVENT));
  },
};
export default PerilisanPage;
