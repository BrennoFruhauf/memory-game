;(() => {
	const inputDifficulty = document.querySelector('#difficulty')
	const inputName = document.querySelector('#name')
	const btnPlay = document.querySelector('button')

	inputDifficulty.addEventListener('input', ({ target }) => {
		const h2 = document.querySelector('h2')
		target.value = target.value.replace('e', '')

		if (target.value > 20) target.value = 20

		const value = target.value
		const difficultyColors = {
			easy: '#18ff14',
			normal: '#ffbc00',
			medium: '#ff5200',
			hard: '#ff0000',
			default: '#8d00e5',
		}

		if (value >= 2 && value <= 5) {
			h2.textContent = 'Easy'
			h2.style.backgroundColor = difficultyColors.easy
		} else if (value >= 6 && value <= 10) {
			h2.textContent = 'Normal'
			h2.style.backgroundColor = difficultyColors.normal
		} else if (value >= 11 && value <= 15) {
			h2.textContent = 'Medium'
			h2.style.backgroundColor = difficultyColors.medium
		} else if (value >= 16 && value <= 20) {
			h2.textContent = 'Hard'
			h2.style.backgroundColor = difficultyColors.hard
		} else {
			h2.textContent = 'Difficulty'
			h2.style.backgroundColor = difficultyColors.default
		}
	})

	inputName.addEventListener('input', ({ target }) => {
		if (target.value.length > 3) btnPlay.removeAttribute('disabled')
		else btnPlay.setAttribute('disabled', '')
	})

	btnPlay.addEventListener('click', (e) => {
		e.preventDefault()

		const selectNumOfCards = () => {
			const min = 2
			const max = 20

			const random = Math.random()
			const multiplied = random * (max - min + 1)
			const rounded = Math.floor(multiplied)
			return min + rounded
		}

		let cardsAmount = 0

		if (
			inputDifficulty.value < 2 ||
			inputDifficulty.value > 20 ||
			inputDifficulty.value == ''
		) {
			cardsAmount = selectNumOfCards()
		} else {
			cardsAmount = inputDifficulty.value
		}

		window.location = `./pages/game.html?name=${inputName.value}&cards=${cardsAmount}`
	})
})()
