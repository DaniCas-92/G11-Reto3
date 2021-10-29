function consultarReporteDate(){
	if($('#endDate').val() !="" && $('#startDate').val() !=""){
		if($('#endDate').val() > $('#startDate').val()) {
			let startDate = $('#startDate').val();
			let endDate = $("#endDate").val();
			$.ajax({        
				url : 'http://localhost/api/Reservation/report-dates/'+startDate+'/'+endDate,
				type : 'GET',
				dataType : 'json',
				contentType: "application/json; charset=utf-8",
		
				success : function(respuesta) {

					$("#resultado").empty();
					let miTabla = '<div class="container"><h4 class ="card-title">Conteo de reservas</h4> <br><div  class= "row">';
					for (i=0; i<respuesta.length; i++){
						miTabla += ` <div class="card m-2" >
										<div class="card-body" >		
											<h5 class ="card-title"> Reserva #${respuesta[i].idReservation}</h5> 		
											<h6 class ="card-subtitle mb-2 text-muted"> Desde: ${respuesta[i].startDate.slice(0, 10)} </h6> 	
											<h6 class ="card-subtitle mb-2 text-muted"> Hasta: ${respuesta[i].devolutionDate.slice(0, 10)} </h6>
											<h6 class ="card-subtitle mb-2 text-muted"> Estado: ${respuesta[i].status} </h6>
											<h7 class ="card-subtitle mb-2 text-muted"> Motocicleta:</h7>
											<p class= "card-text"> ${respuesta[i].motorbike.name} <br>
																	${respuesta[i].motorbike.brand} <br>
																	${respuesta[i].motorbike.year} <br>
																	${respuesta[i].motorbike.description} <br></p>	
											<h7 class ="card-subtitle mb-2 text-muted"> Cliente:</h7>
											<p class= "card-text"> ${respuesta[i].client.name} <br>
																	${respuesta[i].client.email} <br>
																	${respuesta[i].client.age} años </p>
										</div>
									</div>
									`;
					}			
					miTabla += '</div></div>';
					$("#resultado").append(miTabla);        
					$("#startDate").val("");
					$("#endDate").val("");
				},
				error : function(xhr, status) {
					cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
				}
			});
		}else {
			cargarMensaje("alert-warning","Advertencia","La fecha de fin debe ser mayor a la fecha de inicio");
		}
	} else {
		cargarMensaje("alert-warning","Advertencia","Se deben seleccionar fechas de inicio y fin");
	}
}

function consultarReporteStatus(){
	$.ajax({        
		url : 'http://localhost/api/Reservation/report-status',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		
		success : function(respuesta) {

			$("#resultado").empty();
			let miTabla = `<div class="container"><h4 class ="card-title">Conteo de reservas completadas vs canceladas</h4><div  class= "row">'
							<div class="card m-2" >
								<div class="card-body" >
									<h5 class ="card-title"> Completadas: ${respuesta.completed}</h5> 
									<h5 class ="card-title"> Canceladas: ${respuesta.cancelled}</h5> 											
								</div>
							</div>
							</div></div>
							`;		
			$("#resultado").append(miTabla);        
			$("#startDate").val("");
			$("#endDate").val("");
		},
		error : function(xhr, status) {
			cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
		}
	});	
}

function consultarReporteClients(){
	$.ajax({        
		url : 'http://localhost/api/Reservation/report-clients',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		
		success : function(respuesta) {

			$("#resultado").empty();
			let miTabla = '<div class="container"><h4 class ="card-title">Top mejores clientes</h4> <br><div  class= "row">';
					for (i=0; i<respuesta.length; i++){
						miTabla += ` <div class="card m-2" >
										<div class="card-body" >		
											<h5 class ="card-title"> Total #${respuesta[i].total}</h5> 		
											<h6 class ="card-subtitle mb-2 text-muted"> Cliente: </h6> 
											<h6 class ="card-subtitle mb-2 text-muted"> ${respuesta[i].client.name} </h6> 	
											<h6 class ="card-subtitle mb-2 text-muted"> ${respuesta[i].client.email}</h6>
											<h6 class ="card-subtitle mb-2 text-muted"> ${respuesta[i].client.age} años </h6>`;
											for(j=0; j<respuesta[i].client.reservations.length; j++){
												miTabla += `
												<h6 class ="card-subtitle mb-2 text-muted"> --------------------------------- </h6>
												<h7 class ="card-subtitle mb-2 text-muted"> Reserva #${respuesta[i].client.reservations[j].idReservation} <br></h7>
															<p class= "card-text"> 
																Desde: ${respuesta[i].client.reservations[j].startDate.slice(0, 10)} <br>
																Hasta: ${respuesta[i].client.reservations[j].devolutionDate.slice(0, 10)} 	<br>
																Estado: ${respuesta[i].client.reservations[j].status} <br></p>

												<h7 class ="card-subtitle mb-2 text-muted"> Motocicleta: <br></h7>
															<p class= "card-text">
																	${respuesta[i].client.reservations[j].motorbike.name} <br>
																	${respuesta[i].client.reservations[j].motorbike.brand} <br>
																	${respuesta[i].client.reservations[j].motorbike.year} <br>
																	${respuesta[i].client.reservations[j].motorbike.description} <br></p>`;

											}
											miTabla += `						
										</div>
									</div>
									`;
					}			
					miTabla += '</div></div>';
			$("#resultado").append(miTabla);        
			$("#startDate").val("");
			$("#endDate").val("");
		},
		error : function(xhr, status) {
			cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
		}
	});	
}

function cargarMensaje(tipo, titulo, texto){	
	$("#mensaje").empty();
	let mensaje = `<div class="alert ` + tipo + `" data-alert id="myAlert">
						<strong>` + titulo + `! </strong>`+ texto +`
					</div>`;
	$("#mensaje").append(mensaje);
	$("#mensaje").fadeIn();
	mostrarAlertBox();
}

function mostrarAlertBox(){
	window.setTimeout(function () {
	  $("#mensaje").fadeOut(300)
	}, 3000);
} 