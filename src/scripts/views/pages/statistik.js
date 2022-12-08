/* eslint-disable max-len */
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  getCountFromServer,
} from 'firebase/firestore';
import firebaseConfig from '../../globals/firebase-config';

const StatistikPage = {
  async render() {
    return `
    <h2 class="text-center mt-5" id="statistik">Statistik Konservasi Penyu</h2>
    <h3 class="text-center mt-3 pt-4">Statistik tahun 2022</h3>
    <div class="row row-cols-1 row-cols-md-5 g-4 mx-5 my-2">
      <div class="col">
        <div class="card statistic-card text-center rounded-5" style="max-width: 18rem;">
          <div class="card-header">Sarang Ditemukan</div>
          <div class="card-body">
            <h5 class="card-title" id="sarangDitemukan"></h5>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card statistic-card text-center rounded-5" style="max-width: 18rem;">
          <div class="card-header">Telur Ditemukan</div>
          <div class="card-body">
            <h5 class="card-title" id="telurDitemukan"></h5>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card statistic-card text-center rounded-5" style="max-width: 18rem;">
          <div class="card-header">Telur Menetas</div>
          <div class="card-body">
            <h5 class="card-title" id="telurMenetas">642</h5>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card statistic-card text-center rounded-5" style="max-width: 18rem;">
          <div class="card-header">Telur Gagal Menetas</div>
          <div class="card-body">
            <h5 class="card-title" id="telurGagal">642</h5>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card statistic-card text-center rounded-5" style="max-width: 18rem;">
          <div class="card-header">Tukik Dilepaskan</div>
          <div class="card-body">
            <h5 class="card-title" id="tukikDilepaskan">642</h5>
          </div>
        </div>
      </div>
    </div>
     
    <h3 class="text-center mt-5">Statistik Keseluruhan</h3>
    <div class="row row-cols-1 row-cols-md-4 g-4 mx-5 my-2">
      <div class="col">
        <div class="card statistic-card text-center rounded-5" style="max-width: 18rem;">
          <div class="card-header">Total Sarang Ditemukan</div>
          <div class="card-body">
            <h5 class="card-title" id="totalSarang">642</h5>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card statistic-card text-center rounded-5" style="max-width: 18rem;">
          <div class="card-header">Total Telur Ditemukan</div>
          <div class="card-body">
            <h5 class="card-title" id="totalTelur">642</h5>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card statistic-card text-center rounded-5" style="max-width: 18rem;">
          <div class="card-header">Total Telur Menetas</div>
          <div class="card-body">
            <h5 class="card-title" id="totalMenetas">642</h5>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card statistic-card text-center rounded-5" style="max-width: 18rem;">
          <div class="card-header">Total Tukik Dilepaskan</div>
          <div class="card-body">
            <h5 class="card-title" id="totalDilepaskan">642</h5>
          </div>
        </div>
      </div>
    </div>
    <!-- END UMUM -->
  
    <!-- JENIS -->
    <h3 class="text-center mt-5">Statistik Berdasarkan Jenis</h3>
    <div class="row row-cols-1 row-cols-md-2 g-4 mx-5 my-2">
      <div class="col"> 
        <div class="card text-center mx-auto  rounded-4 border-0" style="max-width: 30rem;">
          <img src="https://i.ibb.co/6b3dGzZ/Penyu-Sisik.jpg" alt="Penyu-Sisik" border="0" class="rounded-4">
          <div class="card-body">
            <button class="btn filled-button me-4 mt-3 px-3 rounded-4" data-bs-toggle="modal" data-bs-target="#detailPenyuLekang" type="button">Penyu Lekang</button>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card text-center mx-auto tipe_penyu rounded-4 border-0" style="max-width: 30rem;">
          <img src="https://i.ibb.co/6b3dGzZ/Penyu-Sisik.jpg" alt="Penyu-Sisik" border="0" class="rounded-4">
          <div class="card-body">
            <button class="btn filled-button me-4 mt-3 px-3 rounded-4" data-bs-toggle="modal" data-bs-target="#detailPenyuSisik" type="button">Penyu Sisik</button>
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

    const sarangDitemukan = document.getElementById('sarangDitemukan');
    const telurDitemukan = document.getElementById('telurDitemukan');

    document.addEventListener(RENDER_EVENT, async () => {
      const coll = collection(database, 'patroli');
      const snapshot = await getCountFromServer(coll);
      console.log(snapshot.data().count);

      sarangDitemukan.innerHTML = `${snapshot.data().count}`;

      const q = query(collection(database, 'patroli'));

      const querySnapshot = await getDocs(q);

      let jumlahTelur = null;
      querySnapshot.forEach((item) => {
        const x = Math.floor(item.data().inputJumlahTelur);
        jumlahTelur += x;
        telurDitemukan.innerHTML = `${jumlahTelur}`;
      });
    });

    document.dispatchEvent(new Event(RENDER_EVENT));
  },
};

export default StatistikPage;
