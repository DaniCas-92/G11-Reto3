function traerInformacion(){
	$.ajax({     
		url : 'http://localhost/api/Client/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
		success : function(respuesta) {

			$("#resultado").empty();
			let miTabla = '<div class="container"><div  class= "row">';
			for (i=0; i<respuesta.length; i++){
				miTabla += ` <div class="card m-2" >
								<div class="card-body" >
									<h5 class ="card-title">  ${respuesta[i].idClient} - ${respuesta[i].name}</h5> 		
								    <h6 class ="card-subtitle mb-2 text-muted">  ${respuesta[i].email}</h6> 
									<p class= "card-text"> ${respuesta[i].age} años</p>
									<button class="btn btn-primary" onclick="editarRegistro(${respuesta[i].idClient} )" ><i class="material-icons">&#xE254;</i>Editar</button>
								    <button  class="btn btn-danger" onclick="eliminarRegistro(${respuesta[i].idClient} )"><i class="material-icons">&#xE872;</i>Borrar</button>
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
	if($('#name').val() !="" && $('#email').val() !="" && $('#age').val() !="" && $('#password').val() !=""){
            if($('#age').val() >= 15 && $('#age').val() <= 130){
				var patternInput = new RegExp( $('#email').attr('pattern') );
				if($('#email').val().match(patternInput)){
					let misDatos = {
						name: $("#name").val(),
						email: $("#email").val(),
						age: $("#age").val(),
						password: $("#password").val()
					};
					let datosJson = JSON.stringify(misDatos); 
					$.ajax(    
					'http://localhost/api/Client/save',
					{data: datosJson,
					type : 'POST',
					dataType : 'json',
					contentType: "application/json; charset=utf-8",
				
					statusCode : {
						201 :  function() {
							cargarMensaje("alert-success","Exitoso","Cliente guardado");
							traerInformacion();	
							}
						}
					});
				} else {
					cargarMensaje("alert-warning","Advertencia","El correo no tiene el formato requerido");
				}
            } else {
				cargarMensaje("alert-warning","Advertencia","La edad debe ser entre 15 y 130 años");
            }
	} else {
		cargarMensaje("alert-warning","Advertencia","Se deben llenar todos los campos");
	}
}

function editarRegistro (id){

	$.ajax({    
    url : 'http://localhost/api/Client/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {	
		$("#idClient").val(respuesta.idClient);
        $("#name").val(respuesta.name);
        $("#age").val(respuesta.age);
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
	if($('#name').val() !="" && $('#age').val() !="" && $('#password').val() !=""){
            if($('#age').val() >= 15 && $('#age').val() <= 130){
				var patternInput = new RegExp( $('#email').attr('pattern') );
				if($('#email').val().match(patternInput)){
					let misDatos = {
						idClient: $("#idClient").val(),
						name: $("#name").val(),
						age: $("#age").val(),
						password: $("#password").val()
					};
					let datosJson = JSON.stringify(misDatos); 

					$.ajax(    
					'http://localhost/api/Client/update',
					{data: datosJson,
					type : 'PUT',
					dataType : 'json',
					contentType: "application/json; charset=utf-8",
				
					statusCode : {
						201 :  function() {
							cargarMensaje("alert-success","Exitoso","Cliente actualizado");
							traerInformacion();	
							}
						}
					});
				} else {
					cargarMensaje("alert-warning","Advertencia","El correo no tiene el formato requerido");
				}
            } else {
				cargarMensaje("alert-warning","Advertencia","La edad debe ser entre 15 y 130 años");
            }
	} else {
		cargarMensaje("alert-warning","Advertencia","Se deben llenar todos los campos");
	}
}

function eliminarRegistro(id){
      
    $.ajax({    
		url : 'http://localhost/api/Client/'+id,
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		success : function(respuesta) {	
			if(respuesta.messages == "" && respuesta.reservations == ""){
				$.ajax( {   
					url:'http://localhost/api/Client/'+id,
					type : 'DELETE',
					dataType : 'json',
					contentType: "application/json; charset=utf-8",
				  
					statusCode : {
						204 :  function() {
							cargarMensaje("alert-success","Exitoso","Cliente eliminado");
							traerInformacion();	
							}
						}
					});
			} else {
				cargarMensaje("alert-warning","Advertencia","No se puede eliminar esta cliente, ya que posee relación con otras tablas");
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
	$("#age").val("");
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