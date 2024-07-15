import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { ITab } from 'common/components/tab-panel/tab-panel.types'
import { TabPanel } from 'common/components/tab-panel/tab-panel'
import { Loading } from 'common/components/loading/loading'
import { RestaurantContainer } from '../restaurant.container'
import { restaurantWorkingHoursPath } from '../restaurant.constants'
import { useRestaurantModule } from '../restaurant-module-hook'
import { defaultBusinessHours, defaultDeliveryHours, defaultPickUpHours } from './hours-table/hours-table.constants'
import { HoursTable } from './hours-table/hours-table'
import { IWorkHour } from './hours-table/hours-table.types'
import { WorkingHoursTab } from './working-hours.constants'

export const WorkingHours = (): JSX.Element => {
  const [ isLoading, setLoading ] = useState<boolean>(true)
  const [ businessHours, setBusinessHours ] = useState<IWorkHour[]>(defaultBusinessHours)
  const [ deliveryHours, setDeliveryHours ] = useState<IWorkHour[]>(defaultDeliveryHours)
  const [ pickUpHours, setPickUpHours ] = useState<IWorkHour[]>(defaultPickUpHours)

  const { locationId } = useParams()
  const { LocationService } = useRestaurantModule()

  const handleSubmit = async(data: IWorkHour[]): Promise<void> => {
    data.forEach(async(hour, index) => {
      try {
        await LocationService.updateWorkHour(locationId!, { ...hour, day: index })
      } catch(e) {
        console.error(e)
      }
    })
    toast.success('Location work hours updated.')
  }

  const init = async (): Promise<void> => {
    try {
      setLoading(true)
      const resp = await LocationService.getWorkHours(locationId!)
      const businessHoursFilter = resp.data ? resp.data.filter((workHour) => workHour.working_hour_type_id == 1) : []
      const deliveryHoursFilter = resp.data ? resp.data.filter((workHour) => workHour.working_hour_type_id == 2) : []
      const pickUpHoursFilter = resp.data ? resp.data.filter((workHour) => workHour.working_hour_type_id == 3) : []
      setBusinessHours(businessHoursFilter.length > 0 ? businessHoursFilter : defaultBusinessHours )
      setDeliveryHours(deliveryHoursFilter.length > 0 ? deliveryHoursFilter : defaultDeliveryHours )
      setPickUpHours(pickUpHoursFilter.length > 0 ? pickUpHoursFilter : defaultPickUpHours )
      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }

  const tabs:ITab[] = [
    {
      name: WorkingHoursTab.Business,
      render: <HoursTable data={businessHours} onSubmit={handleSubmit} />
    },
    {
      name: WorkingHoursTab.Delivery,
      render: <HoursTable data={deliveryHours} onSubmit={handleSubmit} />
    },
    {
      name: WorkingHoursTab.PickUp,
      render: <HoursTable data={pickUpHours} onSubmit={handleSubmit} />
    },
  ]

  // eslint-disable-next-line
  useEffect(() => void init(), [locationId])

  return (
    <>
      <RestaurantContainer route={restaurantWorkingHoursPath} label={'Working Hours'}>
        {isLoading && <Loading />}
        {!isLoading && <TabPanel tabs={tabs} /> }
      </RestaurantContainer>
    </>
  )
}