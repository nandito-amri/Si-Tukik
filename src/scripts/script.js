/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
const container = document.querySelector('.container');

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    Dashboard(user);
  } else {
    Landing();
  }
});

const Landing = () => {
  document.getElementsByClassName('.container');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');

  const loginBtn = document.querySelector('[data-button="login"]');
  const forgotBtn = document.querySelector('[data-button="forgot"]');

  loginBtn.onclick = () => {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then((cred) => {
        alert(`Selamat Datang Akun: ${cred.user.uid}`);
        location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  forgotBtn.onclick = () => {
    firebase.auth().sendPasswordResetEmail(email.value)
      .then(() => {
        alert('Reset Verif sudah dikirim ke email');
      })
      .catch((error) => {
        // ..
      });
  };
};

const Dashboard = (user) => {
  const masukBtn = document.querySelector('[data-button="login1"]');
  const element = document.createElement('div');
  element.classList.add('Dashboard');
  element.innerHTML = (`
        <br>
        <h2>Login Sukses, ini adalah halaman dashboard</h2>
        <button class="btn px-4 rounded-4 filled-button ms-auto me-3" data-bs-toggle="modal" data-bs-target="#loginModal" type="submit" data-button="logout">Logout</button>
    `);
  masukBtn.style.display = 'none';
  container.innerHTML = '';
  container.appendChild(element);

  const logout = element.querySelector('[data-button="logout"]');
  logout.onclick = () => firebase.auth().signOut().then(() => {
    alert('Berhasil Logout');
    location.reload();
  }).catch((err) => alert(err));
};
