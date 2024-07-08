import "bootstrap/dist/css/bootstrap.min.css";
import Select from '../header/Select'

interface SearchProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="d-flex ms-auto" role="search">
      <Select/>
      <input
        type="text"
        className="form-control me-2"
        placeholder="Buscar..."
        aria-label="Buscar"
        value={searchTerm}
        onChange={onSearchChange}
      />
      <button className="btn btn-outline-success btn-custom" type="submit">
        Buscar
      </button>
    </div>
  );
}

export default Search;