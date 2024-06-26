
import "bootstrap/dist/css/bootstrap.min.css";

function Search() {
  return (
    <form className="d-flex ms-auto" role="search">
      <select className="form-select me-2" id="select__navbar">
        <option value="0">Todas las categorias</option>
        {/* Aquí puedes agregar más opciones de categorías si es necesario */}
      </select>
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
