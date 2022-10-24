import {FearGreedType} from '@screens/Home/types'

export const uuid = () =>
	'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0
		const v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})

export function checkIfDatesAreSame(date1: Date, date2: Date) {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	)
}

export function formatPrice(number?: number) {
	if (number === undefined) return
	return number?.toLocaleString('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 8,
	})
}

export function formatNumber(number?: number, decimals?: number) {
	if (number === undefined) return
	if (number > 999999999999)
		return `${
			decimals
				? (number / 1000000000000).toFixed(decimals)
				: number / 1000000000000
		}t`
	if (number > 999999999)
		return `${
			decimals
				? (number / 1000000000).toFixed(decimals)
				: number / 1000000000
		}b`
	if (number > 999999)
		return `${
			decimals ? (number / 1000000).toFixed(decimals) : number / 1000000
		}m`
	if (number > 999)
		return `${
			decimals ? (number / 1000).toFixed(decimals) : number / 1000
		}k`
	return decimals ? number?.toFixed(2) : number
}

export function timeSince(date: Date, returnValue = false) {
	const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
	let interval = Math.floor(seconds / 31536000)
	if (interval > 1) {
		return returnValue
			? {value: interval, unit: 'year'}
			: interval + ' years'
	}
	interval = Math.floor(seconds / 2592000)
	if (interval > 1) {
		return returnValue
			? {value: interval, unit: 'month'}
			: interval + ' months'
	}
	interval = Math.floor(seconds / 86400)
	if (interval > 1) {
		return returnValue ? {value: interval, unit: 'day'} : interval + ' days'
	}
	interval = Math.floor(seconds / 3600)
	if (interval > 1) {
		return returnValue
			? {value: interval, unit: 'hour'}
			: interval + ' hours'
	}
	interval = Math.floor(seconds / 60)
	if (interval > 1) {
		return returnValue
			? {value: interval, unit: 'minute'}
			: interval + ' minutes'
	}
	return returnValue
		? {value: Math.floor(seconds), unit: 'second'}
		: Math.floor(seconds) + ' seconds'
}

export function getFearGreedEmoji(data: FearGreedType) {
	const label = data?.label?.toLowerCase()

	switch (label) {
		case 'neutral':
			return '😐'
		case 'fear':
			return '😨'
		case 'greed':
			return '😎'
		case 'extreme greed':
			return '🤑'
		case 'extreme fear':
			return '😱'
		default:
			return '-'
	}
}
