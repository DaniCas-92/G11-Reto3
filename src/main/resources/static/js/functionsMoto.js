function traerInformacion(){
	$.ajax({    
		url : 'http://129.151.106.128/api/Motorbike/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
		success : function(respuesta) {
			console.log(respuesta);
			$("#resultado").empty();
			let miTabla = '<table>';
			miTabla += '<tr>';
			//miTabla += '<th>ID</th>';
			miTabla += '<th>Nombre Moto</th>';
			miTabla += '<th>Marca Moto</th>';
			miTabla += '<th>Año Moto</th>';
			miTabla += '<th>Descripción Moto</th>';
			miTabla += '<th>Nombre Categoria</th>';
			miTabla += '<th>Descripción Categoria</th>';
			miTabla += '<th>Acción 1</th>';
			miTabla += '<th>Acción 2</th>';
			miTabla += '</tr>';
			for (i=0; i<respuesta.length; i++){
				miTabla += '<tr>';
			//	miTabla += '<td>'+ respuesta[i].id+ '</td>';
				miTabla += '<td>'+ respuesta[i].name+ '</td>';
				miTabla += '<td>'+ respuesta[i].brand+ '</td>';
				miTabla += '<td>'+ respuesta[i].year+ '</td>';	
				miTabla += '<td>'+ respuesta[i].description+ '</td>';
				miTabla += '<td>'+ respuesta[i].category.name+ '</td>';
				miTabla += '<td>'+ respuesta[i].category.description+ '</td>';
				miTabla += '<td><button onclick="editarRegistro('+respuesta[i].id+' )">Editar</button>';
				miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].id+' )">Eliminar</button>';
				miTabla += '</tr>';
	
			}
			miTabla += '</table>';
			$("#resultado").append(miTabla);      
			pintarSelect();
		},
		error : function(xhr, status) {
			alert('Ha sucedido un problema:'+ status + xhr.responseText);
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
			'http://129.151.106.128/api/Motorbike/save',
			{data: datosJson,
			type : 'POST',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
		
			statusCode : {
				201 :  function() {
					alert("Motocicleta guardada!");
					$("#id").val("");
					$("#name").val("");
					$("#brand").val("");
					$("#year").val("");
					$("#description").val("");
					$("#cat").empty();
					traerInformacion();	
					}
				}
			});
		}
            } else {
                    alert("El valor del año debe estar entre 1980 y 2022");
            }
	} else {
		alert("Se deben llenar todos los campos!");
	}
}

function pintarSelect(id){
	$.ajax({    
    url : 'http://129.151.106.128/api/Category/all',
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
        alert('ha sucedido un problema:'+ status);
    }
});
	
}

$(document).ready(pintarSelect());

function editarRegistro (id){

	$.ajax({    
    url : 'http://129.151.106.128/api/Motorbike/'+id,
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
        alert('ha sucedido un problema:'+ status);
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
		'http://129.151.106.128/api/Motorbike/update',
		{data: datosJson,
		type : 'PUT',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	
		statusCode : {
			201 :  function() {
				alert("Motocicleta actualizada!");
				$("#id").val("");
				$("#name").val("");
				$("#brand").val("");
				$("#year").val("");
				$("#description").val("");
				$("#cat").val("");
				$("#cat").attr("disabled", false);

				$("#guardar").attr('disabled', false);
				$("#actualizar").attr('disabled', true);
				traerInformacion();	
				}
			}
		});
            } else {
                    alert("El valor del año debe estar entre 1980 y 2022");
            }
	} else {
		alert("Se deben llenar todos los campos!");
	}
}

function eliminarRegistro(id){

	$.ajax({    
		url : 'http://129.151.106.128/api/Motorbike/'+id,
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		success : function(respuesta) {	
			if(respuesta.category == null || respuesta.messages == "" || respuesta.reservations == ""){
				$.ajax( {   
					url:'http://129.151.106.128/api/Motorbike/'+id,
					type : 'DELETE',
					dataType : 'json',
					contentType: "application/json; charset=utf-8",
				  
					statusCode : {
						204 :  function() {
							alert("Motocicleta eliminada!");
							$("#id").val("");
							$("#name").val("");
							$("#brand").val("");
							$("#year").val("");
							$("#description").val("");
							
							$("#guardar").attr('disabled', false);
							$("#actualizar").attr('disabled', true);
							traerInformacion();	
							}
						}
					});
			} else {
				alert("No se puede eliminar esta moto, ya que posee relación con otras tablas!");
			}
		},
		error : function(xhr, status) {
			alert('ha sucedido un problema:'+ status);
		}
	});


}	