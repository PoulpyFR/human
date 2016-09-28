/**
 * Structure
 **/

app.value('STRUCTURE', [
	{
		title:		'Label',
		type:			'monolingual text',
		property:	'L',
		multiple:	true,
		visible:	true,
		header:		true,
	},{
		title:		'Description',
		type:			'monolingual text',
		property:	'D',
		multiple:	true,
		visible:	true,
		header:		true,
	},{
		title:		'Alias',
		type:			'monolingual text',
		property:	'A',
		multiple:	true,
		visible:	true,
		header:		true,
	},{
		title:		'Instance of',
		type:			'entity',
		property:	'P31',
		multiple:	false,
		visible:	false,
		default: [
			{
				value:				'Q5',
				text:					'human',
				description:	'common name of Homo sapiens (Q15978631), unique extant species of the genus Homo'
			}
		]
	},{
		title:		'Gender',
		type:			'entity',
		property:	'P21',
		multiple:	false,
		visible:	true,
		values: [
			{
				value:	'Q6581097',
				text:		'Male'
			},{
				value:	'Q6581072',
				text:		'Female'
			}
		],
	},{
		title:		'Date of birth',
		type:			'date',
		property:	'P569',
		multiple:	false,
		visible:	true,
	},{
		title:		'Place of birth',
		type:			'entity',
		property:	'P19',
		multiple:	true,
		visible:	true,
	},{
		title:		'Date of death',
		type:			'date',
		property:	'P570',
		multiple:	false,
		visible:	true,
	},{
		title:		'Place of death',
		type:			'entity',
		property:	'P20',
		multiple:	true,
		visible:	true,
	},{
		title:		'Country of citizenship',
		type:			'entity',
		property:	'P27',
		multiple:	true,
		visible:	true,
	},{
		title:		'Occupation',
		type:			'entity',
		property:	'P106',
		multiple:	true,
		visible:	true,
	},{
		title:		'Given name',
		type:			'entity',
		property:	'P735',
		multiple:	true,
		visible:	true,
	},{
		title:		'Family name',
		type:			'entity',
		property:	'P734',
		multiple:	true,
		visible:	true,
	}
]);
