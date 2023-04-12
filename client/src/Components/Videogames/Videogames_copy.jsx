import React, { useEffect, useState } from 'react';
import GameCard from './Card.jsx';
import { useSelector } from 'react-redux';
import "./Videogames_copy.css"

export default function Videogames() {
    const videogames = useSelector((state) => state.Videogames)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerpage, setItemsPerpage] = useState(20);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const [isActivePrev, setIsActivePrev] = useState(false);
    const [isActiveNext, setIsActiveNext] = useState(false);

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
                <li
                key={number}
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

    const handleFirstPage = () => {
        setCurrentPage(1)
        setMinPageNumberLimit(0)
        setMaxPageNumberLimit(5)
    }

    const handleLastPage = () => {
        setCurrentPage(pages[pages.length - 1])
        setMinPageNumberLimit(pages[pages.length - 6])
        setMaxPageNumberLimit(pages[pages.length - 1])
    }

    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1);
        setIsActiveNext(true);
        setTimeout(() => {
            setIsActiveNext(false)
        }, 250)

        if(currentPage + 1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);
        setIsActivePrev(true);
        setTimeout(() => {
            setIsActivePrev(false)
        }, 250)

        if((currentPage - 1) % pageNumberLimit == 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    let pageIncrementBtn = null;
    if(pages.length > maxPageNumberLimit){
        pageIncrementBtn = <li> &hellip;</li>
    }

    let pageDecrementBtn = null;
    if(minPageNumberLimit >= 1){
        pageDecrementBtn = <li> &hellip;</li>
    }
    
    useEffect(() => {
    }, [videogames]);
console.log(videogames)
    //const Filtred_Videogame = videogames.slice(currentPage, currentPage + 20);
    //console.log(videogames.Generos)
    return (
        <div>
            {videogames.length >= 1? (            
            <ul className="pageNumbers">
                    {currentPage != pages[0]?(
                    <>
                    <button
                    onClick={handleFirstPage}
                    disabled={currentPage === pages[0] ? true : false}
                    >{"<<"}
                    </button>
                <button 
                    className={isActivePrev ? "pageNumbers__prevArrow" : null}
                    onClick={handlePrevBtn}
                    disabled={currentPage === pages[0] ? true : false}
                    >{"<"}
                    </button>
                    </>
                    ): null}
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn} 
                    {currentPage != pages[pages.length - 1]?(
                    <>
                    <button
                    className={isActiveNext ? "pageNumbers__nextArrow" : null}
                    onClick={handleNextBtn}
                    disabled={currentPage == pages[pages.length - 1] ? true : false}
                >{">"}</button>
                <button
                    onClick={handleLastPage}
                    disabled={currentPage == pages[pages.length - 1] ? true : false}
                >{">>"}</button>
                </>
            ): null}
            </ul>
            ): null}
            <section className="grid">
            {currentItems.map((e)  => (
            <GameCard
            ID = {e.ID}
            Imagen = {e.Imagen}
            Titulo = {e.Titulo}
            Generos = {e.Generos}
            />
            ))}
            </section>
        </div>
    )
}