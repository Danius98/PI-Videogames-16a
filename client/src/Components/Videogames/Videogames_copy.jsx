import React, { useEffect, useState } from 'react';
import GameCard from './Card.jsx';
import { useSelector } from 'react-redux';
import "./Videogames.css"

export default function Videogames() {
    const videogames = useSelector((state) => state.Videogames)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerpage, setItemsPerpage] = useState(20);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id))
    }

    const pages = [];
    for(let i = 1; i <= Math.ceil(videogames.length/itemsPerpage); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerpage;
    const indexOfFirstItem = indexOfLastItem - itemsPerpage;
    const currentItems = videogames.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map(number=>{
        if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
            return(
                <li key={number}
                id={number}
                onClick={currentPage == number ? "active" : null}
                >
                    {number}
                </li>
            )
        } else {
            return null
        }
    })

    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1);

        if(currentPage + 1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);

        if((currentPage - 1) % pageNumberLimit == 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    let pageIncrementBtn = null;
    if(pages.length > maxPageNumberLimit){
        pageIncrementBtn = <li onClick={handleNextBtn}> &hellip;</li>
    }

    let pageDecrementBtn = null;
    if(minPageNumberLimit >= 1){
        pageDecrementBtn = <li onClick={handlePrevBtn}> &hellip;</li>
    }
    
    useEffect(() => {
    }, [videogames]);
console.log(videogames)
    //const Filtred_Videogame = videogames.slice(currentPage, currentPage + 20);
    //console.log(videogames.Generos)
    return (
        <div>
            <ul className="pageNumbers">
                <li>
                    <button
                        onClick={handlePrevBtn}
                        disabled={currentPage === pages[0] ? true : false}
                    >Prev
                    </button>
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
            {currentItems.map((e)  => (
            <GameCard
            ID = {e.ID}
            Imagen = {e.Imagen}
            Titulo = {e.Titulo}
            Generos = {e.Generos}
            />
            ))}
        </div>
    )
}