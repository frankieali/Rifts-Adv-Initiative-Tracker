/**
 * Advanced Initiative System App
 * design and programing by Frank Ali (philodox13@hotmail.com)
 * developed with jQuery and jQuery UI
 * 
 * Based on the Advanced Initiative System Rules by Wayne Braden II, and Dustin M. Ramsey (http://www.temporalnexus.net/multiverse/hosted_sites/rifts-rpg/adv/initiative.html)
 * 
 * Based on Concepts and Game Design by: Kevin Siembieda and Palladium Books (http://www.palladiumbooks.com)
 * */

//global vars
var rowCount = 1;


;(function ( $, window, document, undefined ) {
	
	var data = $.totalStorage("advInitData");
	
	$.fn.toggleClick = function(){
	    var functions = arguments ;
	    return this.click(function(){
	            var iteration = $(this).data('iteration') || 0;
	            functions[iteration].apply(this, arguments);
	            iteration = (iteration + 1) % functions.length ;
	            $(this).data('iteration', iteration);
	    });
	};
	
	
	/* helper functions */
	
	//adds highlights to columns and rows
	function addHighlights(uiVal){
		if($(document).data("isHighlight")){
			$("#adv_tbody td, #adv_tbody tr").removeClass("cellHighlight intersect");
			if(uiVal == undefined){
				var stepVal = $("#slider").slider( "option", "value" );
			} else{
				var stepVal = uiVal;
			}
			//var stepVal = uiVal || $("#slider").slider( "option", "value" );
			var step = stepVal/3.31;
			var targetColNum = Math.round(31-step);
			var targetColCells = $("td.col_"+targetColNum);
			
			
			targetColCells.addClass("cellHighlight");
				
			targetColCells.each(function(){
				var cell = $(this);
				if(cell.hasClass("attack") && !cell.hasClass("attackSpent")){
					var cellId = cell.attr("id");
					var rowId = cellId.slice(0,cellId.indexOf("_"));
					$("#"+rowId).addClass("cellHighlight");
					cell.addClass("intersect");
				}
			});
		}
	}
	
	//moves the slider to the first "X" in the table when modal is closed
	function highLightFirst(){
		var breakOut = false;
		for (var i = 31; i>0; i--) {
			var targetColCells = $("td.col_"+i);
			
			targetColCells.each(function(){
				var cell = $(this);
				if(cell.hasClass("attack")){
					slideVal = (31-i)*3.31;
					addHighlights(slideVal);
					$("#slider").slider( "option", "value", slideVal);
					breakOut = true;
					return false;
				}
			});
			if(breakOut){
				break;
			}
		}
	}
	
	//add character row
	function addCharacter(args){
		var argObj = typeof args == "string"?deserialize(args):args;
		var trCount = rowCount;
		var newRow = $('<tr id="'+trCount+'">' +
			'<td id="'+trCount+'_remove" class="charRemove col_36 row_'+trCount+'"><li class="ui-state-default ui-corner-all icon"><span class="ui-icon ui-icon-circle-close"></span></li></td>' +
			'<td id="'+trCount+'_remove" class="charState col_35 row_'+trCount+'"><li class="charState icon"><span class="charIcon ui-icon"></span></li></td>' +
			'<td id="'+trCount+'_init" class="charInit col_34 row_'+trCount+'"><input class="text txtCharInit" type="text" value="'+argObj.charInit+'" maxlength="2" /></td>' +
			'<td id="'+trCount+'_char" class="charName col_33 row_'+trCount+'">'+argObj.charName+'</td>' +
			'<td id="'+trCount+'_attk" class="charAttk col_32 row_'+trCount+'"><input class="text txtCharAttk" type="text" value="'+argObj.charAttk+'" maxlength="2" /></td>' +
			'<td id="'+trCount+'_31" class="initNum col_31 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_30" class="initNum col_30 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_29" class="initNum col_29 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_28" class="initNum col_28 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_27" class="initNum col_27 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_26" class="initNum col_26 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_25" class="initNum col_25 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_24" class="initNum col_24 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_23" class="initNum col_23 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_22" class="initNum col_22 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_21" class="initNum col_21 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_20" class="initNum col_20 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_19" class="initNum col_19 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_18" class="initNum col_18 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_17" class="initNum col_17 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_16" class="initNum col_16 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_15" class="initNum col_15 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_14" class="initNum col_14 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_13" class="initNum col_13 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_12" class="initNum col_12 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_11" class="initNum col_11 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_10" class="initNum col_10 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_9" class="initNum col_9 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_8" class="initNum col_8 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_7" class="initNum col_7 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_6" class="initNum col_6 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_5" class="initNum col_5 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_4" class="initNum col_4 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_3" class="initNum col_3 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_2" class="initNum col_2 row_'+trCount+'"></td>' +
			'<td id="'+trCount+'_1" class="initNum col_1 row_'+trCount+'"></td>' +
			'</tr>');
		if($("#placeholder").is(":visible")){
			$("#placeholder").hide();
		}
		$("#adv_tbody").append(newRow);
		$("#adv_tbody").sortable("refresh");
		if(argObj.charInit && argObj.charAttk){
			var attackRounds = calcInit(trCount);
		}
		storeData();
		rowCount++;
	}
	
	//calculate combat rounds based on initiative and # of attacks
	function calcInit(row){
		$("#adv_tbody td, #adv_tbody tr").removeClass("cellHighlight intersect");
		var $row = $("#"+row);
		var rowInit = parseInt($("#"+row+"_init input").val());
		var rowAttk = parseInt($("#"+row+"_attk input").val());
		var attackRounds = [];
		
		if(rowInit > rowAttk){
			var base = rowInit/rowAttk;
			for (var i=0; i < rowAttk; i++) {
				attackRounds[i] = Math.round(rowInit-(base*i));
			}
			
			i--;
			
			if(attackRounds[i] == 0){
				var remainder = rowAttk - i;
				var lastGoodVal = attackRounds[i-1];
				for (var n=0; n < remainder; n++) {
					attackRounds[i+n] = lastGoodVal-(n+1);
				}
			}
		}
		else if(rowInit <= rowAttk){
			for (var i=0; i < rowAttk; i++) {
				attackRounds[i] = rowAttk - i;
			}
		}
		
		
		// add attack icons to table cells
		$row.find("td.initNum").removeClass("attack attackSpent").removeData("attackState").unbind("click");
		for (var i=0; i < attackRounds.length; i++) {
			//$row.find("#"+row+"_"+attackRounds[i]).html("X");
			$row.find("#"+row+"_"+attackRounds[i]).addClass("attack").data("attackState","unspent");
		}
		
		addHighlights();
	}
	
	function setCharState(state){
		
	}
	
	
	function deserialize(serializedString) {
		/*
		* deserialize
		* function to de-serialize a serialzed string and convert it to an object
		* @returns object
		*/
		var deserializedObject = {};
		var parts = serializedString.split("&");
		var numParts = parts.length;
			
		for (i = 0; i < numParts; i++) {
			var currentPair = parts[i].split("=");
			deserializedObject[currentPair[0]] = currentPair[1];
		}
		
		return deserializedObject;
	}
	
	function storeData() {
		if($(document).data("restoring") != true){
			var $rows = $("#adv_tbody tr:not(#placeholder)");
			data = [];
			$rows.each(function(){
				var $this = $(this);
				var tempObj = {};
				var charState = $this.attr("class");
				if(charState){
					charState = $.trim(charState.replace("cellHighlight",""));
				}
				tempObj.charState = charState || null;
				tempObj.charInit = $this.find("input.txtCharInit").val();
				tempObj.charName = $this.find(".charName").text();
				tempObj.charAttk = $this.find("input.txtCharAttk").val();
				data.push(tempObj);
			});
			$.totalStorage("advInitData",data);
		}
	}
	
	function restoreData(data){
		
		$(document).data("restoring",true);
		$(data).each(function(i){
			addCharacter(this);
			var $row = $("#adv_tbody tr:eq("+(i+1)+")");
			$row.addClass(this.charState);
			if($row.hasClass("grey")){
				$row.find("td.attack").addClass("attackSpent");
			}
			
		});
		highLightFirst();
		$(document).data("restoring",false);
	}
	
	
	// DOCUMENT READY
    $(function() {
    	//store highlight state in data object
    	$(document).data("isHighlight",true);
    	
		// initialize dialog
		$("#addCharModal").dialog({
			autoOpen: false,
			title:"Add Character",
			hide:"explode",
			modal:true,
			resizable: false,
			width: 171,
			height: 245,
			open: function(){
				$("#charName").focus();
			},
			close: function(){
				highLightFirst();
			}
		});
		
		// Open modal from landing page
		$("#addChar").button().on("click",function(e){
			$("#addCharModal").dialog("open");
		});
		
		//reset the page
		$("#resetTable").button().on("click",function(e){
			$("#adv_tbody tr:not(#placeholder)").remove();
			$("#placeholder").show();
			$("#slider").slider( "option", "value", 0);
		});
		
		
		/* footer bar buttons */
		
		//remove all characters
		$("#removeAll").button({
	        icons: {primary: 'ui-icon-circle-close'},
	        text: false
	    }).on("click",function(){
	    	if($("#placeholder").is(":hidden")){
		    	$("<div>Are you sure you want to clear the table of all characters?</div>").dialog({
		    		title:"Remove All Characters",
					hide:"explode",
					modal:true,
					resizable: false,
					buttons: {
				        "Remove All": function() {
				        	$("#adv_tbody tr:not(#placeholder)").remove();
				        	$("#placeholder").show();
				        	$(this).dialog( "close" );
				        },
				        Cancel: function() {
				        	$(this).dialog( "close" );
				        }
			        }
		    	});
	    	}
		});
		
		//reset all character states
		$("#resetStates").button({
			icons: {primary: 'ui-icon-refresh'},
			text: false
		}).on("click",function(){
			$("td.charState").removeClass("red yellow blue grey");
			$("tr").removeClass("red yellow blue grey")
			$row = $("tr.disabled");
			$row.removeClass("disabled");
			var actions = $row.find("td.attack");
			
			actions.each(function(){
				var $action = $(this);
				if($action.data("attackState") == "unspent"){
					$action.removeClass("attackSpent");
				}
			});
		});
		
		//clear initiative column
		$("#resetInit").button().on("click",function(){
			$("#adv_tbody td.charInit input.text").val("").trigger("keyup");
		});
		
		//clear attack column
		$("#resetAttk").button().on("click",function(){
			$("#adv_tbody td.charAttk input.text").val("").trigger("keyup");
		});
		
		
		/* slider buttons and initialization */
	
		//initialize slider
		$("#slider").slider({
			step: 3.31,
			slide: function(e,ui){			
				addHighlights(ui.value);
			}
		});
		
		//step slider back one column
		$("#stepPrev").button({
	        icons: {primary: 'ui-icon-arrowthick-1-w'},
	        text: false
	    }).on("click",function(){
			var currentStep = Math.round($("#slider").slider( "option", "value")*100)/100;
			if(currentStep > 3){
				$("#slider").slider( "option", "value",currentStep-3.31);
				addHighlights(currentStep-3.31);
			}
		});
		
		//step slider forward one column
		$("#stepNext").button({
	        icons: {primary: 'ui-icon-arrowthick-1-e'},
	        text: false
	    }).on("click",function(){
			var currentStep = Math.round($("#slider").slider( "option", "value")*100)/100;
			if(currentStep < 98){
				$("#slider").slider( "option", "value",currentStep+3.31);
				addHighlights(currentStep+3.31);
			}
		});
		
		$(document).on("keydown",function(e){
			if(!$("#addCharModal").is(":visible")){
				if(e.keyCode == 37){
					$("#stepPrev").trigger("click");
				} else if(e.keyCode == 39){
					$("#stepNext").trigger("click");
				}
			}
		});
		
		//toggle column and row highlights
		$("#toggleSlider").button().toggleClick(
			function(){
				$(document).data("isHighlight",false);
				$("#adv_tbody td, #adv_tbody tr").removeClass("cellHighlight intersect");
			},
			function(){
				$(document).data("isHighlight",true);
				addHighlights();
			}
		);
		
		
		/* modal events */
	
		//add form data to table
		$("#btnAddChar").button().on("click",function(e){
			e.preventDefault();
			var charNameInput = $("#charName");
			if(charNameInput.val().length > 0){
				addCharacter($("#addCharModal input").serialize());
				$("#addCharModal input").val("");
				charNameInput.css("border","2px inset threedface").focus();
			} else {
				charNameInput.css("border","3px solid #F58400").focus();
			}
		});
		
		//close modal
		$("#btnDone").button().on("click",function(e){
			e.preventDefault();
			$("#addCharModal").dialog("close");
			$("#addChar").focus();
		});
		
		//bind enter key
		$("#addCharModal input").on("keydown",function(e){
			//alert(e.keyCode);
			if(e.keyCode == 13){
				$("#btnAddChar").click();
			}
		});

		
		
		//ititialize row sorting
		$("#adv_tbody").sortable({
			delay: 500,
			update: storeData
		});
		
		//enphesise the "Add Character" button on load
		$("#addChar").effect("highlight").effect("highlight").effect("highlight").focus();
		
		//hover and click events for remove button
		$('#adv_tbody').on('mouseover mouseout click',"td.charRemove li", function(event) {
			if (event.type == 'mouseover') {
				$(this).addClass('ui-state-error');
			} else if (event.type == 'mouseout'){
				$(this).removeClass('ui-state-error');
	  		} else if (event.type == 'click'){
				$(this).parents("tr:first").remove();
				if($("#adv_tbody tr:not(#placeholder)").length == 0){
					$("#placeholder").show();
				}
			}
		});
		
		//cycle through character state
		$("#adv_tbody").on("click","li.charState",function(e){
			var $row = $(this).parents("tr:first");
			if($row.hasClass("red")){
				$row.removeClass("red").addClass("yellow");
			} else if ($row.hasClass("yellow")){
				$row.removeClass("yellow").addClass("blue");
			} else if ($row.hasClass("blue")){
				$row.removeClass("blue").addClass("grey disabled").find("td.attack").addClass("attackSpent");
			} else if ($row.hasClass("grey")){
				$row.removeClass("grey disabled").find("td.attack").each(function(){
					var $action = $(this);
					if($action.data("attackState") == "unspent"){
						$action.removeClass("attackSpent");
					}
				});
			} else {
				$row.addClass("red");
			}
			storeData();
		});
		
		//update chart data as user enters data
		$("#adv_tbody").on("keyup","input.text",function(e){
			calcInit($(this).parents("tr:first").attr("id"));
			storeData();
			
			//arrow up and arrow down
			if(e.keyCode == 38){
				var $this = $(this);
				if($this.hasClass("txtCharInit")){
					var charInitInputs = $("input.txtCharInit");
				} else {
					var charInitInputs = $("input.txtCharAttk");
				}
				var inputIndex;
				var prevIndex;
				$.grep(charInitInputs,function(n,i){
					if (n == $this.get(0)){
						inputIndex = i;
					}
				});
				if(inputIndex == 0){
					prevIndex = (charInitInputs.length -1);
				} else {
					prevIndex = inputIndex - 1;
				}
				
				$(charInitInputs[prevIndex]).focus();
			} else if(e.keyCode == 40){
				var $this = $(this);
				if($this.hasClass("txtCharInit")){
					var charInitInputs = $("input.txtCharInit");
				} else {
					var charInitInputs = $("input.txtCharAttk");
				}
				var inputIndex;
				var nextIndex;
				$.grep(charInitInputs,function(n,i){
					if (n == $this.get(0)){
						inputIndex = i;
					}
				});
				if(inputIndex == (charInitInputs.length - 1)){
					nextIndex = 0;
				} else {
					nextIndex = inputIndex + 1;
				}
				
				$(charInitInputs[nextIndex]).focus();
			}
			
		});
		
		// toggle attack icons
		$("#adv_tbody").on("click","td.attack",function(e){
			var $this = $(this);
			if($this.hasClass("attackSpent")){
				$this.removeClass("attackSpent").data("attackState","unspent");
				if($this.hasClass("cellHighlight")){
					$this.addClass("intersect");
					$this.parent().addClass("cellHighlight");
				}
			} else {
				$this.addClass("attackSpent").data("attackState","spent");
				if($this.hasClass("cellHighlight")){
					$this.removeClass("intersect");
					$this.parent().removeClass("cellHighlight");
				}
			}
		});
		
		if (data){
			restoreData(data);
		}
    	

    });
    
    		

	
}(jQuery,this,this.document));