console.log('Loaded');

const siteHeader = document.querySelector('.header');
const productContainer = document.querySelector('.product');
const productContainerPadding = window.getComputedStyle(productContainer, null).getPropertyValue('padding-top').replace('px', '');
const productInfo = document.querySelector('.product__info');
const siteHeaderHeight = siteHeader.offsetHeight;
productInfo.style.top = siteHeaderHeight + Number(productContainerPadding) + 'px';

const initializeImageLoad = function () {
	let imagesToLoad = document.querySelectorAll('img[data-src]');
	const loadImages = image => {
		image.setAttribute('src', image.getAttribute('data-src'));
		image.onload = () => {
			image.removeAttribute('data-src');
			image.classList.remove('preload');
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
initializeImageLoad();

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
