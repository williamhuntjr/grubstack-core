import HomeIcon from '@mui/icons-material/Home'
import CameraIcon from '@mui/icons-material/Camera'
import StorefrontIcon from '@mui/icons-material/Storefront'
import FastfoodIcon from '@mui/icons-material/Fastfood'
import EggIcon from '@mui/icons-material/Egg'
import PlaceIcon from '@mui/icons-material/Place'
import LocalPizzaIcon from '@mui/icons-material/LocalPizza'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SelectAllIcon from '@mui/icons-material/SelectAll'
import FoodBankIcon from '@mui/icons-material/FoodBank'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FaceIcon from '@mui/icons-material/Face'
//import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import PaymentIcon from '@mui/icons-material/Payment'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
import SettingsIcon from '@mui/icons-material/Settings'
import ArticleIcon from '@mui/icons-material/Article'
import HardwareIcon from '@mui/icons-material/Hardware'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import AssessmentIcon from '@mui/icons-material/Assessment'
import CampaignIcon from '@mui/icons-material/Campaign'
import {
  productPermissions,
  ingredientPermissions,
  itemPermissions,
  menuPermissions,
  varietyPermissions,
} from 'app/products/products.constants'
import { UserPermissions } from 'auth/auth.constants'
import { builderPermissions, builderRoutePath } from 'app/builder/builder.constants'
import { homepageRoutePath } from 'app/homepage/homepage.constants'
import { mediaLibraryPermissions, mediaLibraryRoutePath } from 'app/media-library/media-library.constants'
import { reviewPermissions, reviewRoutePath } from 'app/reviews/reviews.constants'
import { reportPermissions, reportRoutePath } from 'app/reports/reports.constants'
import { marketingPermissions, marketingRoutePath } from 'app/marketing/marketing.constants'
import { employeePermissions, employeeRoutePath } from 'app/employees/employees.constants'
import {
  restaurantPermissions,
  //restaurantDeliveryZonesPath,
  restaurantOrderTypesPath,
  restaurantBrandingPath,
  restaurantLocationsPath,
  restaurantMenusPath,
  restaurantWorkingHoursPath,
  restaurantPaymentSetupPath,
  restaurantNotificationsPath,
  restaurantOrderSettingsPath,
  restaurantLoggingPath,
} from 'app/restaurant/restaurant.constants'
import { ISidebarNavRoute } from './sidebar.types'

export const sidebarRoutes: ISidebarNavRoute[] = [
  {
    label: 'Home',
    path: homepageRoutePath,
    icon: HomeIcon,
  },
  {
    label: 'Restaurant',
    path: '/restaurant',
    icon: StorefrontIcon,
    permissions: restaurantPermissions,
    submenu: [
      {
        label: 'Locations',
        path: restaurantLocationsPath,
        icon: PlaceIcon,
        permissions: restaurantPermissions,
        rootPermissions: [
          [
            UserPermissions.ViewLocations,
            UserPermissions.MaintainLocations,
          ],
        ]
      },
      {
        label: 'Branding',
        path: restaurantBrandingPath,
        icon: CameraIcon,
        permissions: restaurantPermissions,
        rootPermissions: [
          [
            UserPermissions.ViewLocations,
            UserPermissions.MaintainLocations,
          ]
        ]
      },
      {
        label: 'Menus',
        path: restaurantMenusPath,
        icon: MenuBookIcon,
        permissions: restaurantPermissions,
        rootPermissions: [
          [
            UserPermissions.ViewMenus,
            UserPermissions.MaintainMenus
          ],
          [
            UserPermissions.ViewLocations,
            UserPermissions.MaintainLocations,
          ]
        ]
      },
      {
        label: 'Order Types',
        path: restaurantOrderTypesPath,
        icon: FoodBankIcon,
        permissions: restaurantPermissions,
        rootPermissions: [
          [
            UserPermissions.ViewLocations,
            UserPermissions.MaintainLocations,
          ]
        ]
      },
      {
        label: 'Working Hours',
        path: restaurantWorkingHoursPath,
        icon: AccessTimeIcon,
        permissions: restaurantPermissions,
        rootPermissions: [
          [
            UserPermissions.ViewLocations,
            UserPermissions.MaintainLocations,
          ]
        ]
      },
      /*
      {
        label: 'Delivery Zones',
        path: restaurantDeliveryZonesPath,
        icon: DeliveryDiningIcon,
        permissions: restaurantPermissions,
      },
      */
      {
        label: 'Payment Setup',
        path: restaurantPaymentSetupPath,
        icon: PaymentIcon,
        permissions: restaurantPermissions,
      },
      {
        label: 'Notifications',
        path: restaurantNotificationsPath,
        icon: CircleNotificationsIcon,
        permissions: restaurantPermissions,
      },
      {
        label: 'Order Settings',
        path: restaurantOrderSettingsPath,
        icon: SettingsIcon,
        permissions: restaurantPermissions,
      },
    ],
  },
  {
    label: 'Products',
    path: '/products',
    icon: FastfoodIcon,
    permissions: productPermissions,
    submenu: [
      {
        label: 'Ingredients',
        path: '/products/ingredients',
        icon: EggIcon,
        permissions: ingredientPermissions,
      },
      {
        label: 'Items',
        path: '/products/items',
        icon: LocalPizzaIcon,
        permissions: itemPermissions,
      },
      {
        label: 'Menus',
        path: '/products/menus',
        icon: MenuBookIcon,
        permissions: menuPermissions,
      },
      {
        label: 'Varieties',
        path: '/products/varieties',
        icon: SelectAllIcon,
        permissions: varietyPermissions,
      },
    ],
  },
  {
    label: 'Builder Tool',
    path: builderRoutePath,
    icon: HardwareIcon,
    permissions: builderPermissions,
  },
  {
    label: 'Media Library',
    path: mediaLibraryRoutePath,
    icon: PermMediaIcon,
    permissions: mediaLibraryPermissions,
  },
  {
    label: 'Employees',
    path: employeeRoutePath,
    icon: FaceIcon,
    permissions: employeePermissions,
  },
  {
    label: 'Reviews',
    path: reviewRoutePath,
    icon: StarBorderIcon,
    permissions: reviewPermissions,
  },
  {
    label: 'Reports',
    path: reportRoutePath,
    icon: AssessmentIcon,
    permissions: reportPermissions,
  },
  {
    label: 'Marketing',
    path: marketingRoutePath,
    icon: CampaignIcon,
    permissions: marketingPermissions,
  },
  {
    label: 'Logging',
    path: restaurantLoggingPath,
    icon: ArticleIcon,
    permissions: restaurantPermissions,
  },
]
