import AddLocationIcon from '@mui/icons-material/AddLocation'
import FastfoodIcon from '@mui/icons-material/Fastfood'
import FaceIcon from '@mui/icons-material/Face'
import ImageIcon from '@mui/icons-material/Image'
import StarsIcon from '@mui/icons-material/Stars'
import CampaignIcon from '@mui/icons-material/Campaign'
import { restaurantLocationsPath } from 'app/restaurant/restaurant.constants'
import { mediaLibraryRoutePath } from 'app/media-library/media-library.constants'
import { productRoutePath } from 'app/products/products.constants'
import { employeeRoutePath } from 'app/employees/employees.constants'
import { reviewRoutePath } from 'app/reviews/reviews.constants'
import { marketingRoutePath } from 'app/marketing/marketing.constants'

export const homepageModule: string = 'HomepageModule'
export const homepageRoutePath = '/'

export const homepageCards = [
  {
    label: 'Add a Location',
    description: 'Create new restaurant locations',
    icon: AddLocationIcon,
    path: restaurantLocationsPath
  },
  {
    label: 'Media Library',
    description: 'Add images for your menus',
    icon: ImageIcon,
    path: mediaLibraryRoutePath
  },
  {
    label: 'Add a Product',
    description: 'Create a product for your food menu',
    icon: FastfoodIcon,
    path: productRoutePath
  },
  {
    label: 'Add Employees',
    description: 'Keep track of location employees',
    icon: FaceIcon,
    path: employeeRoutePath
  },
  {
    label: 'Manage Reviews',
    description: 'See what your customers are saying',
    icon: StarsIcon,
    path: reviewRoutePath
  },
  {
    label: 'Create a Campaign',
    description: 'Boost sales and revenue',
    icon: CampaignIcon,
    path: marketingRoutePath
  }
]