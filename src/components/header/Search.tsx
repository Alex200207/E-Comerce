
import "bootstrap/dist/css/bootstrap.min.css";
import Select from '../header/Select'

function Search() {
  return (
    <form className="d-flex ms-auto" role="search">
      <Select/>
      <input
        type="text"
        className="form-control me-2"
        placeholder="Buscar..."
        aria-label="Buscar"
      />
      <button className="btn btn-outline-success btn-custom" type="submit">
        Buscar
      </button>
    </form>
  );
}

export default Search;
