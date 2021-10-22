function traerInformacion(){
	$.ajax({        
		url : 'http://localhost/api/Message/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
		success : function(respuesta) {
			console.log(respuesta);
			$("#resultado").empty();
			let miTabla = '<table>';
			miTabla += '<tr>';
			//miTabla += '<th>ID</th>';
			miTabla += '<th>Mensaje de Texto</th>';
			miTabla += '<th>Nombre Moto</th>';
			miTabla += '<th>Descripción Moto</th>';
			miTabla += '<th>Nombre Cliente</th>';
			miTabla += '<th>Correo Cliente</th>';
			miTabla += '<th>Acción 1</th>';
			miTabla += '<th>Acción 2</th>';
			miTabla += '</tr>';
			for (i=0; i<respuesta.length; i++){
				miTabla += '<tr>';
				//miTabla += '<td>'+ respuesta[i].idMessage+ '</td>'; 		
				miTabla += '<td>'+ respuesta[i].messageText+ '</td>'; 		
				miTabla += '<td>'+ respuesta[i].motorbike.name+ '</td>';		
				miTabla += '<td>'+ respuesta[i].motorbike.brand+ '</td>';		
				miTabla += '<td>'+ respuesta[i].client.name+ '</td>';			
				miTabla += '<td>'+ respuesta[i].client.email+ '</td>';				
				miTabla += '<td><button onclick="editarRegistro('+respuesta[i].idMessage+' )">Editar</button>';		
				miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].idMessage+' )">Eliminar</button>';			
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
					alert("Mensaje guardado!");
					traerInformacion();	
					}
				}
			});
		}
	} else {
		alert("Se deben llenar todos los campos!");
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
        alert('ha sucedido un problema:'+ status);
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
        alert('ha sucedido un problema:'+ status);
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
        alert('ha sucedido un problema:'+ status);
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
				alert("Mensaje actualizado!");
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
    url:'http://localhost/api/Message/'+id,
    type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			alert("Mensaje eliminado!");
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