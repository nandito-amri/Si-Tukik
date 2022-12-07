import HomePage from '../views/pages/homePage';
import InkubasiPage from '../views/pages/inkubasi';
import PatroliPage from '../views/pages/patroli';
import PenangkaranPage from '../views/pages/penangkaran';
import PerilisanPage from '../views/pages/perilisan';
import AboutUs from '../views/pages/about';
import StatistikPage from '../views/pages/statistik';
import DokumentasiPage from '../views/pages/dokumentasi';

const routes = {
  '/': HomePage,
  '/home': HomePage,
  '/about': AboutUs,
  '/statistik': StatistikPage,
  '/dokumentasi': DokumentasiPage,
  '/inkubasi': InkubasiPage,
  '/patroli': PatroliPage,
  '/penangkaran': PenangkaranPage,
  '/perilisan': PerilisanPage,
};

export default routes;
