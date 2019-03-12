class TypeWriter {
	constructor(txtElement, words, waitTime = 3000) {
		this.txtElement = txtElement;
		this.words = words;
		this.txt = '';
		this.wordIndex = 0;
		this.wait = parseInt(waitTime, 10);
		this.type();
		this.isDeleting = false;
	}
	// Type method
	type() {
		// word index
		const current = this.wordIndex % this.words.length;
		// full text 
		const fullTxt = this.words[current];
		// check deleting
		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		}
		else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}
		// txt into element
		this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
		// init type speed
		let typeSpeed = 300;
		if (this.isDeleting) {
			typeSpeed /= 2;
		}
		// check complete word
		if (!this.isDeleting && this.txt === fullTxt) {
			// pause at end
			typeSpeed = this.wait;
			this.isDeleting = true;
		}
		else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			// to next word
			this.wordIndex++;
			// pause before start typing
			typeSpeed = 500;
		}
		setTimeout(() => this.type(), typeSpeed);
	}
}


// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
	const txtElement = document.querySelector('.text-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');
	// Init Type Writer
	new TypeWriter(txtElement, words, wait); 
}