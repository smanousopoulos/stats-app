import {
  CoursePage,
  InProgressPage,
  NewSessionPage,
  DefaultPage,
} from './pages/index';

const routes = [
  {
    path: '/:courseId',
    component: CoursePage,
    exact: true,
  },
  {
    path: '/:courseId/new',
    component: NewSessionPage,
  },
  {
    path: '/:courseId/in-progress',
    component: InProgressPage,
  },
  {
    path: '*',
    component: DefaultPage,
  }
];

export default routes;
