import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import createAppStore from '../state/store';
import { Sidebar, MainView } from './layout/';
import { HeaderContainer } from './pages';
import CoursesList from './components/courses-list';
import routes from './routes';
import courses from '../data/courses';

const App = () => (
  <Provider store={createAppStore()}>
    <div className="container">
      <BrowserRouter>
        <Fragment>

          <HeaderContainer />

          <div className="view-container">
            <Sidebar>
              <CoursesList
                courses={courses}
              />
            </Sidebar>

            <MainView>
              <Switch>
                {
                  routes.map(route => (
                    <Route key={route.path} {...route} />
                  ))
                }
                <Redirect to="/" />
              </Switch>
            </MainView>
          </div>
        </Fragment>
      </BrowserRouter>
    </div>
  </Provider>
);

export default App;