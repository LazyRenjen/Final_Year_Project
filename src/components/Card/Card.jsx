import './Card.css'

const Card = ({ name, image, info }) => {
  return (
    <div className="card-item">
      <a href="#" className="card-link">
        <img src={image} alt={`${name} Image`} className="place-img" />
        <p className="badge">{name}</p>
        <p className="place-info">{info}</p>
        <button className="info">More</button>
      </a>
    </div>
  )
}

export default Card