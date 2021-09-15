import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGeneros, getPlatforms, createVideogame } from "../../redux/actions/index.js";
import Consolas from "./Consolas";
import Genero from "./Genero";
import './Genero.css';

export default function CreateGames() {
    const Generos = useSelector((state) => state.Generos )
    console.log(Generos)
    const platforms = useSelector((state) => state.Consolas)
    console.log(platforms)
    /*const checkbox = () => {
        const [checked, setChecked] = UseState({})
    }*/
    const checkboxes = [
        {id: 1, value: "PlayStation 2", isChecked: false},
        {id: 2, value: "PlayStation 3", isChecked: false},
        {id: 3, value: "PlayStation 4", isChecked: false},
        {id: 4, value: "PlayStation 5", isChecked: false},
    ]
    const handleChecked = (event) => {
        const Platform = checkboxes
        Platform.forEach(e => {
            if(e.value = event.target.value)
            e.isChecked = event.target.checked
        })
    }
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
        Consolas: [],
        GeneroId: []
    });
    const stateReset = () => {
       setDataForm ({
        Titulo: '',
        Imagen: '',
        Descripcion: '',
        Lanzamiento: '',
        Rating: '',
        Consolas: [],
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
const setGenreHandler = (e) => {
    e.preventDefault();
    setDataForm({
        ...dataForm,
        [e.target.name]: dataForm[e.target.name].concat(e.target.value),
    })
    alert("Consola Añadido")
};
const handleCheck = (e) => {
   if(e.target.checked){
       setDataForm({
           ...dataForm,
           Consolas: e.target.value
       })
   }
}
useEffect(() => {
    dispatch(getGeneros(input));
    dispatch(getPlatforms(input))
}, [input, dispatch]);

const submitForm = (e) => {
    e.preventDefault();
    let form = true;
    if(dataForm["Titulo"].length < 2) {
        form = false;
    } else if (!dataForm["GeneroId"].length > 1) {
        form = false;
    } else if (dataForm["Rating"] < 0 ||dataForm["Rating"] > 5) {
        form = false;
        return alert("Por favor limita el rating de 0 a 5")
    }
    if(form) {
        dispatch(createVideogame(dataForm))
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
                <label>Titulo</label>
                <input className="input"
                type="text"
                placeholder="Nombra tu Juego"
                name="Titulo"
                value={dataForm.Titulo}
                onChange={setDataHandler}/>
                </div>
                <div>
                <label>Imagen</label>
                <input className="input"
                type="text"
                placeholder="Imagen"
                name="Imagen"
                value={dataForm.Imagen}
                onChange={setDataHandler}/>
                </div>
                <div>
                <label>Descripcion</label>
                <input className="input"
                type="text"
                placeholder="Descripcion"
                name="Descripcion"
                value={dataForm.Descripcion}
                onChange={setDataHandler}/>
                </div>
                <div>
                <label>Lanzamiento</label>
                <input className="input"
                type="date"
                placeholder="Fecha de lanzamiento"
                name="Lanzamiento"
                value={dataForm.Lanzamiento}
                onChange={setDataHandler}/>
                </div>
                <div>
                    <label>Rating</label>
                <input className="input"
                type="number"
                placeholder="Rating"
                name="Rating"
                min={0}
                max={5}
                step={0.1}
                value={dataForm.Rating}
                onChange={setDataHandler}/>
                </div>
                <div>
                <div className="input">
                    <label>Consolas</label>
                    <select
                    name="Consolas"
                    value={dataForm.Consolas}
                    id="Consolas"
                    onChange={setGenreHandler}>
                        <option value="null"></option>
                        <option value="PlayStation 4">PlayStation 4</option>
                        <option value="PlayStation 5">PlayStation 5</option>
                        <option value="Xbox One">Xbox One</option>
                        <option value="Xbox Series S/X">Xbox Series S/X</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                        <option value="macOS">macOS</option>
                        <option value="Linux">Linux</option>
                        <option value="Android">Android</option>
                        <option value="iOS">iOS</option>
                        <option value="PC">PC</option>
                    </select> 
                </div>
                </div>
                <div>
                    <input className="buton"type="submit" value="Añadir Videojuego"/>
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