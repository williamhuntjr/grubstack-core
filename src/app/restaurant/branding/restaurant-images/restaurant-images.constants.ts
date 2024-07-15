import { RestaurantProperty } from 'app/restaurant/restaurant.constants'
import { IBrandingImage } from './restaurant-images.types'

export const brandingImages:IBrandingImage[] = [
  {
    name: 'Logo Image',
    description: 'This image is used throughout your apps as your primary logo',
    property: RestaurantProperty.LogoImageUrl
  },
  {
    name: 'Home Banner Image',
    description: 'This is the banner image on your order app home page',
    property: RestaurantProperty.BannerImageUrl
  },
  {
    name: 'Mobile Home Banner Image',
    description: 'This is the mobile banner image on your order app home page',
    property: RestaurantProperty.MobileBannerImageUrl
  }
]