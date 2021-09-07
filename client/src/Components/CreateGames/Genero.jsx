import './Generos.css'

export default function Genero(props) {
    const { Genero } = props
    return (
        <div className="container">
            <h4 className="text">{Genero}</h4>
        </div>
    )
}