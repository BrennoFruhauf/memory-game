import { selectRandomElements, shuffleArray } from './utilities.js'
;(() => {
	function createNewElement(tagName, className) {
		return Object.assign(document.createElement(tagName), {
			className: className,
		})
	}

	const urlParams = new URLSearchParams(window.location.search)
	const infoGame = [urlParams.get('name'), urlParams.get('cards')]
	const main = document.querySelector('main')
	const cards = [
		'air-goddess',
		'antimatter-goddess',
		'blackhole-goddess',
		'blood-goddess',
		'darkness-goddess',
		'death-goddess',
		'electricity-goddess',
		'fairy-goddess',
		'fire-goddess',
		'ice-goddess',
		'light-goddess',
		'magic-goddess',
		'magma-goddess',
		'nature-goddess',
		'poison-goddess',
		'rainbow-goddess',
		'sun-goddess',
		'technology-goddess',
		'water-goddess',
		'weapons-goddess',
	]

	const playerName = document.querySelector('#name')
	const timerGame = document.querySelector('#timer')

	function reloadGame() {
		window.location.reload()
	}

	const bgMusic = () => {
		const adjustVolume = () => {
			music.volume = volumeSlider.value

			if (volumeSlider.value == 0) {
				playing.classList.toggle('hidden')
				muted.classList.toggle('hidden')
			} else {
				playing.classList.remove('hidden')
				muted.classList.add('hidden')
			}
		}

		const music = document.querySelector('audio')
		const btn = document.querySelector('#music')
		const playing = document.querySelector('i.fa-volume-high')
		const muted = document.querySelector('i.fa-volume-xmark')
		const volumeSlider = document.querySelector('#volume-slider')

		music.src = '../others/bg-music.mp3'
		music.volume = 0.3
		volumeSlider.value = music.volume
		volumeSlider.addEventListener('input', adjustVolume)

		document.addEventListener('click', function play() {
			music.play()
			document.removeEventListener('click', play)
		})

		btn.addEventListener('click', () => {
			playing.classList.toggle('hidden')
			muted.classList.toggle('hidden')
			let volumeAtual

			if (music.volume > 0) volumeAtual = music.volume
			else volumeAtual = 0.3

			if (playing.classList.contains('hidden')) {
				music.muted = true
				volumeSlider.value = 0
			} else {
				music.muted = false
				volumeSlider.value = volumeAtual
				music.volume = volumeSlider.value
			}
		})
	}
	bgMusic()

	const setPlayerName = () => {
		playerName.textContent = infoGame[0]
	}
	setPlayerName()

	const startTimer = () => {
		let totalSeconds = 0

		window.timer = setInterval(() => {
			const minutes = Math.floor(totalSeconds / 60)
			const seconds = totalSeconds % 60

			const formattedMinutes = String(minutes).padStart(2, '0')
			const formattedSeconds = String(seconds).padStart(2, '0')

			timerGame.textContent = formattedMinutes + ':' + formattedSeconds

			totalSeconds++
		}, 1000)
	}
	startTimer()

	const displayWin = () => {
		const menu = document.querySelector('#menu-endgame')
		const playerInfo = document.querySelector('#player-info')

		menu.style.display = 'flex'
		playerInfo.style.display = 'none'
		document.body.style.overflow = 'hidden'

		const nameWinner = document.querySelector('#name-winner')
		nameWinner.textContent = infoGame[0]

		const amountCards = document.querySelector('#amount-cards')
		amountCards.textContent = infoGame[1]

		const timeWin = document.querySelector('#time-win')
		timeWin.textContent = timerGame.textContent

		const message = document.querySelector('#message')
		const btnPlayAgain = document.querySelector('#play-again')
		const btnChangeLevel = document.querySelector('#change')
		const containerBtns = document.querySelector('#choose-btn')
		const containerChangeLevel = document.querySelector('#change-level')

		btnPlayAgain.addEventListener('click', reloadGame)
		btnChangeLevel.addEventListener('click', () => {
			message.textContent = 'Change the difficulty!'
			containerBtns.style.display = 'none'
			containerChangeLevel.style.display = 'flex'
		})

		const inputDifficulty = document.querySelector('#difficulty')
		const btnPlay = document.querySelector('#change-level button')

		inputDifficulty.addEventListener('input', ({ target }) => {
			const h2 = document.querySelector('#change-level h2')
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

			if (value != '') inputDifficulty.style.width = 'auto'
			else inputDifficulty.style.width = '215px'

			if (
				inputDifficulty.value < 2 ||
				inputDifficulty.value > 20 ||
				inputDifficulty.value == ''
			) {
				btnPlay.setAttribute('disabled', '')
			} else {
				btnPlay.removeAttribute('disabled')
			}
		})

		btnPlay.addEventListener('click', (e) => {
			e.preventDefault()

			window.location = `./game.html?name=${infoGame[0]}&cards=${inputDifficulty.value}`
		})
	}

	const checkEndGame = () => {
		const disabledCards = document.querySelectorAll('.disabled-card')

		if (disabledCards.length == parseInt(infoGame[1]) * 2) {
			clearInterval(window.timer)
			setTimeout(() => {
				displayWin()
			}, 600)
		}
	}

	let firstCard = ''
	let secondCard = ''

	const checkCards = () => {
		const firstGoddess = firstCard
			.querySelector('.image')
			.getAttribute('data-goddess')
		const secondGoddess = secondCard
			.querySelector('.image')
			.getAttribute('data-goddess')

		if (firstGoddess === secondGoddess) {
			firstCard.classList.add('disabled-card')
			secondCard.classList.add('disabled-card')

			firstCard = ''
			secondCard = ''

			checkEndGame()
		} else {
			setTimeout(() => {
				firstCard.childNodes[0].classList.remove('reveal-card')
				secondCard.childNodes[0].classList.remove('reveal-card')

				firstCard = ''
				secondCard = ''
			}, 1000)
		}
	}

	const revealCard = (target) => {
		if (target.className.includes('reveal-card')) return

		if (firstCard === '') {
			target.classList.add('reveal-card')
			firstCard = target.parentNode
		} else if (secondCard === '') {
			target.classList.add('reveal-card')
			secondCard = target.parentNode

			checkCards()
		}
	}

	let isDelay = false
	const createCard = (character) => {
		const card = createNewElement('div', 'card')
		const innerCard = createNewElement('div', 'inner-card')
		const frontSide = createNewElement('div', 'front-side')
		const symbol = createNewElement('div', 'symbol')
		const nameCard = character.replace('-goddess', '')
		const backSide = createNewElement('div', `back-side ${nameCard}`)
		const imageEl = createNewElement('div', `image`)
		imageEl.setAttribute('data-goddess', nameCard)

		const urlImage = `url('../imgs/${character}.png')`
		imageEl.style.setProperty('background-image', urlImage)

		backSide.appendChild(imageEl)
		frontSide.appendChild(symbol)
		innerCard.appendChild(frontSide)
		innerCard.appendChild(backSide)
		card.appendChild(innerCard)

		card.addEventListener('click', (e) => {
			if (isDelay == false) {
				revealCard(e.target)
			}

			isDelay = true

			setTimeout(() => {
				isDelay = false
			}, 300)
		})

		return card
	}

	const loadGame = (arrayOfCards) => {
		const arrayDuplicated = [...arrayOfCards, ...arrayOfCards]
		const shuffledCards = shuffleArray(arrayDuplicated, 0.7)

		shuffledCards.forEach((card) => {
			const cardEl = createCard(card)
			main.appendChild(cardEl)
		})
	}

	const selectedCards = selectRandomElements(cards, parseInt(infoGame[1]))
	loadGame(selectedCards)

	const reloadBtn = document.querySelector('.fa-rotate-right')
	reloadBtn.addEventListener('click', reloadGame)
})()
