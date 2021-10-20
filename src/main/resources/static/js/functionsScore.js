function traerInformacion(){
	$.ajax({    
		url : 'http://129.151.106.128/api/Score/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
		success : function(respuesta) {
			console.log(respuesta);
			$("#resultado").empty();
			let miTabla = '<table>';
			miTabla += '<tr>';
			//miTabla += '<th>ID</th>';
			miTabla += '<th>Calificación</th>';
			miTabla += '<th>Mensaje</th>';
			miTabla += '<th>Acción 1</th>';
			miTabla += '<th>Acción 2</th>';
			miTabla += '<th>id Reservación</th>';
			miTabla += '</tr>';
			for (i=0; i<respuesta.length; i++){
				miTabla += '<tr>';
			//	miTabla += '<td>'+ respuesta[i].id+ '</td>';
				miTabla += '<td>'+ respuesta[i].stars+ '</td>';
				miTabla += '<td>'+ respuesta[i].messageText+ '</td>';
				miTabla += '<td><button onclick="editarRegistro('+respuesta[i].idScore+' )">Editar</button>';
				miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].idScore+' )">Eliminar</button>';
				miTabla += '<td>'+ respuesta[i].reservation.idReservation+ '</td>';
				miTabla += '</tr>';
	
			}
			miTabla += '</table>';
			$("#resultado").append(miTabla);      
			pintarSelect();
		},
		error : function(xhr, status) {
			alert('Ha sucedido un problema:'+ status + xhr.responseText);
		}
	});
}

function guardarInformacion(){
	if($('#messageText').val() !="" && $('#stars').val() !="" && $('#res').val() !="Seleccione..."){
		let selected = $("#res").children(":selected").attr("value");

		$.ajax({    
			url : 'http://129.151.106.128/api/Reservation/'+selected,
			type : 'GET',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
		  
			success : function(respuesta) {	
				if(respuesta.score == null){
					if (selected.length > 0) {
						let misDatos = {
							stars: $("#stars").val(),
							messageText: $("#messageText").val(),
							reservation : {
								idReservation: selected
							}
						};
						let datosJson = JSON.stringify(misDatos); 
						$.ajax(    
						'http://129.151.106.128/api/Score/save',
						{data: datosJson,
						type : 'POST',
						dataType : 'json',
						contentType: "application/json; charset=utf-8",
					
						statusCode : {
							201 :  function() {
								alert("Calificación guardada!");
								$("#idScore").val("");
								$("#stars").val("");
								$("#messageText").val("");
								$("#res").empty();
								traerInformacion();	
								}
							}
						});
					}
				} else {
					alert("Ya existe calificación para esta reserva!");
				}
			},
			error : function(xhr, status) {
				alert('ha sucedido un problema:'+ status);
			}
		});
	} else {
		alert("Se deben llenar todos los campos!");
	}
}

function pintarSelect(id){
	$.ajax({    
    url : 'http://129.151.106.128/api/Reservation/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#res").empty();
		miSelect='<option id="" >Seleccione...</option>';
		for (i=0; i<respuesta.length; i++){
			if (respuesta[i].idReservation == id){
				miSelect += '<option selected value='+ respuesta[i].idReservation+ '>'+respuesta[i].idReservation+'</option>';
			} else {
	        	miSelect += '<option value='+ respuesta[i].idReservation+ '>'+respuesta[i].idReservation+'</option>'; 
			}		
		}
	    $("#res").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
	
}

$(document).ready(pintarSelect());

function editarRegistro (id){

	$.ajax({    
    url : 'http://129.151.106.128/api/Score/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {	
		$("#idScore").val(respuesta.idScore);
		$("#stars").val(respuesta.stars);
		$("#messageText").val(respuesta.messageText);
		
		pintarSelect(respuesta.reservation.idReservation);
		$("#res").attr("disabled", true);

		$("#guardar").attr('disabled', true);
		$("#actualizar").attr('disabled', false);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

function actualizarInformacion(){	
	if($('#name').val() !="" && $('#brand').val() !="" && $('#year').val() !="" && $('#description').val() !=""){
		let misDatos = {
			idScore: $("#idScore").val(),
			stars: $("#stars").val(),
			messageText: $("#messageText").val()
		};
		let datosJson = JSON.stringify(misDatos); 

		$.ajax(    
		'http://129.151.106.128/api/Score/update',
		{data: datosJson,
		type : 'PUT',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	
		statusCode : {
			201 :  function() {
				alert("Calificación actualizada!");
				$("#idScore").val("");
				$("#stars").val("");
				$("#messageText").val("");
				$("#res").val("");
				$("#res").attr("disabled", false);

				$("#guardar").attr('disabled', false);
				$("#actualizar").attr('disabled', true);
				traerInformacion();	
				}
			}
		});
	} else {
		alert("Se deben llenar todos los campos!");
	}
}

function eliminarRegistro(id){
	$.ajax( {   
    url:'http://129.151.106.128/api/Score/'+id,
    type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			alert("Calificación eliminada!");
			$("#idScore").val("");
			$("#stars").val("");
			$("#messageText").val("");
			
			$("#res").val("");
			$("#res").attr("disabled", false);
			
			$("#guardar").attr('disabled', false);
			$("#actualizar").attr('disabled', true);
        	traerInformacion();	
			}
		}
	});
}	