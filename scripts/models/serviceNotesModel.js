define([ 'jquery', 
         'underscore',
         'backbone' ], 
         function($, _, Backbone) {

	var serviceNotesModel = Backbone.Model.extend({

		/* parse the response to set the id for put and delete request*/
		parse : function(response) {			
			if (response) {
				response.id = response.noteId;
				return response;
			}
		},

		defaults : {
			noteTxt : '',
			createdDateTxt : '',
			createdById : '',
			publicNote : false,
			type : '',
			brand : '',
			ioid : '',
			noteId : ''

		}

	});

	return serviceNotesModel;
});
