function traerInformacion(){
	$.ajax({    
		url : 'http://localhost/api/Motorbike/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
		success : function(respuesta) {

			$("#resultado").empty();
			let miTabla = '<div class="container"><div  class= "row">';
			for (i=0; i<respuesta.length; i++){
				miTabla += ` <div class="card m-2" >
								<div class="card-body" >
									<h5 class ="card-title">  ${respuesta[i].id} - ${respuesta[i].brand}</h5> 		
								    <h6 class ="card-subtitle mb-2 text-muted">  ${respuesta[i].name}</h6> 		
								    <h6 class ="card-subtitle mb-2 text-muted">  ${respuesta[i].description} </h6>
									<p class= "card-text"> ${respuesta[i].year} <br> 		
														  ${respuesta[i].category.name}</p>
									<button class="btn btn-primary" onclick="editarRegistro(${respuesta[i].id} )" ><i class="material-icons">&#xE254;</i>Editar</button>
								    <button  class="btn btn-danger" onclick="eliminarRegistro(${respuesta[i].id} )"><i class="material-icons">&#xE872;</i>Borrar</button>
								</div>
							</div>
							`;
			}			
			miTabla += '</div></div>';
			$("#resultado").append(miTabla);      
			pintarSelect(0);
        	limpiarCampos();
		},
		error : function(xhr, status) {
			cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
		}
	});
}

function guardarInformacion(){
	if($('#name').val() !="" && $('#brand').val() !="" && $('#year').val() !="" && $('#description').val() !="" && $('#cat').val() !="Seleccione..."){
            if($('#year').val() >= 1980 && $('#year').val() <= 2022){
                let selected = $("#cat").children(":selected").attr("value");
		if (selected.length > 0) {
			let misDatos = {
				name: $("#name").val(),
				brand: $("#brand").val(),
				year: $("#year").val(),
				description: $("#description").val(),
				category : {
					id: selected
				}
			};
			let datosJson = JSON.stringify(misDatos); 
			$.ajax(    
			'http://localhost/api/Motorbike/save',
			{data: datosJson,
			type : 'POST',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
		
			statusCode : {
				201 :  function() {
					cargarMensaje("alert-success","Exitoso","Motocicleta guardada");
					traerInformacion();	
					}
				}
			});
		}
            } else {
					cargarMensaje("alert-warning","Advertencia","El valor del año debe estar entre 1980 y 2022");
            }
	} else {
		cargarMensaje("alert-warning","Advertencia","Se deben llenar todos los campos");
	}
}

function pintarSelect(id){
	$.ajax({    
    url : 'http://localhost/api/Category/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#cat").empty();
		miSelect='<option id="" >Seleccione...</option>';
		for (i=0; i<respuesta.length; i++){
			if (respuesta[i].id == id){
				miSelect += '<option selected value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>';
			} else {
	        	miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>'; 
			}		
		}
	    $("#cat").append(miSelect);    

	},
    error : function(xhr, status) {
        cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
    }
});
	
}

$(document).ready(pintarSelect());

function editarRegistro (id){

	$.ajax({    
    url : 'http://localhost/api/Motorbike/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {	
		$("#id").val(respuesta.id);
		$("#name").val(respuesta.name);
		$("#brand").val(respuesta.brand);
		$("#year").val(respuesta.year);
		$("#description").val(respuesta.description);
		
		pintarSelect(respuesta.category.id);
		$("#cat").attr("disabled", true);

		$("#guardar").attr('disabled', true);
		$("#actualizar").attr('disabled', false);
	},
    error : function(xhr, status) {
        cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
    }
});
}

function actualizarInformacion(){
	if($('#name').val() !="" && $('#brand').val() !="" && $('#year').val() !="" && $('#description').val() !="" && $('#cat').val() !="Seleccione..."){
            if($('#year').val() >= 1980 && $('#year').val() <= 2022){
                let misDatos = {
			id: $("#id").val(),
			name: $("#name").val(),
			brand: $("#brand").val(),
			year: $("#year").val(),
			description: $("#description").val()
		};
		let datosJson = JSON.stringify(misDatos); 

		$.ajax(    
		'http://localhost/api/Motorbike/update',
		{data: datosJson,
		type : 'PUT',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	
		statusCode : {
			201 :  function() {
				cargarMensaje("alert-success","Exitoso","Motocicleta actualizada");
				traerInformacion();	
				}
			}
		});
            } else {
				cargarMensaje("alert-warning","Advertencia","El valor del año debe estar entre 1980 y 2022");
            }
	} else {
		cargarMensaje("alert-warning","Advertencia","Se deben llenar todos los campos");
	}
}

function eliminarRegistro(id){

	$.ajax({    
		url : 'http://localhost/api/Motorbike/'+id,
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		success : function(respuesta) {	
			if(respuesta.messages == "" && respuesta.reservations == ""){
				$.ajax( {   
					url:'http://localhost/api/Motorbike/'+id,
					type : 'DELETE',
					dataType : 'json',
					contentType: "application/json; charset=utf-8",
				  
					statusCode : {
						204 :  function() {
							cargarMensaje("alert-success","Exitoso","Motocicleta eliminada");
							traerInformacion();	
							}
						}
					});
			} else {
				cargarMensaje("alert-warning","Advertencia","No se puede eliminar esta moto, ya que posee relación con otras tablas");
			}
		},
		error : function(xhr, status) {
			cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
		}
	});


}

function limpiarCampos(){
    
	$("#id").val("");
	$("#name").val("");
	$("#brand").val("");
	$("#year").val("");
	$("#description").val("");
	$("#cat").val("");
	$("#cat").attr("disabled", false);

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