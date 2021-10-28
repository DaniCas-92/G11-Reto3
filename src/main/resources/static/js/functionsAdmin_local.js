function traerInformacion(){
	$.ajax({     
		url : 'http://localhost/api/Admin/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
		success : function(respuesta) {
			$("#resultado").empty();
			let miTabla = '<div class="container"><div  class= "row">';
			for (i=0; i<respuesta.length; i++){
				miTabla += ` <div class="card m-2" >
								<div class="card-body" >
									<h5 class ="card-title">  ${respuesta[i].idAdmin} - ${respuesta[i].name}</h5> 		
								    <h6 class ="card-subtitle mb-2 text-muted">  ${respuesta[i].email}</h6> 
									<button class="btn btn-primary" onclick="editarRegistro(${respuesta[i].idAdmin} )" ><i class="material-icons">&#xE254;</i>Editar</button>
								    <button  class="btn btn-danger" onclick="eliminarRegistro(${respuesta[i].idAdmin} )"><i class="material-icons">&#xE872;</i>Borrar</button>
								</div>
							</div>
							`;
			}			
			miTabla += '</div></div>';
			$("#resultado").append(miTabla); 
        	limpiarCampos();
		},
		error : function(xhr, status) {
			cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
		}
	});
}

function guardarInformacion(){
	if($('#name').val() !="" && $('#email').val() !="" && $('#password').val() !=""){
		var patternInput = new RegExp( $('#email').attr('pattern') );
		if($('#email').val().match(patternInput)){
			let misDatos = {
				name: $("#name").val(),
				email: $("#email").val(),
				password: $("#password").val()
			};
			let datosJson = JSON.stringify(misDatos); 
			$.ajax(    
			'http://localhost/api/Admin/save',
			{data: datosJson,
			type : 'POST',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
		
			statusCode : {
				201 :  function() {
					cargarMensaje("alert-success","Exitoso","Admin guardado");
					traerInformacion();	
					}
				}
			});
		} else {
			cargarMensaje("alert-warning","Advertencia","El correo no tiene el formato requerido");
		}
	
	} else {
		cargarMensaje("alert-warning","Advertencia","Se deben llenar todos los campos");
	}
}



function editarRegistro (id){

    $.ajax({    
    url : 'http://localhost/api/Admin/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {	
		$("#idAdmin").val(respuesta.idAdmin);
        $("#name").val(respuesta.name);
        $("#password").val(respuesta.password);
        $("#email").val(respuesta.email);
        $("#email").attr('disabled', true);

		$("#guardar").attr('disabled', true);
		$("#actualizar").attr('disabled', false);
	},
    error : function(xhr, status) {
        cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
    }
});
}

function actualizarInformacion(){
	if($('#name').val() !="" && $('#password').val() !=""){
		var patternInput = new RegExp( $('#email').attr('pattern') );
		if($('#email').val().match(patternInput)){
			let misDatos = {
				idAdmin: $("#idAdmin").val(),
				name: $("#name").val(),
				password: $("#password").val()
			};
			let datosJson = JSON.stringify(misDatos); 

			$.ajax(    
			'http://localhost/api/Admin/update',
			{data: datosJson,
			type : 'PUT',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
		
			statusCode : {
				201 :  function() {
					cargarMensaje("alert-success","Exitoso","Admin actualizado");
					traerInformacion();	
					}
				}
			});
		} else {
			cargarMensaje("alert-warning","Advertencia","El correo no tiene el formato requerido");
		}
	} else {
		cargarMensaje("alert-warning","Advertencia","Se deben llenar todos los campos");
	}
}

function eliminarRegistro(id){
	$.ajax( {   
    url:'http://localhost/api/Admin/'+id,
    type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			cargarMensaje("alert-success","Exitoso","Admin eliminado");
        	traerInformacion();	
			}
		}
		//,
		//error : function(xhr, status) {
		//	cargarMensaje("alert-danger","Error","ha sucedido un problema" + status + ", " + xhr.responseText);
		//}
	});
}	

function limpiarCampos(){
    
	$("#idAdmin").val("");
	$("#name").val("");
	$("#password").val("");
	$("#email").val("");
	$("#email").attr("disabled", false);
			
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