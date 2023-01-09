$(document)
		.ready(
				function() {

					table = $('#tpharmaciegarde')
							.DataTable({
										ajax : {
											url : "pharmaciegarde/all",
											dataSrc : ''
										},
										columns : [
												{
													data : "pharmacie.nom"
												},
												{
													data : "garde.type"
												},
												{
													data : "pharmacie.zone.nom"
												},
												{
													data : "pharmacie.zone.ville.nom"
												},
												
												{
													data : "pk.dateDebut"
												},
												{
													data : "dateFin"
												}]

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
			
		},
		error: function (jqXHR, textStatus,
			errorThrown) {
			console.log(textStatus);
		}
});
})
$('#zone').on('change',function(){
	$('#pharmacie').empty()

					$.ajax({
						url: '/zones/pharmacie/'+this.value,
						type:'GET',
						success : function(data) {
							var option = '';
							data.forEach(e=>{
								option += '<option value ='+e.id+'>'+e.nom+'</option>';
							});
							
							
						$('#pharmacie').append(option);
						
						},
						error : function(jqXHR, textStatus,
								errorThrown) {
							console.log(textStatus);
						}
						
					});})
					$.ajax({
						url:'/gardes/all',
						type:'GET',
						success : function(data) {
							var option = '';
							data.forEach(e=>{
								option += '<option value ='+e.id+'>'+e.type+'</option>';
							});
							
						$('#garde').append(option);
						},
						error : function(jqXHR, textStatus,
								errorThrown) {
							console.log(textStatus);
						}
						
					});

					$('#btn').click(
							function() {
								var pharmacie = $("#pharmacie");
								var garde = $("#garde");
								var dateDebut = $("#dateDebut");
								var dateFin = $("#dateFin");
								
								
								if ($('#btn').text() == 'Ajouter') {
									var p = {
										pk:{
											pharmacie :pharmacie.val(),
											garde : garde.val(),
											dateDebut: dateDebut.val()
											
										} ,

										dateDebut: dateDebut.val(),
										dateFin : dateFin.val(),
										
										pharmacie : {
											id : pharmacie.val()
										},
										garde : {
											id : garde.val()
										}
										
									};

									$.ajax({
										url : 'pharmaciegarde/save',
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
											"./page/pharmaciegarde.html");
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
										newLigne += '<h4 class="d-inline-flex">Voulez vous vraiment supprimer cette pharmacie de garde ? </h4>';
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
																		url : 'pharmaciegarde/delete/'
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
								
								var reference = $(this).closest('tr').find('td').eq(
										1).text();
								var dateAchat = $(this).closest('tr').find('td')
										.eq(2).text();
								var prix = $(this).closest('tr').find('td')
										.eq(3).text();
								var marque = $(this).closest('tr').find('td')
								.eq(4).text();
							
								
								btn.text('Modifier');
								$("#reference").val(reference);
								$("#dateAchat").val(dateAchat);
								$("#prix").val(prix);
								var op = $('#marque option').filter(function () { return $(this).html() == marque; }).val();
								$("#marque").val(op);
								$("#id").val(id);
								
								btn.click(function(e) {
									e.preventDefault();
									var p = {
										id : $("#id").val(),
										reference : $("#reference").val(),
										dateAchat : $("#dateAchat").val(),
										prix : $("#prix").val(),
										marque : {
											id : $("#marque").val()
											
										}
										
									};
									if ($('#btn').text() == 'Modifier') {
										$.ajax({
											url : 'machines/save',
											contentType : "application/json",
											dataType : "json",
											data : JSON.stringify(p),
											type : 'POST',
											async : false,
											success : function(data,
													textStatus, jqXHR) {
												table.ajax.reload();
												$("#reference").val('');
												$("#dateAchat").val('');
												$("#prix").val('');
												$("#marque").val('');
												btn.text('Ajouter');
											},
											error : function(jqXHR, textStatus,
													errorThrown) {
												console.log(textStatus);
											}
										});
										$("#main-content").load(
												"./page/machine.html");
									}
								});
							});

					
				});