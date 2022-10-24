import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react-native'
import {Tabs} from '.'

const MyButtonMeta: ComponentMeta<typeof Tabs> = {
	title: 'Tabs',
	component: Tabs,
	argTypes: {
		onPress: {action: 'pressed the button'},
	},
	args: {},
}

export default MyButtonMeta

type MyButtonStory = ComponentStory<typeof Tabs>

export const Basic: MyButtonStory = (args) => <Tabs {...args} />
