/**
 * Renders project cards into a container element.
 *
 * Projects are split into groups of 4, each group wrapped in the
 * Bootstrap row + card-deck structure used throughout the site.
 *
 * @param {string} containerId - ID of the element to render into
 * @param {boolean} featuredOnly - When true, only projects with featured: true are rendered
 */
function renderProjects(containerId, featuredOnly) {
  var container = document.getElementById(containerId);
  if (!container) return;

  var projects = featuredOnly
    ? projectsData.filter(function (p) { return p.featured; })
    : projectsData;

  var html = '';
  var groupSize = 4;

  for (var i = 0; i < projects.length; i += groupSize) {
    var group = projects.slice(i, i + groupSize);
    var cards = group.map(function (project) {
      return '<div class="card project-card">'
        + '<img class="card-img-top" src="' + project.image + '" alt="' + project.title + '">'
        + '<div class="card-body d-flex flex-column">'
        + '<h5 class="card-title">' + project.title + '</h5>'
        + '<p class="card-subtitle mb-2 text-muted">' + project.subtitle + '</p>'
        + '<p class="card-text">' + project.description + '</p>'
        + '<a href="' + project.link + '" class="btn btn-primary mt-auto project-button">View Project</a>'
        + '</div>'
        + '</div>';
    }).join('');
    var remainder = group.length % groupSize;
      if (remainder !== 0) {
      for (var j = remainder; j < groupSize; j++) {
        cards += '<div class="card project-card invisible" style="pointer-events:none;"></div>';
       }
      }

    html += '<div class="row">'
      + '<div class="card-deck cd-mobile">'
      + cards
      + '</div>'
      + '</div>';

    if (i + groupSize < projects.length) {
      html += '<br>';
    }
  }

  container.innerHTML = html;
}
