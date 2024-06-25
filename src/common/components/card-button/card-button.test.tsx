import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import AbcIcon from '@mui/icons-material/Abc'
import { CardButton } from './card-button'

it('renders without crashing', async () => {
  const spy = jest.fn()

  render(<CardButton
    title="Some Button"
    description="Some description"
    icon={<AbcIcon />}
    onClick={spy}
  />)

  const user = userEvent.setup()

  await user.click(screen.getByRole('button', { name: 'Some Button Some description'}))
  expect(spy).toHaveBeenCalled();

  await user.keyboard('[Enter]');
  expect(spy).toHaveBeenCalledTimes(2);
});