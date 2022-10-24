import React from 'react'
import Enzyme from 'enzyme'
import {Button, StyledButton} from '@molecules/Button'
import Adapter from 'enzyme-adapter-react-16'
import {Text} from '@atoms/Text'

Enzyme.configure({adapter: new Adapter()})

describe('Button', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: jest.fn().mockImplementation((query) => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: jest.fn(), // Deprecated
				removeListener: jest.fn(), // Deprecated
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn(),
			})),
		})
	})

	const props = {text: 'Join us', small: true}

	it('renders with text and small prop', () => {
		const wrapper = Enzyme.shallow(<Button {...props} />)

		expect(wrapper.find(Text).children().text()).toBe('Join us')
		expect(wrapper.find(StyledButton).prop('small')).toBe(true)
	})
})
