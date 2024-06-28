export const defaultEmployeeFormData = {
  first_name: '',
  last_name: '',
  gender: 'not_specified',
  address1: '',
  city: '',
  state: '',
  postal: '',
  profile_thumbnail_url: '/assets/img/placeholder-male.jpeg',
  employment_status: 'active',
  phone: '',
  email: '',
  hire_date: '',
  job_title: 'server',
}

export const genderTypes = [
  {
    select_value: 'not_specified',
    select_label: 'Not Specified',
  },
  {
    select_value: 'male',
    select_label: 'Male',
  },
  {
    select_value: 'female',
    select_label: 'Female',
  },
]

export const jobTitles = [
  {
    select_value: 'manager',
    select_label: 'Manager',
  },
  {
    select_value: 'cook',
    select_label: 'Cook',
  },
  {
    select_value: 'server',
    select_label: 'Server',
  },
  {
    select_value: 'bartender',
    select_label: 'Bartender',
  },
]

export const employmentStatusList = [
  {
    select_value: 'active',
    select_label: 'Active',
  },
  {
    select_value: 'suspended',
    select_label: 'Suspended',
  },
  {
    select_value: 'terminated',
    select_label: 'Terminated',
  },
]
