function traerInformacion(){
	$.ajax({    
		url : 'http://129.151.106.128/api/Category/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
		success : function(respuesta) {
			console.log(respuesta);
			$("#resultado").empty();
			let miTabla = '<table>';
			miTabla += '<tr>';
			//miTabla += '<th>ID</th>';
			miTabla += '<th>Nombre Categoria</th>';
			miTabla += '<th>Descripción Categoria</th>';
			miTabla += '<th>Acción 1</th>';
			miTabla += '<th>Acción 2</th>';
			miTabla += '<th>Nombre Moto</th>';
			miTabla += '<th>Marca Moto</th>';
			miTabla += '<th>Descripción Moto</th>';
			miTabla += '</tr>';
			for (i=0; i<respuesta.length; i++){
				miTabla += '<tr>';
				//miTabla += '<td>'+ respuesta[i].id+ '</td>';
				miTabla += '<td>'+ respuesta[i].name+ '</td>';
				miTabla += '<td>'+ respuesta[i].description+ '</td>';
				miTabla += '<td><button onclick="editarRegistro('+respuesta[i].id+' )">Editar</button>';
				miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].id+' )">Eliminar</button>';				
				for (j=0; j<respuesta[i].motorbikes.length; j++){
					if(j>=1){
						miTabla += '</tr>';
						miTabla += '<td>'+ respuesta[i].name+ '</td>';
						miTabla += '<td>'+ respuesta[i].description+ '</td>';
					}
					miTabla += '<td>'+ respuesta[i].motorbikes[j].name+ '</td>';
					miTabla += '<td>'+ respuesta[i].motorbikes[j].brand+ '</td>';
					miTabla += '<td>'+ respuesta[i].motorbikes[j].description+ '</td>';
				}
				miTabla += '</tr>';
	
			}
			miTabla += '</table>';
			$("#resultado").append(miTabla); 
		},
		error : function(xhr, status) {
			alert('Ha sucedido un problema:'+ status + xhr.responseText);
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
				alert("Categoria guardada!");
				/*alertify.confirm("Categoria guardada",
					function() {
						alertify.success('Ok');
					}
				);*/
				//$("#id").val("");
				$("#name").val("");
				$("#description").val("");
				traerInformacion();	
				}
			}
		});
	} else {
		alert("Se deben llenar todos los campos!");
		/*alertify.alert("Se deben llenar todos los campos!",
			function() {
			}
		);*/
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
        alert('ha sucedido un problema:'+ status);
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
				alert("Categoria actualizada!");
				$("#id").val("");
				$("#name").val("");
				$("#description").val("");

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
							alert("Categoria eliminada!");
							$("#id").val("");
							$("#name").val("");
							$("#description").val("");
							
							$("#guardar").attr('disabled', false);
							$("#actualizar").attr('disabled', true);
							traerInformacion();	
							}
						}
					});
			} else {
				alert("No se puede eliminar esta categoria, ya que posee relación con moto(s)!");
			}
		},
		error : function(xhr, status) {
			alert('ha sucedido un problema:'+ status);
		}
	});

}