import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import ProtectedRoute from './Routes/ProtectedRoute';
import ToAuthRoute from './Routes/ToAuthRoute';
import AuthState from './Context/Auth/AuthState';
import DeckState from './Context/Decks/DeckState';
import CardState from './Context/Cards/CardState';
import setAuthToken from './Utils/setAuthToken';
import Navigation from './Layout/Navigation/Navigation';
import Footer from './Layout/Footer/Footer';
import RegisterForm from './Pages/Forms/RegisterForm';
import LoginForm from './Pages/Forms/LoginForm';
import Landing from './Pages/Landing/Landing';
import AddDeck from './Pages/Forms/AddDeck';
import AddCard from './Pages/Forms/AddCard';
import Decks from './Pages/Decks/Decks';
import EditDeck from './Pages/Forms/EditDeck';
import ViewCards from './Pages/ViewCards/ViewCards';
import EditCard from './Pages/Forms/EditCard';
import Cards from './Pages/Cards/Cards';
import ForgotPassword from './Pages/Forms/ForgotPassword';
import ResetPassword from './Pages/Forms/ResetPassword';
import Gdpr from './Pages/Gdpr/Gdpr';

const App = () => {
// if a token exists in local storage
if(localStorage.token) {
  setAuthToken(localStorage.token);
}
  return (
    <AuthState>
      <DeckState>
        <CardState>
          <Router>
            <div className="App">
              <Navigation />
              <main>
                <Switch>
                  <ToAuthRoute path="/home" exact component={Landing} />
                  <Route path="/gdpr" exact component={Gdpr} />
                  <ToAuthRoute path="/login" exact component={LoginForm} />
                  <ToAuthRoute path="/register" exact component={RegisterForm} />
                  <Route path="/forgot" exact component={ForgotPassword} />
                  <Route path="/reset/:time/:email/:id" exact component={ResetPassword} />
                  <ProtectedRoute path="/adddeck" exact component={AddDeck} />
                  <ProtectedRoute path="/addcard" exact component={AddCard} />
                  <ProtectedRoute path="/decks" exact component={Decks} />
                  <ProtectedRoute path="/editdeck/:id" exact component={EditDeck} />
                  <ProtectedRoute path="/viewcards/:id" exact component={ViewCards} />
                  <ProtectedRoute path="/editcard/:id" exact component={EditCard} />
                  <ProtectedRoute path="/cards/:id" exact component={Cards} />
                  <Redirect to="/home" />
                </Switch>
              </main>
              <Footer />
            </div>
          </Router>
        </CardState>
      </DeckState>
    </AuthState>
  );
}

export default App;
