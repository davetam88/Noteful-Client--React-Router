import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NoteNavPage from './NoteNavPage'

describe(`NoteNavPage component`, () => {
  const props = {
    folder: {
      "name": "Important"
    }
  }

  it('renders a .NoteNavPage by default', () => {
    const wrapper = shallow(<NoteNavPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders a h3 with folder name when in props', () => {
    const h3 = shallow(<NoteNavPage {...props} />)
      .find('.NoteNavPage__folder-name')
    expect(toJson(h3)).toMatchSnapshot()
  })
})
