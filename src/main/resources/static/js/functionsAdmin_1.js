function traerInformacion(){
	$.ajax({     
		url : 'http://localhost/api/Admin/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
		success : function(respuesta) {
			console.log(respuesta);
			$("#resultado").empty();
			let miTabla = '<table>';
			miTabla += '<tr>';
			miTabla += '<th>ID</th>';
			miTabla += '<th>Nombre</th>';
			miTabla += '<th>Correo</th>';
			//miTabla += '<th>Contraseña</th>';
			miTabla += '<th>Acción 1</th>';
			miTabla += '<th>Acción 2</th>';
			miTabla += '</tr>';
			for (i=0; i<respuesta.length; i++){
				miTabla += '<tr>';
				miTabla += '<td>'+ respuesta[i].idAdmin+ '</td>'; 		
				miTabla += '<td>'+ respuesta[i].name+ '</td>'; 		
				miTabla += '<td>'+ respuesta[i].email+ '</td>'; 	
				//miTabla += '<td>'+ respuesta[i].password+ '</td>'; 	
				miTabla += '<td><button onclick="editarRegistro('+respuesta[i].idAdmin+' )">Editar</button>';	
				miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].idAdmin+' )">Eliminar</button>';			
				miTabla += '</tr>';
	
			}
			miTabla += '</table>';
			$("#resultado").append(miTabla);    
		},
		error : function(xhr, status) {
			alert('Ha sucedido un problema:'+ status + json);
		}
	});
}

function guardarInformacion(){
	if($('#name').val() !="" && $('#email').val() !="" && $('#password').val() !=""){
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
				alert("Admin guardado!");
				$("#idAdmin").val("");
				$("#name").val("");
				$("#email").val("");
				$("#password").val("");
				traerInformacion();	
				}
			}
		});
	
	} else {
		alert("Se deben llenar todos los campos!");
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
        alert('ha sucedido un problema:'+ status);
    }
});
}

function actualizarInformacion(){
	if($('#name').val() !="" && $('#password').val() !=""){
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
				alert("Admin actualizado!");
				$("#idAdmin").val("");
				$("#name").val("");
				$("#password").val("");
				$("#email").val("");
				$("#email").attr("disabled", false);

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
    url:'http://localhost/api/Admin/'+id,
    type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			alert("Admin eliminado!");
			$("#idAdmin").val("");
			$("#name").val("");
			$("#password").val("");
			$("#email").val("");
			$("#email").attr("disabled", false);
			
			$("#guardar").attr('disabled', false);
			$("#actualizar").attr('disabled', true);
        	traerInformacion();	
			}
		}
	});
}	