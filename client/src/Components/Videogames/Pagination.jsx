import React, { useState , useEffect} from "react";
import "./Pagination.css"

export default function PaginationComponent(){

    const renderData = (data) => {
        return(
            <ul>
                {data.map((todo, index) => {
                    return <li key={index}>{todo.title}</li>
                })}
            </ul>
        )
    }

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerpage, setItemsPerpage] = useState(5);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id))
    }

    const pages = [];
    for(let i = 1; i <= Math.ceil(data.length/itemsPerpage); i++) {
        pages.push(i);
    }


    const indexOfLastItem = currentPage * itemsPerpage;
    const indexOfFirstItem = indexOfLastItem - itemsPerpage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    console.log(pages) // cantidad de páginas, sacada de la longitud de los datos divido por los items por página
    console.log(currentPage) // página actual. por defecto se empieza en la primera página
    console.log(itemsPerpage) // cantidad de objetos por página. por defecto 5
    console.log(indexOfFirstItem) // primer elemento de la página. Sacado tomando el indice del último elemento de la página restando los items por página(def: 5)
    console.log(indexOfLastItem) // ultimo elemento de la página. Sacado tomando la página actual multiplicándola por los elementos por página(def: 5)
    console.log(currentItems) // Elementos mostrados en la página donde hacemos referencia. Mostrado con el método slice entre el primer elemento y el último
    console.log(pageNumberLimit) // Limite de paginas mostradas antes de mostrar las sigueintes (def: 5)
    console.log(minPageNumberLimit) // Límite de páginas que se muestran (def: 5)
    console.log(maxPageNumberLimit) // Deesde que página muestra la paginación (def: 0)

    const renderPageNumbers = pages.map(number=>{
    if(number < maxPageNumberLimit + 1 && number>minPageNumberLimit){
            return(
                <li key={number} 
                id={number} 
                onClick={handleClick}
                className={currentPage == number ? "active" : null}
                >
                    {number}
                </li>
            ) 
        } else {
            return null
        }
    })

    console.log(renderPageNumbers) //hace que renderice correctamente entre la página menor y mayor en la paginacuón (def 1 - 5). añade el atributo active cuando se está en la página actual
    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1);

        if(currentPage + 1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

     // cambia la pagina hacia arriba, de modo que si la página es superior al limite maximo de pagina, el estado cambia para que el limite minimo y maximo aumente

    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);

        if((currentPage - 1) % pageNumberLimit == 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    // cambia la pagina hacia abajo, de modo que si la página es superior al limite maximo de pagina, el estado cambia para que el limite minimo y maximo disminuya

    let pageIncrementBtn = null;
    if(pages.length > maxPageNumberLimit){
        pageIncrementBtn = <li onClick={handleNextBtn}> &hellip;</li>
    }

    //aparece los puntos suspensivos a la derecha cambia la página hacia el mayor solo si la cantidad de páginas (def: 40) sea mayoe al limit máximo

    let pageDecrementBtn = null;
    if(minPageNumberLimit >= 1){
        pageDecrementBtn = <li onClick={handlePrevBtn}> &hellip;</li>
    }

    //aparece los puntos suspensivos a la izquierda y cambia la página hacia el menor si el limite menor es mayor a 1 (def: 0)

    const handleLoadMore = () => {
        setItemsPerpage(itemsPerpage + 5)
    }

    //hacer cargar 5 items por página cada vez que se aprieta

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
          .then((response) => response.json())
          .then((json) => setData(json));
      }, []);


    return(
        <>
        <h1>To do List</h1> <br/>
        {renderData(currentItems)}
        <ul className="pageNumbers">
            <li>
                <button
                onClick={handlePrevBtn}
                disabled={currentPage == pages[0] ? true : false}
                //hace que no se pueda usar el botón prev si la página dónde se está es la primera
                >Prev</button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li>
                <button
                onClick={handleNextBtn}
                disabled={currentPage == pages[pages.length - 1] ? true : false}
                //hace que no se pueda usar el botón next si la página dónde se está es la ultima
                >Next</button>
            </li>
            </ul>
            <button className="loadmore"
            onClick={handleLoadMore}>
                Load More
            </button>
        </>
    )
}

/*const next_Page = () => {
        if(videogames.length <= currentPage + 15) {
            setCurrentPage(currentPage);
        } else setCurrentPage(currentPage + 15);
    };
    const prev_Page = () => {
        if (currentPage < 16) {
            setCurrentPage(0);
        } else {
            setCurrentPage(currentPage - 15);
        }
    };
    const first_Page = () => {
        setCurrentPage(0);
    };
    const last_Page = () => {
        setCurrentPage(videogames.length - 15)
    };*/