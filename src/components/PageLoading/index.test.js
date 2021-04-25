import React from 'react'
import { mount } from 'enzyme'

import PageLoading from './index'

it('renders correctly', () => {
  const props = {
    className: 'test',
  }

  const wrapper = mount(<PageLoading {...props} />)

  expect(wrapper.find('.test')).toExist()
})
