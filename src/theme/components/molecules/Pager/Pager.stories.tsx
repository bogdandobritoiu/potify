import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react-native'
import {Pager} from '.'

const MyButtonMeta: ComponentMeta<typeof Pager> = {
	title: 'Tabs',
	component: Pager,
	argTypes: {
		onPress: {action: 'pressed the button'},
	},
	args: {},
}

export default MyButtonMeta

type MyButtonStory = ComponentStory<typeof Pager>

export const Basic: MyButtonStory = (args) => <Pager {...args} />
