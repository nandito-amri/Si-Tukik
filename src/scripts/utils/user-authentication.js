/* eslint-disable import/no-unresolved */
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import swal from 'sweetalert';

const Landing = () => {
  document.getElementsByClassName('.container');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const loginBtn = document.querySelector('[data-button="login"]');
  // const forgotBtn = document.getElementById('forgot');

  loginBtn.onclick = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
      .then(() => {
        swal('Berhasil Masuk', 'Selamat datang Konservator!', 'success');
        setTimeout(() => {
          location.reload();
        }, 1000);
      })
      .catch(() => {
        swal('Gagal Masuk', '', 'error');
      });
  };

  /* forgotBtn.onclick = () => {
    firebase.auth().sendPasswordResetEmail(email.value)
      .then(() => {
        alert('Reset Verif sudah dikirim ke email');
      })
      .catch((error) => {
        // ..
      });
    };
  */
};

const Dashboard = (user) => {
  const container = document.querySelector('.container');
  const masukBtn = document.querySelector('[data-button="login1"]');
  const profileDropdown = document.getElementById('profil-konservator');
  const footer = document.getElementById('footer');
  const element = document.createElement('div');
  element.classList.add('Dashboard');
  element.innerHTML = (`
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
    `);
  masukBtn.style.display = 'none';
  profileDropdown.classList.remove('d-none');
  footer.classList.add('d-none');
  container.innerHTML = '';
  container.appendChild(element);

  const logout = document.getElementById('logout');
  logout.onclick = () => signOut(getAuth()).then(() => {
    swal('Berhasil Keluar', '', 'success');
    setTimeout(() => {
      location.reload();
    }, 1000);
  }).catch((err) => alert(err));
};

export { Landing, Dashboard };
