app.controller('editController', function($scope, $q, STRUCTURE, api) {
	
	$scope.data = [];
	$scope.language = 'en';
	$scope.datePrecision = [
		{ value:11, text:'day' },
		{ value:10, text:'month' },
		{ value:9,  text:'year' },
		{ value:8,  text:'decade' },
		{ value:7,  text:'century' },
		{ value:6,  text:'millenium' },
	];
	$scope.quickStatements = '';

	$scope.removeLine = function(property, index) {
		$scope.data[property].data.splice(index,1);
		$scope.updateQuickStatements();
	}

	$scope.addLine = function(property) {
		var newData = {};
		if ($scope.data[property].type == 'date')
			newData.precision = 9;
		$scope.data[property].data.push(JSON.parse(JSON.stringify(newData)));
		$scope.updateQuickStatements();
	}

	$scope.updateData = function(property, index) {
		$scope.updateQuickStatements();
	}

	$scope.updateRadioData = function(property, index, radio) {
		if (radio < $scope.data[property].values.length) {
			$scope.data[property].data[index].other = false;
		} else {
			$scope.data[property].data[index].other = true;
			$scope.data[property].data[index].value = $scope.data[property].data[index].othervalue;
		}
		$scope.updateQuickStatements();
	}

	$scope.suggestWikidata = function(val, i) {
		$scope.loading = true;

		 return api.search(val, $scope.language).then(function(res){
			var labels = [];
			angular.forEach(res.data.search, function(item){
				if (item.description === undefined)
					item.description = '(no description)';
				labels.push({
					label:       item.label,
					id:          item.id,
					description: item.description,
					display:     item.label + "<br>" + item.description,
					index:       i
					});
			});
			$scope.loading = false;
			return labels;
		});
	}
	
	$scope.onSelectLine = function (property, index, item, radio=false) {
		item.display = item.label;
		console.log(property);
		console.log(index);
		$scope.data[property].data[index].value = item.id;
		$scope.data[property].data[index].label = item.label;
		$scope.data[property].data[index].description = item.description;
		
		if(radio) {
			$scope.data[property].data[index].value = item.id;
			$scope.data[property].data[index].text  = item.label;
			$scope.data[property].data[index].other = true;
			$scope.data[property].data[index].othervalue = item.id;
			$scope.data[property].data[index].othertext = item.label;
		}
		
		$scope.updateQuickStatements();
	}
	
	$scope.convertDate = function(date, precision) {
		var s = '';

		var plus = true;
		if (date.substr(0,1) == "-") {
			plus = false;
			date = date.substr(1,1000);							
		}
		var date = date.split("-");
		var year = date[0];
		while (year.length < 4)
			year = "0" + year;

		var month = date[1];
		if (typeof month === 'undefined' || month =='')
			month = "1";
		if (month.length == 1)
			month = "0"+month;

		var day = date[2];
		if (typeof day === 'undefined' || day =='')
			day = "1";
		if (day.length == 1)
			day = "0"+day;

		if (plus)
			s = "+";
		else
			s = "-";
							
		s += year + "-" + month + "-" + day + "T00:00:00Z/" + precision;
		
		return s;
	}
	
	$scope.updateQuickStatements = function () {
		
		$scope.quickStatements = '';
		
		angular.forEach($scope.data, function(property) {
			
			angular.forEach(property.data, function(data) {
			
				if (typeof data.value !== 'undefined' && data.value != '') {
					$scope.quickStatements += "LAST\t" + property.property;
					if (property.header)
						$scope.quickStatements += data.language;
					$scope.quickStatements += "\t";
				
					switch (property.type) {
						case 'date':
							$scope.quickStatements += $scope.convertDate(data.value, data.precision);

							if (data.circa)
								$scope.quickStatements += "\tP1480\tQ5727902" 
							if (data.presumably)
								$scope.quickStatements += "\tP1480\tQ18122778"
							if (data.latest)
								$scope.quickStatements += "\tP1326\t" + $scope.convertDate(data.latest, 9);
							if (data.earliest)
								$scope.quickStatements += "\tP1319\t" + $scope.convertDate(data.earliest, 9);

							break;

						case 'entity':
							$scope.quickStatements += data.value;
							break;

						case 'monolingual text':
							$scope.quickStatements += "\"" + data.value + "\"";
							break;
					}

					$scope.quickStatements += "\n";
				}

			});
		});
		
		if ($scope.quickStatements != '')
			$scope.quickStatements = "CREATE\n" + $scope.quickStatements;

	}
	
	$scope.init = function () {

		$scope.data = [];		
		
		angular.forEach(STRUCTURE, function(property) {
			data = JSON.parse(JSON.stringify(property));
			data.data = [];
			
			if (typeof data.default !== 'undefined') {
				angular.forEach(data.default, function(item) {
					data.data.push(JSON.parse(JSON.stringify(item)));
				});
			} else {
				if (property.type == 'date')
					data.data.push({precision:9});
				else
					data.data.push({});
			}

			$scope.data.push(data);
		});
		
		$scope.updateQuickStatements();

	}
	
});
