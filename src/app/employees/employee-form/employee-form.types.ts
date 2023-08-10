import { GSMode } from 'common/utils/mode/mode.types'
import { IEmployee } from '../employees.types'

export enum EmployeeFormField {
  FirstName = 'first_name',
  LastName = 'last_name',
  Gender = 'gender',
  JobTitle = 'job_title',
  Address = 'address1',
  City = 'city',
  State = 'state',
  Postal = 'postal',
  HireDate = 'hire_date',
  EmploymentStatus = 'employment_status',
  Phone = 'phone',
  Email = 'email',
  ThumbnailUrl = 'profile_thumbnail_url'

}

export enum EmployeeFormLabel {
  FirstName = 'First Name',
  LastName = 'Last Name',
  Gender = 'Gender',
  JobTitle = 'Job Title',
  Address = 'Address',
  City = 'City',
  State = 'State',
  Postal = 'Postal',
  HireDate = 'Hire Date',
  EmploymentStatus = 'Employment Status',
  Phone = 'Phone',
  Email = 'Email',
  ThumbnailUrl = 'Thumbnail Url'
}

export interface IEmployeeFormValues {
  [EmployeeFormField.FirstName]: string
  [EmployeeFormField.LastName]: string
  [EmployeeFormField.Gender]: string
  [EmployeeFormField.JobTitle]: string
  [EmployeeFormField.Address]: string
  [EmployeeFormField.City]: string
  [EmployeeFormField.State]: string
  [EmployeeFormField.Postal]: string
  [EmployeeFormField.HireDate]: string
  [EmployeeFormField.EmploymentStatus]: string
  [EmployeeFormField.Phone]: string
  [EmployeeFormField.Email]: string
  [EmployeeFormField.ThumbnailUrl]: string
}

export interface IEmployeeForm {
  onSubmit(data: IEmployeeFormValues): Promise<void>
  data?: IEmployee|null
  mode: GSMode
  isPickerDirty: boolean
  onOpenFilePicker: (data: IEmployee|null) => void
}