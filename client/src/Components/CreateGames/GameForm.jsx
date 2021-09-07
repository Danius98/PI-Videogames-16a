import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGeneros, createVideogame } from "../../redux/actions/index.js";
import  Genero from "./Genero";
import './Genero.css';

export default function CreateGames() {
    const Generos = useSelector((state) => state.Generos )
    const [input, setInput] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();
    const next_Page = () => {
        if(Generos.length <= currentPage + 5) {
            setCurrentPage(currentPage);
        } else setCurrentPage(currentPage + 5);
    };
    const prev_Page = () => {
        if (currentPage < 6) {
            setCurrentPage(0);
        } else {
            setCurrentPage(currentPage - 5);
        }
    };
    useEffect(() => {
        setCurrentPage(0)
    }, [Generos]);

    const genres = Generos.slice(currentPage, currentPage + 5);
    
    const [dataForm, setDataForm] = useState({
        Titulo: '',
        Imagen: '',
        Descripcion: '',
        Lanzamiento: '',
        Rating: '',
        Generos: [],
        GeneroId: []
    });
    const stateReset = () => {
       setDataForm ({
        Titulo: '',
        Imagen: '',
        Descripcion: '',
        Lanzamiento: '',
        Rating: '',
        Generos: [],
        GeneroId: []
    });
    setInput('');
  };
  /*const submitInput = (e) => {
      e.preventDefault();
      setInput(e.target.value);
  };*/
  const setDataHandler = (e) => {
      e.preventDefault();
      setDataForm({
          ...dataForm,
          [e.target.name]: e.target.value,
      });
  };
  const setCodeHandler = (e) => {
    e.preventDefault();
    setDataForm({
        ...dataForm,
        [e.target.name]: dataForm[e.target.name].concat(e.target.value),
    })
    alert("Genero Añadido")
};
useEffect(() => {
    dispatch(getGeneros(input));
}, [input, dispatch]);
const submitForm = (e) => {
    e.preventDefault();
    let form = true;
    if(dataForm["Titulo"].length < 2) {
        form = false;
    } else if (!dataForm["GeneroId"].length > 1) {
        form = false;
    }
    if(form) {
        dispatch(createPokemon(dataForm))
        .then(() => stateReset())
        .then(() => alert("Juego añadido"))
    } else {
        return alert("Por favor llena todos los campos antes de crear un videojuego");
    }
  };
  return (
      <div>
          <div className="container">
                <Link to="/Videogame" className="homelink">
                    <h1>Inicio</h1>
                </Link>
                <form onSubmit={(e)=>submitForm(e)}>
                <div>
                <input className="input"
                type="text"
                placeholder="Nombra tu Juego"
                name="Titulo"
                value={dataForm.Titulo}
                onChange={setDataHandler}/>
                </div>
                <div>
                <input className="input"
                type="text"
                placeholder="Imagen"
                name="Imagen"
                value={dataForm.Imagen}
                onChange={setDataHandler}/>
                </div>
                <div>
                <input className="input"
                type="text"
                placeholder="Descripcion"
                name="Descripcion"
                value={dataForm.Descripcion}
                onChange={setDataHandler}/>
                </div>
                <div>
                <input className="input"
                type="decimal"
                placeholder="Rating"
                name="Rating"
                value={dataForm.Rating}
                onChange={setDataHandler}/>
                </div>
                <div>
                    <input className="buton"type="submit" value="Añadir Pokemon"/>
                </div>
                </form>
                </div>
                <button onClick={prev_Page} className="btn2">{'<<'}</button>
                  <button onClick={next_Page} className="btn2">{'>>'}</button>
                <div className="wrap">
                        {genres.length < 6 ? (
                        genres.map((c) => (
                            <div className="countrycont2">
                                <div>
                                    <Genero key={c.id} Genero={c.Genero}/>
                                    <button className="btn2"onClick={setCodeHandler} value={c.id} name="GeneroId">
                                        Añade
                                    </button>
                                    </div>
                                    </div>
                        ))
                        ): console.log(Error)}
                </div>
      </div>
  )
}