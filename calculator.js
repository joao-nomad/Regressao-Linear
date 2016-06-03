//////////////////ListBox Change
$("#selectObs").change(function(){
	$("#valueTable").hide();
	var html = "";
	var xInput = "<p>Valores de X:</p>";
	var yInput = "<p>Valores de Y:</p>";

	var obs = $(this).val();

	for (i = 0; i < obs; i++){
		xInput = xInput + "<input type='text' class='xInput'>";
		yInput = yInput + "<input type='text' class='yInput'>";
	};

	html = html + xInput + yInput;
	html = html + "<br><br><button id='generateTableBtn'>Gerar Tabela de Valores</button>";

	$("#inputValues").html(html);

	//////////////////Generate Table Button
	$("#generateTableBtn").click(function() {
		$("#valueTable").show();

		//Indice
		var xtd = "<td class='tableHead'>X</td>";
		var xSquareTd = "<td class='tableHead'>X²</td>";
		var ytd = "<td class='tableHead'>Y</td>";
		var ySquareTd = "<td class='tableHead'>Y²</td>";
		var xytd = "<td class='tableHead'>XY</td>";

		//Number of Inputs
		var inputs = ($('#inputValues input').size() / 2);

		//Creating the table
		for (j = 0; j < inputs; j++){
			var xValue = parseInt($(".xInput:eq("+ j +")").val());
			var yValue = parseInt($(".yInput:eq("+ j +")").val());

			xtd = xtd + "<td class='xItem'>" + xValue + "</td>";
			ytd = ytd + "<td class='yItem'>" + yValue + "</td>";

			xSquareTd = xSquareTd + "<td class='xSquareItem'>" + xValue * xValue + "</td>";
			ySquareTd = ySquareTd + "<td class='ySquareItem'>" + yValue * yValue + "</td>";

			xytd = xytd + "<td class='xyItem'>" + (xValue * yValue) + "</td>";
		}

		//Inserting the table
		$(".xValue").html(xtd);
		$(".xSquareValue").html(xSquareTd);
		$(".yValue").html(ytd);
		$(".ySquareValue").html(ySquareTd);
		$(".xyValue").html(xytd);

	
		//Fazendo o cálculo dos elementos da Tabela
		var xSoma = 0;
		var xQuadradoSoma = 0;
		var yQuadradoSoma = 0;
		var ySoma = 0;
		var xySoma = 0;
		
		//For do somatório
		for(k = 0; k < inputs; k ++){
			var x = parseInt($('.xItem:eq('+ k +')').text());
			var y = parseInt($('.yItem:eq('+ k +')').text());
			var xSquare = parseInt($('.xSquareItem:eq('+ k +')').text());
			var ySquare = parseInt($('.ySquareItem:eq('+ k +')').text());
			var xy = parseInt($('.xyItem:eq('+ k +')').text());

			xSoma = xSoma + x;
			ySoma = ySoma + y;
			xQuadradoSoma = xQuadradoSoma + xSquare;
			yQuadradoSoma = yQuadradoSoma + ySquare;
			xySoma = xySoma + xy;
		};

		xtd = xtd + "<td class='tableSumResult' id='sumX'>&Sigma;X = " + xSoma + "</td>";
		ytd = ytd + "<td class='tableSumResult' id='sumY'>&Sigma;Y = " + ySoma + "</td>";
		xSquareTd = xSquareTd + "<td class='tableSumResult' id='sumXsquare'>&Sigma;X² = " + xQuadradoSoma + "</td>";
		ySquareTd = ySquareTd + "<td class='tableSumResult' id='sumYsquare'>&Sigma;Y² = " + yQuadradoSoma + "</td>";
		xytd = xytd + "<td class='tableSumResult' id='sumXY'>&Sigma;XY = " + xySoma + "</td>";

		//Inserting the table
		$(".xValue").html(xtd);
		$(".xSquareValue").html(xSquareTd);
		$(".yValue").html(ytd);
		$(".ySquareValue").html(ySquareTd);
		$(".xyValue").html(xytd);


		////////////Calculando valores
		$("#calculatorBtn").click(function() {
			
			//Double Parsed
			var X = parseInt($("#sumX").text().slice(5));
			var Y = parseInt($("#sumY").text().slice(5));
			var XSquare = parseInt($("#sumXsquare").text().slice(5));
			var YSquare = parseInt($("#sumYsquare").text().slice(5));
			var XY = parseInt($("#sumXY").text().slice(6));
			var N = parseInt($("#selectObs").val());

			//A String
			var aString = "A = " + $("#selectObs").val() +" * " + $("#sumXY").text().slice(6) + " - " + $("#sumX").text().slice(5) + " * " + $("#sumY").text().slice(5) + " / " + $("#selectObs").val() + " * " + $("#sumXsquare").text().slice(5) + " - (" + $("#sumX").text().slice(5) + ")²";
			$('#aWrote').html(aString);
			var aValue = ((N * XY) - (X * Y)) / ((N * XSquare) - (X * X));
			$('#aResult').html("A = " + aValue);

			//B String
			var bString = "B = " + $("#sumY").text().slice(5) + " - " + aValue + " * " + $("#sumX").text().slice(5) + " / " + $("#selectObs").val();
			$('#bWrote').html(bString);
			var bValue = (Y - (aValue * X)) / N;
			$('#bResult').html("B = " + bValue);

			//Y String
			var yString = "Y = (" + aValue + ") * " + $("#inter").val() + " + (" + bValue + ")";
			$('#yWrote').html(yString);

			var inter = parseFloat($("#inter").val().replace(",","."));
			var yValue = (aValue * inter) + bValue;
			$('#yResult').html("Y = " + yValue);

			var yString2 = "Y = (" + aValue + ") * " + $("#extra").val() + " + (" + bValue + ")";
			$('#yWrote2').html(yString2);

			var extra = parseFloat($("#extra").val().replace(",","."));
			var yValue2 = (aValue * extra) + bValue;
			$('#yResult2').html("Y = " + yValue2);

			//S String
			var sString = "S = &radic;" + YSquare + " - (" + bValue + ") * " + Y + " - (" + aValue + ") * " + XY + " / " + N + " - 2";
			$('#sWrote').html(sString);

			var up = YSquare - (bValue * Y) - (aValue * XY);
			var down = N - 2;
			var sValue = "&radic;" + up + " / " + down;
			//Raiz Quadrada
			//sValue = Math.sqrt(sValue);
			$('#sResult').html("S = " + sValue);


			$("#formules").show();
		});
	});
});