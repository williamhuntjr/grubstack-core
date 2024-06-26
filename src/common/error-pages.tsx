import React, { FC } from 'react'
import { ErrorPage } from 'common/components/error-page/error-page'

export const NotFound: FC = () => {
  return <ErrorPage headline='Page not found.' message='Unfortunately, this page does not exist.' />
}

export const InvalidPagePermissions: FC = () => {
  return <ErrorPage fullPage headline='You do not have access.' message='Unfortunately, you do not have permission to view this page.' />
}

export const InvalidTabPermissions: FC = () => {
  return <ErrorPage headline='You do not have access.' message='Unfortunately, you do not have permission to view this tab.' hideButton />
}

export const NullPermissions: FC = () => {
  return <ErrorPage headline='You do not have any permissions.' message='Ask your organization leader to add some permissions to your account.' hideButton />
}