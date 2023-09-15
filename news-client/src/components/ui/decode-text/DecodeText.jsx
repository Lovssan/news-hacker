const DecodeText = ({ text }) => {
	function decodeEntities(encodedString) {
		const textArea = document.createElement('textarea')
		textArea.innerHTML = encodedString
		return textArea.value
	}

	const decodedText = decodeEntities(text)

	return <div dangerouslySetInnerHTML={{ __html: decodedText }} />
}

export default DecodeText
