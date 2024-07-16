import { RestaurantProperty } from 'app/restaurant/restaurant.constants'
import { IRestaurantColor } from './restaurant-colors.types'

export const restaurantColors: IRestaurantColor[] = [
  {
    name: 'Primary Color',
    description: 'This color is used on primary buttons and other main elements',
    property: RestaurantProperty.PrimaryColor,
  },
  {
    name: 'Primary Color Contrast',
    description: 'This is the text color to use in contrast to the primary color (button text color, etc)',
    property: RestaurantProperty.PrimaryColorContrast,
  },
  {
    name: 'Secondary Color',
    description: 'This color is used on primary buttons and other main elements',
    property: RestaurantProperty.SecondaryColor,
  },
  {
    name: 'Secondary Color Contrast',
    description: 'This is the text color to use in contrast to the secondary color (button text color, etc)',
    property: RestaurantProperty.SecondaryColorContrast,
  },
  {
    name: 'Header Background Color',
    description: 'This is the background color of the header',
    property: RestaurantProperty.HeaderBackgroundColor,
  },
  {
    name: 'Header Foreground Color',
    description: 'This is the foreground color of the header for text, icons, and links',
    property: RestaurantProperty.HeaderForegroundColor,
  },
  {
    name: 'Footer Background Color',
    description: 'This is the background color of the footer',
    property: RestaurantProperty.FooterBackgroundColor,
  },
  {
    name: 'Footer Foreground Color',
    description: 'This is the foreground color of the footer for text, icons, and links',
    property: RestaurantProperty.FooterForegroundColor,
  },
  {
    name: 'Text Color',
    description: 'This is the color used in body text',
    property: RestaurantProperty.TextColor,
  },
  {
    name: 'Headline Text Color',
    description: 'This is the color used in headline text',
    property: RestaurantProperty.HeadlineTextColor,
  },
]
