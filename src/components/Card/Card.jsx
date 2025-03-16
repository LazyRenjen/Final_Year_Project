import './Card.css'

const Card = ({ name, image, info }) => {
  return (
    <div className="card-item">
      <a className="card-link">
        <img src={image} alt={`${name} Image`} className="place-img" />
        <p className="badge">{name}</p>
        <p className="place-info">{info}</p>
      </a>
    </div>
  )
}

export default Card