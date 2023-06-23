import '@fortawesome/fontawesome-free/css/all.css';
import Modal from './components/modal';
import IdeaForm from './components/ideaform';
import IdeaList from './components/idaealist';
import './css/style.css';

const modal = new Modal();
const ideaForm = new IdeaForm();
const ideaList = new IdeaList();

ideaForm.render();
ideaList.render();