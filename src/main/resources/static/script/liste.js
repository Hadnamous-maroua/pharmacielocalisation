

$(document)
		.ready(
				function() {

					table = $('#tpharmacie')
							.DataTable({
										ajax : {
											url : "pharmacies/all",
											dataSrc : ''
										},
										columns : [
												{
													data : "id"
												},
												{
													data : "nom"
												},
												{
													data : "adresse"
												},
												{
													data : "latitude"
												},
												{
													data : "longitude"
												},
												{
													data : "zone.nom"
												},
												{
													data : "zone.ville.nom"
												},
												{
													data : "etat"
												}
												]

									});
									
									$(document).ready(function() {
	
	$.ajax({
		url: '/villes/all',
	
		type: 'GET',
		success: function (data) {
			var option = '';
			data.forEach(e => {
				option += '<option value =' + e.nom + '>' + e.nom + '</option>';
			});
			console.table(data);

			$('#ville').append(option);
			//console.log($('#ville').html());

		},
		error: function (jqXHR, textStatus,
			errorThrown) {
			console.log(textStatus);
		}

	});
})

$('#ville').on('change',function(){
	$('#zone').empty()


	$.ajax({
		url: '/villes/zone/'+this.value,
		type: 'GET',
		success: function (data) {
			var option = '';
			data.forEach(e => {
				option += '<option value =' + e.id + '>' + e.nom + '</option>';
			});

			$('#zone').append(option);
			console.log($('#zone').html());
		},
		error: function (jqXHR, textStatus,
			errorThrown) {
			console.log(textStatus);
		}
})}),
					
					
					
					

					$('#btn').click(
							function() {
								var nom = $("#nom");
								var adresse = $("#adresse");
								var latitude = $("#latitude");
								var longitude = $("#longitude");
								var ville=$("#ville");
								var zone = $("#zone");
								
								if ($('#btn').text() == 'Ajouter') {
									var p = {
										nom : nom.val(),
										adresse : adresse.val(),
										latitude : latitude.val(),
										longitude : longitude.val(),
										ville:{
											id : ville.val()
										},
										zone : {
											id : zone.val()
										}
										
									};
									

									$.ajax({
										url : 'pharmacies/save',
										contentType : "application/json",
										dataType : "json",
										data : JSON.stringify(p),
										type : 'POST',
										async : false,
										success : function(data, textStatus,
												jqXHR) {
											table.ajax.reload();
										},
										error : function(jqXHR, textStatus,
												errorThrown) {
											console.log(textStatus);
										}
									});
									
									
									$("#main-content").load(
											"./page/pharmacie.html");
								}
							});

					$('#table-content')
							.on(
									'click',
									'.supprimer',
									function() {

										var id = $(this).closest('tr').find(
												'td').eq(0).text();
										var oldLing = $(this).closest('tr')
												.clone();
										var newLigne = '<tr style="position: relative;" class="bg-light" ><th scope="row">'
												+ id
												+ '</th><td colspan="4" style="height: 100%;">';
										newLigne += '<h4 class="d-inline-flex">Voulez vous vraiment supprimer cette pharmacie ? </h4>';
										newLigne += '<button type="button" class="btn btn-outline-primary btn-sm confirmer" style="margin-left: 25px;">Oui</button>';
										newLigne += '<button type="button" class="btn btn-outline-danger btn-sm annuler" style="margin-left: 25px;">Non</button></td></tr>';

										$(this).closest('tr').replaceWith(
												newLigne);
										$('.annuler').click(
												function() {
													$(this).closest('tr')
															.replaceWith(
																	oldLing);
												});
										$('.confirmer')
												.click(
														function(e) {
															e.preventDefault();
															$
																	.ajax({
																		url : 'pharmacies/delete/'
																				+ id,
																		data : {},
																		type : 'DELETE',
																		async : false,
																		success : function(
																				data,
																				textStatus,
																				jqXHR) {
																			if (data
																					.includes("error") == true) {
																				$(
																						"#error")
																						.modal();
																			} else {
																				table.ajax
																						.reload();
																			}
																		},
																		error : function(
																				jqXHR,
																				textStatus,
																				errorThrown) {
																			$(
																					"#error")
																					.modal();
																		}
																	});

														});

									});

					$('#table-content').on(
							'click',
							'.modifier',
							function() {
								var btn = $('#btn');
								var id = $(this).closest('tr').find('td').eq(0)
										.text();
								
								var nom = $(this).closest('tr').find('td').eq(
										1).text();
								var adresse = $(this).closest('tr').find('td')
										.eq(2).text();
								var latitude = $(this).closest('tr').find('td')
										.eq(3).text();
								var longitude = $(this).closest('tr').find('td')
								.eq(4).text();
								
								var zone = $(this).closest('tr').find('td')
								.eq(5).text();
								var ville = $(this).closest('tr').find('td')
								.eq(6).text();
							
								
								btn.text('Modifier');
								$("#nom").val(nom);
								$("#adresse").val(adresse);
								$("#latitude").val(latitude);
								$("#longitude").val(longitude);
								var op = $('#zone option').filter(function () { return $(this).html() == zone; }).val();
								$("#zone").val(op);
								$("#id").val(id);
								
								
								


								
								btn.click(function(e) {
									e.preventDefault();
									var p = {
										id : $("#id").val(),
										nom : $("#nom").val(),
										adresse : $("#adresse").val(),
										latitude : $("#latitude").val(),
										longitude : $("#longitude").val(),
										
										zone : {
											id : $("#zone").val()
											
										}
										
									};
									if ($('#btn').text() == 'Modifier') {
										$.ajax({
											url : 'pharmacies/save',
											contentType : "application/json",
											dataType : "json",
											data : JSON.stringify(p),
											type : 'POST',
											async : false,
											success : function(data,
													textStatus, jqXHR) {
												table.ajax.reload();
												$("#nom").val('');
												$("#adresse").val('');
												$("#latitude").val('');
												$("#longitude").val('');
												
												$("#zone").val('');
												btn.text('Ajouter');
											},
											error : function(jqXHR, textStatus,
													errorThrown) {
												console.log(textStatus);
											}
										});
										$("#main-content").load(
												"./page/pharmacie.html");
									}
								});
							});

					
				});
