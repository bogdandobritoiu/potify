import {isAndroid} from '@constants'
import {useState} from 'react'

export const useUpload = ({onSuccess, options, onCustomButtonPress}: any) => {
	const [currentFile, setCurrentFile] = useState<any>(null)
	const [loading, setLoading] = useState(false)

	async function onEnd(file: any, result?: any) {
		setLoading(true)
		await onSuccess(file, result)
		setLoading(false)
	}

	function validFile(file: any) {
		return file.type === 'image/jpg'
	}

	function handleFile(_files?: any[]) {
		const {launchImageLibrary} = require('react-native-image-picker')
		launchImageLibrary(
			{
				maxWidth: 512,
				maxHeight: 512,
				...options,
			},
			(response: any) => {
				const newFile = response?.assets[0] ?? null
				if (response.didCancel) {
					setLoading(false)
				} else if (response.error) {
					setLoading(false)
				} else if (response.customButton) {
					onCustomButtonPress(response.customButton)
					setCurrentFile(null)
					setLoading(false)
				} else if (validFile(newFile)) {
					setCurrentFile(newFile)

					const file = {
						type: newFile.type,
						name: newFile.fileName
							? newFile.fileName
							: new Date().getTime(),
						uri: isAndroid
							? newFile.uri
							: newFile.uri.replace('file://', ''),
					}

					onEnd(file)
				}
			},
		)
	}

	return {
		handleFile,
		currentFile,
		loading,
		setLoading,
	}
}
