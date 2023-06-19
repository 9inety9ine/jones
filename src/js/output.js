console.log('Loaded');

const siteHeader = document.querySelector('.header');
const productContainer = document.querySelector('.product');
const productContainerPadding = window.getComputedStyle(productContainer, null).getPropertyValue('padding-top').replace('px', '');
const productInfo = document.querySelector('.product__info');
const siteHeaderHeight = siteHeader.offsetHeight;
productInfo.style.top = siteHeaderHeight + Number(productContainerPadding) + 'px';

window.initializeImageLoad = function () {
	let imagesToLoad = document.querySelectorAll('img[data-src]');
	const loadImages = image => {
		image.setAttribute('src', image.getAttribute('data-src'));
		image.onload = () => {
			image.removeAttribute('data-src');
			image.classList.remove('preload');
			image.parentNode.classList.remove('preload');
			image.parentNode.parentNode.classList.remove('preload');
			image.parentNode.parentNode.parentNode.classList.remove('preload');
		};
	};
	if ('IntersectionObserver' in window) {
		const observer = new IntersectionObserver((items, observer) => {
			items.forEach(item => {
				if (item.isIntersecting) {
					loadImages(item.target);
					observer.unobserve(item.target);
				}
			});
		});
		imagesToLoad.forEach(img => {
			observer.observe(img);
		});
	} else {
		imagesToLoad.forEach(img => {
			loadImages(img);
		});
	}
};
window.initializeImageLoad();

const wishListButton = document.querySelector('.add-to-wishlist');
wishListButton.addEventListener('click', e => {
	e.preventDefault();
	wishListButton.classList.toggle('active');
});

const variantOptions = document.querySelectorAll('.variant-options');
for (let option of variantOptions) {
	const buttons = option.querySelectorAll('button');
	for (let button of buttons) {
		button.addEventListener('click', e => {
			e.preventDefault();
			if (button.classList.contains('active')) return;
			for (let button of buttons) button.classList.remove('active');
			button.classList.add('active');
		});
	}
	const labels = option.querySelectorAll('label');
	for (let label of labels) {
		label.addEventListener('click', e => {
			e.preventDefault();
			if (label.classList.contains('disabled')) return;
			if (label.classList.contains('active')) return;
			for (let label of labels) label.classList.remove('active');
			label.classList.add('active');
		});
	}
}

const accordionTitles = document.querySelectorAll('.accordion-title');
for (let title of accordionTitles)
	title.addEventListener('click', e => {
		e.preventDefault();
		const parent = title.parentNode;
		parent.classList.toggle('open');
	});

const ModalToggles = document.querySelectorAll('.modal-toggle, .modal__mask');
for (let toggle of ModalToggles)
	toggle.addEventListener('click', e => {
		e.preventDefault();
		const docBody = document.querySelector('body');
		docBody.classList.toggle('no-overflow');
		docBody.classList.toggle('modal-open');
	});
