import HomePage from '../views/pages/homePage';
import InkubasiPage from '../views/pages/inkubasi';
import PatroliPage from '../views/pages/patroli';
import PenangkaranPage from '../views/pages/penangkaran';
import PerilisanPage from '../views/pages/perilisan';

const routes = {
  '/': HomePage,
  '/inkubasi': InkubasiPage,
  '/patroli': PatroliPage,
  '/penangkaran': PenangkaranPage,
  '/perilisan': PerilisanPage,
};

export default routes;
