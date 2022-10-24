import ImageBlobReduce from 'image-blob-reduce'
import Pica from 'pica'
import {useState} from 'react'

const pica = Pica({features: ['js', 'wasm', 'cib']})
const reduce = new ImageBlobReduce({pica})

export const useUpload = ({onSuccess}: any) => {
	const [currentFile] = useState<any>(null)
	const [loading, setLoading] = useState(false)

	async function onEnd(file: any, result?: any) {
		setLoading(true)
		await onSuccess(file, result)
		setLoading(false)
	}

	function handleFile(files?: any[]) {
		const fileWithPreview = files?.map((file) =>
			Object.assign(file, {
				preview: URL.createObjectURL(file),
			}),
		)

		if (fileWithPreview && fileWithPreview[0]) {
			const reader = new FileReader()

			reader.onloadstart = () => {
				setLoading(true)
			}

			reader.onloadend = async () => {
				const newFile = await reduce.toBlob(fileWithPreview[0], {
					max: 512,
				})
				onEnd(newFile, fileWithPreview[0].preview)
			}

			if (files?.length) reader.readAsDataURL(files[0])
		}
	}

	return {
		handleFile,
		currentFile,
		loading,
		setLoading,
	}
}
