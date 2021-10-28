function traerInformacion(){
	$.ajax({    
		url : 'http://129.151.106.128/api/Category/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
		success : function(respuesta) {
			
			$("#resultado").empty();
			let miTabla = '<div class="container"><div  class= "row">';
			for (i=0; i<respuesta.length; i++){
				miTabla += ` <div class="card m-2" >
								<div class="card-body" >
									<h5 class ="card-title">  ${respuesta[i].id} - ${respuesta[i].name}</h5> 		
								    <h6 class ="card-subtitle mb-2 text-muted">  ${respuesta[i].description} </h6> 		
								    
									<p class= "card-text"> `;
				for (j=0; j<respuesta[i].motorbikes.length; j++){
					let conteo = j+1;
					miTabla += conteo +`. ${respuesta[i].motorbikes[j].name} - 		
									${respuesta[i].motorbikes[j].brand}	<br>`;
				}
					miTabla +=	`</p><button class="btn btn-primary" onclick="editarRegistro(${respuesta[i].id} )" ><i class="material-icons">&#xE254;</i>Editar</button>
								<button  class="btn btn-danger" onclick="eliminarRegistro(${respuesta[i].id} )"><i class="material-icons">&#xE872;</i>Borrar</button>
				   				</div>
							</div>
							`;
				//}	
			}
			miTabla += '</div></div>';
			$("#resultado").append(miTabla); 
        	limpiarCampos();
		},
		error : function(xhr, status) {
			cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
			//alert('Ha sucedido un problema:'+ status + xhr.responseText);
		}
	});
}

function guardarInformacion(){

	if($('#name').val() !="" && $('#description').val() !=""){
		let misDatos = {
			name: $("#name").val(),
			description: $("#description").val()
		};
		let datosJson = JSON.stringify(misDatos); 
		$.ajax(    
		'http://129.151.106.128/api/Category/save',
		{data: datosJson,
		type : 'POST',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		
		statusCode : {
			201 :  function() {
				
				cargarMensaje("alert-success","Exitoso","Categoria guardada");
				traerInformacion();	
				}
			}
		});
	} else {
		cargarMensaje("alert-warning","Advertencia","Se deben llenar todos los campos");
		//alert("Se deben llenar todos los campos!");
	}
}

function editarRegistro (id){

	$.ajax({    
    url : 'http://129.151.106.128/api/Category/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		$("#id").val(respuesta.id);
		$("#name").val(respuesta.name);
		$("#description").val(respuesta.description);

		$("#guardar").attr('disabled', true);
		$("#actualizar").attr('disabled', false);
	},
    error : function(xhr, status) {
			
		cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
		//alert('ha sucedido un problema:'+ status);
    }
});
}

function actualizarInformacion(){
	
	if($('#name').val() !="" && $('#description').val() !=""){
		let misDatos = {
			id: $("#id").val(),
			name: $("#name").val(),
			description: $("#description").val()
		};
		let datosJson = JSON.stringify(misDatos); 

		$.ajax(    
		'http://129.151.106.128/api/Category/update',
		{data: datosJson,
		type : 'PUT',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	
		statusCode : {
			201 :  function() {

				cargarMensaje("alert-success","Exitoso","Categoria actualizada");
				//alert("Categoria actualizada!");
				traerInformacion();	
				}
			}
		});
	} else {
		cargarMensaje("alert-warning","Advertencia","Se deben llenar todos los campos");
		//alert("Se deben llenar todos los campos!");
	}
}

function eliminarRegistro(id){

	$.ajax({    
		url : 'http://129.151.106.128/api/Category/'+id,
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		success : function(respuesta) {	
			if(respuesta.motorbikes == ""){
				$.ajax( {   
					url:'http://129.151.106.128/api/Category/'+id,
					type : 'DELETE',
					dataType : 'json',
					contentType: "application/json; charset=utf-8",
				  
					statusCode : {
						204 :  function() {
							cargarMensaje("alert-success","Exitoso","Categoria eliminada");
							//alert("Categoria eliminada!");
							traerInformacion();	
							}
						}
					});
			} else {

				cargarMensaje("alert-warning","Advertencia","No se puede eliminar esta categoria, ya que posee relación con moto(s)");
				//alert("No se puede eliminar esta categoria, ya que posee relación con moto(s)!");
			}
		},
		error : function(xhr, status) {
			
			cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
			//alert('ha sucedido un problema:'+ status);
		}
	});

}

function limpiarCampos(){
    
	$("#id").val("");
    $("#name").val("");
	$("#description").val("");
							
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