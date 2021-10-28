function traerInformacion(){
	$.ajax({        
		url : 'http://localhost/api/Message/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
		success : function(respuesta) {

			$("#resultado").empty();
			let miTabla = '<div class="container"><div  class= "row">';
			for (i=0; i<respuesta.length; i++){
				miTabla += ` <div class="card m-2" >
								<div class="card-body" >
									<h5 class ="card-title">  ${respuesta[i].idMessage} - ${respuesta[i].messageText}</h5> 		
								    <p class= "card-text"> ${respuesta[i].motorbike.name} - ${respuesta[i].motorbike.brand} <br> 		
														  ${respuesta[i].client.name}</p>
									<button class="btn btn-primary" onclick="editarRegistro(${respuesta[i].idMessage} )" ><i class="material-icons">&#xE254;</i>Editar</button>
								    <button  class="btn btn-danger" onclick="eliminarRegistro(${respuesta[i].idMessage} )"><i class="material-icons">&#xE872;</i>Borrar</button>
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
	if($('#messageText').val() !="" && $('#mot').val() !="Seleccione..." && $('#cli').val() !="Seleccione..."){
		let selectedCli = $("#cli").children(":selected").attr("value");
		let selectedMoto = $("#mot").children(":selected").attr("value");
		if (selectedCli.length > 0 && selectedMoto.length > 0) {
			let misDatos = {
				messageText: $("#messageText").val(),
				client : {
					idClient: selectedCli
				},
				motorbike : {
					id: selectedMoto
				}
			};
			let datosJson = JSON.stringify(misDatos); 
			$.ajax(   
			'http://localhost/api/Message/save',
			{data: datosJson,
			type : 'POST',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
		
			statusCode : {
				201 :  function() {
					cargarMensaje("alert-success","Exitoso","Mensaje guardado");
					traerInformacion();	
					}
				}
			});
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
		miSelect='<option id="" >Seleccione...</option>';
		for (i=0; i<respuesta.length; i++){
			if (respuesta[i].idClient == id){
				miSelect += '<option selected value='+ respuesta[i].idClient+ '>'+respuesta[i].name+'</option>';
			} else {
	        	miSelect += '<option value='+ respuesta[i].idClient+ '>'+respuesta[i].name+'</option>'; 
			} 		
		}
	    $("#cli").append(miSelect);    

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
		miSelect='<option id="" >Seleccione...</option>';
		for (i=0; i<respuesta.length; i++){
			if (respuesta[i].id == id){
				miSelect += '<option selected value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>';
			} else {
	        	miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>'; 
			} 	
		}
	    $("#mot").append(miSelect);    

	},
    error : function(xhr, status) {
        cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
    }
	});
	
}

$(document).ready(pintarSelectClient());
$(document).ready(pintarSelectMoto());



function editarRegistro (id){

	$.ajax({    
    url : 'http://localhost/api/Message/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {	
		$("#idMessage").val(respuesta.idMessage);
		$("#messageText").val(respuesta.messageText);

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
	if($('#messageText').val() !=""){
		let misDatos = {
			idMessage: $("#idMessage").val(),
			messageText: $("#messageText").val()
		};
		let datosJson = JSON.stringify(misDatos); 

		$.ajax(    
		'http://localhost/api/Message/update',
		{data: datosJson,
		type : 'PUT',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	
		statusCode : {
			201 :  function() {
				cargarMensaje("alert-success","Exitoso","Mensaje actualizado");
				traerInformacion();	
				}
			}
		});
	} else {
		cargarMensaje("alert-warning","Advertencia","Se deben llenar todos los campos");
	}
}

function eliminarRegistro(id){
	$.ajax( {   
    url:'http://localhost/api/Message/'+id,
    type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			cargarMensaje("alert-success","Exitoso","Mensaje eliminado");
            traerInformacion();	
			}
		}
	});
}

function limpiarCampos(){
    
	$("#idMessage").val("");
	$("#messageText").val("");

	$("#mot").val("");
	$("#cli").val("");
	$("#mot").attr("disabled", false);
	$("#cli").attr("disabled", false);

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