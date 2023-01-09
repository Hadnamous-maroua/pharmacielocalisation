$('a').removeClass('active');
$('a:contains(Statistiques)').addClass('active');
$("#main-content").load("page/pharmacie.html");

function show(page) {
	if (page == 'ville') {
		$('a').removeClass('active');
		$('a:contains(Ville)').addClass('active');
		$("#main-content").load("page/ville.html");

		event.preventDefault();
	}
	if (page == "statistiques") {
		$('a').removeClass('active');
		$('a:contains(Statistiques)').addClass('active');
		$("#main-content").load("page/statistiques.html");
		event.preventDefault();
	}
	if (page == "zones") {
		$('a').removeClass('active');
		$('a:contains(Zones)').addClass('active');
		$("#main-content").load("page/zone.html");
		event.preventDefault();
	}
	if (page == "pharmacies") {
		$('a').removeClass('active');
		$('a:contains(Pharmacies)').addClass('active');
		$("#main-content").load("page/pharmacie.html");
		event.preventDefault();
	}
	if (page == "pharmaciegarde") {
		$('a').removeClass('active');
		$('a:contains(PharmacieGarde)').addClass('active');
		$("#main-content").load("page/pharmaciegarde.html");
		event.preventDefault();
	}
}
