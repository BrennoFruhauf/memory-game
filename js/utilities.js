export function shuffleArray(array, probability = 0.5) {
	function swap(array, i, j) {
		const temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}

	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		swap(array, i, j)
	}

	let hasConsecutiveDuplicates = true
	while (hasConsecutiveDuplicates) {
		hasConsecutiveDuplicates = false
		for (let i = 0; i < array.length - 1; i++) {
			if (array[i] === array[i + 1]) {
				if (Math.random() < probability) {
					hasConsecutiveDuplicates = true
					shuffleArray(array, probability)
				} else {
					return array
				}
				break
			}
		}
	}

	return array
}

export function selectRandomElements(array, quantity) {
	const shuffledArray = array.slice()
	const selectedElements = []

	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1))
		;[shuffledArray[i], shuffledArray[randomIndex]] = [
			shuffledArray[randomIndex],
			shuffledArray[i],
		]
	}

	for (let j = 0; j < quantity; j++) {
		selectedElements.push(shuffledArray[j])
	}

	return selectedElements
}
