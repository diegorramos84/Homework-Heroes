import superheros from '../../assets/images/404_IMAGE.png'

import './style.css'

const NotFoundPage = () => {
  return (
    <>
  <div className="notfound-container">
  <img src={superheros} alt='superheros' />
<div className="notfound-title">
    <h1> PAGE NOT FOUND</h1>
    <h2 className="notfound-404">404</h2>
</div>
  </div>

    </>
      
      
      
  )
}

export default NotFoundPage