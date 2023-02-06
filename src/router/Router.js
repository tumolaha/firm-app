//layout
import HeaderOnly from '~/layout/HeaderOnly';
import { configRouter } from '~/configs/router';

//components
import Course from '~/pages/Course';
import Following from '~/pages/Following';
import Home from '~/pages/Home/Home';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';
import Solution from '~/pages/Solution';
import Register from '~/pages/Register';
import FullLayout from '~/layout/Components/FullLayout/FullLayout';
import MovieInfo from '~/pages/Movie/MovieInfo';
import MovieWatch from '~/pages/Movie/MovieWatch';

const publicRoutes = [
    { path: configRouter.home, component: Home },
    { path: configRouter.login, component: Login, layout: FullLayout },
    { path: configRouter.register, component: Register, layout: FullLayout },
    { path: configRouter.movieInfo, component: MovieInfo },
    { path: configRouter.movieWatch, component: MovieWatch, },
    { path: configRouter.profile, component: Login },
];
const privateRoutes = [
    { path: configRouter.home, component: Home },
    { path: configRouter.login, component: Following },
    { path: configRouter.register, component: Following },
    { path: configRouter.movieInfo, component: MovieInfo },
    { path: configRouter.course, component: Course },
    { path: configRouter.solution, component: Solution },
    { path: configRouter.profile, component: Profile },
];
export { publicRoutes, privateRoutes };
