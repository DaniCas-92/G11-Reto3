function traerInformacion(){
	$.ajax({        
                url : 'http://localhost/api/Reservation/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
		success : function(respuesta) {

			$("#resultado").empty();
			let miTabla = '<div class="container"><div  class= "row">';
			for (i=0; i<respuesta.length; i++){
				miTabla += ` <div class="card m-2" >
								<div class="card-body" >
									<h5 class ="card-title"> Reserva #${respuesta[i].idReservation}</h5> 		
								    <h6 class ="card-subtitle mb-2 text-muted"> Desde: ${respuesta[i].startDate.slice(0, 10)} </h6> 	
								    <h6 class ="card-subtitle mb-2 text-muted"> Hasta: ${respuesta[i].devolutionDate.slice(0, 10)} </h6>
									<h6 class ="card-subtitle mb-2 text-muted"> Estado: ${respuesta[i].status} </h6>
									<p class= "card-text"> ${respuesta[i].client.name} <br>
														    ${respuesta[i].motorbike.name} </p>
							`;
				if(respuesta[i].score!=null){
					miTabla += `
								<p class= "card-text"> ${respuesta[i].score.stars} estrella(s) <br> 						
													   ${respuesta[i].score.messageText} </p>`;
				}
				miTabla +=	`		<button class="btn btn-primary" onclick="editarRegistro(${respuesta[i].idReservation} )" ><i class="material-icons">&#xE254;</i>Editar</button>
								    <button  class="btn btn-danger" onclick="eliminarRegistro(${respuesta[i].idReservation} )"><i class="material-icons">&#xE872;</i>Borrar</button>
								</div>
							</div>
							`;
			}			
			miTabla += '</div></div>';
			$("#resultado").append(miTabla);        
			pintarSelectClient(0); 
			pintarSelectMoto(0);
            limpiarCampos();
		},
		error : function(xhr, status) {
			cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
		}
	});
}

function guardarInformacion(){
	if($('#startDate').val() !="" && $('#devolutionDate').val() !="" && $('#mot').val() !="Seleccione..." && $('#cli').val() !="Seleccione..."){
		if($('#devolutionDate').val() > $('#startDate').val()) {
			let selectedCli = $("#cli").children(":selected").attr("value");
			let selectedMoto = $("#mot").children(":selected").attr("value");
			if (selectedCli.length > 0 && selectedMoto.length > 0) {
				let misDatos = {
					startDate: $('#startDate').val(),
					devolutionDate: $("#devolutionDate").val(),
					client : {
						idClient: selectedCli
					},
					motorbike : {
						id: selectedMoto
					}
				};
				let datosJson = JSON.stringify(misDatos); 
				$.ajax(   
				'http://localhost/api/Reservation/save',
				{data: datosJson,
				type : 'POST',
				dataType : 'json',
				contentType: "application/json; charset=utf-8",
			
				statusCode : {
					201 :  function() {
						cargarMensaje("alert-success","Exitoso","Reservación guardada");
						traerInformacion();	
						}
					}
				});
			}
		} else {
			cargarMensaje("alert-warning","Advertencia","La fecha de devolución debe que ser mayor a la fecha actual");
		}
	} else {
		cargarMensaje("alert-warning","Advertencia","Se deben llenar todos los campos");
	}
}

function pintarSelectClient(id){
	$.ajax({    
    url : 'http://localhost/api/Client/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#cli").empty();
		clienteSelect='<option id="" >Seleccione...</option>';
		for (i=0; i<respuesta.length; i++){
			if (respuesta[i].idClient == id){
				clienteSelect += '<option selected value='+ respuesta[i].idClient+ '>'+respuesta[i].name+'</option>';
			} else {
	        	clienteSelect += '<option value='+ respuesta[i].idClient+ '>'+respuesta[i].name+'</option>'; 
			} 		
		}
	    $("#cli").append(clienteSelect);    

	},
    error : function(xhr, status) {
        cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
    }
	});
	
}

function pintarSelectMoto(id){
	$.ajax({    
    url : 'http://localhost/api/Motorbike/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#mot").empty();
		motoSelect='<option id="" >Seleccione...</option>';
		for (i=0; i<respuesta.length; i++){
			if (respuesta[i].id == id){
				motoSelect += '<option selected value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>';
			} else {
	        	motoSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>'; 
			}  		
		}
	    $("#mot").append(motoSelect);    

	},
    error : function(xhr, status) {
        cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
    }
	});
	
}


