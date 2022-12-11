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
  where,
} from 'firebase/firestore';
import firebaseConfig from '../../globals/firebase-config';

const StatistikPage = {
  async render() {
    return `
    <h2 class="text-center mt-5" id="statistik">Statistik Konservasi Penyu</h2>
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
            <h5 class="card-title" id="telurMenetas"></h5>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card statistic-card text-center rounded-5" style="max-width: 18rem;">
          <div class="card-header">Telur Gagal Menetas</div>
          <div class="card-body">
            <h5 class="card-title" id="telurGagal"></h5>
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
    <!-- END UMUM -->
  
    <!-- JENIS -->
    <h3 class="text-center" id="statistikJenis">Statistik Berdasarkan Jenis</h3>
    <div class="row row-cols-1 row-cols-md-2 g-4 mx-5 my-2">
      <div class="col"> 
        <div class="card text-center mx-auto  rounded-4 border-0" style="max-width: 30rem;">
          <img src="https://i.ibb.co/K5fTpwX/lekang3.jpg" alt="Penyu-Lekang" border="0" class="rounded-4">
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
    const RENDER_EVENT = 'render-event';
    const app = initializeApp(firebaseConfig);
    const database = getFirestore(app);

    const sarangDitemukan = document.getElementById('sarangDitemukan');
    const telurDitemukan = document.getElementById('telurDitemukan');
    const telurMenetas = document.getElementById('telurMenetas');
    const telurGagal = document.getElementById('telurGagal');
    const tukikRilis = document.getElementById('tukikDilepaskan');

    // Lekang
    const sarangDitemukanLekang = document.getElementById('sarangDitemukanLekang');
    const telurDitemukanLekang = document.getElementById('telurDitemukanLekang');
    const telurMenetasLekang = document.getElementById('telurMenetasLekang');
    const telurGagalLekang = document.getElementById('telurGagalLekang');
    const tukikDilepaskanLekang = document.getElementById('tukikDilepaskanLekang');

    // Sisik
    const sarangDitemukanSisik = document.getElementById('sarangDitemukanSisik');
    const telurDitemukanSisik = document.getElementById('telurDitemukanSisik');
    const telurMenetasSisik = document.getElementById('telurMenetasSisik');
    const telurGagalSisik = document.getElementById('telurGagalSisik');
    const tukikDilepaskanSisik = document.getElementById('tukikDilepaskanSisik');

    document.addEventListener(RENDER_EVENT, async () => {
      const coll = collection(database, 'patroli');
      const snapshot = await getCountFromServer(coll);
      console.log(snapshot.data().count);

      sarangDitemukan.innerHTML = `${snapshot.data().count}`;

      const q = query(collection(database, 'patroli'));

      const querySnapshot = await getDocs(q);

      let jumlahTelurTotal = null;
      let telurMenetasTotal = null;
      let telurGagalTotal = null;
      querySnapshot.forEach((item) => {
        const x = Math.floor(item.data().inputJumlahTelur);
        jumlahTelurTotal += x;
        telurDitemukan.innerHTML = `${jumlahTelurTotal}`;

        const menetas = Math.floor(item.data().jumlahTelurMenetas);
        telurMenetasTotal += menetas;
        telurMenetas.innerHTML = `${telurMenetasTotal}`;

        const gagal = Math.floor(item.data().jumlahTelurGagal);
        telurGagalTotal += gagal;
        telurGagal.innerHTML = `${telurGagalTotal}`;

        // console.log(new Date(`${item.data().tglPenemuan}`).getFullYear());
      });

      // Lekang sarang telur
      const queryLekang = query(coll, where('inputJenisPenyu01', '==', 'Lekang'));
      const lekang = await getCountFromServer(queryLekang);

      sarangDitemukanLekang.innerHTML = `${lekang.data().count}`;

      const querySnapshotLekang = await getDocs(queryLekang);
      let jumlahTelurTotalLekang = null;
      let telurMenetasTotalLekang = null;
      let telurGagalTotalLekang = null;
      querySnapshotLekang.forEach((item) => {
        const telurLekang = Math.floor(item.data().inputJumlahTelur);
        jumlahTelurTotalLekang += telurLekang;
        telurDitemukanLekang.innerHTML = `${jumlahTelurTotalLekang}`;

        const menetasLekang = Math.floor(item.data().jumlahTelurMenetas);
        telurMenetasTotalLekang += menetasLekang;
        telurMenetasLekang.innerHTML = `${telurMenetasTotalLekang}`;

        const gagalLekang = Math.floor(item.data().jumlahTelurGagal);
        telurGagalTotalLekang += gagalLekang;
        telurGagalLekang.innerHTML = `${telurGagalTotalLekang}`;
      });

      // Sisik sarang telur
      const querySisik = query(coll, where('inputJenisPenyu01', '==', 'Sisik'));
      const sisik = await getCountFromServer(querySisik);

      sarangDitemukanSisik.innerHTML = `${sisik.data().count}`;

      const querySnapshotSisik = await getDocs(querySisik);
      let jumlahTelurTotalSisik = null;
      let telurMenetasTotalSisik = null;
      let telurGagalTotalSisik = null;
      querySnapshotSisik.forEach((item) => {
        const telurSisik = Math.floor(item.data().inputJumlahTelur);
        jumlahTelurTotalSisik += telurSisik;
        telurDitemukanSisik.innerHTML = `${jumlahTelurTotalSisik}`;

        const menetasSisik = Math.floor(item.data().jumlahTelurMenetas);
        telurMenetasTotalSisik += menetasSisik;
        telurMenetasSisik.innerHTML = `${telurMenetasTotalSisik}`;

        const gagalSisik = Math.floor(item.data().jumlahTelurGagal);
        telurGagalTotalSisik += gagalSisik;
        telurGagalSisik.innerHTML = `${telurGagalTotalSisik}`;
      });

      // PERILISAN
      const queryRilis = query(collection(database, 'rilis'));
      const querySnapshotRilis = await getDocs(queryRilis);

      let jumlahRilisTotal = null;
      querySnapshotRilis.forEach((item) => {
        const jumlahRilis = Math.floor(item.data().jumlahTukikRilis);
        jumlahRilisTotal += jumlahRilis;
        tukikRilis.innerHTML = `${jumlahRilisTotal}`;
      });

      // rilis lekang
      const queryLekangRilis = query(collection(database, 'rilis'), where('jenisPenyu', '==', 'Lekang'));
      const snapshotLekangRilis = await getDocs(queryLekangRilis);

      let jumlahRilisTotalLekang = null;
      snapshotLekangRilis.forEach((item) => {
        const jumlahRilisLekang = Math.floor(item.data().jumlahTukikRilis);
        jumlahRilisTotalLekang += jumlahRilisLekang;
        tukikDilepaskanLekang.innerHTML = `${jumlahRilisTotalLekang}`;
      });

      // rilis sisik
      const querySisikRilis = query(collection(database, 'rilis'), where('jenisPenyu', '==', 'Sisik'));
      const snapshotSisikRilis = await getDocs(querySisikRilis);

      let jumlahRilisTotalSisik = null;
      snapshotSisikRilis.forEach((item) => {
        const jumlahRilisSisik = Math.floor(item.data().jumlahTukikRilis);
        jumlahRilisTotalSisik += jumlahRilisSisik;
        tukikDilepaskanSisik.innerHTML = `${jumlahRilisTotalSisik}`;
      });
    });

    document.dispatchEvent(new Event(RENDER_EVENT));
  },
};

export default StatistikPage;
