import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import swal from 'sweetalert';
import UrlParser from '../routes/url-parser';

const loginreq = () => {
  onAuthStateChanged(getAuth(), (user) => {
    if (!user) {
      location.href = '#/';
      console.log('Login Require');
    }
  });
};

export default loginreq;

const Landing = () => {
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const loginBtn = document.querySelector('[data-button="login"]');

  loginBtn.onclick = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email.value, password.value);
      await swal('Berhasil Masuk', 'Selamat datang Konservator!', 'success');
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      swal(`Gagal masuk \n ${error}`, '', 'error');
    }
  };
};

const Dashboard = () => {
  const container = document.querySelector('.container');
  const masukButton = document.querySelector('[data-button="login1"]');
  const profileDropdown = document.getElementById('profil-konservator');
  const footer = document.getElementById('footer');
  const welcomePage = document.createElement('div');
  welcomePage.classList.add('Dashboard');
  welcomePage.innerHTML = `
    <div class="container mx-auto text-center px-5" id="welcomePage">
    <img src="https://i.ibb.co/6b3dGzZ/Penyu-Sisik.jpg" alt="Penyu-Sisik" border="0" class="img-fluid rounded tukik" style="width: 30rem">
    <div>
      <h1 class="mt-5">Si Tukik</h1>
      <h2 class="mb-4">Penyelamat Penyu</h2>
      <div class="mx-auto" style="max-width:500px">
      <p>Selamat datang, Konservator! Melalui fitur ini kamu bisa melakukan pendataan dan memonitor perkembangan penyu yang ada di konservasi. </p>
      </div>
      <button class="btn filled-button mt-4 px-4 rounded-4" data-bs-toggle="modal" data-bs-target="#"><a href="#/patroli" class="linkButton">Mulai Mendata</a></button>
    </div>
  `;

  const url = UrlParser.parseActiveUrlWithCombiner();
  console.log(url);
  if (url === '/') {
    container.innerHTML = '';
    container.appendChild(welcomePage);
  }

  masukButton.style.display = 'none';
  profileDropdown.classList.remove('d-none');
  footer.classList.add('d-none');

  const logout = document.getElementById('logout');
  logout.onclick = async () => {
    try {
      await signOut(getAuth());
      await swal('Berhasil Keluar', '', 'success');
      setTimeout(() => {
        location.href = '#/';
        location.reload();
      }, 1000);
    } catch (error) {
      swal(`Gagal keluar \n ${error}`, '', 'error');
    }
  };
};

export { Landing, Dashboard };