function editarRegistro (id){

	$.ajax({    
    url : 'http://localhost/api/Reservation/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {	
		$("#idReservation").val(respuesta.idReservation);
		
		const fecInicio = respuesta.startDate.slice(0, 10);
		$("#startDate").val(fecInicio);
		const fecDevolucion = respuesta.devolutionDate.slice(0, 10);
		$("#devolutionDate").val(fecDevolucion);

		pintarSelectStatus(respuesta.status);
		pintarSelectMoto(respuesta.motorbike.id);
		pintarSelectClient(respuesta.client.idClient); 

		$("#mot").attr("disabled", true);
		$("#cli").attr("disabled", true);

		$("#guardar").attr('disabled', true);
		$("#actualizar").attr('disabled', false);
	},
    error : function(xhr, status) {
        cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
    }
});
}

function actualizarInformacion(){
	if($('#devolutionDate').val() !="" && $('#startDate').val() !="" && $('#status').val() !="Seleccione..."){
		if($('#devolutionDate').val() > $('#startDate').val()) {
			let selectedStatus = $("#status").children(":selected").attr("value");
			if (selectedStatus.length > 0) {
				let misDatos = {
					idReservation: $("#idReservation").val(),
					startDate: $("#startDate").val(),
					devolutionDate: $("#devolutionDate").val(),
					status: selectedStatus
				};
				let datosJson = JSON.stringify(misDatos); 

				$.ajax(    
				'http://localhost/api/Reservation/update',
				{data: datosJson,
				type : 'PUT',
				dataType : 'json',
				contentType: "application/json; charset=utf-8",
			
				statusCode : {
					201 :  function() {
						cargarMensaje("alert-success","Exitoso","Reservación actualizada");
						traerInformacion();	
						}
					}
				});
			}
		} else {
			cargarMensaje("alert-warning","Advertencia","La fecha de devolución debe que ser mayor a la fecha de inicio de la reserva!");
		}
	} else {
		cargarMensaje("alert-warning","Advertencia","Se deben llenar todos los campos");
	}
}

function eliminarRegistro(id){
	$.ajax( {   
    url:'http://localhost/api/Reservation/'+id,
    type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			cargarMensaje("alert-success","Exitoso","Reservación eliminada");
                        traerInformacion();	
			}
		}
	});
}	

function pintarSelectStatus(status){

	$("#status").empty();
	statusSelect='<option id="" >Seleccione...</option>';
	for (i=0; i<3; i++){
		if(i==0){
			if ("programmed" == status){
				statusSelect += '<option selected value="programmed">Programado</option>';
			} else {
				statusSelect += '<option value="programmed">Programado</option>';
			} 
		} else if(i==1){
			if ("cancelled" == status){
				statusSelect += '<option selected value="cancelled">cancelado</option>';
			} else {
				statusSelect += '<option value="cancelled">cancelado</option>';
			} 
		} else if(i==2){
			if ("realized" == status){
				statusSelect += '<option selected value="realized">Realizado</option>';
			} else {
				statusSelect += '<option value="realized">Realizado</option>';
			} 
		}
	}
	
	$("#status").attr("disabled", false);
	$("#status").append(statusSelect);    
	
}

function fechaActual() {
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

	$('#startDate').val(today);
}

$(document).ready(pintarSelectClient());
$(document).ready(pintarSelectMoto());
$(document).ready(function () {
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

	$('#startDate').val(today);
});

function limpiarCampos(){
    
	$("#idReservation").val("");
	$("#startDate").val("");
	fechaActual();
	$("#devolutionDate").val("");

	$("#mot").val("");
	$("#cli").val("");
        $("#mot").attr("disabled", false);
	$("#cli").attr("disabled", false);
						
        $("#status").empty();
	selectStatus = '<option value="created" selected>Creado</option>';	
	$("#status").attr("disabled", true);			
	$("#status").append(selectStatus);    

	$("#guardar").attr('disabled', false);
	$("#actualizar").attr('disabled', true);
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