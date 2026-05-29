document.addEventListener('DOMContentLoaded', function () {
	loadInclude('header-placeholder', '/header.html', setActiveNav);
	loadInclude('footer-placeholder', '/footer.html');
});

function loadInclude(placeholderId, url, onLoaded) {
	var placeholder = document.getElementById(placeholderId);
	if (!placeholder) {
		return;
	}

	fetch(url)
		.then(function (response) {
			if (!response.ok) {
				throw new Error('HTTP ' + response.status);
			}
			return response.text();
		})
		.then(function (html) {
			placeholder.innerHTML = html;
			if (onLoaded) {
				onLoaded(placeholder);
			}
		})
		.catch(function (error) {
			console.error('Error loading ' + url + ':', error);
		});
}

function normalizePath(pathname) {
	var path = pathname || '/';
	if (path.length > 1 && path.endsWith('/')) {
		path = path.slice(0, -1);
	}
	if (path === '' || path === '/') {
		return '/index.html';
	}
	return path;
}

function setActiveNav(placeholder) {
	var currentPath = normalizePath(window.location.pathname);

	placeholder.querySelectorAll('.nav-link').forEach(function (link) {
		var href = link.getAttribute('href');
		if (!href || href.indexOf('.pdf') !== -1) {
			return;
		}

		var linkPath = normalizePath(new URL(href, window.location.origin).pathname);
		if (linkPath === currentPath) {
			link.classList.add('active-nav');
		}
	});
}
