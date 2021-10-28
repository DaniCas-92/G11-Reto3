function traerInformacion(){
	$.ajax({    
		url : 'http://129.151.106.128/api/Score/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
		success : function(respuesta) {

			$("#resultado").empty();
			let miTabla = '<div class="container"><div  class= "row">';
			for (i=0; i<respuesta.length; i++){
				miTabla += ` <div class="card m-2" >
								<div class="card-body" >
									<h5 class ="card-title"> ${respuesta[i].stars} estrella(s)</h5> 		
								    <h6 class ="card-subtitle mb-2 text-muted"> ${respuesta[i].messageText} </h6> 	
									<p class= "card-text"> Reservación # ${respuesta[i].reservation.idReservation} </p>
									<button class="btn btn-primary" onclick="editarRegistro(${respuesta[i].idScore} )" ><i class="material-icons">&#xE254;</i>Editar</button>
								</div>
							</div>
							`;
			}			
			miTabla += '</div></div>';
			$("#resultado").append(miTabla);      
			pintarSelect();                    
            limpiarCampos();
		},
		error : function(xhr, status) {
			cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
		}
	});
}

function guardarInformacion(){
	if($('#messageText').val() !="" && $('#stars').val() !="" && $('#res').val() !="Seleccione..."){
            if($('#stars').val().length == 1 && ($('#stars').val()>= 0 && $('#stars').val()<=5)){
        
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
								cargarMensaje("alert-success","Exitoso","Calificación guardada");
								traerInformacion();	
								}
							}
						});
					}
				} else {
					cargarMensaje("alert-warning","Advertencia","Ya existe calificación para esta reserva");
				}
			},
			error : function(xhr, status) {
				cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
			}
		});
            } else {
				cargarMensaje("alert-warning","Advertencia","La calificación debe ser un valor entero entre 0 y 5");
            }
	} else {
		cargarMensaje("alert-warning","Advertencia","Se deben llenar todos los campos");
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
        cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
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
        cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
    }
});
}

function actualizarInformacion(){	
	if($('#name').val() !="" && $('#brand').val() !="" && $('#year').val() !="" && $('#description').val() !=""){
            if($('#stars').val().length == 1 && ($('#stars').val()>= 0 && $('#stars').val()<=5)){
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
				cargarMensaje("alert-success","Exitoso","Calificación actualizada");
				traerInformacion();	
				}
			}
		});
            } else {
                cargarMensaje("alert-warning","Advertencia","La calificación debe ser un valor entero entre 0 y 5");
            }
	} else {
		cargarMensaje("alert-warning","Advertencia","Se deben llenar todos los campos");
	}
}

function limpiarCampos(){
    
        $("#idScore").val("");
        $("#stars").val("");
	$("#messageText").val("");
	$("#res").val("");
	$("#res").attr("disabled", false);

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

//function eliminarRegistro(id){
//	$.ajax( {   
//    url:'http://129.151.106.128/api/Score/'+id,
//    type : 'DELETE',
//    dataType : 'json',
//    contentType: "application/json; charset=utf-8",
//  
//    statusCode : {
//		204 :  function() {
//			alert("Calificación eliminada!");
//			$("#idScore").val("");
//			$("#stars").val("");
//			$("#messageText").val("");
//			
//			$("#res").val("");
//			$("#res").attr("disabled", false);
//			
//			$("#guardar").attr('disabled', false);
//			$("#actualizar").attr('disabled', true);
//        	traerInformacion();	
//			}
//		}
//	});
//}