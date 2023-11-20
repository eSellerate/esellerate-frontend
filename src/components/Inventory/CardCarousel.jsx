import React from 'react'
import PropTypes from 'prop-types'
import { Image } from '@nextui-org/react'
import Slider from 'react-slick'
import error404img from '../../assets/imagen-404.webp'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const CardCarousel = (props) => {
  CardCarousel.propTypes = {
    images: PropTypes.array
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const loadCards = () => {
    const images = props.images
    console.log(images)
    return (
      images
        ? images.map((image, key) => (<Image
            className='md:w-64 w-60 object-contain'
            key={key}
            src={image.secure_url}
                                      />))
        : <Image className='md:w-64 w-60 object-contain' src={error404img} />
    )
  }

  return (
    <div className='mx-auto max-w-[15rem] md:max-w-xs'>
      <Slider {...settings}>
        {
            loadCards()
        }
      </Slider>
    </div>
  )
}

export default CardCarousel
