function traerInformacion(){
	$.ajax({     
		url : 'http://localhost/api/Client/all',
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
			miTabla += '<th>Edad</th>';
			miTabla += '<th>Acción 1</th>';
			miTabla += '<th>Acción 2</th>';
			miTabla += '</tr>';
			for (i=0; i<respuesta.length; i++){
				miTabla += '<tr>';
				miTabla += '<td>'+ respuesta[i].idClient+ '</td>'; 		
				miTabla += '<td>'+ respuesta[i].name+ '</td>'; 		
				miTabla += '<td>'+ respuesta[i].email+ '</td>'; 		
				miTabla += '<td>'+ respuesta[i].age+ '</td>'; 			
				miTabla += '<td><button onclick="editarRegistro('+respuesta[i].idClient+' )">Editar</button>';	
				miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].idClient+' )">Eliminar</button>';			
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
	if($('#name').val() !="" && $('#email').val() !="" && $('#age').val() !="" && $('#password').val() !=""){
            if($('#age').val() >= 15 && $('#age').val() <= 130){
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
				alert("Cliente guardado!");
				$("#idClient").val("");
				$("#name").val("");
				$("#email").val("");
				$("#age").val("");
				$("#password").val("");
				traerInformacion();	
				}
			}
		});
            } else {
                    alert("La edad debe ser entre 15 y 130 años");
            }
	} else {
		alert("Se deben llenar todos los campos!");
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
        alert('ha sucedido un problema:'+ status);
    }
});
}

function actualizarInformacion(){
	if($('#name').val() !="" && $('#age').val() !="" && $('#password').val() !=""){
            if($('#age').val() >= 15 && $('#age').val() <= 130){
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
				alert("Cliente actualizado!");
				$("#id").val("");
				$("#name").val("");
				$("#age").val("");
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
                    alert("La edad debe ser entre 15 y 130 años");
            }
	} else {
		alert("Se deben llenar todos los campos!");
	}
}

function eliminarRegistro(id){
	$.ajax( {   
    url:'http://localhost/api/Client/'+id,
    type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			alert("Cliente eliminado!");
			$("#id").val("");
			$("#name").val("");
			$("#age").val("");
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