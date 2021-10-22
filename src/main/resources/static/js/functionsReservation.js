function traerInformacion(){
	$.ajax({        
                url : 'http://129.151.106.128/api/Reservation/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
		success : function(respuesta) {
			console.log(respuesta);
			$("#resultado").empty();
			let miTabla = '<table>';
			miTabla += '<tr>';
			miTabla += '<th>ID</th>';
			miTabla += '<th>Fecha de Inicio</th>';
			miTabla += '<th>Fecha Devolución</th>';
			miTabla += '<th>Estado</th>';
			miTabla += '<th>Id cliente</th>';
			miTabla += '<th>Nombre Cliente</th>';
			miTabla += '<th>Correo Cliente</th>';
			miTabla += '<th>Acción 1</th>';
			miTabla += '<th>Acción 2</th>';
			miTabla += '<th>Calificación</th>';
			miTabla += '<th>Mensaje Calificación</th>';
			miTabla += '</tr>';
			for (i=0; i<respuesta.length; i++){
				miTabla += '<tr>';
				miTabla += '<td>'+ respuesta[i].idReservation+ '</td>'; 		
				miTabla += '<td>'+ respuesta[i].startDate+ '</td>'; 		
				miTabla += '<td>'+ respuesta[i].devolutionDate+ '</td>'; 	
				miTabla += '<td>'+ respuesta[i].status+ '</td>'; 	
				miTabla += '<td>'+ respuesta[i].client.idClient+ '</td>'; 
				miTabla += '<td>'+ respuesta[i].client.name+ '</td>'; 	
				miTabla += '<td>'+ respuesta[i].client.email+ '</td>'; 
				miTabla += '<td><button onclick="editarRegistro('+respuesta[i].idReservation+' )">Editar</button>';		
				miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].idReservation+' )">Eliminar</button>';	
				if(respuesta[i].score!=null){						
					miTabla += '<td>'+ respuesta[i].score.stars+ '</td>'; 						
					miTabla += '<td>'+ respuesta[i].score.messageText+ '</td>'; 
				}		
				miTabla += '</tr>';
	
			}
			miTabla += '</table>';
			$("#resultado").append(miTabla);        
			pintarSelectClient(); 
			pintarSelectMoto();
                        limpiarCampos();
		},
		error : function(xhr, status) {
			alert('Ha sucedido un problema:'+ status + json);
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
				'http://129.151.106.128/api/Reservation/save',
				{data: datosJson,
				type : 'POST',
				dataType : 'json',
				contentType: "application/json; charset=utf-8",
			
				statusCode : {
					201 :  function() {
						alert("Reserva guardada!");
						traerInformacion();	
						}
					}
				});
			}
		} else {
			alert("La fecha de devolución debe que ser mayor a la fecha actual!");
		}
	} else {
		alert("Se deben llenar todos los campos!");
	}
}

function pintarSelectClient(id){
	$.ajax({    
    url : 'http://129.151.106.128/api/Client/all',
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
        alert('ha sucedido un problema:'+ status);
    }
	});
	
}

function pintarSelectMoto(id){
	$.ajax({    
    url : 'http://129.151.106.128/api/Motorbike/all',
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
        alert('ha sucedido un problema:'+ status);
    }
	});
	
}


function editarRegistro (id){

	$.ajax({    
    url : 'http://129.151.106.128/api/Reservation/'+id,
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
        alert('ha sucedido un problema:'+ status);
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
				'http://129.151.106.128/api/Reservation/update',
				{data: datosJson,
				type : 'PUT',
				dataType : 'json',
				contentType: "application/json; charset=utf-8",
			
				statusCode : {
					201 :  function() {
						alert("Reservación actualizada!");
						traerInformacion();	
						}
					}
				});
			}
		} else {
			alert("La fecha de devolución debe que ser mayor a la fecha de inicio de la reserva!");
		}
	} else {
		alert("Se deben llenar todos los campos!");
	}
}

function eliminarRegistro(id){
	$.ajax( {   
    url:'http://129.151.106.128/api/Reservation/'+id,
    type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			alert("Reservación eliminada!");
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