import AwesomeDebouncePromise from 'awesome-debounce-promise'
import {useEffect, useState} from 'react'
import {useAsync} from 'react-async-hook'
import useConstant from 'use-constant'

export const useSearchDebounce = <T = any>(
	searchFunction: (query: string) => any,
	minLength = 1,
	defaultResults = [],
) => {
	// Handle the input text state
	const [inputText, setInputText] = useState('')
	const [showResults, setShowResults] = useState(false)
	const [searchedFor, setSearchedFor] = useState('')

	// Debounce the original search async function
	const debouncedSearchFunction = useConstant(() =>
		AwesomeDebouncePromise(searchFunction, 300),
	)
	const [results, setResults] = useState<T[]>(defaultResults)

	// The async callback is run each time the text changes,
	// but as the search function is debounced, it does not
	// fire a new request on each keystroke
	const searchResults = useAsync<T[]>(async () => {
		if (inputText.length <= minLength) {
			setShowResults(false)
			return defaultResults
		}
		setShowResults(true)
		setSearchedFor(inputText)
		return debouncedSearchFunction(inputText)
	}, [debouncedSearchFunction, inputText])

	useEffect(() => {
		if (!searchResults.loading && searchResults.result) {
			setResults(searchResults.result)
		}
	}, [searchResults])

	return {
		results,
		inputText,
		searchResults,
		showResults,
		searchedFor,
		setResults,
		setInputText,
		setShowResults,
	}
}
