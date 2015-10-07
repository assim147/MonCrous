var links = {
    "1": "",
    "2": "",
    "3": "https://www.facebook.com/123CROUS?fref=nf",
    "4": "",
    "5": "https://www.facebook.com/CrousMoustache?fref=ts",
    "6": "https://www.facebook.com/events/861480647225220/?notif_t=plan_user_invited",
    "7": "",
    "8": "https://www.facebook.com/events/1505136259738255/?fref=ts",
    "9": "https://www.facebook.com/events/384821535000969/?notif_t=plan_user_joined",
    "10": "https://www.facebook.com/events/643956239056619/?fref=ts",
    "11": "",
    "12": "https://www.facebook.com/aiauvergne?fref=ts",
    "13": "https://www.facebook.com/federationlea?fref=ts",
    "14": "https://www.facebook.com/pages/GAME-Of-CROUS-Vos-assos-étudiantes-/1494445257493946?fref=ts",
    "15": "https://www.facebook.com/events/365692506926733/?ref=3&ref_newsfeed_story_type=regular",
    "16": "",
    "17": "https://www.facebook.com/brei.bassenormandie?fref=ts",
    "18": "https://www.facebook.com/events/366773203485131/?ref=2&ref_dashboard_filter=upcoming",
    "19": "https://www.facebook.com/events/1484246515191570/?pnref=lhc.recent",
    "20": "",
    "21": "https://www.facebook.com/events/830438323667347/",
    "22": "https://www.facebook.com/events/1491049661159074/?notif_t=plan_user_invited",
    "23": "https://www.facebook.com/events/940482942658023/?ref=2&ref_dashboard_filter=upcoming",
    "24": "https://www.facebook.com/events/829810083742928/?fref=ts",
    "25": "",
    "26": "",
    "27": "",
    "28": "",
    "29": "",
    "30": ""
};

function showMaps() {
	$(document).ready(function() {
		$('#francemap').vectorMap({
		    map: 'france_aca',
			hoverOpacity: 0.5,
			hoverColor: false,
			backgroundColor: "#505154",
			colors: couleurs,
			borderColor: "#000000",
			selectedColor: "#EC0000",
			enableZoom: true,
			showTooltip: true,
		    onRegionClick: function(element, code, region) {
		    	if (links[code])
		    		window.open(links[code]);
		    }
		});
	});
}

function resizeMainSection() {
	$("#main-section").height(
		$(window).height() - $("#tab-bar").height()
	);
	$("#main-section").width(
		$(window).width()
	);
}

function setBig(element) {
	if ($('#big-element').attr("show") == "true")
		hideBig();
	else
		showBig(element);
}

function showBig(element) {
	$('#big-element').attr("show", "true");
	element.find("p").first().clone().appendTo($("#big-content"))
			
	var position = element.offset();
	$('#big-element').css('top', position.top - 2);
	$('#big-element').css('left', position.left - 2);
			
	$("#big-element").mouseleave(hideBig);
	$("#big-element").fadeIn()

	var url = $("#big-content p").first().attr("data-url");
	$("#big-element a").attr('data-url', url);
}

function hideBig() {
	$('#big-element').attr("show", "false");

	$("#big-content").empty()
	$("#big-element").fadeOut()
}

$(document).ready(function() {
	// Foundation
	$(document).foundation();
	$(document).foundation('joyride', 'start');	

	// Resize
	$(window).resize(resizeMainSection);
    	resizeMainSection();
	
	// Centré les éléments
	$("td #iframe").each(function() {
		$(this).position({
			my: "center",
			at: "center",
		    of: $(this).parent(),
		});
	});
	$("td p a").each(function() {
		$(this).position({
			my: "center",
			at: "center",
		    of: $(this).parent(),
		});
	});
	$("td p span").each(function() {
		$(this).position({
			my: "center",
			at: "center",
		    of: $(this).parent(),
		});
	});
	
	// Affichage du bouton
	$("#main-table td").click(function () {
		if ($(this).find("#iframe").length == 0 && $(this).find("a.open-modal").length == 0)
			setBig($(this));
	});
	
	// Affichage de la carte
	showMaps();
});
